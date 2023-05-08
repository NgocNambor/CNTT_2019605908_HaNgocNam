import '../Admin/Admin.css';
import React, {Component} from "react";
import EmployeeContent from './EmployeeContent';
import EmployeeNavBar from './EmployeeNavBar';
import AdminContent from '../Admin/AdminContent';

class Employee extends Component{

    handleLogout = () => {
        localStorage.clear();
    }

    render(){
        return(
            <div className="Admin">
                <div className="header" style={{display:"flex"}}>
                    <a href="../Login/" onClick={this.handleLogout}>Đăng xuất</a>
                </div>
                <div className="body">
                    <EmployeeNavBar></EmployeeNavBar>
                    <EmployeeContent></EmployeeContent>
                </div>
            </div>
        )
    }
}

export default Employee;