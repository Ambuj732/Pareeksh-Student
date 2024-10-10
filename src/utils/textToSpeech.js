function textToSpeech(question, options, optionIndexText, speechLang) {
	let speechHtml = question + ". \n";
	for (let i = 0; i < options.length; ++i) {
		speechHtml += optionIndexText[i] + " ? ";
		speechHtml += options[i] + ". \n";
	}

	console.log(speechHtml);

	const msg = new SpeechSynthesisUtterance();
	const voices = window.speechSynthesis.getVoices();
	for (let i = 0; i < voices.length; i++) {
		if (voices[i].lang === speechLang) {
			msg.voice = voices[i];
			break;
		}
	}

	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 0; // 0 to 2
	msg.text = speechHtml;
	msg.lang = speechLang;

	speechSynthesis.speak(msg);

	const myTimeout = setTimeout(() => {
		speechSynthesis.pause();
		speechSynthesis.resume();
	}, 15000);

	msg.onend = function (e) {
		speechSynthesis.cancel();
		clearTimeout(myTimeout);
	};
}

export default textToSpeech;
