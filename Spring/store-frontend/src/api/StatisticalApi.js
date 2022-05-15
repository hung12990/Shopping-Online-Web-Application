import Instance from './Instance'

export const getBestSeller = () =>{
    const url = `/statistical`;
    return Instance.get(url);
}