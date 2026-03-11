import https from 'https';
import fs from 'fs';

const icons = ['nextdotjs', 'react', 'typescript', 'tailwindcss', 'vercel', 'figma', 'nodedotjs', 'serverless'];

async function fetchIcon(name) {
  return new Promise((resolve) => {
    https.get(`https://cdn.simpleicons.org/${name}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<path d="([^"]+)"/);
        resolve({ name, path: match ? match[1] : null });
      });
    }).on('error', () => resolve({ name, path: null }));
  });
}

async function main() {
  const results = await Promise.all(icons.map(fetchIcon));
  let output = 'export const TECH_ICONS: Record<string, string> = {\n';
  results.forEach(r => {
    if (r.path) {
      output += `  '${r.name}': '${r.path}',\n`;
    }
  });
  output += '};\n';
  fs.writeFileSync('./components/ui/TechIconsPaths.ts', output);
  console.log('Icons written successfully to components/ui/TechIconsPaths.ts');
}

main();
