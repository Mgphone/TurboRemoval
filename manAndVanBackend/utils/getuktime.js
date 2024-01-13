// http://worldtimeapi.org/api/timezone/Europe/London

const getUkTime = async () => {
  try {
    const url = "http://worldtimeapi.org/api/timezone/Europe/London";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request Error${response.status}`);
    }
    const result = await response.json();
    const ukTime = result.utc_datetime;
    return ukTime;
  } catch (error) {
    console.error("Error fetching getUKTime", error.message);
    throw error;
  }
};

module.exports = getUkTime;
