import React, { Component } from "react";
import { Switch } from "../src/switch";

//Users of our component can make custom modifications to the state whenever it changes,
//but in more complex components they may only want to change the state updates for certain types of changes.
//Added type props to indiciators the current action

const runFns = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));
//utility to pass in a list of arguments to execute

class Toggle extends Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {}
  };
  //centralise type constants, this is also accessible outside of the class
  static stateChangeTypes = {
    reset: "__reset__",
    toggle: "__toggle__"
  };
  initialState = { on: this.props.initialOn };
  state = this.initialState;
  internalSetState(changes, callback) {
    //internal state uses a 'state reducer' to determine if the updated
    // state should apply
    this.setState(state => {
      const changesObject =
        typeof changes === "function" ? changes(state) : changes;
      const reducedChanges =
        this.props.stateReducer(state, changesObject) || {};
      //strip off type prop to prevent unrequired re-render.
      const { type: ignoredType, ...onlyChanges } = reducedChanges;
      return Object.keys(onlyChanges).length ? onlyChanges : null;
    }, callback);
  }
  toggle = ({ type = Toggle.stateChangeTypes.toggle } = {}) => {
    // use an additional state to handle changes prior to set state
    this.internalSetState(
      ({ on }) => ({ on: !on, type }),
      () => {
        this.props.onToggle(this.state.on);
      }
    );
  };

  reset = () => {
    // use an additional state to handle changes prior to set state
    this.internalSetState(
      { ...this.initialState, type: Toggle.stateChangeTypes.reset },
      () => {
        this.props.onReset(this.state.on);
      }
    );
  };

  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      // provide a function to retrieve all props
      getTogglerProps: this.getTogglerProps
    };
  }

  getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      onClick: runFns(onClick, () => this.toggle()),
      "aria-pressed": this.state.on,
      ...props
    };
  };

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}
export default Toggle;
