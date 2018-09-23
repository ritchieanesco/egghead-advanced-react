import React, { Component } from "react";
import { Switch } from "../src/switch";

//If someone uses one of our compound components outside the React.createContext < ToggleContext.Provider />,
//they will experience a confusing error.
//We could provide a default value for our context,
//but in our situation that doesn't make sense.
//Instead let's build a simple function component which does validation of our contextValue
//that comes from the < ToggleContext.Consumer />.
//That way we can provide a more helpful error message.

const ToggleContext = React.createContext();
//This is the key that connects state and props to children

function ToggleConsumer(props) {
  return (
    <ToggleContext.Consumer>
      {context => {
        if (!context) {
          throw new Error(
            "Toggle compound components must be rendered within the Toggle component"
          );
        }
        return props.children(context);
      }}
    </ToggleContext.Consumer>
  );
}
//Function to validate the consumer
// This is used if Toggle Provider does not wrap the
// Toggle Consumer

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
