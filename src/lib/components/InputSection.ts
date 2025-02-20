import Group from "./Group";
import Input from "./Input";

export default class InputSection {

    elements: Array<Input | Group>;
    header: string;
    helpText: string;
    visible: boolean = false;

}