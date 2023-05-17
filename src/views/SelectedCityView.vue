<template>
  <div class="selected__city" v-if="!isLoading">
    <selected-city-card
      v-for="(weatherSelectedCity, index) in weatherCitiesSelected"
      :key="index"
      :weatherSelectedCity="weatherSelectedCity"
      @removeFavoriteCity="removeFavoriteCity"
      :current-index="index"
    />
  </div>
</template>

<script>
import axios from 'axios'
import getCitiesFromLocalStorage from '../helpers/getCitiesFromLocalStorage'
import { parserForSelectedCity } from '../helpers/selectedCities/parserForSelectedCity'
import SelectedCityCard from '../components/SelectedCities/SelectedCityCard.vue'

export default {
  components: {
    SelectedCityCard
  },
  data() {
    return {
      weatherCitiesSelected: [],
      isLoading: false
    }
  },
  methods: {
    removeFavoriteCity(index, cityName) {
      localStorage.removeItem(cityName)
      console.log(index)
      this.weatherCitiesSelected = [
        ...this.weatherCitiesSelected.slice(0, index),
        ...this.weatherCitiesSelected.slice(index + 1)
      ]
    },
    async fetchAllCities() {
      this.isLoading = true
      const searchQueryCities = getCitiesFromLocalStorage()
      try {
        const urls = searchQueryCities.map((city) => {
          return axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
          )
        })
        const responses = await axios.all(urls)
        const parseData = responses.map((response) => {
          return parserForSelectedCity(response.data, searchQueryCities)
        })
        this.weatherCitiesSelected = parseData
        console.log(this.weatherCitiesSelected)
        console.log(responses)
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.fetchAllCities()
  }
}
</script>

<style>
.selected__city {
  display: flex;
  flex-direction: column;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
