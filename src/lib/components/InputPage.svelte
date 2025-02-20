<script lang="ts">
    import InputPage from "./InputPage";
    import InputSection from "./InputSection.svelte";
    import { InputPageButton } from "./InputPage"
    import { Button } from "sveltestrap";


    export let page: InputPage;

</script>

{#each page.sections as section}

    <InputSection section={section}></InputSection>

{/each}

<div class="section {page.isVisible() ? "section-visible" : "section-invisible"}">

    <div class="button-container">

        {#each page.buttons as button}
            
            {#if button == InputPageButton.submit}
                
                <Button color="success" on:click={() => {InputPage.app.submitForm()}}>Submit</Button>

            {:else if button == InputPageButton.cancel}

                <Button color="danger" on:click={() => {InputPage.app.resetForm()}}>Cancel</Button>

            {:else if button == InputPageButton.next}

                <Button color="success" on:click={() => {InputPage.app.nextPage()}}>Next</Button>

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
    }

</style>