function showPopup(text) {
    const popup = document.querySelector('.popup'),
          message = document.querySelector('.popup__message');
    
    popup.classList.add('popup_active');
    message.textContent = text;
    document.body.classList.add('no-scroll');

    setTimeout(() => {
        popup.classList.remove('popup_active');
        message.textContent = '';
        document.body.classList.remove('no-scroll');
    }, 2000);
}

function validateForm() {
	let isCorrect = true;
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		if (input.getAttribute("name") === "name") {
			if (input.value === "" || input.value.match(/\d/g)) {
				input.parentElement.classList.add('contacts__input_error');
				isCorrect = false;
			} else {
				input.parentElement.classList.remove('contacts__input_error');
			}
		}
		if (input.getAttribute("name") === "email") {
			if (!input.value.match(/[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
				isCorrect = false;
				input.parentElement.classList.add('contacts__input_error');
			} else {
				input.parentElement.classList.remove('contacts__input_error');
			}
		}
	});
	return isCorrect;
}


function initForm() {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        
        fetch("http://localhost:3000/requests", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: json,
        }).then(() => {
                showPopup("Спасибо, скоро я с Вами свяжусь");
            }).catch(() => {
                showPopup("Что-то пошло не так, попробуйте еще раз");
            }).finally(() => form.reset());
    });
}

export default initForm;