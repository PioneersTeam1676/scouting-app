import { get, type Writable, writable } from "svelte/store";
import App from "./App";
import InputSection from "./InputSection";
import Group from "./Group";

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

    hasEmptyInput(page: InputPage): boolean {
        for(let section of page.sections) {

            for(let element of section.elements) {
                
                if(element instanceof Group) {
                    
                    for(let input of element.inputs) {
                        if(input.value == "" && input.value !== 0 || input.value == "undefined" && input.value !== false) {
                        // console.log(input.questionText)
                            return true;
                        }
                    }

                } else {
                    if((element.value == "undefined" || element.value == "") && element.value !== 0 && element.value !== false) {
                        // console.log(element.questionText)
                        return true;
                    }
                }
            }

        }
        return false;
    }

}