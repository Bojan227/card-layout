export function formatDate(date) {
  const d = new Date(date);
  let monthNumber = d.getMonth() + 1;

  const newDate = new Date();
  newDate.setMonth(monthNumber - 1);

  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (day.length < 2) day = "0" + day;

  return [day, newDate.toLocaleString([], { month: "short" }), year].join(" ");
}
