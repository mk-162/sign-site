/**
 * Fix Malformed Frontmatter in KB Files
 * Replaces `image: "..."---` with `image: "..."\n---`
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'src', 'content', 'kb');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

console.log('🔧 Fixing frontmatter...');

walkDir(CONTENT_DIR, (filePath) => {
    if (filePath.endsWith('.md')) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Check for the specific issue: image line ending directly with ---
        // Regex looks for image: "..."--- (possibly with spaces)
        if (/image: ".*?"\s*---/.test(content)) {
            const newContent = content.replace(/(image: ".*?")\s*---/, '$1\n---');
            fs.writeFileSync(filePath, newContent);
            console.log(`✅ Fixed: ${path.basename(filePath)}`);
        }
    }
});

console.log('✨ Done!');
