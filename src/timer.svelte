<script>
  import { ACTUARIAL_LIFE_TABLE } from './store';
  export let age;
  export let updateAt;

  const YEAR_MILLISECONDS = 1000 * 3600 * 24 * 365;
  const DAY_MILLISECONDS = 1000 * 3600 * 24;

  const currentAge = age + (Date.now() - updateAt) / YEAR_MILLISECONDS;
  const lifeExpectancy = ACTUARIAL_LIFE_TABLE[currentAge] * YEAR_MILLISECONDS;
  const started = Date.now();
  let days = lifeExpectancy / DAY_MILLISECONDS;

  function updateTimer() {
    const pasted = Date.now() - started;
    days = (lifeExpectancy - pasted) / DAY_MILLISECONDS;
    requestAnimationFrame(updateTimer);
  }

  requestAnimationFrame(updateTimer);
</script>

<div class="hourglass">
  <h2 class="time-title">time left</h2>
  <p class="timer">{days.toFixed(6)}</p>
  <span>days</span>
</div>

<style>
  .timer {
    margin: 0;
    margin-top: 10px;
    padding: 0;
    font-family: monospace;
    font-size: 48px;
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
  }
</style>
