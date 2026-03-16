# Globosales - Multivendor E-commerce Platform

## 🎯 Quick Start

### 1. Configure Permissions (Required!)
Go to http://localhost:1337/admin → **Settings** → **Users & Permissions** → **Roles** → **Public**

Enable:
- Product: `find`, `findOne`
- Category: `find`, `findOne`
- Vendor: `find`, `findOne`

Click **Save**

### 2. Add Sample Data

**Easy Way:**
```powershell
cd c:\globosales-strapi
node scripts\quick-sample-data.js YOUR_API_TOKEN
```

Get API token: http://localhost:1337/admin/settings/api-tokens (Create new → Full access)

**Manual Way:**
Add vendors and products through Strapi Admin: http://localhost:1337/admin

### 3. View Your Shop
http://localhost/globosales/shop.html

---

## 📁 Project Structure

- **Backend**: `c:\globosales-strapi` (Strapi CMS on port 1337)
- **Frontend**: `c:\xampp\htdocs\globosales` (HTML template)
- **Database**: MySQL `globosales_strapi`

## 🔗 Important Links

- **Shop**: http://localhost/globosales/shop.html
- **Admin Dashboard**: http://localhost/globosales/admin-dashboard.html
- **Strapi Admin**: http://localhost:1337/admin
- **API**: http://localhost:1337/api/products?populate=*

## 📚 Documentation

- `SETUP-COMPLETE.md` - Full setup guide
- `QUICK-START.md` - Quick reference
- `c:\globosales-strapi\README-SETUP.md` - Technical details

## 🚀 Daily Workflow

1. Start Strapi: `cd c:\globosales-strapi && npm run develop`
2. Start XAMPP (Apache + MySQL)
3. Access shop: http://localhost/globosales/shop.html
4. Manage content: http://localhost:1337/admin

## 🏪 Multivendor Features

- Admin can add products for ANY vendor
- Vendors (future) will manage only their products
- Product ownership enforced by API controllers
- Custom vendor dashboard (to be built)

## 💳 Payment Integration (Future)

Will be added later as requested.

## 🌐 cPanel Deployment

See `SETUP-COMPLETE.md` for deployment instructions.
