const getUkTime = async () => {
  try {
    const url = 'https://timeapi.io/api/Time/current/zone?timeZone=Europe/London';
    const response = await fetch(url); // Native fetch (Node 18+)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    const ukTime = result.dateTime; // e.g., "2025-06-02T21:55:00"

    return ukTime;
  } catch (error) {
    console.error('Error fetching getUKTime:', error.message);
    throw error;
  }
};

module.exports = getUkTime;
