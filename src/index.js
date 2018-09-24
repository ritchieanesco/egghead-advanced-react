import React from "react";
import ReactDOM from "react-dom";
import Toggle from "../src/toggle";
import { Switch } from "../src/switch";

function logger(log) {
  console.log("onToggle", log);
}

function alertTest() {
  alert("test");
}

function App() {
  return (
    <Toggle
      //initialOn={true} ability to set initial state
      onToggle={logger}
      onReset={logger}
    >
      {({ on, getTogglerProps, reset }) => (
        //getTogglerProps has the ability to pass in additional
        // attributes and events which can then be destructured
        //in the component
        <div>
          {on ? "The button is on" : "The button is off"}
          <Switch on={on} {...getTogglerProps()} />
          <hr />
          <button
            {...getTogglerProps({
              "aria-label": "custom-button",
              id: "custom-button-id",
              onClick: alertTest
            })}
          >
            {on ? "on" : "off"}
          </button>
          <hr />
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  );
}

//render props provides a way to entirely control the rendering.

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
