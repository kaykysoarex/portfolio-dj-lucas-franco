import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/syne/500.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";

import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/mobile-shared.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
