const outOfHour = (date) => {
  const getDate = new Date(date);
  const getTime = getDate.getHours();
  if (getTime === 6 || getTime === 19 || getTime === 20) {
    return true;
  }
  return false;
};
module.exports = outOfHour;
