<script lang="ts">

import Group from "../classes/Group";

    import Input from "../classes/Input";


    import NumberInput from "../classes/NumberInput";
    import NumberInputComp from "./NumberInput.svelte";

    import TextInput from "../classes/TextInput";
    import TextInputComp from "./TextInput.svelte";

    import ToggleInput from "../classes/ToggleInput";
    import ToggleInputComp from "./ToggleInput.svelte";

    import IncrementalNumberInputComp from "./IncrementalNumberInput.svelte";
    import IncrementalNumberInput from "../classes/IncrementalNumberInput";

    import PillBoxInput from "../classes/PillBoxInput";
    import PillBoxInputComp from "./PillBoxInput.svelte";

    export let input: Input;

    

</script>

<div class="generic-input">

    
    {#if input instanceof ToggleInput}
    
    <ToggleInputComp bind:input={input}/>
    
    {:else if input instanceof TextInput}
    
    <TextInputComp bind:input={input}/>
    
    {:else if input instanceof NumberInput}
    
    <NumberInputComp bind:input={input}/>
    
    {:else if input instanceof IncrementalNumberInput}
    
    <IncrementalNumberInputComp bind:input={input}></IncrementalNumberInputComp>
    
    {:else if input instanceof PillBoxInput}
    
    <PillBoxInputComp bind:input={input}/>
    
    {/if}

    
    
</div>

<style>

    .generic-input {
        margin-bottom: 1rem;
    }
</style>