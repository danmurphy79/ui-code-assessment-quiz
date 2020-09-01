const unescape = require("lodash/_unescapeHtmlChar");

export function formatString(string: string) {
  const formattedString = unescape(string);
  return formattedString;
}
