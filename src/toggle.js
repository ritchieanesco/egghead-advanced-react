import React, { Component } from "react";
import { Switch } from "../src/switch";

//Often with reusable components, the logic needs to be adjusted to handle various use cases.
//Rather than filling our component event handlers with if statements and loading our state
//with one-off properties, we can expose our state directly to users of our reusable component
//in a way that's flexible and simple with a state reducer.

const runFns = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));
//utility to pass in a list of arguments to execute

class Toggle extends Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {}
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
      return Object.keys(reducedChanges).length ? reducedChanges : null;
    }, callback);
  }
  toggle = () => {
    // use an additional state to handle changes prior to set state
    this.internalSetState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on);
      }
    );
  };

  reset = () => {
    // use an additional state to handle changes prior to set state
    this.internalSetState(this.initialState, () => {
      this.props.onReset(this.state.on);
    });
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
      onClick: runFns(onClick, this.toggle),
      "aria-pressed": this.state.on,
      ...props
    };
  };

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}
export default Toggle;
