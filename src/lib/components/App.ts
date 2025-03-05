import Group from "./Group";
import Input from "./Input";
import InputPage from "./InputPage";

export default class App {

    public activePage: number;
    public pages: InputPage[];
    public uid: number;
    public url: string;
    public isOffline: boolean;

    constructor(pages: InputPage[]) {
        InputPage.app = this;

        this.pages = pages;
        this.activePage = -1;
        this.url = "";
        this.isOffline = false;
    }

    nextPage() {
        this.activePage += 1;

        if(this.activePage >= this.pages.length) {
            console.log("next page form submission")
            this.submitForm();
        } else if(this.activePage == 0) {
            console.log("first page")
            this.pages[this.activePage].setVisible(true);
        } else {
            console.log("next page")
            this.pages[this.activePage-1].setVisible(false);
            this.pages[this.activePage].setVisible(true)
        }

    }

    async submitForm() {
        console.log("submit forlaskdfjm")

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

                // /*

        //save data to localstorage
        let localName = 'match'+localStorage.length;
        localStorage.setItem(localName, JSON.stringify(data));
        console.log("saved to localstorage");

        //post if online
        if (!this.isOffline) {

            
            while (localStorage.length > 0) {
                
                let matchName = localStorage.key(0);
                let matchData = localStorage.getItem(matchName);

                const response = await fetch(`${this.url}/api/form/${this.uid}`, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: matchData,
                }).then((res) => {
    
                    // console.log("Form submitted successfully");
                    // console.log(res)//this doesn't work or smth idek its just not returnign the right thing but whatever it doesnt even matter. 
                    // console.log(matchData)
                    // console.log(localStorage.length)
                    
                    localStorage.removeItem(matchName);
                    // console.log(localStorage.length)

                }, (error) => {
                    console.error("Error submittdfing form", error);
                });
            }

        }


        // */

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