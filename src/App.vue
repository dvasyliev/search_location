<template>
  <div id="app">
    <div class="page">
      <div class="page__inner">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 60px 0;
  background-color: #F7F7F7;

  &__inner {
    display: flex;
    flex-grow: 1;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #FFFFFF;
    border: 1px solid #D2D6D9;
    border-radius: 6px;
  }
}
</style>
