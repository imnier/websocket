const ws = require('ws');

const server = new ws.Server({ port: 8080 });

server.on('open', function open() {
    console.log('ws server is connecting');
});


server.on('connection', function connection(ws, req) {
    const port = req.connection.remotePort;
    const clientName = '用户' + port;

    ws.send("Welcome " + clientName);

    ws.on('message', function incoming(message) {
        console.log('received: %s from %s', message, clientName);

        // 广播消息给所有客户端
        server.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                client.send(clientName + " -> " + message);
            }
        });

    });

});

server.on('close', function close() {
    console.log('ws server id disconnected');
});

