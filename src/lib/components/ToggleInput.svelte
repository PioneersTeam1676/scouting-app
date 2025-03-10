<script lang="ts">
    import HelpButton from "./HelpButton.svelte";
    import ToggleInput from "./ToggleInput";
    import { Input } from "sveltestrap";


    export let input: ToggleInput;

</script>

<div class="toggle-input-container">


    <Input color="dark" bsSize="lg" type="switch" label={input.questionText} bind:checked={input.value}/>

    {#if input.helpText != ""}
            
        <HelpButton msg={input.helpText}/>
    {/if}



</div>

<style>
    .toggle-input-container {
        display: flex;
        /* padding-left: 2.5rem; */
        align-items: center;
    }
</style>