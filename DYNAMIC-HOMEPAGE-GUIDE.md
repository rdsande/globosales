# Dynamic Homepage & Site Settings Implementation

## ✅ What's Been Created

### 1. Site Settings Content-Type in Strapi
**Location**: `c:\globosales-strapi\src\api\site-setting\`

A single-type content-type that allows you to manage:
- **Site Branding**: Site name, tagline, logos (dark/light), favicon
- **Colors**: Primary, secondary, and accent colors
- **Contact Info**: Email, phone, address
- **Social Media**: Facebook, Twitter, Instagram, LinkedIn links
- **Menu Items**: Header navigation menu (customizable)
- **Hero Section**: Homepage banner text and images
- **Settings**: Products per page, show/hide featured products

### 2. Dynamic Header Component
**File**: `includes/header-dynamic.html`

Based on your improved index.html design with:
- Top bar with "Become A Seller", Help Center, My Account
- Middle header with Globosales logo and search
- Category dropdown (loads from Strapi API)
- Shopping cart and wishlist counters
- Bottom menu with navigation

### 3. Homepage Dynamic Content Loader
**File**: `assets/js/homepage.js`

Automatically loads:
- **Featured Categories**: From Strapi categories (with product counts)
- **Featured Products**: Products marked as "featured" in Strapi
- **New Arrivals**: Latest products sorted by creation date

### 4. Initialization Scripts
- `scripts/init-site-settings.js` - Initialize default site settings
- `scripts/update-agriculture-categories.js` - Already created

---

## 🚀 Setup Instructions

### Step 1: Restart Strapi to Load New Content-Type

The Site Settings content-type needs Strapi to restart:

```powershell
# Stop Strapi (Ctrl+C if running)
# Then restart:
cd c:\globosales-strapi
npm run develop
```

Wait for Strapi to rebuild and start.

### Step 2: Initialize Site Settings

```powershell
cd c:\globosales-strapi
node scripts\init-site-settings.js YOUR_API_TOKEN
```

This creates default settings with Globosales branding.

### Step 3: Configure API Permissions for Site Settings

1. Go to http://localhost:1337/admin
2. **Settings** → **Users & Permissions** → **Roles** → **Public**
3. Find **Site-setting** section
4. Enable: ✅ `find`
5. Click **Save**

### Step 4: Update Your Homepage

Replace the header section in `index.html`:

**Find this line (around line 137):**
```html
<!-- ======================= Middle Top Start ========================= -->
```

**Replace everything from there until the menu end (around line 350) with:**
```html
<div id="header-placeholder"></div>
```

**Then add before closing `</body>` tag:**
```html
<!-- Strapi API Integration -->
<script src="assets/js/strapi-api.js"></script>
<script src="assets/js/load-components.js"></script>
<script src="assets/js/homepage.js"></script>

<script>
// Load header from includes
document.addEventListener('DOMContentLoaded', async function() {
    await loadComponent('header-placeholder', 'includes/header-dynamic.html');
});
</script>
```

### Step 5: Add Dynamic Content Wrappers

In your homepage, find the feature section and add class:
```html
<div class="feature-item-wrapper">
    <!-- Categories will load here dynamically -->
</div>
```

For featured products section, add:
```html
<div class="row featured-products-wrapper">
    <!-- Featured products will load here -->
</div>
```

For new arrivals section, add:
```html
<div class="row new-arrivals-wrapper">
    <!-- New products will load here -->
</div>
```

---

## 🎨 Managing Site Settings in Strapi Admin

### Access Settings Page
http://localhost:1337/admin/content-manager/singleType/api::site-setting.site-setting

### What You Can Edit:

**1. Branding**
- Site Name: "Globosales"
- Site Tagline: "Your trusted agricultural marketplace"
- Upload Logo (Dark): For light backgrounds
- Upload Logo (Light): For dark backgrounds
- Upload Favicon

**2. Colors**
- Primary Color: `#2d7a3e` (Green)
- Secondary Color: `#f7941d` (Orange)
- Accent Color: `#1e5a2b` (Dark Green)

**3. Contact Information**
- Email: info@globosales.com
- Phone: +254 700 000 000
- Address: Nairobi, Kenya

**4. Social Media**
- Facebook URL
- Twitter URL
- Instagram URL
- LinkedIn URL

**5. Header Menu Items** (JSON)
```json
[
  { "label": "Home", "url": "index.html", "order": 1 },
  { "label": "Shop", "url": "shop.html", "order": 2 },
  { "label": "About", "url": "about.html", "order": 3 },
  { "label": "Contact", "url": "contact.html", "order": 4 }
]
```

**6. Hero Section** (JSON)
```json
{
  "title": "Quality Agricultural Products",
  "subtitle": "Connecting farmers and buyers across the region",
  "buttonText": "Shop Now",
  "buttonUrl": "shop.html",
  "backgroundImage": ""
}
```

**7. Display Settings**
- Show Featured Products: Yes/No
- Products Per Page: 20

---

## 📄 Applying to Other Pages

### For Shop Page, Product Details, etc.

**1. Replace header section with:**
```html
<div id="header-placeholder"></div>
```

**2. Replace footer section with:**
```html
<div id="footer-placeholder"></div>
```

**3. Add before closing `</body>`:**
```html
<script src="assets/js/strapi-api.js"></script>
<script src="assets/js/load-components.js"></script>

<script>
document.addEventListener('DOMContentLoaded', async function() {
    await loadComponent('header-placeholder', 'includes/header-dynamic.html');
    await loadComponent('footer-placeholder', 'includes/footer.html');
});
</script>
```

---

## 🎯 Next Steps

1. ✅ Restart Strapi to load Site Settings content-type
2. ✅ Initialize site settings with script
3. ✅ Enable API permissions for site-setting
4. ✅ Update index.html to use dynamic header
5. ✅ Test homepage with dynamic categories and products
6. ⏳ Apply same header/footer to shop.html
7. ⏳ Apply same header/footer to product-details.html
8. ⏳ Apply same header/footer to other pages

---

## 🔧 Customization

### To Change Colors Site-Wide:
1. Edit in Strapi Admin → Site Settings
2. Save
3. Frontend will automatically use new colors (requires CSS update for full effect)

### To Add/Remove Menu Items:
1. Edit `headerMenuItems` JSON in Site Settings
2. Save
3. Header will update automatically

### To Change Hero Banner:
1. Edit `heroSection` JSON in Site Settings
2. Upload background image if needed
3. Save

---

## 📋 Files Created

- `c:\globosales-strapi\src\api\site-setting\content-types\site-setting\schema.json`
- `c:\globosales-strapi\src\api\site-setting\controllers\site-setting.ts`
- `c:\globosales-strapi\src\api\site-setting\services\site-setting.ts`
- `c:\globosales-strapi\src\api\site-setting\routes\site-setting.ts`
- `c:\globosales-strapi\scripts\init-site-settings.js`
- `c:\xampp\htdocs\globosales\includes\header-dynamic.html`
- `c:\xampp\htdocs\globosales\assets\js\homepage.js`

---

Your homepage will now load categories and products dynamically from Strapi while maintaining your existing beautiful design!
