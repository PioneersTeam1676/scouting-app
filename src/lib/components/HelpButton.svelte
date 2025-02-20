<script lang="ts">

    export let msg: string = "";

</script>


<button class="help-btn" on:click={() => {alert(msg)}}>?</button>

<style>
    .help-btn {
        margin-right: 0.3125rem;
        border-radius: 50%;
        display: inline;
        border: none;
        background: rgb(100, 100, 100);
        width: 1.25rem;
        height: 1.25rem;
    }
</style>