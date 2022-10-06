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
  max-width: var(--info-field-width);
  min-width: var(--info-field-min-width);

  .subtitle {
    margin: 0 0 var(--info-subtitle-mb);
    font-family: Gilroy;
    font-style: normal;
    font-size: var(--subtitle-font-size);
    line-height: 20px;
    color: var(--grey-dark-color);
  }

  .info-amount {
    margin: 0;
    padding: 0;

    font-family: Nekst;
    font-style: normal;
    font-size: var(--info-amount-font-size);
    line-height: 90%;
    color: var(--grey-dark-color);
  }
}
</style>
