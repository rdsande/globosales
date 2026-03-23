/**
 * Strapi Data Import Script
 * 
 * This script imports data from the exported JSON file into your Strapi instance.
 * 
 * IMPORTANT: Before running this script:
 * 1. Set up Strapi on the new machine
 * 2. Create all content types (Product, Category, Vendor) with the same fields
 * 3. Configure public permissions for find and findOne
 * 4. Place strapi-export.json in the same directory as this script
 * 
 * Usage:
 * 1. Place this file in your Strapi project root directory
 * 2. Ensure strapi-export.json is in the same directory
 * 3. Run: node IMPORT_SCRIPT.js
 */

const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;
const INPUT_FILE = 'strapi-export.json';

// You'll need to get an API token from Strapi Admin
// Go to Settings → API Tokens → Create new API Token
// Give it full access and copy the token here
const API_TOKEN = 'YOUR_API_TOKEN_HERE'; // Replace with your actual token

async function createEntry(contentType, data) {
  try {
    const response = await fetch(`${API_URL}/${contentType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ data })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    return await response.json();
  } catch (error) {
    console.error(`   ❌ Error creating ${contentType}:`, error.message);
    return null;
  }
}

async function importData() {
  console.log('🚀 Starting Strapi data import...\n');

  // Check if API token is set
  if (API_TOKEN === 'YOUR_API_TOKEN_HERE') {
    console.error('❌ Error: Please set your API_TOKEN in the script');
    console.log('\n📝 To get an API token:');
    console.log('   1. Go to http://localhost:1337/admin');
    console.log('   2. Settings → API Tokens → Create new API Token');
    console.log('   3. Name: "Import Script", Token type: Full access');
    console.log('   4. Copy the token and paste it in this script');
    process.exit(1);
  }

  // Read export file
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Error: ${INPUT_FILE} not found`);
    console.log('   Please ensure strapi-export.json is in the same directory');
    process.exit(1);
  }

  const exportData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  console.log(`📦 Loaded export from: ${exportData.exportDate}\n`);

  const stats = {
    categories: { success: 0, failed: 0 },
    vendors: { success: 0, failed: 0 },
    products: { success: 0, failed: 0 }
  };

  // Import Categories first (no dependencies)
  console.log('📦 Importing categories...');
  const categoryMap = new Map(); // Map old IDs to new IDs
  
  for (const category of exportData.data.categories) {
    const { id, documentId, products, ...categoryData } = category;
    const result = await createEntry('categories', categoryData);
    
    if (result) {
      categoryMap.set(id, result.data.id);
      stats.categories.success++;
      console.log(`   ✓ Created: ${categoryData.name}`);
    } else {
      stats.categories.failed++;
    }
  }

  // Import Vendors (no dependencies)
  console.log('\n📦 Importing vendors...');
  const vendorMap = new Map(); // Map old IDs to new IDs
  
  for (const vendor of exportData.data.vendors) {
    const { id, documentId, products, ...vendorData } = vendor;
    const result = await createEntry('vendors', vendorData);
    
    if (result) {
      vendorMap.set(id, result.data.id);
      stats.vendors.success++;
      console.log(`   ✓ Created: ${vendorData.name}`);
    } else {
      stats.vendors.failed++;
    }
  }

  // Import Products (depends on categories and vendors)
  console.log('\n📦 Importing products...');
  
  for (const product of exportData.data.products) {
    const { id, documentId, ...productData } = product;
    
    // Map old category ID to new category ID
    if (productData.category?.id) {
      const newCategoryId = categoryMap.get(productData.category.id);
      if (newCategoryId) {
        productData.category = newCategoryId;
      } else {
        delete productData.category;
      }
    }
    
    // Map old vendor ID to new vendor ID
    if (productData.vendor?.id) {
      const newVendorId = vendorMap.get(productData.vendor.id);
      if (newVendorId) {
        productData.vendor = newVendorId;
      } else {
        delete productData.vendor;
      }
    }
    
    const result = await createEntry('products', productData);
    
    if (result) {
      stats.products.success++;
      console.log(`   ✓ Created: ${productData.title}`);
    } else {
      stats.products.failed++;
    }
  }

  // Print summary
  console.log('\n✅ Import complete!\n');
  console.log('📊 Import Summary:');
  console.log(`   Categories: ${stats.categories.success} success, ${stats.categories.failed} failed`);
  console.log(`   Vendors: ${stats.vendors.success} success, ${stats.vendors.failed} failed`);
  console.log(`   Products: ${stats.products.success} success, ${stats.products.failed} failed`);
  
  if (stats.categories.failed > 0 || stats.vendors.failed > 0 || stats.products.failed > 0) {
    console.log('\n⚠️  Some imports failed. Check the errors above.');
  }
}

// Run import
importData().catch(error => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});
