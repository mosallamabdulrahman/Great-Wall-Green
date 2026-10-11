import fs from "fs";
import path from "path";

const REPO_NAME = "Great-Wall-Green";
const DIST_DIR = path.join("dist", "client");

if (!fs.existsSync(DIST_DIR)) {
  console.error(`Error: ${DIST_DIR} does not exist. Run build first.`);
  process.exit(1);
}

// 1. Create .nojekyll to prevent GitHub Pages from ignoring files starting with underscores (like _next)
fs.writeFileSync(path.join(DIST_DIR, ".nojekyll"), "", "utf-8");
console.log("Created .nojekyll");

// 2. Generate physical directory entrypoints (folder/index.html) for all exported .html pages
// This completely fixes GitHub Pages 404 errors on direct access and page refresh without hash routing (#)
let generatedDirsCount = 0;

function createDirectoryIndexFiles(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      createDirectoryIndexFiles(fullPath);
    } else if (entry.endsWith(".html") && entry !== "index.html" && entry !== "404.html") {
      const pageName = entry.slice(0, -5);
      const targetDir = path.join(dir, pageName);
      const targetFile = path.join(targetDir, "index.html");

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.copyFileSync(fullPath, targetFile);
      generatedDirsCount++;
    }
  }
}

createDirectoryIndexFiles(DIST_DIR);
console.log(`Generated ${generatedDirsCount} directory index.html entrypoints for clean URLs.`);

// 3. Ensure root index.html exists
const rootIndexPath = path.join(DIST_DIR, "index.html");
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/${REPO_NAME}/en/">
  <script>
    var path = window.location.pathname;
    var base = '/${REPO_NAME}/';
    if (!path.startsWith(base)) {
      window.location.replace(base + 'en/');
    } else if (path === base || path === base.slice(0, -1)) {
      window.location.replace(base + 'en/');
    }
  </script>
  <title>Great Wall Green Source</title>
</head>
<body>
  <p>Redirecting to <a href="/${REPO_NAME}/en/">English version</a>...</p>
</body>
</html>
`;

if (!fs.existsSync(rootIndexPath)) {
  fs.writeFileSync(rootIndexPath, indexHtmlContent, "utf-8");
  console.log("Created root index.html");
}

// 4. Create 404.html as a fallback in the output build directory (exact copy of index.html)
// GitHub Pages serves 404.html when a URL is not matched, allowing client-side routing to take over
fs.copyFileSync(rootIndexPath, path.join(DIST_DIR, "404.html"));
console.log("Created 404.html (exact copy of index.html for GitHub Pages fallback)");

// 5. Rewrite asset URLs and internal links inside dist/client with /${REPO_NAME} prefix
const prefix = `/${REPO_NAME}`;
const extensions = [".html", ".js", ".json", ".rsc", ".css"];
let patchedCount = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      let content = fs.readFileSync(fullPath, "utf-8");
      let modified = false;

      // Replace /_next/ if not already prefixed
      if (content.includes("/_next/") && !content.includes(`${prefix}/_next/`)) {
        content = content.replaceAll("/_next/", `${prefix}/_next/`);
        modified = true;
      }

      // Replace /assets/ if not already prefixed
      if (content.includes("/assets/") && !content.includes(`${prefix}/assets/`)) {
        content = content.replaceAll("/assets/", `${prefix}/assets/`);
        modified = true;
      }

      // Replace /favicon.svg if not already prefixed
      if (content.includes("/favicon.svg") && !content.includes(`${prefix}/favicon.svg`)) {
        content = content.replaceAll("/favicon.svg", `${prefix}/favicon.svg`);
        modified = true;
      }

      // Replace language routes
      for (const lang of ["en", "ar", "zh", "ja", "ko", "ru"]) {
        const pattern = `href="/${lang}`;
        const target = `href="${prefix}/${lang}`;
        if (content.includes(pattern)) {
          content = content.replaceAll(pattern, target);
          modified = true;
        }

        const patternUrl = `"/${lang}/`;
        const targetUrl = `"${prefix}/${lang}/`;
        if (content.includes(patternUrl)) {
          content = content.replaceAll(patternUrl, targetUrl);
          modified = true;
        }

        const patternAssign = "`/${e.target.value}/${route}";
        if (content.includes(patternAssign)) {
          content = content.replaceAll(patternAssign, `\`${prefix}/\${e.target.value}/\${route}`);
          modified = true;
        }

        const patternAssign2 = "`/${newLang}/${route}";
        if (content.includes(patternAssign2)) {
          content = content.replaceAll(patternAssign2, `\`${prefix}/\${newLang}/\${route}`);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, "utf-8");
        patchedCount++;
      }
    }
  }
}

walkDir(DIST_DIR);
console.log(`Patched ${patchedCount} files with /${REPO_NAME} prefix.`);
