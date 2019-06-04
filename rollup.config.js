import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default [
  // browser-friendly UMD build
  {
    // This package is called `noisedot` because of some conflicting package on npm
    input: "src/noisedot.js",
    output: {
      name: "noisedot",
      comment: "// Navicstein Rotciv <https://gitlab.com/navicstein>",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve(),
      commonjs(),

      babel({
        exclude: "node_modules/**",
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/noisedot.js",
    external: [],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
