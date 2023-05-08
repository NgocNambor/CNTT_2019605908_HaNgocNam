import React,{Component} from "react";
import axios from "axios";
import Common from "../../common/Common";
import Swal from "sweetalert2";
class CourseFormUpdate extends Component{

    constructor(props){
        super(props);

        this.state = {
            course: this.props.course,
            showListCategory: false,
            showListTrainer: false,
            showListType: false,
            showListStatus: false,
            categories: [],
            categoryID:this.props.course.categoryID,
            categoryName:this.props.course.categoryName,
            trainers: [],
            trainerID:this.props.course.trainerID,
            trainerName:this.props.course.trainerName,
            trainingTypes:[],
            trainingTypeID:this.props.course.trainingTypeID,
            trainingTypeName:this.props.course.trainingTypeName,
            courseID:this.props.course.courseID,
            courseName:this.props.course.courseName,
            duration:this.props.course.duration,
            startDay:this.props.course.startDay,
            endDay:this.props.course.endDay,
            expOfYear:this.props.course.expOfYear,
            description: this.props.course.description,
            numOfMembers:this.props.course.numOfMembers,
            status: this.props.course.status,
            statusName: this.props.course.statusName,
            statuss: [
                { 
                    key :0,
                    value  : 'Tạm đóng',
                },
                { 
                    key :1,
                    value  : 'Mở đăng ký',
                },
                { 
                    key :2,
                    value  : 'Đang mở',
                },
                { 
                    key :3,
                    value  : 'Đã kết thúc'
                }
            ]
        }

        this.common = new Common();
    }

    handleValidation = () =>{
        let returnData={
          formIsValid : true,
          errMes : ''
        }
        
        
        if (this.state.trainingTypeID.toString().trim() === '') {
          returnData={
            errMes : "Chưa chọn hình thức dạy",
            formIsValid : false
          }
        }
  
        if (this.state.trainerID.trim() === '') {
          returnData={
            errMes : "Chưa chọn giảng viên",
            formIsValid : false
          }
        }
        if (this.state.endDay.toString().trim() === '') {
            returnData={
              errMes : "Chưa chọn ngày kết thúc",
              formIsValid : false
            }
          }
    
          if (this.state.startDay.toString().trim() === '') {
            returnData={
              errMes : "Chưa chọn ngày bắt đầu",
              formIsValid : false
            }
          }
        if (this.state.duration.toString().trim() === '') {
            returnData={
              errMes : "Chưa nhập thời lượng khóa học",
              formIsValid : false
            }
          }
          
        //   else if (this.state.duration.match("^[0-9]{1,20}$") == null){
        //     returnData={
        //       errMes : "Thời lượng khóa học không có ký tự chữ",
        //       formIsValid : false
        //     }
        //   }
        if (this.state.categoryID.toString().trim() === '') {
            returnData={
              errMes : "Chưa chọn danh mục",
              formIsValid : false
            }
          }
        if (this.state.courseName.trim() === '') {
          returnData={
            errMes : "Tên khóa học không được để trống",
            formIsValid: false
          }
        }
        else if(this.state.courseName.length < 3) {
          returnData = {
            formIsValid : false,
            errMes : 'Tên khóa học phải lớn hơn 3 kí tự!'
          }
        }
        return returnData;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const valiadtion = this.handleValidation();
        if(!valiadtion.formIsValid){
          Swal.fire(valiadtion.errMes);
        }
        else{
        const formData = {
            courseID: this.props.course.courseID,
            courseName: this.state.courseName,
            categoryID: this.state.categoryID,
            duration:this.state.duration,
            startDay:this.state.startDay,
            status: this.state.status,
            endDay:this.state.endDay,
            trainerID:this.state.trainerID,
            trainingTypeID:this.state.trainingTypeID,
            expOfYear: this.state.expOfYear === null ? this.props.course.expOfYear :  parseInt(this.state.expOfYear),
            description:this.state.description
        }
        this.props.PutData(formData);
    }
    }

    handleShowListStatus = () => {
        this.setState({
            showListStatus: !this.state.showListStatus
        })
    }
    handleClickGetStatus = (status) => {
        this.setState({
            showListStatus: false,
            status: status.key,
            statusName: status.value
        });

      }

    handleShowListTrainer = () => {
        axios.get("http://localhost:5024/api/Trainer")
        .then((response) => {
            this.setState({
                trainers: response.data,
                showListTrainer: !this.state.showListTrainer
            })
        })
    }

    handleClickGetTrainer = (trainer) => {
        this.setState({
            showListTrainer: false,
            trainerID: trainer.trainerID,
            trainerName: trainer.trainerName
        });
      }

    handleShowListCategory= () => {
        axios.get("http://localhost:5024/api/Category")
        .then((response) => {
            this.setState({
                categories: response.data,
                showListCategory: !this.state.showListCategory
            })
        })
    }

    handleClickGetCategory = (category) => {
        this.setState({
            showListCategory: false,
            categoryID: category.categoryID,
            categoryName: category.categoryName
        });
      }

    handleShowListTrainingType = () => {
        axios.get("http://localhost:5024/api/TrainingType")
        .then((response)=>{
           this.setState({
            trainingTypes: response.data,
            showListType: !this.state.showListType
           })
        })
    }

    handleClickGetTrainingType = (trainingType) => {
        this.setState({
            showListType: false,
            trainingTypeID: trainingType.trainingTypeID,
            trainingTypeName: trainingType.trainingTypeName
        });
      }

    handleInputChangeCourseID = (event) =>{
        this.setState({ courseID: event.target.value});
    }
    handleInputChangeCourseName = (event) =>{
        this.setState({ courseName: event.target.value});
    }
    handleInputChangeStartDay = (event) =>{
        this.setState({ startDay: event.target.value});
    } 
    handleInputChangeEndDay = (event) =>{
        this.setState({ endDay: event.target.value});
    }
    handleInputChangeDuration = (event) =>{
        this.setState({ duration: event.target.value});
    }
    handleInputChangeExp = (event) =>{
        this.setState({ expOfYear: event.target.value});
    }
    handleInputChangeDescription = (event) =>{
        this.setState({ description: event.target.value});
    }

    render(){
        if(this.props.showFormEdit === false) return null;
        return (
            <div className="base">
                <div className="base_child">
                    <h1 style={{ fontSize: "20px" }}>Cập nhật khóa học</h1>
                    <div className="row1 first">
                        <div className="element">
                            <div className="element_name">Mã khóa học</div>
                            <input disabled defaultValue={this.props.course.courseID} value={this.state.courseID} onChange={this.handleInputChangeCourseID}></input>
                        </div>

                        <div className="element">
                            <div className="element_name">Tên khóa học</div>
                            <input maxLength={30} defaultValue={this.props.course.courseName} value={this.state.courseName} onChange={this.handleInputChangeCourseName}></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Danh mục</div>
                            <div style={{ display: "flex" }}>
                                <input className="inputt" defaultValue={this.props.course.categoryName} value={this.state.categoryName}></input>
                                <div style={{ borderRadius: "5px", width: "50px", height: "54px", backgroundColor: "#1f2c43" }} onClick={this.handleShowListCategory}></div>
                                {
                                    this.state.showListCategory === true &&
                                    <ul style={{position:"absolute", width:"300px", backgroundColor:"#ccc", overflow:"scroll"}}>
                                            { this.state.categories.map((category) => (
                                                <li key={category.categoryID} onClick={() => this.handleClickGetCategory(category)} >{category.categoryName}</li>
                                            ))}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Thời gian (H)</div>
                            <input maxLength={3} defaultValue={this.props.course.duration} value={this.state.duration} onChange={this.handleInputChangeDuration}></input>
                        </div>

                        <div className="element">
                            <div className="element_name">Ngày bắt đầu</div>
                            <input type="date" defaultValue={this.common.formatBindingDate(this.props.course.startDay)} value={this.common.formatBindingDate(this.state.startDay)} onChange={this.handleInputChangeStartDay}></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Ngày kết thúc</div>
                            <input type="date" defaultValue={this.common.formatBindingDate(this.props.course.endDay)} value={this.common.formatBindingDate(this.state.endDay)} onChange={this.handleInputChangeEndDay}></input>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Trạng thái</div>
                            <div style={{ display: "flex" }}>
                                <input className="inputt" defaultValue={this.props.course.statusName} value={this.state.statusName}></input>
                                <div style={{ borderRadius: "5px", width: "50px", height: "54px", backgroundColor: "#1f2c43" }} onClick={this.handleShowListStatus}></div>
                                {
                                    this.state.showListStatus === true &&
                                    <ul style={{position:"absolute", width:"300px", backgroundColor:"#ccc"}}>
                                            { this.state.statuss.map((status) => (
                                                <li key={status.key} onClick={() => this.handleClickGetStatus(status)} >{status.value}</li>
                                            ))}
                                    </ul>
                                }
                            </div>
                        </div>

                        <div className="element">
                            <div className="element_name">Giảng viên</div>
                            <div style={{ display: "flex" }}>
                                <input className="inputt" defaultValue={this.props.course.trainerName} value={this.state.trainerName}></input>
                                <div style={{ borderRadius: "5px", width: "50px", height: "54px", backgroundColor: "#1f2c43" }} onClick={this.handleShowListTrainer}></div>
                                {
                                    this.state.showListTrainer === true &&
                                    <ul style={{position:"absolute", width:"300px", backgroundColor:"#ccc"}}>
                                            { this.state.trainers.map((trainer) => (
                                                <li key={trainer.trainerID} onClick={() => this.handleClickGetTrainer(trainer)} >{trainer.trainerName}</li>
                                            ))}
                                    </ul>
                                }
                            </div>
                        </div>
                        <div className="element">
                            <div className="element_name">Hình thức dạy</div>
                            <div style={{ display: "flex" }}>
                                <input className="inputt" defaultValue={this.props.course.trainingTypeName} value={this.state.trainingTypeName}></input>
                                <div style={{ borderRadius: "5px", width: "50px", height: "54px", backgroundColor: "#1f2c43" }} onClick={this.handleShowListTrainingType}></div>
                                {
                                    this.state.showListType === true &&
                                    <ul style={{position:"absolute", width:"300px", backgroundColor:"#ccc"}}>
                                            { this.state.trainingTypes.map((trainingType) => (
                                                <li key={trainingType.trainingTypeID} onClick={() => this.handleClickGetTrainingType(trainingType)} >{trainingType.trainingTypeName}</li>
                                            ))}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Sĩ số</div>
                            <input disabled defaultValue={this.props.course.numOfMembers} value={this.state.numOfMembers} ></input>
                        </div>

                        <div className="element">
                            <div className="element_name">Năm kinh nghiệm</div>
                            <input maxLength={2} defaultValue={this.props.course.expOfYear} value={this.state.expOfYear} onChange={this.handleInputChangeExp}></input>
                        </div>

                        <div className="element">
                            <div className="element_name">Thông tin thêm</div>
                            <input maxLength={50} defaultValue={this.props.course.description} value={this.state.description} onChange={this.handleInputChangeDescription}></input>
                        </div>
                    </div>
                    <div className="row1">
                        <button className="btn_form" onClick={this.handleSubmit}>Cập nhật</button>
                        <button className="btn_form_cancel" onClick={() => this.props.handleShowHideFormEdit()}>Hủy</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseFormUpdate;