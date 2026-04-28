import fs from 'fs';
import path from 'path';

const files = ['index.html', 'projects.html', 'about.html', 'blog.html', 'contact.html', 'terminal.html'];
const dir = '/Users/atharvachoudhari/.gemini/antigravity/scratch/appsec-portfolio';

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // --- FIX TERMINAL-STYLE NAV LINKS (new design pattern) ---
  // root -> Home (index)
  content = content.replace(/href="#"([^>]*)>root<\/a>/g, 'href="/"$1>root</a>');
  // bin/projects
  content = content.replace(/href="#"([^>]*)>bin\/projects<\/a>/g, 'href="/projects.html"$1>bin/projects</a>');
  // etc/skills -> about
  content = content.replace(/href="#"([^>]*)>etc\/skills<\/a>/g, 'href="/about.html"$1>etc/skills</a>');
  // usr/contact
  content = content.replace(/href="#"([^>]*)>usr\/contact<\/a>/g, 'href="/contact.html"$1>usr/contact</a>');
  // log/insights or blog
  content = content.replace(/href="#"([^>]*)>log\/insights<\/a>/g, 'href="/blog.html"$1>log/insights</a>');
  content = content.replace(/href="#"([^>]*)>var\/blog<\/a>/g, 'href="/blog.html"$1>var/blog</a>');

  // --- FIX STANDARD NAV LINKS (old design pattern still used in some pages) ---
  content = content.replace(/href="#"([^>]*)>Home<\/a>/g, 'href="/"$1>Home</a>');
  content = content.replace(/href="#"([^>]*)>About<\/a>/g, 'href="/about.html"$1>About</a>');
  content = content.replace(/href="#"([^>]*)>Projects<\/a>/g, 'href="/projects.html"$1>Projects</a>');
  content = content.replace(/href="#"([^>]*)>Blog<\/a>/g, 'href="/blog.html"$1>Blog</a>');
  content = content.replace(/href="#"([^>]*)>Contact<\/a>/g, 'href="/contact.html"$1>Contact</a>');
  content = content.replace(/href="#"([^>]*)>Security Insights<\/a>/g, 'href="/blog.html"$1>Security Insights</a>');
  content = content.replace(/href="#"([^>]*)>Security Portfolio<\/a>/g, 'href="/"$1>Security Portfolio</a>');
  content = content.replace(/href="#"([^>]*)>Terminal<\/a>/g, 'href="/terminal.html"$1>Terminal</a>');

  // --- FIX MOBILE NAV SPANS ---
  content = content.replace(/href="#"([\s\S]*?)>Home<\/span>/g, 'href="/"$1>Home</span>');
  content = content.replace(/href="#"([\s\S]*?)>About<\/span>/g, 'href="/about.html"$1>About</span>');
  content = content.replace(/href="#"([\s\S]*?)>Work<\/span>/g, 'href="/projects.html"$1>Work</span>');
  content = content.replace(/href="#"([\s\S]*?)>Projects<\/span>/g, 'href="/projects.html"$1>Projects</span>');
  content = content.replace(/href="#"([\s\S]*?)>Blog<\/span>/g, 'href="/blog.html"$1>Blog</span>');
  content = content.replace(/href="#"([\s\S]*?)>Insights<\/span>/g, 'href="/blog.html"$1>Insights</span>');
  content = content.replace(/href="#"([\s\S]*?)>Contact<\/span>/g, 'href="/contact.html"$1>Contact</span>');

  // --- FIX "View Projects" BUTTON ---
  content = content.replace(/(<button[^>]*>)\s*View Projects\s*(<\/button>)/g,
    (m, open, close) => open.replace('<button', '<button onclick="location.href=\'/projects.html\'"') + '\n                        View Projects\n                    ' + close
  );

  fs.writeFileSync(filePath, content);
  console.log(`✓ Fixed links in ${file}`);
});
