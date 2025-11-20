<script lang="ts">
  import ThemeToggle from './theme-toggle.svelte';
  import AgeInput from './age-input.svelte';
  import Timer from './timer.svelte';
  import { getStoredAge } from './store';

  let age = $state<number>(getStoredAge());

  function handleEnter(value: number): void {
    age = value;
    if (typeof localStorage !== 'undefined') {
      window.localStorage.setItem('age', String(age));
      window.localStorage.setItem('updateAt', String(Date.now()));
    }
  }
</script>

<ThemeToggle />
<main>
  <h1>What Kind of Life do You Want to Live?</h1>
  {#if Number.isNaN(age)}
    <AgeInput onenter={handleEnter} />
  {:else}
    <Timer {age} updateAt={typeof localStorage !== 'undefined' ? (parseInt(localStorage.getItem('updateAt') || '20') || Date.now()) : Date.now()} />
  {/if}
</main>

<style>
  main {
    margin-top: 10vh;
    text-align: center;
  }

  h1 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 40px;
  }
</style>
