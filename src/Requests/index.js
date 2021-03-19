import axios from 'axios';

const url = axios.create({
    baseURL: 'http://localhost/crediapi/client.php',
});

export const getClients = (body) =>{
    let result = url
    .get('/client')
    .then((response)=>{
        return response.data;
    }).catch((error)=>{
        return error;
    });
    return result;
}