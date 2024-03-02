export default class Slider {
    public btnRight: HTMLElement
    public btnLeft: HTMLElement
    public slides: HTMLElement[]
    public firstIndex: number
    public set: number
    public qtySlides: number

    constructor(btnRight: string, btnLeft: string, slideItem: string, indexFirstElem: number, set: number, qtySlides: number) {
        this.btnRight = document.querySelector(btnRight) as HTMLElement
        this.btnLeft = document.querySelector(btnLeft) as HTMLElement
        this.slides = Array.from(document.querySelectorAll(slideItem));
        this.firstIndex = indexFirstElem || 0;
        this.set = set || 3;
        this.qtySlides = qtySlides 
        
        this.init()
    }
    
    handleSlider() {
        this.btnLeft.addEventListener('click', () => {
            this.btnRight.classList.remove('deact')
            
            if(this.firstIndex === 0 ) {
                this.btnLeft.classList.add('deact')
            } else {
                let lastIndex = this.firstIndex + this.set - 1 
                this.slides[lastIndex].classList.remove('active')
                
                this.firstIndex = this.firstIndex - 1 
                this.slides[this.firstIndex].classList.add('active')
            }
        })
        
        this.btnRight.addEventListener('click', () => {
            let slideCount = this.slides.length;

            this.btnLeft.classList.remove('deact')
            
            if (slideCount <= (this.firstIndex + this.set)) {
                this.btnRight.classList.add('deact')
            } else {
                this.slides[this.firstIndex].classList.remove('active') 
                this.firstIndex = this.firstIndex + 1 
                
                let lastIndex = this.firstIndex + this.set - 1
                this.slides[lastIndex].classList.add('active')
            }
        })
    }

    init(){
        if(!!this.slides.length){
            this.handleSlider()
        } 
    }
}