(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.noisedot = factory());
}(this, function () { 'use strict';

  /**
   * @author Navicstein Rotciv <https://gitlab.com/navicstein/noisedot>
   * @description noisedot is a library that makes it easy to add `noisedot texture` to your web apps
   * @returns {void}
   */
  // Main function to generate `canvased` pngs
  var gennoisedot = (function (options) {
    var canvas, context, w, h;
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = options.patternWidth;
    canvas.height = options.patternHeight;

    for (w = 0; w < options.patternWidth; w += options.grainDensity) {
      for (h = 0; h < options.patternHeight; h += options.grainDensity) {
        var rgb = Math.random() * 256 | 0;
        context.fillStyle = "rgba(".concat([rgb, rgb, rgb, options.grainOpacity].join(), ")");
        context.fillRect(w, h, options.grainWidth, options.grainHeight);
      }
    }

    return canvas.toDataURL("image/png");
  });

  var addCssRule = (function (sheet, selector, rules, index) {
    var ins = "";
    selector && selector.length ? ins = "".concat(selector, " { ").concat(rules, " }") : ins = rules; // if `insertRule` is already in `sheet`

    "insertRule" in sheet ? // insert the rule
    sheet.insertRule(ins, index) : // just add rule
    sheet.addRule(selector, rules, index);
  }); // TODO: add custom `css` filters for

  function noisedot(el, opts) {
    el = document.querySelector(el);

    if (!el || typeof el === "undefined") {
      console.error("[noisedot] Can't mount noisedot at: \"".concat(el, "\", noisedot will end here.. "));
      return;
    } //set style for parent element


    if (el.style.position !== "absolute") {
      el.style.position = "relative";
      el.style.zIndex = "-1";
    }

    el.style.overflow = "hidden";
    var prefixes = Array("", "-moz-", "-o-animation-", "-webkit-", "-ms-"); // Default options in case none was provided

    opts = opts || {
      animate: true,
      patternWidth: 100,
      patternHeight: 100,
      grainOpacity: 0.1,
      grainDensity: 1,
      grainWidth: 1,
      grainHeight: 1,
      grainChaos: 0.5,
      grainSpeed: 20
    }; // hold our noisedot var passing the options

    var noisedot = gennoisedot(opts);
    var animation = "",
        keyFrames = ["0%:-10%,10%", "10%:-25%,0%", "20%:-30%,10%", "30%:-30%,30%", "40%::-20%,20%", "50%:-15%,10%", "60%:-20%,20%", "70%:-5%,20%", "80%:-25%,5%", "90%:-30%,25%", "100%:-10%,10%"];
    var pre = prefixes.length;

    while (pre--) {
      animation += "@".concat(prefixes[pre], "keyframes noisedot{");

      for (var key = 0; key < keyFrames.length; key++) {
        var keyVal = keyFrames[key].split(":");
        animation += "".concat(keyVal[0], " {");
        animation += "".concat(prefixes[pre], " transform: translate(").concat(keyVal[1], ")");
        animation += "}";
      }

      animation += "}";
    } //add animation keyframe


    var animationAdded = document.getElementById("noisedot-animation");

    if (animationAdded) {
      animationAdded.parentElement.removeChild(animationAdded);
    }

    var style = document.createElement("style");
    style.type = "text/css";
    style.id = "noisedot-animation-".concat(el.id);
    style.innerHTML = animation;
    document.body.appendChild(style); //add custimozed style

    var rule = "background: url(".concat(noisedot, ");");
    rule += "position: absolute; content:\"\"; height: 300%; width: 300%; left: -100%; top: -100%;";
    pre = prefixes.length; // if the options.animate is true

    if (opts.animate) {
      // add animation frames to loop over the generated pngs
      while (pre--) {
        rule += "".concat(prefixes[pre], " animation-name: noisedot;");
        rule += "".concat(prefixes[pre], " animation-iteration-count: infinite;");
        rule += "".concat(prefixes[pre], " animation-duration: ").concat(opts.grainChaos, "s;");
        rule += "".concat(prefixes[pre], " animation-timing-function: steps(").concat(opts.grainSpeed, ", end);");
      }
    }

    var selectorElement = "#" + el.id + "::before";
    addCssRule(style.sheet, selectorElement, rule);
    /** May the source-map be with you! **/
  }

  return noisedot;

}));
