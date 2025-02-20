import Input from "./Input";

export default class TextInput extends Input {
    
    declare defaultValue: string;
    declare value: string;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: string, id: string) {
        super(required, questionText, helpText, defaultValue, id);
    }
    
}