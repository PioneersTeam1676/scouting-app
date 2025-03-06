import Group from "./Group";
import Input from "./Input";
import InputPage from "./InputPage";

export default class App {

    public activePage: number;
    public pages: InputPage[];
    public uid: number;
    public url: string;

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

    async submitForm() {

        //json obj to store data
        let data: { [key: string]: any } = {};

        //go through all the pages in the app
        this.pages.forEach(page => {

            //for each page, go through each section inside
            page.sections.forEach(section => {

            //for each section, go through each element inside (each can either be a group or an input)
            section.elements.forEach(element => {

                //if its a group, go through each input inside
                if (element instanceof Group) {
                (element as Group).inputs.forEach(input => {
                    data[input.id] = input.value;//use css id (.id) as header, and .value as value
                });
                } else if (element instanceof Input) {
                    data[(element as Input).id] = (element as Input).value;
                }

            });

            });
            
        });

        console.log(data);

        data = { submission: data, uid: this.uid };
        console.log(data);

        //save data to localstorage
        localStorage.setItem('form'+localStorage.length, JSON.stringify(data));

        const response = await fetch(`${this.url}/api/form/${this.uid}`, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            }
        }).then((res) => {

            console.log("Form submitted successfully");
            console.log(res)//this doesn't work or smth idek its just not returnign the right thing but whatever it doesnt even matter. 

        }, (error) => {
            console.error("Error submittdfing form", error);
        });

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