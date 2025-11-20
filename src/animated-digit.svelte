<script>
  let { value } = $props();

  let oldValue = $state(value);
  let isAnimating = $state(false);

  $effect(() => {
    if (value !== oldValue && !isAnimating) {
      isAnimating = true;
      setTimeout(() => {
        oldValue = value;
        isAnimating = false;
      }, 600);
    }
  });
</script>

<div class="digit-container" class:animating={isAnimating}>
  {#if isAnimating}
    <span class="digit digit-old">{oldValue}</span>
  {/if}
  <span class="digit digit-new" class:entering={isAnimating}>
    {value}
  </span>
</div>

<style>
  .digit-container {
    display: inline-block;
    position: relative;
    overflow: hidden;
    min-width: 0.6em;
    height: 1.2em;
    -webkit-mask-image: linear-gradient(to bottom,
      transparent 0%,
      black 15%,
      black 85%,
      transparent 100%);
    mask-image: linear-gradient(to bottom,
      transparent 0%,
      black 15%,
      black 85%,
      transparent 100%);
  }

  .digit {
    display: inline-block;
  }

  .digit-old {
    position: absolute;
    top: 0;
    left: 0;
    animation: slideOut 0.6s ease-in-out;
  }

  .digit-new {
    position: relative;
  }

  .digit-new.entering {
    animation: slideIn 0.6s ease-in-out;
  }

  @keyframes slideOut {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
