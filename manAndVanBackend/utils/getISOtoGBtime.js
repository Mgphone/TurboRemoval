const getISOtoGBtime = (time) => {
  const formattedDateandTime = new Date(time).toLocaleString("en-GB", {
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
  // return time;
};

module.exports = getISOtoGBtime;
