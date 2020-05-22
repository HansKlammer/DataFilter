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
    data:People,
    nameSort: "up"
  };

  

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSelect = (event) => {
    
      this.setState({ userSelect: event.target.value });
    

    let unique = this.state.filterPop
      .map((u, y) => u.changeUserValue)
      .filter((e, i, a) => a.indexOf(e) === i );

    let input = event.target.value;
    if (
      input.length > 0 &&
      unique.includes(this.state.filterSelect) === false
    ) {
      const userValue=this.state.filterSelect

      this.state.filterPop.push({
        value: input,
        changeInput: "userSelect",
        changeUser: "filterSelect",
        changeUserValue: userValue,
        color: "dark",
      });
    } else if(unique.includes(this.state.filterSelect)){
      const userValue=this.state.filterSelect
      let Badges = this.state.filterPop.filter((e, i) => e[unique] === this.state.filterSelect);
      this.setState({ filterPop:[...Badges,{
        value: input,
        changeInput: "userSelect",
        changeUser: "filterSelect",
        changeUserValue: userValue,
        color: "primary"
      }]});
      
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
      this.setState({ userSwitch: "true" });
    }
    let unique = this.state.filterPop
      .map((u, y) => u.changeUserValue)
      .filter((e, i, a) => a.indexOf(e) === i);

    let input = event.target.value;

    if (input.length > 0 && unique.includes(this.state.filterSwitch) === false) {
      const userValue=this.state.filterSwitch
      this.state.filterPop.push({
        value: input,
        changeInput: "userSwitch",
        changeUser: "filterSwitch",
        changeUserValue: userValue,
        color: "warning",

      });
    }else if(unique.includes(this.state.filterSwitch)){
      const userValue=this.state.filterSwitch
      let Badges = this.state.filterPop.filter((e, i) => e[unique] === this.state.filterSwitch);
      this.setState({ filterPop:[...Badges,{
        value: input,
        changeInput: "userSwitch",
        changeUser: "filterSwitch",
        changeUserValue: userValue,
        color: "primary"
      }]});
      
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
    console.log(this.state.filterPop)
    let input = this.state.userInput;
    this.setState({ userInputStatic: input });
    let unique = this.state.filterPop
      .map((u, y) => u.changeUserValue)
      .filter((e, i, a) => a.indexOf(e) === i);

    if (input.length > 0 && unique.includes(this.state.filterString) === false) {
      const userValue=this.state.filterString
      this.state.filterPop.push({
        value: input,
        changeInput: "userInputStatic",
        changeUser: "filterString",
        changeUserValue: userValue,
        color: "primary",
      });
    } else if(unique.includes(this.state.filterString)){
        const userValue=this.state.filterString
        let Badges = this.state.filterPop.filter((e, i) => e[unique] === this.state.filterString);
        this.setState({ filterPop:[...Badges,{
          value: input,
          changeInput: "userInputStatic",
          changeUser: "filterString",
          changeUserValue: userValue,
          color: "primary"
        }]});
        
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

  handleSort = (value,name) => {
    const nameSort =name
    let final=this.state.data
    if(nameSort === "up"){
    let input = value
    
    let sorted = final.sort((a,b)=>{
      if(a[input]===b[input]) return 0;
      return a[input]<b[input] ? -1 : 1;
    })
    this.setState({data:sorted,nameSort: "down"})
  }else if(nameSort === "down"){
    let input = value
    
    let sorted = final.reverse((a,b)=>{
      if(a[input]===b[input]) return 0;
      return a[input]<b[input] ? -1 : 1;
    })
    this.setState({data:sorted,nameSort: "up"})
  }
    
  
    //this.setState({data:final})
    //}else if(nameSort === "down"){
    //let yeet = this.state.data.map(e => e[input]).sort().reverse()
    //yeet.forEach((u,i)=> final[i][input]=u)
    //this.setState({data:final,nameSort: "up"})
    //}
  }

  render() {
    let dataRaw = []
    let initialInput = [{emptyString:"",emptyBool: false}] 
    if(this.state.data === undefined){
      dataRaw=initialInput
    }else{
      if(this.state.data.length === 0){
        dataRaw=initialInput
      }else{
        dataRaw= this.state.data
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

    let filterBages= this.state.filterPop


    let Selector = dataRaw
      .map((u, y) => u[filterSelect].toString())
      .filter((e, i, a) => a.indexOf(e) === i);
    let dataFiltered = dataRaw
    //  .filter((e) =>
    //   e[filterString].toString().includes(this.state.userInputStatic)
    //  )
    //  .filter((o) => o[filterSelect].toString().includes(this.state.userSelect))
    //  .filter((a) =>
    //   a[filterSwitch].toString().includes(this.state.userSwitch)
    //  );

      if(filterBages.length !== 0){ 
        let dataFilterBadges = dataFiltered
        filterBages.forEach(u => {dataFilterBadges =dataFilterBadges.filter(e => e[u.changeUserValue].toString().includes([u.value])) })
        dataFiltered = dataFilterBadges
      }
      
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
      <DropdownToggle caret>{this.state.filterString}</DropdownToggle>
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
            <DropdownToggle caret>{this.state.filterSelect}</DropdownToggle>
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
            <DropdownToggle caret>{this.state.filterSwitch}</DropdownToggle>
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
                color="dark"
                user={u.changeUser}
                userValue={u.changeUserValue}
                name={u.changeInput}
                value={u.value}
               
              >
                {u.changeUserValue}: {u.value}
              </Button>
              <Button
                key={y+1}
                color="dark"
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
          <Table dark responsive>
            <thead>
              <tr>
                <th scope="row">#</th>
                {objectKeys.map((e, i) => (
                  <td key={i} value={e} onClick={() => this.handleSort(e,this.state.nameSort)} >{e}</td>
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
