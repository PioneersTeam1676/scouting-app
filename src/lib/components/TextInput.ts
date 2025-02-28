import Input from "./Input";

export default class TextInput extends Input {
    
    declare defaultValue: string;
    declare value: string;
    maxLength: number;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: string, id: string, uid: number, maxLength: number) {
        super(required, questionText, helpText, defaultValue, id, uid);
        this.maxLength = maxLength;
    }
    
}