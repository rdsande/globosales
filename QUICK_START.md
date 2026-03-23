# GloboSales Quick Start Guide

This is a condensed guide to get GloboSales running on a new machine quickly.

## Step 1: Export Data from Current Machine

1. **Navigate to your current Strapi backend directory**
2. **Run the export script:**
   ```bash
   node EXPORT_SCRIPT.js
   ```
3. **This creates `strapi-export.json`** - Copy this file to your new machine

## Step 2: Set Up New Machine

### A. Install Prerequisites
- Node.js v18+ ([Download](https://nodejs.org))
- XAMPP ([Download](https://www.apachefriends.org))

### B. Set Up Strapi Backend

```bash
# Create new Strapi project
npx create-strapi-app@latest globosales-backend --quickstart

# Navigate to project
cd globosales-backend

# Start Strapi
npm run develop
```

Access admin panel: `http://localhost:1337/admin`
- Create admin account when prompted

### C. Create Content Types

In Strapi Admin Panel, create these content types:

**1. Category** (Collection Type)
- name (Text, Required)
- slug (UID, Required, target: name)
- description (Text)
- image (Media, Single)
- icon (Text)
- featured (Boolean, default: false)

**2. Vendor** (Collection Type)
- name (Text, Required)
- slug (UID, Required, target: name)
- description (Text)
- logo (Media, Single)
- email (Email)
- phone (Text)

**3. Product** (Collection Type)
- title (Text, Required)
- slug (UID, Required, target: title)
- description (Rich Text)
- price (Decimal, Required)
- comparePrice (Decimal)
- sku (Text, Unique)
- stock (Integer, default: 0)
- featured (Boolean, default: false)
- images (Media, Multiple)
- category (Relation: Many-to-One with Category)
- vendor (Relation: Many-to-One with Vendor)
- rating (Decimal, min: 0, max: 5)
- reviewCount (Integer, default: 0)

### D. Configure Permissions

Settings → Users & Permissions → Roles → Public

Enable for each content type:
- ✅ find
- ✅ findOne

**Save**

### E. Import Data

1. **Get API Token:**
   - Settings → API Tokens → Create new API Token
   - Name: "Import Script"
   - Token type: Full access
   - Copy the token

2. **Update IMPORT_SCRIPT.js:**
   ```javascript
   const API_TOKEN = 'paste_your_token_here';
   ```

3. **Place files in Strapi root:**
   - `IMPORT_SCRIPT.js`
   - `strapi-export.json`

4. **Run import:**
   ```bash
   node IMPORT_SCRIPT.js
   ```

### F. Set Up Frontend

1. **Copy the `globosales` folder to:**
   - Windows: `C:\xampp\htdocs\globosales`
   - Mac: `/Applications/XAMPP/htdocs/globosales`
   - Linux: `/var/www/html/globosales`

2. **Start XAMPP:**
   - Start Apache server

3. **Access frontend:**
   - Open browser: `http://localhost/globosales/index.html`

## Step 3: Verify Everything Works

### Backend Checklist
- [ ] Strapi running at `http://localhost:1337`
- [ ] Can login to admin panel
- [ ] All 3 content types created
- [ ] Public permissions enabled
- [ ] Data imported successfully

### Frontend Checklist
- [ ] Homepage loads at `http://localhost/globosales/index.html`
- [ ] Categories appear in header dropdown
- [ ] Products display on homepage
- [ ] Search autocomplete works
- [ ] Clicking a product opens details page with correct data
- [ ] Footer displays correctly

## Troubleshooting

**Strapi won't start:**
```bash
# Clear cache and rebuild
npm run build
npm run develop
```

**Products not loading:**
- Check browser console (F12)
- Verify Strapi is running
- Check public permissions are enabled

**Import fails:**
- Verify API token is correct
- Ensure content types are created first
- Check console for specific errors

**Images not showing:**
- Upload images manually in Strapi admin
- Or update image URLs in imported data

## File Structure

```
globosales/
├── assets/
│   ├── css/
│   │   ├── banner-bg-slider.css (NEW)
│   │   ├── modern-footer.css (NEW)
│   │   └── main.css (MODIFIED)
│   └── js/
│       ├── strapi-api.js (NEW)
│       ├── homepage.js (NEW)
│       ├── product-details.js (NEW)
│       ├── init-dynamic-header.js (NEW)
│       └── main.js (MODIFIED)
├── includes/
│   └── header-dynamic.html (NEW)
├── index.html (MODIFIED)
├── product-details.html (MODIFIED)
├── MIGRATION_GUIDE.md (Documentation)
├── EXPORT_SCRIPT.js (Export tool)
├── IMPORT_SCRIPT.js (Import tool)
└── CONTENT_TYPES_SCHEMA.json (Schema reference)
```

## Support Resources

- **Full Documentation**: See `MIGRATION_GUIDE.md`
- **Frontend Changes**: See `FRONTEND_CHANGES.md`
- **Content Types Schema**: See `CONTENT_TYPES_SCHEMA.json`
- **Strapi Docs**: https://docs.strapi.io

---

**Estimated Setup Time**: 30-45 minutes

**Need Help?** Check browser console and Strapi logs for error messages.
