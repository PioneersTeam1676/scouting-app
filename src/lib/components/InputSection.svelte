<script lang=ts>
    import InputSection from "./InputSection";


    export let section: InputSection;

</script>


<div class="section {section.visible ? "section-visible" : "section-invisible"}">

    <h1>{section.header}</h1>

    {#if section.helpText != ""}
        
    {/if}

    <hr/>



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

    .page-visible {
        display: block;
        opacity: 1;
    }
    
    .page-invisible {
        display: none;
        opacity: 0;
    }

</style>