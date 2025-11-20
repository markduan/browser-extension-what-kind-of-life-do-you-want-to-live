<script>
  import { ACTUARIAL_LIFE_TABLE } from './store';
  import AnimatedDigit from './animated-digit.svelte';

  let { age, updateAt } = $props();

  const YEAR_MILLISECONDS = 1000 * 3600 * 24 * 365;
  const DAY_MILLISECONDS = 1000 * 3600 * 24;
  const HOUR_MILLISECONDS = 1000 * 3600;
  const MINUTE_MILLISECONDS = 1000 * 60;
  const SECOND_MILLISECONDS = 1000;

  const currentAge = age + (Date.now() - updateAt) / YEAR_MILLISECONDS;
  const lifeExpectancy = ACTUARIAL_LIFE_TABLE[Math.floor(currentAge)] * YEAR_MILLISECONDS;
  const started = Date.now();

  let years = $state(0);
  let days = $state(0);
  let minutes = $state(0);
  let seconds = $state(0);

  function updateTimer() {
    const elapsed = Date.now() - started;
    const remaining = lifeExpectancy - elapsed;

    years = Math.floor(remaining / YEAR_MILLISECONDS);
    const remainingAfterYears = remaining % YEAR_MILLISECONDS;

    days = Math.floor(remainingAfterYears / DAY_MILLISECONDS);
    const remainingAfterDays = remainingAfterYears % DAY_MILLISECONDS;

    minutes = Math.floor(remainingAfterDays / MINUTE_MILLISECONDS);
    const remainingAfterMinutes = remainingAfterDays % MINUTE_MILLISECONDS;

    seconds = Math.floor(remainingAfterMinutes / SECOND_MILLISECONDS);

    requestAnimationFrame(updateTimer);
  }

  requestAnimationFrame(updateTimer);
</script>

<div class="hourglass">
  <h2 class="time-title">time left</h2>
  <div class="timer">
    <div class="time-unit">
      <div class="digits">
        <AnimatedDigit value={String(years).padStart(2, '0')[0]} />
        <AnimatedDigit value={String(years).padStart(2, '0')[1]} />
      </div>
      <span class="label">years</span>
    </div>
    <div class="time-unit">
      <div class="digits">
        <AnimatedDigit value={String(days).padStart(3, '0')[0]} />
        <AnimatedDigit value={String(days).padStart(3, '0')[1]} />
        <AnimatedDigit value={String(days).padStart(3, '0')[2]} />
      </div>
      <span class="label">days</span>
    </div>
    <div class="time-unit">
      <div class="digits">
        <AnimatedDigit value={String(minutes).padStart(2, '0')[0]} />
        <AnimatedDigit value={String(minutes).padStart(2, '0')[1]} />
      </div>
      <span class="label">minutes</span>
    </div>
    <div class="time-unit">
      <div class="digits">
        <AnimatedDigit value={String(seconds).padStart(2, '0')[0]} />
        <AnimatedDigit value={String(seconds).padStart(2, '0')[1]} />
      </div>
      <span class="label">seconds</span>
    </div>
  </div>
</div>

<style>
  .timer {
    margin: 0;
    margin-top: 20px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    flex-wrap: nowrap;
  }

  .time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .digits {
    display: flex;
    gap: 4px;
    font-family: monospace;
    font-size: 120px;
    font-weight: bold;
  }

  .label {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
  }

  .hourglass {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .time-title {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    position: relative;
    left: 0;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 2px;
    text-align: center;
  }
</style>
