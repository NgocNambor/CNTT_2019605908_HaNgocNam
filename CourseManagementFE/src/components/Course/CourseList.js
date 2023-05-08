import React,{Component} from "react";
import CourseFormAdd from "./CourseFormAdd";
import { Link } from "react-router-dom";
import CourseFormUpdate from "./CourseFormUpdate";
import axios from "axios";
import Common from "../../common/Common";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

class CourseList extends Component{

    constructor(props){
        super(props);

        this.state = {
            showFormAdd : false,
            showFormEdit: false,
            courses: [],
            course:{},
            totalPage:1,
            pageNumber:1,
            pageSize:8,
            activePage:1,
            defaultUrl: 'http://localhost:5024/api/Course',
            search: ""
        }
        this.common = new Common();

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
                url += "&courseFilter=" + search;
            }
            this.componentDidMount(url,search);
        }
    }

    //Api lấy danh sách course
    getData = (url) =>{
        axios(url).then((response) =>{
            this.setState({ courses: response.data.data });
            
        })
        .catch((error) =>{
            // Swal.fire(error);
        });
    }

    //Api lấy danh danh sách khóa học với tìm kiếm, phân trang
    getDataSearch = (search) => {
        let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize +"&pageNumber=1";
        if(search !== ""){
            url += "&courseFilter=" + search;
        }
        axios(url).then((response) =>{
            this.setState({ totalPage: response.data.totalPage });
        })
        .catch((error) =>{
        });
    }

    //Lấy giá trị tìm kiếm
    handleInputSearch = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    //Load Data
    componentDidMount = (url = this.state.defaultUrl + "/filter?pageSize="+this.state.pageSize+"&pageNumber=1", search = "") =>{
        this.getData(url);
        this.getDataSearch(search);
    }

    handleShowForm = () => {
        this.setState({
            showFormAdd: !this.state.showFormAdd
        });
    }
    handleShowHideFormEdit = (course) => {
        this.setState({
            course: course,
            showFormEdit: !this.state.showFormEdit
        });
    }

   postData = (formData) => {
        axios.post("http://localhost:5024/api/Course", formData)
        .then((response)=>{
            this.setState({
                showFormAdd: false
            })
            Swal.fire("Thêm mới thành công");
            this.componentDidMount();
            
        })
        .catch((error)=>{
        })
   }

   putData = (formData) => {
        axios.put("http://localhost:5024/api/Course", formData)
        .then((response)=>{
            this.setState({
                showFormEdit: false
            })
            Swal.fire("Cập nhật thành công");
            this.componentDidMount();
            
        })
        .catch((error)=>{
        })
   }

   renderItem = () => {
    return(
        this.state.courses.map((course) => {
            return(
            <tr key={course.courseID} onDoubleClick={()=>this.handleShowHideFormEdit(course)} >
                <td>{course.courseID}</td>
                <td>{course.courseName}</td>
                <td>{course.categoryName}</td>
                <td style={{textAlign:"center"}}>{this.common.formatBindingDate(course.startDay)}</td>
                <td style={{textAlign:"center"}}>{this.common.formatBindingDate(course.endDay)}</td>
            </tr>
            );})
        );
}

    render(){
        if(this.state.showFormAdd){
            return(
                    <CourseFormAdd
                    showFormAdd = {this.state.showFormAdd}
                    handleShowForm = {this.handleShowForm}
                    PostData = {this.postData}
                />
            )
        }else if(this.state.showFormEdit){
            return(
                <CourseFormUpdate
                    showFormEdit = {this.state.showFormEdit}
                    handleShowHideFormEdit = {this.handleShowHideFormEdit}
                    PutData = {this.putData}
                    course = {this.state.course}
                />
            )
        }
        return(
            <div className="base" >
                <div className="base_child">

                <div className="base_header" >
                    <input className="input_search"  onChange={(e) => {this.handlePaging(this.state.activePage, e.target.value)}}  ></input>
                {/* <Link to ='/courseAdd'> */}
                    <button className="btn_addd" onClick={this.handleShowForm}>Thêm mới</button>
                {/* </Link> */}
                </div>
                
                <table>
                    <thead>
                        <tr className="table_title ">
                            <th style={{width:"20%"}}>Mã khóa học</th>
                            <th style={{width:"30%"}}>Tên khóa học</th>
                            <th style={{width:"20%"}}>Danh mục</th>
                            <th style={{width:"15%"}}>Ngày bắt đầu</th>
                            <th style={{width:"15%"}}>Ngày kết thúc</th>
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

export default CourseList;