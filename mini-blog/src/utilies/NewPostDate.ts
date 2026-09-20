export const isNewPost = (date: Date): boolean => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(
    now.getTime() - 24 * 60 * 60 * 1000
  );

  return date >= twentyFourHoursAgo;
};