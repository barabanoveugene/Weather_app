<template>
  <div class="card__single" v-if="isSingle">
    <div class="card__single__img">
      <p>{{ weatherDay.currentDay }}</p>
      <img
        class="card__weather__picture"
        :src="`http://openweathermap.org/img/wn/${weatherDay.icon}@2x.png`"
        alt=""
      />
    </div>
    <div class="card__single__info">
      <p>Temp: {{ weatherDay.currentDeg }}°</p>
      <p>Feel like: {{ weatherDay.currentFeelLikes }}°</p>
      <p>{{ weatherDay.description }}</p>
      <p>Speed wind: {{ weatherDay.windSpeed }}km/h</p>
      <p>Humidity: {{ weatherDay.humidity }}%</p>
    </div>
  </div>
  <div class="card__many" v-else>
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
    },
    isSingle: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
.card__single {
  padding: 15px 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  color: #fff;
  background: #00668a;
}
.card__single__img {
  display: flex;
  flex-direction: column;
}
.card__single__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card__many {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #fff;
  background: #00668a;
}
</style>
