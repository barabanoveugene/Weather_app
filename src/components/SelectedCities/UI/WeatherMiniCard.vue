<template>
  <div class="card-mini">
    <p>{{ weatherDay.currentDay }}</p>
    <img
        class="card__weather__picture"
        :src="`http://openweathermap.org/img/wn/${weatherDay.icon}@2x.png`"
        alt=""
      />
    <p>Min: {{ weatherDay.temp_min }}°</p>
    <p>Max: {{ weatherDay.temp_max }}°</p>
    <p>{{ weatherDay.description }}</p>
    <p>Speed wind: {{ weatherDay.windSpeed }}km/h</p>
    <p>Humidity: {{ weatherDay.humidity }}%</p>
  </div>
</template>

<script>
export default {
  props: {
    weatherDay: {
      type: Object
    }
  },
  mounted() {
    console.log('miniCard')
    console.log(this.weatherDay)
  }
  
}
</script>

<style scoped>
  .card-mini {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #fff;
    background: #00668a;
  }
</style>