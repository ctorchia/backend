const socket = io('http://localhost:3000');

// ----------------- Products ------------------------------- //

const render = (productos) => {
    let listado = document.querySelector('#listado');
    let html = productos.map((prod => {
        return `<tr>
                    <td>
                        ${prod.title}
                    </td>
                    <td>
                        $ ${prod.price} 
                    </td>
                    <td>
                        <img src=${prod.thumbnail} width="50" height="50">
                    </td>
                </tr>
                `
    }))
    listado.innerHTML = html.join(' ');
}

const addProduct = (evt) => {
    const title = document.querySelector('#title').value;
    const price = document.querySelector('#price').value;
    const thumbnail = document.querySelector('#thumbnail').value;
    const product = { title, price, thumbnail };

    console.log(product);

    socket.emit('producto-nuevo', product, (id) => { // callback para obtener el id del producto
        console.log(id);
    });

    return false;
}

socket.on('connect', () => {
    console.log('conectado al Servidor');
    socket.emit('mensaje-cliente', 'Hola Server'); //Se envia lo que se escriba en el input
})

socket.on('disconnect', () => {
    console.log('desconectado del Servidor');
})

socket.on('mensaje-server', (mensaje) => {
    render(mensaje.productos)
})

// ----------------- Chat ------------------------------- //

const renderChat = (mensajes) => {
    let mensajesChat = document.querySelector('#mensajesChat');
    let html = mensajes.map((msj => {
        return `<div class="d-flex">
                        <p class="text-primary px-2">${msj.name}</p>
                        <p class="text-danger px-2">[${msj.dateMessage}]:</p>
                        <p class="text-success px-2">${msj.message}</p> 
                </div>
                `
    }))
    mensajesChat.innerHTML = html.join(' ');
}

const addMessage = (evt) => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const dateMessage = dateFns.format(new Date(), 'DD/MM/YYYY HH:mm:ss');
    const messageComplete = { name, dateMessage, message };

    // console.log(messageComplete);

    socket.emit('mensajeChat-nuevo', messageComplete, (id) => { // callback para obtener el id del producto
        console.log(id);
    });

    return false;
}

socket.on('mensajeChat-server', (mensaje) => {
    renderChat(mensaje.mensajes)
})