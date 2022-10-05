<template>
  <AppForm :params="params" @params-changed="updateParams()" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppForm from "@/components/AppForm.vue";
import defaulData from "@/assets/storage/data.json";
import Calculate from "@/services/_calculation";

export default defineComponent({
  name: "App",
  data() {
    Calculate.params = defaulData.params;
    Calculate.rate = defaulData.rate;

    return {
      params: Calculate.params,
    };
  },
  methods: {
    updateParams() {
      this.params = JSON.parse(JSON.stringify(Calculate.params));
    },
  },
  components: {
    AppForm,
  },
});
</script>

<style lang="scss">
@import "./styles/constants.scss";
@import "./styles/fonts.scss";

#app {
  padding: 0 $app-padding;
}

.title {
  font-family: Nekst;
  font-style: normal;
  font-weight: 900;
  font-size: 54px;
  line-height: 90%;

  color: $dark-color;
}
</style>
