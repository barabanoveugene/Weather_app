<!-- <template>
  <div class="autocomplete" ref="autocomplete">
    <input
      :value="!modelValue.city ? 'Please select an item' : modelValue.city" readonly 
      @click="open=true" />
    <ul v-show="open" class="dropdown__list">
      <li v-for="(option,i) in options"
        @click="updateOption(option,i)"
        :class="{selected:i==selectedItem}"
        :key="option.city"
        >
        {{ option.city }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      open: false,
      selectedOption: null,
      selectedItem: null,
    }
  },
  methods: {
    updateOption(option, i) {
      this.selectedItem = i;
      this.selectedOption = option;
      this.open = false;
      this.$emit('update:modelValue', option);
    },
    handleClickOutside(event) {
      if (this.$refs.autocomplete && !this.$refs.autocomplete.contains(event.target)) {
        this.open = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
}
</script>

<style>
  .autocomplete {
    display: inline-block;
    position: relative;
    user-select: none;
    width: 240px;
    
  }

  input {
    background: #fff url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='12'><polygon points='0,0 12,0 6,12' fill='orange'/></svg>") 100% no-repeat;
    cursor: pointer;
    border-radius: 4px;
    padding: 12px 20px;
    font-size: 16px;
    width: inherit;
    border: 2px solid #00668a;
  }

  ul {
    list-style: none;
    position: absolute;
    background: #FFF;
    width: 100%;
    box-shadow: 0 .2em 1.4em 0 rgba(0, 0, 0, 0.2);
    padding: 0;
    z-index: 20;
  }

  li {
    cursor: pointer;
    border-top: 1px solid #EFEFEF;
    padding: 0 1em;
    line-height: 2.4;
    font-size: 16px;
  }
  .selected {
    background: #f9f9f9;
  }

  li:selected {
    color: #000;
  }
  li:hover {
    background: #f9f9f9;
  }

</style> -->


<template>
  <div class="autocomplete" ref="autocomplete">
    <input
      type="text"
      v-model="searchQuery"
      @input="getSearchResults"
      placeholder="Search for a city or state"
      class="input"
    />
    <ul
      class="autocomplete__list"
      v-if="mapboxSearchResults"
    >
      <p class="autocomplete__error" v-if="searchError">
        Sorry, something went wrong, please try again.
      </p>
      <p
        class="autocomplete__error"
        v-if="!searchError && mapboxSearchResults.length === 0"
      >
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
import axios from 'axios';
import {parserDataCity} from '../../helpers/parserDataCity';

const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";

export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      searchQuery: this.modelValue.city,
      mapboxSearchResults: null,
      searchError: null
    }
  },
  methods: {
    getSearchResults () {
      let timer
      clearTimeout(timer);
      timer = setTimeout(async () => {
        if (this.searchQuery !== "") {
          try {
            const result = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchQuery}.json?access_token=${mapboxAPIKey}&types=place`
            );
            console.log(result)
            this.mapboxSearchResults = result.data.features;
          } catch {
            this.searchError = true;
          }
          return;
        }
        this.mapboxSearchResults = null;
      }, 800);
    },
    previewCity (searchResult) {
      this.mapboxSearchResults = null;
      const result =  parserDataCity(searchResult);
      this.$emit('update:modelValue', result);
    },
    handleClickOutside(event) {
      if (this.$refs.autocomplete && !this.$refs.autocomplete.contains(event.target)) {
        this.mapboxSearchResults = null;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
}
</script>


<style scoped>
  .autocomplete{
    padding-top: 16px;
    margin-bottom: 20px;
    position: relative;
    width: 300px;
  }
  .input {
    padding: 4px;
    width: 100%;
    font-size: 16px;
    border: 2px solid transparent;
    border-bottom: 2px solid;
  }
  input[type="text"]:focus,
  input[type="text"]:active {
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
  .autocomplete__list__item{
    cursor: pointer;
    padding: 4px;
  }
  .autocomplete__error {
    padding: 4px;
  }
</style>