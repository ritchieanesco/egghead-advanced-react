import React, { Component } from "react";
import "./switch.styles.css";

class Switch extends Component {
  render() {
    const { on, className = "", ...props } = this.props;
    const btnClassName = [
      className,
      "toggle-btn",
      on ? "toggle-btn-on" : "toggle-btn-off"
    ]
      .filter(Boolean) //filters out all falsey values
      .join(" ");

    return (
      <div>
        <input
          className="toggle-input"
          type="checkbox"
          checked={on}
          onChange={() => {}}
        />
        <button className={btnClassName} aria-label="Toggle" {...props} />
      </div>
    );
  }
}

export { Switch };
