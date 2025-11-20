<script>
  import { animationStyle, ANIMATION_STYLES } from './store';

  let isOpen = $state(false);

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectStyle(styleId) {
    animationStyle.set(styleId);
    isOpen = false;
  }

  function handleClickOutside(event) {
    if (isOpen && !event.target.closest('.animation-switcher')) {
      isOpen = false;
    }
  }

  let currentStyle = $derived(ANIMATION_STYLES.find(s => s.id === $animationStyle) || ANIMATION_STYLES[0]);
</script>

<svelte:window on:click={handleClickOutside} />

<div class="animation-switcher">
  <button class="switcher-button" onclick={toggleDropdown} type="button">
    <span class="button-icon">✨</span>
    <span class="button-text">{currentStyle.name}</span>
    <span class="button-arrow" class:open={isOpen}>▼</span>
  </button>

  {#if isOpen}
    <div class="dropdown">
      {#each ANIMATION_STYLES as style}
        <button
          class="dropdown-item"
          class:active={style.id === $animationStyle}
          onclick={() => selectStyle(style.id)}
          type="button"
        >
          <div class="item-content">
            <span class="item-name">{style.name}</span>
            <span class="item-description">{style.description}</span>
          </div>
          {#if style.id === $animationStyle}
            <span class="item-check">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .animation-switcher {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
  }

  .switcher-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: var(--bg-color, #fff);
    border: 2px solid var(--border-color, #ddd);
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .switcher-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .button-icon {
    font-size: 16px;
  }

  .button-text {
    color: var(--text-color, #333);
  }

  .button-arrow {
    font-size: 10px;
    transition: transform 0.2s ease;
    color: var(--text-color, #666);
  }

  .button-arrow.open {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 280px;
    background: var(--bg-color, #fff);
    border: 2px solid var(--border-color, #ddd);
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    animation: slideDown 0.2s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: var(--bg-color, #fff);
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease;
    border-bottom: 1px solid var(--border-color, #eee);
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .dropdown-item:hover {
    background: var(--hover-bg, #f5f5f5);
  }

  .dropdown-item.active {
    background: var(--active-bg, #e8f4ff);
  }

  .item-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .item-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--text-color, #333);
  }

  .item-description {
    font-size: 12px;
    color: var(--text-color-secondary, #666);
  }

  .item-check {
    font-size: 16px;
    color: var(--accent-color, #4a90e2);
    font-weight: bold;
  }

  @media (prefers-color-scheme: dark) {
    .switcher-button,
    .dropdown,
    .dropdown-item {
      --bg-color: #2d2d2d;
      --border-color: #444;
      --text-color: #fff;
      --text-color-secondary: #aaa;
      --hover-bg: #3a3a3a;
      --active-bg: #1a3a52;
      --accent-color: #64b5f6;
    }
  }
</style>
