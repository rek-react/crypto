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