export default (sheet, selector, rules, index) => {
  let ins = "";
  selector && selector.length
    ? (ins = `${selector} { ${rules} }`)
    : (ins = rules);
  if ("insertRule" in sheet) {
    sheet.insertRule(ins, index);
  } else {
    sheet.addRule(selector, rules, index);
  }
};
