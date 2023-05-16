<template>
  <div class="selected__card">
    <div class="selected__card__header">
      <v-tabs @setTypeIndexDay="setTypeIndexDay"/>
      <v-button @click="showDialog">Remove City</v-button>
      <!-- <div class="selected__card__header__action"> -->
        
        <div class="selectes__card__header__text">
          <p>Favorite city</p>
        </div>
      <!-- </div> -->
    </div>
    <div class="selected__card__container">
      <weather-mini-card 
        v-for="card in dataCards"
        :key="card.currentTime"
        :weatherDay="card"
      />
    </div>
    <v-dialog 
      v-model:isOpen="isOpenDialog"
      :confirmButtonText="'Remove city'"
      :title="'Remove city'"
      @close="isOpenDialog = false"
      @submit="removeCity"
    >
      Are you sure you want to delete the data about this city?
    </v-dialog>
  </div>
</template>

<script>
import VTabs from './../Ui/VTabs.vue';
import WeatherMiniCard from './UI/WeatherMiniCard.vue';
import VButton from './../Ui/VButton.vue';
import VDialog from './../Ui/VDialog.vue';

export default {
  components: {
    VTabs,
    WeatherMiniCard,
    VButton,
    VDialog
    
  },
  data() {
    return {
      typeDay: 1,
      isOpenDialog: false
    }
  },
  props: {
    weatherSelectedCity: {
      type: Object,
      default: () => {},
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    showDialog() {
        this.isOpenDialog = true
      },
    removeCity() {
      this.$emit('removeFavoriteCity', this.index)
    },
    setTypeIndexDay(index) {
      this.typeDay = index
    }
  },
  computed: {
    dataCards () {
      if (this.typeDay === 1) {
        return [this.weatherSelectedCity['dayWeather']]
      }
      if (this.typeDay === 5) {
        return this.weatherSelectedCity['dailyWeather']
      }
      return []
    }
  },
  mounted() {
    console.log(this.weatherSelectedCity)
  }
  
}
</script>

<style scoped>
.selected__card {
  width: 100%;
  background: #00668a;
  padding: 8px;
  margin-top: 20px;
}
.selected__card__header {
  display: flex;
}
.selected__card__container {
  display: flex;
  gap: 24px;
  justify-content: space-around;
}

.selected__card__header__action {
  display: flex;
}
.selectes__card__header__text {
  padding: 8px 15px;
  color: #fff;
}
</style>