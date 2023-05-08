import React,{Component} from "react";
import axios from "axios";
import Swal from "sweetalert2";

class RegistrationOfCourse extends Component{
    constructor(props){
        super(props);

        this.state = {
            courses: [],
            course: this.props.course,
            registrations:[]
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:5024/api/Registration/CourseID?courseID=' + this.props.course.CourseID + '')
        .then((response) => {
            this.setState({
                registrations: response.data
            })
        })
    }

    handleApprove = (registration) => {
        var formData = {
            employeeID: registration.employeeID,
            courseID: this.props.course.CourseID,
            status: 1
        }
        axios.put("http://localhost:5024/api/Registration", formData)
        .then((response) => {
            Swal.fire("Duyệt đơn thành công");
            this.componentDidMount();
        })
        .catch((error)=> {
        })
    }

    handleUnApprove = (registration) => {
        var formData = {
            employeeID: registration.employeeID,
            courseID: this.props.course.CourseID,
            status: 2
        }
        axios.put("http://localhost:5024/api/Registration", formData)
        .then((response) => {
            Swal.fire("Hủy đơn thành công");
            this.componentDidMount();

        })
        .catch((error)=> {
        })
    }


    //List đơn đăng ký
    renderItem = () => {
        return(
            this.state.registrations.map((registration) => {
                return(
                    <tr key={registration.employeeID}>
                        <td>{registration.employeeID}</td>
                        <td>{registration.employeeName}</td>
                        <td>
                            <button style={{width:"120px", height:"40px"}} onClick={() => this.handleApprove(registration)} >Xác nhận</button>
                        </td>
                        <td>
                            <button style={{width:"120px", height:"40px"}}onClick={() => this.handleUnApprove(registration)}>Hủy xác nhận</button>
                        </td>
                    </tr>
                )
            })
        )
    }

    render(){
        return(
            <div className="base">
                <div className="base_child">
                    <div className="base_header">
                        <button className="btn_addd" onClick={this.props.handleGetRegistration}>Quay lại</button>
                    </div>
                    <table>
                        <thead>
                            <tr className="table_title ">
                                <th>Mã nhân viên</th>
                                <th>Tên nhân viên</th>
                                <th style={{width:"30%"}} colSpan={2}>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItem()}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
    }
}

export default RegistrationOfCourse