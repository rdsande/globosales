# Globosales UI Centralization & Agriculture Focus

## ✅ What's Been Created

### 1. Shared Header Component
**File**: `includes/header.html`
- Globosales logo (uses your uploaded logos)
- Dynamic category menu (loads from Strapi API)
- Search bar for agricultural products
- Shopping cart and wishlist icons
- Main navigation menu

### 2. Shared Footer Component
**File**: `includes/footer.html`
- Globosales branding
- Quick links
- Customer support links
- Vendor portal links
- Contact information

### 3. Component Loader
**File**: `assets/js/load-components.js`
- Automatically loads header and footer on all pages
- No need to duplicate HTML across pages

### 4. New Shop Page Template
**File**: `shop-new.html`
- Uses shared header/footer
- Dynamic categories in sidebar
- Product grid with filtering
- Fully integrated with Strapi API

## 🌾 Agriculture Categories Update

### Step 1: Update Categories in Strapi

Run this command to replace current categories with agriculture-focused ones:

```powershell
cd c:\globosales-strapi
node scripts\update-agriculture-categories.js YOUR_API_TOKEN
```

This will create 8 agriculture categories:
1. Seeds & Planting Materials
2. Fertilizers & Soil Amendments
3. Farm Tools & Equipment
4. Crop Protection & Pesticides
5. Irrigation & Water Management
6. Livestock & Animal Feed
7. Organic Farming Products
8. Post-Harvest & Storage

### Step 2: Update Existing Products

After running the script:
1. Go to http://localhost:1337/admin
2. Content Manager → Product
3. Edit each product
4. Assign appropriate agriculture category
5. Save and Publish

## 🎨 Logo Implementation

Your logos are already integrated:
- **Dark logo**: `assets/images/logo/globosaleslogo.png` (for light backgrounds)
- **Light logo**: `assets/images/logo/globosaleslogo-light.png` (for dark backgrounds)

The header automatically uses the appropriate logo based on the background.

## 📄 How to Update Existing Pages

### Option 1: Use the New Template (Recommended)

1. Test the new shop page: http://localhost/globosales/shop-new.html
2. If it works well, rename:
   - Backup: `shop.html` → `shop-old.html`
   - Activate: `shop-new.html` → `shop.html`

### Option 2: Add Components to Existing Pages

Add to any HTML page:

**In `<head>` section (before closing `</head>`):**
```html
<style>
    .logo-dark { display: block; }
    .logo-light { display: none; }
    .header-nav { background: #2d7a3e !important; }
    .btn-main { background: #2d7a3e !important; }
</style>
```

**Replace existing header with:**
```html
<div id="header-placeholder"></div>
```

**Replace existing footer with:**
```html
<div id="footer-placeholder"></div>
```

**Before closing `</body>` tag, add:**
```html
<script src="assets/js/strapi-api.js"></script>
<script src="assets/js/load-components.js"></script>
```

## 🎨 Brand Colors

The Globosales green theme is applied:
- Primary Green: `#2d7a3e`
- Dark Green: `#1e5a2b`

## 📋 Pages to Update

1. ✅ `shop-new.html` - Already created with new design
2. ⏳ `index.html` - Home page (update header/footer)
3. ⏳ `product-details.html` - Product details (update header/footer)
4. ⏳ `cart.html` - Shopping cart (update header/footer)
5. ⏳ `about.html` - About page (update header/footer)
6. ⏳ `contact.html` - Contact page (update header/footer)

## 🚀 Quick Start

1. **Update categories:**
   ```powershell
   cd c:\globosales-strapi
   node scripts\update-agriculture-categories.js YOUR_API_TOKEN
   ```

2. **Test new shop page:**
   http://localhost/globosales/shop-new.html

3. **Update products in Strapi:**
   - Assign agriculture categories
   - Update product names/descriptions for agriculture focus

4. **Verify:**
   - Categories show in header dropdown
   - Categories show in shop sidebar
   - Products display correctly

## 📞 Support

All components are in the `includes/` folder and can be customized as needed.
