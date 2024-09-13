class RangeSlider extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open'
    });

    this.min = this.getAttribute('minimal') ? this.getAttribute('minimal') : 1;
    this.max = this.getAttribute('maximal') ? this.getAttribute('maximal') : 10;


    this.data = Math.round(((this.max - this.min) / 2), 1);
    function getData() {
      return this.data;
    }
    const event = new CustomEvent('customEventName', {
      detail: this.data
    });
    this.inputTypeNumber = document.createElement('input');
    this.inputTypeNumber.type = 'number';
    this.inputTypeNumber.className = 'item';
    this.inputTypeNumber.setAttribute('min', this.min);
    this.inputTypeNumber.setAttribute('max', this.max);

    this.inputTypeRange = document.createElement('input');
    this.inputTypeRange.type = 'range';
    this.inputTypeRange.className = 'custom-range';
    this.inputTypeRange.setAttribute('min', this.min);
    this.inputTypeRange.setAttribute('max', this.max);

    this.inputTypeRange.addEventListener('input', (e) => {

      let minVal = parseInt(this.inputTypeRange.min);
      let maxVal = parseInt(this.inputTypeRange.max);
      let newVal = e.target.value;

      let percentage = ((newVal - minVal) / (maxVal - minVal)) * 100;
      let negPercentage = -1 * percentage;

      this.text.style.left = percentage + '%';
      this.text.style.transform = 'translate(' + negPercentage + '%, 2px)';

      const intMax = parseInt(this.max, 10);
      const intMin = parseInt(this.min, 10);
      const intNevVal = parseInt(newVal, 10);


      if (intNevVal >= intMin && intNevVal <= intMax) {
        this.text.innerHTML = newVal;
        this.inputTypeNumber.value = e.target.value;
        this.data = intNevVal;
        this.dispatchEvent(event);

      }

    });

    this.inputTypeNumber.addEventListener('input', (e) => {
      let minVal = parseInt(this.inputTypeRange.min);
      let maxVal = parseInt(this.inputTypeRange.max);
      let newVal = e.target.value;

      let percentage = ((newVal - minVal) / (maxVal - minVal)) * 100;
      console.log(percentage)
      let negPercentage = -1 * percentage;
      console.log(negPercentage)

      this.text.style.left = percentage + '%';
      this.text.style.transform = 'translate(' + negPercentage + '%, 2px)';
      const intMax = parseInt(this.max, 10);
      const intMin = parseInt(this.min, 10);
      if (e.target.value >= intMin && e.target.value <= intMax) {
        this.text.innerHTML = e.target.value;
        this.data = e.target.value;
        this.dispatchEvent(event);

      }
    })


    this.text = document.createElement("div");
    this.text.className = 'range-text'
    this.text.innerHTML = this.data;
    this.inputTypeNumber.value = this.data;

    this.container = document.createElement('div');
    this.container.className = 'container';



    this.containerInput = document.createElement('div');
    this.containerInput.className = 'input-container item';
    this.containerInput.appendChild(this.inputTypeRange);
    this.containerInput.appendChild(this.text);

    this.container.appendChild(this.containerInput);
    this.container.appendChild(this.inputTypeNumber);


    const style = document.createElement('style');
    style.innerHTML = `
        
        .input-container {
            position: relative;
            display: flex;
            width: 100%;
            padding: 0;
          }
          
          input[type="range"] {
            margin-bottom: 1rem;
            border: 1px solid gray;
            appearance: none;
            background-color: white;
            width: 100%;
            height: 7px;
            padding: 0;
            border-radius: 2px;
          }
          
          input[type="range"]::-webkit-slider-thumb {
            -moz-appearance: none !important;
            appearance: none !important;
            position: relative;
            height: 20px;
            width: 40px;
            background: transparent;
            cursor: pointer;
            z-index: 2;
          }
          
          input[type="range"]::-moz-range-thumb {
            -moz-appearance: none !important;
            appearance: none !important;
            position: relative;
            height: 20px;
            width: 40px;
            background: transparent;
            cursor: pointer;
            z-index: 2;
          }
          
          .range-text {
            position: absolute;
            top: -6px;
            left: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: lightgray;
            text-align: center;
            line-height: 1;
            height: 20px;
            width: 40px;
            transform: translate(0, 2px);
            border-radius: 3px;
            border: 1px solid gray;
          }
          .container{
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            width: 10rem;
          }
          .item{
            border: 0;
            padding: 0;
          }
          input{
            margin: 0;
          }
          input[type="number"]{
            border: 1px solid gray;
          }
        `;

    this.shadowRoot.appendChild(this.container);
    this.shadowRoot.appendChild(style);

  }
}

customElements.define("range-slider", RangeSlider);