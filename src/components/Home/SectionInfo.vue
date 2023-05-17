<template>
  <section class="wrapper">
    <v-autocomplete
      :selectedCity="currentWeatherCity.city.city"
      @getCoordinates="handlerGetCoordinates"
    />
    <div class="wrap__btns">
      <div>
        <v-button @click="saveDataCityInLocalStorage" :isCircle="true">
          +
        </v-button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
      <div>
        <v-button :isCircle="true" @click="showDialog">
          <img src="../../assets/images/delete-icon.svg" alt="" />
        </v-button>
      </div>
    </div>
  </section>
  <section class="section-info" v-if="!!currentWeatherCity.id">
    <weather-card :weatherCity="currentWeatherCity.card" />
    <weather-chart :chartData="currentWeatherCity.chart" />
  </section>
  <v-dialog
    v-model:isOpen="isOpenDialog"
    title="Remove city"
    confirmButtonText="Delete"
    cancelButtonText="Cancel"
    @close="isOpenDialog = false"
    @submit="removeCity"
  >
    Are you sure you want to delete the data about this city?
  </v-dialog>
</template>

<script>
import WeatherCard from './Ui/WeatherCard.vue'
import WeatherChart from './UI/WeatherChart.vue'
import VButton from '../Ui/VButton.vue'
import VAutocomplete from '../Ui/VAutocomplete.vue'
import VDialog from '../Ui/VDialog.vue'
import { parserCityObject } from '../../helpers/main/parserCityObject'

export default {
  components: {
    WeatherCard,
    WeatherChart,
    VAutocomplete,
    VButton,
    VDialog
  },
  props: {
    currentIndex: {
      type: Number,
      required: true
    },
    currentWeatherCity: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      errorMessage: '',
      isOpenDialog: false
    }
  },
  methods: {
    handlerGetCoordinates(value) {
      this.$emit('getCoordinates', value, this.currentIndex)
    },
    showDialog() {
      this.isOpenDialog = true
    },
    removeCity() {
      this.$emit('removeWeatherCity', this.currentIndex)
    },
    saveDataCityInLocalStorage() {
      if (!this.currentWeatherCity.city.city) {
        this.errorMessage = 'Change city'
      } else if (localStorage.length === 5) {
        this.errorMessage = 'Выбрано 5 города, удалити лишний город'
      } else {
        localStorage.setItem(
          this.currentWeatherCity.city.city,
          JSON.stringify(parserCityObject(this.currentWeatherCity.city))
        )
      }
      setTimeout(() => {
        this.errorMessage = ''
      }, 2000)
    },
    mounted() {
      console.log(this.currentWeatherCity)
    }
  }
}
</script>

<style scoped>
.section-info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.wrapper {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrap__btns {
  display: flex;
  gap: 16px;
}

img > svg > path {
  stroke: #00668a;
}
</style>
