/**
 * ShopEasy E-commerce Platform
 * Authentication functionality
 */

// Auth object to manage user authentication
const Auth = (function() {
    // Key for storing user data in localStorage
    const USER_STORAGE_KEY = 'shopeasy_user';
    
    // Initialize user data
    let currentUser = getFromLocalStorage(USER_STORAGE_KEY, null);
    
    /**
     * Save user data to localStorage
     * @param {Object} userData - User data to save
     */
    function saveUser(userData) {
      // Don't store password in localStorage
      if (userData && userData.password) {
        const { password, ...userDataWithoutPassword } = userData;
        saveToLocalStorage(USER_STORAGE_KEY, userDataWithoutPassword);
        currentUser = userDataWithoutPassword;
      } else {
        saveToLocalStorage(USER_STORAGE_KEY, userData);
        currentUser = userData;
      }
      
      // Dispatch auth update event
      document.dispatchEvent(new CustomEvent('auth:updated', { 
        detail: { user: currentUser } 
      }));
    }
    
    /**
     * Check if user is logged in
     * @returns {boolean} Whether user is logged in
     */
    function isLoggedIn() {
      return currentUser !== null;
    }
    
    /**
     * Get current user data
     * @returns {Object|null} Current user data or null if not logged in
     */
    function getCurrentUser() {
      return currentUser;
    }
    
    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise} Promise resolving to registration result
     */
    function register(userData) {
      return new Promise((resolve) => {
        // Simulate API request
        setTimeout(() => {
          // Check if email is already in use
          const isEmailUsed = users.some(user => user.email === userData.email);
          
          if (isEmailUsed) {
            resolve({
              success: false,
              error: 'Email is already in use'
            });
            return;
          }
          
          // Create new user
          const newUser = {
            id: users.length + 1,
            username: userData.username,
            email: userData.email,
            password: userData.password, // In a real app, this would be hashed
            firstName: userData.firstName,
            lastName: userData.lastName,
            addresses: [],
            orders: []
          };
          
          // Add user to users array (in a real app, this would be saved to a database)
          users.push(newUser);
          
          // Log in the user
          saveUser(newUser);
          
          resolve({
            success: true,
            user: newUser
          });
        }, 1000);
      });
    }
    
    /**
     * Log in a user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Promise resolving to login result
     */
    function login(email, password) {
      return new Promise((resolve) => {
        // Simulate API request
        setTimeout(() => {
          // Find user by email
          const user = users.find(user => user.email === email);
          
          // Check if user exists and password is correct
          if (!user || user.password !== password) {
            resolve({
              success: false,
              error: 'Invalid email or password'
            });
            return;
          }
          
          // Save user data
          saveUser(user);
          
          resolve({
            success: true,
            user: user
          });
        }, 1000);
      });
    }
    
    /**
     * Log out the current user
     */
    function logout() {
      removeFromLocalStorage(USER_STORAGE_KEY);
      currentUser = null;
      
      // Dispatch auth update event
      document.dispatchEvent(new CustomEvent('auth:updated', { 
        detail: { user: null } 
      }));
    }
    
    /**
     * Update user profile
     * @param {Object} userData - Updated user data
     * @returns {Promise} Promise resolving to update result
     */
    function updateProfile(userData) {
      return new Promise((resolve) => {
        // Check if user is logged in
        if (!isLoggedIn()) {
          resolve({
            success: false,
            error: 'You must be logged in to update your profile'
          });
          return;
        }
        
        // Simulate API request
        setTimeout(() => {
          // Update user data
          const updatedUser = { ...currentUser, ...userData };
          
          // Save updated user data
          saveUser(updatedUser);
          
          // Update user in users array (in a real app, this would update a database record)
          const userIndex = users.findIndex(user => user.id === currentUser.id);
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...userData };
          }
          
          resolve({
            success: true,
            user: updatedUser
          });
        }, 1000);
      });
    }
    
    /**
     * Add or update an address
     * @param {Object} addressData - Address data
     * @returns {Promise} Promise resolving to address update result
     */
    function updateAddress(addressData) {
      return new Promise((resolve) => {
        // Check if user is logged in
        if (!isLoggedIn()) {
          resolve({
            success: false,
            error: 'You must be logged in to update addresses'
          });
          return;
        }
        
        // Simulate API request
        setTimeout(() => {
          // Clone current user data
          const updatedUser = { ...currentUser };
          
          // Initialize addresses array if it doesn't exist
          if (!updatedUser.addresses) {
            updatedUser.addresses = [];
          }
          
          // Check if address already exists
          const addressIndex = updatedUser.addresses.findIndex(addr => addr.id === addressData.id);
          
          if (addressIndex !== -1) {
            // Update existing address
            updatedUser.addresses[addressIndex] = { ...updatedUser.addresses[addressIndex], ...addressData };
          } else {
            // Add new address
            const newAddress = {
              id: updatedUser.addresses.length > 0 ? Math.max(...updatedUser.addresses.map(a => a.id)) + 1 : 1,
              ...addressData
            };
            
            updatedUser.addresses.push(newAddress);
          }
          
          // Update default address if specified
          if (addressData.isDefault) {
            // Set all other addresses of this type to non-default
            updatedUser.addresses.forEach(addr => {
              if (addr.type === addressData.type && addr.id !== addressData.id) {
                addr.isDefault = false;
              }
            });
          }
          
          // Save updated user data
          saveUser(updatedUser);
          
          // Update user in users array (in a real app, this would update a database record)
          const userIndex = users.findIndex(user => user.id === currentUser.id);
          if (userIndex !== -1) {
            users[userIndex] = updatedUser;
          }
          
          resolve({
            success: true,
            address: addressData.id ? 
              updatedUser.addresses.find(addr => addr.id === addressData.id) : 
              updatedUser.addresses[updatedUser.addresses.length - 1]
          });
        }, 1000);
      });
    }
    
    /**
     * Delete an address
     * @param {number} addressId - Address ID
     * @returns {Promise} Promise resolving to address deletion result
     */
    function deleteAddress(addressId) {
      return new Promise((resolve) => {
        // Check if user is logged in
        if (!isLoggedIn()) {
          resolve({
            success: false,
            error: 'You must be logged in to delete addresses'
          });
          return;
        }
        
        // Simulate API request
        setTimeout(() => {
          // Clone current user data
          const updatedUser = { ...currentUser };
          
          // Remove address
          updatedUser.addresses = updatedUser.addresses.filter(addr => addr.id !== addressId);
          
          // Save updated user data
          saveUser(updatedUser);
          
          // Update user in users array (in a real app, this would update a database record)
          const userIndex = users.findIndex(user => user.id === currentUser.id);
          if (userIndex !== -1) {
            users[userIndex] = updatedUser;
          }
          
          resolve({
            success: true
          });
        }, 1000);
      });
    }
    
    /**
     * Get user orders
     * @returns {Promise} Promise resolving to user orders
     */
    function getOrders() {
      return new Promise((resolve) => {
        // Check if user is logged in
        if (!isLoggedIn()) {
          resolve({
            success: false,
            error: 'You must be logged in to view orders'
          });
          return;
        }
        
        // Simulate API request
        setTimeout(() => {
          resolve({
            success: true,
            orders: currentUser.orders || []
          });
        }, 1000);
      });
    }
    
    /**
     * Create a new order
     * @param {Object} orderData - Order data
     * @returns {Promise} Promise resolving to order creation result
     */
    function createOrder(orderData) {
      return new Promise((resolve) => {
        // Check if user is logged in
        if (!isLoggedIn()) {
          resolve({
            success: false,
            error: 'You must be logged in to create an order'
          });
          return;
        }
        
        // Simulate API request
        setTimeout(() => {
          // Generate order ID
          const orderId = `ORD-${new Date().getFullYear()}-${(Math.floor(Math.random() * 10000)).toString().padStart(4, '0')}`;
          
          // Create new order
          const newOrder = {
            id: orderId,
            date: new Date().toISOString(),
            status: 'processing',
            ...orderData
          };
          
          // Clone current user data
          const updatedUser = { ...currentUser };
          
          // Initialize orders array if it doesn't exist
          if (!updatedUser.orders) {
            updatedUser.orders = [];
          }
          
          // Add new order
          updatedUser.orders.unshift(newOrder);
          
          // Save updated user data
          saveUser(updatedUser);
          
          // Update user in users array (in a real app, this would update a database record)
          const userIndex = users.findIndex(user => user.id === currentUser.id);
          if (userIndex !== -1) {
            users[userIndex] = updatedUser;
          }
          
          resolve({
            success: true,
            order: newOrder
          });
        }, 1000);
      });
    }
    
    // Update UI based on authentication state
    function updateUI() {
      const userDropdown = document.getElementById('user-dropdown');
      if (!userDropdown) return;
      
      const loginLink = userDropdown.querySelector('a[href="login.html"]');
      const registerLink = userDropdown.querySelector('a[href="register.html"]');
      const accountLink = document.getElementById('account-link');
      const ordersLink = document.getElementById('orders-link');
      const logoutButton = document.getElementById('logout-button');
      
      if (isLoggedIn()) {
        // Show account links
        if (loginLink) loginLink.classList.add('d-none');
        if (registerLink) registerLink.classList.add('d-none');
        if (accountLink) accountLink.classList.remove('d-none');
        if (ordersLink) ordersLink.classList.remove('d-none');
        if (logoutButton) logoutButton.classList.remove('d-none');
      } else {
        // Show login/register links
        if (loginLink) loginLink.classList.remove('d-none');
        if (registerLink) registerLink.classList.remove('d-none');
        if (accountLink) accountLink.classList.add('d-none');
        if (ordersLink) ordersLink.classList.add('d-none');
        if (logoutButton) logoutButton.classList.add('d-none');
      }
    }
    
    // Listen for auth:updated events
    document.addEventListener('auth:updated', function() {
      updateUI();
    });
    
    // Update UI on page load
    document.addEventListener('DOMContentLoaded', function() {
      updateUI();
      
      // Logout button handler
      delegateEvent('click', '#logout-button', function(event) {
        event.preventDefault();
        logout();
        window.location.href = 'index.html';
      });
    });
    
    // Return public API
    return {
      isLoggedIn,
      getCurrentUser,
      register,
      login,
      logout,
      updateProfile,
      updateAddress,
      deleteAddress,
      getOrders,
      createOrder
    };
  })();