/**
 * array of colours with tailwindcss styling for userTheme
 * @author Sriram Sundar
 *
 * @type {string[]}
 */
export const colours: string[] = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
];

//TODO: add more and better colours

/**
 * get colour based on index chosen with tailwindcss styling,
 * defaults to index 0 if index is out of bounds of colors array
 *
 * @author Sriram Sundar
 *
 * @param {number} colour
 * @returns {string}
 */
export const getColour = (colour: number): string => {
  if (colour >= 0 && colour < colours.length) {
    return colours[colour];
  }
  return colours[0];
};
