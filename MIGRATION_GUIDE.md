# GloboSales Migration Guide

This guide will help you replicate the entire GloboSales setup (Strapi backend + Frontend) on another machine.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- XAMPP or similar web server for frontend
- Git (optional)

## Part 1: Strapi Backend Setup

### 1. Install Strapi (if not already installed)

```bash
npx create-strapi-app@latest globosales-backend --quickstart
cd globosales-backend
```

### 2. Create Content Types

Navigate to Strapi Admin Panel: `http://localhost:1337/admin`

#### A. Product Content Type

**Collection Type: `product`**

Fields:
- `title` (Text, Required)
- `slug` (UID, Required, Target field: title)
- `description` (Rich Text)
- `price` (Decimal, Required)
- `comparePrice` (Decimal)
- `sku` (Text, Unique)
- `stock` (Integer, Default: 0)
- `featured` (Boolean, Default: false)
- `images` (Media, Multiple files)
- `category` (Relation: Many-to-One with Category)
- `vendor` (Relation: Many-to-One with Vendor)
- `rating` (Decimal, Min: 0, Max: 5)
- `reviewCount` (Integer, Default: 0)

#### B. Category Content Type

**Collection Type: `category`**

Fields:
- `name` (Text, Required)
- `slug` (UID, Required, Target field: name)
- `description` (Text)
- `image` (Media, Single file)
- `icon` (Text) - For icon class names
- `products` (Relation: One-to-Many with Product)
- `featured` (Boolean, Default: false)

#### C. Vendor Content Type

**Collection Type: `vendor`**

Fields:
- `name` (Text, Required)
- `slug` (UID, Required, Target field: name)
- `description` (Text)
- `logo` (Media, Single file)
- `email` (Email)
- `phone` (Text)
- `products` (Relation: One-to-Many with Product)

### 3. Configure Permissions

Go to: **Settings → Users & Permissions Plugin → Roles → Public**

Enable the following permissions:
- **Product**: `find`, `findOne`
- **Category**: `find`, `findOne`
- **Vendor**: `find`, `findOne`

### 4. Add Demo Data

Use the Strapi Admin Panel to create sample data:

**Categories (8 items):**
1. Electronics
2. Fashion
3. Home & Garden
4. Sports
5. Books
6. Toys
7. Food & Beverages
8. Health & Beauty

**Vendors (3-5 items):**
1. TechStore
2. FashionHub
3. HomeGoods
4. etc.

**Products (5+ items):**
Example:
- Samsung Galaxy S24
  - Price: $899.99
  - Compare Price: $1099.99
  - Category: Electronics
  - Stock: 50
  - Featured: true
  - Add product images

## Part 2: Frontend Setup

### 1. Copy Frontend Files

Copy the entire `globosales` folder to your new machine's web server directory:
- Windows XAMPP: `C:\xampp\htdocs\globosales`
- Mac XAMPP: `/Applications/XAMPP/htdocs/globosales`
- Linux: `/var/www/html/globosales`

### 2. Key Files Modified

The following files have been created/modified for dynamic functionality:

**New Files:**
- `assets/css/banner-bg-slider.css` - Banner background slider styles
- `assets/css/modern-footer.css` - Modern footer styles
- `assets/js/strapi-api.js` - Strapi API integration
- `assets/js/homepage.js` - Homepage dynamic content loading
- `assets/js/product-details.js` - Product details page logic
- `assets/js/init-dynamic-header.js` - Dynamic header loader
- `includes/header-dynamic.html` - Dynamic header template

**Modified Files:**
- `index.html` - Dynamic header, modern footer, banner slider
- `product-details.html` - Dynamic header, modern footer, dynamic product loading

### 3. Update API Configuration

Edit `assets/js/strapi-api.js` and update the Strapi URL if needed:

```javascript
const STRAPI_URL = 'http://localhost:1337'; // Change if Strapi is on different host/port
```

### 4. Start Services

**Backend:**
```bash
cd globosales-backend
npm run develop
```
Access: `http://localhost:1337/admin`

**Frontend:**
Start XAMPP and access: `http://localhost/globosales/index.html`

## Part 3: Export/Import Data (Alternative Method)

### Export from Current Machine

Create a file `export-data.js` in your Strapi project root:

```javascript
// See EXPORT_SCRIPT.md for the complete export script
```

Run:
```bash
node export-data.js
```

This creates `strapi-export.json` with all your data.

### Import on New Machine

Create a file `import-data.js` in your Strapi project root:

```javascript
// See IMPORT_SCRIPT.md for the complete import script
```

Run:
```bash
node import-data.js
```

## Verification Checklist

- [ ] Strapi backend running on `http://localhost:1337`
- [ ] Can access Strapi admin panel
- [ ] All content types created (Product, Category, Vendor)
- [ ] Public permissions configured
- [ ] Demo data added (categories, vendors, products)
- [ ] Frontend accessible via web server
- [ ] Homepage loads categories and products dynamically
- [ ] Product details page loads individual products
- [ ] Dynamic header shows categories
- [ ] Search autocomplete works
- [ ] Modern footer displays correctly

## Troubleshooting

**Issue: Products not loading**
- Check browser console for errors
- Verify Strapi is running on port 1337
- Check CORS settings in Strapi
- Verify public permissions are enabled

**Issue: Images not showing**
- Check image URLs in Strapi media library
- Verify `STRAPI_URL` in `strapi-api.js`
- Check browser network tab for 404 errors

**Issue: Duplicate headers**
- Clear browser cache
- Check `init-dynamic-header.js` is loaded
- Verify `header-placeholder` div exists

## Support

For issues, check:
1. Browser console (F12)
2. Strapi logs in terminal
3. Network tab in DevTools
4. Strapi documentation: https://docs.strapi.io

---

**Last Updated:** March 2026
**Strapi Version:** 5.x
**Frontend:** HTML/CSS/JavaScript (Vanilla)
