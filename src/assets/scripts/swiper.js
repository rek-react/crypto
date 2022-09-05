import Swiper, { Navigation, Pagination } from 'swiper'
class SwiperUser {
    constructor() {
        this.reviewsSwiper = document.querySelector('.reviews__swiper')
    }
    init() {
        new Swiper(this.reviewsSwiper, {
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
            modules: [Navigation, Pagination],
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
}
export default new SwiperUser()