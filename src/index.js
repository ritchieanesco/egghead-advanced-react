import React from "react";
import ReactDOM from "react-dom";
import Toggle from "../src/toggle";

function logger(log) {
  console.log("onToggle", log);
}

function App() {
  return (
    <Toggle onToggle={logger}>
      <Toggle.Button />
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
    </Toggle>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
