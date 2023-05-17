export function parserDataCity(data) {
  const [city] = data.place_name.split(',')
  return {
    city,
    lat: Number(data.geometry.coordinates[1].toFixed(4)),
    lon: Number(data.geometry.coordinates[0].toFixed(3))
  }
}
