const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, 'public', 'images');
const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

try {
  const images = fs.readdirSync(publicImagesDir);
  const srcFiles = getAllFiles(srcDir, []);

  const imageUsage = {};
  images.forEach(img => {
    imageUsage[img] = 0;
  });

  srcFiles.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      const content = fs.readFileSync(file, 'utf8');
      images.forEach(img => {
        // Search for filename with or without path
        if (content.includes(img)) {
          imageUsage[img]++;
        }
      });
    }
  });

  console.log("Image Usage Report:");
  let unusedCount = 0;
  for (const [img, count] of Object.entries(imageUsage)) {
    if (count === 0) {
      console.log(`[UNUSED] ${img}`);
      unusedCount++;
    } else {
      console.log(`[USED] ${img} (${count} times)`);
    }
  }
  console.log(`\nTotal Unused: ${unusedCount}`);

} catch (err) {
  console.error("Error:", err.message);
}
