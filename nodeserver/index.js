// Node Server which will handle socket.io conections

const io = require('socket.io')(8001, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id] );
        delete users[socket.id];
    });
});