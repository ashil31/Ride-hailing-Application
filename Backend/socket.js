const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');


let io;

const initializeSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log(`Clinet connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(data);            
            if(!userId) {
                console.log("User ID is required");                
            }
            console.log(`User ${userId} joined as ${userType}`);
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        }
        );

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Location is required' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });           
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
    return io;
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(`Sending message to socketId: ${socketId}`, messageObject);    
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized');        
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };

