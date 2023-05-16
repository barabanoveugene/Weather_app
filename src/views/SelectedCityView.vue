<template>
  <div class="selected__city" v-if="!isLoading">
    <selected-city-card 
      v-for="(weatherSelectedCity, index) in weatherCitiesSelected"
      :key="index"
      :weatherSelectedCity="weatherSelectedCity"
      :removeFavoriteCity="removeFavoriteCity"
      :index='index'
    />
  </div>
</template>

<script>
import axios from 'axios';
import getCitiesFromLocalStorage from '../helpers/getCitiesFromLocalStorage';
import {dataParser} from '../helpers/dataParser';
import {parserForSelectedCity} from '../helpers/parserForSelectedCity';
import SelectedCityCard from '../components/SelectedCities/SelectedCityCard.vue';

export default {
  components: {
    SelectedCityCard
  },
  data () {
    return {
      weatherCitiesSelected: [],
      isLoading: false
    }
  },
  methods: {
    removeFavoriteCity(index) {
      console.log(index)
    },
    async fetchAllCities() {
      this.isLoading = true
      const cities = getCitiesFromLocalStorage();
      try {
        const urls = cities.map((city) => {
          return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`)
        })
        const responses = await axios.all(urls);
        const parseData = responses.map((response) => {
          return parserForSelectedCity(response.data)
        })
        this.weatherCitiesSelected = parseData
        this.isLoading = false
        console.log(responses)
        console.log(parseData)
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
