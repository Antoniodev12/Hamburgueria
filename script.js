const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCount = document.getElementById('cart-count');
const addressInput = document.getElementById('address');
const addressWarn = document.getElementById('address-warn');

let cart = [];

cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex";
    upDateModal();
});

cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none";
});

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }
});

function addToCart(name, price){
    const hasItem = cart.find(item => item.name === name);
    if(hasItem){
        hasItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity:1,
        });

        console.log(cart)
    }
    upDateModal();
}

function upDateModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-bold mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
            </div>
              <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });
    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });
    cartCount.innerHTML = cart.length
}


cartItemsContainer.addEventListener("click", function(e){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = e.getAttribute("data-name");
        removeItemCart(name)
    }
});

function  removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item =  cart[index];
        if(item.quantity > 1){
            item.quantity -= 1;
            upDateModal();
            return;
        }
        cart.splice(index, 1);
    }
}

addressInput.addEventListener("input", function(e){
    let inputValue = e.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }

});

checkoutBtn.addEventListener("click", function(){
    // const isOpen  = checkRestauranteisOpen();

    // if(!isOpen){
    //     alert("FECHADO NO MOMENTO!!!");
    //     return;
    // }


    const cartItems = cart.map((item)=>{
        return(
            `${item.name} Quantidade: (${item.quantity}) preço: R$${item.price} |`
        )
    }).join("");

    const menssage = encodeURIComponent(cartItems);
    const phone = "75982592997";
    window.open(`https://wa.me/${phone}?text=${menssage} Endereço:${addressInput.value}`, "_blank");


    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

});

function checkRestauranteisOpen(){
    const data = new Date();
    const horas = data.getHours();
    return horas  >= 18 &&  horas < 22;
}

const spanItem = document.getElementById('date-span');
const isOpen = checkRestauranteisOpen();

if(isOpen){
    spanItem.classList.remove('bg-yellow-600');
    spanItem.classList.add('bg-green-600');
}else{
    spanItem.classList.add('bg-yellow-600');
    spanItem.classList.remove('bg-green-600');
}