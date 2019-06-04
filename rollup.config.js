import pkg from "./package.json";
import babel from "rollup-plugin-babel";
export default [
  // browser-friendly UMD build
  {
    input: "src/noise.js",
    output: {
      name: "noise",
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
