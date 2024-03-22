<script>
  import { createEventDispatcher } from 'svelte';
  import { getStoredAge } from './store';

  const dispatch = createEventDispatcher();
  let age = getStoredAge();

  function handleEnter(e) {
    if (e.key !== 'Enter') {
      return;
    }

    dispatch('enter', Math.max(0, Math.min(age, 110)));
  }
</script>

<p>Please input you age:</p>
<input bind:value={age} type="number" placeholder="eg: 36" on:keydown={handleEnter} />
