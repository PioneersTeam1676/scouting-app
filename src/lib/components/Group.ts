import Input from "./Input";

export default class Group {
    
    public inputs: Input[];
    public img: string;
    public title: string;
    public helpText: string;

    constructor(inputs: Input[], img: string, title: string, helpText: string) {
        this.inputs = inputs;
        this.img = img;
        this.title = title;
        this.helpText = helpText;
    }

    

}