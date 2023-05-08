import React,{Component} from "react";
import { Route, Routes } from "react-router-dom";
import Personal from "./Pesonal";
import RegistrationList from "../Registration/RegistrationList";
import ListResult from "../Result/ListResult";

class EmployeeContent extends Component{
    render(){
        return(
            <div className="content">
                <Routes>
                    <Route index element ={<Personal/>}></Route>
                    <Route path="/personal" element={<Personal/>}></Route>
                    <Route path="/courseOpen" element={<RegistrationList/>}></Route>
                    <Route path="/result" element={<ListResult/>}></Route>
                </Routes>
            </div>
        )
    }
}

export default EmployeeContent;