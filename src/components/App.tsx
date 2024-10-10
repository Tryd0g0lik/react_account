import React from 'react';
import { createRoot } from 'react-dom/client';
import { PagesRouter } from "./Router.tsx";
const root = document.getElementById("root");

if (!root) {
  throw new Error('[App]: Something what woong! It is an id "root" was not found ');
}
createRoot(root).render(
  <React.StrictMode>
    <PagesRouter />
  </React.StrictMode>
);
