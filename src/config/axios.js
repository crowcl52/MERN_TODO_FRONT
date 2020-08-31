import axios from 'axios';

const clientAxios =  axios.create({
    baseURL: 'https://merntodo-serve.herokuapp.com'
});

export default clientAxios;