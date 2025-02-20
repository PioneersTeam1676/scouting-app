<script lang="ts">
    import { Input, InputGroup, InputGroupText } from "sveltestrap";
import TextInput from "./TextInput";
    import HelpButton from "./HelpButton.svelte";

    export let input: TextInput;

</script>


<InputGroup size="sm">
    <InputGroupText>
        {#if input.questionText != ""}
            <HelpButton msg={input.questionText}/>
        {/if}
        {input.questionText}</InputGroupText>
    <Input bind:value={input.value}/>
</InputGroup>