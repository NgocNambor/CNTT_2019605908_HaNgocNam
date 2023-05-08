import axios from "axios";
import React,{Component} from "react";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";

class ListMemberOfCourse extends Component{

    constructor(props){
        super(props);

        this.state = {
            members: [],
            courseID: this.props.courseID,
            totalPage:1,
            pageNumber:1,
            pageSize:10,
            activePage:1,
            defaultUrl: 'http://localhost:5024/api/Result',
        }
    }

    handlePageChange = (pageNumber) =>{
        this.setState({ activePage: pageNumber});
        this.handlePaging(pageNumber,this.state.search);
    }

    handlePaging = (pageNumber) => {
        if(pageNumber !== null){
            let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize + "&pageNumber=" + pageNumber +"&courseFilter="+ this.state.courseID;
            this.componentDidMount(url);
        }
    }

    getDataSearch = () => {
        let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize +"&pageNumber=1"+"&courseFilter=" + this.state.courseID;
        axios.get(url).then((response) =>{
            this.setState({ totalPage: response.data.totalPage });
        })
        .catch((error) =>{
        });
    }
    getData = (url) =>{
        axios.get(url).then((response) =>{
            this.setState({ members: response.data.data });
        })
        .catch((error) =>{
        });
    }

    componentDidMount = (url = this.state.defaultUrl + "/filter?pageSize="+this.state.pageSize+"&pageNumber=1"+"&courseFilter="+ this.state.courseID) =>{
        this.getData(url);
        this.getDataSearch();
    }
   

    handleApproveScore = (EmployeeID, CourseID, note, event) => {
        const formData = {
            courseID: CourseID,
            employeeID: EmployeeID,
            score: parseFloat(event.target.value),
            ntoe: note
        }
        this.props.putScore(formData);
    }

    handleApproveNote = (EmployeeID, CourseID, Score, event) => {
        const formData = {
            courseID: CourseID,
            employeeID: EmployeeID,
            score: Score,
            note: event.target.value
        }
        this.props.putNote(formData);
    }

    renderItem = () => {
        return(
            this.state.members.map((member) => {
                return(
                    <tr key={member.employeeID}>
                        <td>{member.employeeID}</td>
                        <td>{member.employeeName}</td>
                        <td>
                            <input defaultValue={member.score} onChange={(event) => this.handleApproveScore(member.employeeID, this.props.courseID, member.note, event)}></input>
                        </td>
                        <td>
                            <input defaultValue={member.note} onChange={(event) => this.handleApproveNote(member.employeeID, this.props.courseID, member.score, event)} ></input>
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
                    <button className="btn_addd" onClick={this.props.handleShowMemberInCourse}>Quay lại </button>
                    </div>
                    <table>
                        <thead>
                            <tr className="table_title ">
                                <th>Mã nhân viên</th>
                                <th>Tên nhân viên</th>
                                <th>Điểm số</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItem()}
                        </tbody>
                    </table>
                    
                </div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.pageSize}
                    totalItemsCount={this.state.totalPage * this.state.pageSize}
                    pageRangeDisplayed={3}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        )
    }
}

export default ListMemberOfCourse;

