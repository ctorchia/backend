
const PORT = 8080

// const socket = io.connect(`http://localhost:${PORT}`);

// let productsCart = [];
// ---------- Pedir productos al servidor -----------------------//
getProductsCart = () => {
    fetch(`http://localhost:${PORT}/api/carrito/2/productos`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // productsCart = data;
            renderCart(data)
        });
}

getProductsCart();

// --------- Renderizar productos del carrito --------------------//
const renderCart = (productos) => {
    let listado = document.querySelector('#listado');
    let html = productos.map((prod => {
        return `<tr>
                    <td  class="text-center">
                        ${prod.name}
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
    // console.log('click Carrito');

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // credentials: "include",
        body: JSON.stringify({
            username: "pepe",
            email: "pepe@gmail.com",
            phone: "+5491162660189",
            idCart: "2",
        }),
    };

    fetch(`http://localhost:${PORT}/api/carrito/sendOrder`, requestOptions)
    .then(res => res.json())
    .then(data => {
        console.log(data);
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
            console.log(data);
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
// ----------------- Denormalizer ------------------------------- //

// function denormalizar(normalizedData) {

//     const authorSchema = new normalizr.schema.Entity('author');

//     const messageSchema = new normalizr.schema.Entity('message', {
//         author: authorSchema
//     });

//     const messagesSchema = new normalizr.schema.Entity('messages', {
//         messages: [messageSchema]
//     });
//     const denormalizedData = normalizr.denormalize(normalizedData.result, messagesSchema, normalizedData.entities);

//     console.log(normalizedData);
//     console.log(denormalizedData);

//     return denormalizedData;
// }

// ----------------- Chat ------------------------------- //

// const renderChat = (normalizedData) => {

//     let denormalizedData = denormalizar(normalizedData);

//     let mensajesChat = document.querySelector('#mensajesChat');
//     let html = denormalizedData.messages.map((msj => {
//         return `<tr>
//                     <td class="text-primary fw-bold px-2">${msj.author.id}</td>
//                     <td class="text-danger px-2">[${msj.date}]:</td>
//                     <td class="text-success fst-italic px-2">${msj.text}</td> 
//                 </tr>
//                 `
//     }))
//     mensajesChat.innerHTML = html.join(' ');

//     // ---------- Ratio Compresion ----------------
//     let SizeNormalized = JSON.stringify(normalizedData).length;
//     let SizeDenormalized = JSON.stringify(denormalizedData).length;

//     console.log(`Tamaño de Datos Normalizados:${SizeNormalized}`);
//     console.log(`Tamaño de Datos Denormalizados:${SizeDenormalized}`)

//     let ratioCompresion = ((100 * SizeNormalized) / SizeDenormalized).toFixed(2)
//     console.log(`Ratio de Compresion: ${ratioCompresion}%`);

//     let ratio = document.querySelector('#ratio')
//     ratio.innerHTML = `Ratio de Compresion: ${ratioCompresion}%`
// }

// const addMessage = (evt) => {
//     const id = document.querySelector('#id').value;
//     const firstName = document.querySelector('#firstName').value;
//     const lastName = document.querySelector('#lastName').value;
//     const age = document.querySelector('#age').value;
//     const alias = document.querySelector('#alias').value;
//     const avatar = document.querySelector('#avatar').value;

//     const text = document.querySelector('#text').value;
//     const dateMessage = dateFns.format(new Date(), 'DD/MM/YYYY HH:mm:ss');

//     let messageComplete = {
//         author: {
//             id: id,
//             firstName: firstName,
//             lastName: lastName,
//             age: age,
//             alias: alias,
//             avatar: avatar
//         },
//         date: dateMessage,
//         text: text
//     };

//     document.querySelector('#text').value = ""

//     socket.emit('mensajeChat-nuevo', messageComplete, (id) => { // callback para obtener el id del mensaje
//         console.log(id);
//     });

//     return false;
// }

// socket.on('mensajeChat-server', (mensaje) => {
//     renderChat(mensaje)
// })

// ----------------- Products Mock ------------------------------- //

// const renderProductsMock = (productsMock) => {
//     let productsMockList = document.querySelector('#productsMockList');
//     let html = productsMock.map((prod => {
//         return `<tr>
//                     <td  class="text-center">
//                         ${prod.title}
//                     </td>
//                     <td  class="text-center">
//                         $ ${prod.price} 
//                     </td>
//                     <td class="text-center">
//                         <img src=${prod.thumbnail} width="50" height="50">
//                     </td>
//                 </tr>
//                 `
//     }))
//     productsMockList.innerHTML = html.join(' ');
// }

// getProductsFetch = () => {
//     fetch(`http://localhost:${PORT}/api/productos-test`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             renderProductsMock(data)
//         });
// }

// getProductsFetch();


// getProductsCart = () => {
//     fetch(`http://localhost:${PORT}/api/carrito/2/productos`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             // renderProductsMock(data)
//         });
// }

// getProductsCart();



