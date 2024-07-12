    function updateTimeAndDate() {
        const now = new Date();
        const timeAndDate = now.toLocaleString();
        document.getElementById('time-date').textContent = timeAndDate;
    }

    setInterval(updateTimeAndDate, 1000);

    updateTimeAndDate();

