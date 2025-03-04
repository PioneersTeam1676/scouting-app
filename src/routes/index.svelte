<script lang="ts">
    import App from "$lib/components/App";
    import Group from "$lib/components/Group";

  // code here

    import HelpButton from "$lib/components/HelpButton.svelte";
    import IncrementalNumberInput from "$lib/components/IncrementalNumberInput";
    import Input from "$lib/components/Input";
    import InputPage from "$lib/components/InputPage";
    import InputSection from "$lib/components/InputSection";
    import NumberInput from "$lib/components/NumberInput";
    import PillBoxInput from "$lib/components/PillBoxInput";
    import TextInput from "$lib/components/TextInput";
    import ToggleInput from "$lib/components/ToggleInput";
    import { onMount } from "svelte";
    import { InputGroup, InputGroupText } from "sveltestrap";
    import { InputPageButton } from "$lib/components/InputPage";
    import InputPageComp from "$lib/components/InputPage.svelte";

  // const app = {
  //   "header-left": [
  //     {
  //       text: "Match",
  //       id: "match-num"
  //     }
  //   ]
  // }

  type InputFromDB = {
    uid:                 number;
    input_type:          "incrementalNumber" | "number" | "pillbox" | "text" | "toggle";
    form_id:             number;
    page_index:          number;
    group_id:            number;
    page_id:             number;
    section_index:       number;
    required:            boolean;
    question_text:       string;
    help_text:           string;
    default_value:       string;
    css_id:              string;
    text_limit:          number;
    pillbox_options:     string;
    pillbox_values:      string;
    pillbox_orientation: number;
    num_min:             number;
    num_max:             number;
    num_increment:       number;
}

  let app = new App([]);
  
  async function request(path: string, method: string, body?: string): Promise<any> {

      let req = await fetch(path, {
          method, 
          body: body,
          headers: {
              'Content-Type': 'application/json'
          }
      });

      let res = await req.json();

      return res;

}

  const url = "https://sturdy-space-goldfish-7467w9j4pg93xj6q-5173.app.github.dev";

  async function getActiveForm(): Promise<number> {

    let req = await fetch(`${url}/api/form/active`, {
      method: "GET",
      cache: 'no-cache',
      headers: {
                'Content-Type': 'application/json'
            }
    });

    let res = await req.json();

    if(Array.isArray(res)) {
      if(res.length == 1) {
        return res[0].uid;
      } 
    }

    return -1;
  }

  onMount(async () => {

    // get the active form

    const activeForm = await getActiveForm();
    app.uid = activeForm;
    app.url = url;

    let pages: {
      footer_buttons: string,
      footer_help_text: string,
      footer_text: string,
      form_id: number,
      name: string,
      section_help_texts: string,
      section_names: string,
      uid: number
    }[] = await request(`${url}/api/page?form_id=${activeForm}`, "GET");

    for(let page of pages) {

      let sections: InputSection[] = [];

      let sectionNames = page.section_help_texts.split(",");
      let sectionHelpTexts = page.section_help_texts.split(",");

      for(let i = 0; i < sectionNames.length;i++) {
        sections.push(new InputSection(sectionNames[i], sectionHelpTexts[i]));
      }

      let groupsFromDB: {form_id: number, help_text: string, img: string, page_id: number, title: string, uid: number}[] = await request(`${url}/api/group?form_id=${app.uid}&page_id=${page.uid}`, "GET");

      let groups: Group[] = []

      for(let group of groupsFromDB) {

        let g = new Group([], group.img, group.title, group.help_text, group.uid);

        groups.push(g);

      }

      let inputsFromDB: InputFromDB[] = await request(`${url}/api/input?form_id=${app.uid}&page_id=${page.uid}`, "GET");

      let inputs: Input[] = [];

      for(let input of inputsFromDB) {

        let i:Input;
        
        if(input.input_type == "text") {
          i = new TextInput(input.required, input.question_text, input.help_text, input.default_value, input.css_id, input.uid, input.text_limit);
        } else if(input.input_type == "toggle") {
          i = new ToggleInput(input.required, input.question_text, input.help_text, (input.default_value as unknown as boolean), input.css_id, input.uid);
        } else if(input.input_type == "pillbox") {
          i = new PillBoxInput(input.required, input.question_text, input.help_text, (input.default_value as unknown as number), input.css_id, input.pillbox_options.split(","), input.pillbox_values.split(","), input.pillbox_orientation, input.uid);
        } else if(input.input_type == "number") {
          i = new NumberInput(input.required, input.question_text, input.help_text, (input.default_value as unknown as number), input.css_id, input.uid, input.num_min, input.num_max);
        } else if(input.input_type == "incrementalNumber") {
          i = new IncrementalNumberInput(input.required, input.question_text, input.help_text, (input.default_value as unknown as number), input.css_id, input.num_min, input.num_max, input.uid)
        }

        inputs.push(i);

      }


      inputs.sort((a, b) => inputsFromDB.find((val) => val.uid == a.uid).page_index - inputsFromDB.find((val) => val.uid == b.uid).page_index);

      for(let i = 0; i < inputs.length; i++) {

        const input = inputs[i];
        const inputFromDB = inputsFromDB.find((val) => val.uid == input.uid);

        if(inputFromDB.group_id > 0) {

          let group = groups.find((val) => val.uid == inputFromDB.group_id);
          group.inputs.push(input);
          sections[inputFromDB.section_index].elements.push(group);

        } else {
          sections[inputFromDB.section_index].elements.push(input);
        }
      }

      let p = new InputPage(sections, (page.footer_buttons.split(",") as InputPageButton[]), page.footer_text, page.footer_help_text, page.name);

      app.pages.push(p);

    }

    app.nextPage();
    app.activePage = app.activePage;
  


  })

</script>

<ion-header translucent="true">
  
  <ion-toolbar class="toolbar">

    <!-- left side of header - TODO: add ability to make this side customizable and update with input update -->
  <div slot="start" class="view-left">
    <div class="header-item">
      <span class="header-item-text-desc">Match #</span>
      <span class="header-item-text-val">1</span>
    </div>

    <div class="header-item">
      <span class="header-item-text-desc">Team #</span>
      <span class="header-item-text-val">1676</span>
    </div>

    <div class="header-item">
      <span class="header-item-text-val" style="color: red;">RED</span>
      -
      <span class="header-item-text-val">CLOSE</span>
    </div>

  </div>
  
  <!-- center of header -->
  <div class="pfp-container"> <img src="https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg" alt="profile" class="pfp-image"/> </div>
  

  <!-- right of header -->
  <div slot="end">
      <div class="header-item">
        <span class="header-item-text-val">Dylan Barrett</span>
      </div>
      <div class="header-item">
        <span class="header-item-text-val">uid-1808</span>
      </div>
      <div class="header-item" style="display:flex; gap: 0.5rem;">
            <span class="blink"></span>
          <span class="header-item-text-val" style="color: #2f9c4e;">Connected</span>

      </div>
  </div>
  
  </ion-toolbar>
</ion-header>

<ion-content fullscreen="true" class="ion-padding">
  <div class="main-content">

    {#each app.pages as page}
    <p>hi</p>
      
      <InputPageComp page={page}/>

    {/each}


  </div>
</ion-content>


<style>

  * {
    font-family: sans-serif;
  }

  /* HEADER STYLES */

  .header-item {
    height: 1.5rem;
  }

  ion-toolbar > * {
    margin-top: 1rem;
  }

  ion-toolbar > *:first-child {
    margin-left: 1rem;
  }

  ion-toolbar > *:last-child {
    margin-right: 1rem;
  } 
  
  .header-item-text-desc {
    font-size: 1rem;
    font-weight: lighter;
  }

  .header-item-text-val {
    font-size: 1rem;
  }

  .pfp-image {
    width: 3.75rem;
    border-radius: 50%;
  }

  .pfp-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
  }

  @keyframes blink {
    100% { 
      transform: scale(2, 2); 
      opacity: 0;
    }
  }

  .blink {
    display: block;
    width: 15px;
    height: 15px;
    background-color: #2f9c4e;
    opacity: 0.7;
    border-radius: 50%;
    animation: blink 1s linear infinite;
  }

/* BODY STYLES */

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-bottom: 0.9rem;
    padding: 0.75rem;
    width: 100%;
    max-width: 50rem;
  }

  
</style>