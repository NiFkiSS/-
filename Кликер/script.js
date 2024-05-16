const screens = document.querySelectorAll(".screen");
const chooseSweetBtns = document.querySelectorAll(".choose-sweet-btn");
const startButton = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");
const gameNode = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");

let seconds = 0;
let score = 0;
let selectedSweet = {};

// Обработчик события для кнопки "Назад" на первом экране
startButton.addEventListener("click", () => {
    screens[0].classList.remove("visible");
    screens[1].classList.add("visible");
});

// Обработчик события для кнопки "Назад" на втором экране
chooseSweetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const img = btn.querySelector("img");
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt");

        selectedSweet = { src, alt };
        screens[1].classList.remove("visible");
        screens[2].classList.add("visible");

        setTimeout(createSweet, 500);
        startGame();
    });
});

// Обработчик события для кнопки "Назад" на третьем экране
backBtn.addEventListener("click", () => {
    gameNode.innerHTML = "";
    score = 0;
    seconds = 0;
    screens[2].classList.remove("visible");
    screens[0].classList.add("visible");
});

function startGame() {
    setInterval(increaseTime, 500);
}

function increaseTime() {
    let s = seconds % 60;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${s}`;
    seconds++;
}

function createSweet() {
    const { x, y } = getRandomLocation();

    const sweet = document.createElement("img");
    sweet.classList.add("sweet");
    sweet.src = selectedSweet.src;
    sweet.alt = selectedSweet.alt;
    sweet.style.display = "block";
    sweet.style.top = `${y}px`;
    sweet.style.left = `${x}px`;
    sweet.style.transform = `rotate(${Math.random() * 360}deg)`;

    sweet.addEventListener("click", catchSweet);

    gameNode.appendChild(sweet);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

function playBiteSound() {
    const audio = document.getElementById("bite");
    audio.play();
}

function catchSweet() {
    playBiteSound();
    increaseScore();
    this.remove();
    addSweets();
}

function addSweets() {
    setTimeout(createSweet, 200);
    setTimeout(createSweet, 300);
}

function increaseScore() {
    score++;
    if (score > 19) {
        message.classList.add("visible");
    }
    scoreEl.innerHTML = `Score: ${score}`;
}