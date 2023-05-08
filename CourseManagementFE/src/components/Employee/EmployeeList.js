import React,{Component} from "react";
import axios from "axios";
import Pagination from "react-js-pagination";

class EmployeeList extends Component{

    constructor(props){
        super(props);

        this.state = {
            employees: [],
            totalPage:1,
            pageNumber:1,
            pageSize:8,
            activePage:1,
            defaultUrl: 'http://localhost:5024/api/Employee',
            search: ""
        }
    }

    componentDidMount = (url = this.state.defaultUrl + "/filter?pageSize="+this.state.pageSize+"&pageNumber=1", search = "") =>{
        this.getData(url);
        this.getDataSearch(search);
    }

    handleInputSearch = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handlePageChange = (pageNumber) =>{
        this.setState({ activePage: pageNumber});
        this.handlePaging(pageNumber,this.state.search);
    }

    //Lấy danh sách theo số trang
    handlePaging = (pageNumber, search) => {
        if(pageNumber !== null){
            let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize + "&pageNumber=" + pageNumber;
            if(search !== ""){
                url += "&employeeFilter=" + search;
            }
            this.componentDidMount(url,search);
        }
    }

    //Api lấy danh sách course
    getData = (url) =>{
        axios(url).then((response) =>{
            this.setState({ employees: response.data.data });
            
        })
        .catch((error) =>{
            // Swal.fire(error);
        });
    }

    //Api lấy danh danh sách khóa học với tìm kiếm, phân trang
    getDataSearch = (search) => {
        let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize +"&pageNumber=1";
        if(search !== ""){
            url += "&employeeFilter=" + search;
        }
        axios(url).then((response) =>{
            this.setState({ totalPage: response.data.totalPage });
        })
        .catch((error) =>{
        });
    }

    renderItem = () => {
        return(
            this.state.employees.map((employee) => {
                return(
                <tr key={employee.employeeID} onDoubleClick={this.handleShowHideFormEdit} >
                    <td>{employee.employeeID}</td>
                    <td>{employee.employeeName}</td>
                    <td>{employee.positionName}</td>
                    <td>{employee.departmentName}</td>
                    {/* <td>{this.common.formatBindingDate(course.StartDate)}</td>
                    <td>{this.common.formatBindingDate(course.EndDate)}</td> */}
                    <td>{employee.email}</td>
                </tr>
                );})
            );
    }
    render(){
        return(
            <div className="base" >
                <div className="base_child">

                <div className="base_header" >
                    <input className="input_search" onChange={(e) => {this.handlePaging(this.state.activePage, e.target.value)}}  ></input>
                {/* <Link to ='/courseAdd'> */}
                    {/* <button className="btn_addd" onClick={this.handleShowForm}>ADD COURSE</button> */}
                {/* </Link> */}
                </div>
                
                <table>
                    <thead>
                        <tr className="table_title ">
                            <th style={{width:"150px"}}>Mã nhân viên</th>
                            <th style={{width:"200px"}}>Tên nhân viên</th>
                            <th style={{width:"150px"}}>Chức vụ</th>
                            <th style={{width:"150px"}}>Phòng ban</th>
                            <th style={{width:"150px"}}>Email</th>
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

export default EmployeeList;