<template>
  <section class="wrapper">
    <v-autocomplete v-model="selectCity" :options="cities"/>
   <div>
    <v-button @click="saveCity">Add city</v-button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
   </div>
  </section>
</template>

<script>
import VButton from './Ui/VButton.vue';
import VAutocomplete from './Ui/VAutocomplete.vue';
import { mockedCity } from '../mocked/mockedCity';

export default {
  components: {
    VAutocomplete,
    VButton
  },
  data() {
    return {
      selectCity: {},
      cities: mockedCity,
      city: {},
      errorMessage: ''
    }
  },
  methods: {
    saveCity() {
      if (Object.keys(this.city).length === 0) {
        this.errorMessage = 'Change city'
      } else if (localStorage.length === 5){
        this.errorMessage = 'Выбрано 5 города, удалити лишний город'
      } else {
        localStorage.setItem(this.city.name, JSON.stringify(this.city))
      }
      setTimeout(() => {
        this.errorMessage = ''
      }, 2000)
    }
  },
  watch: {
    selectCity(newValue) {
      this.city = newValue
      this.$emit('getCoordinates', newValue)
    }
  },
  
}
</script>
  
<style scoped>
  .wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>