export default function getCitiesFromLocalStorage() {
  const keys = Object.keys(localStorage)
  const data = keys.map((key) => JSON.parse(localStorage.getItem(key)))
  return data
}
