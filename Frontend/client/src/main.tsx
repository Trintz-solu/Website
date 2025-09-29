import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// Performance monitoring disabled for maximum scroll performance

// Use native smooth scrolling - no JavaScript overhead
document.documentElement.style.scrollBehavior = 'smooth';
document.body.style.scrollBehavior = 'smooth';

// NO scroll handlers - pure native scrolling for maximum performance

createRoot(document.getElementById("root")!).render(<App />);
