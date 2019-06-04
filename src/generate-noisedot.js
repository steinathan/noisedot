/**
 * @author Navicstein Rotciv <https://gitlab.com/navicstein/noisedot>
 * @description noisedot is a library that makes it easy to add `noisedot texture` to your web apps
 * @returns {void}
 */

// Main function to generate `canvased` pngs
export default options => {
  let canvas, context, w, h;
  canvas = document.createElement("canvas");
  context = canvas.getContext("2d");
  canvas.width = options.patternWidth;
  canvas.height = options.patternHeight;
  for (w = 0; w < options.patternWidth; w += options.grainDensity) {
    for (h = 0; h < options.patternHeight; h += options.grainDensity) {
      let rgb = (Math.random() * 256) | 0;
      context.fillStyle = `rgba(${[
        rgb,
        rgb,
        rgb,
        options.grainOpacity,
      ].join()})`;
      context.fillRect(w, h, options.grainWidth, options.grainHeight);
    }
  }
  return canvas.toDataURL("image/png");
};
