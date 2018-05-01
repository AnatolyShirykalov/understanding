import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Root from "./Root/Root";
console.log("root", process.env.NODE_ENV);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
