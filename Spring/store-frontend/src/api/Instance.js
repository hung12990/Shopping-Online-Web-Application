import axios from 'axios'

const token = localStorage.getItem("accessToken");

const Instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
});

export default Instance