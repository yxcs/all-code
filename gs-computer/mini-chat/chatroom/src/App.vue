<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body,html {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  height: 100%;
}
::-webkit-scrollbar {
  width: 10px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #535353;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #EDEDED;
}
</style>
