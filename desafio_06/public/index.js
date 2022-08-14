const socket = io('http://localhost:3000');

const render = (productos) => {
    let listado = document.querySelector('#listado');
    let html= productos.map((prod => {
        return `<li>
                Nombre: ${prod.title}
                Precio: ${prod.price}
                </li>`
    }))
    listado.innerHTML = html.join(' ');
}

const addProduct = (evt) => {
    const title = document.querySelector('#title').value;
    const price = document.querySelector('#price').value;
    const product = {title, price}

    socket.emit('producto-nuevo', product, (id)=>{ // callback para obtener el id del producto
        console.log(id);
    });

    return false;
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