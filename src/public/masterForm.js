import React from "react";
import ReactDOM from "react-dom";
import MasterForm from "./components/masterForm";

ReactDOM.hydrate(
    <MasterForm name={window.__INITIAL__DATA__.name} />,
    document.getElementById("masterFormDiv")
);