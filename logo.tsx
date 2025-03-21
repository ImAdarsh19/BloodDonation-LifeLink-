import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
  showTagline?: boolean;
}

export const Logo = ({ className, textClassName, showTagline = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="mr-3">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
        >
          <path
            d="M20 5C20 5 26 13 26 20C26 27 20 35 20 35C20 35 14 27 14 20C14 13 20 5 20 5Z"
            fill="#E53E3E"
          />
          <path
            d="M35 20C35 20 27 26 20 26C13 26 5 20 5 20C5 20 13 14 20 14C27 14 35 20 35 20Z"
            fill="#E53E3E"
          />
          <path
            d="M20 0C9 0 0 9 0 20C0 31 9 40 20 40C31 40 40 31 40 20C40 9 31 0 20 0ZM20 36C11.2 36 4 28.8 4 20C4 11.2 11.2 4 20 4C28.8 4 36 11.2 36 20C36 28.8 28.8 36 20 36Z"
            fill="#E53E3E"
          />
        </svg>
      </div>
      <div>
        <h1 className={cn("text-2xl font-bold gradient-text", textClassName)}>LifeLink</h1>
        {showTagline && <p className="text-sm text-foreground/70">National Blood Donation Portal</p>}
      </div>
    </div>
  );
};

export default Logo;
