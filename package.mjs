import { createWriteStream, mkdirSync, cpSync, rmSync } from 'fs';
import { join } from 'path';
import archiver from 'archiver';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const BUILD_DIR = join(__dirname, 'build');
const OUTPUT_ZIP = join(__dirname, 'extension.zip');

// Clean build directory
console.log('Cleaning build directory...');
rmSync(BUILD_DIR, { recursive: true, force: true });
mkdirSync(BUILD_DIR, { recursive: true });

// Copy necessary files
console.log('Copying files...');
const filesToCopy = [
  'index.html',
  'manifest.json',
  'dist',
];

filesToCopy.forEach(file => {
  const source = join(__dirname, file);
  const dest = join(BUILD_DIR, file);
  cpSync(source, dest, { recursive: true });
  console.log(`  ✓ ${file}`);
});

// Create zip file
console.log('Creating zip archive...');
const output = createWriteStream(OUTPUT_ZIP);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`✓ Extension packaged: ${OUTPUT_ZIP} (${sizeMB} MB)`);
  console.log('Ready to upload to Chrome Web Store!');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(BUILD_DIR, false);
archive.finalize();
