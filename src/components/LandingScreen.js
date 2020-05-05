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

  handleReset = () => {
    this.setState({ userInput: "", userSelect: "" });
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

  handleName = (filterSelect) => {
    if (this.state.userSelect.length === 0) {
      return `Search by ${filterSelect}`;
    } else {
      return this.state.userSelect;
    }
  };

  render() {
    const filterString = "firstName";
    const filterSelect = "region";
    const filterSwitch = "isActive";
    let objectKeys = Object.keys(People[0]);
    let PeopleFilterFinal = People.filter((e) =>
      e[filterString].includes(this.state.userInput)
    )
      .filter((o) => o[filterSelect].includes(this.state.userSelect))
      .filter((a) => a[filterSwitch] === this.state.userSwitch);
    let Selector = People.map((e, i) => e[filterSelect]).filter(
      (e, i, a) => a.indexOf(e) === i
    );

    const Drop = (props) => {
      const [dropdownOpen, setOpen] = useState(false);
      const toggle = () => setOpen(!dropdownOpen);
      return (
        <div>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              {this.handleName(filterSelect)}
            </DropdownToggle>
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
                placeholder={"Search by " + filterString}
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
              {filterSwitch}
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
              {PeopleFilterFinal.map((e, i) => (
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
