function calc() {
	const result = document.querySelector(".calculating__result span");
	let sex, weight, height, age, ratio;

	/* Если Local Storage пуст, устанавливаем значения по умолчанию для 
		демонстрации пользователю работы калькулятора */
	if (!localStorage.getItem('sex')) {
        localStorage.setItem('sex', 'male');
    }
    if (!localStorage.getItem('ratio')) {
        localStorage.setItem('ratio', 1.375);
    }

	// Инициализация значений из Local Storage
	function initLocalSettings(selector) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((element) => {
			element.classList.remove("calculating__choose-item_active");

			if (element.getAttribute("id") === localStorage.getItem("sex")) {
				sex = localStorage.getItem("sex");
				element.classList.add("calculating__choose-item_active");
			}

			if (element.getAttribute("data-ratio") === localStorage.getItem("ratio") && element.getAttribute("data-ratio")) {
				element.classList.add("calculating__choose-item_active");
				ratio = +localStorage.getItem("ratio");
			}
		});
	}

	function calcCalories() {
		if (!sex || !weight || !height || !age || !ratio) {
			result.textContent = "--";
			return;
		}

		if (sex === "female") {
			result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
		} else {
			result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
		}
	}

	function getTogglesValue(parentSelector) {
		const elements = document.querySelectorAll(`${parentSelector} div`);

		document.querySelector(parentSelector).addEventListener("click", (e) => {
			if (e.target.getAttribute("data-ratio")) {
				ratio = +e.target.getAttribute("data-ratio");
				localStorage.setItem("ratio", ratio);
			} else {
				sex = e.target.getAttribute("id");
				localStorage.setItem("sex", sex);
			}

			if (e.target.classList.contains("calculating__choose-item")) {
				elements.forEach((element) => {
					element.classList.remove("calculating__choose-item_active");
				});
				e.target.classList.add("calculating__choose-item_active");
			}
			calcCalories();
		});
	}

	function getInputValue(selector) {
		const input = document.querySelector(selector);

		input.addEventListener("input", () => {
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else {
				input.style.border = "none";

				switch (input.getAttribute("id")) {
					case "height":
						height = +input.value;
						break;
					case "weight":
						weight = +input.value;
						break;
					case "age":
						age = +input.value;
						break;
				}
			}
			
			calcCalories();
		});
	}

	initLocalSettings(".calculating__choose-item");
	calcCalories();
	getTogglesValue("#gender");
	getTogglesValue(".calculating__choose_big");
	getInputValue("#height");
	getInputValue("#weight");
	getInputValue("#age");
}

export default calc;
