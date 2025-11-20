<script>
  import { getStoredAge } from './store';

  let { onenter } = $props();
  let age = $state(getStoredAge());

  function handleEnter(e) {
    if (e.key !== 'Enter') {
      return;
    }

    onenter?.(Math.max(0, Math.min(age, 110)));
  }
</script>

<p>Please input you age:</p>
<input bind:value={age} type="number" placeholder="eg: 36" onkeydown={handleEnter} />
