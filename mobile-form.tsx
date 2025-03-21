import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, X } from "lucide-react";

interface MobileFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backLink?: string;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
  hideSubmitButton?: boolean;
}

/**
 * Mobile optimized form layout with a fixed header and sticky submit button
 */
export function MobileForm({
  title,
  subtitle,
  children,
  backLink,
  submitText = "Save",
  cancelText = "Cancel",
  onCancel,
  isSubmitting = false,
  hideSubmitButton = false,
  className,
  ...props
}: MobileFormProps) {
  const [, navigate] = useLocation();
  
  const handleBack = () => {
    if (backLink) {
      navigate(backLink);
    } else {
      window.history.back();
    }
  };
  
  return (
    <form className={`flex flex-col h-full min-h-screen bg-background ${className || ""}`} {...props}>
      {/* Fixed header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center">
          <Button type="button" variant="ghost" size="icon" onClick={handleBack} className="mr-3">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        
        {onCancel && (
          <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Form content */}
      <div className="flex-grow p-4">
        {children}
      </div>
      
      {/* Sticky footer with submit button */}
      {!hideSubmitButton && (
        <div className="sticky bottom-0 p-4 border-t bg-background mt-auto">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitText}
          </Button>
        </div>
      )}
    </form>
  );
}