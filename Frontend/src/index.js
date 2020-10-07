import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Filter from "./Filter";
import Screen from "./Screen/Table";

ReactDOM.render(
  <>
    <Screen/>
  </>,
  document.getElementById("root")
);

serviceWorker.unregister();
