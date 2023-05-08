import './App.css';
import React,{Component} from 'react';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import Employee from './components/Employee/Employee';
import Trainer from './components/Trainer/Trainer';
class App extends Component {

  // componentDidMount() {
  //   window.addEventListener("beforeunload", this.clearLocalStorage);
  // }

  // clearLocalStorage() {
  //   localStorage.clear();
  // }

  render() {
    if(localStorage.getItem("role") != null){
      if(localStorage.getItem("role") === "admin"){
        return (
          <Admin ID = {localStorage.getItem("ID")}></Admin>
        )
      }
      else  if(localStorage.getItem("role") === "employee"){
        return (
          <Employee ID = {localStorage.getItem("ID")}></Employee>
        )
      }
      else  if(localStorage.getItem("role") === "trainer"){
        return (
          <Trainer ID = {localStorage.getItem("ID")}></Trainer>
        )
      }
    }
    else{
      return(
        <Login></Login>
       )
    }
  }
}
export default App;
