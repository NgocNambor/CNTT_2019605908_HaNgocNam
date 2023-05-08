import axios from "axios";
import React,{Component} from "react";
import Common from "../../common/Common";
import ListMemberOfCourse from "./ListMemberOfCourse";
import Swal from "sweetalert2";

class CourseOpenTrainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            courses: [],
            courseID:"",
            trainerID: localStorage.getItem("ID"),
            showMember: false
        }

        this.common = new Common();
    }

    componentDidMount = () => {
        axios.get("http://localhost:5024/api/Course/CourseOpenTrainer?trainerID=" + this.state.trainerID)
        .then((response) => {
            this.setState({
                courses: response.data
            })
        })
        .catch((error)=> {
            
        })
    }

    handlePutNote= (formData) => {
        axios.put("http://localhost:5024/api/Result", formData)
        .then((respone) => {
            this.handleShowResult(formData.courseID);
        }).catch((error)=>{
            Swal.fire(error.respone.data.userMsg);

        });
    };

    handlePutScore = (formData) => {
        axios.put("http://localhost:5024/api/Result", formData)
        .then((respone) => {
           
            this.handleShowResult(formData.courseID);
        }).catch((error)=>{

        });
    }

    handleShowMemberInCourse = (course) => {
        this.setState({
            showMember: !this.state.showMember,
            courseID: course.CourseID
        })
    }

    renderItem = () => {
        return(
            this.state.courses.map((course) => {
                return(
                    <tr key={course.CourseID} onClick={() => this.handleShowMemberInCourse(course)}>
                        <td>{course.CourseID}</td>
                        <td>{course.CourseName}</td>
                        <td>{this.common.formatBindingDate(course.StartDay)}</td>
                        <td>{this.common.formatBindingDate(course.EndDay)}</td>
                    </tr>
                )
            })
        )
    }

    render(){
        if(this.state.showMember === true){
            return(
                <ListMemberOfCourse
                courseID = {this.state.courseID}
                handleShowMemberInCourse = {this.handleShowMemberInCourse}
                putNote = {this.handlePutNote}
                putScore = {this.handlePutScore}
                />
            )
        }
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
                                <th style={{textAlign:"center"}}>Ngày bắt đầu</th>
                                <th style={{textAlign:"center"}}>Ngày kết thúc</th>
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

export default CourseOpenTrainer;