import axios from 'axios';

const url = axios.create({
    baseURL: 'https://credimarketnic.com/crediapi/client.php',
});

const url2 = axios.create({
    baseURL: 'https://credimarketnic.com/crediapi/line.php',
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

export const getLines = (body) =>{
    let result = url2
    .get('/line')
    .then((response)=>{
        return response.data;
    }).catch((error)=>{
        return error;
    });
    return result;
}