document.addEventListener('DOMContentLoaded', function() {

    function ibg () {
		let allItems = document.querySelectorAll('.ibg'), // находим все контенеры с классом ibg
			itemsImage, // переменная для картинок
			src; // переменная для src
		for (let i = 0; i < allItems.length; i++) { // проходим по всем элементам и ...
			itemsImage = allItems[i].querySelector('img'); // находим в них картинку
			src = itemsImage.getAttribute('src'); // узнаём их src
			allItems[i].style.backgroundImage = `url(${src})`; // вставляем src в url background-image
		};
	};
	ibg ();


	// вертикальное и горизонтальное выравнивание меню хедера

	/* Недочёты:
		1) неучтены padding: bottom у hedera
		2) всё обнавляется только при перезагрузки или при изсенении высоты экрана
		3) проблема с падинг ботомами у ли: когда они переходят из десктоп в мобаил их нельзя изменить
		4) можно как-то будет убрать копипасту в начале, но лучше сначало js изучить
		5) 
	*/

	let nenuName = 'menu__list', // название ul меню
		nameHeaderRow = 'header__row', // название контейнера со всем основным содержимым хедера
		headerRow = document.querySelector(`.${nameHeaderRow}`); // находим хедер ров

	let mainMenu = document.querySelector(`.${nenuName}`), // находим ul главного меню
		firstChildLi = mainMenu.firstElementChild, // в этом меню находим 1-ый li
		lastChildLi = mainMenu.lastElementChild, // и последный li
		firstChildLiStyle = getComputedStyle(firstChildLi), // узнаём все стили у 1-ого li
		lastChildLiStyle = getComputedStyle(lastChildLi), // узнаём все стили у последнего li
		firstMarg = firstChildLiStyle.marginLeft, // узнаём margin-left у 1-ого li
		lastMarg = lastChildLiStyle.marginRight; // узнаём margin-right у последнего li

	// console.log ('firstMarg = ' + firstMarg + ' ' + " lastMarg = "+ lastMarg) // проверка 1

	let mainMenuLiAll = mainMenu.querySelectorAll('li'), // находим все li меню хедера
		headerBody = document.querySelector('.header__body'); // находим хедер боди --- возможно не надо !!!!

	function tranNumb (str1, str2) { // функция интепритирует данные (пример: вход-'1234px' выход-'1234)
		// let x = +(str1.match(/\d+\.\d+|\d+|/)); // переводим строку с px в число без px
		// let y = +(str2.match(/\d+\.\d+|\d+|/)); // переводим строку с px в число без px
		let x = +(str1.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)), // переводим строку с px в число без px
			y = +(str2.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)), // переводим строку с px в число без px
			sum;

		sum = y - x; // вычитаем из 2 чила 1
		if (sum < 0) { // если у нас нету 2 ряда то...
			sum = 0; // сумма будет 0
		};
		// console.log ('x = ' + x + ' ' + " y = "+ y + ' sum = ' + sum) // проверка 2
		lastChildLi.style.marginRight = sum + 'px'; // полученный результат даём последнему li
	};
	tranNumb(firstMarg, lastMarg); // srt1 это marginLeft 1-ого li, srt1 это margin-right последнего li

	if (document.documentElement.clientWidth > 756)	{ // если у нас нету меню бургера то ...
		lastChildLi.style.marginRight = 'auto'; // ставим последнему li margin-right: auto;
		firstMarg = firstChildLiStyle.marginLeft; // находим макджин left у 1-ого li
		lastMarg = lastChildLiStyle.marginRight; // находим марджин right у последнего li
		tranNumb(firstMarg, lastMarg); // перезапускаем функцию с новыми данными
		// console.log ('firstMarg = ' + firstMarg + ' ' + " lastMarg = "+ lastMarg) // проверка

		// если высота меню равно высоте ссылки меню (если все элементы одинаковы) или высота меню - 15px 
		// (это padding-buttom при возвращении из 2 слойного меню) равно также  высоте ссылки меню то...
		if (mainMenu.offsetHeight == firstChildLi.firstChild.offsetHeight || mainMenu.offsetHeight - 15 == firstChildLi.firstChild.offsetHeight) { // если меню обычное, то...
			// console.log ('1 ряд')
			headerBody.style.paddingBottom = '38px'; // ставим дефолтный PB [tlthe]
			headerRow.style.alignItems = 'center'; // центрируем лишки
			for (let i = 0; i < mainMenuLiAll.length; i++) { // каждому li в меню
				mainMenuLiAll[i].style.paddingBottom = '0px'; // убераем комперсирующий паддинг
			};
		} else { // если перешло в 2 ряда то...
			// console.log ('2-9999 рядов')
			headerBody.style.paddingBottom = '23px'; // меняем комперсирующий паддинг
			headerRow.style.alignItems = 'flex-start'; // делаем li по центру
			for (let i = 0; i < mainMenuLiAll.length; i++) { // и каждому li 
				mainMenuLiAll[i].style.paddingBottom = '15px'; // добавляем нижний раддинг
			};
		};

	} else { // если есть меню бургер то...
		headerBody.style.paddingBottom = '0'; // возможно из-за этого что-то не так
		headerRow.style.alignItems = 'center'; // центрируем лишки
		for (let i = 0; i < mainMenuLiAll.length; i++) { // у каждого ли 	
			mainMenuLiAll[i].style.paddingBottom = '0px'; // убераем отступы
		};
		lastChildLi.style.marginRight = '0'; // ставим последнему li margin-right: 0;
	};

	window.addEventListener('resize', function() { // следим за изменением ширины экрана
		if (document.documentElement.clientWidth > 756)	{ // если у нас нету меню бургера то ...
			lastChildLi.style.marginRight = 'auto'; // ставим последнему li margin-right: auto;
			firstMarg = firstChildLiStyle.marginLeft; // находим макджин left у 1-ого li
			lastMarg = lastChildLiStyle.marginRight; // находим марджин right у последнего li
			tranNumb(firstMarg, lastMarg); // перезапускаем функцию с новыми данными
			// console.log ('firstMarg = ' + firstMarg + ' ' + " lastMarg = "+ lastMarg) // проверка

			// если высота меню равно высоте ссылки меню (если все элементы одинаковы) или высота меню - 15px 
			// (это padding-buttom при возвращении из 2 слойного меню) равно также  высоте ссылки меню то...
			if (mainMenu.offsetHeight == firstChildLi.firstChild.offsetHeight || mainMenu.offsetHeight - 15 == firstChildLi.firstChild.offsetHeight) { // если меню обычное, то...
				// console.log ('1 ряд')
				headerBody.style.paddingBottom = '38px'; // ставим дефолтный PB [tlthe]
				headerRow.style.alignItems = 'center'; // центрируем лишки
				for (let i = 0; i < mainMenuLiAll.length; i++) { // каждому li в меню
					mainMenuLiAll[i].style.paddingBottom = '0px'; // убераем комперсирующий паддинг
				}
			} else { // если перешло в 2 ряда то...
				// console.log ('2-9999 рядов')
				headerBody.style.paddingBottom = '23px'; // меняем комперсирующий паддинг
				headerRow.style.alignItems = 'flex-start'; // делаем li по центру
				for (let i = 0; i < mainMenuLiAll.length; i++) { // и каждому li 
					mainMenuLiAll[i].style.paddingBottom = '15px'; // добавляем нижний раддинг
				};
			};

		} else { // если есть меню бургер то...
			headerBody.style.paddingBottom = '0'; // возможно из-за этого что-то не так
			headerRow.style.alignItems = 'center'; // центрируем лишки
			for (let i = 0; i < mainMenuLiAll.length; i++) { // у каждого ли 	
				mainMenuLiAll[i].style.paddingBottom = '0px'; // убераем отступы
			};
			lastChildLi.style.marginRight = '0'; // ставим последнему li margin-right: 0;
		};
	});


	

	// ВЫРАВНИВАНИЕ КОНТЕНТА В ФУЛЛСКРИНЕ ПО ЦЕНТРУ НЕ ЗАВИСЕМО ТО ПАДДИНГОВ - ТО ЧТО НАДО :)
	/* 
		Чтоб использовать скрипт надо:
		1) лучше использовать с выравнивалкой
		2) иметь фуллскрин или чёт тип того
		3) может чёт ещё надо, хз :?

		Недочёты:
		1) знать высоту контента
		2) может случайно зависнуть в небе - это связано с отрицательным margin
		3) нужно знать точное пространнство для него
		4) при фиксированним меню нельзя отступать то хедера, надо чё-то придумать ;) ...
		5) хедер надо делать не абсолютным это большой минус, надо думать что с этим делать
		6) надо знать чёткую высоту хереа, а то когда она уменьшается не то значение
		7) можно убрать копипасту :()
		8) чего-то может не хватать или надо запускать с выравнялкой
		9) надо согласовывать со следующим контентом
		10) ПРИ ПРОСТОМ УМЕНЬШЕНИИ ЭКРАНА БРАУЗЕРА ВСЁ ЛОМАЕТСЯЯЯЯЯЯЯ !!!!!!!! :(
		11) 
		)
	*/

	// работа с бургер меню при том, когда они по центру
	function tranNu(Mt, Mb, Pt, Pb) { // функция интепритирует данные (пример: вход-'1234px' выход-'1234)
		let MtN = +(Mt.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)), // переводим строку с px в число без px
			MbN = +(Mb.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)), // переводим строку с px в число без px
			PtN = +(Pt.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)), // переводим строку с px в число без px
			PbN = +(Pb.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)); // переводим строку с px в число без px

		let t = PtN + MtN, //  находим высоту от контента с верху 
			b = PbN + MbN, //  находим высоту от контента с низу 
			sum = t + b, // складываем высоты
			sum2 = sum / 2; // и делим на 2

		if (MbN <= 0) { // если нижний мардин auto 0
			if (MtN <= 0) { // проверяем : мардин топ меньше 0? Соприконулась ли граница с верху с топ падингом 
				firstChildLi.style.marginTop = 0 + 'px'; // если да, то больше марджин топ не надо трогать
			} else { // если нет, то...
				//	!!!  НУЖНО ЗНАТЬ ВЫСОТУ САМОГО КОНТЕНТА БЕЗ МАРДЖИНОВ И ПАДДИНГОВ  !!!
				// в скобке нужно вычитать хедер, чтобы высота экрана работала с контентом
				// 105 это для контента... a + a + ....
				
				// вычетаем и всех высоты эрана высоту контента и делим ёё на 2 и отнимает падинг топ
				firstChildLi.style.marginTop = (document.documentElement.clientHeight - 305) / 2 - PtN + 'px';
			};
		} else { // если ещё есть марджин, то...
			firstChildLi.style.marginTop = sum2 - PtN  + 'px'; // даём первому центрирующий марджин
		};
	};

	if (document.documentElement.clientWidth <= 756) { // если меню бургер, то...
		let firstMarginTopLi = firstChildLiStyle.marginTop, // нахдим МТ
			lastMarginBottomLi =  lastChildLiStyle.marginBottom, // нахдим МБ
			firstPaddingTopLi = firstChildLiStyle.paddingTop, // нахдим ПТ
			lastPaddingBottomLi = lastChildLiStyle.paddingBottom; // нахдим ПИ

		// console.log ('marginTOP =' + firstMarginTopLi + '  ' + 'marginBottom' + lastMarginBottomLi)
		tranNu(firstMarginTopLi, lastMarginBottomLi, firstPaddingTopLi, lastPaddingBottomLi);
	} else { // если не меню бургер, то...
		firstChildLi.style.marginTop = 0 + 'px'; // то не надо давать ему не нужный марджин топ
	};
	
	
	function tranBox(Mt, Mb, Pt, Pb) { // функция интепритирует данные (пример: вход-'1234px' выход-'1234)
		let MtN = +(Mt.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)), // переводим строку с px в число без px
			MbN = +(Mb.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)), // переводим строку с px в число без px
			PtN = +(Pt.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)), // переводим строку с px в число без px
			PbN = +(Pb.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)); // переводим строку с px в число без px

		let t = PtN + MtN, //  находим высоту от контента с верху 
			b = PbN + MbN, //  находим высоту от контента с низу 
			sum = t + b, // складываем высоты
			sum2 = sum / 2; // и делим на 2

		if (MbN <= 0) { // если нижний мардин auto 0
			if (MtN <= 0) { // проверяем : мардин топ меньше 0? Соприконулась ли граница с верху с топ падингом 
				startBox.style.marginTop = 0 + 'px'; // если да, то больше марджин топ не надо трогать
			} else { // если нет, то...
				// 100 ЭТО ВЫСОТА ХЕДЕРА, ОН С НИМ КОНТАКТИРУЕТ

				// вычетаем и всех высоты эрана высоту контента и делим ёё на 2 и отнимает падинг топ
				startBox.style.marginTop = (document.documentElement.clientHeight - 100 - bodyHeigth) / 2 - PtN + 'px';
			};
		} else { // если ещё есть марджин, то...
			startBox.style.marginTop = sum2 - PtN  + 'px'; // даём первому центрирующий марджин
		};
	};


	let startBody = document.querySelector('.start__body'), // находим контейнер в котором будет только контент
		bodyHeigth = startBody.offsetHeight; // узнаём его высоту

	let startBox = document.querySelector('.start__box'), // находим контейнер с падингами и марджинами
		startBoxStyle = getComputedStyle(startBox); // унаём у нето всё стили

	let startBoxMarginTop = startBoxStyle.marginTop, // узнаём МТ
		startBoxMarginBottom = startBoxStyle.marginBottom, // узнаём МБ
		startBoxPaddingTop = startBoxStyle.paddingTop, // узнаём PT
		startBoxPaddingBottom = startBoxStyle.paddingBottom;// узнаём PB

	tranBox(startBoxMarginTop, startBoxMarginBottom, startBoxPaddingTop, startBoxPaddingBottom); // закидываем в печь


	window.addEventListener('resize',function() { // следим за изменеием экрана
		if (document.documentElement.clientWidth <= 756) { // если бургер, то...
			firstMarginTopLi = firstChildLiStyle.marginTop; // обновляем данные по li
			lastMarginBottomLi =  lastChildLiStyle.marginBottom;
			firstPaddingTopLi = firstChildLiStyle.paddingTop;
			lastPaddingBottomLi = lastChildLiStyle.paddingBottom;

			// console.log ('marginTOP =' + firstMarginTopLi + '  ' + 'marginBottom' + lastMarginBottomLi)
			tranNu(firstMarginTopLi, lastMarginBottomLi, firstPaddingTopLi, lastPaddingBottomLi);

		} else { // если не бургер...
			firstChildLi.style.marginTop = 0 + 'px'; // не надо марждин
		};
		
		bodyHeigth = startBody.offsetHeight; // обновляем данные по блоку по центру...
		startBoxMarginTop = startBoxStyle.marginTop;
		startBoxMarginBottom = startBoxStyle.marginBottom;
		startBoxPaddingTop = startBoxStyle.paddingTop;
		startBoxPaddingBottom = startBoxStyle.paddingBottom;
		tranBox(startBoxMarginTop, startBoxMarginBottom, startBoxPaddingTop, startBoxPaddingBottom);
	});

	// НОВШЕСТВА !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	let content = document.querySelector('.content')
	let fullScrin = document.querySelector('.start__fullscrin')
	
	if (document.documentElement.clientHeight < fullScrin.offsetHeight) {
		content.style.top = fullScrin.offsetHeight + 'px'
	} else {
		content.style.top = '100%'
	}

	window.addEventListener('resize', function() {
		if (document.documentElement.clientHeight < fullScrin.offsetHeight) {
			content.style.top = fullScrin.offsetHeight + 'px'
		} else {
			content.style.top = '100%'
		}
	}); 
	


	// меню бургер 

	let burgName = 'menu__burger', // введите имя класс бургера
		listName = 'menu__list', // введите имя класс ul меню
		burger = document.querySelector(`.${burgName}`), // находим оболочку бyргера
		list = document.querySelector(`.${listName}`), // находим ul c навигацией
		maxWidthMob = 756; // при каком складываем в бургер???


	function menuBurger () {
		
		burger.addEventListener('click', function(event) { // ставим обработчик на бургер
			burger.classList.toggle(`${burgName}_active`) // при нажатии на бургер появляется крестик (актив)
			list.classList.toggle(`${listName}_active`) // и листу ul даётся класс актив


			if (burger.classList.contains(`${burgName}_active`)) { // если нажали на меню то...
				document.body.style.overflow = 'hidden'; // запрещяем прокрутку body

				// backBlack.style.display = 'block'; // врубаем чёрный бэграунд


			} else { // если меню не активно то...
				document.body.style.overflow = 'auto'; // разрешаем прокрутку меню

				// backBlack.style.display = 'none'; // вырубаем чёрный фон
			};
		});

		// если экран резко переходит в моб, то мы врубаем свойства...
		window.addEventListener('resize', function() { // следим за именением экрана
			if (document.documentElement.clientWidth > maxWidthMob) { // если он меньше того, когда появляется бургер...
				document.body.style.overflow = 'auto'; // разрешаем прокрутку

				// backBlack.style.display = 'none'; // вырубаем чёрный бэк
			}
			// если пользователь переходит из десктопа в моб при вклёчённом бургере 
			else if (burger.classList.contains(`${burgName}_active`)) { // если бургер активен...
				document.body.style.overflow = 'hidden'; // запрещяем прокрутку

				// backBlack.style.display = 'block'; // врубаем бэг
			}
			else { // ели чёт не то, то нечё не делаем
				return false
			}
		}) 
	}

	menuBurger ();


	// прицепление меню при скроле вниз
	sectionFixed = document.querySelector('.start__fullscrin'), // надо от чего-то отталкиваться
	sectionFixedCord = sectionFixed.offsetHeight; // находим верхнюю корду чего-то

	function fixHed () {
		let header = document.querySelector('header'), // находим хедер
			sectionFixed = document.querySelector('.start__fullscrin'), // надо от чего-то отталкиваться
			sectionFixedCord = sectionFixed.offsetHeight; // находим верхнюю корду чего-то

		function fixedOff () {
			header.classList.remove('header_fixed-off'); // удаляем класс появления
		};
		
		let currIn = false; // изначально нам не надо уберать шапку

		function fixHedGo() {
			if (document.documentElement.clientWidth > 756) { // если не меню бургер
				if (window.pageYOffset >= sectionFixedCord - 35) { // если крyтим в низ
					currIn = true; // шапка появилась
					header.classList.add('header_fixed-in'); // добавляем класс актива
					header.classList.remove('header_fixed-off'); // убераем класс не актива
				} else { // если на верху
					header.classList.remove('header_fixed-in'); // удаляем класс актива
					if (currIn) { // если мы побывали в низу 
						// console.log ('eas')
						header.classList.add('header_fixed-off'); // добавляем класс не актива
						setTimeout(fixedOff, 300); // запускаем функцию появления статик хедера в начале
						currIn = false; // обновляем переменную
					};
				};
			} else { // если меню бургер
				header.classList.remove('header_fixed-in'); // убрать анимацию
			};
		};

		window.addEventListener('resize', function() {
			sectionFixedCord = sectionFixed.offsetHeight; // обновляем данные
			fixHedGo();
		})

		window.addEventListener('scroll', function() {
			fixHedGo()
			// console.log (window.pageYOffset)
			// console.log (sectionFixedCord)
		});
	};
	fixHed();
	
	
	// window.addEventListener('scroll', function() {
	// 	console.log (window.pageYOffset)
	// })

	// Плавный скролл на чистом JS
	/*
		Чтоб использовать скрипт надо:
		1) Установить href у ссылки (пример <a href="#home" class="">Home</a>)
		2) Установить id секции (пример <section id='home'></section>)
		3) heightFixedMedu ищется высота прикреплённого хедера
	*/
	heightFixedMedu = 35;

	function animScroll() {
		let upA = document.querySelectorAll('a[href*="#"]'); // находим все ссылки начинающиеся на # (Это точно якори)

		for (let i = 0; i < upA.length; i++) { // забускаем цикл по всем ссылкам
			upA[i].addEventListener('click', function(event) { // Ставим обработчик на все якори

				event.preventDefault(); // отрубаем действие по умолчанию
				let href = this.getAttribute('href'); // получем href ссылки на которую кликнули
				let elemntAnchor = document.querySelector(href); // находим элемент, на котором стоит этот якорь
				// eсли это не якорь то не трогаем, хз как определить того чего нет :(

				// console.log (`zone ${elemntAnchor.offsetTop + sectionFixedCord}` ) // НУЖНО ДОБАВИТЬ ФУЛЛ СКРИН КАК ТО В + ОТСЧЁТ ОТ НЕГО ДОЛЖЕН ИДТИ

				if (href == '#up') { //если в href ссылки добавить #up, то скролл дойдёт до начала
					scrollUp() // вызываем соответствующую функцию
				} else {
                    if (window.pageYOffset > elemntAnchor.offsetTop + sectionFixedCord) { // если экран ниже элемента то...
                        scrollTop(elemntAnchor.offsetTop + sectionFixedCord - heightFixedMedu); // вызываем соответствующую функцию и - высоту fixed menu
                    } else if (window.pageYOffset < elemntAnchor.offsetTop + sectionFixedCord) { //если экран выше элемента то...
                        scrollBottom(elemntAnchor.offsetTop + sectionFixedCord - heightFixedMedu); // вызываем соотвктствующую функцию и - высоту fixed menu
                    } else { // если экран находится в одной координате с элементом то...
                        window.scrollTo(0, elemntAnchor.offsetTop + sectionFixedCord); // экран становтся в координату элемента и - высоту fixed menu
                    };
                };
			});
		};

		function scrollTop(elemntAnchor) { // функция вызывается если экран выше элемента
			if (window.pageYOffset > elemntAnchor) { // если координата экрана больше координаты элемента то...
				window.scrollTo(0, window.pageYOffset - 50); // скролим вверх по 50px за раз
				setTimeout(scrollTop, 1, elemntAnchor); // ждём 1 милисекунду и повторяем функцию
			} else { // если мы дошли до нужной координаты , то оставляем скролл на корде элемента
				window.scrollTo(0, elemntAnchor);
			};
		};

		function scrollBottom(elemntAnchor) { // функция вызывается если экран выше элемента
			if (window.pageYOffset < elemntAnchor) { // если координата экрана меньше координаты элемента то...
				window.scrollTo(0, window.pageYOffset + 50); // скролим вниз по 50px за раз
				setTimeout(scrollBottom, 1, elemntAnchor); // ждём 1 милисекунду и повторяем функцию
			} else { // если мы дошли до нужной координаты , то оставляем скролл на корде элемента
				window.scrollTo(0, elemntAnchor);
			};
		};

		function scrollUp() { // функция скролит экран в координату 0 0 (для стрелочки up)
			if (window.pageYOffset > 0) {
				window.scrollTo(0, window.pageYOffset - 50)
				setTimeout(scrollUp, 1)
			} else {
				window.scrollTo(0, 0)
			}
		}
	};
	animScroll ();


	


	
	$('.slider').slick({
		arrows: false, // вкл выкл стрелки
		dots: true, // вкл выкл точки
		infinite: true, // можно листать бесконечно
		slidesToShow: 1, // сколько показывать слайдов
		slidesToScroll: 1, //  сколько скролить слайдов
		fade: true,
	});

});