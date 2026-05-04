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
  content = content.replace(/export const dynamic = 'force-dynamic';\r?\n/g, '');
  content = content.replace(/^\s+/, '');
  content = "export const dynamic = 'force-dynamic';\n\n" + content;
  fs.writeFileSync(file, content);
});

console.log('Cleaned up duplicate dynamic exports');
