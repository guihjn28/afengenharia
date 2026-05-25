// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";
import fs from "fs";
import path from "path";

const renameServerOutputPlugin = (): Plugin => ({
  name: "rename-server-output",
  apply: "build",
  enforce: "post",
  writeBundle(options, bundle) {
    if (options.dir?.includes("dist/server")) {
      const indexPath = path.resolve(options.dir, "index.js");
      const serverPath = path.resolve(options.dir, "server.js");
      if (fs.existsSync(indexPath) && !fs.existsSync(serverPath)) {
        fs.copyFileSync(indexPath, serverPath);
        console.log("[rename-server-output] Copied index.js -> server.js");
      }
    }
  },
});

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      failOnError: true,
    },
    spa: {
      enabled: true,
    },
  },
  vite: {
    plugins: [renameServerOutputPlugin()],
  },
});
