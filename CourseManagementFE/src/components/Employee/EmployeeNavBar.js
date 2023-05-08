import React, { Component } from "react";
import { Link } from "react-router-dom";

class EmployeeNavBar extends Component {
    render() {
        return (
            <div className="admin_navbar">
                <div className="navbar_menu">
                    <Link to="/personal">
                        <button className="btn" type="button" >
                        <i className="fas fa-chalkboard-teacher"></i>&ensp;
                            Thông tin cá nhân</button>
                    </Link>
                </div>
                <div className="navbar_menu">
                    <Link to="/courseOpen">
                        <button className="btn" type="button">
                            <i className="fas fa-chalkboard-teacher"></i>&ensp;
                            Đăng ký khóa học
                        </button>
                    </Link>
                </div>
                <div className="navbar_menu">
                    <Link to="/result">
                        <button className="btn" type="button" >
                            <i className="fas fa-users"></i>&ensp;
                            Kết quả</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default EmployeeNavBar;