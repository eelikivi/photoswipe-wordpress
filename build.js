import fs from "node:fs/promises";
import fsSync from "fs";
import esbuild from "esbuild";
import * as dotenv from "dotenv";
import { sassPlugin } from "esbuild-sass-plugin";
import minimist from "minimist";

dotenv.config();

const slug = "wp-photoswipe-gallery";

const argv = minimist(process.argv.slice(2));

const isDev = argv.dev === "true";
const isDist = argv.dist === "true";

const DIST_DIR = "dist";
const BUILD_DIR = "build";
const DEV_DIR = process.env.WORDPRESS_INSTALL_FOLDER || BUILD_DIR;

if (isDev && DEV_DIR === BUILD_DIR && !fsSync.existsSync(`./${DEV_DIR}`)) {
  fsSync.mkdirSync(`./${DEV_DIR}`);
}

// Clean dist folder
if (isDist) {
  for (const file of await fs.readdir(DIST_DIR)) {
    await fs.unlink(path.join(DIST_DIR, file));
  }
} else if (!isDev) {
  // Clean build folder
  for (const file of await fs.readdir(BUILD_DIR)) {
    await fs.unlink(path.join(BUILD_DIR, file));
  }
}

const outDir = `${isDist ? DIST_DIR : isDev ? DEV_DIR : BUILD_DIR}`;

// esbuild js options
const jsOptions = {
  bundle: true,
  minify: true,
  target: ["es2020"],
  watch: isDev
    ? {
        onRebuild(error, result) {
          if (error) console.error("watch build failed:", error);
          else console.log("rebuilt js:", result);
        },
      }
    : undefined,
};

// Bundle js
await Promise.all([
  esbuild
    .build({
      entryPoints: ["src/lib/admin/index.js"],
      ...jsOptions,
      outfile: `${outDir}/admin/js/${slug}-admin.js`,
    })
    .then(() => {
      if (isDev) {
        console.log("watching admin js...");
      }
    }),
  esbuild
    .build({
      entryPoints: ["src/lib/public/index.js"],
      ...jsOptions,
      outfile: `${outDir}/public/js/${slug}-public.js`,
    })
    .then(() => {
      if (isDev) {
        console.log("watching public js...");
      }
    }),
]);

// esbuild js options
const cssOptions = {
  minify: true,
  plugins: [sassPlugin()],
  watch: isDev
    ? {
        onRebuild(error, result) {
          if (error) console.error("watch build failed:", error);
          else console.log("rebuilt js:", result);
        },
      }
    : undefined,
};

// Bundle css
await Promise.all([
  esbuild
    .build({
      entryPoints: ["src/lib/admin/index.scss"],
      ...cssOptions,
      outfile: `${outDir}/admin/css/${slug}-admin.css`,
    })
    .then(() => {
      if (isDev) {
        console.log("watching admin css...");
      }
    }),
  esbuild
    .build({
      entryPoints: ["src/lib/public/index.scss"],
      ...cssOptions,
      outfile: `${outDir}/public/css/${slug}-public.css`,
    })
    .then(() => {
      if (isDev) {
        console.log("watching public css...");
      }
    }),
]);
