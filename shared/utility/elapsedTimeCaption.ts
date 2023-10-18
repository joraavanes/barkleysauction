import moment from "moment";

export const elapsedTimeCaption = (timestamp: number) => {
  const currentTime = moment();

  const minutes = currentTime.diff(timestamp, "minutes");
  const hours = currentTime.diff(timestamp, "hours");
  const days = currentTime.diff(timestamp, "days");
  const weeks = currentTime.diff(timestamp, "weeks");

  if (weeks) return weeks == 1 ? `a week ago` : `${weeks} weeks ago`;
  if (days) return days == 1 ? `a day ago` : `${days} days ago`;
  if (hours) return hours == 1 ? `an hour ago` : `${hours} hours ago`;
  if (minutes) return minutes == 1 ? `a minute ago` : `${minutes} minutes ago`;

  return "a few moments ago";
};