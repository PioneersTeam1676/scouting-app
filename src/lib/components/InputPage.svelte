<script lang="ts">
    import InputPage from "./InputPage";
    import InputSection from "./InputSection.svelte";
    import { InputPageButton } from "./InputPage"
    import { Button, Input } from "sveltestrap";


    export let page: InputPage;

    let visible = page.isVisible();

    page.visible.subscribe((bool) => {
        visible = bool;
        console.log(bool);
        page.sections = page.sections;
    });

    let disabled = true;

    $: {
        if(page.isVisible()) {
        if(InputPage.app.userId == undefined) {
            disabled = true;
        } else if(page.hasEmptyInput(page)) {
            console.log("ive got an emoty thing")
            disabled = true;
        } else {
            disabled = false;
        }

            console.log(disabled)
        }
    }

</script>

{#each page.sections as section}

    <InputSection bind:section={section}></InputSection>

{/each}
<div class="section {visible ? "section-visible" : "section-invisible"}">

    <div class="button-container">

        {#each page.buttons as button}
            
            {#if button == InputPageButton.submit}
                
                <Button color="success" on:click={() => {InputPage.app.submitForm(); InputPage.app = InputPage.app}} disabled={disabled}>Submit</Button>

            {:else if button == InputPageButton.cancel}

                <Button color="danger" on:click={() => {InputPage.app.resetForm(); InputPage.app = InputPage.app}}>Cancel</Button>

            {:else if button == InputPageButton.next}

                <Button color="success" on:click={() => {InputPage.app.nextPage(); InputPage.app.activePage = InputPage.app.activePage;}} disabled={disabled}>Next</Button>

            {/if}

        {/each}

    </div>

</div>

<style>

    .section {
        backdrop-filter: blur(0.5rem);
        border: 0.18rem solid gray;
        border-radius: 0.3rem;
        width: 100%;
        padding: 0.3rem 0.6rem;
        margin-bottom: 0.6rem;
        margin-left: 0.06rem;
        margin-right: 0.06rem;
    }

    .section-visible {
        display: block;
        opacity: 1;
    }
    
    .section-invisible {
        display: none;
        opacity: 0;
    }

    .button-container {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }

</style>