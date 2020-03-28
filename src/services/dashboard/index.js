import axios from 'axios';
const API = 'https://git.heroku.com/gentle-waters-67526.git/api';

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