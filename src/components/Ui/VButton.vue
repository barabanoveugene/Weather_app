<template>
  <button
    class="btn"
    :class="{btn__circle: isCircle}"
    >
      <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isCircle: Boolean,
  }
}
</script>

<style>
  .btn {
    padding: 10px 15px;
    background: #fff;
    color: #00668a;
    border: 1px solid #00668a;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
  }
  .btn__circle {
    border-radius: 50%;
    padding: 0;
    width: 40px;
    height: 40px;
    border: 3px solid #00668a;
    font-size: 30px;
  }
  .btn:hover {
    background: rgb(0, 102, 138, 0.1);
  }

</style>