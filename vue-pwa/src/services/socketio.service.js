import { io } from 'socket.io-client';
import Push from 'push.js'

class SocketioService {
    socket;
    // constructor() {}

    setupSocketConnection() {
        this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
        this.socket.emit('my message', 'Hello there from Vue.');
        this.socket.on('my broadcast', (data) => {
            Push.create('Vue Notification', {
                vibrate: [200, 100, 200, 100, 200],
                body: data,
            }).then(function(notification) {
                console.log('pedir permiso listo ')
            });
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketioService();