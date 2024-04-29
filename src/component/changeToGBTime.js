export default function changeToGBTime(time) {
  const dateObj = new Date(time);
  const formattedDateandTime = dateObj.toLocaleString("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
  });
  return formattedDateandTime;
}
