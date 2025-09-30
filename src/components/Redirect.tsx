import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface RedirectProps {
  to: string;
  permanent?: boolean;
}

const Redirect: React.FC<RedirectProps> = ({ to, permanent = true }) => {
  useEffect(() => {
    // For SEO purposes, we want search engines to know this is a permanent redirect
    if (permanent && typeof window !== 'undefined') {
      // Set a status code header if possible (mainly for SSR)
      // In client-side routing, we rely on the router's redirect functionality
      console.log(`301 Redirect: ${window.location.pathname} → ${to}`);
    }
  }, [to, permanent]);

  return <Navigate to={to} replace />;
};

export default Redirect;