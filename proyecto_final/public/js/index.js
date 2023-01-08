// ----------------- Chat ------------------------------- //

const renderChat = (chats) => {

    let mensajesChat = document.querySelector('#mensajesChat');
    let html = chats.map((msj => {
        return `<tr>
                    <td class="text-primary fw-bold px-2">${msj.email}</td>
                    <td class="text-danger px-2">[${msj.timestamp}]:</td>
                    <td class="text-success fst-italic px-2">${msj.text}</td> 
                </tr>
                `
    }))
    mensajesChat.innerHTML = html.join(' ');
}

const addMessage = (evt) => {
    // evt.preventDefault()
    const email = document.querySelector('#email').value;
    // const firstName = document.querySelector('#firstName').value;
    // const lastName = document.querySelector('#lastName').value;
    // const age = document.querySelector('#age').value;
    // const alias = document.querySelector('#alias').value;
    // const avatar = document.querySelector('#avatar').value;

    const text = document.querySelector('#text').value;
    const dateMessage = dateFns.format(new Date(), 'DD/MM/YYYY HH:mm:ss');

    let messageComplete = {

        // author: {
        //     email: email,
        //     firstName: firstName,
        //     lastName: lastName,
        //     age: age,
        //     alias: alias,
        //     avatar: avatar
        // },
        email: email,
        type: 'usuario',
        timestamp: dateMessage,
        text: text
    };

    document.querySelector('#text').value = ""

    console.log(messageComplete);

    socket.emit('mensajeChat-nuevo', messageComplete, (id) => { // callback para obtener el id del mensaje
        console.log(id);
    });

    return false;
}


const PORT = 8080

// const socket = io.connect(`http://localhost:${PORT}`)            // Socket
const socket = io().connect()     // Socket

socket.on('message-server', (data) => {
    console.log(data)
})

socket.on('mensajeChat-server', (chats) => {
    console.log(chats);
    renderChat(chats)
})

let emailId = email.innerHTML

// ---------- Pedir productos al servidor -----------------------//
getProductsCart = async () => {
    
    console.log("Info en Front:",emailId);
    await fetch(`http://localhost:${PORT}/api/carrito/${emailId}`)
        .then(res => res.json())
        .then(data => {
            console.log("Esto vuelve del server:", data);
            renderCart(data.products)
        });
}

getProductsCart();

// --------- Renderizar productos del carrito --------------------//
const renderCart = (productos) => {
    let listado = document.querySelector('#listado');
    let html = productos.map((prod => {
        return `<tr>
                    <td  class="text-center">
                        ${prod.description}
                    </td>
                    <td  class="text-center">
                        $ ${prod.price} 
                    </td>
                    <td class="text-center">
                        <img src=${prod.thumbnail} width="50" height="50">
                    </td>
                </tr>`
    }))
    listado.innerHTML = html.join(' ');
}

// -------------- Enviar pedido a Server -------------- //
let sendOrder = document.getElementById('sendOrder')
let cartBody = document.querySelector('#cartBody');

sendOrder.addEventListener('click', async () => {

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            // username: "pepe",
            email: "pepe@gmail.com",
            // phone: "+5491162660189",
            idCart: "6323641f1a6e8f629b4c8d1e",
        }),
    };

    fetch(`http://localhost:${PORT}/api/carrito/sendOrder`, requestOptions)
        .then(res => res.json())
        .then(data => {
            let html = `
    <div class="container col-8 align-self-center border mt-3 bg-light p-3">
        <h2>${data.mensaje}</h2>
    </div>
    `;
            cartBody.innerHTML = html;
            //     setTimeout(() => {
            //         location.href = '/login'
            //     }, 2000)
        })
});

// --------------------- Login ----------------------------------//

const logoutButton = document.getElementById('logoutButton')

logoutButton.addEventListener('click', () => {
    fetch(`http://localhost:${PORT}/logout`)
        .then(res => res.json())
        .then(data => {
            let html = `
        <div class="container col-8 align-self-center border mt-3 bg-light p-3">
            <h2>Hasta la próxima ${data.name} </h2>
        </div>
        `;
            container.innerHTML = html;
            setTimeout(() => {
                location.href = '/login'
            }, 2000)
        })
});










