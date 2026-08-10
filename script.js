function playNotificationSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
}

// ===== BROWSER NOTIFICATION =====
function showBrowserNotification(title, bodyText) {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            new Notification(title, { body: bodyText, icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233483.png' });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") new Notification(title, { body: bodyText });
            });
        }
    }
}

// ===== PAGE LOAD HOTE HI =====
document.addEventListener('DOMContentLoaded', () => {
    // Notification permission maango
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Link click karne pe menu band
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});
