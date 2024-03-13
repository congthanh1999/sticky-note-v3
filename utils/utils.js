export const truncate = (content) => {
  if (content.length < 10) return content;
  return content.substring(0, 10) + "...";
};

export const getRandom = () => {
  return Math.floor(Math.random() * 10000);
};
