import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple approaches to ensure scroll to top works
    
    // 1. Immediate scroll
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // 2. Window scroll as backup
    window.scrollTo(0, 0);
    
    // 3. Delayed scroll for any remaining issues
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;