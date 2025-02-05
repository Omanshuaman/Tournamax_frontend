import React from "react";
import { createRoot } from "react-dom/client";
// import './index.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ChatProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChatProvider>
);
