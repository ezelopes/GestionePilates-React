export const convertToTitleCase = (str) => {
  // Convert the entire string to lowercase
  const lowerCaseStr = str.toLowerCase();

  // Split the string into words using whitespace as the delimiter
  const words = lowerCaseStr.split(' ');

  // Capitalize the first letter of each word
  const titleCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words back into a single string
  const titleCaseStr = titleCaseWords.join(' ');

  return titleCaseStr;
};
