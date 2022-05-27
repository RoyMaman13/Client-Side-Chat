import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const Index = () => {

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

const src = document.getElementById("root");
const root = ReactDOM.createRoot(src);
root.render(<Index />);