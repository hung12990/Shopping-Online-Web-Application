import Instance from '../api/Instance'

export const findAll = (page) =>{
    const url = `/products?page=${page}`;
    return Instance.get(url);
}

export const findByCid = (id, page) =>{
    const url = `/product/category/${id}?page=${page}`;
    return Instance.get(url);
}

export const count = () =>{
    const url = `/product/page-count`;
    return Instance.get(url);
}

export const save = (data) =>{
    const url = `/product/save`;
    return Instance.post(url, data);
}

export const update = (id, data) =>{
    const url = `/product/update/${id}`;
    return Instance.post(url, data);
}

export const remove = (id) =>{
    const url = `/product/delete/${id}`;
    return Instance.get(url);
}

export const findOne = (id) =>{
    const url = `/product/${id}`;
    return Instance.get(url);
}