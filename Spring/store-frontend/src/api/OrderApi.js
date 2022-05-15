import axios from "axios";

export const save = (data) =>{
    return axios.post(
        "http://localhost:8080/api/v1/order/save",
        data,
        {
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
                // "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type" : "application/json"
            }
        }
    );
}

export const findAll = (data) =>{
    return axios.get(
        `http://localhost:8080/api/v1/order/account/${data}`,
        {
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
                // "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type" : "application/json"
            }
        }
    );
}

export const update = (id, status) =>{
    return axios.get(
        `http://localhost:8080/api/v1/order/update/${id}?status=${status}`,
        {
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
                // "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type" : "application/json"
            }
        }
    );
}

export const getAll = () =>{
    return axios.get(
        `http://localhost:8080/api/v1/orders`,
        {
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
                // "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type" : "application/json"
            }
        }
    );
}
