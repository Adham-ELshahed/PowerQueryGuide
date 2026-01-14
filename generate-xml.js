import fs from 'fs';
import path from 'path';

// Paths to JSON files
const functionsPath = path.resolve('./client/public/functions.json');
const categoriesPath = path.resolve('./client/public/categories.json');

// Read and parse JSON
const functions = JSON.parse(fs.readFileSync(functionsPath, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Main pages
const mainPages = ['/', '/blog', '/functions', '/about', '/datatypes'];
mainPages.forEach(page => {
  xml += `  <url>
    <loc>https://powerquery.guide${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>\n`;
});

// Categories (from categories.json, preserve casing)
categories.forEach(cat => {
  const slug = encodeURIComponent(cat.name);
  xml += `  <url>
    <loc>https://powerquery.guide/category/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>\n`;
});

// Functions (from functions.json, preserve casing)
functions.forEach(func => {
  const slug = encodeURIComponent(func.name);
  xml += `  <url>
    <loc>https://powerquery.guide/function/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>\n`;
});

xml += '</urlset>';

// Write the sitemap file
fs.writeFileSync('PQsitemap.xml', xml);
console.log('PQsitemap.xml generated!');
