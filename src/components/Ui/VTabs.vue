<template>
  <div class="tabs">
    <v-button
      @click="handlerClickButton"
      :data-value="day.value"
      v-for="day in tabs"
      :key="day.value"
      :isHoverGray="true"
    >
      {{ day.title }}
    </v-button>
  </div>
</template>

<script>
import VButton from './VButton.vue'

const daysTabs = [
  {
    title: '1 day',
    value: 1
  },
  {
    title: '5 day',
    value: 5
  }
]
export default {
  components: {
    VButton
  },
  data() {
    return {
      tabs: daysTabs,
      activeTab: 1
    }
  },
  methods: {
    handlerClickButton(event) {
      this.activeTab = Number(event.target.dataset.value)
      this.$emit('setTypeIndexDay', this.activeTab)
    }
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.tab.active {
  border-bottom: 2px solid #000;
  font-weight: bold;
}

.tab-content {
  padding: 20px;
}
</style>
