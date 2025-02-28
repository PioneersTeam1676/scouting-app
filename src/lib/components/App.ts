import Group from "./Group";
import Input from "./Input";
import InputPage from "./InputPage";

export default class App {

    public activePage: number;
    public pages: InputPage[];
    public uid: number;

    constructor(pages: InputPage[]) {
        InputPage.app = this;

        this.pages = pages;
        this.activePage = -1;

    }

    nextPage() {
        this.activePage += 1;

        if(this.activePage >= this.pages.length) {
            this.submitForm();
        } else if(this.activePage == 0) {
            this.pages[this.activePage].setVisible(true);
        } else {
            this.pages[this.activePage-1].setVisible(false);
            this.pages[this.activePage].setVisible(true)
        }

    }

    submitForm() {

    }

    updateInputs(fn: (input: Input) => void) {

        for(let page of this.pages) {

            for(let section of page.sections) {

                for(let element of section.elements) {

                    if(element instanceof Group) {
                        for(let input of element.inputs) {
                            fn(input);
                        }
                    } else {
                        fn(element);
                    }

                }

            }

        }

    }

    resetInputs() {

        this.updateInputs((input) => {
            input.value = input.defaultValue;
        })

    }

    resetForm() {
        
    }

}