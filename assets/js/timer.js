// קביעת תאריך היעד: 26 בפברואר 2025 בשעה 23:59
const targetDate = new Date("February 26, 2025 22:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    } else {
        clearInterval(timer);
        document.querySelector(".countdown").innerHTML = "<h2>נגמר המבצע</h2>";
    }
}

// הפעלת הטיימר כל שנייה
const timer = setInterval(updateCountdown, 1000);
updateCountdown();
