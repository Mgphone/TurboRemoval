const getISOtoGBtime = (time) => {
  const formattedDateandTime = new Date(time).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
  });
  return formattedDateandTime;
};

module.exports = getISOtoGBtime;
