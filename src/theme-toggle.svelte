<script lang="ts">
  type Theme = 'light' | 'dark';

  const storageKey = 'theme-preference';
  const systemTheme: Theme =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'dark'
      : 'light';
  const userTheme =
    typeof localStorage !== 'undefined' ? (localStorage.getItem(storageKey) as Theme | null) : null;

  let theme = $state<Theme>(userTheme || systemTheme);

  // Apply initial theme
  $effect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  });

  function toggleTheme(): void {
    theme = theme === 'dark' ? 'light' : 'dark';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(storageKey, theme);
    }
  }
</script>

<button
  onclick={toggleTheme}
  class="theme-toggle style-toggle"
  title="Toggles light & dark"
  aria-label={theme}
  aria-live="polite"
>
  {#if theme === 'light'}
    🌞
  {:else}
    🌛
  {/if}
</button>

<style>
  .theme-toggle {
    appearance: none;
    border: none;
    background: none;
  }

  .style-toggle {
    position: absolute;
    right: 8px;
    top: 8px;
  }
</style>
