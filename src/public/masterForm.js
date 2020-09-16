import React from "react";
import ReactDOM from "react-dom";
import MasterForm from "./components/masterForm";

ReactDOM.hydrate(
    <MasterForm/>,
    document.getElementById("masterFormDiv")
);
