<template>
<router-view/>
</template>

<style lang="scss">
@import 'assets/all.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
