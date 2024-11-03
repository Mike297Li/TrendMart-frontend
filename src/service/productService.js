// services/productService.js

export async function getProductById(productId) {
    try {
      const response = await fetch(`http://localhost:8080/api/products/1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching product');
      }
  
      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
  