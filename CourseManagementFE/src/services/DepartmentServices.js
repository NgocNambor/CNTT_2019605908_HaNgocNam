import axios from "axios";


const API_URL = "https://localhost:5024/api/Department";
const GET_METHOD = "get";


class DepartmentServices{
    getDepartments(headers){
        var config = {
            method: GET_METHOD,
            url: API_URL,
            headers: headers
        };
        return axios(config);
    }
}

export default DepartmentServices;

