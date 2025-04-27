document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos del carrito
    const checkoutData = JSON.parse(localStorage.getItem('checkoutCart'));
    const itemsList = document.getElementById('checkout-items-list');
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const totalElement = document.getElementById('checkout-total');
    const payAmount = document.getElementById('pay-amount');
    
    // Mostrar productos y totales
    if (checkoutData && checkoutData.items.length > 0) {
        // Renderizar productos
        itemsList.innerHTML = checkoutData.items.map(item => `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="checkout-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.quantity} x $${item.price.toFixed(2)}</p>
                </div>
                <div class="checkout-item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
        
        // Mostrar totales
        subtotalElement.textContent = `$${checkoutData.subtotal.toFixed(2)}`;
        shippingElement.textContent = checkoutData.shipping === 0 ? 'Gratis' : `$${checkoutData.shipping.toFixed(2)}`;
        totalElement.textContent = `$${checkoutData.total.toFixed(2)}`;
        payAmount.textContent = checkoutData.total.toFixed(2);
    } else {
        itemsList.innerHTML = '<p class="empty-checkout">No hay productos en tu carrito. <a href="index.html">Volver a la tienda</a></p>';
    }
    
    // Manejar el formulario de pago
    document.getElementById('payment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular procesamiento de pago
        const paymentProcessing = document.createElement('div');
        paymentProcessing.className = 'payment-processing';
        paymentProcessing.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            <p>Procesando tu pago...</p>
        `;
        document.querySelector('.checkout-form').appendChild(paymentProcessing);
        
        // Simular retraso de red
        setTimeout(() => {
            paymentProcessing.innerHTML = `
                <i class="fa-solid fa-check-circle"></i>
                <p>¡Pago completado con éxito!</p>
                <p>Tu pedido ha sido procesado.</p>
            `;
            
            // Limpiar carrito después de pago exitoso
            localStorage.removeItem('cart');
            localStorage.removeItem('checkoutCart');
            
            // Redirigir a confirmación después de 3 segundos
            setTimeout(() => {
                window.location.href = 'confirmacion.html';
            }, 3000);
        }, 2000);
    });
});