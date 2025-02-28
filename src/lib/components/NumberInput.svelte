<script lang="ts">
    import { Input, InputGroup, InputGroupText } from "sveltestrap";
import NumberInput from "./NumberInput";
    import HelpButton from "./HelpButton.svelte";


    export let input: NumberInput;

</script>

<div>
    <InputGroup>
        
        <InputGroupText>
            {#if input.helpText != ""}
            <HelpButton msg={input.helpText}/>
            {/if}
            {input.helpText}
        </InputGroupText>
        <Input type="number" bind:value={input.value} max={input.max} min={input.min}/>
        
    </InputGroup>
</div>