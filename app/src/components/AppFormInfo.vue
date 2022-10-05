<template>
  <div class="info-item">
    <h2 class="subtitle">{{ title }}</h2>
    <p class="info-amount">{{ showNumbers(amount) }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title", "amount"],
  methods: {
    showNumbers: (value: number): string => {
      const resultValue = value
        ? value.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
        : "0";
      return resultValue + " ₽";
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/constants.scss";

.info-item {
  flex-grow: 1;
  list-style-type: none;
  width: $field-width;

  .subtitle {
    margin: 0 0 8px;
    font-family: Gilroy;
    font-style: normal;
    font-size: 16px;
    line-height: 20px;
    color: $grey-dark-color;
  }

  .info-amount {
    margin: 0;
    padding: 0;

    font-family: Nekst;
    font-style: normal;
    font-size: 54px;
    line-height: 90%;
    color: $grey-dark-color;
  }
}
</style>
