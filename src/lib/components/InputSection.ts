import Group from "./Group";
import Input from "./Input";

export default class InputSection {

    elements: Array<Input | Group>;
    header: string;
    helpText: string;
    visible: boolean = false;

    constructor(header: string, helpText: string) {
        this.header = header;
        this.helpText = helpText;
        this.elements = [];
        this.visible = false;
    }

}