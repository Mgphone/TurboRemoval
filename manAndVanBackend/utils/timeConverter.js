const timeConverter = (time) => {
  const distanceInHour = Math.floor(time / 3600).toFixed(2);
  const distanceInMinute = Math.floor((time % 3600) / 60).toFixed(2);
  return `${distanceInHour}hr : ${distanceInMinute}Min`;
};
module.exports = timeConverter;
