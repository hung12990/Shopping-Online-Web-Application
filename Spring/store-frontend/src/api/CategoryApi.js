import Instance from '../api/Instance'

export const getAll = () =>{
    const url = `/categories`;
    return Instance.get(url);
}
