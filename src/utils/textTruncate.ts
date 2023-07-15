export const textTruncate = (text: string, maxLength: number) => {
  if (!text || typeof text !== "string") {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  const words = text.split(" ");

  let truncated = "";

  for (const word of words) {
    if ((truncated + word + " ").length > maxLength) {
      break;
    }
    truncated += word + " ";
  }

  truncated = truncated.trim() + "...";

  return truncated;
};
