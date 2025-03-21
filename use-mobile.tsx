import { useState, useEffect } from "react";

/**
 * Custom hook for checking media queries
 * @param query Media query string (e.g., "(max-width: 768px)")
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (browser environment)
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Define listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    media.addEventListener("change", listener);
    
    // Cleanup
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [matches, query]);

  return matches;
}

/**
 * Shorthand hook for checking if screen is mobile
 * @returns Boolean indicating if the screen is mobile size
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}