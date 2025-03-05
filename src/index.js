const uppercase = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

const lowercase = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const characters = [
	"~",
	"`",
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
	"_",
	"-",
	"+",
	"=",
	"{",
	"[",
	"}",
	"]",
	",",
	"|",
	":",
	";",
	"<",
	">",
	".",
	"?",
	"/",
];

let uppercaseEl = document.getElementById("uppercase-el");
let lowercaseEl = document.getElementById("lowercase-el");
let numbersEl = document.getElementById("numbers-el");
let charactersEl = document.getElementById("characters-el");

const value = document.querySelector("#pw-length-slider-value");
const input = document.querySelector("#p-pw-length-slider");

const passwordGeneratorBtn = document
	.getElementById("generate-pw-btn")
	.addEventListener("click", generatePasswords);

const passwordOneBtn = document
	.getElementById("pw-one-btn")
	.addEventListener("click", (e) => copyPassword(e));

const passwordTwoBtn = document
	.getElementById("pw-two-btn")
	.addEventListener("click", (e) => copyPassword(e));

input.textContent = input.value;
input.addEventListener("input", (e) => {
	value.textContent = e.target.value;
});

function randomIndex() {
	let result = [""];

	if (uppercaseEl.checked) {
		result.push(...uppercase);
	}

	if (lowercaseEl.checked) {
		result.push(...lowercase);
	}

	if (numbersEl.checked) {
		result.push(...numbers);
	}

	if (charactersEl.checked) {
		result.push(...characters);
	}

	if (result.length === 0) {
		return undefined;
	}

	let randomNum = Math.floor(Math.random() * result.length);
	return result[randomNum];
}

function generatePasswords() {
	let generatePasswordOneEl = document.getElementById("pw-one-btn");
	let generatePasswordTwoEl = document.getElementById("pw-two-btn");

	generatePasswordOneEl.textContent = "";
	generatePasswordTwoEl.textContent = "";

	if (
		uppercaseEl.checked ||
		lowercaseEl.checked ||
		numbersEl.checked ||
		charactersEl.checked
	) {
		for (let i = 0; i < input.value; i++) {
			generatePasswordOneEl.textContent += randomIndex();
			generatePasswordTwoEl.textContent += randomIndex();
		}
	} else {
		generatePasswordOneEl.textContent =
			"Please make sure to check at least one box";
		generatePasswordTwoEl.textContent =
			"Please make sure to check at least one box";
	}
}

async function copyPassword(event, feedbackDuration = 1000) {
	if (!navigator.clipboard) {
		console.error("Clipboard API not supported");
		return;
	}

	const passwordBtn = event.target;
	const originalText = passwordBtn.textContent;

	try {
		await navigator.clipboard.writeText(passwordBtn.textContent);
		passwordBtn.textContent = "Copied!";
		passwordBtn.classList.add("copied");
		passwordBtn.setAttribute("aria-label", "Copied to clipboard");

		setTimeout(() => {
			passwordBtn.removeAttribute("aria-label");
			passwordBtn.classList.remove("copied");
			passwordBtn.textContent = originalText;
		}, feedbackDuration);
	} catch (err) {
		console.error("Failed to copy", err);
	}
}
