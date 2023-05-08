import React, {Component} from "react";
import Common from "../../common/Common";
import Swal from "sweetalert2";
class TrainerFormEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            trainerID: this.props.trainer.trainerID,
            trainerName: this.props.trainer.trainerName,
            gender: this.props.trainer.gender,
            address: this.props.trainer.address,
            dateOfBirth: this.props.trainer.dateOfBirth,
            email: this.props.trainer.email,
            phoneNumber: this.props.trainer.phoneNumber,
            majorName:this.props.trainer.majorName,
            major:this.props.trainer.major,
            level:this.props.trainer.level,
            levelName:this.props.trainer.levelName,
            expOfYear:this.props.trainer.expOfYear
        }
        this.common = new Common();
    }

    // event get input value
    handleInputChangeTrainerID = (event) => {
        this.setState({ trainerID: event.target.value });
    }
    handleInputChangeTrainerName = (event) => {
        this.setState({ trainerName: event.target.value });
    }
    handleInputChangeAddress = (event) => {
        this.setState({ address: event.target.value });
    }
    handleInputChangeGenderMale = (event) => {
        this.setState({ gender: 0 })
    }
    handleInputChangeGenderFemale = (event) => {
        this.setState({ gender: 1 })
    }
    handleInputChangeBirthday = (event) => {
        this.setState({ dateOfBirth: event.target.value});
    }
    handleInputChangeEmail = (event) => {
        this.setState({ email: event.target.value});
    }
    handleInputChangePhone = (event) => {
        this.setState({ phoneNumber: event.target.value});
    }
    handleInputChangeMajor = (event) => {
        this.setState({ major: event.target.value})
    }
    handleInputChangeLevelName = (event) => {
        this.setState({ levelName: event.target.value})
    }
    handleInputChangeExpOfYear = (event) => {
        this.setState({ expOfYear: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        var formData = {
            trainerID: this.props.trainer.trainerID,
            trainerName: this.state.trainerName === undefined ? this.props.trainer.trainerName: this.state.trainerName,
            address: this.state.address === undefined ? this.props.trainer.address: this.state.address,
            gender: this.state.gender === undefined ? this.props.trainer.gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth === undefined ? this.props.trainer.dateOfBirth: this.state.dateOfBirth,
            phoneNumber: this.state.phoneNumber === undefined ? this.props.trainer.phoneNumber: this.state.phoneNumber,
            email: this.state.email === undefined ? this.props.trainer.email: this.state.email,
            major: this.state.major === undefined ? this.props.trainer.major: this.state.major,
            tlevel: this.state.levelName === "Thạc sĩ"? 0 : 1,
            expOfYear:this.state.expOfYear === undefined ? this.props.trainer.expOfYear: this.state.expOfYear
        }
        let returnData = {
            formIsValid: true,
            errMes: ''
        }
        
        if(formData.expOfYear<= 0){
            returnData = {
                errMes: "Năm kinh nghiệm phải lớn hơn 0",
                formIsValid: false
            }
        }
        if (formData.major.trim()===''){
            returnData = {
                errMes: "Lĩnh vực không được để trống! ",
                formIsValid: false
            }
        }

        if (formData.email.trim()===''){
            returnData = {
                errMes: "Mail không được để trống! ",
                formIsValid: false
            }
        }
        
        const regexPhone = /(0)+([0-9]{9})\b/g;
        if(formData.phoneNumber.trim() === ''){
            returnData={
            errMes : "Số điện thoại không được để trống",
            formIsValid : false
            }
        }

        else if (!formData.phoneNumber.match(regexPhone)) {
            returnData={
            errMes : "Số điện thoại phải là số có 10 chữ số bắt đầu từ 0",
            formIsValid : false
            }
        }
        if (formData.dateOfBirth.trim() === '') {
            returnData = {
                errMes : "Chưa chọn ngày tháng năm sinh",
                formIsValid : false
            }
        }
        else if(this.common.getAge(formData.dateOfBirth) < 18){
            returnData = {
                errMes : "Giảng viên chưa đủ 18 tuổi",
                formIsValid : false
            }
        }
        if (formData.trainerName.trim()==='') {
            returnData = {
                errMes: "Tên giảng viên không được để trống ",
                formIsValid: false
            }
        }
        else if(formData.trainerName.length <3){
            returnData = {
                errMes: "Tên giảng viên lớn hơn 3 kí tự!",
                formIsValid: false
            }
        }

        if(!returnData.formIsValid){
            Swal.fire(returnData.errMes);
          }
          else{
            this.props.onPut(formData);

          }
    
    }

    render(){
        return (
            <div className="base">
                <div className="base_child">
                    <h1 style={{ fontSize: "20px" }}>Sửa thông tin giảng viên</h1>
                    <div className="row1 first">
                        <div className="element">
                            <div className="element_name">Mã giảng viên</div>
                            <input disabled value={this.state.trainerID} onChange={this.handleInputChangeTrainerID} ></input>
                        </div>

                        <div className="element">
                            <div className="element_name">Tên giảng viên</div>
                            <input defaultValue={this.props.trainer.trainerName} value={this.state.trainerName} onChange={this.handleInputChangeTrainerName} ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Giới tính</div>
                            <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }} defaultChecked={this.props.trainer.gender === 0} name="gender" onChange={this.handleInputChangeGenderMale} /> Nam
                            <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }} defaultChecked={this.props.trainer.gender === 1} name="gender" onChange={this.handleInputChangeGenderFemale} /> Nữ
                        </div>
                        
                    </div>
                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Ngày sinh</div>
                            <input type="date" defaultValue={this.common.formatBindingDate(this.props.trainer.dateOfBirth)} value={this.common.formatBindingDate(this.state.dateOfBirth)} onChange={this.handleInputChangeBirthday}></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Địa chỉ</div>
                            <input defaultValue={this.props.trainer.address} value={this.state.address} onChange={this.handleInputChangeAddress} ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Số điện thoại</div>
                            <input defaultValue={this.props.trainer.phoneNumber} value={this.state.phoneNumber} onChange={this.handleInputChangePhone}></input>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Trình độ chuyên môn</div>
                            <input defaultValue={this.props.trainer.levelName} value={this.state.levelName} onChange={this.handleInputChangeLevelName} ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Email</div>
                            <input defaultValue={this.props.trainer.email} value={this.state.email} onChange={this.handleInputChangeEmail} ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Lĩnh vực</div>
                            <input defaultValue={this.props.trainer.major} value={this.state.major} onChange={this.handleInputChangeMajor}></input>
                        </div>
                    </div>
                    <div>
                        <div style={{marginLeft:"25px"}} className="element">
                            <div className="element_name">Năm kinh nghiệm</div>
                            <input  value={this.state.expOfYear} onChange={this.handleInputChangeExpOfYear}></input>
                        </div>
                    </div>
                    <div className="row1">
                        <button className="btn_form" onClick={this.handleSubmit}>Lưu</button>
                        <button className="btn_form_cancel" onClick={() => this.props.handleShowFormEdit()}>Hủy</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrainerFormEdit;