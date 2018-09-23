import React, { Component } from "react";
import { Switch } from "../src/switch";

//A render prop is a function that renders JSX based on state and helper arguments.
//This pattern is the most flexible way to share component logic while giving complete UI flexibility.
//It's a remarkably simple and powerful pattern.

class Toggle extends Component {
  state = { on: false };
  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on);
      }
    );
  };

  render() {
    //remove all rendering to props and provide the rendering all
    // the state and callbacks required to render
    return this.props.children({
      on: this.state.on,
      toggle: this.toggle
    });
  }
}
export default Toggle;
