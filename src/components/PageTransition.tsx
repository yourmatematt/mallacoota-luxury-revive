import { ReactNode, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="animate-page-fade-in">{children}</div>;
};

export default PageTransition;
