import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "isomorphic/app";
import { BrowserRouter } from "react-router-dom";
import store from "isomorphic/store";

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
