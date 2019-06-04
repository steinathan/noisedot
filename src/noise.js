/**
 * @author Navicstein Rotciv <https://gitlab.com/navicstein/noise>
 * @description Noise is a library that makes it easy to add `noise texture` to your web apps
 * @returns {void}
 */

"use strict";
// import libs
import genNoise from "./generate-noise";
import addCssRule from "./add-css-rule";

export default function noise(el, opts) {
  el = document.querySelector(el);
  if (!el || typeof el === "undefined") {
    console.error(
      `[Noise] Can't mount noise at: "${el}", noise will end here.. `
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
  // hold our noise var passing the options
  let noise = genNoise(opts);

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
    animation += `@${prefixes[pre]}keyframes noise{`;
    for (let key = 0; key < keyFrames.length; key++) {
      let keyVal = keyFrames[key].split(":");
      animation += `${keyVal[0]} {`;
      animation += `${prefixes[pre]} transform: translate(${keyVal[1]})`;
      animation += "}";
    }
    animation += "}";
  }

  //add animation keyframe
  let animationAdded = document.getElementById("noise-animation");
  if (animationAdded) {
    animationAdded.parentElement.removeChild(animationAdded);
  }
  let style = document.createElement("style");
  style.type = "text/css";
  style.id = `noise-animation-${el.id}`;
  style.innerHTML = animation;
  document.body.appendChild(style);

  //add custimozed style
  let rule = `background: url(${noise});`;
  rule += `position: absolute; content:""; height: 300%; width: 300%; left: -100%; top: -100%;`;
  pre = prefixes.length;
  // if the options.animate is true
  if (opts.animate) {
    // add animation frames to loop over the generated pngs
    while (pre--) {
      rule += `${prefixes[pre]} animation-name: noise;`;
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
