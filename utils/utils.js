export const truncate = (content) => {
  if (content.length <= 10) return content;
  return content.substring(0, 10) + "...";
};

export const getRandom = () => {
  return Math.floor(Math.random() * 10000);
};

export const noteDateTimeComparator = (a, b) => {
  const dateTimeA = new Date(a.updated_at);
  const dateTimeB = new Date(b.updated_at);
  return dateTimeB - dateTimeA;
};
