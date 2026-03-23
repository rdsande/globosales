# GloboSales - Dynamic E-commerce Platform

A modern e-commerce platform with dynamic content loading, Strapi CMS backend, and responsive design.

## 🚀 Quick Setup

### Prerequisites

- Node.js v18+
- XAMPP (Apache + MySQL)
- Git

### Backend Setup (Strapi)

1. **Create Strapi Project**

```bash
npx create-strapi-app@latest globosales-backend --quickstart
cd globosales-backend
npm run develop
```

2. **Create Content Types**

Navigate to: `http://localhost:1337/admin`

Create these collection types:

**Category:**

- name (Text, Required)
- slug (UID, Required, target: name)
- description (Text)
- image (Media, Single)
- icon (Text)
- featured (Boolean, default: false)

**Vendor:**

- name (Text, Required)
- slug (UID, Required, target: name)
- description (Text)
- logo (Media, Single)
- email (Email)
- phone (Text)

**Product:**

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

3. **Configure Permissions**

Settings → Users & Permissions → Roles → Public

Enable for each content type:

- ✅ find
- ✅ findOne

4. **Add Sample Data**

Add categories, vendors, and products through Strapi Admin Panel.

### Frontend Setup

1. **Clone Repository**

```bash
git clone <your-repo-url>
cd globosales
```

2. **Copy to Web Server**

- Windows: `C:\xampp\htdocs\globosales`
- Mac: `/Applications/XAMPP/htdocs/globosales`
- Linux: `/var/www/html/globosales`

3. **Start XAMPP**

- Start Apache server

4. **Access Application**

- Homepage: `http://localhost/globosales/index.html`
- Product Details: `http://localhost/globosales/product-details.html?id={productId}`

## 📁 Project Structure

```
globosales/
├── assets/
│   ├── css/
│   │   ├── banner-bg-slider.css      # Banner slider styles
│   │   ├── modern-footer.css         # Modern footer design
│   │   └── main.css
│   ├── js/
│   │   ├── strapi-api.js            # Strapi API integration
│   │   ├── homepage.js              # Homepage dynamic content
│   │   ├── product-details.js       # Product details page logic
│   │   ├── init-dynamic-header.js   # Dynamic header loader
│   │   └── main.js
│   └── images/
├── includes/
│   └── header-dynamic.html          # Dynamic header template
├── index.html                       # Homepage (modified)
├── product-details.html             # Product details page (modified)
└── README.md
```

## ✨ Features

### Dynamic Content Loading

- **Homepage**: Categories, featured products, new arrivals loaded from Strapi
- **Product Details**: Individual product pages with URL parameters
- **Search**: Autocomplete search functionality
- **Categories**: Dynamic category dropdown in header

### Modern UI Components

- **Banner Slider**: Automatic background image rotation with fade effects
- **Modern Footer**: Dark green responsive footer with social media links
- **Dynamic Header**: Consistent header across all pages loaded from template
- **Responsive Design**: Mobile, tablet, and desktop layouts

### API Integration

- Strapi v5 REST API
- Automatic handling of both numeric IDs and documentIds
- Image URL formatting
- Price formatting helpers

## 🔗 Important Links

- **Frontend**: http://localhost/globosales/index.html
- **Strapi Admin**: http://localhost:1337/admin
- **API Endpoint**: http://localhost:1337/api

## 🛠️ Configuration

### API Configuration

Edit `assets/js/strapi-api.js`:

```javascript
const STRAPI_URL = "http://localhost:1337"; // Update if needed
```

### Content Types Schema

See `CONTENT_TYPES_SCHEMA.json` for complete field definitions.

## 📝 Key Files

### New Files Created

- `assets/css/banner-bg-slider.css` - Banner slider styles
- `assets/css/modern-footer.css` - Modern footer styles
- `assets/js/strapi-api.js` - API integration layer
- `assets/js/homepage.js` - Homepage dynamic loading
- `assets/js/product-details.js` - Product details logic
- `assets/js/init-dynamic-header.js` - Header loader
- `includes/header-dynamic.html` - Header template

### Modified Files

- `index.html` - Dynamic header, modern footer, banner slider
- `product-details.html` - Dynamic header, footer, product loading
- `assets/js/main.js` - Banner slider initialization

## 🚀 Development Workflow

1. **Start Strapi Backend**

```bash
cd globosales-backend
npm run develop
```

2. **Start XAMPP**

- Start Apache server

3. **Access Application**

- Open browser: `http://localhost/globosales/index.html`

4. **Make Changes**

- Frontend: Edit HTML/CSS/JS files
- Backend: Manage content in Strapi admin
- Refresh browser to see changes

## 🔍 Troubleshooting

**Products not loading:**

- Check browser console (F12) for errors
- Verify Strapi is running on port 1337
- Check public permissions are enabled in Strapi
- Verify API URL in `strapi-api.js`

**Duplicate headers:**

- Clear browser cache
- Verify `init-dynamic-header.js` is loaded
- Check console for header loading messages

**Images not showing:**

- Check Strapi media library
- Verify image URLs in browser network tab
- Check CORS settings in Strapi

**documentId not working:**

- API automatically falls back to filter-based queries
- Check console logs for API responses

## 📦 Deployment

### Frontend Deployment

1. Copy all files to web server
2. Update `STRAPI_URL` in `strapi-api.js` to production URL
3. Ensure web server serves static files

### Backend Deployment

1. Deploy Strapi to hosting service
2. Configure database connection
3. Set up environment variables
4. Enable CORS for frontend domain

## 🧪 Testing Checklist

- [ ] Homepage loads categories dynamically
- [ ] Homepage loads products dynamically
- [ ] Search autocomplete works
- [ ] Category dropdown populates
- [ ] Product details page loads individual products
- [ ] Product images display correctly
- [ ] Banner slider transitions smoothly
- [ ] Footer displays on all pages
- [ ] Mobile responsive layout works
- [ ] No duplicate headers appear

## 📚 Additional Documentation

- `CONTENT_TYPES_SCHEMA.json` - Complete content type definitions
- `FRONTEND_CHANGES.md` - Detailed list of all modifications
- `EXPORT_SCRIPT.js` - Export data from Strapi
- `IMPORT_SCRIPT.js` - Import data to new Strapi instance

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:

- Check browser console for errors
- Review Strapi logs in terminal
- Check network tab in DevTools
- Refer to [Strapi Documentation](https://docs.strapi.io)

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Strapi Version**: 5.x
