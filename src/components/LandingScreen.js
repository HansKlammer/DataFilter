import React, { Component } from "react";
import People from "./People";
import UserInfo from "./UserInfo";
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
    filterString: "",
    filterSelect: "",
    filterSwitch: "",
    filterPop: [],
  };

  data = People;

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
      this.state.filterPop.push({
        value: input,
        change: "userSelect",
        color: "dark",
      });
    }
  };

  initialState = {
    userInputStatic: "",
    userInput: "",
    userSelect: "",
    userSwitch: "",
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
      this.state.filterPop.push({
        value: input,
        change: "userSwitch",
        color: "warning",
      });
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
      this.state.filterPop.push({
        value: input,
        change: "userInputStatic",
        color: "primary",
      });
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

  handleOptionSearch = (event) => {
    let input = event.target.value;
    this.setState({ filterString: input });
    this.initialState.filterString = input;
  };

  handleOptionSelect = (event) => {
    let input = event.target.value;
    this.setState({ filterSelect: input });
    this.initialState.filterSelect = input;
  };

  handleOptionSwitch = (event) => {
    let input = event.target.value;
    this.setState({ filterSwitch: input });
    this.initialState.filterSwitch = input;
  };

  handleDisableString = () => {
    if (this.state.filterString === "") {
      return true;
    } else {
      return false;
    }
  };

  handleDisableSelect = () => {
    if (this.state.filterSelect === "") {
      return true;
    } else {
      return false;
    }
  };
  handleDisableSwitch = () => {
    if (this.state.filterSwitch === "") {
      return true;
    } else {
      return false;
    }
  };

  render() {
    let objectKeys = Object.keys(this.data[0]);
    let array = this.data;
    let booleanKeys = [];
    let stringKeys = [];
    objectKeys.forEach((e, i) =>
      array.forEach((u) => {
        if (typeof u[e] === "string") {
          stringKeys.push(e);
        } else if (typeof u[e] === "boolean") {
          booleanKeys.push(e);
        }
      })
    );
    let objectKeysString = stringKeys.filter((e, i, a) => a.indexOf(e) === i);
    let objectKeysBoolean = booleanKeys.filter((e, i, a) => a.indexOf(e) === i);
    let filterString = this.state.filterString;
    let filterSelect = this.state.filterSelect;
    let filterSwitch = this.state.filterSwitch;

    if (filterString === "") {
      filterString = objectKeysString[0];
    }
    if (filterSelect === "") {
      filterSelect = objectKeysString[0];
    }
    if (filterSwitch === "") {
      filterSwitch = objectKeysBoolean[0];
    }
    let Selector = this.data
      .map((u, y) => u[filterSelect].toString())
      .filter((e, i, a) => a.indexOf(e) === i);
    let dataFiltered = this.data
      .filter((e) =>
        e[filterString].toString().includes(this.state.userInputStatic)
      )
      .filter((o) => o[filterSelect].toString().includes(this.state.userSelect))
      .filter((a) =>
        a[filterSwitch].toString().includes(this.state.userSwitch)
      );

    const DropdownSelector = (props) => {
      const [dropdownOpen, setOpen] = useState(false);
      const toggle = () => setOpen(!dropdownOpen);
      return (
        <div>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret disabled={this.handleDisableSelect()}>
              {this.handleName()}
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

    const DropdownOptionSearch = (props) => {
      const [dropdownOpen, setOpen] = useState(false);
      const toggle = () => setOpen(!dropdownOpen);
      return (
        <div>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Filter option</DropdownToggle>
            <DropdownMenu>
              {objectKeysString.map((e, i) => (
                <DropdownItem
                  key={i}
                  value={e}
                  onClick={this.handleOptionSearch}
                >
                  {e}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      );
    };

    const DropdownOptionSelect = (props) => {
      const [dropdownOpen, setOpen] = useState(false);
      const toggle = () => setOpen(!dropdownOpen);
      return (
        <div>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Filter option</DropdownToggle>
            <DropdownMenu>
              {objectKeys.map((e, i) => (
                <DropdownItem
                  key={i}
                  value={e}
                  onClick={this.handleOptionSelect}
                >
                  {e}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      );
    };

    const DropdownOptionSwitch = (props) => {
      const [dropdownOpen, setOpen] = useState(false);
      const toggle = () => setOpen(!dropdownOpen);
      return (
        <div>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Filter option</DropdownToggle>
            <DropdownMenu>
              {objectKeysBoolean.map((e, i) => (
                <DropdownItem
                  key={i}
                  value={e}
                  onClick={this.handleOptionSwitch}
                >
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
                placeholder={"Search by " + filterString}
              ></input>
              <Button
                color="primary"
                onClick={this.handleSearch}
                disabled={this.handleDisableString()}
              >
                Search
              </Button>
              <DropdownOptionSearch></DropdownOptionSearch>
            </label>
          </div>
          <div>
            <DropdownSelector></DropdownSelector>
            <DropdownOptionSelect></DropdownOptionSelect>
          </div>
          <div>
            <Button
              value={this.state.userSwitch}
              color={this.handleSwitchColor()}
              onClick={this.handleSwitch}
              disabled={this.handleDisableSwitch()}
            >
              {filterSwitch}
            </Button>
            <DropdownOptionSwitch></DropdownOptionSwitch>
          </div>
        </div>

        <div>
          {this.state.filterPop.map((u, y) => (
            <div>
              <Button
                color={u.color}
                name={u.change}
                value={u.value}
                onClick={this.handleSearchPop}
              >
                {u.value}
              </Button>
              <Button
                color={u.color}
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
              {dataFiltered.map((e, i) => (
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
