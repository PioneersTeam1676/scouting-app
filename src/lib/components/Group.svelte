<script lang="ts">
    import GenericInput from "./GenericInput.svelte";
    import Group from "./Group";
    import HelpButton from "./HelpButton.svelte";


    export let group: Group;

</script>


<div>

    <label for={group.title} class="form-label">
        {group.title}

        {#if group.helpText != ""}
            <HelpButton msg={group.helpText}/>
        {/if}
    </label>

    <div class="group-container">

        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={group.img} class="group-image"/>
        
        <div class="inputs-group-container">

            {#each group.inputs as input}
                
                <GenericInput input={input}/>

            {/each}

        </div>

    </div>

</div>

<style>

    .form-label {
        font-size: 1rem;
        color: white;
        width: 100%;
        margin-top: 1.125rem;
        margin-bottom: 0rem;
    }
    .group-container {
        display: grid;
        justify-content: space-between;
        grid-template-columns: 40% 60%;
    }
    .group-image {
        width: 8rem;
        height: 8rem;
        margin: auto auto;
        box-sizing: border-box;
        border-radius: 0.3125rem;
    }
    .inputs-group-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0.3125rem;
    }

</style>