<template>
  <div class="selected__card">
    <div class="selected__card__header">
      <div class="selected__card__header__action">
        <v-tabs @setTypeIndexDay="setTypeIndexDay" />
        <v-button @click="showDialog" :isHoverGray="true"> Remove City </v-button>
      </div>
      <div class="selectes__card__header__text">
        <p>Selected city: {{ weatherSelectedCity.city.city }}</p>
      </div>
    </div>
    <div class="selected__card__container" :class="{ selected__card: isSingleCard }">
      <weather-mini-card
        v-for="card in dataCards"
        :key="card.currentTime"
        :weatherDay="card"
        :isSingle="isSingleCard"
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
import VTabs from './../Ui/VTabs.vue'
import WeatherMiniCard from './UI/WeatherMiniCard.vue'
import VButton from './../Ui/VButton.vue'
import VDialog from './../Ui/VDialog.vue'

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
    currentIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    showDialog() {
      this.isOpenDialog = true
    },
    removeCity() {
      const cityName = this.weatherSelectedCity.city.city
      this.$emit('removeFavoriteCity', this.currentIndex, cityName)
    },
    setTypeIndexDay(index) {
      this.typeDay = index
    }
  },
  computed: {
    dataCards() {
      if (this.typeDay === 1) {
        return [this.weatherSelectedCity['dayWeather']]
      }
      if (this.typeDay === 5) {
        return this.weatherSelectedCity['dailyWeather']
      }
      return []
    },
    isSingleCard() {
      return this.dataCards.length === 1
    }
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
  justify-content: space-between;
}
.selected__card__container {
  display: flex;
  justify-content: space-around;
}
.selected__card {
  display: block;
}

.selected__card__header__action {
  display: flex;
  gap: 100px;
}
.selectes__card__header__text {
  padding: 8px 15px;
  color: #fff;
  font-size: 20px;
}
</style>
