import React,{Component} from "react";
import { Route, Routes } from "react-router-dom";
import CourseList from "../Course/CourseList";
import TrainerList from "../Trainer/TrainerList";
import EmployeeList from "../Employee/EmployeeList";
import RegistrationList from "../Registration/RegistrationList";
class AdminContent extends Component{
    render(){
        return(
            <div className="content">
                <Routes>
                    <Route index element ={<CourseList/>}></Route>
                    <Route path="/coures" element={<CourseList/>}></Route>
                    <Route path="/trainer" element={<TrainerList/>}></Route>
                    <Route path="/student" element={<EmployeeList/>}></Route>
                    <Route path="/register" element={<RegistrationList/>}></Route> 
                </Routes>
            </div>
        )
    }
}

export default AdminContent;