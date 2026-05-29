const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    },
    {
        question: "Who wrote 'To kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        answer: 0
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["NaCl", "O2", "C02", "H2o"],
        answer: 3
    },
    {
        question: "Who is the current president of Zambia?",
        options: ["Edgar Lungu", "Michael Sata", "Hakainde Hichilema", "Levy Mwanawasa"],
        answer: 2
    },
    {
        question: "What is the answer to sin(30 degrees)?",
        options: ["0.5", "0.707", "1", "0"],
        answer: 0
    }
];

let currentQ = 0;
let score = 0;
let selected = null;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressEl = document.getElementById('progress');
const nextBtn = document.getElementById('next-btn');
const quizEl = document.getElementById('quiz');
const resultsEl = document.getElementById('results');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');

function loadQuestion() {
    selected = null;
    nextBtn.disabled = true;
    const q = questions[currentQ];

    progressEl.textContent = `Question ${currentQ + 1} of ${questions.length}`;
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';

    q.options.forEach((opt, i) =>{
        const div = document.createElement('div');
        div.classList.add("option");
        div.textContent = opt;
        div.onclick = () => selectOption(i);
        optionsEl.appendChild(div);
    });
}

function selectOption(index) {
    selected = index;
    nextBtn.disabled = false;
    document.querySelectorAll('.option').forEach((el, i) => {
        el.classList.remove('selected');
        if (i === index) el.classList.add('selected');
    });
}

nextBtn.onclick = () => {
    const correct = questions[currentQ].answer;
    const options = document.querySelectorAll('.option');

    options[correct].classList.add('correct');

    if (selected === correct) {
        options[selected].classList.add('correct');
        score++;
    } else {
        options[selected].classList.add('wrong');
    }

    options.forEach(opt => opt.style.pointerEvents = 'none');
    nextBtn.disabled = true;
    
    setTimeout(() => {
        currentQ++;
        if (currentQ < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 800);
};

function showResults() {
    quizEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
    scoreEl.textContent = `${score}/${questions.length}`;
    let feedback = score === questions.length? "Perfect score!" :
        score >= 3? "Not bad!" : "Keep practising!";
    feedbackEl.textContent = feedback;
}

function restartQuiz() {
    currentQ = 0;
    score = 0;
    resultsEl.classList.add('hidden');
    quizEl.classList.remove('hidden');
    loadQuestion();
}

const welcomeEl = document.getElementById('welcome');
const startBtn = document.getElementById('start-btn');

startBtn.onclick = () => {
    welcomeEl.classList.add('hidden');
    quizEl.classList.remove('hidden');
    loadQuestion();
};

function restartQuiz() {
    currentQ = 0;
    score = 0;
    resultsEl.classList.add('hidden');
    welcomeEl.classList.remove('hidden');
    quizEl.classList.add('hidden');
}