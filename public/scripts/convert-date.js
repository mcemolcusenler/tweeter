//this will convert to mm stamp into a date format and export it
function convertToDate(dateMmStamp) {
  dateString = moment(dateMmStamp).format("YYYY-MM-DD HH:mm");
  var minutesAgo = moment().diff(dateString, 'minutes');
  var hoursAgo = moment().diff(dateString, 'hours');
  var daysAgo = moment().diff(dateString, 'days');
  console.log('minutesAgo:', minutesAgo, 'hoursAgo:', hoursAgo, 'daysAgo:', daysAgo);
  if (minutesAgo <= 1) {
    return `around 1 minute ago`;
  } else if (minutesAgo < 60) {
    return `around ${minutesAgo} minutes ago`;
  } else if (hoursAgo == 1) {
    return `around an hour ago`;
  } else if (hoursAgo < 24) {
    return `around ${hoursAgo} hours ago`;
  } else if (daysAgo == 1) {
    return `around a day ago`;
  } else if (1 < daysAgo) {
    return `around ${daysAgo} days ago`;
  }
}


