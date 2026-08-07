let timeLeft = 0;
let selectedTime = 0;
let timerInterval = null;

let pourInterval = null;
let pourFrame = 0;

const timerDisplay = document.getElementById("timer");
const pour = document.getElementById("pour");
const liquid = document.getElementById("liquid1");

const customTime = document.getElementById("customeTime");
const customPlus = document.getElementById("b4");

const customTimeInput = document.getElementById("time");

const cancelButton = document.getElementById("cancelTime");
const confirmButton = document.getElementById("confirmTime");

const pourFrames = [
    "images/pour1.png",
    "images/pour2.png",
    "images/pour3.png"
];

function startPour() {
    if (pourInterval) {
        return;
    }

    pour.style.display = "block";

    pourInterval = setInterval(() => {
        pour.src = pourFrames[pourFrame];

        pourFrame++;

        if (pourFrame >= pourFrames.length) {
            pourFrame = 0;
        }
    }, 120);
}

function stopPour() {
    clearInterval(pourInterval);

    pourInterval = null;
    pourFrame = 0;

    pour.style.display = "none";
}

function updateLiquid() {
    if (selectedTime === 0) {
        liquid.style.display = "none";
        return;
    }

    const progress =
        (selectedTime - timeLeft) / selectedTime;

    if (progress <= 0) {
        liquid.style.display = "none";
        return;
    }

    liquid.style.display = "block";

    if (progress < 0.17) {
        liquid.src = "images/liquid1.png";
    }
    else if (progress < 0.34) {
        liquid.src = "images/liquid2.png";
    }
    else if (progress < 0.51) {
        liquid.src = "images/liquid3.png";
    }
    else if (progress < 0.68) {
        liquid.src = "images/liquid4.png";
    }
    else if (progress < 0.98) {
        liquid.src = "images/liquid5.png";
    }
    else {
        liquid.src = "images/liquid6.png";
    }
}

function setTimer(minutes) {
    clearInterval(timerInterval);
    timerInterval = null;

    stopPour();

    selectedTime = minutes * 60;
    timeLeft = selectedTime;

    liquid.style.display = "none";

    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
}

document.getElementById("b1").onclick = () => {
    setTimer(30);
};

document.getElementById("b2").onclick = () => {
    setTimer(45);
};

document.getElementById("b3").onclick = () => {
    setTimer(60);
};

customPlus.onclick = () => {
    customTime.style.display = "flex";
    customTimeInput.value = 0;
    customTimeInput.focus();
};

cancelButton.onclick = () => {
    customTime.style.display = "none";
};

confirmButton.onclick = () => {
    const customMinutes = Number(customTimeInput.value);

    if (customMinutes <= 0) {
        alert("Please enter a time greater than 0 minutes.");
        return;
    }

    setTimer(customMinutes);

    customTime.style.display = "none";
};

document.getElementById("Start").onclick = () => {
    if (timeLeft <= 0) {
        return;
    }

    clearInterval(timerInterval);

    startPour();
    updateLiquid();

    timerInterval = setInterval(updateTimer, 1000);
};

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;

        updateLiquid();
        updateTimerDisplay();
    }
    else {
        clearInterval(timerInterval);
        timerInterval = null;

        stopPour();

        liquid.style.display = "block";
        liquid.src = "images/liquid6.png";

        timerDisplay.textContent = "00:00";
    }
}

document.getElementById("Pause").onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;

    stopPour();
};

document.getElementById("Reset").onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;

    stopPour();

    selectedTime = 0;
    timeLeft = 0;

    liquid.style.display = "none";

    timerDisplay.textContent = "00:00";
};

customTime.style.display = "none";
pour.style.display = "none";
liquid.style.display = "none";
timerDisplay.textContent = "00:00";