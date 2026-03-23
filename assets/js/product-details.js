async function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  console.log('[Product Details] Loading product with ID:', productId);
  
  if (!productId) {
    console.error('[Product Details] No product ID provided');
    return;
  }
  
  try {
    const response = await StrapiAPI.getProduct(productId);
    
    console.log('[Product Details] Full response:', response);
    console.log('[Product Details] Response.data:', response?.data);
    
    if (!response || !response.data) {
      console.error('[Product Details] Product not found - response:', response);
      return;
    }
    
    // Strapi v5 returns flat structure without attributes wrapper
    const product = response.data;
    console.log('[Product Details] Product object:', product);
    
    console.log('[Product Details] Product loaded:', product.title);
    
    document.title = `${product.title} - Globosales`;
    
    // Update title - looking for h5 in product-details__content
    const titleElement = document.querySelector('.product-details__content h5');
    if (titleElement) {
      titleElement.textContent = product.title;
      console.log('[Product Details] Title updated');
    } else {
      console.warn('[Product Details] Title element not found');
    }
    
    // Update price - looking for h4 in the price section
    const priceContainer = document.querySelector('.product-details__content .flex-align.gap-8');
    if (priceContainer) {
      const h4 = priceContainer.querySelector('h4');
      if (h4) {
        h4.textContent = StrapiAPI.formatPrice(product.price);
      }
      const compareSpan = priceContainer.querySelector('.text-gray-500');
      if (compareSpan && product.comparePrice && product.comparePrice > product.price) {
        compareSpan.textContent = StrapiAPI.formatPrice(product.comparePrice);
      } else if (compareSpan) {
        compareSpan.style.display = 'none';
      }
      console.log('[Product Details] Price updated');
    }
    
    // Update description - looking for p tag after title
    const descriptionElement = document.querySelector('.product-details__content p.text-gray-700');
    if (descriptionElement && product.description) {
      descriptionElement.textContent = product.description;
      console.log('[Product Details] Description updated');
    }
    
    // Update main image
    const images = product.images || [];
    if (images.length > 0) {
      const mainImageElement = document.querySelector('.product-details__thumb img');
      if (mainImageElement) {
        mainImageElement.src = StrapiAPI.getImageUrl(images[0]);
        mainImageElement.alt = product.title;
        console.log('[Product Details] Main image updated');
      }
      
      // Update thumbnails if container exists
      const thumbnailsContainer = document.querySelector('.product-details__images');
      if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = images.map((img, index) => `
          <div class="max-w-120 max-h-120 h-120 flex-center border border-gray-100 rounded-16 p-8">
            <img src="${StrapiAPI.getImageUrl(img)}" 
                 alt="${product.title}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}" 
                 onclick="changeMainImage('${StrapiAPI.getImageUrl(img)}')"
                 style="cursor: pointer; max-width: 100%; max-height: 100%; object-fit: contain;">
          </div>
        `).join('');
        console.log('[Product Details] Thumbnails updated');
      }
    }
    
    // Update breadcrumb
    const breadcrumbProduct = document.querySelector('.breadcrumb li:last-child');
    if (breadcrumbProduct) {
      breadcrumbProduct.textContent = product.title;
    }
    
    console.log('[Product Details] All updates complete');
    
  } catch (error) {
    console.error('[Product Details] Error loading product:', error);
  }
}

function changeMainImage(imageUrl) {
  const mainImageElement = document.querySelector('.product-details__thumb img');
  if (mainImageElement) {
    mainImageElement.src = imageUrl;
  }
  
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.style.opacity = '0.6';
  });
  if (event && event.target) {
    event.target.style.opacity = '1';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('product-details')) {
    loadProductDetails();
  }
});
