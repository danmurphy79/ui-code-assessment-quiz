import { unescape } from "lodash";
export function formatString(string: string) {
  const formattedString = unescape(string);
  return formattedString;
}
