export default abstract class Input {

    required: boolean;
    questionText: string;
    helpText: string;
    defaultValue: any;
    id: string;
    value: any;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: any, id: string) {
        this.required = required;
        this.questionText = questionText;
        this.helpText = helpText;
        this.defaultValue = defaultValue;
        this.id = id;
        this.value = defaultValue;
    }

}