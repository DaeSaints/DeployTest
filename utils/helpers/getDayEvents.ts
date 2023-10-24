import dayjs from "dayjs";

export function getDaysOfTheEvent(
  startDate: Date,
  days: string[]
) {
  const result = [];
  let currentDate = dayjs(startDate);
  let endDate = new Date()
  endDate.setFullYear(endDate.getFullYear() + 1);
  
  const CONVERT: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const convertedDays = days.map((d) => CONVERT[d]);

  while (currentDate.isBefore(endDate)) {
    if (convertedDays.includes(currentDate.day())) {
      result.push(currentDate.format("YYYY-MM-DD"));
    }
    currentDate = currentDate.add(1, "day");
  }

  return result;
}
