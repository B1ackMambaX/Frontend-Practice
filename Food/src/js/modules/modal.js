function closeModal(modalSelector) {
	const modalWindow = document.querySelector(modalSelector);

	modalWindow.classList.add("hide");
	document.body.style.overflow = "";
}

function showModal(modalSelector, timeout) {
	const modalWindow = document.querySelector(modalSelector);

	modalWindow.classList.remove("hide");
	document.body.style.overflow = "hidden";

	if (timeout) clearInterval(timeout);
}

function modal(triggerSelector, modalSelector, timeout) {
	const modalTrigger = document.querySelectorAll(triggerSelector),
		  modalWindow = document.querySelector(modalSelector);
	
	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal(modalSelector, timeout);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	modalTrigger.forEach((trigger) => {
		trigger.addEventListener("click", () => showModal(modalSelector, timeout));
	});

	modalWindow.addEventListener("click", (e) => {
		if (e.target === modalWindow || e.target.getAttribute("data-close") === "") {
			closeModal(modalSelector);
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && !modalWindow.classList.contains("hide")) {
			closeModal(modalSelector);
		}
	});

	window.addEventListener("scroll", showModalByScroll);
}

export { modal };
export { closeModal };
export { showModal };
