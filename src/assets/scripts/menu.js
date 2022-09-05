
class Menu {
    constructor() {
        this.body = document.body
        this.menuHeader = document.querySelector('.header__menu')
    }
    init() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.header__burger')) {
                const burger = e.target.closest('.header__burger')
                burger.classList.toggle('_active')
                this.body.classList.toggle('_lock')
                this.menuHeader.classList.toggle('_show')
            }
        })
    }
}
export default new Menu()