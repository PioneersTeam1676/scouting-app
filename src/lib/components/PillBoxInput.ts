import Input from "./Input";

export default class PillBoxInput extends Input {
    
    public options: string[];
    public values: any[];
    public orientation: "Horizontal" | "Vertical";
    declare value: number;
    declare defaultValue: number;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: number, id: string, options: string[], values: any[], orientation: "Horizontal" | "Vertical") {
        super(required, questionText, helpText, defaultValue, id);
        this.options = options;
        this.values = values;
        this.orientation = orientation;
    }

    updateValue(index: number) {
        this.value = index;
    }

}