import React, { Component } from "react";
import Toggle from "./toggle";
import { Switch } from "./switch";

class MyComponent extends Component {
  static defaultProps = {
    onToggle: (...args) => console.log("onToggle", ...args),
    onReset: (...args) => console.log("onReset", ...args)
  };
  initialState = { timesClicked: 0 };
  state = this.initialState;
  handleToggle = (...args) => {
    this.setState(({ timesClicked }) => ({
      timesClicked: timesClicked + 1
    }));
    this.props.onToggle(...args);
  };
  handleReset = (...args) => {
    this.setState(this.initialState);
    this.props.onReset(...args);
  };
  toggleStateReducer = (state, changes) => {
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false };
    }
    return changes;
  };
  render() {
    const { timesClicked } = this.state;
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
      >
        {toggle => (
          <div>
            <Switch
              {...toggle.getTogglerProps({
                on: toggle.on
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">Click count: {timesClicked}</div>
            ) : null}
            <button onClick={toggle.reset}>Reset</button>
          </div>
        )}
      </Toggle>
    );
  }
}
MyComponent.title = "State Reducers";

export default MyComponent;
