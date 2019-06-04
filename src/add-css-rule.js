export default (sheet, selector, rules, index) => {
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
