export type TimezoneType = "Asia/Manila" | "Asia/Tokyo";
export function FormattedLocaleString(timeZone: string, date: Date) {
  return date.toLocaleString("en-US", { timeZone });
}

export function convertToTimeZone(
  inputDate: Date,
  timeZoneAbbreviation: keyof typeof timeZoneOffsets
) {
  const inputDateCopy = new Date(inputDate);
  const timeZoneOffset = timeZoneOffsets[timeZoneAbbreviation];
  inputDateCopy.setHours(inputDateCopy.getHours() + timeZoneOffset);
  return inputDateCopy;
}

export const timeZoneOffsets = {
  ET: -5,
  CT: -6,
  MT: -7,
  PT: -8,
  EET: 2,
  CET: 1,
  AEST: 10,
  IST: 5.5,
  JST: 9,
};
