let hr = document.getElementById("hour");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let digital = document.getElementById("digital-time");
let dateDisplay = document.getElementById("date");

function displayTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let ms = date.getMilliseconds();

    // Smooth rotation
    let hRotation = 30 * (hh % 12) + mm / 2 + ss / 120;
    let mRotation = 6 * mm + ss / 10 + ms / 10000;
    let sRotation = 6 * ss + ms * 0.006;

    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;

    // Digital Time with AM/PM
    let ampm = hh >= 12 ? "PM" : "AM";
    let displayHour = hh % 12 || 12;
    digital.innerText = `${String(displayHour).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')} ${ampm}`;

    // Date
    dateDisplay.innerText = date.toDateString();

    // Background theme
    if (hh >= 6 && hh < 18) {
        document.body.style.background = "linear-gradient(to bottom, #87CEEB, #eed814ff)";
        document.body.style.color = "#000";
    } else {
        document.body.style.background = "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)";
        document.body.style.color = "#fff";
    }
}

setInterval(displayTime, 50);


// NAVBAR SWITCH
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// TIMER PART
let timerInterval;
function startTimer() {
    let minutes = parseInt(document.getElementById("timer-minutes").value) || 0;
    let seconds = parseInt(document.getElementById("timer-seconds").value) || 0;
    let totalSeconds = minutes * 60 + seconds;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        } else {
            totalSeconds--;
            let m = Math.floor(totalSeconds / 60);
            let s = totalSeconds % 60;
            document.getElementById("timer-display").innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timerInterval);
}
function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("timer-display").innerText = "00:00";
}

// STOPWATCH PART
let stopwatchInterval, swHours = 0, swMinutes = 0, swSeconds = 0;
function startStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        swSeconds++;
        if (swSeconds >= 60) { swSeconds = 0; swMinutes++; }
        if (swMinutes >= 60) { swMinutes = 0; swHours++; }
        document.getElementById("stopwatch-display").innerText =
            `${String(swHours).padStart(2, '0')}:${String(swMinutes).padStart(2, '0')}:${String(swSeconds).padStart(2, '0')}`;
    }, 1000);
}
function stopStopwatch() {
    clearInterval(stopwatchInterval);
}
function resetStopwatch() {
    clearInterval(stopwatchInterval);
    swHours = 0; swMinutes = 0; swSeconds = 0;
    document.getElementById("stopwatch-display").innerText = "00:00:00";
}