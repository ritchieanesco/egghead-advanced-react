import React, { Component } from "react";
import { Switch } from "../src/switch";

//When you're using prop collections, sometimes you can run into trouble with exposing implementation details of your prop collections.
//Abstract that away by simply creating a function called a prop getter that will compose the user's props with our prop collection.

const runFns = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));
//utility to pass in a list of arguments to execute

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

  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      // provide a function to retrieve all props
      getTogglerProps: this.getTogglerProps
    };
  }

  getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      onClick: runFns(onClick, this.toggle),
      "aria-pressed": this.state.on,
      ...props
    };
  };

  render() {
    //remove all rendering to props and provide the rendering all
    // the state and callbacks required to render
    return this.props.children(this.getStateAndHelpers());
  }
}
export default Toggle;
