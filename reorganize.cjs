const fs = require('fs');
const path = require('path');

const components = [
  'About', 'Career', 'Contact', 'Cursor', 'Education',
  'FeaturedVenture', 'Footer', 'HoverLinks', 'Landing', 'Loading',
  'Navbar', 'Research', 'SocialIcons', 'TechStack', 'WhatIDo', 'Work'
];

const basePath = path.join(__dirname, 'src', 'components');

components.forEach(comp => {
  const dir = path.join(basePath, comp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  // Move TSX
  const oldTsx = path.join(basePath, `${comp}.tsx`);
  const newTsx = path.join(dir, `${comp}.tsx`);
  if (fs.existsSync(oldTsx)) {
    fs.renameSync(oldTsx, newTsx);
    console.log(`Moved ${comp}.tsx`);

    // Update CSS import in TSX
    let content = fs.readFileSync(newTsx, 'utf8');
    content = content.replace(/import "\.\/styles\/([^"]+)\.css"/g, 'import "./$1.css"');
    fs.writeFileSync(newTsx, content);
  } else {
    console.log(`${comp}.tsx already moved or missing`);
  }

  // Move CSS
  const oldCss = path.join(basePath, 'styles', `${comp}.css`);
  const newCss = path.join(dir, `${comp}.css`);
  if (fs.existsSync(oldCss)) {
    fs.renameSync(oldCss, newCss);
    console.log(`Moved ${comp}.css`);
  }

  // Create index.tsx (Barrel)
  const indexFile = path.join(dir, 'index.tsx');
  fs.writeFileSync(indexFile, `export { default } from './${comp}';\n`);
});

// Move MainContainer.tsx
const mainDir = path.join(basePath, 'MainContainer');
if (!fs.existsSync(mainDir)) fs.mkdirSync(mainDir);
const oldMain = path.join(basePath, 'MainContainer.tsx');
const newMain = path.join(mainDir, 'MainContainer.tsx');
if (fs.existsSync(oldMain)) {
    fs.renameSync(oldMain, newMain);
    console.log("Moved MainContainer.tsx");
    let content = fs.readFileSync(newMain, 'utf8');
    content = content.replace(/from "\.\/([^"]+)"/g, 'from "../$1"');
    fs.writeFileSync(newMain, content);
}
// Create index.tsx for MainContainer
const mainIndexFile = path.join(mainDir, 'index.tsx');
fs.writeFileSync(mainIndexFile, `export { default } from './MainContainer';\n`);

// Move WorkImage.tsx to Work folder
const workImageOld = path.join(basePath, 'WorkImage.tsx');
const workImageNew = path.join(basePath, 'Work', 'WorkImage.tsx');
if (fs.existsSync(workImageOld)) {
    fs.renameSync(workImageOld, workImageNew);
    console.log("Moved WorkImage.tsx");
}

// Update Navbar and SocialIcons to use correct path for HoverLinks
const navPath = path.join(basePath, 'Navbar', 'Navbar.tsx');
if (fs.existsSync(navPath)) {
    let content = fs.readFileSync(navPath, 'utf8');
    content = content.replace(/"\.\/HoverLinks"/g, '"../HoverLinks"');
    fs.writeFileSync(navPath, content);
}
const socialPath = path.join(basePath, 'SocialIcons', 'SocialIcons.tsx');
if (fs.existsSync(socialPath)) {
    let content = fs.readFileSync(socialPath, 'utf8');
    content = content.replace(/"\.\/HoverLinks"/g, '"../HoverLinks"');
    fs.writeFileSync(socialPath, content);
}

console.log("Reorganization complete!");
