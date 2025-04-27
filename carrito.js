document.addEventListener('DOMContentLoaded', function() {
    // Obtener el carrito del localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Actualizar contador del carrito
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Renderizar los productos del carrito
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-mug-saucer"></i>
                    <p>Tu carrito está vacío</p>
                    <a href="index.html" class="btn">Explorar productos</a>
                </div>
            `;
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
                <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Añadir event listeners a los botones
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
        
        updateCartSummary();
    }
    
    // Actualizar el resumen del carrito
    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + shipping;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Funciones para modificar cantidades
    function decreaseQuantity(e) {
        const index = e.target.dataset.index;
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        saveCart();
        renderCartItems();
    }
    
    function increaseQuantity(e) {
        const index = e.target.dataset.index;
        cart[index].quantity++;
        saveCart();
        renderCartItems();
    }
    
    function removeItem(e) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        saveCart();
        renderCartItems();
    }
    
    // Guardar carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
    
    // Procesar pago
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        alert('¡Gracias por tu compra! Total: ' + totalElement.textContent);
        // Aquí normalmente redirigirías a un procesador de pagos
    });
    
    // Inicializar
    updateCartCount();
    renderCartItems();
});




document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Obtener carrito de localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Función para renderizar los productos del carrito
    function renderCart() {
        // Actualizar contador
        updateCartCount();
        
        // Mostrar productos o mensaje de carrito vacío
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-mug-saucer"></i>
                    <p>Tu carrito está vacío</p>
                    <a href="index.html" class="btn">Explorar productos</a>
                </div>
            `;
            updateCartSummary();
            return;
        }
        
        // Generar HTML para cada producto
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    ${item.discount ? `<span class="cart-item-discount">${item.discount}</span>` : ''}
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease" data-index="${index}">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-index="${index}">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-item" data-index="${index}">
                            <i class="fa-solid fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
                <div class="cart-item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
        
        // Añadir event listeners
        addEventListeners();
        updateCartSummary();
    }
    
    // Función para actualizar el contador
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Función para actualizar el resumen
    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + shipping;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Función para añadir event listeners
    function addEventListeners() {
        // Disminuir cantidad
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.dataset.index;
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
                renderCart();
            });
        });
        
        // Aumentar cantidad
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.dataset.index;
                cart[index].quantity++;
                saveCart();
                renderCart();
            });
        });
        
        // Eliminar producto
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.dataset.index;
                cart.splice(index, 1);
                saveCart();
                renderCart();
            });
        });
    }
    
    // Función para guardar el carrito
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        // Actualizar contador en todas las páginas
        if (window.updateCartCount) {
            window.updateCartCount();
        }
    }
    
    // Evento para proceder al pago
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        // Guardar carrito para la página de pago
        localStorage.setItem('checkoutCart', JSON.stringify({
            items: cart,
            subtotal: parseFloat(subtotalElement.textContent.replace('$', '')),
            shipping: shippingElement.textContent === 'Gratis' ? 0 : parseFloat(shippingElement.textContent.replace('$', '')),
            total: parseFloat(totalElement.textContent.replace('$', ''))
        }));
        
        // Redirigir a la página de pago
        window.location.href = 'pago.html';
    });
    
    // Inicializar
    renderCart();
});