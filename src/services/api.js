const API_BASE_URL = 'http://localhost/api';

export default {
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async getProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async addProduct(product) {
    const response = await fetch(`${API_BASE_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      // Base error message if not given output
      let errorMessage = 'An error occurred while adding the product.';
      
      // Check if errorData.errors is present
      if (errorData.errors) {
          // Flatten messages if it's an object of arrays
          const messages = Object.values(errorData.errors).flat();
          errorMessage = messages.join('\n'); // Join messages into a string divided buy \n
      }

      throw new Error(errorMessage);
    }
  
    return await response.json();

  },

  async updateProduct(id, product) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      // Base error message if not given output
      let errorMessage = 'An error occurred while updating the product.';
      
      // Check if errorData.errors is present
      if (errorData.errors) {
          // Flatten messages if it's an object of arrays
          const messages = Object.values(errorData.errors).flat();
          errorMessage = messages.join('\n'); // Join messages into a string divided buy \n
      }

      throw new Error(errorMessage);
    }
  
    return await response.json();
    
  },

  async deleteProduct(id) {
    await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
