<script lang="ts">
    import { ListGroupItem, ListGroup } from "sveltestrap";
    import PillBoxInput from "./PillBoxInput";


    export let input: PillBoxInput;

</script>

<ListGroup horizontal={input.orientation == "Horizontal"}>
    
    {#each input.options as option, i}
        <ListGroupItem color="dark" tag="button" active={input.value == i} value={input.values[i]} on:click={() => {input.updateValue(i)}}>{option}</ListGroupItem>
    {/each}

</ListGroup>