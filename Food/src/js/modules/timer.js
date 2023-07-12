function getTimeRemaining(endTime) {
	let days, hours, minutes, seconds;
	const t = Date.parse(endTime) - Date.now();

	if (t <= 0) {
		days = 0;
		hours = 0;
		minutes = 0;
		seconds = 0;
	} else {
		days = Math.floor(t / (1000 * 60 * 60 * 24));
		hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((t / (1000 * 60)) % 60);
		seconds = Math.floor((t / 1000) % 60);
	}

	return {
		total: t,
		days,
		hours,
		minutes,
		seconds,
	};
}

function getZero(num) {
	return num >= 0 && num < 10 ? `0${num}` : num;
}

function setTimer(selector, deadline) {
	const timer = document.querySelector(selector),
		  days = timer.querySelector("#days"),
		  hours = timer.querySelector("#hours"),
		  minutes = timer.querySelector("#minutes"),
		  seconds = timer.querySelector("#seconds");
	
	function updateTimer(interval) {
		const remaining = getTimeRemaining(deadline);

		days.innerHTML = getZero(remaining.days);
		hours.innerHTML = getZero(remaining.hours);
		minutes.innerHTML = getZero(remaining.minutes);
		seconds.innerHTML = getZero(remaining.seconds);

		if (remaining.total <= 0) {
			clearInterval(interval);
		}
	}
			
	const updatingInterval = setInterval(updateTimer, 1000);
	updateTimer(updatingInterval);
}

export default setTimer;
