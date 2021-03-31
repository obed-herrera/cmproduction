import axios from 'axios';

const url = axios.create({
    baseURL: 'http://localhost/crediapi/',
});

const url2 = axios.create({
    baseURL: 'http://localhost/crediapi/',
});

export const getClients = (body) =>{
    let result = url
    .get('/client.php')
    .then((response)=>{
        return response.data;
    }).catch((error)=>{
        return error;
    });
    return result;
}

export const getLines = (body) =>{
    let result = url2
    .get('/line.php')
    .then((response)=>{
        return response.data;
    }).catch((error)=>{
        return error;
    });
    return result;
}