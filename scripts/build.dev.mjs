import * as esbuild from "esbuild";

/** @type{import("esbuild").BuildContext} */
const context = await esbuild.context({
  outdir: "public",
  logLevel: "debug",
  bundle: true,
  packages: "external",
  format: "esm",
  platform: "browser",
  target: ["safari16", "firefox111", "chrome112", "edge113"],
  entryPoints: ["src/reading/01-introduction/index.ts", "styles/index.css"],
});

await context.watch();
