import React, { Component } from 'react';
import imaage from '.././ic-del.png';
import Popup from "reactjs-popup";
import Well from 'react-bootstrap/lib/Well';
import Image from 'react-bootstrap/lib/Image';
class MyPage extends Component{
  state = {
    isLoading: true,
    groups: []
  };
  
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      isLoading: false
    };
    this.state = {names: 'rr'};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({names: event.target.value},() => {});
  }
  render() {
    var name =null;
    if(this.state.names.includes(this.props.location) ) {
       name = (
       <div> Location: {this.props.location} Welcome To :  {this.state.names} </div>
      );
    }
    return (
      <div> 
        <div>
       
  <Well bsSize="small">Look I'm in a small well!</Well>
</div>;
        <Popup trigger={<button> Trigger</button>} children="<Login />" position="right center">
    <div> <form><label >Email:</label><input  type="text" value={this.state.names} onChange={this.handleChange} />
          <input type="submit"  value ="Click me"/> </form></div>
  </Popup>
          {name}
          <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    closeOnDocumentClick
  >
    <span> <Image src={imaage} thumbnail   /></span>
  </Popup>
          <form><label >Email:</label><input  type="text" value={this.state.names} onChange={this.handleChange} />
          <input type="submit"  value ="Click me"/> </form></div>
    );
  }
}


class Login extends Component {
  state = {
    isLoading: true,
    groups: []
  };
  
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      isLoading: false
    };
    this.state = {username: 'vipul' ,newUserName:""};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({newUserName: event.target.value},() => {});
  }
  render() {
    var welcome ="";
    if(this.state.username === this.state.newUserName) {
      welcome = this.state.username;
    }
    else {
      welcome = ( 
       <div> 
         <label>Username:<input type="text" value={this.state.newUserName} onChange={this.handleChange} /></label>
        <label>Password:<input type="password" value={this.state.newUserName} onChange={this.handleChange} /></label>
        </div>
      );
    }
    return(
      <div> 
          {welcome}
      </div>
    );
  }
}

export { Login, MyPage};