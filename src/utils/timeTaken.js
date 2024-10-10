const timeTakenInSeconds = (startTime, endTime) => {
  // Convert startTime and endTime to Date objects if they are not already
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Calculate the difference in milliseconds
  const timeDifference = end - start;

  // Convert the difference to seconds
  const totalSeconds = Math.floor(timeDifference / 1000);

  return totalSeconds;
};

export default timeTakenInSeconds;
