<template>
  <h1 class="title">Рассчитайте стоимость автомобиля в лизинг</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
@font-face {
  font-family: "Nekst";
  src: local("Nekst"),
    url("@/assets/fonts/nekst/Nekst-Bold.woff2") format("woff2"),
    url("@/assets/fonts/nekst/Nekst-Bold.woff") format("woff"),
    url("@/assets/fonts/nekst/Nekst-Bold.ttf") format("ttf"),
    url("@/assets/fonts/nekst/Nekst-Bold.eot") format("eot");
  font-style: normal;
}
@font-face {
  font-family: "Gilroy";
  src: local("Gilroy"),
    url("@/assets/fonts/gilroy/Gilroy-Bold.woff2") format("woff2"),
    url("@/assets/fonts/gilroy/Gilroy-Bold.woff") format("woff"),
    url("@/assets/fonts/gilroy/Gilroy-Bold.ttf") format("ttf"),
    url("@/assets/fonts/gilroy/Gilroy-Bold.eot") format("eot");
  font-style: normal;
}
.title {
  font-family: "Nekst", "Gilroy";
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
