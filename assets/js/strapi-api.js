const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_URL = `${STRAPI_URL}/api`;

const StrapiAPI = {
  async getProducts(params = {}) {
    const { page = 1, pageSize = 20, ...otherParams } = params;
    const queryParams = new URLSearchParams({
      'populate': '*',
      'pagination[pageSize]': pageSize,
      'pagination[page]': page,
      ...otherParams
    });
    
    try {
      const response = await fetch(`${STRAPI_API_URL}/products?${queryParams}`);
      const data = await response.json();
      console.log('Products API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return { data: [], meta: {} };
    }
  },

  async getProduct(id) {
    try {
      const response = await fetch(`${STRAPI_API_URL}/products/${id}?populate=*`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  async getProductBySlug(slug) {
    try {
      const response = await fetch(`${STRAPI_API_URL}/products?filters[slug][$eq]=${slug}&populate=*`);
      const data = await response.json();
      return data.data && data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }
  },

  async getCategories(params = {}) {
    const queryParams = new URLSearchParams({
      'populate': '*',
      ...params
    });
    
    try {
      const response = await fetch(`${STRAPI_API_URL}/categories?${queryParams}`);
      const data = await response.json();
      console.log('Categories API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { data: [] };
    }
  },

  async getVendors() {
    try {
      const response = await fetch(`${STRAPI_API_URL}/vendors?populate=*`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching vendors:', error);
      return { data: [] };
    }
  },

  getImageUrl(image) {
    if (!image) return 'assets/images/thumbs/product-two-img1.png';
    
    if (image.url) {
      return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
    }
    
    return 'assets/images/thumbs/product-two-img1.png';
  },

  formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
  }
};
