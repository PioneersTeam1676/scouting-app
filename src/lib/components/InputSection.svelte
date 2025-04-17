<script lang=ts>
    import Group from "../classes/Group";
    import GroupComp from "./Group.svelte";

    import HelpButton from "./HelpButton.svelte";
    import Input from "../classes/Input";
    import InputSection from "../classes/InputSection";
    import GenericInput from "./GenericInput.svelte";

    export let section: InputSection;

</script>


<div class="section {section.visible ? "section-visible" : "section-invisible"}">

    <span class="section-header"><span class="section-header-text">{section.header}</span>

        {#if section.helpText != ""}
        <HelpButton msg={section.helpText}/>
        {/if}
    </span>

    <hr color="white"/>

    {#each section.elements as item}
        
        {#if item instanceof Input}

        <GenericInput bind:input={item}/>


        {:else if item instanceof Group}

            <GroupComp bind:group={item}/>

        {/if}

    {/each}



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

    .section-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin: 1rem
    }

    hr {
        width: 100%;
    }

    .section-header-text {
        font-size: x-large;
        font-weight: bold;
        text-align: center;
    }

</style>