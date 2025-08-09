import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  useEffect(() => {
    // Scroll to top when component mounts (new page loads)
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;