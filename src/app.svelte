<script>
  import ThemeToggle from './theme-toggle.svelte';
  import AgeInput from './age-input.svelte';
  import Timer from './timer.svelte';
  import { getStoredAge } from './store';

  let age = getStoredAge();

  function handleEnter(event) {
    age = event.detail;
    localStorage.setItem('age', age);
    localStorage.setItem('updateAt', Date.now());
  }
</script>

<ThemeToggle />
<main>
  <h1>What Kind of Life do You Want to Live?</h1>
  {#if Number.isNaN(age)}
    <AgeInput on:enter={handleEnter} />
  {:else}
    <Timer {age} updateAt={parseInt(localStorage.getItem('updatedAt')) || Date.now()} />
  {/if}
</main>
