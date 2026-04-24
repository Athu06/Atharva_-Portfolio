import fs from 'fs';
import path from 'path';

const files = ['index.html', 'projects.html', 'about.html', 'blog.html', 'contact.html'];
const dir = '/Users/atharvachoudhari/.gemini/antigravity/scratch/appsec-portfolio';

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Regex to replace hex codes with var(--color-xxx) in tailwind.config
  // For example: "on-surface": "#2e3040" -> "on-surface": "var(--color-on-surface)"
  content = content.replace(/"([^"]+)":\s*"#[0-9a-fA-F]{6}"/g, (match, colorName) => {
    // Only replace known colors from our root
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
    
    if (knownColors.includes(colorName)) {
        return `"${colorName}": "var(--color-${colorName})"`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated Tailwind config in ${file}`);
});
