export const addWeeks = (date: Date, weeks: number) => {
  const copyDate = new Date(date);
  copyDate.setDate(date.getDate() + 7 * weeks);
  return copyDate;
};
