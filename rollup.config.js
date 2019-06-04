import pkg from "./package.json";
import babel from "rollup-plugin-babel";
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
      babel({
        exclude: "node_modules/**",
      }),
    ],
  },
];
