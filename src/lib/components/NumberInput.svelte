<script lang="ts">
    import { Input, InputGroup, InputGroupText } from "sveltestrap";
import NumberInput from "../classes/NumberInput";
    import HelpButton from "./HelpButton.svelte";

    export let input: NumberInput;

</script>

<div>
    <InputGroup>
        
        <InputGroupText type="number">
            {#if input.helpText != ""}
            <HelpButton msg={input.helpText}/>
            {/if}
            {input.questionText}
        </InputGroupText>
        <Input type="number" bind:value={input.value} max={input.max} min={input.min}/>
        
    </InputGroup>
</div>