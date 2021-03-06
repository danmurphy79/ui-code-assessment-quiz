import { unescape } from "lodash";

export function formatString(string: string): string {
  // edge case - &#039; isn't converted by _.unescape()
  if (string.includes("&#039;")) {
    const apostropheString = string.replace(/&#039;/g, "&#39;");

    return unescape(apostropheString);
  }

  const formattedString = unescape(string);
  return formattedString;
}

export function getAllAnswers(
  type: string,
  wrong: string[],
  right: string
): string[] {
  if (type !== "text") {
    return wrong.concat(right);
  }
  return [];
}
