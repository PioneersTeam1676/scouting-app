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
        
        {#if input instanceof ToggleInput}

            <ToggleInputComp input={input}/>

        {:else if input instanceof TextInput}

            <TextInputComp input={input}/>

        {:else if input instanceof NumberInput}

            <NumberInputComp input={input}/>
        
        {:else if input instanceof IncrementalNumberInput}

            <IncrementalNumberInputComp input={input}></IncrementalNumberInputComp>

        {:else if input instanceof PillBoxInput}

            <PillBoxInputComp input={input}/>

        {/if}

        
