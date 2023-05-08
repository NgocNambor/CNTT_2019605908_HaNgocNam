import Admin from '../Admin/Admin';
import Employee from '../Employee/Employee';
import EmployeeList from '../Employee/EmployeeList';
import Trainer from '../Trainer/Trainer';
import TrainerList from '../Trainer/TrainerList';
import './Login.css';
import React, { Component } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "username": "",
      "password": "",
      role: "",
      ID:"",
      isLogin: false
    };
  }

  setParams = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleUserName = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleValidation = () => {
    let returnData = {
        formIsValid: true,
        errMes: ''
    }
    if (this.state.username.trim() === '') {
        returnData = {
            errMes: "Tên đăng nhập không được để trống!",
            formIsValid: false
        }
    }
    else if (this.state.password.trim() === '') {
        returnData = {
            errMes: "Mật khẩu không được để trống!",
            formIsValid: false
        }
    }
    return returnData;
}

  login = (event) => {
    event.preventDefault();

    const valiadtion = this.handleValidation();
        if (!valiadtion.formIsValid) {
            Swal.fire(valiadtion.errMes);
        }
    else {
      const formData = {
        username: this.state.username,
        password: this.state.password
      }

      axios.post("http://localhost:5024/api/Account/Login", formData)
      .then((response)=>{
        const decode = jwtDecode(response.data.token)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", decode.role);
        localStorage.setItem("ID", decode.unique_name);
        this.setState({
            isLogin: true,
            role: decode.role
        });
      })
      .catch((error)=>{
        Swal.fire(error.response.data.userMsg);
      })
    }

  }
  render() {
    if (this.state.isLogin) {
      if(localStorage.getItem("role") === "admin"){
        return(
          <Admin 
            key={localStorage.getItem("role")}
            ID={this.state.ID}
           />
        )
      }
      else if(localStorage.getItem("role") === "trainer"){
        return(
          <Trainer key={localStorage.getItem("role")}
          ID={this.state.ID}></Trainer>
        )
      }
      else if(localStorage.getItem("role") === "employee"){
        return(
          <Employee key={localStorage.getItem("role")}
          ID={this.state.ID}></Employee>
        )
      }
    }
    else {
    return (
      <div className='login_layout'>
        <div className='layout'>
          <h1>Đăng nhập</h1>
          <div className='form_field'>
            <div className='field' >
              Tài khoản
            </div>
            <input value={this.state.username}
              onChange={this.handleUserName}
              name='username'
            ></input>
          </div>
          <div className='form_field'>
            <div className='field'>
              Mật khẩu
            </div>
            <input type='password'
              value={this.state.password}
              onChange={this.handlePassword}
              name='password'></input>
          </div>
          <button type='button' className='button_login' onClick={this.login}>Đăng nhập</button>
        </div>
      </div>
    );
  }
  }
}

export default Login;