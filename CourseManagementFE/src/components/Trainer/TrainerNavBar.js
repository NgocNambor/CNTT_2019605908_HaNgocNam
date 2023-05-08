import React,{Component} from "react";
import { Link } from "react-router-dom";
class TrainerNavBar extends Component{
    render(){
        return(
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
                            Các khóa học
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default TrainerNavBar;