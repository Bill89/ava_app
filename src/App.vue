<template>
  <div id="app">
    <ChildView></ChildView>
    <Loading></Loading>
  </div>
</template>
<script>
import ChildView from '@/layouts/ChildView'
import Loading from '@/layouts/Loading.vue'
export default {
  name: 'App',
  components: {
    ChildView,
    Loading
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
