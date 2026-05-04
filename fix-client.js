const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('page.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('"use client"') || content.includes("'use client'")) {
    // Remove the export const dynamic
    content = content.replace(/export const dynamic = 'force-dynamic';\r?\n\r?\n?/g, '');
    
    // Ensure use client is at the top (it should be now, but just in case there are weird spaces)
    // Actually just removing the export const dynamic should leave use client at the top
    fs.writeFileSync(file, content);
    console.log('Fixed use client in: ' + file);
  }
});
console.log('Done');
