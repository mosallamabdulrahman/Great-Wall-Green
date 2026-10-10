import fs from "fs";
import path from "path";

const REPO_NAME = "Great-Wall-Green";
const DIST_DIR = path.join("dist", "client");

if (!fs.existsSync(DIST_DIR)) {
  console.error(`Error: ${DIST_DIR} does not exist. Run build first.`);
  process.exit(1);
}

// 1. Create .nojekyll
fs.writeFileSync(path.join(DIST_DIR, ".nojekyll"), "", "utf-8");
console.log("Created .nojekyll");

// 2. Create index.html redirecting to /Great-Wall-Green/en/
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=./en/">
  <script>
    var path = window.location.pathname;
    if (!path.endsWith('/')) path += '/';
    window.location.replace(path + 'en/');
  </script>
  <title>Great Wall Green Source</title>
</head>
<body>
  <p>Redirecting to <a href="./en/">English version</a>...</p>
</body>
</html>
`;
fs.writeFileSync(path.join(DIST_DIR, "index.html"), indexHtml, "utf-8");
console.log("Created index.html");

// 3. Create 404.html redirecting SPA router
const spa404 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <script>
    var path = window.location.pathname;
    var base = '/${REPO_NAME}/';
    if (!path.startsWith(base)) {
      window.location.replace(base + 'en/');
    } else {
      var segs = path.slice(base.length).split('/');
      var lang = segs[0] || 'en';
      var rest = segs.slice(1).join('/');
      if (rest) {
        window.location.replace(base + lang + '/' + rest + '.html' + window.location.search);
      } else {
        window.location.replace(base + lang + '.html' + window.location.search);
      }
    }
  </script>
  <title>Great Wall Green Source</title>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
`;
fs.writeFileSync(path.join(DIST_DIR, "404.html"), spa404, "utf-8");
console.log("Created 404.html");

// 4. Rewrite URLs in files inside dist/client
const prefix = `/${REPO_NAME}`;
const extensions = [".html", ".js", ".json", ".rsc", ".css"];

let count = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (extensions.some(ext => file.endsWith(ext))) {
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
        content = content.replaceAll("/favicon.svg", `${prefix}/favicon.svg/`);
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
        count++;
      }
    }
  }
}

walkDir(DIST_DIR);
console.log(`Patched ${count} files with /${REPO_NAME} prefix.`);
