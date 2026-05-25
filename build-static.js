#!/usr/bin/env node
/**
 * Build script that generates static files ready for Hostinger deployment.
 * Works around the TanStack Start prerender crash in the sandbox environment
 * by using the generated SPA shell as the index.html entry point.
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const DIST_DIR = path.resolve("dist/client");
const DEPLOY_DIR = path.resolve("deploy");

console.log("[build-static] Running vite build...");
try {
  execSync("bun run build", { stdio: "inherit" });
} catch {
  // The build may throw due to process.stdin.off bug in the preview server
  // but the client assets and _shell.html are already written.
  console.log("[build-static] Build process exited with error, but continuing...");
}

if (!fs.existsSync(DIST_DIR)) {
  console.error("[build-static] dist/client not found. Build failed.");
  process.exit(1);
}

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

// Use _shell.html as index.html
const shellPath = path.join(DEPLOY_DIR, "_shell.html");
const indexPath = path.join(DEPLOY_DIR, "index.html");
if (fs.existsSync(shellPath)) {
  fs.copyFileSync(shellPath, indexPath);
  console.log("[build-static] Copied _shell.html -> index.html");
} else {
  console.error("[build-static] _shell.html not found.");
  process.exit(1);
}

// Create .htaccess for SPA routing on Apache/Hostinger
const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
`;
fs.writeFileSync(path.join(DEPLOY_DIR, ".htaccess"), htaccessContent);
console.log("[build-static] Created .htaccess");

console.log("[build-static] Done! Files ready in ./deploy/");
console.log("[build-static] Upload the contents of ./deploy/ to your Hostinger public_html folder.");
