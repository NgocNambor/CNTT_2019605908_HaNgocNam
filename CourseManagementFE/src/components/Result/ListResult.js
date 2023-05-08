import React,{Component} from "react";

import axios from "axios";

class ListResult extends Component{

    constructor(props){
        super(props);

        this.state = {
            results: [],
            employeeID: localStorage.getItem("ID")
        }
    }

    componentDidMount = () => {
        axios.get("http://localhost:5024/api/Result/EmployeeID?employeeID=" + this.state.employeeID)
        .then((response) => {
            this.setState({
                results: response.data
            })
        })
        .catch((error)=>{

        })
    }

    renderItem = () => {
        return(
            this.state.results.map((result) => {
                return(
                    <tr key={result.EmployeeID}>
                        <td>{result.CourseID}</td>
                        <td>{result.CourseName}</td>
                        <td style={{textAlign:"center"}} >{result.Score}</td>
                        <td>{result.Note}</td>
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
                </div>
                <table>
                    <thead>
                        <tr className="table_title ">
                            <th style={{width:"20%"}}>Mã khóa học</th>
                            <th style={{width:"40%"}}>Tên khóa học</th>
                            <th >Điểm số</th>
                            <th>Ghi chú</th>
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

export default ListResult;