const offersContainer = document.getElementById("mainOffers")// obtengo el elemento html donde se encuentran los productos y el click del usuario en el carrito

let cart = []; //array q va a contener los productos seleccionados

offersContainer.addEventListener("click", (e)=>{ //escuchamos el click del evento  q temga un targent con la cles agregar y ejecutamos la validadcion de producto
    if (e.target.classList.contains("agregar")){
        validateProductInCart(e.target.id);
    }
})

const validateProductInCart = (productId) =>{ // recibimos como parametro el id proveniendo del click evento
    const isRepeated = cart.some(product => product.id == productId) //buscamos con el metodo some algún producto q este repetido y nos devuelva un valor boleano

    if (isRepeated) { // si el producto esta repetido
        const product = cart.find(product => product.id == productId) // el metodo find busca el producto repetido segun el id
        product.cantidad++ // modifica el valor de la cantidad y no pushea otro producto igual al carrito
        const cantidad = document.getElementById(`cantidad${product.id}`)
        cantidad.innerText = `Cantidad: ${product.cantidad}`// modifica el DOM de acuerdo a los cambios
        refreshTotalCart(cart) //cambiamos el total del carrito

    } else{ // si el producto es nuevo 
        const product = products.find(product=> product.id == productId) // el metodo find busca el producto clickeado dentro de la base de datos o array y lo pone en la const product
        cart.push(product)// pushea el nuevo producto dentro de la array cart
        printProductsCart(product) // pinta el producto en el carrito
        refreshTotalCart(cart) // cambia el total del carrito
    }
}

const printProductsCart = (product) => { // esta funcion pinta en el DOM los productos selecionados por el usuario
    const container1 = document.getElementById("cart-container"); // la constante container1 trae el elemento q va contener el carrito y los productos selecionados
    const div = document.createElement("div");// creamos el div
    div.classList.add("productInCart") 
    div.innerHTML = `<p>${product.nombre}</p>
                    <p>Precio: $ ${product.precio}</p>
                    <p id=cantidad${product.id}>Cantidad: ${product.cantidad}</p>
                    <button class="btn waves-effect waves-ligth boton-eliminar" value="${product.id}">X</button>`
    container1.appendChild(div)// crea el hijo div dentro de el nodo container1 osea el producto selecionado
}

const printCart = (cart) => { // esta funcion sirve para actulizar el carrito en caso q el usuario decida sacar sacar productos
    const container1 = document.getElementById('cart-container')

    container1.innerHTML = ''

    cart.forEach(product => {
        const div = document.createElement('div')
        div.classList.add('productInCart')
        div.innerHTML = `
            <p>${product.nombre}</p>
            <p>Precio: $ ${product.precio}</p>
            <p id=cantidad${product.id}>Cantidad: ${product.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${product.id}">X</button>
        `
        container1.appendChild(div)
    });
};

const cartss = document.querySelector('.carts') // la constante cartss trae el elemento q contiene todo el carrito para luego ejecutar el listener para escuche cuando el user precione la x
cartss.addEventListener('click', (e) => {
    e.stopPropagation() // para solo muestre el evento e.target
    if (e.target.classList.contains('boton-eliminar')) { //si el target de lo q presinó el usuario contiene la clase boton eliniar se ejecuta la funcion eliminar producto
        eliminateProductCart(e.target.value)
    }
})



const eliminateProductCart =(productId) => { // esta funcion elimina el producto del carrito utilizando el metodo splice
    const index = cart.findIndex(product => product.id == productId)
    cart.splice(index, 1)
    printCart(cart); // luego actualiza el DOM
    refreshTotalCart(cart) // cambia el total 
    
} 



const refreshTotalCart = (cart) => {
    const totalCant = cart.reduce((acc, prod) => acc + prod.cantidad, 0)
    const totalBuy = cart.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)

    const contCart = document.getElementById('contador-carrito')
    const totalPrice = document.getElementById('precioTotal')

    contCart.innerText = totalCant
    totalPrice.innerText = totalBuy
    saveCartStorage(cart)
}

const saveCartStorage = (cartss) => {
    console.log(cartss)
    localStorage.setItem('cart', JSON.stringify(cartss))
};

const obtainCartStorage = () => {
    const cartStorage = JSON.parse(localStorage.getItem('cart'))
    return cartStorage
};

if (localStorage.getItem('cart')) {
    cart = obtainCartStorage()
    printCart(cart)
    refreshTotalCart(cart)
}



