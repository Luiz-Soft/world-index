<template>
  <div id="app" >
    <Navbar />
    <router-view class="mt-5"  @scroll="scrolledToBottom"></router-view>
  </div>
</template>

<script>
import Navbar from "../src/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {
    scrolledToBottom(event) {
		console.log('entrou no scrool')
      var el = event.srcElement;
      console.log(el.scrollTop + " " + el.scrollHeight + " " + el.clientHeight);
      if (!this.reachedBottom) {
        if (el.scrollTop - 40 >= el.scrollHeight - el.clientHeight - 100) {
          console.log("chegou ao fiiiiiiiiiiiim");
        }
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
#app {
  background-color: #f0f0f0;
  min-height: 100vh;
}

html,
body {
  font-family: "Roboto", sans-serif !important;
}

@media only screen and (max-device-width: 480px) {
  #app {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }
}
</style>
