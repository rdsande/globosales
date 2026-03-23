/**
 * Strapi Data Export Script
 * 
 * This script exports all content from your Strapi instance to a JSON file
 * that can be imported on another machine.
 * 
 * Usage:
 * 1. Place this file in your Strapi project root directory
 * 2. Run: node EXPORT_SCRIPT.js
 * 3. Copy the generated 'strapi-export.json' file to your new machine
 */

const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;
const OUTPUT_FILE = 'strapi-export.json';

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}?populate=*&pagination[pageSize]=100`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    return [];
  }
}

async function exportData() {
  console.log('🚀 Starting Strapi data export...\n');

  const exportData = {
    exportDate: new Date().toISOString(),
    strapiVersion: '5.x',
    data: {}
  };

  // Export Categories
  console.log('📦 Exporting categories...');
  exportData.data.categories = await fetchData('categories');
  console.log(`   ✓ Exported ${exportData.data.categories.length} categories`);

  // Export Vendors
  console.log('📦 Exporting vendors...');
  exportData.data.vendors = await fetchData('vendors');
  console.log(`   ✓ Exported ${exportData.data.vendors.length} vendors`);

  // Export Products
  console.log('📦 Exporting products...');
  exportData.data.products = await fetchData('products');
  console.log(`   ✓ Exported ${exportData.data.products.length} products`);

  // Save to file
  console.log('\n💾 Saving to file...');
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(exportData, null, 2),
    'utf8'
  );

  console.log(`✅ Export complete! Data saved to: ${OUTPUT_FILE}`);
  console.log('\n📊 Export Summary:');
  console.log(`   Categories: ${exportData.data.categories.length}`);
  console.log(`   Vendors: ${exportData.data.vendors.length}`);
  console.log(`   Products: ${exportData.data.products.length}`);
  console.log('\n📝 Next steps:');
  console.log('   1. Copy strapi-export.json to your new machine');
  console.log('   2. Set up Strapi on the new machine');
  console.log('   3. Create the same content types');
  console.log('   4. Run IMPORT_SCRIPT.js to import the data');
}

// Run export
exportData().catch(error => {
  console.error('❌ Export failed:', error);
  process.exit(1);
});
