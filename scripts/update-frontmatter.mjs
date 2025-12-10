/**
 * Update Markdown Frontmatter with Generated Images
 * 
 * Usage: node scripts/update-frontmatter.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'src', 'content');

// Helper to update frontmatter
function updateFrontmatter(filePath, imagePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Regex to match frontmatter
    const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        console.log(`⚠️ No frontmatter found in ${path.basename(filePath)}`);
        return;
    }

    let frontmatter = match[1];

    // Check if image already exists
    if (frontmatter.includes('image:')) {
        // Replace existing image
        frontmatter = frontmatter.replace(/image:.*\n/, `image: "${imagePath}"\n`);
    } else {
        // Add image to end of frontmatter
        frontmatter += `image: "${imagePath}"\n`;
    }

    // Also update heroImage if it exists (for compatibility)
    if (frontmatter.includes('heroImage:')) {
        frontmatter = frontmatter.replace(/heroImage:.*\n/, `heroImage: "${imagePath}"\n`);
    }

    const newContent = content.replace(frontmatterRegex, `---\n${frontmatter}---`);
    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Updated ${path.basename(filePath)} -> ${imagePath}`);
}

// 1. Update Blog Posts
const blogDir = path.join(CONTENT_DIR, 'blog');
const blogMappings = {
    '10-innovative-uses-for-photoluminescent-safety-signs.md': '/images/blog/photoluminescent-signs.png',
    'choosing-sign-materials.md': '/images/blog/choosing-sign-materials.png',
    'fire-safety-guide.md': '/images/blog/fire-safety-guide.png',
    'how-covid-19-changed-workplace-safety-signage-forever.md': '/images/blog/covid-workplace-signage.png',
    'osha-2025-updates.md': '/images/blog/osha-2025-updates.png',
    'safety-sign-trends-2024-whats-new-in-workplace-safety.md': '/images/blog/safety-sign-trends-2024.png',
    'the-hidden-costs-of-non-compliant-safety-signage.md': '/images/blog/hidden-costs-non-compliance.png',
    'why-warehouse-safety-signs-are-your-most-effective-defence-against-workplace-accidents.md': '/images/blog/warehouse-safety-signs.png'
};

if (fs.existsSync(blogDir)) {
    console.log('\n📝 Updating Blog Posts...');
    const files = fs.readdirSync(blogDir);
    for (const file of files) {
        if (blogMappings[file]) {
            updateFrontmatter(path.join(blogDir, file), blogMappings[file]);
        }
    }
}

// 2. Update KB Articles
const kbDir = path.join(CONTENT_DIR, 'kb');
const kbMappings = {
    'compliance': '/images/kb/compliance.png',
    'getting-started': '/images/kb/getting-started.png',
    'industry-guides': '/images/kb/industry-guides.png',
    'installation': '/images/kb/installation.png',
    'materials': '/images/kb/materials.png',
    'sign-types': '/images/kb/sign-types.png'
};

if (fs.existsSync(kbDir)) {
    console.log('\n📚 Updating KB Articles...');

    // Process directories in KB
    const items = fs.readdirSync(kbDir);
    for (const item of items) {
        const itemPath = path.join(kbDir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory() && kbMappings[item]) {
            // Update all markdown files in this directory
            const files = fs.readdirSync(itemPath);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    updateFrontmatter(path.join(itemPath, file), kbMappings[item]);
                }
            }
        }
    }
}

console.log('\n✨ Frontmatter update complete!');
