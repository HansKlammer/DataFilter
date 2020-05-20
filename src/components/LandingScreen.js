import React, { Component, useState } from "react";
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from "reactstrap";
import People from "./People";
import UserInfo from "./UserInfo"
import Customer from "./Customer"

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
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSelect = (event) => {
    if (event.target.value === "defaultsetState") {
      this.setState({ userSelect: "" });
    } else {
      this.setState({ userSelect: event.target.value });
    }
    let compare = this.state.filterSelect + event.target.value + "filterSelect"
    let unique = this.state.filterPop
      .map((u, y) => u.checker)
      .filter((e, i, a) => a.indexOf(e) === i );

    let input = event.target.value;
    if (
      input.length > 0 &&
      input !== "default" &&
      unique.includes(compare) === false
    ) {
      const userValue=this.state.filterSelect
      this.state.filterPop.push({
        value: input,
        changeInput: "userSelect",
        changeUser: "filterSelect",
        changeUserValue: userValue,
        checker: userValue + input + "filterSelect",
        color: "dark",
      });
    }
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
    let compare = this.state.filterSwitch + event.target.value + "filterSwitch"
    let unique = this.state.filterPop
      .map((u, y) => u.checker)
      .filter((e, i, a) => a.indexOf(e) === i);

    let input = event.target.value;

    if (input.length > 0 && unique.includes(compare) === false) {
      const userValue=this.state.filterSwitch
      this.state.filterPop.push({
        value: input,
        changeInput: "userSwitch",
        changeUser: "filterSwitch",
        changeUserValue: userValue,
        checker: userValue + input + "filterSwitch",
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
    let compare = this.state.filterString + this.state.userInput + "filterString"
    let unique = this.state.filterPop
      .map((u, y) => u.checker)
      .filter((e, i, a) => a.indexOf(e) === i);

    if (input.length > 0 && unique.includes(compare) === false) {
      const userValue=this.state.filterString
      this.state.filterPop.push({
        value: input,
        changeInput: "userInputStatic",
        changeUser: "filterString",
        changeUserValue: userValue,
        checker: userValue + input + "filterString",
        color: "primary",
      });
    }
  };


  handleDelete = (event) => {
    let input = event.target.value;
    let Badges = this.state.filterPop.filter((e, i) => input !== i.toString());
    this.setState({ filterPop: Badges, [event.target.name]:""});
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
    let dataRaw = []
    let initialInput = [{emptyString:"",emptyBool: false}] 
    if(this.data === undefined){
      dataRaw=initialInput
    }else{
      if(this.data.length === 0){
        dataRaw=initialInput
      }else{
        dataRaw= this.data
      }

    }
    
    let objectKeys = Object.keys(dataRaw[0])
    
  
    
    let booleanKeys = [];
    let stringKeys = [];
    objectKeys.forEach((e, i) =>
      dataRaw.forEach((u) => {
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
      filterString =  objectKeysString[0];
    }
    if (filterSelect === "") {
      filterSelect =  objectKeysString[0];
    }
    if (filterSwitch === "") {
      filterSwitch =  objectKeysString[0];
    }
    let Selector = dataRaw
      .map((u, y) => u[filterSelect].toString())
      .filter((e, i, a) => a.indexOf(e) === i);
    let dataFiltered = dataRaw
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
              <DropdownItem onClick={this.handleSelect} value="defaultsetState">
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
                  
                  onClick={() => this.setState({ filterString: e})}
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
                  onClick={() => this.setState({ filterSelect: e})}
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
                  onClick={() => this.setState({ filterSwitch: e})}
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
          <Button color="info" onClick={() => this.setState({userInputStatic: "",
              userInput: "",
              userSelect: "",
              userSwitch: ""})}>
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
                key={y}
                color={u.color}
                user={u.changeUser}
                userValue={u.changeUserValue}
                name={u.changeInput}
                value={u.value}
                onClick={() => this.setState({  
                [u.changeInput]: u.value,
                [u.changeUser]: u.changeUserValue})}
              >
                {u.changeUserValue}: {u.value}
              </Button>
              <Button
                key={y+1}
                color={u.color}
                name={u.changeInput}
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
                  <td key={i} className="bold">{e}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataFiltered.map((e, i) => (
                <tr key={i}>
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
