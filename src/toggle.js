import React, { Component } from "react";
import { Switch } from "../src/switch";

//Sometimes you have common use cases that require common props to be applied to certain elements.
//You can collect these props into an object for users to simply apply to their elements and we'll see how to do that in this lesson.

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
      // below can be passed to element and destructured
      togglerProps: {
        onClick: this.toggle,
        "aria-pressed": this.state.on
      }
    };
  }

  render() {
    //remove all rendering to props and provide the rendering all
    // the state and callbacks required to render
    return this.props.children(this.getStateAndHelpers());
  }
}
export default Toggle;
