import { io } from 'socket.io-client';

// http://localhost:5000
// https://whatsapp-noam.herokuapp.com

const socket = io('https://whatsapp-noam-e3e0965ccb9d.herokuapp.com/api');

export default socket;