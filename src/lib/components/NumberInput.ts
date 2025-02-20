import Input from "./Input";

export default class NumberInput extends Input {

    declare defaultValue: number;
    declare value: number;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: number, id: string) {
        super(required, questionText, helpText, defaultValue, id);
    }
    
}