/**
 * ShopEasy E-commerce Platform
 * Data for products, categories, and other content
 */

// Categories Data
const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1201&q=80",
      description: "Latest gadgets and electronic devices",
      featured: true
    },
    {
      id: 2,
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Fashion apparel for all seasons",
      featured: true
    },
    {
      id: 3,
      name: "Home & Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Everything you need for your home",
      featured: true
    },
    {
      id: 4,
      name: "Books",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Bestsellers, fiction, non-fiction and more",
      featured: true
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Gear and equipment for all sports",
      featured: false
    },
    {
      id: 6,
      name: "Beauty & Health",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      description: "Skincare, makeup, and wellness products",
      featured: false
    }
  ];
  
  // Products Data
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      description: "Experience superior sound quality with these comfortable over-ear wireless headphones. Features include active noise cancellation, 30-hour battery life, and hands-free calling capability.",
      price: 129.99,
      oldPrice: 199.99,
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80",
        "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      ],
      categoryId: 1,
      rating: 4.8,
      reviews: 128,
      stock: 15,
      featured: true,
      newArrival: false,
      bestSeller: true,
      onSale: true,
      options: {
        colors: ["Black", "White", "Blue"],
      }
    },
    {
      id: 2,
      name: "Smartphone 128GB Unlocked",
      description: "The latest smartphone with a stunning 6.4-inch AMOLED display, 128GB storage, 8GB RAM, triple camera system, and all-day battery life. Unlocked for all carriers.",
      price: 699.99,
      oldPrice: null,
      images: [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
      ],
      categoryId: 1,
      rating: 4.6,
      reviews: 256,
      stock: 32,
      featured: true,
      newArrival: true,
      bestSeller: true,
      onSale: false,
      options: {
        colors: ["Midnight Black", "Ocean Blue", "Silver"],
        storage: ["64GB", "128GB", "256GB"]
      }
    },
    {
      id: 3,
      name: "Men's Classic Fit Shirt",
      description: "A versatile button-down shirt for any occasion. Made with 100% premium cotton, featuring a comfortable classic fit, durable buttons, and available in multiple colors.",
      price: 49.99,
      oldPrice: 69.99,
      images: [
        "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
      ],
      categoryId: 2,
      rating: 4.5,
      reviews: 87,
      stock: 45,
      featured: false,
      newArrival: false,
      bestSeller: false,
      onSale: true,
      options: {
        colors: ["White", "Blue", "Black", "Navy"],
        sizes: ["S", "M", "L", "XL", "XXL"]
      }
    },
    {
      id: 4,
      name: "Women's Running Shoes",
      description: "Lightweight, breathable running shoes with responsive cushioning for optimal comfort. Features include a breathable mesh upper, supportive midsole, and durable rubber outsole.",
      price: 89.99,
      oldPrice: 119.99,
      images: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      ],
      categoryId: 2,
      rating: 4.7,
      reviews: 124,
      stock: 28,
      featured: true,
      newArrival: false,
      bestSeller: true,
      onSale: true,
      options: {
        colors: ["Black/White", "Grey/Pink", "Blue/Teal"],
        sizes: ["5", "6", "7", "8", "9", "10"]
      }
    },
    {
      id: 5,
      name: "Stainless Steel Cookware Set",
      description: "10-piece professional-grade stainless steel cookware set. Includes frying pans, saucepans, stockpot, and lids. Suitable for all stovetops including induction.",
      price: 199.99,
      oldPrice: 299.99,
      images: [
        "https://images.unsplash.com/photo-1584947897558-4e06f5064e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1588464083058-ae7c051e12a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=984&q=80",
        "https://images.unsplash.com/photo-1590794056480-6ef734e58445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
      ],
      categoryId: 3,
      rating: 4.8,
      reviews: 76,
      stock: 12,
      featured: true,
      newArrival: false,
      bestSeller: true,
      onSale: true,
      options: {}
    },
    {
      id: 6,
      name: "Smart Home Security Camera",
      description: "HD security camera with motion detection, two-way audio, night vision, and cloud storage. Monitor your home from anywhere using the smartphone app.",
      price: 79.99,
      oldPrice: null,
      images: [
        "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1580981454083-859929315e8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1613455482970-138e6d6a5777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      ],
      categoryId: 1,
      rating: 4.3,
      reviews: 52,
      stock: 20,
      featured: false,
      newArrival: true,
      bestSeller: false,
      onSale: false,
      options: {
        colors: ["White", "Black"]
      }
    },
    {
      id: 7,
      name: "Bestselling Fiction Novel",
      description: "The latest bestselling novel that's taking the world by storm. This page-turner combines suspense, romance, and unforgettable characters in an epic story.",
      price: 24.99,
      oldPrice: null,
      images: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1198&q=80",
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
      ],
      categoryId: 4,
      rating: 4.9,
      reviews: 215,
      stock: 50,
      featured: false,
      newArrival: true,
      bestSeller: true,
      onSale: false,
      options: {
        format: ["Hardcover", "Paperback", "E-Book", "Audio Book"]
      }
    },
    {
      id: 8,
      name: "Yoga Mat",
      description: "Premium exercise yoga mat with superior grip, extra cushioning, and carrying strap. Perfect for yoga, pilates, or any floor exercise.",
      price: 39.99,
      oldPrice: 49.99,
      images: [
        "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      ],
      categoryId: 5,
      rating: 4.5,
      reviews: 88,
      stock: 35,
      featured: false,
      newArrival: true,
      bestSeller: false,
      onSale: true,
      options: {
        colors: ["Purple", "Blue", "Black", "Green", "Pink"]
      }
    },
    {
      id: 9,
      name: "Natural Face Moisturizer",
      description: "Hydrating face cream made with organic ingredients. Provides all-day moisture without greasiness. Suitable for all skin types.",
      price: 34.99,
      oldPrice: null,
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1606830733744-0ad778449672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1591130901921-3f0652bb3915?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      ],
      categoryId: 6,
      rating: 4.6,
      reviews: 64,
      stock: 25,
      featured: false,
      newArrival: true,
      bestSeller: false,
      onSale: false,
      options: {
        size: ["50ml", "100ml"]
      }
    },
    {
      id: 10,
      name: "Wireless Charging Pad",
      description: "Fast wireless charger compatible with all Qi-enabled devices. Features include LED indicator, anti-slip surface, and overcharge protection.",
      price: 29.99,
      oldPrice: 39.99,
      images: [
        "https://images.unsplash.com/photo-1608057681073-9399f209e773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1621260038310-3e3657cb2818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      ],
      categoryId: 1,
      rating: 4.4,
      reviews: 102,
      stock: 40,
      featured: false,
      newArrival: true,
      bestSeller: false,
      onSale: true,
      options: {
        colors: ["Black", "White"]
      }
    },
    {
      id: 11,
      name: "Smart Watch with Heart Rate Monitor",
      description: "Track your fitness, health, and stay connected with this advanced smartwatch. Features include heart rate monitoring, GPS, activity tracking, and smartphone notifications.",
      price: 199.99,
      oldPrice: 249.99,
      images: [
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
        "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      ],
      categoryId: 1,
      rating: 4.6,
      reviews: 156,
      stock: 18,
      featured: true,
      newArrival: false,
      bestSeller: true,
      onSale: true,
      options: {
        colors: ["Black", "Silver", "Rose Gold"],
        bandMaterial: ["Silicone", "Leather", "Metal"]
      }
    },
    {
      id: 12,
      name: "Coffee Maker with Grinder",
      description: "Programmable coffee maker with built-in bean grinder. Features include customizable strength settings, keep-warm function, and auto-shutoff.",
      price: 149.99,
      oldPrice: null,
      images: [
        "https://images.unsplash.com/photo-1606739156297-d647ac225ab5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1507914997718-234e2c1ce227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1521302200778-33500795e128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      ],
      categoryId: 3,
      rating: 4.7,
      reviews: 128,
      stock: 22,
      featured: true,
      newArrival: false,
      bestSeller: false,
      onSale: false,
      options: {
        colors: ["Black", "Silver", "White"]
      }
    }
  ];
  
  // User Data - For demo purposes only
  const users = [
    {
      id: 1,
      username: "demo_user",
      email: "demo@example.com",
      password: "password123", // In a real app, this would be hashed
      firstName: "John",
      lastName: "Doe",
      addresses: [
        {
          id: 1,
          type: "billing",
          line1: "123 Main St",
          line2: "Apt 4B",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "United States",
          isDefault: true
        },
        {
          id: 2,
          type: "shipping",
          line1: "456 Park Ave",
          line2: "",
          city: "New York",
          state: "NY",
          zip: "10022",
          country: "United States",
          isDefault: true
        }
      ],
      orders: [
        {
          id: "ORD-2023-0001",
          date: "2023-03-15T10:30:00",
          status: "delivered",
          total: 179.98,
          items: [
            {
              productId: 1,
              quantity: 1,
              price: 129.99
            },
            {
              productId: 10,
              quantity: 1,
              price: 29.99
            }
          ],
          shipping: 10.00,
          tax: 10.00
        },
        {
          id: "ORD-2023-0002",
          date: "2023-04-22T14:45:00",
          status: "processing",
          total: 89.99,
          items: [
            {
              productId: 4,
              quantity: 1,
              price: 89.99
            }
          ],
          shipping: 0.00, // Free shipping
          tax: 0.00
        }
      ]
    }
  ];
  
  // Payment methods for the checkout demo
  const paymentMethods = [
    {
      id: 1,
      name: "Credit/Debit Card",
      icon: "fa-credit-card",
      description: "Pay with Visa, Mastercard, or American Express"
    },
    {
      id: 2,
      name: "PayPal",
      icon: "fa-paypal",
      description: "Fast and secure payment with PayPal"
    },
    {
      id: 3,
      name: "Apple Pay",
      icon: "fa-apple-pay",
      description: "Quick checkout with Apple Pay"
    },
    {
      id: 4,
      name: "Google Pay",
      icon: "fa-google-pay",
      description: "Simple and secure checkout with Google Pay"
    }
  ];
  
  // Shipping methods for the checkout demo
  const shippingMethods = [
    {
      id: 1,
      name: "Standard Shipping",
      price: 5.99,
      estimatedDelivery: "3-5 business days",
      description: "Regular postal service delivery"
    },
    {
      id: 2,
      name: "Express Shipping",
      price: 12.99,
      estimatedDelivery: "1-2 business days",
      description: "Expedited delivery with tracking"
    },
    {
      id: 3,
      name: "Free Shipping",
      price: 0,
      estimatedDelivery: "5-7 business days",
      description: "Free shipping on orders over $50",
      minimumOrderAmount: 50
    }
  ];