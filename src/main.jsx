import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import './index.css';

let initialPageFromData;
try {
  const el = document.getElementById("prerender-data");
  if (el?.textContent) {
    const d = JSON.parse(el.textContent);
    initialPageFromData = d?.initialPage;
  }
} catch {}

createRoot(document.getElementById("root")).render(
  <App initialPage={initialPageFromData} />
);
