export default abstract class Input {

    required: boolean;
    questionText: string;
    helpText: string;
    defaultValue: any;
    id: string;
    value: any;
    uid: number;

    constructor(required: boolean, questionText: string, helpText: string, defaultValue: any, id: string, uid: number) {
        this.required = required;
        this.questionText = questionText;
        this.helpText = helpText;
        this.defaultValue = defaultValue;
        this.id = id;
        this.value = defaultValue;
        this.uid = uid;
    }

}