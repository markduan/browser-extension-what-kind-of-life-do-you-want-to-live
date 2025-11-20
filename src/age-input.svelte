<script lang="ts">
  import { getStoredAge } from './store';

  interface Props {
    onenter?: (age: number) => void;
  }

  let { onenter }: Props = $props();
  let age = $state<number>(getStoredAge());

  function handleEnter(e: KeyboardEvent): void {
    if (e.key !== 'Enter') {
      return;
    }

    onenter?.(Math.max(0, Math.min(age, 110)));
  }
</script>

<p>Please input you age:</p>
<input bind:value={age} type="number" placeholder="eg: 36" onkeydown={handleEnter} />
