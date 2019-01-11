import React, { Component } from 'react';
import logo from '.././logo.svg';
import Popup from "reactjs-popup";
import '.././App.css';
import { MyPage,  Login } from './MyPage';
class App extends Component  {
  getInitialState() {
    return {data: {comments:[]},isLoading: true,employee: [],
    groups: []};
    
}
constructor(props) {
  super(props);
  this.state = {
    employee: [],
    isLoading: false,
    isLogin:false,
    edit :""
  };
  this.state = {value: ''};
  this.handleChange = this.handleChange.bind(this);
} 
  componentDidMount() {
    this.refreshMe();
  }
  refreshMe() {
    fetch('http://localhost:8080/api/Employees')
      .then(response => response.json())
      .then(data => 
      this.setState({employee: data}), () => {});
  }
  handleChange(event) {
    this.setState({value: event.target.value},() => {});
  }
  showLogin() {
    this.setState({isLogin: !this.state.isLogin},() => {});
  }
  editEmployee(e) {
    if(e){
    this.setState( {
     edit: <div> 
        <Popup trigger={<button> Trigger</button>} children="<Login />" position="right center">
    <div> <form><label >Email:</label><input  type="text"  />
          <input type="submit"  value ="Click me"/> </form></div>
  </Popup>

          <form><label >Email:</label><input  type="text"  />
          <input type="submit"  value ="Click me"/> </form></div>
     } );
   }
  }
  render() {
    var employee=null;
    employee=this.state.employee;
    var ab = "null";
    if(employee != null ) {
     ab = employee.map(function(emp,index){
      return ( 
      <Profile key={emp.id}
       emp={emp}
       ind={index}
       edit ={(e) => {this.editEmployee(true);}}
       onDelete={() => {this.refreshMe();}} 
       />
      );
      });
    }
    var login = null;
    if(this.state.isLogin) {
      login = ( <Login />);
    }
    return (
      <div className="App">
        <header className="App-header"> 
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Initializer</h1>
        </header>
        
          <div className="sidebar"> 
            <div className="slidebar-top"><h3>Welcome to App</h3></div>
          <label>
              Pick your favorite city:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Noida">Noida</option>
            <option value="Delhi">Delhi</option>
            <option value="Gurugram">Gurugram</option>
            <option value="Faridabad">Faridabad</option>
          </select>
        </label>
        <MyPage key="abc" />
        <button onClick={() => {this.showLogin()}} >Login</button>
        {login}
        </div>
        <div className="content">
        <h2>Employee List</h2>
        <table striped bordered condensed  className="table">
        <thead className="thead">
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Created At</th>
      <th>Action</th>
      <th>Action</th>
    </tr>
  </thead>
         {ab}
         </table>
         {this.state.edit}
         </div>
      </div>

    );
  }
}
class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      edit: ""
    }

  }
  deleteEmployee(employeeId) {
    return  fetch('http://localhost:8080/api/Employees/'+employeeId, 
    {method:'DELETE'}).then((resp) => {
			if(resp.status === 202) {
        window.location.reload();
        console.info(resp.status,"  Deleted");
			}
			else {
				console.info(resp.status,"Not Deleted");
			}
		})
		.catch((err) => {
			console.error("Error  deleting Employee", err);
			
    });
  
       
   }
   

  render(){

    return(

          <tbody className="tbody"><tr >
          <td> {this.props.ind+1}</td>
          <td> {this.props.emp.firstName} {this.props.emp.lastName}</td>
                  <td> {this.props.emp.email} </td>
                  <td>{this.props.emp.createdAt}</td>
                  <td><button onClick={() => {this.deleteEmployee(this.props.emp.id)}} >DELETE</button></td>
                  <td><button onClick={() => {this.props.edit}} >EDIT</button></td>
              </tr>
          </tbody>
  );
      }
  }
  

export default App;
