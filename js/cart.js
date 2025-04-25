/**
 * ShopEasy E-commerce Platform
 * Shopping cart functionality
 */

// Cart object to manage shopping cart
const Cart = (function() {
    // Key for storing cart in localStorage
    const CART_STORAGE_KEY = 'shopeasy_cart';
    
    // Initialize cart
    let cart = getFromLocalStorage(CART_STORAGE_KEY, []);
    
    /**
     * Update cart badge count
     */
    function updateCartCount() {
      const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      const cartCountElements = document.querySelectorAll('.cart-count');
      
      cartCountElements.forEach(element => {
        element.textContent = cartCount;
        
        // Toggle visibility based on count
        if (cartCount > 0) {
          element.classList.remove('d-none');
        } else {
          element.classList.add('d-none');
        }
      });
    }
    
    /**
     * Save cart to localStorage
     */
    function saveCart() {
      saveToLocalStorage(CART_STORAGE_KEY, cart);
      updateCartCount();
      
      // Dispatch cart update event
      document.dispatchEvent(new CustomEvent('cart:updated', { 
        detail: { cart: cart } 
      }));
    }
    
    /**
     * Get cart items
     * @returns {Array} Cart items
     */
    function getItems() {
      return [...cart];
    }
    
    /**
     * Get cart item by product ID
     * @param {number} productId - Product ID
     * @returns {Object|null} Cart item or null if not found
     */
    function getItem(productId) {
      return cart.find(item => item.productId === productId) || null;
    }
    
    /**
     * Check if product is in cart
     * @param {number} productId - Product ID
     * @returns {boolean} Whether product is in cart
     */
    function hasItem(productId) {
      return cart.some(item => item.productId === productId);
    }
    
    /**
     * Add item to cart
     * @param {number} productId - Product ID
     * @param {number} quantity - Quantity to add
     * @param {Object} options - Product options (color, size, etc.)
     * @returns {Object} Updated cart item
     */
    function addItem(productId, quantity = 1, options = {}) {
      // Get product details
      const product = getProductById(productId);
      if (!product) {
        console.error(`Product with ID ${productId} not found`);
        return null;
      }
      
      // Check if product is already in cart
      const existingItem = getItem(productId);
      
      if (existingItem) {
        // Update quantity
        existingItem.quantity += quantity;
        
        // Update options
        if (Object.keys(options).length > 0) {
          existingItem.options = { ...existingItem.options, ...options };
        }
      } else {
        // Add new item
        cart.push({
          productId: productId,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity: quantity,
          options: options
        });
      }
      
      // Save cart
      saveCart();
      
      // Show toast notification
      showToast(`${product.name} added to cart`, 'success');
      
      return getItem(productId);
    }
    
    /**
     * Update item quantity
     * @param {number} productId - Product ID
     * @param {number} quantity - New quantity
     * @returns {Object|null} Updated cart item or null if not found
     */
    function updateItemQuantity(productId, quantity) {
      const item = getItem(productId);
      
      if (!item) {
        console.error(`Product with ID ${productId} not found in cart`);
        return null;
      }
      
      // Remove item if quantity is 0 or less
      if (quantity <= 0) {
        return removeItem(productId);
      }
      
      // Update quantity
      item.quantity = quantity;
      
      // Save cart
      saveCart();
      
      return item;
    }
    
    /**
     * Update item options
     * @param {number} productId - Product ID
     * @param {Object} options - New options
     * @returns {Object|null} Updated cart item or null if not found
     */
    function updateItemOptions(productId, options) {
      const item = getItem(productId);
      
      if (!item) {
        console.error(`Product with ID ${productId} not found in cart`);
        return null;
      }
      
      // Update options
      item.options = { ...item.options, ...options };
      
      // Save cart
      saveCart();
      
      return item;
    }
    
    /**
     * Remove item from cart
     * @param {number} productId - Product ID
     * @returns {boolean} Whether item was removed
     */
    function removeItem(productId) {
      const initialLength = cart.length;
      cart = cart.filter(item => item.productId !== productId);
      
      // Save cart
      saveCart();
      
      // Check if item was removed
      const wasRemoved = initialLength > cart.length;
      
      // Show toast notification if item was removed
      if (wasRemoved) {
        showToast('Item removed from cart', 'info');
      }
      
      return wasRemoved;
    }
    
    /**
     * Clear cart (remove all items)
     */
    function clearCart() {
      cart = [];
      saveCart();
      showToast('Cart cleared', 'info');
    }
    
    /**
     * Calculate cart subtotal
     * @returns {number} Cart subtotal
     */
    function getSubtotal() {
      return calculateCartTotal(cart);
    }
    
    /**
     * Get total number of items in cart
     * @returns {number} Total items
     */
    function getTotalItems() {
      return cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    /**
     * Check if cart is empty
     * @returns {boolean} Whether cart is empty
     */
    function isEmpty() {
      return cart.length === 0;
    }
    
    // Initialize cart count on page load
    updateCartCount();
    
    // Return public API
    return {
      getItems,
      getItem,
      hasItem,
      addItem,
      updateItemQuantity,
      updateItemOptions,
      removeItem,
      clearCart,
      getSubtotal,
      getTotalItems,
      isEmpty
    };
  })();
  
  // Setup event handlers when the DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Add to cart button handler
    delegateEvent('click', '.add-to-cart', function(event, element) {
      event.preventDefault();
      
      const productId = parseInt(element.dataset.productId);
      const quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
      const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
      
      // Collect options if available
      const options = {};
      const optionSelects = document.querySelectorAll(`.product-option[data-product-id="${productId}"]`);
      
      optionSelects.forEach(select => {
        if (select.value) {
          options[select.name] = select.value;
        }
      });
      
      // Add item to cart
      Cart.addItem(productId, quantity, options);
    });
    
    // Quick add to cart button handler (without options)
    delegateEvent('click', '.quick-add-to-cart', function(event, element) {
      event.preventDefault();
      
      const productId = parseInt(element.dataset.productId);
      Cart.addItem(productId, 1, {});
    });
    
    // Remove from cart button handler
    delegateEvent('click', '.remove-from-cart', function(event, element) {
      event.preventDefault();
      
      const productId = parseInt(element.dataset.productId);
      Cart.removeItem(productId);
      
      // Remove cart item element if on cart page
      const cartItemElement = element.closest('.cart-item');
      if (cartItemElement) {
        cartItemElement.remove();
        
        // Update cart summary
        updateCartSummary();
        
        // Show empty cart message if cart is empty
        if (Cart.isEmpty()) {
          const cartContainer = document.querySelector('.cart-container');
          if (cartContainer) {
            cartContainer.innerHTML = `
              <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h3>Your cart is empty</h3>
                <p class="text-muted">Looks like you haven't added any products to your cart yet.</p>
                <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
              </div>
            `;
          }
        }
      }
    });
    
    // Quantity increment button handler
    delegateEvent('click', '.quantity-increment', function(event, element) {
      const input = element.parentElement.querySelector('.quantity-input');
      const currentValue = parseInt(input.value);
      input.value = currentValue + 1;
      
      // Update cart if in cart page
      const productId = parseInt(input.dataset.productId);
      if (input.classList.contains('cart-quantity')) {
        Cart.updateItemQuantity(productId, parseInt(input.value));
        updateCartItemTotal(productId);
        updateCartSummary();
      }
      
      // Trigger change event
      input.dispatchEvent(new Event('change'));
    });
    
    // Quantity decrement button handler
    delegateEvent('click', '.quantity-decrement', function(event, element) {
      const input = element.parentElement.querySelector('.quantity-input');
      const currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
        
        // Update cart if in cart page
        const productId = parseInt(input.dataset.productId);
        if (input.classList.contains('cart-quantity')) {
          Cart.updateItemQuantity(productId, parseInt(input.value));
          updateCartItemTotal(productId);
          updateCartSummary();
        }
        
        // Trigger change event
        input.dispatchEvent(new Event('change'));
      }
    });
    
    // Quantity input change handler
    delegateEvent('change', '.cart-quantity', function(event, element) {
      const productId = parseInt(element.dataset.productId);
      const quantity = parseInt(element.value);
      
      if (quantity >= 1) {
        Cart.updateItemQuantity(productId, quantity);
        updateCartItemTotal(productId);
        updateCartSummary();
      } else {
        element.value = 1;
      }
    });
    
    // Clear cart button handler
    delegateEvent('click', '.clear-cart', function(event) {
      event.preventDefault();
      
      Cart.clearCart();
      
      // Reload page
      window.location.reload();
    });
  });
  
  /**
   * Update cart item total price
   * @param {number} productId - Product ID
   */
  function updateCartItemTotal(productId) {
    const item = Cart.getItem(productId);
    if (!item) return;
    
    const totalElement = document.querySelector(`.cart-item-total[data-product-id="${productId}"]`);
    if (totalElement) {
      totalElement.textContent = formatCurrency(item.price * item.quantity);
    }
  }
  
  /**
   * Update cart summary
   */
  function updateCartSummary() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const taxElement = document.getElementById('cart-tax');
    const totalElement = document.getElementById('cart-total');
    
    if (!subtotalElement) return;
    
    const cartItems = Cart.getItems();
    const subtotal = Cart.getSubtotal();
    
    // Get selected shipping method
    let shippingCost = 0;
    const shippingSelect = document.getElementById('shipping-method');
    if (shippingSelect) {
      shippingCost = calculateShippingCost(shippingSelect.value, subtotal);
    } else {
      // Default shipping
      shippingCost = subtotal >= 50 ? 0 : 5.99;
    }
    
    const taxRate = 0.08; // 8% tax
    const tax = calculateTax(subtotal, taxRate);
    const total = subtotal + shippingCost + tax;
    
    subtotalElement.textContent = formatCurrency(subtotal);
    
    if (shippingElement) {
      shippingElement.textContent = formatCurrency(shippingCost);
    }
    
    if (taxElement) {
      taxElement.textContent = formatCurrency(tax);
    }
    
    totalElement.textContent = formatCurrency(total);
  }