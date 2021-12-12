const BODY = document.body
const MENUHEADER = document.querySelector('.header__menu')

document.addEventListener('DOMContentLoaded', () => {
   document.addEventListener('click', (e) => {
      if (e.target.closest('.header__burger')) {
         const burger = e.target.closest('.header__burger')
         burger.classList.toggle('_active')
         BODY.classList.toggle('_lock')
         MENUHEADER.classList.toggle('_show')
      }
   })
})

if (document.querySelector('.reviews__swiper')) {
   new Swiper(document.querySelector('.reviews__swiper'), {
      slideClass: 'swiper-reviews__slide',
      wrapperClass: 'swiper-reviews__wrapper',
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      watchOverflow: true,
      slidesPerGroup: 1,
      slidesPerView: 5,
      centeredSlides: true,
      loop: true,
      slidesPerView: 3,
      grabCursor: true,
      effect: 'coverflow',
      coverflowEffect: {
         rotate: 0,
         slidesShadows: true,
      },
      navigation: {
         prevEl: '.arrows-reviews__arrow-prev',
         nextEl: '.arrows-reviews__arrow-next'
      },
      pagination: {
         el: '.swiper-reviews__pagination',
         clickable: true,
      },
      breakpoints: {
         1155: {
            slidesPerView: 5,
         },
         768.2: {
            slidesPerView: 3,
            effect: 'coverflow',
            coverflowEffect: {
               rotate: 0,
               slidesShadows: true,
            },
         },
         525.2: {
            slidesPerView: 3,
            spaceBetween: 0,

         },
         320: {
            slidesPerView: 'auto',
            spaceBetween: 10,
         },
      }

   })
}
const spoilersArray = document.querySelectorAll('[data-spoilers]')
if (spoilersArray) {
   new Spoilers(spoilersArray)
}


"use strict";

function DynamicAdapt(type) {
   this.type = type;
}

DynamicAdapt.prototype.init = function () {
   const _this = this;
   // массив объектов
   this.оbjects = [];
   this.daClassname = "_dynamic_adapt_";
   // массив DOM-элементов
   this.nodes = document.querySelectorAll("[data-da]");

   // наполнение оbjects объктами
   for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "768";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
   }

   this.arraySort(this.оbjects);

   // массив уникальных медиа-запросов
   this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint / 16 + "em)," + item.breakpoint;
   }, this);
   this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
   });
   // навешивание слушателя на медиа-запрос
   // и вызов обработчика при первом запуске
   for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
         return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addEventListener('change', function () {
         _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
   }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
   if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
         const оbject = оbjects[i];
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
   } else {
      for (let i = 0; i < оbjects.length; i++) {
         const оbject = оbjects[i];
         if (оbject.element.classList.contains(this.daClassname)) {
            this.moveBack(оbject.parent, оbject.element, оbject.index);
         }
      }
   }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
   element.classList.add(this.daClassname);
   if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
   }
   if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
   }
   destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
   element.classList.remove(this.daClassname);
   if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
   } else {
      parent.insertAdjacentElement('beforeend', element);
   }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
   const array = Array.prototype.slice.call(parent.children);
   return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
   if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }

            if (a.place === "first" || b.place === "last") {
               return -1;
            }

            if (a.place === "last" || b.place === "first") {
               return 1;
            }

            return a.place - b.place;
         }

         return a.breakpoint - b.breakpoint;
      });
   } else {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }

            if (a.place === "first" || b.place === "last") {
               return 1;
            }

            if (a.place === "last" || b.place === "first") {
               return -1;
            }

            return b.place - a.place;
         }

         return b.breakpoint - a.breakpoint;
      });
      return;
   }
};

const da = new DynamicAdapt("max");
da.init();
var rangeCalculator = document.querySelector('.calculator-range');
var FormatCalculatorOutput = wNumb({
   thousand: ' ',
   suffix: ' $',
});
if (rangeCalculator) {
   var rangeCalculatorInput = document.querySelector('.range-calculator__input');

   noUiSlider.create(rangeCalculator, {
      start: [10000],
      // step: 5000,
      connect: 'lower',
      pips: {
         density: 20,
         mode: 'count',
         values: 6,
         format: wNumb({
            thousand: ' ',
            suffix: '$',
         })
      },
      range: {
         'min': [5000, 5000],
         '20%': [10000, 20000],
         '40%': [30000, 20000],
         '60%': [50000, 20000],
         '80%': [70000, 30000],
         // '50%': [4000, 1000],
         'max': [100000]
      }
   });
   rangeCalculatorInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^\d]/g, '');
      rangeCalculator.noUiSlider.set(e.target.value);
   })
   rangeCalculator.noUiSlider.on('update', function (values, handle) {
      rangeCalculatorInput.value = FormatCalculatorOutput.to(Number(values[handle]))
   });

   document.addEventListener('DOMContentLoaded', () => {

      function clickOnPip(e) {
         if (e.target.closest('.noUi-marker-large')) {
            var valueLarge = Number(e.target.closest('.noUi-marker-large').nextElementSibling.getAttribute('data-value'));
            rangeCalculator.noUiSlider.set(valueLarge);
         }
      }
      rangeCalculator.addEventListener('click', clickOnPip);
   })

}







const isMobile = {
   Android() {
      return navigator.userAgent.match(/Android/i)
   },
   BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i)
   },
   IOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i)
   },
   Opera() {
      return navigator.userAgent.match(/Opera Mini/i)
   },
   Windows() {
      return navigator.userAgent.match(/IEMobile/i)
   },
   any() {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.IOS() ||
         isMobile.Opera() ||
         isMobile.Windows())
   }
}

function removeClasses(selector, className) {
   selector.forEach((item) => {
      item.classList.remove(className)
   })
}
function _slideUp(target, duration = 500) {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = target.offsetHeight + 'px'
      target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = 0
      target.style.paddingTop = 0
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0
      window.setTimeout(() => {
         target.hidden = true
         target.style.removeProperty('height')
         target.style.removeProperty('padding-top')
         target.style.removeProperty('padding-bottom')
         target.style.removeProperty('margin-top')
         target.style.removeProperty('margin-bottom')
         target.style.removeProperty('overflow')
         target.style.removeProperty('transition-duration')
         target.style.removeProperty('transition-property')
         target.classList.remove('_slide')
      }, duration)
   }
}
function _slideDown(target, duration = 500) {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      if (target.hidden) {
         target.hidden = false
      }
      let height = target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = 0
      target.style.paddingTop = 0
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0
      target.offsetHeight
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = height + 'px'
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      window.setTimeout(() => {
         target.style.removeProperty('height')
         target.style.removeProperty('overflow')
         target.style.removeProperty('transition-duration')
         target.style.removeProperty('transition-property')
         target.classList.remove('_slide')
      }, duration)
   }
}
function _slideToggle(target, duration = 500) {
   if (target.hidden) {
      return _slideDown(target, duration)
   } else {
      return _slideUp(target, duration)
   }
}