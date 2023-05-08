import React,{Component} from "react";
import RegistrationOfCourse from "./RegistrationOfCourse";
import axios from "axios";
import Swal from "sweetalert2";

class RegistrationList extends Component{

    constructor(props){
        super(props);

        this.state = {
            courses: [],
            courseForResgistration: {},
            isShowListRgt: false,
            EmployeeID :localStorage.getItem("ID"),
            employee: {}
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:5024/api/Course/CourseOpen')
        .then((response) => {
            this.setState({
                courses: response.data
            });
        })

        axios.get("http://localhost:5024/api/Employee/EmployeeID?employeeID=" + this.state.EmployeeID)
        .then((response) => {
            this.setState({
                employee: response.data
            })
            console.log(response);

        })
        .catch((error)=>{

        })
    }

    handleGetRegistration = (course) => {
        this.setState({
            isShowListRgt: !this.state.isShowListRgt,
            courseForResgistration: course
        });
    }

    handleRegister = (course) => {
        var a = this.state.employee.expOfYear;
        var b = course.ExpOfYear;
        console.log("nv" + a);
        console.log("kh" +b);
        if( a < b ){
            Swal.fire("Bạn chưa đủ kinh nghiệm để tham gia khóa học này!");
        }
        else{
            var formData = {
                courseID: course.CourseID,
                employeeID: this.state.EmployeeID,
                status:0,
            }
            axios.post("http://localhost:5024/api/Registration", formData)
            .then((response)=>{
                Swal.fire("Đăng ký thành công");
            })
            .catch((error)=>{
                Swal.fire(error.response.data.userMsg);
            })
        }
    }

   
    //Layout Admin
    renderItemAdmin = () => {
        return(
            this.state.courses.map((course) => {
                return(
                    <tr key={course.CourseID} onDoubleClick={() => this.handleGetRegistration(course)}>
                        <td>{course.CourseID}</td>
                        <td>{course.CourseName}</td>
                        <td>{course.CategoryName}</td>
                    </tr>
                )
            })
            
        )
    }

    renderItem = () => {
        return(
            this.state.courses.map((course) => {
                return(
                    <tr key={course.CourseID}>
                        <td>{course.CourseID}</td>
                        <td>{course.CourseName}</td>
                        <td>{course.CategoryName}</td>
                        <td style={{textAlign:"center"}} >{course.ExpOfYear}</td>
                        <td style={{textAlign:"center"}} >
                            <button style={{width:"120px", height:"40px"}} onClick={() => this.handleRegister(course)}>Đăng ký</button>
                        </td>
                        
                    </tr>
                )
            })
        )
    }

    render(){

        if(this.state.isShowListRgt){
            return(
                <RegistrationOfCourse
                course = {this.state.courseForResgistration}
                handleGetRegistration = {this.handleGetRegistration}
                />
            )
        }

        // Trang đăng ký cho nhân viên
        if(localStorage.getItem('role') === 'employee'){
            return(
                <div className="base">
                    <div className="base_child">
                        <div className="base_header">
                        </div>
                        <table>
                            <thead>
                                <tr className="table_title ">
                                    <th>Mã khóa học</th>
                                    <th>Tên khóa học</th>
                                    <th>Danh mục</th>
                                    <th style={{width:"15%"}}>Năm kinh nghiệm</th>
                                    <th style={{width:"30%"}}>Trạng thái</th>
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

        return(
            <div className="base">
                <div className="base_child">
                    <div style={{height:"50px"}}>
                    </div>
                    <table>
                        <thead>
                            <tr className="table_title ">
                                <th>Mã khóa học</th>
                                <th>Tên khóa học</th>
                                <th>Danh mục</th>
                                {/* <th>Số đơn đăng ký</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItemAdmin()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default RegistrationList;