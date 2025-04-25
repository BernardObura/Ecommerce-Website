/**
 * ShopEasy E-commerce Platform
 * Utility functions for the application
 */

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @param {string} currencyCode - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currencyCode = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(amount);
  }
  
  /**
   * Format date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  
  /**
   * Get URL parameter value
   * @param {string} param - Parameter name
   * @returns {string|null} Parameter value or null if not found
   */
  function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  /**
   * Set URL parameter value
   * @param {string} param - Parameter name
   * @param {string} value - Parameter value
   */
  function setUrlParam(param, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.replaceState({}, '', url);
  }
  
  /**
   * Remove URL parameter
   * @param {string} param - Parameter name to remove
   */
  function removeUrlParam(param) {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);
    window.history.replaceState({}, '', url);
  }
  
  /**
   * Truncate text to a specified length
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} Truncated text
   */
  function truncateText(text, length = 100) {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  }
  
  /**
   * Generate star rating HTML
   * @param {number} rating - Rating value
   * @param {number} maxRating - Maximum rating value (default: 5)
   * @returns {string} HTML for star rating
   */
  function generateStarRating(rating, maxRating = 5) {
    let starsHtml = '';
    
    // Round to nearest half
    const roundedRating = Math.round(rating * 2) / 2;
    
    // Full stars
    const fullStars = Math.floor(roundedRating);
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (roundedRating % 1 !== 0) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    const emptyStars = Math.floor(maxRating - roundedRating);
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
  }
  
  /**
   * Create a toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error, warning, info)
   */
  function showToast(message, type = 'success') {
    // Get or create toast container
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center border-0 show`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    // Set background color based on type
    let bgClass = 'bg-success';
    let icon = '<i class="fas fa-check-circle me-2"></i>';
    
    switch (type) {
      case 'error':
        bgClass = 'bg-danger';
        icon = '<i class="fas fa-exclamation-circle me-2"></i>';
        break;
      case 'warning':
        bgClass = 'bg-warning';
        icon = '<i class="fas fa-exclamation-triangle me-2"></i>';
        break;
      case 'info':
        bgClass = 'bg-info';
        icon = '<i class="fas fa-info-circle me-2"></i>';
        break;
    }
    
    toast.classList.add(bgClass, 'text-white');
    
    // Set toast content
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${icon}${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 5000);
  }
  
  /**
   * Debounce function to limit how often a function can be called
   * @param {Function} func - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  function debounce(func, delay = 300) {
    let timerId;
    return function(...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  
  /**
   * Get random items from an array
   * @param {Array} array - Array to get items from
   * @param {number} count - Number of items to get
   * @returns {Array} Random items
   */
  function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  /**
   * Calculate discount percentage
   * @param {number} originalPrice - Original price
   * @param {number} discountedPrice - Discounted price
   * @returns {number} Discount percentage
   */
  function calculateDiscountPercentage(originalPrice, discountedPrice) {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }
  
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  /**
   * Get the category name by ID
   * @param {number} categoryId - Category ID
   * @returns {string} Category name or empty string if not found
   */
  function getCategoryNameById(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }
  
  /**
   * Get product by ID
   * @param {number} productId - Product ID
   * @returns {Object} Product object or null if not found
   */
  function getProductById(productId) {
    return products.find(p => p.id === parseInt(productId)) || null;
  }
  
  /**
   * Filter products by category
   * @param {number} categoryId - Category ID
   * @returns {Array} Filtered products
   */
  function getProductsByCategory(categoryId) {
    return products.filter(p => p.categoryId === parseInt(categoryId));
  }
  
  /**
   * Search products by keyword
   * @param {string} keyword - Search keyword
   * @returns {Array} Matching products
   */
  function searchProducts(keyword) {
    if (!keyword || keyword.trim() === '') return [];
    
    const searchTerm = keyword.toLowerCase().trim();
    
    return products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const descMatch = product.description.toLowerCase().includes(searchTerm);
      const categoryMatch = getCategoryNameById(product.categoryId).toLowerCase().includes(searchTerm);
      
      return nameMatch || descMatch || categoryMatch;
    });
  }
  
  /**
   * Get featured products
   * @param {number} limit - Maximum number of products to return
   * @returns {Array} Featured products
   */
  function getFeaturedProducts(limit = 8) {
    const featuredProducts = products.filter(p => p.featured);
    return featuredProducts.slice(0, limit);
  }
  
  /**
   * Get new arrival products
   * @param {number} limit - Maximum number of products to return
   * @returns {Array} New arrival products
   */
  function getNewArrivals(limit = 8) {
    const newArrivals = products.filter(p => p.newArrival);
    return newArrivals.slice(0, limit);
  }
  
  /**
   * Get products on sale
   * @param {number} limit - Maximum number of products to return
   * @returns {Array} Products on sale
   */
  function getProductsOnSale(limit = 8) {
    const onSale = products.filter(p => p.onSale);
    return onSale.slice(0, limit);
  }
  
  /**
   * Get best selling products
   * @param {number} limit - Maximum number of products to return
   * @returns {Array} Best selling products
   */
  function getBestSellerProducts(limit = 8) {
    const bestSellers = products.filter(p => p.bestSeller);
    return bestSellers.slice(0, limit);
  }
  
  /**
   * Get related products
   * @param {number} productId - Product ID
   * @param {number} limit - Maximum number of products to return
   * @returns {Array} Related products
   */
  function getRelatedProducts(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];
    
    // Get products in the same category
    const categoryProducts = getProductsByCategory(product.categoryId)
      .filter(p => p.id !== parseInt(productId));
    
    // If not enough products in the same category, add some random products
    if (categoryProducts.length < limit) {
      const otherProducts = products
        .filter(p => p.categoryId !== product.categoryId && p.id !== parseInt(productId));
      
      const randomOtherProducts = getRandomItems(
        otherProducts, 
        Math.min(limit - categoryProducts.length, otherProducts.length)
      );
      
      return [...categoryProducts, ...randomOtherProducts].slice(0, limit);
    }
    
    return getRandomItems(categoryProducts, limit);
  }
  
  /**
   * Calculate total price of cart items
   * @param {Array} cartItems - Array of cart items
   * @returns {number} Total price
   */
  function calculateCartTotal(cartItems) {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  
  /**
   * Get subtotal price of cart items (before tax and shipping)
   * @param {Array} cartItems - Array of cart items
   * @returns {number} Subtotal price
   */
  function calculateSubtotal(cartItems) {
    return calculateCartTotal(cartItems);
  }
  
  /**
   * Calculate shipping cost
   * @param {number} shippingMethodId - Shipping method ID
   * @param {number} subtotal - Subtotal price
   * @returns {number} Shipping cost
   */
  function calculateShippingCost(shippingMethodId, subtotal) {
    const shippingMethod = shippingMethods.find(sm => sm.id === parseInt(shippingMethodId));
    
    if (!shippingMethod) return 0;
    
    // Check if free shipping applies
    if (shippingMethod.minimumOrderAmount && subtotal >= shippingMethod.minimumOrderAmount) {
      return 0;
    }
    
    return shippingMethod.price;
  }
  
  /**
   * Calculate tax amount
   * @param {number} subtotal - Subtotal price
   * @param {number} taxRate - Tax rate (default: 0.08 for 8%)
   * @returns {number} Tax amount
   */
  function calculateTax(subtotal, taxRate = 0.08) {
    return subtotal * taxRate;
  }
  
  /**
   * Calculate order total
   * @param {Array} cartItems - Array of cart items
   * @param {number} shippingCost - Shipping cost
   * @param {number} taxRate - Tax rate
   * @returns {number} Order total
   */
  function calculateOrderTotal(cartItems, shippingCost, taxRate = 0.08) {
    const subtotal = calculateSubtotal(cartItems);
    const tax = calculateTax(subtotal, taxRate);
    return subtotal + shippingCost + tax;
  }
  
  /**
   * Save data to localStorage
   * @param {string} key - Storage key
   * @param {any} data - Data to store
   */
  function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  /**
   * Get data from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if not found
   * @returns {any} Stored data or default value
   */
  function getFromLocalStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    if (data === null) return defaultValue;
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing data from localStorage:', error);
      return defaultValue;
    }
  }
  
  /**
   * Remove data from localStorage
   * @param {string} key - Storage key
   */
  function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
  
  /**
   * Create a unique ID
   * @returns {string} Unique ID
   */
  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  /**
   * Add event listener with delegation
   * @param {string} eventType - Event type (e.g. 'click')
   * @param {string} selector - CSS selector to match
   * @param {Function} callback - Event handler function
   */
  function delegateEvent(eventType, selector, callback) {
    document.addEventListener(eventType, function(event) {
      const target = event.target.closest(selector);
      if (target) {
        callback(event, target);
      }
    });
  }
  
  /**
   * Serialize form data to object
   * @param {HTMLFormElement} form - Form element
   * @returns {Object} Form data as object
   */
  function serializeForm(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }
  
  /**
   * Validate form fields
   * @param {HTMLFormElement} form - Form element
   * @returns {boolean} Whether form is valid
   */
  function validateForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });
    
    return isValid;
  }
  
  /**
   * Create payment intent with Stripe (dummy implementation)
   * @param {number} amount - Payment amount
   * @returns {Promise} Promise resolving to payment intent
   */
  function createPaymentIntent(amount) {
    // This is a simulation function for the demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          clientSecret: 'pi_' + createUniqueId() + '_secret_' + createUniqueId(),
          amount: amount
        });
      }, 1000);
    });
  }
  
  /**
   * Process payment (dummy implementation)
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise} Promise resolving to payment result
   */
  function processPayment(paymentDetails) {
    // This is a simulation function for the demo
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        
        if (success) {
          resolve({
            success: true,
            transactionId: 'txn_' + createUniqueId(),
            message: 'Payment processed successfully!'
          });
        } else {
          resolve({
            success: false,
            error: 'Payment processing failed. Please try again.',
            code: 'payment_failed'
          });
        }
      }, 2000);
    });
  }