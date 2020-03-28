import axios from 'axios';
const API = 'https://shrouded-savannah-79709.herokuapp.com/api';

// get-users =>  token
export const getUsersList = (token) => new Promise((resolve,reject) => { 
    const headers = {
        'x-auth': token
    }
    axios.get(`${API}/get-users`,{headers})
    .then(res => {
        resolve(res);
    })
    .catch(err => reject(err))
})