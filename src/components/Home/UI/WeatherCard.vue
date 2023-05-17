<template>
  <div class="card">
    <div class="card__weather">
      <div class="card__weather__current">
        <img
          class="card__weather__picture"
          :src="`http://openweathermap.org/img/wn/${weatherCity.icon}@2x.png`"
          alt=""
        />
        <p>{{ weatherCity.currentDeg }}°</p>
      </div>
      <div class="card__weather__data">
        <p>Humidity: {{ `${weatherCity.humidity}%` }}</p>
        <p>Wind speed: {{ weatherCity.windSpeed }}km/h</p>
        <p>Feel likes: {{ weatherCity.currentFeelLikes }}</p>
      </div>
    </div>
    <div class="card__data__city">
      <p>{{ weatherCity.city }}</p>
      <p>{{ weatherCity.currentDay }}</p>
      <p>{{ weatherCity.currentTime }}</p>
      <p>{{ weatherCity.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weatherCity: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  max-width: 1000px;
  width: 100%;
  background: #00668a;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  color: #fff;
  margin: 0 auto;
}
.card__weather {
  display: flex;
  gap: 30px;
}
.card__weather__current {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 400;
}
.card__weather__picture {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.card__weather__data {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  justify-content: center;
}
.card__data__city {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

@media (max-width: 768px) {
  .card__weather__picture {
    width: 50px;
    height: 50px;
  }
  .card {
    padding: 10px;
  }
  .card__weather {
    gap: 12px;
  }
}
</style>
