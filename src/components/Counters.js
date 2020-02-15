import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 4 },
      { id: 3, value: 2 },
      { id: 4, value: 4 },
    ],
    return: 0
  };
  

  handleDelete = id => {
    const counter = this.state.counters.filter(c => c.id !== id);
    this.setState({ counters: counter });
    var x = this.state.return +1;
    this.setState({return: x})
  };

  handleAdd = (id) => {
    const lastCount = this.state.counters.length + this.state.return;
    const newCount = { id: lastCount +1, value: 0};
    var co = this.state.counters.concat(newCount);
    this.setState({counters:co})
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-sm btn-success m-2"
          onClick={() => this.handleAdd(this.props.id)}
        >
          Add
        </button>
        <div>
          <div>
            {this.state.counters.map(counter => (
              <Counter
                key={counter.id}
                onDelete={this.handleDelete}
                id={counter.id}
                value={counter.value}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Counters;
