export function formatDate(date) {
  const d = new Date(date);
  const monthNumber = d.getMonth() + 1;

  const newDate = new Date();
  newDate.setMonth(monthNumber - 1);

  const day = "" + d.getDate();
  const year = d.getFullYear();

  if (day.length < 2) day = "0" + day;

  return [day, newDate.toLocaleString([], { month: "short" }), year].join(" ");
}
