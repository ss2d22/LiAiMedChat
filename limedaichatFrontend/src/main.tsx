import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/state/store";
import { SocketProvider } from "./providers/socketProvider.tsx";

setupListeners(store.dispatch);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
        <Toaster closeButton />
      </SocketProvider>
    </Provider>
  </StrictMode>
);
