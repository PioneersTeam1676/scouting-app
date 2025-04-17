import { alertController } from "@ionic/core";
import Group from "./Group";
import IncrementalNumberInput from "./IncrementalNumberInput";
import Input from "./Input";
import InputPage, { InputPageButton } from "./InputPage";
import InputSection from "./InputSection";
import NumberInput from "./NumberInput";
import PillBoxInput, { PillBoxOrientation } from "./PillBoxInput";
import TextInput from "./TextInput";
import ToggleInput from "./ToggleInput";
import { set_data_maybe_contenteditable } from "svelte/internal";

type AppFromLocalStorage = {
    activePage: number
    headerDisplay: number[]
    userId: number
    csvOrder: string[]
    pages: Array<{
      sections: Array<{
        elements: Array<{
          required?: number
          questionText?: string
          helpText: string
          defaultValue: any
          id?: string
          value: any
          uid: number
          type?: string
          max?: number
          min?: number
          inputs?: Array<{
            orientation: PillBoxOrientation;
            values: any[];
            options: string[];
            required: number
            questionText: string
            helpText: string
            defaultValue: number
            id: string
            value: number
            uid: number
            type: string
            min: number
            max: number
          }>
          img?: string
          title?: string
          options?: Array<string>
          values?: Array<string>
          orientation?: number
        }>
        header: string
        helpText: string
        visible: boolean
      }>
      id: number
      buttons: Array<InputPageButton>
      footerText: string
      footerHelpText: string
      visible: {}
    }>
    uid: number
    url: string
    isOffline: boolean
    version: number
}

export default class App {

    public static readonly APP_STORAGE_LOCATION: string = "app";
    public static readonly IMPLICIT_CSV_VALUES: string[] = ["user_id", "comp", "timestamp", "team_num", "user_name"];

    public activePage: number;
    public pages: InputPage[];
    public uid: number;
    public url: string;
    public isOffline: boolean;
    public version: number;
    public headerDisplay: number[];
    public headerInputs: Input[];
    public userId: number;
    public csvOrder: string[]
    public userName: string;
    private submitting: boolean;

    constructor(pages: InputPage[]) {
        InputPage.app = this;

        this.pages = pages;
        this.activePage = -1;
        this.url = "";
        this.isOffline = false;
        this.headerInputs = [];
        this.submitting = false;
    }

    nextPage() {

        this.activePage += 1;

        if(this.activePage >= this.pages.length) {
            console.log("next page form submission")
            this.submitForm();
        } else if(this.activePage == 0) {
            console.log("first page")
            this.pages[this.activePage].setVisible(true);

            for(let i = 0; i < this.pages.length; i++) {
                if(i != this.activePage) {
                    this.pages[i].setVisible(false);
                }
            }
        } else {
            console.log("next page")
            this.pages[this.activePage-1].setVisible(false);
            this.pages[this.activePage].setVisible(true)
        }

    }

    

    async submitForm() {

        if(this.submitting) {
            return;
        }

        this.submitting = true;

        //json obj to store data
        let data: { [key: string]: any } = {};

        //go through all the pages in the app
        // this.pages.forEach(page => {

        //     //for each page, go through each section inside
        //     page.sections.forEach(section => {

        //     //for each section, go through each element inside (each can either be a group or an input)
        //     section.elements.forEach(element => {

        //         //if its a group, go through each input inside
        //         if (element instanceof Group) {
        //         (element as Group).inputs.forEach(input => {
        //             data[input.id] = input.value;//use css id (.id) as header, and .value as value
        //         });
        //         } else if (element instanceof Input) {
        //             data[(element as Input).id] = (element as Input).value;
        //         }

        //     });

        //     });
            
        // });

        let err = false;
        let errInput = "";
        let submitted = -1;

        this.updateInputs((input) => {

            if(input.value == "undefined" || input.value == undefined) {
                err = true;
                errInput = input.questionText;
                console.log(input.questionText + ", " + input.value + ", " + typeof input.value);
            }

            if(input.type == "toggle") {
                console.log("toggle!")
                console.log(input.value);
            }

            if(input.type == "pillbox") {
                data[input.id] = (input as PillBoxInput).values[input.value];
            } else {

                data[input.id] = input.value;
            }

        });

        if(err){
            console.log("err!");
            const options = {
                header: 'Error Submitting!',
            //    subHeader: 'Subtitle',
                message: `Fill out all form inputs before submiting! Fill out question ${errInput}`,
                buttons: ['OK']
            };
      
            this.submitting = false;
            return this.showAlert(options);
        }
        
        for(let implicit of App.IMPLICIT_CSV_VALUES) {
            if(this.csvOrder.includes(implicit)) {

                let value: any;

                if(implicit == "user_id") {
                    value = this.userId;
                } else if(implicit == "comp") {
                    value = "2025joh";
                } else if(implicit == "timestamp") {
                    value = Date.now();
                } else if(implicit == "team_num") {
                    value = "1676";
                } else if(implicit == "user_name") {
                    value = this.userName;
                }

                data[implicit] = value;

            }
        }

        data = { submission: data, uid: this.uid };
        console.log(data);

        // save data to localstorage

        if(navigator.onLine) {


        // submitted = localStorage.length;
        // localStorage.setItem('form'+localStorage.length, JSON.stringify(data));

        const response = await fetch(`${this.url}/api/form/${this.uid}`, {
            method: "POST",
            // mode: "no-cors",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            }
        }).then(async (res) => {

            console.log("Form submitted successfully");
            console.log(await res.json())//this doesn't work or smth idek its just not returnign the right thing but whatever it doesnt even matter. 
            // submitted = true;

        }, (error) => {
            console.error("Error submittdfing form", error);
        });

    } else {
        console.log("ok so im offline")
        submitted = localStorage.length;
        localStorage.setItem('form'+localStorage.length, JSON.stringify(data));
    }


        //post if online
        if (!this.isOffline) {

            let itemsToRemove = [];
            
            for(let i = 0; i < localStorage.length; i++) {
                
                let matchName = localStorage.key(i);
                let matchData = localStorage.getItem(matchName);

                if(matchName.indexOf("form") <= -1 && !matchName.includes("match")) {
                    continue;
                }

                
                // if(matchName.includes(submitted + "")) {
                //     localStorage.removeItem(matchName);
                //     continue;
                // }
                console.log("removing " + matchName + matchName.indexOf("form"));

                const response = await fetch(`${this.url}/api/form/${this.uid}`, {
                    method: "POST",
                    // mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: matchData,
                }).then((res) => {
    
                    // console.log("Form submitted successfully");
                    // console.log(res)//this doesn't work or smth idek its just not returnign the right thing but whatever it doesnt even matter. 
                    // console.log(matchData)
                    // console.log(localStorage.length)
                    
                    // localStorage.removeItem(matchName);
                    itemsToRemove.push(matchName);
                    // console.log(localStorage.length)

                }, (error) => {
                    console.error("Error submittdfing form", error);
                });
            }

            for(let i = 0; i < itemsToRemove.length; i++) {
                localStorage.removeItem(itemsToRemove[i]);
            }

        }

        console.log("hi im done submitting")
        this.resetForm();
        const options = {
               header: 'Form Submitted!',
            //    subHeader: 'Subtitle',
               message: `Succesfully submitted match!`,
               buttons: ['OK']
        };
         
        this.showAlert(options);

        this.submitting = false;


    }

    async showAlert(options: any) {
        const alert = await alertController.create(options);
        alert.present();
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

    findInput(uid: number): Input {

        for(let page of this.pages) {

            for(let section of page.sections) {

                for(let element of section.elements) {

                    if(element instanceof Group) {
                        for(let input of element.inputs) {
                            if(input.uid == uid) return input;
                        }
                    } else {
                        if(element.uid == uid) return element;
                    }

                }

            }

        }

    }

    setHeaderDisplays(nums: number[]) {
        this.headerDisplay = nums;

        console.log(nums + "!");

        for(let num of nums) {
            this.headerInputs.push(this.findInput(num));
        }
    }

    resetInputs() {

        this.updateInputs((input) => {

            if(input.type == "pillbox") {
                input.value = undefined;
            }

            input.value = input.defaultValue;
        })

    }

    resetForm() {

        this.resetInputs();
        this.activePage = -1;
        this.nextPage();
        this.pages = this.pages;
        
    }

    static readFromLocalStorage(): App {

        const json: AppFromLocalStorage = JSON.parse(localStorage.getItem(this.APP_STORAGE_LOCATION));
        
        const app = new App([]);

        app.activePage = -1;
        app.uid = json.uid;
        app.url = json.url;
        app.isOffline = !navigator.onLine;
        app.version = json.version;
        app.headerDisplay = json.headerDisplay;
        app.csvOrder = json.csvOrder;

        for(let p of json.pages) {

            let page = new InputPage([], p.buttons, p.footerText, p.footerHelpText, "")

            for(let s of p.sections) {

                let section = new InputSection(s.header, s.helpText);

                for(let e of s.elements) {

                    let element: Input | Group;

                    if(e.inputs != undefined) {

                        element = new Group([], e.img, e.title, e.helpText, e.uid);
                        
                        for(let i of e.inputs) {

                            let input: Input;
                            
                            if(i.type == "incremental") {
                                input = new IncrementalNumberInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue, i.id, i.min, i.max, i.uid);
                            } else if(i.type == "number") {
                                input = new NumberInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue, i.id, i.uid, i.min, i.max);
                            } else if(i.type == "text") {
                                input = new TextInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue as unknown as string, i.id, i.uid, 1000000) 
                            } else if(i.type == "pillbox") {
                                input = new PillBoxInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue, i.id, i.options!, i.values, i.orientation, i.uid);
                            } else if(i.type == "toggle") {
                                input = new ToggleInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue as unknown as boolean, i.id, i.uid);
                            }

                            element.inputs.push(input);

                        }

                    }

                        let i = e;
                        let input = element;

                        if(i.type == "incremental") {
                            input = new IncrementalNumberInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue, i.id, i.min, i.max, i.uid);
                        } else if(i.type == "number") {
                            input = new NumberInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue, i.id, i.uid, i.min, i.max);
                        } else if(i.type == "text") {
                            input = new TextInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue as unknown as string, i.id, i.uid, 1000000) 
                        } else if(i.type == "pillbox") {
                            input = new PillBoxInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue, i.id, i.options!, i.values, i.orientation, i.uid);
                        } else if(i.type == "toggle") {
                            input = new ToggleInput(i.required == 0 ? false : true, i.questionText, i.helpText, i.defaultValue as unknown as boolean, i.id, i.uid);
                        }

                    element = input;

                    section.elements.push(element);

                }

                page.sections.push(section);

            }

            app.pages.push(page);

        }


        return app;

    }

}
