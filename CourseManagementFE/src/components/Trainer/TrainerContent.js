import React,{Component} from "react";
import TrainerPersonal from "./TPersonal";
import { Route, Routes } from "react-router-dom";
import CourseOpenTrainer from "./CourseOfTrainer";
class TrainerContent extends Component{
    render(){
        return(
            <div className="content">
                <Routes>
                    <Route index element ={<TrainerPersonal/>}></Route>
                    <Route path="/personal" element={<TrainerPersonal/>}></Route>
                    <Route path="/courseOpen" element={<CourseOpenTrainer/>}></Route>
                </Routes>
            </div>
            )
    }
}

export default TrainerContent;