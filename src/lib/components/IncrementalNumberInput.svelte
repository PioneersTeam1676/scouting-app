<script lang="ts">
    import { InputGroup, InputGroupText, Input, Button } from "sveltestrap";
import IncrementalNumberInput from "./IncrementalNumberInput";
    import HelpButton from "./HelpButton.svelte";

    
    export let input: IncrementalNumberInput;

</script>

<InputGroup>

    <InputGroupText>
        {input.questionText}
        
        {#if input.questionText != ""}
            <HelpButton msg={input.helpText}/>
        {/if}

    </InputGroupText>

    <Button color="danger" on:click={() => {input.decrement()}}>-</Button>
  
    <Input type="number" bind:value={input.value}/>
    
    <Button color="success" on:click={() => {input.increment()}}>+</Button>

</InputGroup>