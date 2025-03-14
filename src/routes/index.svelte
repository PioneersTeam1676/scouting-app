<script lang="ts">

  const VERSION = 8;

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
    import { InputGroup, InputGroupText, Modal } from "sveltestrap";
    import { InputPageButton } from "$lib/components/InputPage";
    import InputPageComp from "$lib/components/InputPage.svelte";

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
async function getActiveForm(): Promise<any> {
  
  let req = await fetch(`${url}/api/form/active`, {
    method: "GET",
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  
  let res = await req.json();
  
  if(Array.isArray(res)) {
    if(res.length == 1) {
      return res[0];
    } 
  }
  
  return -1;
}

  let app = new App([]);
  const url = "https://scout-backend.team1676.com";

  app.url = url;

  let users: { uid: number, dash_id: number, name: string, img: string }[] = [];
  let activeUser: {uid: number, dash_id: number, name: string, img: string} = {uid: -1, dash_id: -1, name: "...", img: "placeholder.jpg"}

  if(localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  // auto updates the user id in the local storage whenever it changes
  $:{
    if(typeof app.userId == "number") {
      localStorage.setItem("user-id", app.userId + "");
      activeUser = users.find((val) => val.dash_id == app.userId);
      app.userName = activeUser.name;
    }
  }

  // auto updates the offline/online
  $: {
    app.isOffline = !navigator.onLine;
  }

  console.log("v5")

  onMount(async () => {

    // update the users

    if(navigator.onLine) {
      let req = await request(`${url}/api/user/active`, "GET");
      
      if(req[0]?.dash_id != undefined) {
        users = req;
        localStorage.setItem("users", JSON.stringify(users));
      } 
    }
    
    users = JSON.parse(localStorage.getItem("users"));

    // get the active form

    let activeForm = undefined;

    if(navigator.onLine) {
      activeForm = await getActiveForm();
      app.uid = activeForm.uid;
      app.url = url;
      app.headerDisplay = (activeForm.inputs_on_header as string).split(",").map((val) => Number.parseInt(val));
      console.log(app.headerDisplay);
      app.version = activeForm.version;
      app.csvOrder = activeForm.csv_order.split(",");
    }

    

    if(activeForm?.version != undefined && localStorage.getItem(App.APP_STORAGE_LOCATION) != null && (app.version <= JSON.parse(localStorage.getItem(App.APP_STORAGE_LOCATION)).version) || !navigator.onLine) {

      app = App.readFromLocalStorage();
      app.setHeaderDisplays(app.headerDisplay);

      console.log("loading from local storage")
    } else {

      console.log("loading from database")

    let pages: {
      footer_buttons: string,
      footer_help_text: string,
      footer_text: string,
      form_id: number,
      name: string,
      section_help_texts: string,
      section_names: string,
      uid: number
    }[] = await request(`${url}/api/page?form_id=${activeForm.uid}`, "GET");

    for(let page of pages) {

      let sections: InputSection[] = [];

      let sectionNames = page.section_names.split(",");
      let sectionHelpTexts = page.section_help_texts.split(",");

      for(let i = 0; i < sectionNames.length; i++) {

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

          if(!sections[inputFromDB.section_index].elements.includes(group)) {
            sections[inputFromDB.section_index].elements.push(group);
          }

        } else {
          sections[inputFromDB.section_index].elements.push(input);
        }
      }

      let p = new InputPage(sections, (page.footer_buttons.split(",") as InputPageButton[]), page.footer_text, page.footer_help_text, page.name);

      app.pages.push(p);

    }

  }


  // app.isOffline = false;
  app.activePage = app.activePage;
  app.setHeaderDisplays(app.headerDisplay);
  if(localStorage.getItem("user-id") != undefined) {
    app.userId = Number.parseInt(localStorage.getItem("user-id"));
  }
  InputPage.app = app;
  app.nextPage();


    console.log(users);


    localStorage.setItem(App.APP_STORAGE_LOCATION, JSON.stringify(app));

  });



  window.addEventListener("offline", () => {
    app.isOffline = true;
  });
  window.addEventListener("online", () => {
    app.isOffline = false;
  });

  let open = false;
  const toggle = () => {

    if(app.activePage == 0) open = !open;

  };




</script>

<ion-header translucent="true">
  
  <ion-toolbar class="toolbar">

    <!-- left side of header - TODO: add ability to make this side customizable and update with input update -->
  <div slot="start" class="view-left">
    <div class="header-item">
      <span class="header-item-text-desc">{app.headerInputs[0]?.questionText || "Loading..."}</span>
      <span class="header-item-text-val">{app.headerInputs[0]?.value != undefined ? app.headerInputs[0].value : ""}</span>
    </div>

    <div class="header-item">
      <span class="header-item-text-desc">{app.headerInputs[1]?.questionText || "Loading..."}</span>
      <span class="header-item-text-val">{app.headerInputs[1]?.value != undefined ? app.headerInputs[1].value : ""}</span>
    </div>

    <div class="header-item">
      <span class="header-item-text-val" style="color: #ffcc00;">{app.uid == undefined ? "Loading Form..." : `v${VERSION}.${app.uid}.${app.version}`}</span>
    </div>

  </div>
  
  <!-- center of header -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="pfp-container" on:click={toggle}> <img src="/img/profiles/100/{activeUser.img}" alt="profile" class="pfp-image"/> </div>
  

  <!-- right of header -->
  <div slot="end">
      <div class="header-item">
        <span class="header-item-text-val">{activeUser.name}</span>
      </div>
      <div class="header-item">
        <span class="header-item-text-val">uid-{activeUser.dash_id}</span>
      </div>
      <div class="header-item" style="display:flex; gap: 0.5rem;">
            <span class="blink" style="{app.isOffline ? "background-color: #f56c6c;" : ""}"></span>
            <!-- if isOffline then say so, otherwise, say so -->
          <span class="header-item-text-val" style="color:{app.isOffline ? " #f56c6c" : " #2f9c4e"};">{(app.isOffline) ? "Offline" : "Online"}</span>

      </div>
  </div>
  
  </ion-toolbar>
</ion-header>

<ion-content fullscreen="true" class="ion-padding gears">

  <Modal body header="Sign In" isOpen={open} {toggle} size="lg" keyboard={false}>

    {#await users}

      <p>Loading users...</p>
      
    {:then users} 

    <div class="users">

      
      {#each users as user}
      
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="user-item {user.dash_id == app.userId ? "active-user" : ""}" on:click={() => {app.userId = user.dash_id; InputPage.app = app}}>
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="/img/profiles/100/{user.img}"/>
        <p>{user.name} - <span style="font-weight: bolder;">{user.dash_id}</span></p>
      </div>
      
      {/each}
    </div>
      
    {/await}


  </Modal>


  <div class="main-content">

    {#each app.pages as page}
      
      <InputPageComp bind:page={page}/>

    {/each}


  </div>
</ion-content>


<style>

  * {
    font-family: sans-serif;
  }

  .users {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 0.25rem;
  }

  .user-item {
    border-width: 0.1rem;
    border-color: #ffcc00;
    border-style: solid;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem;
  }
  
  .active-user {
    background-color: rgba(5, 5, 5, 0.5);
  }

  .user-item > p {
    margin: 0px;
  }

  .user-item > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
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

  .view-left {
    min-width: 6.5rem;
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

  ion-content {
    --background: #212529 url("assets/gears.jpg") repeat center center / cover;
  }

  
</style>