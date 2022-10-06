<template>
  <li class="input-list-item">
    <label v-bind:for="param.name">
      <h2 class="subtitle">{{ param.title }}</h2>
    </label>
    <div class="input-container">
      <div class="input-text-container">
        <input
          class="input-text"
          type="text"
          :name="param.name"
          :id="param.name"
          :value="textValue"
          @focusin="showFocusedValue(value)"
          @focusout="showUnfocusedValue($event)"
        />
        <span
          class="additional-info"
          :class="{
            'additional-info-small': param.name === 'initial',
          }"
        >
          {{ additionalInfo }}
        </span>
      </div>
      <input
        class="input-range"
        type="range"
        :name="param.name + `-range`"
        :id="param.name + `-range`"
        :min="param.min"
        :max="param.max"
        :step="param.step"
        :style="{
          background: `linear-gradient(to right,
            #ff9514 0%,
            #ff9514 ${getProgressProcent(value)}%,
            #E1E1E1 ${getProgressProcent(value)}%,
            #E1E1E1 100%)`,
        }"
        v-model="value"
        @input="changeParam()"
        @mouseup="emitChanges()"
      />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calculate from "@/services/_calculation";
import { Param } from "@/interfaces";

export default defineComponent({
  props: ["param"],
  data() {
    return {
      value: this.param.value,
      textValue: this.showNumbers(
        this.getTextValue(this.validateValue(this.param.value)),
        this.param
      ),
      additionalInfo: this.getAdditionalInfo(this.param.value),
    };
  },
  created() {
    if (this.param.name === "initial")
      this.emitter.on("price-changed", () => {
        this.textValue = this.showNumbers(
          this.getTextValue(this.value),
          this.param
        );
      });
  },
  methods: {
    changeParam(): void {
      Calculate.changeParams(this.param, Number(this.value));
      this.textValue = this.showNumbers(
        this.getTextValue(this.value),
        this.param
      );
      if (this.param.name === "initial")
        this.additionalInfo = this.getAdditionalInfo(this.value);
      if (this.param.name === "price") this.emitPriceChanges();
      this.emitInfoChanges();
    },
    showNumbers: function (value: number, param: Param): string {
      const resultValue = value.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
      return param.name !== "initial" ? resultValue : resultValue + " ₽";
    },
    getTextValue(value: number): number {
      const resultNumber =
        this.param.name !== "initial"
          ? value
          : Calculate.params.filter((param: Param) => param.name === "price")[0]
              .value * value;
      return Math.round(resultNumber);
    },
    getAdditionalInfo(value: number) {
      return this.param.name !== "initial"
        ? this.param.measure
        : Math.round(Number(value) * 100) + this.param.measure;
    },
    getProgressProcent(value: number) {
      return (
        ((Number(value) - this.param.min) * 100) /
        (this.param.max - this.param.min)
      );
    },
    showFocusedValue(value: number) {
      this.textValue = this.getTextValue(value);
    },
    showUnfocusedValue(event: Event) {
      const elem = event.target as HTMLInputElement;
      const value = Number(elem.value);

      this.value = this.validateValue(
        this.param.name !== "initial"
          ? value
          : value /
              Calculate.params.filter(
                (param: Param) => param.name === "price"
              )[0].value
      );
      this.changeParam();
      this.emitChanges();
    },
    validateValue(value: number) {
      return !Number(value) || value < this.param.min
        ? this.param.min
        : value > this.param.max
        ? this.param.max
        : value;
    },
    emitChanges(): void {
      this.$emit("input-changed");
    },
    emitInfoChanges(): void {
      this.$emit("info-changed");
    },
    emitPriceChanges(): void {
      this.emitter.emit("price-changed");
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/constants.scss";

.input-list-item {
  list-style-type: none;
  width: var(--field-width);

  .subtitle {
    margin: 0 0 var(--input-subtitle-mb);
    font-family: Gilroy;
    font-style: normal;
    font-size: var(--subtitle-font-size);
    line-height: 20px;
    color: var(--grey-dark-color);
  }

  .input-container {
    display: flex;
    flex-direction: column;

    .input-text-container {
      position: relative;
      font-family: Nekst;
      font-style: normal;
      color: var(--grey-dark-color);

      .input-text {
        padding: var(--field-pv) var(--field-pr) var(--field-pv) var(--field-pl);
        height: var(--field-height);
        width: 100%;
        box-sizing: border-box;

        font-family: Nekst;
        font-style: normal;
        font-size: var(--field-font-size);
        color: var(--grey-dark-color);

        background-color: var(--grey-light-color);
        border-radius: 16px;
        border: none;

        &:focus {
          outline: none;
          background-color: var(--white-color);
          border: var(--field-border-width) solid var(--grey-light-color);
        }
      }

      .additional-info {
        position: absolute;
        top: 50%;
        right: var(--field-pl);
        font-size: var(--additional-info-font-size);
        transform: translateY(-50%);

        &-small {
          padding: var(--additional-info-small-pv)
            var(--additional-info-small-ph);
          font-size: var(--additional-info-small-font-size);
          line-height: var(--additional-info-small-lh);
          background-color: var(--grey-color);
          border-radius: var(--field-border-radius);
          transform: translate(var(--additional-info-small-ph), -50%);
        }
      }
    }

    &:hover .input-range::-webkit-slider-thumb {
      height: var(--big-range-thumb-size);
      width: var(--big-range-thumb-size);
      margin-top: calc((var(--big-range-thumb-size / 2 - 1px) * (-1)));
    }

    .input-range {
      position: relative;
      margin: -2px var(--field-pl) 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      -o-appearance: none;
      cursor: pointer;

      &::-webkit-slider-runnable-track,
      &::-moz-slider-runnable-track,
      &::-ms-slider-runnable-track,
      &::-o-slider-runnable-track {
        width: 100%;
        height: var(--field-border-width);
        border: none;
        border-radius: 3px;
      }

      &::-webkit-slider-thumb,
      &::-moz-slider-thumb,
      &::-ms-slider-thumb,
      &::-o-slider-thumb {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        border: none;
        height: var(--range-thumb-size);
        width: var(--range-thumb-size);
        border-radius: 50%;
        background-color: var(--orange-color);
        margin-top: calc((var(--range-thumb-size) / 2 - 1px) * (-1));
        transition: all 0.2s ease-in-out;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
