import { Param } from "@/interfaces";

export default class Calculate {
  static rate: number;
  static params: Param[];

  static changeParams(changedParam: Param, value: number) {
    this.params.filter(
      (param: Param) => param.name === changedParam.name
    )[0].value = value;
  }
}
