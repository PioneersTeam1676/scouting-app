import Input from "./Input";

export default class IncrementalNumberInput extends Input {

    declare defaultValue: number;
    declare value: number;
    min: number;
    max: number;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: number, id: string, min: number, max: number, uid: number) {
        super(required, questionText, helpText, parseInt(defaultValue as unknown as string), id, uid);
        this.min = min;
        this.max = max;
    }

    public increment(amount: number = 1) {
        if(this.value + amount > this.max) this.value = this.max;
        else this.value += amount; 

    }

    public decrement(amount: number = 1) {
        
        if(this.value - amount < this.min) this.value = this.min;
        else this.value -= amount;

    }

}