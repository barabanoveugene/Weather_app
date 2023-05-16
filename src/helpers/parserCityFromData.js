export default function parserCityFromData (str) {
  return str.split('/')[1].replace(/[-_]/g, ' ')
}