import React,{Component} from "react";
import { Route,Routes,Navigate } from "react-router-dom";

import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
class AppRouter extends Component{
    render(){
        return(
            <Routes>
                    <Route path="/admin" render={()=>{
                        return localStorage.getItem("role") ?<Admin></Admin>:<Navigate to="/"></Navigate>

                    }}></Route>
                    <Route path="/" element={<Login></Login>}></Route>
            </Routes>
        )
    }
}
export default AppRouter;