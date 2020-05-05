import React, { Component } from "react";
import People from "./People";
import { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Button } from "reactstrap";
import { Table } from "reactstrap";

class LandingScreen extends Component {
  state = {
    userInput: "",
    userSelect: "",
    userSwitch: true,
    filterString: "firstName",
    filterSelect: "region",
    filterSwitch: "isActive",
    data: People,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelect = (event) => {
    if (event.target.value === "default") {
      this.setState({ userSelect: "" });
    } else {
      this.setState({ userSelect: event.target.value });
    }
  };

  initialState = this.state;

  handleReset = () => {
    this.setState(this.initialState);
  };

  handleSwitchColor = () => {
    if (this.state.userSwitch) {
      return "success";
    } else {
      return "danger";
    }
  };

  handleSwitch = () => {
    if (this.state.userSwitch) {
      this.setState({ userSwitch: false });
    } else {
      this.setState({ userSwitch: true });
    }
  };

  handleName = () => {
    if (this.state.userSelect.length === 0) {
      return `Search by ${this.state.filterSelect}`;
    } else {
      return this.state.userSelect;
    }
  };

  handleSearch = () => {
    this.setState({
      data: People.filter((e) =>
        e[this.state.filterString].includes(this.state.userInput)
      )
        .filter((o) =>
          o[this.state.filterSelect].includes(this.state.userSelect)
        )
        .filter((a) => a[this.state.filterSwitch] === this.state.userSwitch),
    });
  };

  render() {
    let objectKeys = Object.keys(People[0]);
    let Selector = People.map((e, i) => e[this.state.filterSelect]).filter(
      (e, i, a) => a.indexOf(e) === i
    );

    const Drop = (props) => {
      const [dropdownOpen, setOpen] = useState(false);
      const toggle = () => setOpen(!dropdownOpen);
      return (
        <div>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>{this.handleName()}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.handleSelect} value="default">
                Default
              </DropdownItem>
              {Selector.map((e, i) => (
                <DropdownItem key={i} value={e} onClick={this.handleSelect}>
                  {e}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      );
    };
    return (
      <div>
        <div>
          <Button color="success" onClick={this.handleReset}>
            Reset
          </Button>
          <Button color="warning" onClick={this.handleSearch}>
            Search
          </Button>
        </div>

        <div className="list">
          <div>
            <label>
              Filter by input{" "}
              <input
                onChange={this.handleChange}
                name="userInput"
                value={this.state.userInput}
                type="text"
                placeholder={"Search by " + this.state.filterString}
              ></input>
            </label>
          </div>
          <div>Filter by select </div>
          <div>
            <Drop></Drop>
          </div>
          <div>
            Filter by switch{" "}
            <Button
              color={this.handleSwitchColor()}
              onClick={this.handleSwitch}
            >
              {this.state.filterSwitch}
            </Button>
          </div>
        </div>
        <div>
          <Table dark>
            <thead>
              <tr>
                <th scope="row">#</th>
                {objectKeys.map((e, i) => (
                  <td key={i}>{e}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((e, i) => (
                <tr>
                  <th scope="row" key={i}>
                    {i + 1}
                  </th>
                  {objectKeys.map((u, y) => (
                    <td key={y}>{e[u].toString()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>{this.state.userSwitch}</div>
      </div>
    );
  }
}

export default LandingScreen;
