import Instance from '../api/Instance'

export const add = (data) =>{
    const url = `/account/save`;
    return Instance.post(url, data);
}

export const findAll = () =>{
    const url = `/accounts`;
    return Instance.get(url);
}

export const findOne = (username) =>{
    const url = `/account/${username}`;
    return Instance.get(url);
}