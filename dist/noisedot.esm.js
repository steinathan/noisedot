/**
 * @author Navicstein Rotciv <https://gitlab.com/navicstein/noisedot>
 * @description noisedot is a library that makes it easy to add `noisedot texture` to your web apps
 * @returns {void}
 */

// Main function to generate `canvased` pngs
var gennoisedot = options => {
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

var addCssRule = (sheet, selector, rules, index) => {
  let ins = "";
  selector && selector.length
    ? (ins = `${selector} { ${rules} }`)
    : (ins = rules);
  // if `insertRule` is already in `sheet`
  "insertRule" in sheet
    ? // insert the rule
      sheet.insertRule(ins, index)
    : // just add rule
      sheet.addRule(selector, rules, index);
};

// TODO: add custom `css` filters for

function noisedot(el, opts) {
  el = document.querySelector(el);
  if (!el || typeof el === "undefined") {
    console.error(
      `[noisedot] Can't mount noisedot at: "${el}", noisedot will end here.. `
    );
    return;
  }
  //set style for parent element
  if (el.style.position !== "absolute") {
    el.style.position = "relative";
    el.style.zIndex = "-1";
  }
  el.style.overflow = "hidden";

  let prefixes = Array("", "-moz-", "-o-animation-", "-webkit-", "-ms-");

  // Default options in case none was provided
  opts = opts || {
    animate: true,
    patternWidth: 100,
    patternHeight: 100,
    grainOpacity: 0.1,
    grainDensity: 1,
    grainWidth: 1,
    grainHeight: 1,
    grainChaos: 0.5,
    grainSpeed: 20,
  };
  // hold our noisedot var passing the options
  let noisedot = gennoisedot(opts);

  let animation = "",
    keyFrames = [
      "0%:-10%,10%",
      "10%:-25%,0%",
      "20%:-30%,10%",
      "30%:-30%,30%",
      "40%::-20%,20%",
      "50%:-15%,10%",
      "60%:-20%,20%",
      "70%:-5%,20%",
      "80%:-25%,5%",
      "90%:-30%,25%",
      "100%:-10%,10%",
    ];

  var pre = prefixes.length;
  while (pre--) {
    animation += `@${prefixes[pre]}keyframes noisedot{`;
    for (let key = 0; key < keyFrames.length; key++) {
      let keyVal = keyFrames[key].split(":");
      animation += `${keyVal[0]} {`;
      animation += `${prefixes[pre]} transform: translate(${keyVal[1]})`;
      animation += "}";
    }
    animation += "}";
  }

  //add animation keyframe
  let animationAdded = document.getElementById("noisedot-animation");
  if (animationAdded) {
    animationAdded.parentElement.removeChild(animationAdded);
  }
  let style = document.createElement("style");
  style.type = "text/css";
  style.id = `noisedot-animation-${el.id}`;
  style.innerHTML = animation;
  document.body.appendChild(style);

  //add custimozed style
  let rule = `background: url(${noisedot});`;
  rule += `position: absolute; content:""; height: 300%; width: 300%; left: -100%; top: -100%;`;
  pre = prefixes.length;
  // if the options.animate is true
  if (opts.animate) {
    // add animation frames to loop over the generated pngs
    while (pre--) {
      rule += `${prefixes[pre]} animation-name: noisedot;`;
      rule += `${prefixes[pre]} animation-iteration-count: infinite;`;
      rule += `${prefixes[pre]} animation-duration: ${opts.grainChaos}s;`;
      rule += `${prefixes[pre]} animation-timing-function: steps(${
        opts.grainSpeed
      }, end);`;
    }
  }

  let selectorElement = "#" + el.id + "::before";
  addCssRule(style.sheet, selectorElement, rule);
  /** May the source-map be with you! **/
}

export default noisedot;
