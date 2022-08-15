const socket = io('http://localhost:3000');

// const render = (productos) => {
//     let listado = document.querySelector('#listado');
//     let html= productos.map((prod => {
//         return `<li>
//                 Nombre: ${prod.title}
//                 Precio: ${prod.price}
//                 </li>`
//     }))
//     listado.innerHTML = html.join(' ');
// }

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
    console.log(mensaje)
})