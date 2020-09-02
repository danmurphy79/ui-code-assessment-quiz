import { unescape, replace } from "lodash";

export function formatString(string: string) {
  // edge case - &#039; isn't converted by _.unescape()
  if (string.includes("&#039;")) {
    const apostropheString = replace(string, "&#039;", "&#39;");
    return unescape(apostropheString);
  }

  const formattedString = unescape(string);
  return formattedString;
}
