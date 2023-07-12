function slider({prev, next, slideSelector, container, wrapper, field}) {
	const prevArrow = document.querySelector(prev),
		  nextArrow = document.querySelector(next),
		  current = document.querySelector("#current"),
		  total = document.querySelector("#total"),
		  slides = document.querySelectorAll(slideSelector),
		  slider = document.querySelector(container),
		  slidesWrapper = document.querySelector(wrapper),
		  slidesField = document.querySelector(field),
		  { width } = window.getComputedStyle(slidesWrapper);
	
	let slideIndex = 1, offset = 0;

	// Функция для создания навигационных индикаторов
	function createNavDots() {
		const indicators = document.createElement("ol"),
		      dots = [];
  
		indicators.classList.add("carousel-indicators");
		slider.append(indicators);
		
		for (let i = 0; i < slides.length; i++) {
			const dot = document.createElement("li");
			dot.setAttribute("data-slide-to", i + 1);
			dot.classList.add("dot");
			indicators.append(dot);
			if (i === 0) dot.style.opacity = 1;
			dots.push(dot);
		}
		return dots;
	}

	// Функция, устанавливающая индикатор текущего слайда
	function setActiveIndicator(dots, index) {
		dots.forEach((dot) => { dot.style.opacity = "0.5"; });
		dots[index].style.opacity = "1";
	}

	// Функция, меняющая значение счетчика слайдов
	function setCurrentCounter() {
		current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
	}
		
	// Настройка стилей и установка счетчика слайдов
	total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
	current.textContent = "01";
	slidesField.style.width = `${100 * slides.length}%`;
	slides.forEach((slide) => {
		slide.style.width = width;
	});
	
	// Основная часть, создание обработчиков событий для стрелок и навигационных точек
	const dots = createNavDots();
	
	nextArrow.addEventListener("click", () => {
		if (offset === parseInt(width, 10) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += parseInt(width, 10);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		slideIndex = slideIndex === slides.length ? 1 : slideIndex + 1;
		
		setCurrentCounter();
		setActiveIndicator(dots, slideIndex - 1);
	});

	prevArrow.addEventListener("click", () => {
		if (offset === 0) {
			offset = parseInt(width, 10) * (slides.length - 1);
		} else {
			offset -= parseInt(width, 10);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		slideIndex = slideIndex === 1 ? slides.length : slideIndex - 1;
		
		setCurrentCounter();
		setActiveIndicator(dots, slideIndex - 1);
	});

	dots.forEach((dot) => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");
			
			slideIndex = slideTo;
			offset = parseInt(width, 10) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			setCurrentCounter();
			setActiveIndicator(dots, slideIndex - 1);
		});
	});
}

export default slider;
