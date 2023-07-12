import { closeModal, showModal } from "./modal";
import { postData } from "../services/services";

function initForms(selector, timer) {
	const forms = document.querySelectorAll(selector),
		  messages = {
			  loading: "icons/spinner.svg",
			  success: "Спасибо скоро мы с вами свяжемся",
			  fail: "Что-то пошло не так",
		  };

	function showThanksModal(message) {
		// Скрываем модалку с формой
		const previousModal = document.querySelector(".modal__dialog");
		previousModal.classList.add("hide");
		
		// Создаем новую модалку со статусом запроса и показываем её
		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
		document.querySelector(".modal").append(thanksModal);
		showModal(".modal", timer);
		
		// Удаляем модалку со статусом запроса через 4с и возвращаем все в исходное положение
		setTimeout(() => {
			thanksModal.remove();
			previousModal.classList.remove("hide");
			closeModal(".modal");
		}, 4000);
	}

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			// Добавляем спиннер который показывается во время отправки
			const spinner = document.createElement("img");
			spinner.src = messages.loading;
			spinner.classList.add("spinner");
			form.insertAdjacentElement("afterend", spinner);

			// Отправляем данные на сервер
			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			postData("http://localhost:3000/requests", json)
				.then((/*data*/) => {
					//console.log(data);
					showThanksModal(messages.success);
				})
				.catch(() => {
					showThanksModal(messages.fail);
				})
				.finally(() => {
					form.reset();
					spinner.remove();
				});
		});
	}

	forms.forEach((form) => bindPostData(form));
}

export default initForms;
