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
  id="theme-toggle"
  title="Toggles light & dark"
  aria-label={theme}
  aria-live="polite"
>
  🌞
</button>

<style>
  .theme-toggle {
    appearance: none;
    border: none;
    background: none;
  }
</style>
