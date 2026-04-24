import fs from 'fs';
import path from 'path';

const files = ['about.html', 'contact.html'];
const dir = '/Users/atharvachoudhari/.gemini/antigravity/scratch/appsec-portfolio';

const buttonHtml = `
<button id="theme-toggle" class="p-2 rounded-xl neomorphic-raised active:scale-95 transition-transform duration-200 text-indigo-600">
<span class="material-symbols-outlined" data-icon="dark_mode">dark_mode</span>
</button>
`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Insert the button at the beginning of the flex container that holds the header icons
  content = content.replace(/<div class="flex items-center (space-x-4|gap-4)">/, (match) => {
    return match + buttonHtml;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Added button to ${file}`);
});
