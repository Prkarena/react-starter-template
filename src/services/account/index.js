import axios from 'axios';
const API = ' https://shrouded-savannah-79709.herokuapp.com/api';

// login => {email: '',password: ''}
export const login = (data) => new Promise((resolve,reject) => {
    axios.post(`${API}/sign-in`,data)
    .then(res => {
        localStorage.setItem('userData',JSON.stringify(res.data));
        resolve(res);
    })
    .catch(err => reject(err))
})

// signUp => {email: '',password: '',type: 0(editor)/1(admin)}
export const signUp = (data) => new Promise((resolve,reject) => {
    axios.post(`${API}/sign-up`,data)
    .then(res => resolve(res))
    .catch(err => reject(err))
})

// auth => token 
export const auth = (token) => new Promise((resolve,reject) => {
    const headers = {
        'x-auth': token
    }
    axios.get(`${API}/auth`,{headers})
    .then(res => {
        resolve(res);
    })
    .catch(err => reject(err))
})

// get-user/:userId => data : { token : '' , userId: '' }
export const getUserData = (data) => new Promise((resolve,reject) => { 
    const headers = {
        'x-auth': data.token
    }
    axios.get(`${API}/get-user/${data.userId}`,{headers})
    .then(res => {
        resolve(res);
    })
    .catch(err => reject(err))
})