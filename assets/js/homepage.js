// Homepage Dynamic Content Loader

// Load featured categories
async function loadFeaturedCategories() {
    try {
        const categories = await StrapiAPI.getCategories({
            'filters[featured][$eq]': true
        });
        const featureWrapper = document.querySelector('.feature-item-wrapper');
        
        if (!featureWrapper) {
            console.log('Feature wrapper not found');
            return;
        }
        
        if (!categories.data || categories.data.length === 0) {
            console.log('No featured categories found');
            featureWrapper.innerHTML = '<p class="text-center text-gray-500">No featured categories available</p>';
            return;
        }
        
        console.log('Loading featured categories:', categories.data.length);
        
        // Use all featured categories (up to 10)
        const featuredCats = categories.data.slice(0, 10);
        
        featureWrapper.innerHTML = featuredCats.map(cat => {
            const attrs = cat.attributes || cat;
            const name = attrs.name || cat.name;
            const slug = attrs.slug || cat.slug;
            const image = attrs.image?.data?.attributes;
            const imageUrl = image ? StrapiAPI.getImageUrl(image) : 'assets/images/thumbs/feature-img1.png';
            
            return `
                <div class="feature-item text-center">
                    <div class="feature-item__thumb rounded-circle">
                        <a href="shop.html?category=${slug}" class="w-100 h-100 flex-center">
                            <img src="${imageUrl}" alt="${name}">
                        </a>
                    </div>
                    <div class="feature-item__content mt-16">
                        <h6 class="text-lg mb-8"><a href="shop.html?category=${slug}" class="text-inherit">${name}</a></h6>
                        <span class="text-sm text-gray-400" id="cat-count-${slug}">Loading...</span>
                    </div>
                </div>
            `;
        }).join('');
        
        // Load product counts for each category
        featuredCats.forEach(async (cat) => {
            const slug = cat.attributes?.slug || cat.slug;
            const products = await StrapiAPI.getProducts({ 
                'filters[categories][slug][$eq]': slug,
                pageSize: 1
            });
            const count = products.meta?.pagination?.total || 0;
            const countElement = document.getElementById(`cat-count-${slug}`);
            if (countElement) {
                countElement.textContent = `${count} Product${count !== 1 ? 's' : ''}`;
            }
        });
        
        // Initialize slick slider
        if (typeof $.fn.slick !== 'undefined') {
            const $wrapper = $('.feature-item-wrapper');
            
            // Destroy existing slider if it exists
            if ($wrapper.hasClass('slick-initialized')) {
                $wrapper.slick('unslick');
            }
            
            // Initialize new slider
            $wrapper.slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                speed: 1500,
                dots: false,
                pauseOnHover: true,
                arrows: true,
                prevArrow: '#feature-item-wrapper-prev',
                nextArrow: '#feature-item-wrapper-next',
                responsive: [
                    { breakpoint: 1599, settings: { slidesToShow: 5 } },
                    { breakpoint: 1399, settings: { slidesToShow: 4 } },
                    { breakpoint: 992, settings: { slidesToShow: 3 } },
                    { breakpoint: 575, settings: { slidesToShow: 2 } }
                ]
            });
            
            console.log('Slick carousel initialized with', featuredCats.length, 'categories');
        } else {
            console.error('Slick slider library not found');
        }
    } catch (error) {
        console.error('Error loading featured categories:', error);
    }
}

// Load featured products
async function loadFeaturedProducts() {
    try {
        const response = await StrapiAPI.getProducts({ 
            'filters[featured][$eq]': true,
            pageSize: 8
        });
        
        const productsWrapper = document.querySelector('.featured-products-wrapper');
        if (!productsWrapper || !response.data || response.data.length === 0) return;
        
        productsWrapper.innerHTML = response.data.map(product => {
            const attrs = product.attributes || product;
            const id = product.documentId || product.id;
            const title = attrs.title || product.title || 'Untitled';
            const price = attrs.price || product.price || 0;
            const comparePrice = attrs.comparePrice || product.comparePrice;
            const rating = attrs.rating || product.rating || 4.5;
            const reviewCount = attrs.reviewCount || product.reviewCount || 0;
            const images = attrs.images?.data || [];
            const imageUrl = images.length > 0 ? StrapiAPI.getImageUrl(images[0].attributes) : 'assets/images/thumbs/product-img1.png';
            
            const hasSale = comparePrice && comparePrice > price;
            const salePercent = hasSale ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
            
            return `
                <div class="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <a href="product-details.html?id=${id}" class="product-card__thumb flex-center">
                        <img src="${imageUrl}" alt="${title}">
                    </a>
                    ${hasSale ? `<span class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">Sale ${salePercent}%</span>` : ''}
                    <div class="product-card__content p-sm-2">
                        <h6 class="title text-lg fw-semibold mt-12 mb-8">
                            <a href="product-details.html?id=${id}" class="link text-line-2">${title}</a>
                        </h6>
                        <div class="flex-align gap-4">
                            <span class="text-main-600 text-md d-flex"><i class="ph-fill ph-storefront"></i></span>
                            <span class="text-gray-500 text-xs">In Stock</span>
                        </div>
                        <div class="product-card__content mt-12">
                            <div class="product-card__price mb-8">
                                ${comparePrice ? `<span class="text-gray-400 text-md fw-semibold text-decoration-line-through">${StrapiAPI.formatPrice(comparePrice)}</span>` : ''}
                                <span class="text-heading text-md fw-semibold">${StrapiAPI.formatPrice(price)}</span>
                            </div>
                            <div class="flex-align gap-6">
                                <span class="text-xs fw-bold text-gray-600">${rating.toFixed(1)}</span>
                                <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                <span class="text-xs fw-bold text-gray-600">(${reviewCount})</span>
                            </div>
                            <a href="cart.html?product=${id}" class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center">
                                Add To Cart <i class="ph ph-shopping-cart"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading featured products:', error);
    }
}

// Load new arrival products
async function loadNewArrivals() {
    try {
        const response = await StrapiAPI.getProducts({ 
            'sort': 'createdAt:desc',
            pageSize: 8
        });
        
        const productsWrapper = document.querySelector('.new-arrivals-wrapper');
        if (!productsWrapper || !response.data || response.data.length === 0) return;
        
        productsWrapper.innerHTML = response.data.map(product => {
            const attrs = product.attributes || product;
            const id = product.documentId || product.id;
            const title = attrs.title || product.title || 'Untitled';
            const price = attrs.price || product.price || 0;
            const comparePrice = attrs.comparePrice || product.comparePrice;
            const images = attrs.images?.data || [];
            const imageUrl = images.length > 0 ? StrapiAPI.getImageUrl(images[0].attributes) : 'assets/images/thumbs/product-img1.png';
            
            const hasSale = comparePrice && comparePrice > price;
            const salePercent = hasSale ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
            
            return `
                <div class="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                    <div class="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                        <a href="product-details.html?id=${id}" class="product-card__thumb flex-center">
                            <img src="${imageUrl}" alt="${title}">
                        </a>
                        ${hasSale ? `<span class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">-${salePercent}%</span>` : ''}
                        <div class="product-card__content mt-12">
                            <h6 class="title text-lg fw-semibold my-8">
                                <a href="product-details.html?id=${id}" class="link text-line-2">${title}</a>
                            </h6>
                            <div class="flex-align gap-4">
                                <span class="text-main-600 text-md d-flex"><i class="ph-fill ph-storefront"></i></span>
                                <span class="text-gray-500 text-xs">In Stock</span>
                            </div>
                            <div class="product-card__price my-20">
                                ${comparePrice ? `<span class="text-gray-400 text-md fw-semibold text-decoration-line-through">${StrapiAPI.formatPrice(comparePrice)}</span>` : ''}
                                <span class="text-heading text-md fw-semibold">${StrapiAPI.formatPrice(price)}</span>
                            </div>
                            <a href="cart.html?product=${id}" class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 w-100 justify-content-center">
                                Add To Cart <i class="ph ph-shopping-cart"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading new arrivals:', error);
    }
}

// Helper function to render product card HTML
function renderProductCard(product) {
    const attrs = product.attributes || product;
    const id = product.documentId || product.id;
    const title = attrs.title || product.title || 'Untitled';
    const price = attrs.price || product.price || 0;
    const comparePrice = attrs.comparePrice || product.comparePrice;
    const rating = attrs.rating || product.rating || 4.5;
    const reviewCount = attrs.reviewCount || product.reviewCount || 0;
    const images = attrs.images?.data || [];
    const imageUrl = images.length > 0 ? StrapiAPI.getImageUrl(images[0].attributes) : 'assets/images/thumbs/product-img1.png';
    
    const vendor = attrs.vendor?.data?.attributes || attrs.vendor;
    const vendorName = vendor?.name || 'Globosales';
    
    const hasSale = comparePrice && comparePrice > price;
    const salePercent = hasSale ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
    
    let badge = '';
    if (hasSale && salePercent >= 50) {
        badge = `<span class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">Sale ${salePercent}%</span>`;
    } else if (attrs.featured) {
        badge = `<span class="product-card__badge bg-info-600 px-8 py-4 text-sm text-white">Best Sale</span>`;
    } else if (attrs.isNew) {
        badge = `<span class="product-card__badge bg-warning-600 px-8 py-4 text-sm text-white">New</span>`;
    }
    
    return `
        <div class="col-xxl-2 col-lg-3 col-sm-4 col-6">
            <div class="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                ${badge}
                <a href="product-details.html?id=${id}" class="product-card__thumb flex-center">
                    <img src="${imageUrl}" alt="${title}">
                </a>
                <div class="product-card__content p-sm-2">
                    <h6 class="title text-lg fw-semibold mt-12 mb-8">
                        <a href="product-details.html?id=${id}" class="link text-line-2">${title}</a>
                    </h6>   
                    <div class="flex-align gap-4">
                        <span class="text-main-600 text-md d-flex"><i class="ph-fill ph-storefront"></i></span>
                        <span class="text-gray-500 text-xs">By ${vendorName}</span>
                    </div>
                    <div class="product-card__content mt-12">
                        <div class="product-card__price mb-8">
                            <span class="text-heading text-md fw-semibold">${StrapiAPI.formatPrice(price)} <span class="text-gray-500 fw-normal">/Qty</span></span>
                            ${comparePrice ? `<span class="text-gray-400 text-md fw-semibold text-decoration-line-through">${StrapiAPI.formatPrice(comparePrice)}</span>` : ''}
                        </div>
                        <div class="flex-align gap-6">
                            <span class="text-xs fw-bold text-gray-600">${rating.toFixed(1)}</span>
                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                            <span class="text-xs fw-bold text-gray-600">(${reviewCount})</span>
                        </div>
                        <a href="cart.html?product=${id}" class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center">
                            Add To Cart <i class="ph ph-shopping-cart"></i> 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load featured category tabs
async function loadFeaturedCategoryTabs() {
    try {
        const categories = await StrapiAPI.getCategories({
            'filters[featured][$eq]': true
        });
        
        const tabsList = document.getElementById('pills-tab');
        const tabContent = document.getElementById('pills-tabContent');
        
        if (!tabsList || !tabContent || !categories.data || categories.data.length === 0) return;
        
        // Create "All" tab + featured category tabs
        const tabs = [
            { name: 'All', slug: 'all', isAll: true }
        ].concat(categories.data.map(cat => ({
            name: cat.attributes?.name || cat.name,
            slug: cat.attributes?.slug || cat.slug,
            isAll: false
        })));
        
        // Generate tab buttons
        tabsList.innerHTML = tabs.map((tab, index) => `
            <li class="nav-item" role="presentation">
                <button class="nav-link ${index === 0 ? 'active' : ''}" 
                        id="pills-${tab.slug}-tab" 
                        data-bs-toggle="pill" 
                        data-bs-target="#pills-${tab.slug}" 
                        type="button" 
                        role="tab" 
                        aria-controls="pills-${tab.slug}" 
                        aria-selected="${index === 0 ? 'true' : 'false'}"
                        data-category-slug="${tab.slug}">
                    ${tab.name}
                </button>
            </li>
        `).join('');
        
        // Generate tab content panes
        tabContent.innerHTML = tabs.map((tab, index) => `
            <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" 
                 id="pills-${tab.slug}" 
                 role="tabpanel" 
                 aria-labelledby="pills-${tab.slug}-tab" 
                 tabindex="0">
                <div class="row g-12" id="recommended-products-${tab.slug}">
                    <div class="col-12 text-center py-5">
                        <div class="spinner-border text-main-600" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Load products for "All" tab initially
        await loadProductsByCategory('all');
        
        // Add event listeners to tabs
        tabs.forEach(tab => {
            const tabButton = document.getElementById(`pills-${tab.slug}-tab`);
            if (tabButton) {
                tabButton.addEventListener('shown.bs.tab', async function() {
                    await loadProductsByCategory(tab.slug);
                });
            }
        });
        
    } catch (error) {
        console.error('Error loading featured category tabs:', error);
    }
}

// Load products by category
async function loadProductsByCategory(categorySlug) {
    try {
        const container = document.getElementById(`recommended-products-${categorySlug}`);
        if (!container) return;
        
        // Show loading state
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-main-600" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        
        // Fetch products
        const filters = categorySlug === 'all' 
            ? { pageSize: 12 }
            : { 
                'filters[categories][slug][$eq]': categorySlug,
                pageSize: 12
            };
        
        const response = await StrapiAPI.getProducts(filters);
        
        if (!response.data || response.data.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-gray-500">No products found in this category.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = response.data.map(product => renderProductCard(product)).join('');
        
    } catch (error) {
        console.error(`Error loading products for category ${categorySlug}:`, error);
        const container = document.getElementById(`recommended-products-${categorySlug}`);
        if (container) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-danger">Error loading products. Please try again.</p>
                </div>
            `;
        }
    }
}

// Load recommended products (legacy - kept for backward compatibility)
async function loadRecommendedProducts() {
    await loadProductsByCategory('all');
}

// Initialize homepage
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/globosales/')) {
        loadFeaturedCategories();
        
        // Load featured products if section exists
        if (document.querySelector('.featured-products-wrapper')) {
            loadFeaturedProducts();
        }
        
        // Load new arrivals if section exists
        if (document.querySelector('.new-arrivals-wrapper')) {
            loadNewArrivals();
        }
        
        // Load featured category tabs and recommended products
        if (document.getElementById('pills-tab') && document.getElementById('pills-tabContent')) {
            loadFeaturedCategoryTabs();
        }
    }
});
