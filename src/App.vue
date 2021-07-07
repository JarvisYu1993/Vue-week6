<template>
  <ToastMessages />
  <router-view/>
</template>
<script>
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/methods/eventBus'
import $httpMessageState from '@/methods/pushMessageState'

export default {
  provide () {
    return {
      emitter,
      $httpMessageState
    }
  },
  components: {
    ToastMessages
  }
}
</script>
<style lang="scss">
@import 'assets/all.scss';
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
      &:hover{
        color:darken(#42b983,20%);
      }
    }
  }
}
</style>
