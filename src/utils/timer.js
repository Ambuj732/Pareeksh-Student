function createTimer(minutes, setTimeCallback) {
	let seconds = minutes * 60;
	let intervalRef = null;

	const updateTimer = () => {
		const remainingMinutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		setTimeCallback({
			minutes: String(remainingMinutes).padStart(2, "0"), // Pad with leading zero
			seconds: String(remainingSeconds).padStart(2, "0"), // Pad with leading zero
		});
	};

	const start = () => {
		if (intervalRef !== null) return; // Timer is already running

		intervalRef = setInterval(() => {
			seconds--;

			if (seconds <= 0) {
				clearInterval(intervalRef);
				intervalRef = null;
				console.log("Timer ended");
			}
			updateTimer();
		}, 1000);
	};

	const pause = () => {
		if (intervalRef !== null) {
			clearInterval(intervalRef);
			intervalRef = null;
		}
	};

	const resume = () => {
		if (intervalRef === null) {
			start();
		}
	};

	const reset = (newMinutes) => {
		seconds = newMinutes * 60;
		if (intervalRef !== null) {
			clearInterval(intervalRef);
			intervalRef = null;
			start();
		}
		updateTimer();
	};

	updateTimer();

	return { start, pause, resume, reset };
}

export default createTimer;
