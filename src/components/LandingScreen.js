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
    userInputStatic: "",
    userInput: "",
    userSelect: "",
    userSwitch: "",
    filterString: "firstName",
    filterSelect: "region",
    filterSwitch: "isActive",
    filterPop: [],
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
    const input = event.target.value;
    this.state.filterPop.push({ value: input, change: "userSelect" });
  };

  initialState = this.state;

  handleReset = () => {
    this.setState(this.initialState);
  };

  handleSwitchColor = () => {
    if (this.state.userSwitch === "") {
      return "warning";
    } else if (this.state.userSwitch === "true") {
      return "success";
    } else if (this.state.userSwitch === "false") {
      return "danger";
    }
  };

  handleSwitch = (event) => {
    if (this.state.userSwitch === "") {
      this.setState({ userSwitch: "true" });
    } else if (this.state.userSwitch === "true") {
      this.setState({ userSwitch: "false" });
    } else if (this.state.userSwitch === "false") {
      this.setState({ userSwitch: "" });
    }
    const input = event.target.value;
    if (input === "") {
      this.state.filterPop.push({ value: "All", change: "userSwitch" });
    } else {
      this.state.filterPop.push({ value: input, change: "userSwitch" });
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
    const input = this.state.userInput;
    this.setState({ userInputStatic: input });
    this.state.filterPop.push({ value: input, change: "userInputStatic" });
  };

  handleSearchPop = (event) => {
    if (event.target.value === "All") {
      event.target.value = "";
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let objectKeys = Object.keys(People[0]);
    let Selector = People.map((e, i) => e[this.state.filterSelect]).filter(
      (e, i, a) => a.indexOf(e) === i
    );
    let data = People.filter((e) =>
      e[this.state.filterString].includes(this.state.userInputStatic)
    )
      .filter((o) => o[this.state.filterSelect].includes(this.state.userSelect))
      .filter((a) =>
        a[this.state.filterSwitch].toString().includes(this.state.userSwitch)
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
    console.log(this.state.filterPop);
    console.log(this.state.userSelect);
    return (
      <div>
        <div>
          <Button color="info" onClick={this.handleReset}>
            Reset Filter
          </Button>
        </div>

        <div className="filter-bar">
          <div>
            <label>
              <input
                onChange={this.handleChange}
                name="userInput"
                value={this.state.userInput}
                type="text"
                placeholder={"Search by " + this.state.filterString}
              ></input>
              <Button color="primary" onClick={this.handleSearch}>
                Search
              </Button>
            </label>
          </div>
          <div>
            <Drop></Drop>
          </div>
          <div>
            <Button
              value={this.state.userSwitch}
              color={this.handleSwitchColor()}
              onClick={this.handleSwitch}
            >
              {this.state.filterSwitch}
            </Button>
          </div>
        </div>

        <div>
          {this.state.filterPop
            .filter((e, i, a) => a.indexOf(e) === i)
            .map((u, y) => (
              <Button
                color="dark"
                name={u.change}
                value={u.value}
                onClick={this.handleSearchPop}
              >
                {u.value}
              </Button>
            ))}
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
              {data.map((e, i) => (
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
      </div>
    );
  }
}

export default LandingScreen;
