const questions = [
  {
    text: "What is the capital of France?",
    choices: ["Berlin", "Paris", "Rome", "Madrid"],
    answer: 1 // index of correct choice
  },
  {
    text: "Which language runs in the browser?",
    choices: ["Java", "C#", "JavaScript", "Python"],
    answer: 2
  },
  {
    text: "2 + 2 equals?",
    choices: ["3", "4", "5", "22"],
    answer: 1
  }
];

let current = 0;
let score = 0;
let startTime = Date.now();
let timerInterval = null;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next');
const timerEl = document.getElementById('timer');

function startTimer() {
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerEl.textContent = `Time: ${elapsed}s`;
  }, 1000);
}

function showQuestion(idx) {
  const q = questions[idx];
  questionEl.textContent = q.text;
  // use map to create button HTML strings
  const buttons = q.choices.map((c, i) => {
    return `<button data-index="${i}">${c}</button>`;
  }).join('');
  choicesEl.innerHTML = buttons;
feedbackEl.textContent = '';
  nextBtn.style.display = 'none';
  // add click listeners
  choicesEl.querySelectorAll('button').forEach(btn => {
    // we are converting the string index back to number here
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
  });
}

function handleAnswer(selectedIdx) {
  const q = questions[current];
  const correct = selectedIdx === q.answer;
  if (correct) {
    score++;
    feedbackEl.textContent = 'Correct!';
  } else {
    feedbackEl.textContent = `Wrong. Correct answer: ${q.choices[q.answer]}`;
  }
  // disable further clicking
  choicesEl.querySelectorAll('button').forEach(b => b.disabled = true);
  if (current < questions.length - 1) {
    nextBtn.style.display = 'inline';
  } else {
    endGame();
  }
}

function nextQuestion() {
  current++;
  showQuestion(current);
}

function endGame() {
  clearInterval(timerInterval);
  const totalTime = Math.floor((Date.now() - startTime) / 1000);
  questionEl.textContent = 'Game Over!';
  choicesEl.innerHTML = '';
  feedbackEl.textContent = `Your score: ${score}/${questions.length}. Time taken: ${totalTime}s`;
  nextBtn.style.display = 'none';
}

nextBtn.addEventListener('click', nextQuestion);

// Initialize
startTimer();
showQuestion(current);
