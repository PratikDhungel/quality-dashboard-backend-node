exports.getFormattedUTCTime = () => {
  let dateObj = new Date();

  // Change current local time to UTC
  let utc_offset = dateObj.getTimezoneOffset();
  dateObj.setMinutes(dateObj.getMinutes() + utc_offset);

  // Get values from the date object to be used for the formatted time
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 4;
  let date = dateObj.getDate();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();

  if (month < 10) {
    month = `0${month}`;
  }

  if (date < 10) {
    date = `0${date}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // Format date time
  let currentUTCDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  return currentUTCDateTime;
};
