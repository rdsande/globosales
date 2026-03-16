async function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    console.error('No product ID provided');
    return;
  }
  
  const response = await StrapiAPI.getProduct(productId);
  
  if (!response || !response.data) {
    console.error('Product not found');
    return;
  }
  
  const product = response.data;
  const attrs = product.attributes;
  
  document.title = `${attrs.title} - Globosales`;
  
  const titleElement = document.querySelector('.product-details__title');
  if (titleElement) {
    titleElement.textContent = attrs.title;
  }
  
  const priceElement = document.querySelector('.product-details__price');
  if (priceElement) {
    let priceHTML = '';
    if (attrs.comparePrice && attrs.comparePrice > attrs.price) {
      priceHTML += `<span class="text-gray-400 text-md fw-semibold text-decoration-line-through me-8">${StrapiAPI.formatPrice(attrs.comparePrice)}</span>`;
    }
    priceHTML += `<span class="text-heading text-2xl fw-bold">${StrapiAPI.formatPrice(attrs.price)}</span>`;
    priceElement.innerHTML = priceHTML;
  }
  
  const descriptionElement = document.querySelector('.product-details__description');
  if (descriptionElement && attrs.description) {
    descriptionElement.innerHTML = attrs.description;
  }
  
  const images = attrs.images?.data || [];
  if (images.length > 0) {
    const mainImageElement = document.querySelector('.product-details__main-image');
    if (mainImageElement) {
      mainImageElement.src = StrapiAPI.getImageUrl(images[0].attributes);
    }
    
    const thumbnailsContainer = document.querySelector('.product-details__thumbnails');
    if (thumbnailsContainer) {
      thumbnailsContainer.innerHTML = images.map((img, index) => `
        <img src="${StrapiAPI.getImageUrl(img.attributes)}" 
             alt="${attrs.title}" 
             class="thumbnail ${index === 0 ? 'active' : ''}" 
             onclick="changeMainImage('${StrapiAPI.getImageUrl(img.attributes)}')"
             style="cursor: pointer; width: 80px; height: 80px; object-fit: cover; border: 2px solid ${index === 0 ? '#ff6b6b' : '#ddd'};">
      `).join('');
    }
  }
  
  const stockElement = document.querySelector('.product-details__stock');
  if (stockElement) {
    stockElement.textContent = attrs.stock > 0 ? `In Stock (${attrs.stock} available)` : 'Out of Stock';
    stockElement.className = attrs.stock > 0 ? 'text-success' : 'text-danger';
  }
  
  const vendorElement = document.querySelector('.product-details__vendor');
  if (vendorElement && attrs.vendor?.data) {
    vendorElement.textContent = `Sold by: ${attrs.vendor.data.attributes.name}`;
  }
  
  const ratingElement = document.querySelector('.product-details__rating');
  if (ratingElement && attrs.rating) {
    ratingElement.innerHTML = `
      <span class="text-warning-600">${'★'.repeat(Math.floor(attrs.rating))}${'☆'.repeat(5 - Math.floor(attrs.rating))}</span>
      <span class="text-gray-500">(${attrs.reviewCount || 0} reviews)</span>
    `;
  }
}

function changeMainImage(imageUrl) {
  const mainImageElement = document.querySelector('.product-details__main-image');
  if (mainImageElement) {
    mainImageElement.src = imageUrl;
  }
  
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.style.border = '2px solid #ddd';
  });
  event.target.style.border = '2px solid #ff6b6b';
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('product-details')) {
    loadProductDetails();
  }
});
