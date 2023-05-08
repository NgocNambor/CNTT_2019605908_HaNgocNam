import React, {Component} from "react";
import Common from "../../common/Common";
import Swal from "sweetalert2";
class TrainerFormAdd extends Component{

    constructor(props){
        super(props);

        this.state = {
            trainerID: "",
            trainerName: "",
            gender: 0,
            address: "",
            birthday: "",
            email: "",
            phone: "",
            major:"",
            majorName:"",
            level:"",
            levelName:"",
            expOfYear:0
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
    handleInputChangeGenderOther = (event) => {
        this.setState({ gender: 2 })
    }
    handleInputChangeBirthday = (event) => {
        this.setState({ birthday: event.target.value });
    }
    handleInputChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    handleInputChangePhone = (event) => {
        this.setState({ phone: event.target.value });
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

    handleValidation = () => {
       
        let returnData = {
            formIsValid: true,
            errMes: ''
        }
        
        if(this.state.expOfYear<= 0){
            returnData = {
                errMes: "Năm kinh nghiệm phải lớn hơn 0",
                formIsValid: false
            }
        }
        if (this.state.major.trim()===''){
            returnData = {
                errMes: "Lĩnh vực không được để trống! ",
                formIsValid: false
            }
        }
        if (this.state.levelName.trim() === ""){
            returnData = {
                errMes: "Trình độ chuyên môn là thạc sĩ hoặc tiến sĩ",
                formIsValid: false
            }
        }
        
        if (this.state.email.trim()===''){
            returnData = {
                errMes: "Mail không được để trống! ",
                formIsValid: false
            }
        }
        // else if (this.state.email.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$") == null) {
        //     returnData = {
        //         formIsValid: false,
        //         errMes: 'Không đúng định mail'
        //     }
        // }
        const regexPhone = /(0)+([0-9]{9})\b/g;
        if(this.state.phone.trim() === ''){
            returnData={
            errMes : "Số điện thoại không được để trống",
            formIsValid : false
            }
        }

        else if (!this.state.phone.match(regexPhone)) {
            returnData={
            errMes : "Số điện thoại phải là số có 10 chữ số bắt đầu từ 0",
            formIsValid : false
            }
        }
        if (this.state.birthday.trim() === '') {
            returnData = {
                errMes : "Chưa chọn ngày tháng năm sinh",
                formIsValid : false
            }
        }
        else if(this.common.getAge(this.state.birthday) < 18){
            returnData = {
                errMes : "Giảng viên chưa đủ 18 tuổi",
                formIsValid : false
            }
        }
        if (this.state.trainerName.trim()==='') {
            returnData = {
                errMes: "Tên giảng viên không được để trống ",
                formIsValid: false
            }
        }
        else if(this.state.trainerName.length <3){
            returnData = {
                errMes: "Tên giảng viên lớn hơn 3 kí tự!",
                formIsValid: false
            }
        }
        if (this.state.trainerID.trim() === '') {
            returnData = {
                formIsValid: false,
                errMes: 'Mã giảng viên không được để trống!'
            }
        }
        else if (this.state.trainerID.length < 3) {
            returnData = {
                formIsValid: false,
                errMes: 'Mã giảng viên phải lớn hơn 3 kí tự!'
            }
        }
        else if (this.state.trainerID.match("^[a-zA-Z0-9]{3,8}$") == null) {
            returnData = {
                formIsValid: false,
                errMes: 'Mã giảng viên từ 3-8 kí tự'
            }
        }
        return returnData;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const validation = this.handleValidation();
        if (!validation.formIsValid) {
            Swal.fire(validation.errMes);
        }
        else {
        var formData = {
            trainerID: this.state.trainerID,
            trainerName: this.state.trainerName,
            address: this.state.address,
            gender: this.state.gender,
            dateOfBirth: this.common.formatBindingDate(this.state.birthday),
            phoneNumber: this.state.phone,
            email: this.state.email,
            status: 1,
            major: this.state.major,
            tlevel: this.state.levelName === "Thạc sĩ"? 0 : 1,
            expOfYear: this.state.expOfYear
        }
        this.props.onPost(formData);
    }
    }

    render(){
        return (
            <div className="base">
                <div className="base_child">
                    <h1 style={{ fontSize: "20px" }}>Thêm giảng viên mới</h1>
                    <div className="row1 first">
                        <div className="element">
                            <div className="element_name">Mã giảng viên</div>
                            <input maxLength={8} value={this.state.trainerID} onChange={this.handleInputChangeTrainerID} ></input>
                        </div>

                        <div className="element">
                            <div className="element_name">Tên giảng viên</div>
                            <input maxLength={30} value={this.state.trainerName} onChange={this.handleInputChangeTrainerName} ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Giới tính</div>
                            <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }} defaultChecked={true} name="gender" onChange={this.handleInputChangeGenderMale} /> Nam
                            <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }} name="gender" onChange={this.handleInputChangeGenderFemale} /> Nữ
                        </div>
                    </div>
                    <div className="row1">
                        <div className="element">
                            <div className="element_name">Ngày sinh</div>
                            <input type="date" value={this.state.birthday} onChange={this.handleInputChangeBirthday}></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Địa chỉ</div>
                            <input maxLength={20} value={this.state.address} onChange={this.handleInputChangeAddress} ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Số điện thoại</div>
                            <input maxLength={10} value={this.state.phone} onChange={this.handleInputChangePhone}></input>
                        </div>
                    </div>
                    <div className="row1">
                        
                        <div className="element">
                            <div className="element_name">Trình độ chuyên môn</div>
                            <input maxLength={15} value={this.state.levelName} onChange={this.handleInputChangeLevelName} ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Email</div>
                            <input maxLength={30}  value={this.state.email} onChange={this.handleInputChangeEmail} ></input>
                        </div>
                        <div className="element">
                            <div className="element_name">Lĩnh vực</div>
                            <input maxLength={30} value={this.state.major} onChange={this.handleInputChangeMajor}></input>
                        </div>
                        
                    </div>
                    <div>
                        <div style={{marginLeft:"25px"}} className="element">
                            <div className="element_name">Năm kinh nghiệm</div>
                            <input maxLength={2} value={this.state.expOfYear} onChange={this.handleInputChangeExpOfYear}></input>
                        </div>
                    </div>
                    <div className="row1">
                        <button className="btn_form" onClick={this.handleSubmit}>Thêm</button>
                        <button className="btn_form_cancel" onClick={() => this.props.handleShowFormAdd()}>Hủy</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrainerFormAdd;