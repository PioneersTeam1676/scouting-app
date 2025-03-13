<script lang="ts" context="module">
  import { Router, router } from "../.routify/instance.default.js";
  import '@ionic/core/css/palettes/dark.always.css';

  /* Theme variables */
  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  toggleDarkTheme(prefersDark.matches);

  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addEventListener('change', (mediaQuery) => toggleDarkTheme(mediaQuery.matches));

  // Add or remove the "dark" class based on if the media query matches
  function toggleDarkTheme(shouldAdd) {
  document.body.classList.toggle('dark', shouldAdd);
}

  export const load = (url) => router.url.replace(url);
</script>

<Router {router} />

<style>
  /* :root {
    color-scheme: dark only;
  } */
</style>
