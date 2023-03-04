const printProducts = (data) => { // funcion q recibe x parametro los objetos del array products
    const container = document.getElementById("mainOffers"); // se crea una constante q almacena el elemento q va a contener todos los productos según su id

    data.forEach(product => { // con el metodo forEach recorremos cada uno de los elementos o productos q contiene el array products, product es una var q itera cada uno de los elementos en al array
        const div = document.createElement("div"); // creamos un elemento html tip div
        div.classList.add("card"); // a ese div se le añade una clase
        div.innerHTML += `<div> 
                            <img src=${product.imagen}>
                            <span>${product.nombre}</span>
                            <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${product.id} class="material-icons agregar">add_shopping_cart</i></a>
                        </div>
                        <div class="price-card">
                            <p> $ ${product.precio}</p>
                        </div> `
        container.appendChild(div);               
    });
} // al div creado le insertamos con la propiedad inner HTML la estructura para q muestre el producto en la pantalla, el operador += hace q en cada iteracion se cree un div por cada elemento o producto q encuentre



