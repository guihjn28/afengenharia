#!/usr/bin/env node
/**
 * Build script that generates static files ready for Hostinger deployment.
 * Captures the SSR-rendered HTML from the dev server, replaces dev asset paths
 * with production hashed assets, and packages everything with a .htaccess.
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const DIST_DIR = path.resolve("dist/client");
const DEPLOY_DIR = path.resolve("deploy");
const DEV_SERVER_URL = "http://localhost:8080/";

function findAssets(dir) {
  const files = fs.readdirSync(dir);
  return {
    logo: files.find((f) => f.startsWith("logo-af-") && f.endsWith(".jpeg")),
    hero: files.find((f) => f.startsWith("hero-engenheira-") && f.endsWith(".png")),
    css: files.find((f) => f.startsWith("styles-") && f.endsWith(".css")),
    js: files.filter((f) => f.startsWith("index-") && f.endsWith(".js")),
  };
}

async function fetchHtml(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

function cleanAndPrepareHtml(html, assets) {
  // Remove dev-only scripts at the end of body (scroll restoration, react-refresh, etc.)
  html = html.replace(/<script\b[^>]*>.*?<\/script>/gs, (match) => {
    if (match.includes("/@react-refresh")) return "";
    if (match.includes("$tsr-stream-barrier")) return "";
    if (match.includes('"$tsr"') || match.includes("__TSR_key")) return "";
    if (match.includes("/@id/virtual:tanstack-start-client-entry")) return "";
    return match;
  });

  // Replace dev CSS with production CSS
  html = html.replace(
    /\/src\/styles\.css[^"]*"/g,
    `/assets/${assets.css}"",
  );

  // Replace dev asset paths with production hashed assets
  html = html.replace(
    /\/src\/assets\/logo-af\.jpeg/g,
    `/assets/${assets.logo}`,
  );
  html = html.replace(
    /\/src\/assets\/hero-engenheira\.png/g,
    `/assets/${assets.hero}`,
  );

  // Remove data-tsd-source attributes used by dev tools
  html = html.replace(/\sdata-tsd-source="[^"]*"/g, "");

  // Remove tanstack-router-dev-styles link if present
  html = html.replace(
    /<link[^>]*data-tanstack-router-dev-styles[^>]*>\n?/g,
    "",
  );

  // Add production JS entry points before closing </body>
  const scripts = assets.js
    .map((js) => `<script type="module" src="/assets/${js}"></script>`)
    .join("\n");
  html = html.replace("</body>", `${scripts}\n</body>`);

  return html;
}

async function main() {
  console.log("[build-static] Running vite build...");
  try {
    execSync("bun run build", { stdio: "inherit" });
  } catch {
    console.log("[build-static] Build process exited with error, but continuing...");
  }

  if (!fs.existsSync(DIST_DIR)) {
    console.error("[build-static] dist/client not found. Build failed.");
    process.exit(1);
  }

  const assets = findAssets(path.join(DIST_DIR, "assets"));
  if (!assets.logo || !assets.hero || !assets.css || assets.js.length === 0) {
    console.error("[build-static] Missing production assets.", assets);
    process.exit(1);
  }

  console.log("[build-static] Fetching rendered HTML from dev server...");
  const renderedHtml = await fetchHtml(DEV_SERVER_URL);

  const finalHtml = cleanAndPrepareHtml(renderedHtml, assets);

  // Prepare deploy folder
  if (fs.existsSync(DEPLOY_DIR)) {
    fs.rmSync(DEPLOY_DIR, { recursive: true });
  }
  fs.mkdirSync(DEPLOY_DIR, { recursive: true });

  // Copy all client assets
  console.log("[build-static] Copying client assets...");
  const copyDir = (src, dest) => {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };
  copyDir(DIST_DIR, DEPLOY_DIR);

  // Write static index.html
  const indexPath = path.join(DEPLOY_DIR, "index.html");
  fs.writeFileSync(indexPath, finalHtml);
  console.log("[build-static] Wrote index.html");

  // Create .htaccess for SPA routing on Apache/Hostinger
  const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# Cache assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresDefault "access plus 1 month"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(css|js|jpg|jpeg|png|gif|svg|webp|woff|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>

# MIME
AddType application/javascript .js
AddType text/css .css
AddType image/svg+xml .svg
AddType image/webp .webp
`;
  fs.writeFileSync(path.join(DEPLOY_DIR, ".htaccess"), htaccessContent);
  console.log("[build-static] Created .htaccess");

  // Create zip
  const zipName = "deploy-hostinger.zip";
  const zipPath = path.resolve(zipName);
  try {
    execSync(`cd ${DEPLOY_DIR} && zip -r ${zipPath} . -x "*.map"`, { stdio: "inherit" });
    console.log(`[build-static] Created ${zipPath}`);
  } catch {
    console.log("[build-static] zip not available, creating tarball fallback...");
    execSync(`tar -czf ${path.resolve("deploy-hostinger.tar.gz")} -C ${DEPLOY_DIR} .`, { stdio: "inherit" });
  }

  console.log("[build-static] Done! Upload the contents of ./deploy/ to your Hostinger public_html folder.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
