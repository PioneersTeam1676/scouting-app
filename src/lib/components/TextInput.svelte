<script lang="ts">
    import { Input, InputGroup, InputGroupText } from "sveltestrap";
import TextInput from "../classes/TextInput";
    import HelpButton from "./HelpButton.svelte";

    export let input: TextInput;

</script>


<InputGroup size="sm">
    <InputGroupText>
        {#if input.helpText != ""}
            <HelpButton msg={input.helpText}/>
        {/if}
        {input.questionText}</InputGroupText>
    <Input bind:value={input.value}/>
</InputGroup>