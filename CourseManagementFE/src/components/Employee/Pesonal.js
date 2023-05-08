import React,{Component} from "react";
import Common from "../../common/Common";
import axios from "axios";

class Personal extends Component{

    constructor(props){
        super(props);
        this.state = {
            employee: {},
            employeeID: localStorage.getItem("ID")
            
        }

        this.common = new Common();
    }

    componentDidMount = () => {
        axios.get("http://localhost:5024/api/Employee/EmployeeID?employeeID=" + this.state.employeeID)
        .then((response) => {
            this.setState({
                employee: response.data
            })
        })
        .catch((error)=>{

        })
    }

    renderItem = () => {
        return(
                <div className="base_child">
                    <h1 style={{ fontSize: "20px" }}>Thông tin nhân viên</h1>
                    <div className="row1 first">
                        <div className="element">
                            <div className="element_name">Mã nhân viên</div>
                            <input value={this.state.employee.employeeID} disabled></input>
                        </div>

                        <div className="element">
                            <div className="element_name">Tên nhân viên</div>
                            <input defaultValue={this.state.employee.employeeName} disabled ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Giới tính</div>
                            <input defaultValue={this.state.employee.gender === 0 ? "Nữ" : "Nam"} disabled></input>
                        </div>
                        
                    </div>
                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Ngày sinh</div>
                            <input defaultValue={this.common.formatBindingDate(this.state.employee.dateOfBirth)} disabled></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Địa chỉ</div>
                            <input defaultValue={this.state.employee.address} disabled></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Số điện thoại</div>
                            <input defaultValue={this.state.employee.phoneNumber} disabled></input>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Email</div>
                            <input defaultValue={this.state.employee.email} disabled></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Chức vụ </div>
                            <input defaultValue={this.state.employee.positionName} disabled></input>
                        </div>
                        
                        <div className="element">
                            <div className="element_name">Phòng ban</div>
                            <input defaultValue={this.state.employee.departmentName} disabled></input>
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

export default Personal;