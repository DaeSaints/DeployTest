function getDaysInMonth(month: number, year: number): Date[] {
  let date = new Date(year, month, 1);
  let days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const isSundayFirstDate = days[0].getDay() === 0;
  if (isSundayFirstDate) {
  } else {
    const temp = getDaysStartingFromSunday(days[0]);
    let index = -1;
    const temp1 = temp.find((d, i) => {
      if (d.getDate() === 1) {
        index = i;
      }
    });
    const toRemove = 7 - index;
    temp.splice(0, toRemove);
    days = [...temp, ...days];
  }
  return days;
}

function getDaysStartingFromSunday(date: Date): Date[] {
  let startDate = new Date(date);
  const days: Date[] = [];

  // Go to the previous Sunday
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  // Add all days in the week to the array
  for (let i = 0; i < 7; i++) {
    days.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return days;
}

function groupDaysIntoWeeks(days: Date[]): Date[][] {
  return days.reduce((weeks: Date[][], day: Date, i: number) => {
    if (i % 7 === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(day);
    return weeks;
  }, []);
}

export function getWeeksAndDaysInMonth(month: number, year: number): Date[][] {
  let days = getDaysInMonth(month, year);
  let weeks = groupDaysIntoWeeks(days);
  return weeks;
}

export function getDayOfWeek(date: Date): string {
  const weekdays: string[] = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
  ];
  const dayNumber: number = date.getDay();
  return weekdays[dayNumber];
}

export function getMonthName(date: Date): string {
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[date.getMonth()];
}
