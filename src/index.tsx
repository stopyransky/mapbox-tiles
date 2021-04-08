import { render } from "react-dom";
import React from "react";
import App from "./components/App";
import "./styles.css";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
