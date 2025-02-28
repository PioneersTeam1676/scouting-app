import Input from "./Input";

export default class Group {
    
    public inputs: Input[];
    public img: string;
    public title: string;
    public helpText: string;
    public uid: number;

    constructor(inputs: Input[], img: string, title: string, helpText: string, uid: number) {
        this.inputs = inputs;
        this.img = img;
        this.title = title;
        this.helpText = helpText;
        this.uid = uid;
    }

    

}