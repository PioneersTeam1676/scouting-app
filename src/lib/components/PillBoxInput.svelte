<script lang="ts">
    import { ListGroupItem, ListGroup } from "sveltestrap";
    import PillBoxInput from "./PillBoxInput";
    import HelpButton from "./HelpButton.svelte";


    export let input: PillBoxInput;


</script>

<span>{input.questionText} <span style="font-size: x-small;">(Select one)</span>

    {#if input.helpText != ""}
        <HelpButton msg={input.helpText}/>
    {/if}

</span>

<ListGroup horizontal={input.orientation == 0}>
    
    {#each input.options as option, i}
        <ListGroupItem color="dark" tag="button" active={input.value == i} value={input.values[i]} on:click={() => {input.updateValue(i); input = input}}>{option}</ListGroupItem>
    {/each}

</ListGroup>