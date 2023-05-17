<template>
  <div class="autocomplete" ref="autocomplete">
    <input
      type="text"
      v-model="searchQuery"
      @input="getSearchResults"
      placeholder="Search for a city or state"
      class="input"
    />
    <ul class="autocomplete__list" v-if="mapboxSearchResults">
      <p class="autocomplete__error" v-if="searchError">
        Sorry, something went wrong, please try again.
      </p>
      <p class="autocomplete__error" v-if="!searchError && mapboxSearchResults.length === 0">
        No results match your query, try a different term.
      </p>
      <template v-else>
        <li
          v-for="searchResult in mapboxSearchResults"
          :key="searchResult.id"
          class="autocomplete__list__item"
          @click="previewCity(searchResult)"
        >
          {{ searchResult.place_name }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { parserDataCity } from '../../helpers/parserDataCity'

const mapboxAPIKey =
  'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q'

export default {
  props: {
    selectedCity: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchQuery: this.selectedCity,
      mapboxSearchResults: null,
      searchError: null
    }
  },
  methods: {
    getSearchResults() {
      let timer
      clearTimeout(timer)
      timer = setTimeout(async () => {
        if (this.searchQuery !== '') {
          try {
            const result = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchQuery}.json?access_token=${mapboxAPIKey}&types=place`
            )
            this.mapboxSearchResults = result.data.features
          } catch {
            this.searchError = true
          }
          return
        }
        this.mapboxSearchResults = null
      }, 800)
    },
    previewCity(searchResult) {
      this.mapboxSearchResults = null
      const result = parserDataCity(searchResult)
      this.$emit('getCoordinates', result)
    },
    handleClickOutside(event) {
      if (this.$refs.autocomplete && !this.$refs.autocomplete.contains(event.target)) {
        this.mapboxSearchResults = null
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
.autocomplete {
  padding-top: 16px;
  margin-bottom: 20px;
  position: relative;
  width: 300px;
}

.input {
  padding: 4px;
  width: 75%;
  font-size: 16px;
  border: 2px solid transparent;
  border-bottom: 2px solid;
  color: #00668a;
}

@media (min-width: 768px) {
}

input[type='text']:focus,
input[type='text']:active {
  outline: none;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  border-bottom: 2px solid #00668a;
}
.autocomplete__list {
  position: absolute;
  padding: 4px;
  background: #00668a;
  width: 100%;
  top: 65px;
  font-size: 18px;
  color: #fff;
  z-index: 20;
  border-radius: 4px;
}
.autocomplete__list__item {
  cursor: pointer;
  padding: 4px;
}
.autocomplete__error {
  padding: 4px;
}
</style>
