const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = require('http').createServer(this.app);

		//en io está toda la info de los clientes conectados. Puedo mandarle un mensaje a todos a la vez
		this.io = require('socket.io')(this.server);

		this.paths = {};

		//Middlewares
		this.middlewares();

		//Rutas de mi app
		this.routes();

		//Sockets
		this.sockets();
	}

	middlewares() {
		//CORS
		this.app.use(cors());

		//directorio publico
		this.app.use(express.static('public'));
	}

	routes() {
		//this.app.use(this.paths.auth, require('../routes/auth'));
	}

	sockets() {
		this.io.on('connection', socketController);
	}

	listen() {
		this.server.listen(this.port, () => {
			console.log('Servidor corriendo en puerto', this.port);
		});
	}
}

module.exports = Server;
