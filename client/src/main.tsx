import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import router from "./app/router/Routes.tsx";
import { StoreProvider } from "./app/context/StoreContext.tsx";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore.ts";

const store = configureStore();
console.log(store.getState())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StoreProvider>
);
