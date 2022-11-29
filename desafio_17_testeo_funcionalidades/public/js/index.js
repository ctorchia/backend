
const PORT = 8080

// const socket = io.connect(`http://localhost:${PORT}`);

// ---------- Pedir productos al servidor -----------------------//
getProductsCart = () => {
    fetch(`http://localhost:${PORT}/api/carrito/2/productos`)
        .then(res => res.json())
        .then(data => {
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

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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