<template>
  <form @submit="submitForm($event)" id="appForm">
    <h1 class="title">Рассчитайте стоимость автомобиля в лизинг</h1>
    <section class="inputs-section">
      <ul class="inputs-list">
        <AppFormInput
          v-for="param in params"
          :key="param"
          :param="param"
          @input-changed="changeParams()"
          @info-changed="updateInfos()"
        />
      </ul>
    </section>
    <section class="info-section">
      <AppFormInfo
        v-bind:title="`Сумма договора лизинга`"
        v-bind:amount="agreementAmount"
      />
      <AppFormInfo
        v-bind:title="`Ежемесячный платеж от`"
        v-bind:amount="monthPayAmount"
      />
      <button class="submit-button" type="submit">Оставить заявку</button>
    </section>
  </form>
</template>

<script lang="ts">
import AppFormInput from "./AppFormInput.vue";
import AppFormInfo from "./AppFormInfo.vue";
import { defineComponent } from "vue";
import Calculate from "@/services/_calculation";
import { Param } from "@/interfaces";

export default defineComponent({
  props: ["params"],
  data() {
    return {
      monthPayAmount: this.calculateMonthPayAmount(),
      agreementAmount: this.calculateAgreementAmount(),
    };
  },
  methods: {
    changeParams(): void {
      this.$emit("params-changed");
    },
    calculateAgreementAmount(): number {
      const initial = this.getInitialAmount();
      const months = this.getMontsCount();

      return Math.round(initial + months * this.calculateMonthPayAmount());
    },
    calculateMonthPayAmount(): number {
      const price = this.getPriceAmount();
      const initial = this.getInitialAmount();
      const months = this.getMontsCount();

      return Math.round(
        (price - initial) *
          ((Calculate.rate * Math.pow(1 + Calculate.rate, months)) /
            (Math.pow(1 + Calculate.rate, months) - 1))
      );
    },
    updateInfos(): void {
      this.monthPayAmount = this.calculateMonthPayAmount();
      this.agreementAmount = this.calculateAgreementAmount();
    },
    disableFormControls(): void {
      const formControlElems = Array.from(
        document.querySelectorAll(
          'input[type="range"], input[type="text"], button'
        )
      ) as HTMLInputElement[];
      formControlElems.forEach((elem) => (elem.disabled = true));
    },
    makeFormControlsAbledEditable(): void {
      const formControlElems = Array.from(
        document.querySelectorAll(
          'input[type="range"], input[type="text"], button'
        )
      ) as HTMLInputElement[];
      formControlElems.forEach((elem) => (elem.disabled = false));
    },
    getPriceAmount() {
      return Calculate.params.filter(
        (param: Param) => param.name === "price"
      )[0].value;
    },
    getInitialAmount() {
      return Math.round(
        Calculate.params.filter((param: Param) => param.name === "price")[0]
          .value *
          Calculate.params.filter((param: Param) => param.name === "initial")[0]
            .value
      );
    },
    getInitialRate() {
      return Calculate.params.filter(
        (param: Param) => param.name === "initial"
      )[0].value;
    },
    getMontsCount() {
      return Calculate.params.filter(
        (param: Param) => param.name === "months"
      )[0].value;
    },
    submitForm(e: Event) {
      e.preventDefault();
      this.disableFormControls();

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car_coast: this.getPriceAmount(),
          initail_payment: this.getInitialAmount(),
          initail_payment_percent: this.getInitialRate(),
          lease_term: this.getMontsCount(),
          total_sum: this.calculateAgreementAmount(),
          monthly_payment_from: this.calculateMonthPayAmount(),
        }),
      };
      fetch("https://hookb.in/eK160jgYJ6UlaRPldJ1P", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setTimeout(() => {
            this.makeFormControlsAbledEditable();
            console.log("Data accepted successful:", data);
          }, 3000);
        });
    },
  },
  components: {
    AppFormInfo,
    AppFormInput,
  },
});
</script>

<style lang="scss">
@import "@/styles/constants.scss";
.inputs-section {
  margin-bottom: 44px;

  .inputs-list {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    column-gap: $column-gap;
    box-sizing: border-box;
  }
}

.info-section {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  column-gap: $column-gap;

  &:nth-child(n) {
    align-items: center;
  }

  .submit-button {
    height: $button-height;
    width: $field-width;

    font-family: Nekst;
    font-style: normal;
    font-size: 30px;
    line-height: 36px;

    color: $white-color;
    background-color: $orange-color;
    border: none;
    border-radius: $button-border-radius;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:not(:disabled):hover {
      background-color: $black-color;
    }

    &:not(:disabled):active {
      background-color: $grey-dark-color;
    }

    &:disabled {
      opacity: 0.4;
    }
  }
}
</style>
