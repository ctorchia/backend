const socket = io('http://localhost:8080');

// ----------------- Products ------------------------------- //

const render = (productos) => {
    let listado = document.querySelector('#listado');
    let html = productos.map((prod => {
        return `<tr>
                    <td  class="text-center">
                        ${prod.title}
                    </td>
                    <td  class="text-center">
                        $ ${prod.price} 
                    </td>
                    <td class="text-center">
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

    document.querySelector('#title').value = ""
    document.querySelector('#price').value = ""
    document.querySelector('#thumbnail').value = ""

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
        return `<tr>
                    <td class="text-primary fw-bold px-2">${msj.name}</td>
                    <td class="text-danger px-2">[${msj.dateMessage}]:</td>
                    <td class="text-success fst-italic px-2">${msj.message}</td> 
                </tr>
                `
    }))
    mensajesChat.innerHTML = html.join(' ');
}

const addMessage = (evt) => {
    const id = document.querySelector('#id').value;
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const age = document.querySelector('#age').value;
    const alias = document.querySelector('#alias').value;
    const avatar = document.querySelector('#avatar').value;
    
    const text = document.querySelector('#text').value;
    const dateMessage = dateFns.format(new Date(), 'DD/MM/YYYY HH:mm:ss');
    
    let messageComplete = { 
        author: {
            id:id,
            firstName:firstName,
            lastName:lastName,
            age:age,
            alias:alias,
            avatar:avatar
        },
        date:dateMessage,
        text:text
    };

    document.querySelector('#text').value = ""

    socket.emit('mensajeChat-nuevo', messageComplete, (id) => { // callback para obtener el id del mensaje
        console.log(id);
    });

    return false;
}

socket.on('mensajeChat-server', (mensaje) => {
    renderChat(mensaje.mensajes)
})

// ----------------- Products Mock ------------------------------- //

const renderProductsMock = (productsMock) => {
    let productsMockList = document.querySelector('#productsMockList');
    let html = productsMock.map((prod => {
        return `<tr>
                    <td  class="text-center">
                        ${prod.title}
                    </td>
                    <td  class="text-center">
                        $ ${prod.price} 
                    </td>
                    <td class="text-center">
                        <img src=${prod.thumbnail} width="50" height="50">
                    </td>
                </tr>
                `
    }))
    productsMockList.innerHTML = html.join(' ');
}

getProductsFetch = () =>{
    fetch('http://localhost:8080/api/productos-test')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        renderProductsMock(data)
    });
}

getProductsFetch();

