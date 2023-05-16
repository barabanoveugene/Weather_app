export function parserDataCity (data) {
  const [city] = data.place_name.split(",")
  console.log(data)
  return {
    city,
    lat: data.geometry.coordinates[1],
    lon: data.geometry.coordinates[0]
  }
}