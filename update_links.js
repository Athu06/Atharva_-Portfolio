import fs from 'fs';
import path from 'path';

const files = ['index.html', 'projects.html', 'about.html', 'blog.html', 'contact.html'];
const dir = '/Users/atharvachoudhari/.gemini/antigravity/scratch/appsec-portfolio';

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // We need to replace href="#" for specific navigation items.
  // This regex matches an <a> tag and looks at its text content or the text content of its children.
  // A simpler way: just replace href="#" if the string "Home" appears nearby, but that's fragile.
  
  // Let's use a simpler heuristic for the main nav links:
  content = content.replace(/href="#"(.*?)>Home<\/a>/g, 'href="/"$1>Home</a>');
  content = content.replace(/href="#"(.*?)>About<\/a>/g, 'href="/about.html"$1>About</a>');
  content = content.replace(/href="#"(.*?)>Projects<\/a>/g, 'href="/projects.html"$1>Projects</a>');
  content = content.replace(/href="#"(.*?)>Blog<\/a>/g, 'href="/blog.html"$1>Blog</a>');
  content = content.replace(/href="#"(.*?)>Contact<\/a>/g, 'href="/contact.html"$1>Contact</a>');

  // For mobile nav which has structure like <a href="#"> ... <span>Home</span> </a>
  content = content.replace(/href="#"([^>]*>[\s\S]*?)>Home<\/span>/g, 'href="/"$1>Home</span>');
  content = content.replace(/href="#"([^>]*>[\s\S]*?)>About<\/span>/g, 'href="/about.html"$1>About</span>');
  content = content.replace(/href="#"([^>]*>[\s\S]*?)>Work<\/span>/g, 'href="/projects.html"$1>Work</span>');
  content = content.replace(/href="#"([^>]*>[\s\S]*?)>Insights<\/span>/g, 'href="/blog.html"$1>Insights</span>');
  content = content.replace(/href="#"([^>]*>[\s\S]*?)>Contact<\/span>/g, 'href="/contact.html"$1>Contact</span>');

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
