import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.value
  };

  handleDecrement = () => {
    const count = this.state.count - 1;
    this.setState({ count });
  };

  handleIncrement = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  };

  handleReset = () => {
    const reset = 0;
    this.setState({ count: reset });
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-dark btn-sm m-2"
          onClick={this.handleReset}
        >
          Reset
        </button>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-primary btn-sm"
        >
          +
        </button>
        <button
          onClick={this.handleDecrement}
          className="btn btn-warning btn-sm"
        >
          -
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete (this.props.id)}
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    return this.state.count === 0
      ? "badge m-2 badge-info"
      : "badge m-2 badge-secondary";
  }

  formatCount() {
    const value = this.state.count;
    return value === 0 ? "0" : value;
  }
}

export default Counter;
