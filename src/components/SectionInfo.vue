<template>
  <section class="wrapper">
    <v-autocomplete 
      v-model="selectCity"
    />
  <div class="wrap__btns">
    <div>
    <v-button @click="saveCity">Add city</v-button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
   </div>
   <div>
    <v-button 
      @click="showDialog"
    >
      Remove city
    </v-button>
   </div>
  </div>
  </section>
  <section class="section-info" v-show="!!weatherCity.id">
    <weather-card :weatherCity="weatherCity.card"/>
    <weather-chart :chartData="weatherCity.chart"/>
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
import WeatherCard from './Ui/WeatherCard.vue';
import WeatherChart from './Ui/WeatherChart.vue';
import VButton from './Ui/VButton.vue';
import VAutocomplete from './Ui/VAutocomplete.vue';
import VDialog from './Ui/VDialog.vue';

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
    weatherCity: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectCity: {
        city: this.weatherCity.city,
        lat: this.weatherCity.lat,
        lon: this.weatherCity.lon,
      },
      errorMessage: '',
      isOpenDialog: false
    }
  },
  methods: {
    showDialog() {
        this.isOpenDialog = true
      },
    removeCity() {
      this.$emit('removeWeatherCity', this.currentIndex)
    },
    saveCity() {
      if (!this.selectCity.city) {
        this.errorMessage = 'Change city'
      } else if (localStorage.length === 5){
        this.errorMessage = 'Выбрано 5 города, удалити лишний город'
      } else {
        console.log(this.selectCity)
        localStorage.setItem(this.selectCity.city, JSON.stringify(this.selectCity))
      }
      setTimeout(() => {
        this.errorMessage = ''
      }, 2000)
    }
  },
  watch: {
    selectCity(newValue) {
      // this.city = newValue
      this.$emit('getCoordinates', newValue, this.currentIndex)
    }
  },
  updated() {
    console.log(this.selectedCity)
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
</style>