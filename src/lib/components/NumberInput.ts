import Input from "./Input";

export default class NumberInput extends Input {

    declare defaultValue: number;
    declare value: number;
    max: number;
    min: number;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: number, id: string, uid: number, min: number, max: number) {
        super(required, questionText, helpText, defaultValue, id, uid);
        this.min = min;
        this.max = max;
    }
    
}