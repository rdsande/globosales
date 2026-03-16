let currentPage = 1;
let totalPages = 1;

async function loadProducts(page = 1) {
  const productsContainer = document.querySelector('.list-grid-wrapper');
  const resultText = document.querySelector('.text-gray-900');
  
  if (!productsContainer) return;
  
  productsContainer.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border" role="status"></div><p class="mt-3">Loading products...</p></div>';
  
  const response = await StrapiAPI.getProducts({ page, pageSize: 20 });
  
  if (!response.data || response.data.length === 0) {
    productsContainer.innerHTML = '<div class="col-12 text-center py-5"><p>No products found. Please add products in Strapi Admin.</p></div>';
    return;
  }
  
  const products = response.data;
  const meta = response.meta?.pagination || {};
  
  currentPage = meta.page || 1;
  totalPages = meta.pageCount || 1;
  
  if (resultText) {
    const start = ((currentPage - 1) * (meta.pageSize || 20)) + 1;
    const end = Math.min(start + products.length - 1, meta.total || 0);
    resultText.textContent = `Showing ${start}-${end} of ${meta.total || 0} result`;
  }
  
  productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
  const attrs = product.attributes || product;
  const id = product.documentId || product.id;
  const title = attrs.title || product.title || 'Untitled Product';
  const price = attrs.price || 0;
  const comparePrice = attrs.comparePrice || null;
  const rating = attrs.rating || 4.8;
  const reviewCount = attrs.reviewCount || 0;
  const stock = attrs.stock || 0;
  const images = attrs.images?.data || [];
  
  // Extract vendor name from various possible structures
  let vendorName = '';
  if (attrs.vendor?.data) {
    vendorName = attrs.vendor.data.attributes?.name || attrs.vendor.data.name || '';
  } else if (attrs.vendor?.name) {
    vendorName = attrs.vendor.name;
  } else if (product.vendor?.name) {
    vendorName = product.vendor.name;
  }
  const vendor = { name: vendorName };
  
  const imageUrl = images.length > 0 ? StrapiAPI.getImageUrl(images[0].attributes) : 'assets/images/thumbs/product-two-img1.png';
  
  const soldPercentage = stock > 0 ? Math.min(((stock - (stock * 0.7)) / stock) * 100, 100) : 0;
  const sold = stock > 0 ? Math.floor(stock * 0.3) : 0;
  
  const hasSale = comparePrice && comparePrice > price;
  const salePercent = hasSale ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  
  return `
    <div class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
      <a href="product-details.html?id=${id}" class="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative">
        <img src="${imageUrl}" alt="${title}" class="w-auto max-w-unset" style="max-height: 200px;">
        ${hasSale ? `<span class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">Sale ${salePercent}%</span>` : ''}
      </a>
      <div class="product-card__content mt-16">
        ${vendor.name ? `<span class="text-xs text-gray-500 mb-8 d-block">by ${vendor.name}</span>` : ''}
        <h6 class="title text-lg fw-semibold mt-12 mb-8">
          <a href="product-details.html?id=${id}" class="link text-line-2">${title}</a>
        </h6>
        <div class="flex-align mb-20 mt-16 gap-6">
          <span class="text-xs fw-medium text-gray-500">${rating.toFixed(1)}</span>
          <span class="text-15 fw-medium text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
          <span class="text-xs fw-medium text-gray-500">(${reviewCount})</span>
        </div>
        ${stock > 0 ? `
        <div class="mt-8">
          <div class="progress w-100 bg-color-three rounded-pill h-4" role="progressbar" aria-valuenow="${soldPercentage}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-main-two-600 rounded-pill" style="width: ${soldPercentage}%"></div>
          </div>
          <span class="text-gray-900 text-xs fw-medium mt-8">Sold: ${sold}/${stock}</span>
        </div>
        ` : ''}
        <div class="product-card__price my-20">
          ${comparePrice ? `<span class="text-gray-400 text-md fw-semibold text-decoration-line-through">${StrapiAPI.formatPrice(comparePrice)}</span>` : ''}
          <span class="text-heading text-md fw-semibold">${StrapiAPI.formatPrice(price)} <span class="text-gray-500 fw-normal">/Qty</span></span>
        </div>
        <a href="cart.html?product=${id}" class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium">
          Add To Cart <i class="ph ph-shopping-cart"></i> 
        </a>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.list-grid-wrapper')) {
    loadProducts(1);
  }
});
