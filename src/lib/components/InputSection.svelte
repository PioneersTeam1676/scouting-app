<script lang=ts>
    import Group from "./Group";
    import GroupComp from "./Group.svelte";

    import HelpButton from "./HelpButton.svelte";
    import Input from "./Input";
    import InputSection from "./InputSection";
    import GenericInput from "./GenericInput.svelte";

    export let section: InputSection;

</script>


<div class="section {section.visible ? "section-visible" : "section-invisible"}">

    <h1>{section.header}</h1>

    {#if section.helpText != ""}
        <HelpButton msg={section.helpText}/>
    {/if}

    <hr/>

    {#each section.elements as item}
        
        {#if item instanceof Input}

        <GenericInput input={item}/>

        {:else if item instanceof Group}

            <GroupComp group={item}/>

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

</style>