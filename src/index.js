import React from "react";
import ReactDOM from "react-dom";
import Toggle from "../src/toggle";

function logger(log) {
  console.log("onToggle", log);
}

function App() {
  //using reacts context api to pass down state and props to children
  //without requiring any specific structure or order
  return (
    <Toggle onToggle={logger}>
      <div>
        <Toggle.Button />
      </div>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
    </Toggle>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
