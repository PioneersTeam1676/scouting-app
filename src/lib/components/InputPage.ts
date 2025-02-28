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

    constructor(sections: InputSection[], buttons: InputPageButton[], footerText: string, footerHelpText: string, name: string) {
        this.sections = sections;
        this.id = InputPage.idIncrementor++;
        this.buttons = buttons;
        this.footerText = footerText;
        this.footerHelpText = footerHelpText;
    }

    setVisible(visble: boolean) {
        for(let section of this.sections) {

            section.visible = visble;

        }
    }

    isVisible(): boolean {
        for(let section of this.sections) {
            return section.visible;
        }

    }

    goToNextPage() {
        InputPage.app.nextPage();
    }

}