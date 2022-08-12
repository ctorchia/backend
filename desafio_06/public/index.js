const socket = io('http://localhost:3000');

const render = (productos) => {
    let listado = document.querySelector('#listado');
    let html= productos.map((prod => {
        return `<li>${prod.name}</li>`
    }))
    listado.innerHTML = html.join(' ');
}

socket.on('connect', ()=> {
    console.log('conectado al Servidor');
    socket.emit('mensaje-cliente','Hola Server'); //Se envia lo que se escriba en el input
})

socket.on('disconnect', ()=> {
    console.log('desconectado del Servidor');
})

socket.on('mensaje-server',(mensaje) => {
    render(mensaje.productos)
} )