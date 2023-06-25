import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import MessagesManager from './managers/messages.manager.js';
const messagesManager = new MessagesManager(__dirname + '/db/messages.json');

//en caso de usar mongoDB para así suplantar persistencia en archivos
// import './db/dbConfig.js'

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/chat', viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log('🚀 Server listening on port 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {

    console.log('🟢 ¡New connection!', socket.id);

    socket.on('disconnect', () => {
        console.log('🔴 User disconnect', socket.id)
    });

    socket.on('newUser', (user) => {
        console.log(`> ${user} ha iniciado sesión`);
    });

    socket.on('chat:message', async (msg) => {
        await messagesManager.createMsg(msg);
        socketServer.emit('messages', await messagesManager.getAll());
    });

    socket.on('newUser', (user) => {
        socket.broadcast.emit('newUser', user);

    });

    socket.on('chat:typing', (data) => {
        // console.log(data)
        socket.broadcast.emit('chat:typing', data);
    })
});





