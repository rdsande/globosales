# Globosales - Quick Start Guide

## What You Have Now

✅ **Strapi CMS Backend** installed at `c:\globosales-strapi`
✅ **MySQL Database** `globosales_strapi` configured
✅ **Content Types** created: Vendor, Product, Category
✅ **Frontend Integration** ready in shop.html and product-details.html

## Step-by-Step Setup

### 1. Configure API Permissions (CRITICAL - Do This First!)

Open Strapi Admin: **http://localhost:1337/admin**

#### Enable Public Access (so shop page can load products):
1. Go to **Settings** (left sidebar)
2. Click **Users & Permissions Plugin** → **Roles**
3. Click **Public** role
4. Scroll down and expand:
   - **Product** → Check: `find` and `findOne`
   - **Category** → Check: `find` and `findOne`
   - **Vendor** → Check: `find` and `findOne`
5. Click **Save** (top right)

#### Enable Vendor Access (for future vendor dashboard):
1. Click **Authenticated** role
2. Expand:
   - **Product** → Check: `create`, `update`, `delete`, `find`, `findOne`
   - **Vendor** → Check: `find` and `findOne`
3. Click **Save**

### 2. Add Your First Products

#### Create a Vendor:
1. Go to **Content Manager** (left sidebar)
2. Click **Vendor** → **Create new entry**
3. Fill in:
   - **Name**: "Globosales Store" (or your store name)
   - **Description**: Your store description
   - **Status**: Active
   - **Email**: your email
4. Click **Save** and **Publish**

#### Create Categories (Optional but recommended):
1. Click **Category** → **Create new entry**
2. Add categories like:
   - Electronics
   - Fashion
   - Home & Garden
   - Sports & Outdoors
3. Save each one

#### Create Products:
1. Click **Product** → **Create new entry**
2. Fill in:
   - **Title**: Product name
   - **Price**: e.g., 29.99
   - **Compare Price**: e.g., 49.99 (optional, for sale badge)
   - **Description**: Product details
   - **Stock**: e.g., 100
   - **Vendor**: Select the vendor you created
   - **Categories**: Select categories
   - **Images**: Upload product images
3. Click **Save** and **Publish** (important!)
4. Repeat for more products

### 3. View Your Shop

1. Make sure XAMPP Apache is running
2. Open: **http://localhost/globosales/shop.html**
3. Products should load automatically from Strapi

## How It Works

- Frontend (`shop.html`) calls `http://localhost:1337/api/products`
- Strapi returns product data from MySQL
- JavaScript renders products into the template
- Clicking a product goes to `product-details.html?id=X`

## Admin vs Vendor Access

### You (Admin):
- Access Strapi admin panel directly
- Can add products for ANY vendor
- Full control over all content

### Vendors (Future):
- Will use custom vendor dashboard on your site
- Can only manage their own products
- Controller enforces ownership automatically

## Common Issues

**Products not showing?**
- Check API permissions are enabled (Step 1)
- Verify products are **Published** (not Draft)
- Check browser console for errors (F12)
- Verify Strapi is running on port 1337

**CORS errors?**
- Already configured for localhost
- For production, update `config/middlewares.ts`

## File Structure

```
c:\globosales-strapi\          # Strapi backend
├── src\api\
│   ├── vendor\                # Vendor content-type
│   ├── product\               # Product content-type
│   └── category\              # Category content-type
├── config\
│   ├── database.ts            # MySQL config
│   └── middlewares.ts         # CORS config
└── .env                       # Environment variables

c:\xampp\htdocs\globosales\    # Frontend
├── shop.html                  # Product listing (integrated)
├── product-details.html       # Product details (integrated)
└── assets\js\
    ├── strapi-api.js          # API service
    ├── shop.js                # Shop page logic
    └── product-details.js     # Product detail logic
```

## Next: Add Sample Data

Go to http://localhost:1337/admin and follow Step 2 above to add vendors and products!
