const form = document.querySelector('.order-form');
const toast = document.querySelector('.toast');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 5000);
});
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('open');
});

const track = document.querySelector('.team-track');
const cards = [...document.querySelectorAll('.master-card')];
let slideIndex = 0;
function visibleCards() { return window.innerWidth <= 850 ? 2 : 4; }
function updateSlider() {
  const gap = 16;
  const cardWidth = (track.parentElement.clientWidth - gap * (visibleCards() - 1)) / visibleCards();
  const limit = Math.max(0, cards.length - visibleCards());
  slideIndex = Math.min(Math.max(slideIndex, 0), limit);
  track.style.transform = `translateX(-${slideIndex * (cardWidth + gap)}px)`;
}
document.querySelector('.slider-button.previous').addEventListener('click', () => { slideIndex--; updateSlider(); });
document.querySelector('.slider-button.next').addEventListener('click', () => { slideIndex++; updateSlider(); });
window.addEventListener('resize', updateSlider);
updateSlider();

const quizSteps = [...document.querySelectorAll('.quiz-step')];
const quizNext = document.querySelector('.quiz-next');
const quizBack = document.querySelector('.quiz-back');
const progress = document.querySelector('.quiz-progress i');
const progressLabel = document.querySelector('.quiz-progress span');
let quizIndex = 0;
function showQuizStep() {
  quizSteps.forEach((step, index) => step.classList.toggle('active', index === quizIndex));
  quizBack.style.visibility = quizIndex ? 'visible' : 'hidden';
  quizNext.textContent = quizIndex === quizSteps.length - 1 ? 'Вызвать мастера →' : 'Далее →';
  progress.style.background = `linear-gradient(90deg, var(--coral) ${(quizIndex + 1) * 33}%, #cbded9 ${(quizIndex + 1) * 33}%)`;
  progressLabel.textContent = `Шаг ${quizIndex + 1} из 3`;
}
quizNext.addEventListener('click', () => {
  if (quizIndex < quizSteps.length - 1) { quizIndex++; showQuizStep(); }
  else document.querySelector('#order').scrollIntoView({ behavior: 'smooth' });
});
quizBack.addEventListener('click', () => { if (quizIndex) { quizIndex--; showQuizStep(); } });
document.querySelectorAll('.time-options button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.time-options button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
}));
showQuizStep();

function updateCountdown() {
  const now = new Date();
  let deadline = new Date(now.getFullYear(), 6, 20, 23, 59, 59);
  if (deadline < now) deadline = new Date(now.getFullYear() + 1, 6, 20, 23, 59, 59);
  const secondsLeft = Math.max(0, Math.floor((deadline - now) / 1000));
  const values = [Math.floor(secondsLeft / 86400), Math.floor(secondsLeft / 3600) % 24, Math.floor(secondsLeft / 60) % 60, secondsLeft % 60];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => document.getElementById(id).textContent = String(values[index]).padStart(2, '0'));
}
updateCountdown();
setInterval(updateCountdown, 1000);
