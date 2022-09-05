import nouislider from "./nouislider.js"
import dynamicAdapt from "./dynamicAdapt.js"
import menu from "./menu.js"
import spoiler from "./spoiler.js"
import swiper from "./swiper.js"
class App {
    init() {
        nouislider.init()
        menu.init()
        dynamicAdapt.init()
        spoiler.init()
        swiper.init()
    }
}
const app = new App()
app.init()