import Instance from '../api/Instance'

export const appoint = (accountId, roleId) =>{
    const url = `/authority/${accountId}/is-a/${roleId}`;
    return Instance.get(url);
}

export const recall = (accountId, roleId) =>{
    const url = `/authority/${accountId}/not-a/${roleId}`;
    return Instance.get(url);
}