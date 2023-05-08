import React,{Component} from "react";
import TrainerFormAdd from "./TrainerFormAdd"
import axios from "axios";
import TrainerFormEdit from "./TrainerFormEdit";
import Common from "../../common/Common";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
class TrainerList extends Component{

    constructor(props){
        super(props);

        this.state = {
            showFormAdd: false,
            showFormEdit: false,
            trainers: [],
            trainer:{},
            totalPage:1,
            pageNumber:1,
            pageSize:8,
            activePage:1,
            defaultUrl: 'http://localhost:5024/api/Trainer',
            search: ""
        }

        this.common = new Common();
    }

    //Load data
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
                url += "&trainerFilter=" + search;
            }
            this.componentDidMount(url,search);
        }
    }

    //Api lấy danh sách course
    getData = (url) =>{
        axios(url).then((response) =>{
            this.setState({ trainers: response.data.data });
            
        })
        .catch((error) =>{
            // Swal.fire(error);
        });
    }

    //Api lấy danh danh sách khóa học với tìm kiếm, phân trang
    getDataSearch = (search) => {
        let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize +"&pageNumber=1";
        if(search !== ""){
            url += "&trainerFilter=" + search;
        }
        axios(url).then((response) =>{
            this.setState({ totalPage: response.data.totalPage });
        })
        .catch((error) =>{
        });
    }


    // Handle Show Form
    handleShowFormAdd = () => {
        this.setState({
            showFormAdd: !this.state.showFormAdd
        })
    }

    handleShowFormEdit = (trainer) => {
        this.setState({
            showFormEdit: !this.state.showFormEdit,
            trainer: trainer
        })
    }

    
    // Post Pust Api
    handlePost = (formData) => {
        axios.post("http://localhost:5024/api/Trainer", formData)
        .then((response) => {
            this.setState({
                showFormAdd: false
            })
            Swal.fire("Thêm mới thành công");
            this.componentDidMount();
        })
        .catch((error) => {

        });

        
    }

    handlePut = (formData) => {
        axios.put("http://localhost:5024/api/Trainer", formData)
        .then((response) => {
            this.setState({
                showFormEdit: false
            })
            this.componentDidMount();
            Swal.fire("Cập nhật thành công");
        })
        .catch((error) => {

        });
    }

    renderItem = () => {
        return(
            this.state.trainers.map((trainer) => {
                return(
                <tr key={trainer.trainerID} onDoubleClick={() => this.handleShowFormEdit(trainer)} >
                    <td>{trainer.trainerID}</td>
                    <td>{trainer.trainerName}</td>
                    <td>{trainer.levelName}</td>
                    <td>{trainer.major}</td>
                    <td>{trainer.email}</td>
                </tr>
                );})
            );
    }

    render(){

        if(this.state.showFormAdd) {
            return(
                <TrainerFormAdd
                    showFormAdd = {this.state.showFormAdd}
                    handleShowFormAdd = {this.handleShowFormAdd}
                    onPost = {this.handlePost}
                />
            )
        }
        else if(this.state.showFormEdit){
            return(
                <TrainerFormEdit
                    showFormEdit = {this.state.showFormEdit}
                    handleShowFormEdit = {this.handleShowFormEdit}
                    onPut = {this.handlePut}
                    trainer = {this.state.trainer}
                />
            )
        }

        return(
            <div className="base" >
                <div className="base_child">

                <div className="base_header" >
                    <input className="input_search" onChange={(e) => {this.handlePaging(this.state.activePage, e.target.value)}}   ></input>
                    <button className="btn_addd" onClick={this.handleShowFormAdd}>Thêm</button>
                </div>
                
                <table>
                    <thead>
                        <tr className="table_title ">
                            <th >Mã giảng viên</th>
                            <th >Tên giảng viên</th>
                            <th >Trình độ</th>
                            <th >Lĩnh vực</th>
                            <th >Email</th>
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
export default TrainerList;