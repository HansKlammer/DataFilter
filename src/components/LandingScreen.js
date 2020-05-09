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
    let unique = this.state.filterPop
      .map((u, y) => u.value)
      .filter((e, i, a) => a.indexOf(e) === i);

    let input = event.target.value;
    if (
      input.length > 0 &&
      input !== "default" &&
      unique.includes(input) === false
    ) {
      this.state.filterPop.push({ value: input, change: "userSelect" });
    }
  };

  initialState = {
    userInputStatic: "",
    userInput: "",
    userSelect: "",
    userSwitch: "",
    filterString: "firstName",
    filterSelect: "region",
    filterSwitch: "isActive",
  };

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
    let unique = this.state.filterPop
      .map((u, y) => u.value)
      .filter((e, i, a) => a.indexOf(e) === i);

    let input = event.target.value;

    if (input.length > 0 && unique.includes(input) === false) {
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
    let input = this.state.userInput;
    this.setState({ userInputStatic: input });
    let unique = this.state.filterPop
      .map((u, y) => u.value)
      .filter((e, i, a) => a.indexOf(e) === i);

    if (input.length > 0 && unique.includes(input) === false) {
      this.state.filterPop.push({ value: input, change: "userInputStatic" });
    }
  };

  handleSearchPop = (event) => {
    this.setState(this.initialState);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDelete = (event) => {
    let input = event.target.value;
    let Badges = this.state.filterPop.filter((e, i) => input !== i.toString());
    this.setState({ filterPop: Badges });
  };

  render() {
    let objectKeys = Object.keys(People[0]);
    let Selector = People.map((u, y) => u[this.state.filterSelect]).filter(
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
          {this.state.filterPop.map((u, y) => (
            <div>
              <Button
                color="dark"
                name={u.change}
                value={u.value}
                onClick={this.handleSearchPop}
              >
                {u.value}
              </Button>
              <Button
                color="dark"
                value={y.toString()}
                onClick={this.handleDelete}
              >
                X
              </Button>
            </div>
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
