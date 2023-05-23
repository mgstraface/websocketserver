console.log('Bienvenido al servidor con web sockets');

const lblOnline = document.querySelector('#online');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
	console.log('Usuario conectado');

	lblOffline.style.display = 'none';
	lblOnline.style.display = '';
});

socket.on('disconnect', () => {
	console.log('Usuario desconectado');
	lblOnline.style.display = 'none';
	lblOffline.style.display = '';
});

socket.on('enviar-mensaje', (payload) => {
	console.log(payload);
});

btnEnviar.addEventListener('click', () => {
	const mensaje = txtMensaje.value;

	const payload = {
		mensaje,
		id: '123abc',
		fecha: new Date().toLocaleDateString('es-es', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		}),
	};

	socket.emit('enviar-mensaje', payload, (id) => {
		console.log('desde el server', id);
	});
});
