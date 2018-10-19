import fs from "fs";
import path from "path";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import stripBanner from "rollup-plugin-strip-banner";

const copyright = fs.readFileSync(path.join("resources", "COPYRIGHT"), "utf-8");

const SRC_DIR = path.resolve("src");
const DIST_DIR = path.resolve("dist");

export default {
  input: path.join(SRC_DIR, "image-map.js"),
  output: {
    name: "ImageMap",
    banner: copyright,
    file: path.join(DIST_DIR, "image-map.es.js"),
    format: "es",
    globals: {
      "jquery": "$"
    }
  },
  external: ["jquery"],
  plugins: [
    json(),
    stripBanner(),
    babel({
      presets: ["@babel/preset-env"],
      exclude: "**/node_modules/**",
      babelrc: false
    }),
    commonjs()
  ]
};
