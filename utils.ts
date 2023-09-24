export const shuffled = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const quotes = (str: string = "") => {
  str = str.replace(/&quot;|&#039;/g, function (match) {
    if (match === "&quot;") return '"';
    if (match === "&#039;") return "'";
    return match;
  });
  return str;
};
