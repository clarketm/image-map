import fs from "fs";
import path from "path";
import { minify } from "uglify-js";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import saveLicense from "uglify-save-license";
import stripBanner from "rollup-plugin-strip-banner";

const copyright = fs.readFileSync(path.join("resources", "COPYRIGHT"), "utf-8");

const SRC_DIR = path.resolve("src");
const DIST_DIR = path.resolve("dist");

export default {
  input: path.join(SRC_DIR, "image-map.jquery.js"),
  output: {
    name: "ImageMap",
    banner: copyright,
    file: path.join(DIST_DIR, "image-map.jquery.js"),
    format: "iife",
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
    commonjs(),
    {
      name: "uglify",
      transformBundle (code) {
        const result = minify(code, {
          fromString: true,
          mangle: { toplevel: true },
          output: { max_line_len: 2048, comments: saveLicense },
          compress: { comparisons: true, pure_getters: true, unsafe: true }
        });

        if (!fs.existsSync(DIST_DIR)) {
          fs.mkdirSync(DIST_DIR);
        }

        fs.writeFileSync(path.join(DIST_DIR, "image-map.jquery.min.js"), result.code, "utf8");
      }
    }
  ]
};
