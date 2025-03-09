import { get, type Writable, writable } from "svelte/store";
import App from "./App";
import InputSection from "./InputSection";

export enum InputPageButton  {
    next = "next",
    cancel = "cancel",
    submit = "submit"
}

export default class InputPage {

    public static app: App;
    public static idIncrementor: number = 0;

    public sections: InputSection[];
    public id: number;
    public buttons: InputPageButton[];
    public footerText: string;
    public footerHelpText: string;
    public name: string;
    public visible: Writable<boolean>;

    constructor(sections: InputSection[], buttons: InputPageButton[], footerText: string, footerHelpText: string, name: string) {
        this.sections = sections;
        this.id = InputPage.idIncrementor++;
        this.buttons = buttons;
        this.footerText = footerText;
        this.footerHelpText = footerHelpText;
        this.visible = writable(false);
    }

    setVisible(visible: boolean) {
        this.visible.set(visible);

        for(let section of this.sections) {
            section.visible = visible;
        }

    }

    isVisible(): boolean {
        return get(this.visible);
    }

    goToNextPage() {
        InputPage.app.nextPage();
    }

}