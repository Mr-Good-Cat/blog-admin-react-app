export const compareCaseInsensitive = (a, b) => {
  return a.toLowerCase() === b.toLowerCase();
};

export function removeSpaces(str) {
  return str.replace(/\s/g, "");
}
