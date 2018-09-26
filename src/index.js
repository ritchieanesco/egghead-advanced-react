import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./myComponent";

function logger(log) {
  console.log("onToggle", log);
}

function alertTest() {
  alert("test");
}

function App() {
  return <MyComponent />;
}

//render props provides a way to entirely control the rendering.

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
