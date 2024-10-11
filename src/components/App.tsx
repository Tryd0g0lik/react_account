import React from 'react';
import { createRoot } from 'react-dom/client';
import { FormsFC } from './Forms/index.tsx';
const root = document.getElementById("root");

if (!root) {
  throw new Error('[App]: Something what woong! It is an id "root" was not found ');
}
createRoot(root).render(
  <React.StrictMode>

    <FormsFC />
  </React.StrictMode>
);
