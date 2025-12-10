/**
 * Validate Content Frontmatter
 * Checks for missing required fields: title, description
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'src', 'content');

function validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        console.error(`❌ NO FRONTMATTER: ${path.relative(CONTENT_DIR, filePath)}`);
        return false;
    }

    const frontmatter = match[1];
    let hasError = false;

    if (!frontmatter.match(/^title:\s*.+/m)) {
        console.error(`❌ MISSING TITLE: ${path.relative(CONTENT_DIR, filePath)}`);
        hasError = true;
    }

    if (!frontmatter.match(/^description:\s*.+/m)) {
        console.error(`❌ MISSING DESCRIPTION: ${path.relative(CONTENT_DIR, filePath)}`);
        hasError = true;
    }

    return !hasError;
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            walkDir(dirPath);
        } else if (f.endsWith('.md')) {
            validateFile(dirPath);
        }
    });
}

console.log('🔍 Validating content...');
if (fs.existsSync(CONTENT_DIR)) {
    walkDir(CONTENT_DIR);
}
console.log('✨ Validation complete.');
