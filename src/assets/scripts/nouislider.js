import wNumb from "wnumb"
import noUiSlider from "nouislider"

class NoUiSlider {

   init() {
      const rangeCalculator = document.querySelector('.calculator-range')
      const rangeCalculatorInput = document.querySelector('.range-calculator__input')
      const FormatCalculatorOutput = wNumb({
         thousand: ' ',
         suffix: ' $',
      });

      noUiSlider.create(rangeCalculator, {
         start: [10000],
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
            'max': [100000]
         }
      })
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
}
export default new NoUiSlider()