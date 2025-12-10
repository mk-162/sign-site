/**
 * Repair Frontmatter V2
 * Fixes:
 * 1. Missing closing '---'
 * 2. 'image:' appended to previous line
 * 3. 'image:' followed immediately by '---' without newline
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'src', 'content');

function walkDir(dir, callback) {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(f => {
            let dirPath = path.join(dir, f);
            let isDirectory = fs.statSync(dirPath).isDirectory();
            isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
        });
    }
}

console.log('🔧 Repairing frontmatter V2...');

let fixedCount = 0;

walkDir(CONTENT_DIR, (filePath) => {
    if (!filePath.endsWith('.md')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let modified = false;

    // Fix 1: 'image:' appended to previous line (e.g. "relatedProducts: [...]image:")
    // Regex finds a non-newline char followed immediately by "image:"
    if (/[^\n]image: "/.test(content)) {
        content = content.replace(/([^\n])(image: ")/g, '$1\n$2');
        modified = true;
    }

    // Fix 2: 'image: "..."---' (missing newline before fence)
    if (/image: ".*?"---/.test(content)) {
        content = content.replace(/(image: ".*?")---/g, '$1\n---');
        modified = true;
    }

    // Fix 3: Missing closing '---' after image line
    // Look for image line that is NOT followed by '---'
    // This is tricky because we need to know where the frontmatter ends.
    // If we have open '---', and then 'image: "..."' and then NO '---' before body text

    // Simple heuristic: If we have an image line, and the next non-empty line does NOT start with '---' (and isn't another key), insert it.
    // Better: If we can't find the closing fence, append it after the image line.

    const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
    if (!frontmatterRegex.test(content)) {
        // Frontmatter is broken/unclosed
        if (content.startsWith('---')) {
            // It has start, but no end.
            // Check if we have an image field
            const imageMatch = content.match(/(image: ".*?")(\r?\n|$)/);
            if (imageMatch) {
                // If the text after image match is NOT '---', insert it.
                // We'll just replace the image line with image line + \n---
                // But we must be careful not to introduce double --- if it's just further down
                // Let's assume the previous script stripped it.
                const index = content.indexOf(imageMatch[0]) + imageMatch[0].length;
                const nextChars = content.substring(index, index + 20).trim();
                if (!nextChars.startsWith('---')) {
                    content = content.replace(/(image: ".*?")(\r?\n|$)/, '$1\n---\n');
                    modified = true;
                }
            }
        }
    }

    if (modified && content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Repaired: ${path.basename(filePath)}`);
        fixedCount++;
    }
});

console.log(`✨ Done! Repaired ${fixedCount} files.`);
