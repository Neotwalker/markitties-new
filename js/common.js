"use strict";

document.addEventListener("DOMContentLoaded", () => {

	const headerWrapper = document.querySelector(".header--wrapper");
	let lastScroll = window.scrollY;
	// 🔥 Проверяем сразу при загрузке
	if (window.scrollY > 50) {
		headerWrapper.classList.add("scrolled");
	} else {
		headerWrapper.classList.remove("scrolled");
	}
	// Дальше логика скролла
	window.addEventListener("scroll", () => {
		const currentScroll = window.scrollY;

		if (currentScroll > lastScroll && currentScroll > 50) {
			headerWrapper.classList.add("scrolled");
		} else if (currentScroll < lastScroll && currentScroll <= 50) {
			headerWrapper.classList.remove("scrolled");
		}

		lastScroll = currentScroll;
	});

	document.querySelectorAll('.header a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			const targetId = this.getAttribute('href').substring(1);
			const targetEl = document.getElementById(targetId);
			if (!targetEl) return;

			e.preventDefault();

			// Позиция элемента с учётом отступа 50px
			const offsetPosition = targetEl.getBoundingClientRect().top + window.scrollY - 50;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		});
	});

	const burger = document.querySelector('.burger');
	const modalMenu = document.querySelector('.header--block');
	const header = document.querySelector('.header');
	burger.addEventListener('click', () => {
		burger.classList.toggle('active');
		modalMenu.classList.toggle('active');
		header.classList.toggle('active');
	});

	let buttonProject = document.querySelectorAll('.open--modalProject');
	let modalProject = document.querySelector('.modal--project');
	buttonProject.forEach( button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			modalProject.classList.add('active');
		});
	});

	let buttonbrief = document.querySelectorAll('.open--brief');
	let modalbrief = document.querySelector('.modal--brief');
	buttonbrief.forEach( button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			modalbrief.classList.add('active');
		});
	});
	let modalClose = document.querySelectorAll('.modal--close');
	modalClose.forEach(close => {
		let modal = document.querySelectorAll('.modal--center');
		close.addEventListener('click', (e) => {
			modal.forEach( modalHide => {
				modalHide.classList.remove('active');
			});
		})
	});
	if(modalProject){
		// Добавляем обработчик клика по фону модального окна для его закрытия
		modalProject.addEventListener("click", (event) => {
			if (!event.target.closest('.modal--project.active .modal--wrapper') && !event.target.closest('.modal--close')) {
				modalProject.classList.remove('active');
				document.querySelector('html').classList.remove('hidden');
				event.stopPropagation();
			}
		});
	}
	if(modalbrief){
		// Добавляем обработчик клика по фону модального окна для его закрытия
		modalbrief.addEventListener("click", (event) => {
			if (!event.target.closest('.modal--brief.active .modal--wrapper') && !event.target.closest('.modal--close')) {
				modalbrief.classList.remove('active');
				document.querySelector('html').classList.remove('hidden');
				event.stopPropagation();
			}
		});
	}

	var element3 = document.querySelectorAll('.wpcf7-tel');
	var maskOptions3 = {
			mask: '+7 000 000 00 00',
			lazy: false
	}
	element3.forEach(el => {
		var mask3 = new IMask(el, maskOptions3);
	});

	document.querySelectorAll('.wpcf7-file').forEach(function (input) {
		let label = input.closest('.add--file')?.querySelector('.input__file-button-text');
		if (!label) return;
		let labelVal = label.innerText;

		input.addEventListener('change', function () {
			let countFiles = this.files?.length || 0;
			label.innerText = countFiles ? 'Файлов: ' + countFiles : labelVal;
		});
	});

	const fileInput = document.getElementById('file-1');
	if (fileInput) {
		fileInput.setAttribute('multiple', 'multiple');
		fileInput.setAttribute('name', 'file-1[]');
	}

	const smoothHeight = (itemSelector, buttonSelector, contentSelector) => {
		const items = document.querySelectorAll(itemSelector);

		if (!items.length) return;

		// Добавляем класс 'active', 'data-open="true"' и устанавливаем max-height первому элементу
		const firstItem = items[0];
		const firstButton = firstItem.querySelector(buttonSelector);
		const firstContent = firstItem.querySelector(contentSelector);
		firstItem.classList.add('active');
		firstButton.classList.add('active');
		firstItem.dataset.open = 'true';
		firstContent.style.maxHeight = `${firstContent.scrollHeight}px`;

		items.forEach(el => {
			const button = el.querySelector(buttonSelector);
			const content = el.querySelector(contentSelector);

			button.addEventListener('click', () => {
				if (el.dataset.open !== 'true') {
					// Удаляем параметры для всех элементов, кроме текущего
					items.forEach(item => {
						if (item !== el) {
							item.dataset.open = 'false';
							item.classList.remove('active');
							item.querySelector(buttonSelector).classList.remove('active');
							item.querySelector(contentSelector).style.maxHeight = '';
						}
					});
					el.dataset.open = 'true';
					button.classList.add('active');
					el.classList.add('active');
					content.style.maxHeight = `${content.scrollHeight}px`;
				} else {
					el.dataset.open = 'false';
					el.classList.remove('active');
					button.classList.remove('active');
					content.style.maxHeight = '';
				}
			})

			const onResize = () => {
				if (el.dataset.open === 'true') {
					if (parseInt(content.style.maxHeight) !== content.scrollHeight) {
						content.style.maxHeight = `${content.scrollHeight}px`;
					}
				}
			}

			window.addEventListener('resize', onResize);
		});
	}
	smoothHeight('.main--faq__item', '.main--faq__item--button', '.main--faq__item--answer');

	const scrollBtn = document.querySelector('.scroll-top');
	const firstBlock = document.querySelector('section'); // первый блок сайта
	const offset = firstBlock.offsetHeight; // после скролла первого блока
	window.addEventListener('scroll', () => {
		if (window.scrollY > offset) {
			scrollBtn.classList.add('active');
		} else {
			scrollBtn.classList.remove('active');
		}
	});
	scrollBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0, // прокрутка вверх
			behavior: 'smooth'
		});
	});

	const buttonsWrap = document.querySelector('.main--works__buttons');
	const buttons = document.querySelectorAll('.main--works__buttons .button--tag');
	const casesWrap = document.querySelector('.main--works__cases');
	// сколько кейсов показывать по умолчанию
	function getInitialCount() {
		return window.innerWidth <= 480 ? 3 : 6;
	}
	// сброс состояния кейсов в блоке
	function resetCases(block) {
		const items = block.querySelectorAll('.case');
		const visibleCount = getInitialCount();
		const btn = block.querySelector('.case--more');

		// скрываем лишние кейсы
		items.forEach((it, i) => it.classList.toggle('hidden', i >= visibleCount));

		if (!btn) return;

		if (items.length <= visibleCount) {
			btn.style.display = 'none';
			btn.classList.remove('expanded');
			btn.dataset.state = 'collapsed';
			const s = btn.querySelector('span'); if (s) s.textContent = 'Смотреть больше';
		} else {
			btn.style.display = '';
			btn.classList.remove('expanded');
			btn.dataset.state = 'collapsed';
			const s = btn.querySelector('span'); if (s) s.textContent = 'Смотреть больше';
		}
	}
	// переключение активной категории
	function activateButtonAndBlock(button) {
		if (!button) return;
		const key = button.dataset.button;
		const blocks = casesWrap.querySelectorAll('.main--works__type');

		buttons.forEach(b => b.classList.remove('active'));
		blocks.forEach(b => {
			b.classList.remove('active');
			resetCases(b);
		});

		button.classList.add('active');
		const target = casesWrap.querySelector(`.main--works__type[data-type="${key}"]`);
		if (target) {
			target.classList.add('active');
			resetCases(target);
		}
	}
	// переключение кнопки «смотреть больше»
	function toggleMoreButton(btn) {
		if (!btn) return;
		const block = btn.closest('.main--works__type') || casesWrap.querySelector('.main--works__type.active');
		if (!block) return;

		const items = block.querySelectorAll('.case');
		const visibleCount = getInitialCount();
		if (items.length <= visibleCount) return;

		const expanded = btn.classList.toggle('expanded');
		if (expanded) {
			items.forEach(it => it.classList.remove('hidden'));
			btn.dataset.state = 'expanded';
			const s = btn.querySelector('span'); if (s) s.textContent = 'Скрыть';
		} else {
			items.forEach((it, i) => it.classList.toggle('hidden', i >= visibleCount));
			btn.dataset.state = 'collapsed';
			const s = btn.querySelector('span'); if (s) s.textContent = 'Смотреть больше';

			// скроллим к секции #works при сворачивании
			const worksSection = document.getElementById('works');
			if (worksSection) {
				worksSection.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			}
		}
	}
	// обработка клика по кнопкам категорий
	buttonsWrap && buttonsWrap.addEventListener('click', (e) => {
		const btn = e.target.closest('.button--tag');
		if (!btn) return;
		activateButtonAndBlock(btn);
	});
	// обработка клика по «смотреть больше» с анти-даблкликом
	let lock = false;
	document.addEventListener('click', (e) => {
		const btn = e.target.closest('.case--more');
		if (!btn) return;

		if (lock) return;
		lock = true;
		setTimeout(() => lock = false, 400);

		e.preventDefault();
		toggleMoreButton(btn);
	});
	// ресет при изменении ширины — только если ширина реально изменилась
	let lastWidth = window.innerWidth;
	window.addEventListener('resize', () => {
		if (window.innerWidth !== lastWidth) {
			lastWidth = window.innerWidth;
			const activeBlock = casesWrap.querySelector('.main--works__type.active');
			if (activeBlock) resetCases(activeBlock);
		}
	});
	// инициализация — активируем первую категорию
	if (buttons.length > 0) {
		activateButtonAndBlock(buttons[0]);
	}

	// слайдер main--competiotions
	let competiotionsSwiper;
	let savedWrappers = null;
	// 1. Функция выравнивания высоты слайдов (только для мобилки)
	function equalizeSlideHeights(swiperEl) {
		if (window.innerWidth > 768) return;

		const slides = swiperEl.querySelectorAll('.swiper-slide');
		if (!slides.length) return;

		// сброс высот
		slides.forEach(slide => (slide.style.height = 'auto'));

		// ищем максимальную высоту .slide-column
		let maxHeight = 0;
		slides.forEach(slide => {
			const column = slide.querySelector('.slide-column');
			if (column) {
				maxHeight = Math.max(maxHeight, column.offsetHeight);
			}
		});

		// выставляем всем слайдам одинаковую высоту
		slides.forEach(slide => (slide.style.height = maxHeight + 'px'));
	}
	// 2. Основная функция инициализации
	function initSwiper() {
		const blocks = document.querySelector('.main--competiotions__blocks');
		if (!blocks) return;

		if (window.innerWidth <= 768 && !competiotionsSwiper) {
			const wrappers = blocks.querySelectorAll('.main--competiotions__wrapper');

			if (wrappers.length > 1) {
				// Сохраняем оригинальную структуру
				savedWrappers = Array.from(wrappers).map(w => w.cloneNode(true));

				// Собираем все карточки
				const allItems = [];
				wrappers.forEach(w => allItems.push(...w.querySelectorAll('.main--competiotions__item')));

				// Удаляем старые врапперы
				blocks.innerHTML = '';

				// Создаём один wrapper под swiper
				const swiperWrapper = document.createElement('div');
				swiperWrapper.classList.add('swiper-wrapper');
				blocks.appendChild(swiperWrapper);

				// Группируем по 3 карточки в один слайд
				for (let i = 0; i < allItems.length; i += 3) {
					const slide = document.createElement('div');
					slide.classList.add('swiper-slide');

					// обёртка для вертикальной колонки
					const column = document.createElement('div');
					column.classList.add('slide-column');

					allItems.slice(i, i + 3).forEach(item => column.appendChild(item));
					slide.appendChild(column);
					swiperWrapper.appendChild(slide);
				}

				blocks.classList.add('swiper');
			}

			// Инициализация Swiper
			competiotionsSwiper = new Swiper('.main--competiotions__blocks', {
				slidesPerView: 1,
				spaceBetween: 20,
				navigation: {
					nextEl: '.button--competiotions-next',
					prevEl: '.button--competiotions-prev',
				},
				on: {
					init: function () {
						equalizeSlideHeights(this.el);

						// если есть картинки, пересчитываем после загрузки
						const imgs = this.el.querySelectorAll('img');
						imgs.forEach(img => {
							if (!img.complete) img.addEventListener('load', () => equalizeSlideHeights(this.el));
						});
					},
					resize: function () {
						equalizeSlideHeights(this.el);
					},
					destroy: function () {
						const slides = this.el.querySelectorAll('.swiper-slide');
						slides.forEach(s => (s.style.height = ''));
					}
				}
			});

		} else if (window.innerWidth > 768 && competiotionsSwiper) {
			// Уничтожаем слайдер
			competiotionsSwiper.destroy(true, true);
			competiotionsSwiper = undefined;

			// Восстанавливаем оригинал
			if (savedWrappers) {
				blocks.innerHTML = '';
				savedWrappers.forEach(w => blocks.appendChild(w));
				savedWrappers = null;
			}
			blocks.classList.remove('swiper');
		}
	}
	window.addEventListener('load', initSwiper);
	window.addEventListener('resize', initSwiper);

	// слайдер main--ways
	let mobileSwiper = null;
	function initMobileSwiper() {
		const wrapper = document.querySelector('.main--ways__wrapper');
		const controls = document.querySelector('.swiper-controls');

		if (!wrapper || !controls) return;

		if (window.innerWidth <= 768 && !wrapper.classList.contains('swiper-initialized')) {
			const items = Array.from(wrapper.querySelectorAll('.main--ways__item'));
			const slidesWrapper = document.createElement('div');
			slidesWrapper.classList.add('swiper-wrapper');

			for (let i = 0; i < items.length; i += 4) {
				const slide = document.createElement('div');
				slide.classList.add('swiper-slide');
				items.slice(i, i + 4).forEach(item => slide.appendChild(item));
				slidesWrapper.appendChild(slide);
			}

			wrapper.appendChild(slidesWrapper);
			wrapper.classList.add('swiper', 'swiper-initialized');
			controls.style.display = 'flex';

			mobileSwiper = new Swiper(wrapper, {
				slidesPerView: 1,
				spaceBetween: 10,
				navigation: {
					nextEl: '.button--way-next',
					prevEl: '.button--way-prev',
				},
				on: {
					init: function () {
						setEqualSlideHeight();
					},
					resize: function () {
						setEqualSlideHeight();
					}
				}
			});

			function setEqualSlideHeight() {
				const slides = wrapper.querySelectorAll('.swiper-slide');
				if (!slides.length) return;

				slides.forEach(slide => slide.style.height = 'auto');

				let maxHeight = 0;
				slides.forEach(slide => {
					const h = slide.offsetHeight;
					if (h > maxHeight) maxHeight = h;
				});

				slides.forEach(slide => {
					slide.style.height = maxHeight + 'px';
				});
			}
		}
		if (window.innerWidth > 768 && wrapper.classList.contains('swiper-initialized')) {
			if (mobileSwiper) mobileSwiper.destroy(true, true);

			const slidesWrapper = wrapper.querySelector('.swiper-wrapper');
			if (slidesWrapper) {
				while (slidesWrapper.firstChild) {
					const slide = slidesWrapper.firstChild;
					while (slide.firstChild) {
						wrapper.appendChild(slide.firstChild);
					}
					slide.remove();
				}
				slidesWrapper.remove();
			}
			wrapper.classList.remove('swiper', 'swiper-initialized');
			controls.style.display = 'none';
			mobileSwiper = null;
		}
	}
	// Вызываем и добавляем ресайз
	initMobileSwiper();
	window.addEventListener('resize', initMobileSwiper);

	// слайдер main--team
	let teamSwiper = null;
	function initTeamSwiper() {
		const wrapper = document.querySelector('.main--team__wrapper');
		const controls = document.querySelector('.swiper-controls-team'); // отдельные стрелки, если нужны
		if (!wrapper) return;
		if (window.innerWidth <= 480 && !wrapper.classList.contains('swiper-initialized')) {
				const items = Array.from(wrapper.querySelectorAll('.item'));
				const slidesWrapper = document.createElement('div');
				slidesWrapper.classList.add('swiper-wrapper');

				// разбиваем на группы по 4
				for (let i = 0; i < items.length; i += 4) {
						const slide = document.createElement('div');
						slide.classList.add('swiper-slide');
						items.slice(i, i + 4).forEach(item => slide.appendChild(item));
						slidesWrapper.appendChild(slide);
				}

				wrapper.appendChild(slidesWrapper);
				wrapper.classList.add('swiper', 'swiper-initialized');

				if (controls) controls.style.display = 'flex';

				teamSwiper = new Swiper(wrapper, {
						slidesPerView: 1,
						spaceBetween: 10,
						navigation: (document.querySelector('.button--team-next') && document.querySelector('.button--team-prev')) ? {
								nextEl: '.button--team-next',
								prevEl: '.button--team-prev',
						} : undefined,
						on: {
								init: function () {
										setEqualSlideHeight();
								},
								resize: function () {
										setEqualSlideHeight();
								}
						}
				});

				function setEqualSlideHeight() {
						const slides = wrapper.querySelectorAll('.swiper-slide');
						if (!slides.length) return;

						slides.forEach(slide => slide.style.height = 'auto');

						let maxHeight = 0;
						slides.forEach(slide => {
								const h = slide.offsetHeight;
								if (h > maxHeight) maxHeight = h;
						});

						slides.forEach(slide => {
								slide.style.height = maxHeight + 'px';
						});
				}
		}
		if (window.innerWidth > 480 && wrapper.classList.contains('swiper-initialized')) {
			if (teamSwiper) teamSwiper.destroy(true, true);

			const slidesWrapper = wrapper.querySelector('.swiper-wrapper');
			if (slidesWrapper) {
					while (slidesWrapper.firstChild) {
							const slide = slidesWrapper.firstChild;
							while (slide.firstChild) {
									wrapper.appendChild(slide.firstChild);
							}
							slide.remove();
					}
					slidesWrapper.remove();
			}

			wrapper.classList.remove('swiper', 'swiper-initialized');
			if (controls) controls.style.display = 'none';
			teamSwiper = null;
		}
	}
	// вызываем и добавляем ресайз
	initTeamSwiper();
	window.addEventListener('resize', initTeamSwiper);




});