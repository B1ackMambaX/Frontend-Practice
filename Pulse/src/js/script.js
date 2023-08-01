import $ from 'jquery';
import 'jquery-mask-plugin';
import 'jquery-validation';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';


function toggleSlide(selector) {
	$(selector).each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		});
	});
}

function validateForm(form) {
	$(form).validate({
		rules: {
			name: "required",
			phone: "required",
			email: {
				required: true,
				email: true,
			},
		},

		messages: {
			name: "Пожалуйста, введите свое имя",
			email: {
				required: "Пожалуйста, введите свою почту",
				email: "Неправильно введен адрес почты",
			},
			phone: "Пожалуйста, введите свой номер телефона",
		},
	});
}


$(document).on('DOMContentLoaded', function () {
	// Tabs
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function(){
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	// Items slide
	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	// Modal
	$("[data-modal=consultation]").on("click", function () {
		$(".overlay, #consultation").fadeIn("slow");
	});
	$(".modal__close").on("click", function () {
		$(".overlay, #consultation, #thanks, #order").fadeOut("slow");
	});

	$(".button_mini").each(function (i) {
		$(this).on("click", function () {
			$("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
			$(".overlay, #order").fadeIn("slow");
		});
	});

	// Validation
	validateForm("#main-form");
	validateForm("#consultation form");
	validateForm("#order form");

	// Phone mask
	$("input[name=phone]").mask("+7 (000) 000-00-00");

	// Mailer
	$("form").on('submit', function (e) {
		e.preventDefault();

		if(!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize(),
		}).done(function () {
			$(this).find("input").val("");
			$("#consultation, #order").fadeOut();
			$(".overlay, #thanks").fadeIn("slow");

			$("form").trigger("reset");
		});
		return false;
	});

	// Smooth scroll and pageup
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 1600) {
			$(".pageup").fadeIn();
		} else {
			$(".pageup").fadeOut();
		}
	});

	$('.pageup').on('click', function(e) {
		e.preventDefault();
		scroll({
			top: 0,
			behavior: 'smooth'
		});
    });

	$('promo__link a').on('click', function(e) {
		e.preventDefault();
		 
		scroll({
			top: $($(this).attr('href')).offset().offsetTop,
			behavior: 'smooth'
		});
	});

	// Slider
	$('.carousel__inner').slick({
		speed: 1200,
		adaptiveHeight: true,
		autoplay: false,
		prevArrow: '<button type="button" class ="slick-prev"><img src="icons/prevArrow.png" alt="Prev"></button>',
		nextArrow: '<button type="button" class ="slick-next"><img src="icons/nextArrow.png" alt="Next"></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false,
					adaptiveHeight: false
				},
			},
			{
				breakpoint: 576,
				settings: {
					arrows: false,
					dots: false,
					autoplay: true
				}
			}
		]
	});

	// Animations
	const scrollAnims = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if(entry.isIntersecting) {
				entry.target.classList.add('fadeInUp');
				entry.target.style.visibility = 'visible';
				observer.unobserve(entry.target);
			}
		});
	}, {threshold: 0.5});

	document.querySelectorAll('.feedback__item').forEach(item => {
		scrollAnims.observe(item);
	});
});
