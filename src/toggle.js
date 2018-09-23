import React, { Component } from "react";
import { Switch } from "../src/switch";

//Compound components give more rendering control to the user.
//The functionality of the component stays intact while how it looks and the order of the children can be changed at will.
//We get this functionality by using the special React.Children.map function to map over the children given to our <Toggle/> component.
//We map over the children to pass the on state as a prop to its children.
//We move the visual pieces of the component out into function components and add them as static properties to <Toggle/>.

class Toggle extends Component {
  static On = ({ on, children }) => (on ? children : null);
  static Off = ({ on, children }) => (on ? null : children);
  static Button = ({ on, toggle, ...props }) => (
    <Switch on={on} onClick={toggle} {...props} />
  );
  // these static methods are compound components.
  // to give access to on, props, and toggle the children
  // need to be hooked up via the render method
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
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle
      })
    );
  }
}
export default Toggle;
