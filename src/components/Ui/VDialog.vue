<template>
  <div class="modal__wrapper" v-if="isOpen">
    <div class="modal__overlay" @click="close"></div>
    <div class="modal__container">
      <div class="modal__header">
        <h2>{{ title }}</h2>
        <button class="modal__close" @click="close">X</button>
      </div>
      <div class="modal__body">
        <slot></slot>
      </div>
      <div class="modal__footer">
        <v-button @click="close">{{ cancelButtonText }}</v-button>
        <v-button @click="submit">{{ confirmButtonText }}</v-button>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from './VButton.vue';

export default {
  components: {
    VButton
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
    confirmButtonText: {
      type: String,
      default: "OK",
    },
    cancelButtonText: {
      type: String,
      default: "Cancel",
    },
  },
  methods: {
    close() {
      this.$emit("update:isOpen", false);
    },
    submit() {
      this.$emit("submit");
      this.close();
    },
  },
};
</script>

<style>
.modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__container {
  position: relative;
  z-index: 1002;
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal__close {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal__body {
  margin: 20px 0;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
}

.modal__button {
  margin-left: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.modal__button.primary {
  background-color: #007aff;
  color: #fff;
}
</style>
