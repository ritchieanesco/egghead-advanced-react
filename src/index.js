import React from "react";
import ReactDOM from "react-dom";
import Toggle from "../src/toggle";
import { Switch } from "../src/switch";

function logger(log) {
  console.log("onToggle", log);
}

function App() {
  return (
    <Toggle onToggle={logger}>
      {({ on, togglerProps }) => (
        //togglerProps contains all the attributes, callbacks which can
        //be destructured in a element
        <div>
          {on ? "The button is on" : "The button is off"}
          <Switch on={on} {...togglerProps} />
          <hr />
          <button aria-label="custom-button" {...togglerProps}>
            {on ? "on" : "off"}
          </button>
        </div>
      )}
    </Toggle>
  );
}

//render props provides a way to entirely control the rendering.

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
