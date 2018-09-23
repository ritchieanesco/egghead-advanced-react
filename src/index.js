import React from "react";
import ReactDOM from "react-dom";
import Toggle from "../src/toggle";

function App() {
  return <Toggle onToggle={state => console.log("onToggle", state)} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
