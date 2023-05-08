import axios from "axios";
import React,{Component} from "react";
import Common from "../../common/Common";
import Swal from "sweetalert2";
class TrainerPersonal extends Component{
    constructor(props){
        super(props);
        this.state = {
            trainer: {},
            trainerID: localStorage.getItem("ID"),
        }
        this.common = new Common();
        
    }


    componentDidMount = () => {
       axios.get("http://localhost:5024/api/Trainer/" + this.state.trainerID)
       .then((response) => {
            this.setState({ trainer:response.data});
        })
        .catch((error) => {
            Swal.fire(error.response.data.userMsg);
        }) 

        
    }

    // Hiển thị thông tin Trainer 
    renderItem = () => {
        return(
                <div className="base_child">
                    <h1 style={{ fontSize: "20px" }}>Thông tin giảng viên</h1>
                    <div className="row1 first">
                        <div className="element">
                            <div className="element_name">Mã giảng viên</div>
                            <input value={this.state.trainer.trainerID} disabled ></input>
                        </div>

                        <div className="element">
                            <div className="element_name">Tên giảng viên</div>
                            <input defaultValue={this.state.trainer.trainerName } disabled></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Giới tính</div>
                            <input defaultValue={this.state.trainer.gender === 0 ? "Nữ" : "Nam"} disabled></input>
                        </div>
                        
                    </div>
                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Ngày sinh</div>
                            <input defaultValue={this.common.formatBindingDate(this.state.trainer.dateOfBirth)} disabled></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Địa chỉ</div>
                            <input defaultValue={this.state.trainer.address} disabled></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Số điện thoại</div>
                            <input defaultValue={this.state.trainer.phoneNumber} disabled></input>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Trình độ chuyên môn</div>
                            <input defaultValue={this.state.trainer.levelName} disabled></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Email</div>
                            <input defaultValue={this.state.trainer.email}disabled ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Lĩnh vực</div>
                            <input defaultValue={this.state.trainer.major}disabled></input>
                        </div>
                        
                    </div>
                </div>
        )
    }

    render(){
        return(
            <div className="base">
                {this.renderItem()}
            </div>
        )
    }
}
export default TrainerPersonal;