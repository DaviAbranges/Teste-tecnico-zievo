export const generateYearRange = (
  startYear: number,
  endYear: number,
): string[] => {
  const years = [];
  for (let year = startYear; year >= endYear; year--) {
    years.push(String(year));
  }
  return years;
};
