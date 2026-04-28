import fs from 'fs';
import path from 'path';

const files = ['index.html', 'projects.html', 'about.html', 'blog.html', 'contact.html', 'terminal.html'];
const dir = '/Users/atharvachoudhari/.gemini/antigravity/scratch/appsec-portfolio';

const darkToggleBtn = `
<button id="theme-toggle" class="p-2 rounded-xl neomorph-raised neomorphic-raised active:scale-95 transition-transform duration-200 text-indigo-600">
<span class="material-symbols-outlined" data-icon="dark_mode">dark_mode</span>
</button>`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Fix nav links - desktop nav <a> tags
  content = content.replace(/href="#"([^>]*)>Home<\/a>/g, 'href="/"$1>Home</a>');
  content = content.replace(/href="#"([^>]*)>About<\/a>/g, 'href="/about.html"$1>About</a>');
  content = content.replace(/href="#"([^>]*)>Projects<\/a>/g, 'href="/projects.html"$1>Projects</a>');
  content = content.replace(/href="#"([^>]*)>Blog<\/a>/g, 'href="/blog.html"$1>Blog</a>');
  content = content.replace(/href="#"([^>]*)>Contact<\/a>/g, 'href="/contact.html"$1>Contact</a>');
  content = content.replace(/href="#"([^>]*)>Security Insights<\/a>/g, 'href="/blog.html"$1>Security Insights</a>');
  content = content.replace(/href="#"([^>]*)>Security Portfolio<\/a>/g, 'href="/"$1>Security Portfolio</a>');
  content = content.replace(/href="#"([^>]*)>Terminal<\/a>/g, 'href="/terminal.html"$1>Terminal</a>');

  // 2. Fix mobile nav link spans
  content = content.replace(/href="#"([\s\S]*?)>Home<\/span>/g, 'href="/"$1>Home</span>');
  content = content.replace(/href="#"([\s\S]*?)>About<\/span>/g, 'href="/about.html"$1>About</span>');
  content = content.replace(/href="#"([\s\S]*?)>Work<\/span>/g, 'href="/projects.html"$1>Work</span>');
  content = content.replace(/href="#"([\s\S]*?)>Projects<\/span>/g, 'href="/projects.html"$1>Projects</span>');
  content = content.replace(/href="#"([\s\S]*?)>Blog<\/span>/g, 'href="/blog.html"$1>Blog</span>');
  content = content.replace(/href="#"([\s\S]*?)>Insights<\/span>/g, 'href="/blog.html"$1>Insights</span>');
  content = content.replace(/href="#"([\s\S]*?)>Contact<\/span>/g, 'href="/contact.html"$1>Contact</span>');

  // 3. Update Tailwind config colors to CSS variables
  const knownColors = [
    "primary", "on-primary", "primary-container", "on-primary-container",
    "secondary", "on-secondary", "secondary-container", "on-secondary-container",
    "tertiary", "on-tertiary", "tertiary-container", "on-tertiary-container",
    "error", "on-error", "error-container", "on-error-container",
    "background", "on-background", "surface", "surface-bright",
    "surface-container", "surface-container-high", "surface-container-highest",
    "surface-container-low", "surface-container-lowest", "surface-dim",
    "surface-tint", "surface-variant", "on-surface", "on-surface-variant",
    "outline", "outline-variant", "inverse-surface", "inverse-on-surface",
    "inverse-primary"
  ];
  content = content.replace(/"([^"]+)":\s*"#[0-9a-fA-F]{6}"/g, (match, colorName) => {
    if (knownColors.includes(colorName)) {
      return `"${colorName}": "var(--color-${colorName})"`;
    }
    return match;
  });

  // 4. Inject dark mode toggle button if not already there
  if (!content.includes('id="theme-toggle"')) {
    content = content.replace(/<div class="flex items-center (space-x-4|gap-4|gap-2)">/, (match) => {
      return match + darkToggleBtn;
    });
  }

  // 5. Inject main.js if not already there
  if (!content.includes('<script type="module" src="/main.js">')) {
    content = content.replace('</body>', '<script type="module" src="/main.js"></script>\n</body>');
  }

  fs.writeFileSync(filePath, content);
  console.log(`✓ Processed ${file}`);
});
