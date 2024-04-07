<script>
  const storageKey = 'theme-preference';
  const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light';
  const userTheme = localStorage.getItem(storageKey);

  let theme = userTheme || systemTheme;
  if (theme === 'dark') {
    document.body.classList.add(theme);
  }

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(storageKey, theme);
    document.body.classList.toggle('dark');
  }
</script>

<button
  on:click={toggleTheme}
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
