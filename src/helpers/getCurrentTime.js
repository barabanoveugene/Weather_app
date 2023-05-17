export default function getCurrentTime(date, timeZone) {
  const localOffset = new Date().getTimezoneOffset() * 60000
  const utc = date * 1000 + localOffset
  const currentTime = utc + 1000 * timeZone
  return currentTime
}
