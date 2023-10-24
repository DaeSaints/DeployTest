export function getDateAway(today: Date, away: Date) {
  let timeToDisplay = "";
  // Calculate the time difference in milliseconds
  //   @ts-ignore
  const timeDifference: any = today - away;

  if (timeDifference < 1000 * 60 * 60) {
    return timeToDisplay;
  } else if (timeDifference < 1000 * 60 * 60 * 24) {
    timeToDisplay = `${Math.floor(timeDifference / (1000 * 60 * 60))} hr`;
  } else {
    timeToDisplay = `${Math.floor(timeDifference / (1000 * 60 * 60 * 24))} d`;
  }

  return timeToDisplay;
}
