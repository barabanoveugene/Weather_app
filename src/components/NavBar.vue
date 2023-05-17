<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/images/logo.png" alt="logo" width="50" height="50" />
      </router-link>
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/selected-city">Selected city</router-link>
    </nav>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
.header {
  width: 100%;
  padding: 15px 30px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background: #00668a;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav {
  display: flex;
  gap: 24px;
}

a {
  color: #fff;
  text-decoration: none;
  font-size: 32px;
}
.router-link-exact-active {
  color: #42b983;
  text-decoration: none;
}
</style>
