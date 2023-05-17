<template>
  <main class="main">
    <div class="main-header">
      <v-button @click="addNewCity"> Add city </v-button>
    </div>
    <section-info
      v-for="(weatherCity, index) in weatherCities"
      :currentIndex="index"
      :key="weatherCity.id"
      :currentWeatherCity="weatherCity"
      @removeWeatherCity="removeWeatherCity"
      @getCoordinates="getCoordinatesCity"
    />
    <v-loader :loading="isLoading" />
  </main>
</template>

<script>
import SectionInfo from '../components/Home/SectionInfo.vue'
import axios from 'axios'
import { dataParserWeatherCities } from '../helpers/main/dataParserWeatherCities'
import VButton from '../components/Ui/VButton.vue'
import VLoader from '../components/Ui/VLoader.vue'

const key = '7efa332cf48aeb9d2d391a51027f1a71'

const initValue = {
  id: '',
  city: '',
  lat: '',
  lon: '',
  card: {
    city: '',
    currentTime: '',
    currentDay: '',
    currentDeg: '',
    currentFeelLikes: '',
    description: '',
    icon: '',
    windSpeed: '',
    humidity: ''
  },
  chart: []
}
export default {
  components: {
    SectionInfo,
    VButton,
    VLoader
  },
  data() {
    return {
      weatherCities: [initValue],
      errorAddCity: '',
      isLoading: false
    }
  },
  methods: {
    getCoordinatesCity(infoCity, index) {
      console.log(infoCity, index)
      this.loadDataWeather(infoCity, index)
    },
    removeWeatherCity(index) {
      this.weatherCities = [
        ...this.weatherCities.slice(0, index),
        ...this.weatherCities.slice(index + 1)
      ]
    },

    async loadDataWeather(dataCity, index) {
      this.isLoading = true
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${dataCity.lat}&lon=${dataCity.lon}&exclude={part}&appid=${key}&units=imperial`
        )

        const data = dataParserWeatherCities(response.data, dataCity)
        this.weatherCities = [
          ...this.weatherCities.slice(0, index),
          data,
          ...this.weatherCities.slice(index + 1)
        ]
        this.isLoading = false
        console.log(this.weatherCities)
      } catch (error) {
        console.log(error)
      }
    },
    addNewCity() {
      if (this.weatherCities.length === 5) {
        this.errorAddCity =
          'Добавлено 5 городав, чтобы добавить еще один город удалите город'
        console.log(this.errorAddCity)
        return
      }
      this.weatherCities.unshift(initValue)
    }
  },
  updated() {
    if (this.weatherCities.length === 0) {
      this.weatherCities = [...this.weatherCities, initValue]
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
</style>
