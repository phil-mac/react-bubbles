import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    console.log('axiosWithAuth got tok: ', token);
    axios.defaults.headers.common['Authorization'] = token;

    return axios.create({
        header: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    })
}