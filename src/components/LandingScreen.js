import React, { Component } from "react";
import People from "./People";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class LandingScreen extends Component {
  state = {
    userInput: "",
    userSelect: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelect = (event) => {
    this.setState({ userSelect: event.target.value });
  };

  render() {
    const filterString = "firstName";
    const filterSelect = "region";
    let PeopleFilterFinal = People.filter((e, i, a) =>
      e[filterString].includes(this.state.userInput)
    ).filter((o, i) => o[filterSelect].includes(this.state.userSelect));

    let PeopleFilterString = People.filter((e, i) =>
      e[filterString].includes(this.state.userInput)
    );
    let PeopleFilterSelect = People.filter(
      (e, i) => e[filterSelect] === this.state.userSelect
    );
    let Selector = People.map((e, i) => e[filterSelect]).filter(
      (e, i, a) => a.indexOf(e) === i
    );
    const Drop = (props) => {
      const [dropdownOpen, setOpen] = useState(false);
      const toggle = () => setOpen(!dropdownOpen);
      return (
        <div>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>{this.state.userSelect}</DropdownToggle>
            <DropdownMenu>
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
    console.log(PeopleFilterSelect);
    return (
      <div>
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
            <Drop />
          </div>
        </div>
        <div className="list">
          <div>
            <ListGroup size="sm">
              <ListGroupItem active>{filterString}</ListGroupItem>
              {PeopleFilterString.map((e, i) => (
                <ListGroupItem action key={i}>
                  {e[filterString]}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
          <div>
            <ListGroup size="sm">
              <ListGroupItem active>{filterSelect}</ListGroupItem>
              {PeopleFilterSelect.map((e, i) => (
                <ListGroupItem action key={i}>
                  {e[filterSelect]}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
          <div>
            <ListGroup size="sm">
              <ListGroupItem active>{filterSelect}</ListGroupItem>
              {PeopleFilterFinal.map((e, i) => (
                <div className="list">
                  <ListGroupItem action className="list" key={i}>
                    {e[filterString]}
                  </ListGroupItem>
                  <ListGroupItem action className="list" key={i}>
                    {e[filterSelect]}
                  </ListGroupItem>
                </div>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingScreen;
