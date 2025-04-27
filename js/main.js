document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let cart = [];
    const cartIcon = document.querySelector('.fa-basket-shopping');
    const cartCount = document.querySelector('.content-shopping-cart .number');
    const productsContainer = document.querySelector('.container-products');
    const filterOptions = document.querySelectorAll('.container-options span');
    const menuToggle = document.querySelector('.fa-bars');
    const menu = document.querySelector('.menu');
    const newsletterForm = document.querySelector('.newsletter form');
    
    // 1. Carrito de compras
    function updateCart() {
        cartCount.textContent = `(${cart.length})`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    function addToCart(product) {
        cart.push(product);
        updateCart();
        showNotification(`${product.name} añadido al carrito`);
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // 2. Filtrado de productos
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            filterProducts(filter);
        });
    });
    
    function filterProducts(filter) {
        const products = document.querySelectorAll('.card-product');
        
        products.forEach(product => {
            const isFeatured = product.querySelector('.discount') !== null;
            const isNew = product.querySelector('.new-badge') !== null;
            const isBestSeller = product.querySelector('.best-seller') !== null;
            
            switch(filter) {
                case 'destacados':
                    product.style.display = isFeatured ? 'block' : 'none';
                    break;
                case 'más recientes':
                    product.style.display = isNew ? 'block' : 'none';
                    break;
                case 'mejores vendidos':
                    product.style.display = isBestSeller ? 'block' : 'none';
                    break;
                default:
                    product.style.display = 'block';
            }
        });
    }
    
    // 3. Menú responsive
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show-menu');
    });
    
    // 4. Manejo de productos
    productsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-cart') || 
            e.target.parentElement.classList.contains('add-cart')) {
            const productCard = e.target.closest('.card-product');
            const product = {
                id: productCard.dataset.id || Date.now(),
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price').textContent.split('$')[1].trim(),
                image: productCard.querySelector('img').src
            };
            addToCart(product);
        }
    });
    
    // 5. Newsletter
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (validateEmail(email)) {
            showNotification('¡Gracias por suscribirte!');
            emailInput.value = '';
        } else {
            showNotification('Por favor ingresa un email válido');
        }
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // 6. Galería interactiva
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'modal-gallery';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').addEventListener('click', function() {
                modal.remove();
            });
        });
    });
    
    // Inicialización
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart();
    }
});



document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.querySelector('.fa-basket-shopping');
    const cartCount = document.querySelector('.content-shopping-cart .number');
    
    // Función para actualizar el contador del carrito
    function updateCart() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Función para añadir productos al carrito
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        
        updateCart();
        showNotification(`${product.name} añadido al carrito`);
    }
    
    // Función para mostrar notificaciones
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fa-solid fa-check"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Evento para añadir productos al carrito
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-cart')) {
            const productCard = e.target.closest('.card-product');
            const product = {
                id: productCard.dataset.id || Date.now().toString(),
                name: productCard.querySelector('h3').textContent,
                price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
                image: productCard.querySelector('img').src,
                discount: productCard.querySelector('.discount')?.textContent
            };
            addToCart(product);
        }
    });
    
    // Inicializar el carrito
    updateCart();
    
    // Otras funcionalidades (filtros, menú, etc.)...
});