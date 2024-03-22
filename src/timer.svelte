<script>
  import { ACTUARIAL_LIFE_TABLE } from './store';
  export let age;
  export let updateAt;

  const currentAge = (Date.now() - updateAt) / 1000 / 3600 / 24 / 365 + age;
  const lifeExpectancy = ACTUARIAL_LIFE_TABLE[currentAge] * 365 * 24 * 3600 * 1000;
  const started = Date.now();
  let days = lifeExpectancy / 1000 / 3600 / 24;

  function updateTimer() {
    const pasted = Date.now() - started;
    days = (lifeExpectancy - pasted) / 1000 / 3600 / 24;
    requestAnimationFrame(updateTimer);
  }

  requestAnimationFrame(updateTimer);
</script>

<div class="hourglass">
  <h2 class="time-title">time left</h2>
  <p id="timer">{days.toFixed(6)}</p>
  <span>days</span>
</div>
