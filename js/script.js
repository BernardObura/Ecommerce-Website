/**
 * ShopEasy E-commerce Platform
 * Main script for initializing the application
 */

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Initialize common elements (header, footer, etc.)
    initializeCommonElements();
    
    // Initialize page-specific functionality
    switch (currentPage) {
      case 'index.html':
      case '':
        initializeHomePage();
        break;
      case 'shop.html':
        initializeShopPage();
        break;
      case 'product.html':
        initializeProductPage();
        break;
      case 'cart.html':
        initializeCartPage();
        break;
      case 'checkout.html':
        initializeCheckoutPage();
        break;
      case 'confirmation.html':
        initializeConfirmationPage();
        break;
      case 'login.html':
        initializeLoginPage();
        break;
      case 'register.html':
        initializeRegisterPage();
        break;
      case 'account.html':
        initializeAccountPage();
        break;
      case 'orders.html':
        initializeOrdersPage();
        break;
    }
    
    // Initialize search functionality
    initializeSearch();
  });
  
  /**
   * Initialize common elements on all pages
   */
  function initializeCommonElements() {
    // Load categories in dropdown
    loadCategoriesDropdown();
    
    // Handle search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput && searchInput.value.trim()) {
          window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value.trim())}`;
        }
      });
    }
    
    // Activate current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput && isValidEmail(emailInput.value)) {
          showToast('Thank you for subscribing to our newsletter!', 'success');
          emailInput.value = '';
        } else {
          showToast('Please enter a valid email address', 'error');
        }
      });
    }
  }
  
  /**
   * Load categories in dropdown menu
   */
  function loadCategoriesDropdown() {
    const categoriesDropdown = document.getElementById('categories-dropdown');
    if (!categoriesDropdown) return;
    
    let categoriesHtml = '';
    
    categories.forEach(category => {
      categoriesHtml += `
        <li><a class="dropdown-item" href="shop.html?category=${category.id}">${category.name}</a></li>
      `;
    });
    
    categoriesDropdown.innerHTML = categoriesHtml;
  }
  
  /**
   * Initialize search functionality
   */
  function initializeSearch() {
    // Handle search input in real-time
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
      // Debounce search as user types
      const debouncedSearch = debounce(function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length >= 3) {
          // We could show search suggestions here in a dropdown
          // For now, we'll just handle form submission
        }
      }, 300);
      
      searchInput.addEventListener('input', debouncedSearch);
    }
  }
  
  /**
   * Initialize home page
   */
  function initializeHomePage() {
    // Load featured categories
    loadFeaturedCategories();
    
    // Load featured products
    loadFeaturedProducts();
    
    // Load new arrivals
    loadNewArrivals();
  }
  
  /**
   * Load featured categories on home page
   */
  function loadFeaturedCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    if (!categoriesContainer) return;
    
    // Get featured categories
    const featuredCategories = categories.filter(category => category.featured);
    
    let categoriesHtml = '';
    
    featuredCategories.forEach(category => {
      categoriesHtml += `
        <div class="col-6 col-md-3">
          <a href="shop.html?category=${category.id}" class="text-decoration-none">
            <div class="category-card position-relative">
              <img src="${category.image}" alt="${category.name}" class="img-fluid">
              <div class="category-content">
                <h5 class="mb-0">${category.name}</h5>
              </div>
            </div>
          </a>
        </div>
      `;
    });
    
    categoriesContainer.innerHTML = categoriesHtml;
  }
  
  /**
   * Load featured products on home page
   */
  function loadFeaturedProducts() {
    const productsContainer = document.getElementById('featured-products-container');
    if (!productsContainer) return;
    
    // Get featured products
    const featuredProducts = getFeaturedProducts(8);
    
    let productsHtml = '';
    
    featuredProducts.forEach(product => {
      productsHtml += createProductCardHtml(product);
    });
    
    productsContainer.innerHTML = productsHtml;
  }
  
  /**
   * Load new arrivals on home page
   */
  function loadNewArrivals() {
    const newArrivalsContainer = document.getElementById('new-arrivals-container');
    if (!newArrivalsContainer) return;
    
    // Get new arrival products
    const newArrivals = getNewArrivals(8);
    
    let productsHtml = '';
    
    newArrivals.forEach(product => {
      productsHtml += createProductCardHtml(product);
    });
    
    newArrivalsContainer.innerHTML = productsHtml;
  }
  
  /**
   * Create HTML for a product card
   * @param {Object} product - Product data
   * @returns {string} Product card HTML
   */
  function createProductCardHtml(product) {
    // Calculate discount percentage if product is on sale
    const discountBadge = product.oldPrice ? 
      `<span class="badge bg-danger product-badge">-${calculateDiscountPercentage(product.oldPrice, product.price)}%</span>` : '';
    
    // New arrival badge
    const newArrivalBadge = product.newArrival ? 
      `<span class="badge bg-success product-badge ms-1">New</span>` : '';
    
    // Best seller badge
    const bestSellerBadge = product.bestSeller ? 
      `<span class="badge bg-warning text-dark product-badge ms-1">Best Seller</span>` : '';
    
    // Generate star rating
    const ratingHtml = generateStarRating(product.rating);
    
    // Generate price HTML
    const priceHtml = product.oldPrice ?
      `<span class="text-primary fw-bold">${formatCurrency(product.price)}</span>
       <span class="old-price">${formatCurrency(product.oldPrice)}</span>` :
      `<span class="text-primary fw-bold">${formatCurrency(product.price)}</span>`;
    
    return `
      <div class="col">
        <div class="product-card h-100">
          <div class="product-image">
            <div class="product-badges">
              ${discountBadge}
              ${newArrivalBadge}
              ${bestSellerBadge}
            </div>
            <a href="product.html?id=${product.id}">
              <img src="${product.images[0]}" alt="${product.name}" class="img-fluid">
            </a>
            <div class="product-actions position-absolute bottom-0 start-0 w-100 p-3 bg-light bg-opacity-75">
              <div class="d-flex justify-content-between">
                <button class="btn btn-sm btn-primary quick-add-to-cart" data-product-id="${product.id}">
                  <i class="fas fa-shopping-cart me-1"></i> Add to Cart
                </button>
                <a href="product.html?id=${product.id}" class="btn btn-sm btn-outline-primary">
                  <i class="fas fa-eye"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="product-card-body">
            <a href="product.html?id=${product.id}" class="text-decoration-none">
              <h5 class="product-title text-dark">${product.name}</h5>
            </a>
            <div class="product-price mb-2">
              ${priceHtml}
            </div>
            <div class="product-rating text-warning mb-1">
              ${ratingHtml}
              <span class="text-muted ms-1">(${product.reviews})</span>
            </div>
            <p class="text-muted small mb-0 text-truncate-2">${truncateText(product.description, 60)}</p>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Initialize shop page
   */
  function initializeShopPage() {
    // Get filter parameters from URL
    const categoryId = getUrlParam('category');
    const searchTerm = getUrlParam('search');
    
    // Load all products or filtered products
    let filteredProducts = [];
    let title = 'All Products';
    
    if (categoryId) {
      // Filter by category
      filteredProducts = getProductsByCategory(parseInt(categoryId));
      const category = categories.find(c => c.id === parseInt(categoryId));
      title = category ? `${category.name}` : 'Products';
    } else if (searchTerm) {
      // Filter by search term
      filteredProducts = searchProducts(searchTerm);
      title = `Search Results for "${searchTerm}"`;
    } else {
      // Show all products
      filteredProducts = [...products];
    }
    
    // Update page title
    const shopTitleElement = document.getElementById('shop-title');
    if (shopTitleElement) {
      shopTitleElement.textContent = title;
    }
    
    // Update product count
    const productCountElement = document.getElementById('product-count');
    if (productCountElement) {
      productCountElement.textContent = `${filteredProducts.length} products`;
    }
    
    // Display products
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info">
            No products found. Try a different search or category.
          </div>
        </div>
      `;
      return;
    }
    
    let productsHtml = '';
    
    filteredProducts.forEach(product => {
      productsHtml += createProductCardHtml(product);
    });
    
    productsContainer.innerHTML = productsHtml;
  }
  
  /**
   * Initialize product detail page
   */
  function initializeProductPage() {
    // Get product ID from URL
    const productId = getUrlParam('id');
    if (!productId) {
      window.location.href = 'shop.html';
      return;
    }
    
    // Get product data
    const product = getProductById(productId);
    if (!product) {
      window.location.href = 'shop.html';
      return;
    }
    
    // Update page title
    document.title = `${product.name} - ShopEasy`;
    
    // Load product details
    const productDetailContainer = document.getElementById('product-detail');
    if (!productDetailContainer) return;
    
    // Generate image gallery HTML
    let galleryThumbs = '';
    product.images.forEach((image, index) => {
      galleryThumbs += `
        <div class="product-gallery-thumb ${index === 0 ? 'active' : ''}" data-image-index="${index}">
          <img src="${image}" alt="${product.name}">
        </div>
      `;
    });
    
    // Generate options HTML
    let optionsHtml = '';
    
    if (product.options) {
      for (const [optionName, optionValues] of Object.entries(product.options)) {
        if (optionValues.length > 0) {
          optionsHtml += `
            <div class="mb-3">
              <label class="form-label fw-bold">${optionName.charAt(0).toUpperCase() + optionName.slice(1)}</label>
              <select class="form-select product-option" name="${optionName}" data-product-id="${product.id}">
                <option value="">Select ${optionName}</option>
                ${optionValues.map(value => `<option value="${value}">${value}</option>`).join('')}
              </select>
            </div>
          `;
        }
      }
    }
    
    // Calculate discount percentage
    const discountPercentage = product.oldPrice ? 
      calculateDiscountPercentage(product.oldPrice, product.price) : 0;
    
    // Generate discount badge
    const discountBadge = product.oldPrice ? 
      `<span class="badge bg-danger me-2">-${discountPercentage}%</span>` : '';
    
    // Generate availability badge
    const availabilityBadge = product.stock > 0 ? 
      `<span class="badge bg-success">In Stock</span>` : 
      `<span class="badge bg-danger">Out of Stock</span>`;
    
    // Generate star rating
    const ratingHtml = generateStarRating(product.rating);
    
    // Generate price HTML
    const priceHtml = product.oldPrice ?
      `<span class="text-primary fs-3 fw-bold">${formatCurrency(product.price)}</span>
       <span class="text-decoration-line-through text-muted ms-2">${formatCurrency(product.oldPrice)}</span>` :
      `<span class="text-primary fs-3 fw-bold">${formatCurrency(product.price)}</span>`;
    
    // Generate category name
    const categoryName = getCategoryNameById(product.categoryId);
    
    productDetailContainer.innerHTML = `
      <div class="row">
        <!-- Product Gallery -->
        <div class="col-md-6 mb-4">
          <div class="product-gallery">
            <div class="product-gallery-preview mb-3">
              <img src="${product.images[0]}" alt="${product.name}" id="gallery-preview" class="img-fluid rounded">
            </div>
            <div class="product-gallery-thumbs">
              ${galleryThumbs}
            </div>
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="col-md-6">
          <div class="product-info">
            <h1 class="h2 mb-2">${product.name}</h1>
            
            <div class="mb-3">
              <div class="product-rating text-warning mb-1">
                ${ratingHtml}
                <span class="text-muted ms-1">(${product.reviews} reviews)</span>
              </div>
            </div>
            
            <div class="mb-3">
              ${discountBadge}
              ${availabilityBadge}
              <span class="badge bg-info ms-2">${categoryName}</span>
            </div>
            
            <div class="product-price mb-4">
              ${priceHtml}
            </div>
            
            <div class="product-description mb-4">
              <p>${product.description}</p>
            </div>
            
            <div class="product-options mb-4">
              ${optionsHtml}
              
              <div class="mb-3">
                <label class="form-label fw-bold">Quantity</label>
                <div class="quantity-selector">
                  <button type="button" class="quantity-decrement">-</button>
                  <input type="number" class="quantity-input" data-product-id="${product.id}" value="1" min="1" max="${product.stock}">
                  <button type="button" class="quantity-increment">+</button>
                </div>
              </div>
            </div>
            
            <div class="product-actions d-flex gap-2 mb-4">
              <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                <i class="fas fa-shopping-cart me-2"></i>Add to Cart
              </button>
            </div>
            
            <div class="product-meta">
              <p class="mb-1"><strong>SKU:</strong> PROD-${product.id.toString().padStart(4, '0')}</p>
              <p class="mb-1"><strong>Category:</strong> ${categoryName}</p>
              <p><strong>Tags:</strong> ${categoryName}, ${product.bestSeller ? 'Best Seller,' : ''} ${product.newArrival ? 'New Arrival' : ''}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Product Tabs -->
      <div class="product-details-tabs mt-5">
        <ul class="nav nav-tabs mb-4" id="productTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description-tab-pane" type="button" role="tab" aria-controls="description-tab-pane" aria-selected="true">Description</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="specifications-tab" data-bs-toggle="tab" data-bs-target="#specifications-tab-pane" type="button" role="tab" aria-controls="specifications-tab-pane" aria-selected="false">Specifications</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">Reviews (${product.reviews})</button>
          </li>
        </ul>
        
        <div class="tab-content" id="productTabsContent">
          <div class="tab-pane fade show active" id="description-tab-pane" role="tabpanel" aria-labelledby="description-tab" tabindex="0">
            <div class="p-4 bg-light rounded">
              <h4>Product Description</h4>
              <p>${product.description}</p>
              <p>This premium quality product is designed to meet the highest standards of performance and durability. Each unit undergoes rigorous testing to ensure it meets our quality benchmarks.</p>
              <p>Key benefits include:</p>
              <ul>
                <li>Superior quality materials</li>
                <li>Durable construction</li>
                <li>User-friendly design</li>
                <li>Excellent performance</li>
                <li>Backed by our comprehensive warranty</li>
              </ul>
            </div>
          </div>
          
          <div class="tab-pane fade" id="specifications-tab-pane" role="tabpanel" aria-labelledby="specifications-tab" tabindex="0">
            <div class="p-4 bg-light rounded">
              <h4>Technical Specifications</h4>
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <th scope="row">Product ID</th>
                    <td>PROD-${product.id.toString().padStart(4, '0')}</td>
                  </tr>
                  <tr>
                    <th scope="row">Category</th>
                    <td>${categoryName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Availability</th>
                    <td>${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                  </tr>
                  <tr>
                    <th scope="row">Weight</th>
                    <td>0.5 kg</td>
                  </tr>
                  <tr>
                    <th scope="row">Dimensions</th>
                    <td>25 x 15 x 5 cm</td>
                  </tr>
                  <tr>
                    <th scope="row">Warranty</th>
                    <td>1 Year Limited Warranty</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">
            <div class="p-4 bg-light rounded">
              <h4>Customer Reviews</h4>
              <div class="mb-4">
                <div class="d-flex align-items-center mb-2">
                  <div class="text-warning me-2">
                    ${generateStarRating(product.rating)}
                  </div>
                  <span class="fw-bold">${product.rating.toFixed(1)} out of 5</span>
                </div>
                <p class="text-muted">${product.reviews} global ratings</p>
              </div>
              
              <div class="review-list">
                <!-- Sample reviews -->
                <div class="review-item mb-4 pb-4 border-bottom">
                  <div class="d-flex justify-content-between mb-2">
                    <div class="d-flex align-items-center">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Reviewer" class="rounded-circle me-2" width="40" height="40">
                      <div>
                        <h6 class="mb-0">Michael Johnson</h6>
                        <small class="text-muted">Posted on ${formatDate(new Date(2023, 5, 15).toISOString())}</small>
                      </div>
                    </div>
                    <div class="text-warning">
                      ${generateStarRating(5)}
                    </div>
                  </div>
                  <h6>Excellent product, highly recommended!</h6>
                  <p class="mb-0">This exceeded my expectations. The quality is outstanding and it works perfectly for my needs. I would definitely purchase again.</p>
                </div>
                
                <div class="review-item mb-4 pb-4 border-bottom">
                  <div class="d-flex justify-content-between mb-2">
                    <div class="d-flex align-items-center">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Reviewer" class="rounded-circle me-2" width="40" height="40">
                      <div>
                        <h6 class="mb-0">Sarah Williams</h6>
                        <small class="text-muted">Posted on ${formatDate(new Date(2023, 4, 28).toISOString())}</small>
                      </div>
                    </div>
                    <div class="text-warning">
                      ${generateStarRating(4)}
                    </div>
                  </div>
                  <h6>Good value for money</h6>
                  <p class="mb-0">I'm satisfied with my purchase. The product is well-made and delivers what it promises. Fast shipping too!</p>
                </div>
                
                <!-- Review form -->
                <div class="review-form mt-4">
                  <h5>Write a Review</h5>
                  <form id="review-form" class="mt-3">
                    <div class="mb-3">
                      <label class="form-label">Rating</label>
                      <div class="rating-stars mb-2">
                        <i class="far fa-star fs-4 me-1 cursor-pointer" data-rating="1"></i>
                        <i class="far fa-star fs-4 me-1 cursor-pointer" data-rating="2"></i>
                        <i class="far fa-star fs-4 me-1 cursor-pointer" data-rating="3"></i>
                        <i class="far fa-star fs-4 me-1 cursor-pointer" data-rating="4"></i>
                        <i class="far fa-star fs-4 cursor-pointer" data-rating="5"></i>
                      </div>
                    </div>
                    
                    <div class="mb-3">
                      <label for="review-title" class="form-label">Title</label>
                      <input type="text" class="form-control" id="review-title" required>
                    </div>
                    
                    <div class="mb-3">
                      <label for="review-text" class="form-label">Your Review</label>
                      <textarea class="form-control" id="review-text" rows="4" required></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Submit Review</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Products -->
      <div class="related-products mt-5">
        <h3 class="mb-4">You May Also Like</h3>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4" id="related-products-container"></div>
      </div>
    `;
    
    // Load related products
    const relatedProductsContainer = document.getElementById('related-products-container');
    if (relatedProductsContainer) {
      const relatedProducts = getRelatedProducts(productId, 4);
      
      let relatedProductsHtml = '';
      
      relatedProducts.forEach(relatedProduct => {
        relatedProductsHtml += createProductCardHtml(relatedProduct);
      });
      
      relatedProductsContainer.innerHTML = relatedProductsHtml;
    }
    
    // Initialize gallery functionality
    initializeProductGallery();
    
    // Initialize review form
    initializeReviewForm();
  }
  
  /**
   * Initialize product gallery functionality
   */
  function initializeProductGallery() {
    const galleryPreview = document.getElementById('gallery-preview');
    const galleryThumbs = document.querySelectorAll('.product-gallery-thumb');
    
    if (!galleryPreview || galleryThumbs.length === 0) return;
    
    // Handle thumbnail click
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        // Update active state
        galleryThumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Update preview image
        const imgSrc = this.querySelector('img').src;
        galleryPreview.src = imgSrc;
      });
    });
  }
  
  /**
   * Initialize review form
   */
  function initializeReviewForm() {
    const reviewForm = document.getElementById('review-form');
    const ratingStars = document.querySelectorAll('.rating-stars i');
    
    if (!reviewForm || ratingStars.length === 0) return;
    
    let selectedRating = 0;
    
    // Handle star hover and click
    ratingStars.forEach(star => {
      // Hover effect
      star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.dataset.rating);
        updateStars(rating, true);
      });
      
      // Click to set rating
      star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.rating);
        updateStars(selectedRating, false);
      });
    });
    
    // Reset stars on mouse leave if no rating selected
    document.querySelector('.rating-stars').addEventListener('mouseleave', function() {
      updateStars(selectedRating, false);
    });
    
    // Handle form submission
    reviewForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (selectedRating === 0) {
        showToast('Please select a rating', 'error');
        return;
      }
      
      const title = document.getElementById('review-title').value.trim();
      const text = document.getElementById('review-text').value.trim();
      
      // In a real app, this would be sent to a server
      showToast('Thank you for your review!', 'success');
      
      // Reset form
      selectedRating = 0;
      updateStars(0, false);
      reviewForm.reset();
    });
    
    // Update star display
    function updateStars(rating, isHover) {
      ratingStars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        
        if (starRating <= rating) {
          star.className = 'fas fa-star fs-4 me-1 cursor-pointer text-warning';
        } else {
          star.className = 'far fa-star fs-4 me-1 cursor-pointer';
        }
      });
    }
  }
  
  /**
   * Initialize cart page
   */
  function initializeCartPage() {
    // Get cart items
    const cartItems = Cart.getItems();
    
    // Display cart items
    const cartContainer = document.querySelector('.cart-container');
    if (!cartContainer) return;
    
    // Check if cart is empty
    if (cartItems.length === 0) {
      cartContainer.innerHTML = `
        <div class="text-center py-5">
          <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
          <h3>Your cart is empty</h3>
          <p class="text-muted">Looks like you haven't added any products to your cart yet.</p>
          <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
        </div>
      `;
      return;
    }
    
    // Generate cart items HTML
    let cartItemsHtml = '';
    
    cartItems.forEach(item => {
      // Get product details for additional info
      const product = getProductById(item.productId);
      
      // Generate options HTML if available
      let optionsHtml = '';
      if (item.options && Object.keys(item.options).length > 0) {
        optionsHtml += '<div class="small text-muted mb-2">';
        for (const [key, value] of Object.entries(item.options)) {
          optionsHtml += `<div>${key}: ${value}</div>`;
        }
        optionsHtml += '</div>';
      }
      
      cartItemsHtml += `
        <div class="cart-item">
          <div class="row align-items-center">
            <div class="col-md-2 col-4">
              <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" class="img-fluid">
              </div>
            </div>
            <div class="col-md-4 col-8">
              <div class="cart-item-details">
                <h5 class="cart-item-title">${item.name}</h5>
                ${optionsHtml}
                <div class="d-md-none mt-2">
                  <span class="fw-bold">${formatCurrency(item.price)}</span>
                </div>
              </div>
            </div>
            <div class="col-md-2 d-none d-md-block">
              <div class="cart-item-price">${formatCurrency(item.price)}</div>
            </div>
            <div class="col-md-2 col-6 mt-3 mt-md-0">
              <div class="quantity-selector mx-auto mx-md-0">
                <button type="button" class="quantity-decrement">-</button>
                <input type="number" class="quantity-input cart-quantity" data-product-id="${item.productId}" value="${item.quantity}" min="1">
                <button type="button" class="quantity-increment">+</button>
              </div>
            </div>
            <div class="col-md-1 col-6 text-end text-md-start mt-3 mt-md-0">
              <div class="cart-item-total" data-product-id="${item.productId}">${formatCurrency(item.price * item.quantity)}</div>
            </div>
            <div class="col-md-1 text-end mt-3 mt-md-0">
              <button class="btn btn-sm btn-outline-danger remove-from-cart" data-product-id="${item.productId}">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    });
    
    // Generate cart summary
    const cartSummaryHtml = `
      <div class="cart-summary p-4 rounded">
        <h4 class="mb-4">Order Summary</h4>
        
        <div class="cart-summary-line">
          <span>Subtotal</span>
          <span id="cart-subtotal">${formatCurrency(Cart.getSubtotal())}</span>
        </div>
        
        <div class="cart-summary-line">
          <span>Shipping</span>
          <span id="cart-shipping">${formatCurrency(Cart.getSubtotal() >= 50 ? 0 : 5.99)}</span>
        </div>
        
        <div class="cart-summary-line">
          <span>Estimated Tax</span>
          <span id="cart-tax">${formatCurrency(Cart.getSubtotal() * 0.08)}</span>
        </div>
        
        <div class="cart-summary-total d-flex justify-content-between">
          <span>Total</span>
          <span id="cart-total">${formatCurrency(Cart.getSubtotal() + (Cart.getSubtotal() >= 50 ? 0 : 5.99) + (Cart.getSubtotal() * 0.08))}</span>
        </div>
        
        <div class="mt-4">
          <a href="checkout.html" class="btn btn-primary w-100">Proceed to Checkout</a>
        </div>
        
        <div class="mt-3 text-center">
          <a href="shop.html" class="text-decoration-none">
            <i class="fas fa-arrow-left me-1"></i> Continue Shopping
          </a>
        </div>
      </div>
    `;
    
    // Generate full cart HTML
    cartContainer.innerHTML = `
      <div class="row">
        <div class="col-lg-8 mb-4 mb-lg-0">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3>Shopping Cart (${Cart.getTotalItems()} items)</h3>
            <button class="btn btn-outline-danger btn-sm clear-cart">
              <i class="fas fa-trash-alt me-1"></i> Clear Cart
            </button>
          </div>
          
          <div class="cart-items bg-light p-4 rounded">
            ${cartItemsHtml}
          </div>
        </div>
        
        <div class="col-lg-4">
          ${cartSummaryHtml}
        </div>
      </div>
    `;
  }
  
  /**
   * Initialize checkout page
   */
  function initializeCheckoutPage() {
    // Get cart items
    const cartItems = Cart.getItems();
    
    // Redirect to cart if empty
    if (cartItems.length === 0) {
      window.location.href = 'cart.html';
      return;
    }
    
    // Initialize checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;
    
    // Load shipping methods
    const shippingMethodsContainer = document.getElementById('shipping-methods');
    if (shippingMethodsContainer) {
      let shippingMethodsHtml = '';
      
      shippingMethods.forEach(method => {
        // Check if this is free shipping and if it applies
        let isAvailable = true;
        let unavailableMessage = '';
        
        if (method.minimumOrderAmount && Cart.getSubtotal() < method.minimumOrderAmount) {
          isAvailable = false;
          unavailableMessage = `<span class="text-muted">(Available for orders over ${formatCurrency(method.minimumOrderAmount)})</span>`;
        }
        
        shippingMethodsHtml += `
          <div class="form-check mb-3">
            <input class="form-check-input" type="radio" name="shippingMethod" id="shipping-${method.id}" 
              value="${method.id}" ${method.id === 1 ? 'checked' : ''} ${!isAvailable ? 'disabled' : ''}>
            <label class="form-check-label d-flex justify-content-between" for="shipping-${method.id}">
              <div>
                <strong>${method.name}</strong> ${unavailableMessage}
                <div class="text-muted small">${method.estimatedDelivery}</div>
                <div class="text-muted small">${method.description}</div>
              </div>
              <span>${formatCurrency(method.price)}</span>
            </label>
          </div>
        `;
      });
      
      shippingMethodsContainer.innerHTML = shippingMethodsHtml;
    }
    
    // Load payment methods
    const paymentMethodsContainer = document.getElementById('payment-methods');
    if (paymentMethodsContainer) {
      let paymentMethodsHtml = '';
      
      paymentMethods.forEach(method => {
        paymentMethodsHtml += `
          <div class="col-md-6 mb-3">
            <div class="payment-method-card ${method.id === 1 ? 'active' : ''}" data-payment-method="${method.id}">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <i class="fab ${method.icon} fa-2x me-3"></i>
                  <div>
                    <h6 class="mb-0">${method.name}</h6>
                    <p class="mb-0 small text-muted">${method.description}</p>
                  </div>
                </div>
                <div class="payment-method-check">
                  <i class="fas fa-check-circle"></i>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      
      paymentMethodsContainer.innerHTML = paymentMethodsHtml;
      
      // Add payment method selection handler
      const paymentMethodCards = document.querySelectorAll('.payment-method-card');
      paymentMethodCards.forEach(card => {
        card.addEventListener('click', function() {
          // Update active state
          paymentMethodCards.forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          
          // Update hidden input value
          const paymentMethodInput = document.getElementById('payment-method');
          if (paymentMethodInput) {
            paymentMethodInput.value = this.dataset.paymentMethod;
          }
          
          // Show/hide credit card form
          const creditCardForm = document.getElementById('credit-card-form');
          if (creditCardForm) {
            creditCardForm.classList.toggle('d-none', this.dataset.paymentMethod !== '1');
          }
        });
      });
    }
    
    // Update order summary
    updateOrderSummary();
    
    // Handle shipping method change
    const shippingMethodInputs = document.querySelectorAll('input[name="shippingMethod"]');
    shippingMethodInputs.forEach(input => {
      input.addEventListener('change', updateOrderSummary);
    });
    
    // Handle checkout form submission
    checkoutForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validate form
      if (!validateForm(this)) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      
      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...';
      submitButton.disabled = true;
      
      // Simulate payment processing
      setTimeout(() => {
        // Get form data
        const formData = serializeForm(this);
        
        // Create order
        if (Auth.isLoggedIn()) {
          // For logged in users, save order to account
          const shippingMethodId = parseInt(document.querySelector('input[name="shippingMethod"]:checked').value);
          const subtotal = Cart.getSubtotal();
          const shipping = calculateShippingCost(shippingMethodId, subtotal);
          const tax = calculateTax(subtotal);
          const total = subtotal + shipping + tax;
          
          // Create order object
          const order = {
            items: Cart.getItems(),
            shipping: shipping,
            tax: tax,
            total: total,
            shippingAddress: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              address2: formData.address2 || '',
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country
            },
            paymentMethod: parseInt(formData.paymentMethod),
            status: 'processing'
          };
          
          // Save order to user account
          Auth.createOrder(order).then(result => {
            if (result.success) {
              // Clear cart
              Cart.clearCart();
              
              // Save order ID to session for confirmation page
              sessionStorage.setItem('lastOrderId', result.order.id);
              
              // Redirect to confirmation page
              window.location.href = 'confirmation.html';
            } else {
              showToast('Error creating order: ' + result.error, 'error');
              submitButton.innerHTML = originalButtonText;
              submitButton.disabled = false;
            }
          });
        } else {
          // For non-logged in users, just simulate order creation
          
          // Clear cart
          Cart.clearCart();
          
          // Save dummy order ID to session for confirmation page
          const dummyOrderId = `ORD-${new Date().getFullYear()}-${(Math.floor(Math.random() * 10000)).toString().padStart(4, '0')}`;
          sessionStorage.setItem('lastOrderId', dummyOrderId);
          
          // Redirect to confirmation page
          window.location.href = 'confirmation.html';
        }
      }, 2000);
    });
  }
  
  /**
   * Update order summary on checkout page
   */
  function updateOrderSummary() {
    const cartItems = Cart.getItems();
    const subtotal = Cart.getSubtotal();
    
    // Get selected shipping method
    const selectedShippingMethod = document.querySelector('input[name="shippingMethod"]:checked');
    const shippingCost = selectedShippingMethod ? 
      calculateShippingCost(parseInt(selectedShippingMethod.value), subtotal) : 0;
    
    // Calculate tax
    const taxRate = 0.08; // 8% tax
    const tax = calculateTax(subtotal, taxRate);
    
    // Calculate total
    const total = subtotal + shippingCost + tax;
    
    // Update order summary elements
    const subtotalElement = document.getElementById('order-subtotal');
    const shippingElement = document.getElementById('order-shipping');
    const taxElement = document.getElementById('order-tax');
    const totalElement = document.getElementById('order-total');
    
    if (subtotalElement) subtotalElement.textContent = formatCurrency(subtotal);
    if (shippingElement) shippingElement.textContent = formatCurrency(shippingCost);
    if (taxElement) taxElement.textContent = formatCurrency(tax);
    if (totalElement) totalElement.textContent = formatCurrency(total);
    
    // Update order items list
    const orderItemsContainer = document.getElementById('order-items');
    if (orderItemsContainer) {
      let orderItemsHtml = '';
      
      cartItems.forEach(item => {
        orderItemsHtml += `
          <div class="d-flex justify-content-between mb-2">
            <span>${item.name} × ${item.quantity}</span>
            <span>${formatCurrency(item.price * item.quantity)}</span>
          </div>
        `;
      });
      
      orderItemsContainer.innerHTML = orderItemsHtml;
    }
  }
  
  /**
   * Initialize order confirmation page
   */
  function initializeConfirmationPage() {
    // Get order ID from session
    const orderId = sessionStorage.getItem('lastOrderId');
    
    // Redirect to home if no order ID
    if (!orderId) {
      window.location.href = 'index.html';
      return;
    }
    
    // Display order details
    const orderIdElement = document.getElementById('order-id');
    if (orderIdElement) {
      orderIdElement.textContent = orderId;
    }
    
    // Remove order ID from session storage
    sessionStorage.removeItem('lastOrderId');
  }
  
  /**
   * Initialize login page
   */
  function initializeLoginPage() {
    // Redirect to account page if already logged in
    if (Auth.isLoggedIn()) {
      window.location.href = 'account.html';
      return;
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validate form
      if (!validateForm(this)) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      
      // Get form data
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Logging in...';
      submitButton.disabled = true;
      
      // Attempt login
      Auth.login(email, password).then(result => {
        if (result.success) {
          showToast('Login successful!', 'success');
          
          // Redirect to account page or previous page
          const redirectUrl = getUrlParam('redirect') || 'account.html';
          window.location.href = redirectUrl;
        } else {
          showToast(result.error, 'error');
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
        }
      });
    });
  }
  
  /**
   * Initialize register page
   */
  function initializeRegisterPage() {
    // Redirect to account page if already logged in
    if (Auth.isLoggedIn()) {
      window.location.href = 'account.html';
      return;
    }
    
    // Handle register form submission
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validate form
      if (!validateForm(this)) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      
      // Get form data
      const formData = serializeForm(this);
      
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
      }
      
      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Creating account...';
      submitButton.disabled = true;
      
      // Attempt registration
      Auth.register(formData).then(result => {
        if (result.success) {
          showToast('Registration successful!', 'success');
          
          // Redirect to account page
          window.location.href = 'account.html';
        } else {
          showToast(result.error, 'error');
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
        }
      });
    });
  }
  
  /**
   * Initialize account page
   */
  function initializeAccountPage() {
    // Redirect to login page if not logged in
    if (!Auth.isLoggedIn()) {
      window.location.href = 'login.html?redirect=account.html';
      return;
    }
    
    // Get current user data
    const user = Auth.getCurrentUser();
    
    // Display user info
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
      userNameElement.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    // Handle profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      // Fill form with current user data
      const firstNameInput = document.getElementById('firstName');
      const lastNameInput = document.getElementById('lastName');
      const emailInput = document.getElementById('email');
      
      if (firstNameInput) firstNameInput.value = user.firstName || '';
      if (lastNameInput) lastNameInput.value = user.lastName || '';
      if (emailInput) emailInput.value = user.email || '';
      
      // Handle form submission
      profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form
        if (!validateForm(this)) {
          showToast('Please fill in all required fields', 'error');
          return;
        }
        
        // Get form data
        const formData = serializeForm(this);
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Saving...';
        submitButton.disabled = true;
        
        // Update profile
        Auth.updateProfile(formData).then(result => {
          if (result.success) {
            showToast('Profile updated successfully!', 'success');
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
          } else {
            showToast(result.error, 'error');
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
          }
        });
      });
    }
    
    // Handle address form submission
    const addressForm = document.getElementById('address-form');
    if (addressForm) {
      // Handle form submission
      addressForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form
        if (!validateForm(this)) {
          showToast('Please fill in all required fields', 'error');
          return;
        }
        
        // Get form data
        const formData = serializeForm(this);
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Saving...';
        submitButton.disabled = true;
        
        // Prepare address data
        const addressData = {
          type: formData.addressType,
          line1: formData.address,
          line2: formData.address2 || '',
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          isDefault: formData.isDefault === 'on'
        };
        
        // Update address
        Auth.updateAddress(addressData).then(result => {
          if (result.success) {
            showToast('Address saved successfully!', 'success');
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Reset form
            addressForm.reset();
            
            // Reload addresses
            loadAddresses();
          } else {
            showToast(result.error, 'error');
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
          }
        });
      });
    }
    
    // Load addresses
    loadAddresses();
  }
  
  /**
   * Load user addresses
   */
  function loadAddresses() {
    // Get current user data
    const user = Auth.getCurrentUser();
    
    // Get addresses container
    const addressesContainer = document.getElementById('addresses-container');
    if (!addressesContainer) return;
    
    // Check if user has addresses
    if (!user.addresses || user.addresses.length === 0) {
      addressesContainer.innerHTML = `
        <div class="alert alert-info">
          You don't have any saved addresses yet. Use the form below to add an address.
        </div>
      `;
      return;
    }
    
    // Generate addresses HTML
    let addressesHtml = '';
    
    user.addresses.forEach(address => {
      addressesHtml += `
        <div class="col-md-6 mb-4">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>
                <span class="badge bg-primary">${address.type}</span>
                ${address.isDefault ? '<span class="badge bg-success ms-2">Default</span>' : ''}
              </div>
              <div class="dropdown">
                <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><button class="dropdown-item edit-address" data-address-id="${address.id}">Edit</button></li>
                  <li><button class="dropdown-item delete-address text-danger" data-address-id="${address.id}">Delete</button></li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <address class="mb-0">
                ${address.line1}<br>
                ${address.line2 ? address.line2 + '<br>' : ''}
                ${address.city}, ${address.state} ${address.zip}<br>
                ${address.country}
              </address>
            </div>
          </div>
        </div>
      `;
    });
    
    addressesContainer.innerHTML = addressesHtml;
    
    // Handle edit address button
    const editAddressButtons = document.querySelectorAll('.edit-address');
    editAddressButtons.forEach(button => {
      button.addEventListener('click', function() {
        const addressId = parseInt(this.dataset.addressId);
        
        // Find address by ID
        const address = user.addresses.find(addr => addr.id === addressId);
        if (!address) return;
        
        // Fill form with address data
        const addressForm = document.getElementById('address-form');
        if (!addressForm) return;
        
        const addressTypeSelect = addressForm.querySelector('#addressType');
        const addressInput = addressForm.querySelector('#address');
        const address2Input = addressForm.querySelector('#address2');
        const cityInput = addressForm.querySelector('#city');
        const stateInput = addressForm.querySelector('#state');
        const zipInput = addressForm.querySelector('#zip');
        const countryInput = addressForm.querySelector('#country');
        const isDefaultInput = addressForm.querySelector('#isDefault');
        
        if (addressTypeSelect) addressTypeSelect.value = address.type;
        if (addressInput) addressInput.value = address.line1;
        if (address2Input) address2Input.value = address.line2 || '';
        if (cityInput) cityInput.value = address.city;
        if (stateInput) stateInput.value = address.state;
        if (zipInput) zipInput.value = address.zip;
        if (countryInput) countryInput.value = address.country;
        if (isDefaultInput) isDefaultInput.checked = address.isDefault;
        
        // Scroll to form
        addressForm.scrollIntoView({ behavior: 'smooth' });
      });
    });
    
    // Handle delete address button
    const deleteAddressButtons = document.querySelectorAll('.delete-address');
    deleteAddressButtons.forEach(button => {
      button.addEventListener('click', function() {
        const addressId = parseInt(this.dataset.addressId);
        
        // Confirm deletion
        if (confirm('Are you sure you want to delete this address?')) {
          // Delete address
          Auth.deleteAddress(addressId).then(result => {
            if (result.success) {
              showToast('Address deleted successfully', 'success');
              loadAddresses();
            } else {
              showToast(result.error, 'error');
            }
          });
        }
      });
    });
  }
  
  /**
   * Initialize orders page
   */
  function initializeOrdersPage() {
    // Redirect to login page if not logged in
    if (!Auth.isLoggedIn()) {
      window.location.href = 'login.html?redirect=orders.html';
      return;
    }
    
    // Load orders
    Auth.getOrders().then(result => {
      if (result.success) {
        // Display orders
        const ordersContainer = document.getElementById('orders-container');
        if (!ordersContainer) return;
        
        // Check if user has orders
        if (result.orders.length === 0) {
          ordersContainer.innerHTML = `
            <div class="alert alert-info">
              You don't have any orders yet. <a href="shop.html">Start shopping</a>
            </div>
          `;
          return;
        }
        
        // Generate orders HTML
        let ordersHtml = '';
        
        result.orders.forEach(order => {
          // Generate order items HTML
          let orderItemsHtml = '';
          
          order.items.forEach(item => {
            orderItemsHtml += `
              <div class="d-flex align-items-center mb-2">
                <div class="order-item-image me-3">
                  <img src="${item.image}" alt="${item.name}" width="50" height="50" class="rounded">
                </div>
                <div>
                  <div class="fw-bold">${item.name}</div>
                  <div class="small text-muted">
                    ${formatCurrency(item.price)} × ${item.quantity}
                  </div>
                </div>
              </div>
            `;
          });
          
          // Generate status badge
          let statusBadge = '';
          switch (order.status) {
            case 'delivered':
              statusBadge = '<span class="badge bg-success">Delivered</span>';
              break;
            case 'processing':
              statusBadge = '<span class="badge bg-warning text-dark">Processing</span>';
              break;
            case 'cancelled':
              statusBadge = '<span class="badge bg-danger">Cancelled</span>';
              break;
            default:
              statusBadge = `<span class="badge bg-secondary">${order.status}</span>`;
          }
          
          ordersHtml += `
            <div class="order-card mb-4">
              <div class="order-header">
                <div>
                  <div class="fw-bold">${order.id}</div>
                  <div class="small text-muted">${formatDate(order.date)}</div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="order-status me-3">
                    ${statusBadge}
                  </div>
                  <div class="fw-bold">${formatCurrency(order.total)}</div>
                </div>
              </div>
              <div class="order-products">
                ${orderItemsHtml}
              </div>
            </div>
          `;
        });
        
        ordersContainer.innerHTML = ordersHtml;
      } else {
        showToast(result.error, 'error');
      }
    });
  }

document.getElementById("mySpan").innerText = new Date().getFullYear();