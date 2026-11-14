const correctCode = "1114";

let enteredCode = "";


// ENTER NUMBER
function enterNumber(number) {

    // Don't allow "."
    if (number === ".") {
        return;
    }

    // Maximum 4 digits
    if (enteredCode.length >= 4) {
        return;
    }

    enteredCode += number;

    updateDisplay();

    // Automatically check after 4 digits
    if (enteredCode.length === 4) {
        checkCode();
    }
}


// DELETE NUMBER
function deleteNumber() {

    enteredCode = enteredCode.slice(0, -1);

    updateDisplay();

    document.getElementById("message").textContent = "";
}


// UPDATE DISPLAY
function updateDisplay() {

    for (let i = 1; i <= 4; i++) {

        const box = document.getElementById("code" + i);

        if (i <= enteredCode.length) {

            box.textContent = enteredCode[i - 1];

            box.classList.remove("heart");

        } else {

            box.textContent = "♡";

            box.classList.add("heart");
        }
    }
}


// CHECK PASSWORD
function checkCode() {

    const passwordScreen =
        document.getElementById("password-screen");

    const loveWebsite =
        document.getElementById("love-website");

    const message =
        document.getElementById("message");


    // CORRECT PASSWORD
    if (enteredCode === correctCode) {

        message.textContent = "Correct! ❤️";

        message.style.color = "#ffd1d5";


        // Small transition
        passwordScreen.classList.add("fade-out");


        // DIRECTLY SHOW WEBSITE
        setTimeout(function () {

            passwordScreen.style.display = "none";

            loveWebsite.style.display = "block";

            // Automatically go to the top of your website
            window.scrollTo(0, 0);

        }, 500);

    }


    // WRONG PASSWORD
    else {

        message.textContent = "Wrong code. Try again ❤️";

        message.style.color = "#ffb5bb";


        setTimeout(function () {

            enteredCode = "";

            updateDisplay();

            message.textContent = "";

        }, 1000);
    }
}

// =========================================================
// INTERACTIVE ANNIVERSARY SURPRISES
// =========================================================
const openWhenMessages = {
  sad: { title: "Open when you're sad ♡", body: "Love, take a deep breath. Indi mo kinahanglan maging okay permi. I'm proud of you, even on the days when things feel heavy. If I could, I'd hug you tight right now. Ara lang ko permi ga-cheer sa imo. I love you." },
  miss: { title: "Open when you miss me 💗", body: "I miss you too, Jewwyyy! Imagine me giving you the biggest hug and a thousand kisses. Remember that distance or a busy day doesn't change how special you are to me. Mwahhhh!" },
  fight: { title: "Open when we fight 🥺", body: "Even when we misunderstand each other, please remember that it's still us against the problem, not us against each other. Let's talk, listen, and understand. I don't need us to be perfect; I want us to keep choosing each other." },
  hug: { title: "Open when you need a hug 🫂", body: "Sending you the tightest virtual hug everrrrr! Imagine my arms around you, my head on your shoulder, and me telling you: everything will be okay. I love you so much." }
};

document.querySelectorAll("[data-letter]").forEach(button => {
  button.addEventListener("click", () => {
    const note = openWhenMessages[button.dataset.letter];
    const reveal = document.getElementById("letter-reveal");
    reveal.innerHTML = `<h4>${note.title}</h4><p>${note.body}</p>`;
    reveal.hidden = false;
    reveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

const jarNotes = [
  "You are my favorite notification. I always love hearing from you. ♡",
  "If I could choose again, I'd still choose you, my Jewwyyy.",
  "Your smile is one of my favorite views in the whole world. 😚",
  "Thank you for making ordinary days feel special.",
  "Reminder: gwapo kaayo ka sa panulok ko. Always remember that!",
  "I am grateful for every laugh, lambing, and little moment with you.",
  "You are loved, appreciated, and never alone. I am cheering for you!",
  "More dates, more pictures, more kulit, and more years together. 💗",
  "I hope you know how much happiness you bring into my life.",
  "Mwahhhh! Claim this note for unlimited kisses. 💋"
];
let lastJarIndex = -1;
document.getElementById("love-jar").addEventListener("click", () => {
  let index = Math.floor(Math.random() * jarNotes.length);
  if (jarNotes.length > 1 && index === lastJarIndex) index = (index + 1) % jarNotes.length;
  lastJarIndex = index;
  const note = document.getElementById("jar-note");
  note.textContent = jarNotes[index];
  note.animate([{ transform: "scale(.94)", opacity: .5 }, { transform: "scale(1)", opacity: 1 }], { duration: 300 });
});

const quizQuestions = [
  { q: "Who said YES?", options: ["You did 😚", "I did 🙈"], answer: 0, success: "Correcttt! The best YES ever. ❤️" },
  { q: "What do I love most about your smile?", options: ["It makes me happy", "It makes me sleepy"], answer: 0, success: "Yesss! Your smile is one of my favorites. 💗" },
  { q: "What do I want more of with you?", options: ["More memories together", "More arguments HAHAHA"], answer: 0, success: "Of course! More memories and more lambing. ♡" },
  { q: "Who is my favorite person?", options: ["My Jewwyyy", "The neighbor's cat"], answer: 0, success: "HAHAHA obviously YOU! I love youuu! 💋" }
];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");
function renderQuiz() {
  const item = quizQuestions[quizIndex];
  document.getElementById("quiz-progress").textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  quizQuestion.textContent = item.q;
  quizOptions.innerHTML = "";
  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => answerQuiz(index));
    quizOptions.appendChild(button);
  });
  quizFeedback.textContent = "";
  quizNext.hidden = true;
  quizNext.textContent = quizIndex === quizQuestions.length - 1 ? "See my result ♡" : "Next question ♡";
  quizAnswered = false;
}
function answerQuiz(answer) {
  if (quizAnswered) return;
  quizAnswered = true;
  const item = quizQuestions[quizIndex];
  if (answer === item.answer) {
    quizScore++;
    quizFeedback.textContent = item.success;
  } else {
    quizFeedback.textContent = "Awww, try again next time! The important thing is us. ♡";
  }
  [...quizOptions.children].forEach(button => button.disabled = true);
  quizNext.hidden = false;
}
quizNext.addEventListener("click", () => {
  if (quizIndex >= quizQuestions.length) {
    quizIndex = 0;
    quizScore = 0;
    renderQuiz();
    return;
  }
  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    renderQuiz();
  } else {
    document.getElementById("quiz-progress").textContent = "Our little quiz is complete!";
    quizQuestion.textContent = `You got ${quizScore} out of ${quizQuestions.length}!`;
    quizOptions.innerHTML = "";
    quizFeedback.textContent = "No matter the score, you're still my favorite person. I love you! 💖";
    quizNext.hidden = false;
    quizNext.textContent = "Play again ♡";
    quizIndex = quizQuestions.length;
  }
});
renderQuiz();

document.querySelectorAll(".redeem-button").forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("redeemed")) return;
    button.classList.add("redeemed");
    button.textContent = "Redeemed ♡";
    const coupon = button.closest(".coupon-card").querySelector("h4").textContent;
    document.getElementById("coupon-message").textContent = `Yay! Your “${coupon}” coupon is saved in our hearts. Tell me when you want to use it! 💗`;
  });
});

document.getElementById("gift-button").addEventListener("click", () => {
  const gift = document.getElementById("gift-message");
  gift.hidden = false;
  document.getElementById("gift-button").textContent = "Surprise opened! 💖";
  document.getElementById("gift-button").disabled = true;
  gift.scrollIntoView({ behavior: "smooth", block: "center" });
});
