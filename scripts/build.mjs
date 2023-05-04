import * as esbuild from "esbuild";

/** @type{import("esbuild").BuildOptions} */
const options = {
  outdir: "public",
  logLevel: "debug",
  bundle: true,
  packages: "external",
  format: "esm",
  platform: "browser",
  target: ["safari16", "firefox111", "chrome112", "edge113"],
  minify: true,
  sourcemap: true,
  entryPoints: ["src/reading/01-introduction/index.ts", "styles/index.css"],
  alias: {
    "d3-selection": "https://esm.sh/d3-selection@3.0.0",
  },
};

await esbuild.build(options);
