const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light';
const userTheme = localStorage.getItem('theme');
const theme = userTheme || systemTheme;
if (theme === 'dark') {
  document.body.classList.add(theme);
}

const styleToggle = document.getElementById('style-toggle');

styleToggle.addEventListener('click', () => {
  const reverseTheme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', reverseTheme);
  document.body.classList.toggle('dark')
})

const timer = document.getElementById('timer');

const endTime = new Date('02 Feb 2077 03:04:05 GMT').valueOf();

function updateTimer() {
  const days = (endTime - new Date().valueOf()) / 1000 / 60/ 60/24;
  timer.innerHTML = days.toFixed(6);
  requestAnimationFrame(updateTimer);
}

requestAnimationFrame(updateTimer)
