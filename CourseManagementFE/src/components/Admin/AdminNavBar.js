import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminNavBar extends Component {
    render() {
        return (
            <div className="admin_navbar">
                <div className="navbar_menu">
                    <Link to="/coures">
                        <button className="btn" type="button" >
                            <i className="fas fa-book"></i>&ensp;
                            Quản lý khóa học</button>
                    </Link>
                </div>
                <div className="navbar_menu">
                    <Link to="/trainer">
                        <button className="btn" type="button">
                            <i className="fas fa-chalkboard-teacher"></i>&ensp;
                            Quản lý giảng viên
                        </button>
                    </Link>
                </div>
                <div className="navbar_menu">
                    <Link to="/student">
                        <button className="btn" type="button" >
                            <i className="fas fa-users"></i>&ensp;
                            Nhân viên</button>
                    </Link>
                </div>
                <div className="navbar_menu">
                    <Link to="/register">
                        <button className="btn" type="button" >
                            <i className="fas fa-users"></i>&ensp;
                            Đơn đăng ký
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default AdminNavBar;