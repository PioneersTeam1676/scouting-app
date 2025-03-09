import Input from "./Input";

export default class ToggleInput extends Input {

    declare defaultValue: boolean;
    declare value: boolean;
    declare type: string;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: boolean, id: string, uid: number) {

        if(typeof defaultValue == "string") {
            if(defaultValue == "true") defaultValue = true;
            else if(defaultValue == "false") defaultValue = false;
        }

        super(required, questionText, helpText, defaultValue, id, uid);
        this.type = "toggle";
    }

    toggle() {
        this.value = !this.value;
    }

}