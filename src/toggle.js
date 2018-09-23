import React, { Component } from "react";
import { Switch } from "../src/switch";

//Our current compound component implementation is great, but it's limited in that users cannot render the structure they need.
//Let's allow the user to have more flexibility by using React context to share the implicit state to our child <Toggle/> components.
//We will walk through using React's official context API with React.createContext and use the given Provider and Consumer components
//to share state implicitly between our compound components giving our users the flexibility they need out of our component.

const ToggleContext = React.createContext();
//This is the key that connects state and props to children

class Toggle extends Component {
  static On = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => (contextValue.on ? children : null)}
    </ToggleContext.Consumer>
  );
  static Off = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => (contextValue.on ? null : children)}
    </ToggleContext.Consumer>
  );
  static Button = props => (
    <ToggleContext.Consumer>
      {contextValue => (
        <Switch on={contextValue.on} onClick={contextValue.toggle} {...props} />
      )}
    </ToggleContext.Consumer>
  );
  //using createContext consumer to provider the state and props
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
    //use provider to pass down state and toggle to the static methods
    return (
      <ToggleContext.Provider
        value={{
          on: this.state.on,
          toggle: this.toggle
        }}
      >
        {this.props.children}
      </ToggleContext.Provider>
    );
  }
}
export default Toggle;
