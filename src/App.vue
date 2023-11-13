<template>
<body>
  <div id="app">
    <router-view></router-view>
  </div>
</body>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  }
}
</script>
 
<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-image: url("./assets/forest.jpg");
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}
</style>
