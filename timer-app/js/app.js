let timer;
let isRunning = false;
let timeLeft = 0;
let mode = 'Pomodoro';
const modes = {
    Pomodoro: 25 * 60,
    ShortBreak: 5 * 60,
    LongBreak: 15 * 60
};

const display = document.getElementById('timer-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const stopButton = document.getElementById('stop');
const pomodoroButton = document.getElementById('pomodoro-btn');
const shortBreakButton = document.getElementById('short-break-btn');
const longBreakButton = document.getElementById('long-break-btn');

function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                switchMode();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = modes[mode];
    updateDisplay();
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 0;
    updateDisplay();
}

startButton.addEventListener('click', () => {
    timeLeft = modes[mode];
    startTimer();
});

pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
stopButton.addEventListener('click', stopTimer);
pomodoroButton.addEventListener('click', () => {
    mode = 'Pomodoro';
    resetTimer();
});

shortBreakButton.addEventListener('click', () => {
    mode = 'ShortBreak';
    resetTimer();
});

longBreakButton.addEventListener('click', () => {
    mode = 'LongBreak';
    resetTimer();
});

resetTimer();