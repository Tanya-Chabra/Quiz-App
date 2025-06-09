const questions = {
    "100": [
        {
            question: "What is the capital of India?",
            options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
            answer: "Delhi"
        },
        {
            question: "HTML stands for?",
            options: ["HyperText Makeup Language", "HyperText Markup Language", "Hyperlink Text", "None"],
            answer: "HyperText Markup Language"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars"
        }
    ],
    "200": [
        {
            question: "What is the capital of India?",
            options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
            answer: "Delhi"
        },
        {
            question: "HTML stands for?",
            options: ["HyperText Makeup Language", "HyperText Markup Language", "Hyperlink Text", "None"],
            answer: "HyperText Markup Language"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars"
        }
    ],
    "300": [
        {
            question: "What is the capital of India?",
            options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
            answer: "Delhi"
        },
        {
            question: "HTML stands for?",
            options: ["HyperText Makeup Language", "HyperText Markup Language", "Hyperlink Text", "None"],
            answer: "HyperText Markup Language"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars"
        }
    ],
}

let currentCategory = "";
let questionIndex = 0;
let questionsAnswered = 0;
let totalQuestions = Object.values(questions).reduce((acc, qList) => acc + qList.length, 0);
let completedCategories = new Set();


document.querySelectorAll(".button-div .btn").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText.trim();
        if (!questions[value]) return;

        currentCategory = value;
        questionIndex = 0;
        button.disabled = true;
        button.classList.remove("btn-outline-secondary");
        button.classList.add("btn-success");

        showQuestion();

        const modal = new bootstrap.Modal(document.getElementById('questionModal'));
        modal.show();
    });
});

function showQuestion() {
    const q = questions[currentCategory][questionIndex];
    document.getElementById("questionTitle").innerText = `${currentCategory} Points Question`;
    document.getElementById("questionText").innerText = q.question;

    const optionsDiv = document.getElementById("optionsList");
    optionsDiv.innerHTML = "";

    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = true;

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary w-100 my-1";
        btn.innerText = opt;
        btn.onclick = () => {
            const correct = (opt === q.answer);
            alert(correct ? " Correct!" : " Wrong!");

            questionsAnswered++;
            updateProgress();
            nextBtn.disabled = false;
        };
        optionsDiv.appendChild(btn);
    });
}
document.getElementById("nextBtn").addEventListener("click", () => {
    questionIndex++;

    if (questionIndex < questions[currentCategory].length) {
        showQuestion();
    } else {
        const modal = bootstrap.Modal.getInstance(document.getElementById("questionModal"));
        modal.hide();

        completedCategories.add(currentCategory);
        document.querySelectorAll(".button-div .btn").forEach(btn => {
            if (btn.innerText.trim() === currentCategory) {
                btn.classList.remove("btn-outline-secondary");
                btn.classList.add("btn-success");
                btn.disabled = true;
            }
        });

        if (questionsAnswered === totalQuestions) {
            showCongratulations();
        }
    }
});
function showCongratulations() {
    const congratsDiv = document.createElement("div");
    congratsDiv.className = "alert alert-success text-center my-3";
    congratsDiv.innerHTML = `<strong>🎉 Congratulations, You've completed the quiz!</strong>`;

    document.querySelector(".container-fluid").prepend(congratsDiv);
}

document.getElementById("resetBtn").addEventListener("click", () => {
    questionsAnswered = 0;
    completedCategories.clear();
    questionIndex = 0;

    updateProgress();

    document.querySelectorAll(".button-div .btn").forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline-secondary");
    });

    const existingCongrats = document.querySelector(".alert-success");
    if (existingCongrats) existingCongrats.remove();
});

function updateProgress() {
    const percentage = Math.floor((questionsAnswered / totalQuestions) * 100);
    const bar = document.getElementById("quizProgress");
    bar.style.width = `${percentage}%`;
    bar.setAttribute("aria-valuenow", percentage);
    bar.innerText = `${percentage}%`;
}
