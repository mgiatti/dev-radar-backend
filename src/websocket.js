const socketio = require('socket.io');
const connections = [];
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');
let io;
exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {
        console.log(socket.id);
        const  { latitude, longitude, techs } = socket.handshake.query;
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(techs)
        })
    })
};

exports.findConnections = (coordinates, techs) => {
    const maxDistance = 10;
    console.log(connections);
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < maxDistance && 
        connection.techs.some(item => techs.includes(item));
    });
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}