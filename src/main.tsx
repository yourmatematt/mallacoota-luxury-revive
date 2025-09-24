import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal to prerenderer that the app is ready
if (typeof window !== 'undefined') {
  setTimeout(() => {
    document.dispatchEvent(new Event('render-event'));
  }, 1500); // Wait 1.5s for all content to load
}
