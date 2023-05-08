import '../Admin/Admin.css'
import React, {Component} from "react";
import TrainerContent from './TrainerContent';
import TrainerNavBar from './TrainerNavBar';


class Trainer extends Component{

    handleLogout = () => {
        localStorage.clear();
    }

    render(){
        return(
            <div className="Admin">
                <div className="header" style={{display:"flex"}}>
                    <a href="../Login/"  onClick={this.handleLogout}>Đăng xuất</a>
                </div>
                <div className="body">
                    <TrainerNavBar></TrainerNavBar>
                    <TrainerContent></TrainerContent>
                </div>
            </div>
        )
    }
}

export default Trainer;