<script lang="ts">

import Group from "./Group";

    import Input from "./Input";


    import NumberInput from "./NumberInput";
    import NumberInputComp from "./NumberInput.svelte";

    import TextInput from "./TextInput";
    import TextInputComp from "./TextInput.svelte";

    import ToggleInput from "./ToggleInput";
    import ToggleInputComp from "./ToggleInput.svelte";

    import IncrementalNumberInputComp from "./IncrementalNumberInput.svelte";
    import IncrementalNumberInput from "./IncrementalNumberInput";

    import PillBoxInput from "./PillBoxInput";
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