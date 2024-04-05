import axios from 'axios';

// http://localhost:5000/api/v1
// https://whatsapp-noam.herokuapp.com/api/v1

export default axios.create({
    baseURL: 'https://whatsapp-noam-e3e0965ccb9d.herokuapp.com/api'
});