import os
import re

REPO_NAME = "Great-Wall-Green"
DIST_DIR = os.path.join("dist", "client")

if not os.path.exists(DIST_DIR):
    print(f"Error: {DIST_DIR} does not exist. Run build first.")
    exit(1)

# 1. Create .nojekyll
with open(os.path.join(DIST_DIR, ".nojekyll"), "w", encoding="utf-8") as f:
    f.write("")
print("Created .nojekyll")

# 2. Create index.html redirecting to /Great-Wall-Green/en/
index_html = f"""<!DOCTYPE html>
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
"""
with open(os.path.join(DIST_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(index_html)
print("Created index.html")

# 3. Create 404.html redirecting SPA router
spa_404 = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <script>
    var path = window.location.pathname;
    var base = '/{REPO_NAME}/';
    if (!path.startsWith(base)) {{
      window.location.replace(base + 'en/');
    }} else {{
      var segs = path.slice(base.length).split('/');
      var lang = segs[0] || 'en';
      var rest = segs.slice(1).join('/');
      if (rest) {{
        window.location.replace(base + lang + '/' + rest + '.html' + window.location.search);
      }} else {{
        window.location.replace(base + lang + '.html' + window.location.search);
      }}
    }}
  </script>
  <title>Great Wall Green Source</title>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
"""
with open(os.path.join(DIST_DIR, "404.html"), "w", encoding="utf-8") as f:
    f.write(spa_404)
print("Created 404.html")

# 4. Rewrite URLs in files inside dist/client
prefix = f"/{REPO_NAME}"
extensions = (".html", ".js", ".json", ".rsc", ".css")

count = 0
for root, _, files in os.walk(DIST_DIR):
    for file in files:
        if file.endswith(extensions):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()

            modified = False

            # Replace /_next/ if not already prefixed
            if "/_next/" in content and f"{prefix}/_next/" not in content:
                content = content.replace("/_next/", f"{prefix}/_next/")
                modified = True

            # Replace /assets/ if not already prefixed
            if "/assets/" in content and f"{prefix}/assets/" not in content:
                content = content.replace("/assets/", f"{prefix}/assets/")
                modified = True

            # Replace /favicon.svg if not already prefixed
            if "/favicon.svg" in content and f"{prefix}/favicon.svg" not in content:
                content = content.replace("/favicon.svg", f"{prefix}/favicon.svg/")
                modified = True

            # Replace language routes
            for lang in ["en", "ar", "zh", "ja", "ko", "ru"]:
                # href="/en" or href="/en/
                pattern = f'href="/{lang}'
                target = f'href="{prefix}/{lang}'
                if pattern in content:
                    content = content.replace(pattern, target)
                    modified = True

                pattern_url = f'"/{lang}/'
                target_url = f'"{prefix}/{lang}/'
                if pattern_url in content:
                    content = content.replace(pattern_url, target_url)
                    modified = True

                pattern_assign = f'`/${{e.target.value}}/${{route}}'
                if pattern_assign in content:
                    content = content.replace(pattern_assign, f'`{prefix}/${{e.target.value}}/${{route}}')
                    modified = True

                pattern_assign2 = f'`/${{newLang}}/${{route}}'
                if pattern_assign2 in content:
                    content = content.replace(pattern_assign2, f'`{prefix}/${{newLang}}/${{route}}')
                    modified = True

            if modified:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(content)
                count += 1

print(f"Patched {count} files with /{REPO_NAME} prefix.")
