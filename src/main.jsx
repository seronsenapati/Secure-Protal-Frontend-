
import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./MainApp";
import "./index.css";
import "./components/landingPage/index.css";
import { Provider } from "react-redux";
import { store } from "./components/contractorDash/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainApp />
    </Provider>
  </React.StrictMode>
);