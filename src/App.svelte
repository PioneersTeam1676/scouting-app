<script lang="ts" context="module">
  import { Router, router } from "../.routify/instance.default.js";
  import '@ionic/core/css/palettes/dark.always.css';

  /* Theme variables */
  import "./theme/variables.css";

  export const load = (url) => router.url.replace(url);
</script>

<Router {router} />

<style>
  /* :root {
    color-scheme: dark only;
  } */
</style>
