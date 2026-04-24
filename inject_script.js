import fs from 'fs';
import path from 'path';

const files = ['index.html', 'projects.html', 'about.html', 'blog.html', 'contact.html'];
const dir = '/Users/atharvachoudhari/.gemini/antigravity/scratch/appsec-portfolio';

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Insert script tag before </body>
  if (!content.includes('<script type="module" src="/main.js"></script>')) {
    content = content.replace('</body>', '<script type="module" src="/main.js"></script>\n</body>');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
