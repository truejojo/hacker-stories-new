import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --clr-primary-I: #83a4d4;
    --clr-primary-II: #b6fbff;

    --clr-neutral-100: #fff;
    --clr-neutral-200: #f5f5f5;    
    --clr-neutral-700: #555;    
    --clr-neutral-800: #222;    
    --clr-neutral-900: #000;    
  }

  body {
    font-family: "arial";
    background: var(--clr-primary-I);
    background: linear-gradient(to left, var(--clr-primary-II), var(--clr-primary-I));
  };
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
