export const cleanText = (text: string) => {
  let cleanedText = text.replace(/\p{Cc}/gu, "");

  cleanedText = cleanedText.replace(
    /([\u4E00-\u9FFF])\s+([\u4E00-\u9FFF])/g,
    "$1$2"
  );

  cleanedText = cleanedText.replace(/[ \t]+/g, " ");

  cleanedText = cleanedText.replace(/[\r\n]+/g, "\n");

  cleanedText = cleanedText.trim();

  return cleanedText;
};

export const splitTextIntoChunks = (text: string, chunkSize: number) => {
  const chunks = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    let endIndex = currentIndex + chunkSize;
    if (endIndex > text.length) {
      endIndex = text.length;
    }
    chunks.push(text.slice(currentIndex, endIndex));
    currentIndex = endIndex;
  }

  return chunks;
};