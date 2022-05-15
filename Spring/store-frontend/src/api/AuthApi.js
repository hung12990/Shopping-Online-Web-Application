import Instance from '../api/Instance'

export const login = (data) =>{
    const url = `/login`;
    return Instance.post(url, data);
}