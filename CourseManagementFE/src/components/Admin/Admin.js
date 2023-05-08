import './Admin.css';
import React, {Component} from "react";
import AdminNavBar from "./AdminNavBar";
import AdminContent from './AdminContent';

class Admin extends Component{

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
                    <AdminNavBar></AdminNavBar>
                    <AdminContent></AdminContent>
                </div>
            </div>
        )
    }
}

export default Admin;