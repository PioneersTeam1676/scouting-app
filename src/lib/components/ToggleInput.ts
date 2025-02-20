import Input from "./Input";

export default class ToggleInput extends Input {

    declare defaultValue: boolean;
    declare value: boolean;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: boolean, id: string) {
        super(required, questionText, helpText, defaultValue, id);
    }

    toggle() {
        this.value = !this.value;
    }

}