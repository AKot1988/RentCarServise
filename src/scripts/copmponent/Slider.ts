export default class Slider {
    public track: HTMLElement
    public slide: HTMLElement
    public btnRight: HTMLElement
    public btnLeft: HTMLElement
    
    constructor(track: string, slideItem: string, btnRight: string, btnLeft: string) {
        this.track = document.querySelector(track) as HTMLElement
        this.slide = document.querySelector(slideItem) as HTMLElement
        this.btnRight = document.querySelector(btnRight) as HTMLElement
        this.btnLeft = document.querySelector(btnLeft) as HTMLElement
        
        this.init()
    }
    
    handleSlider() {
        this.btnLeft.addEventListener('click', () => {
            this.btnRight.classList.remove('deact')
            
            const slideWidth = this.slide.clientWidth + 49
            this.track.scrollLeft -= slideWidth

        })
        
        this.btnRight.addEventListener('click', () => {  
            this.btnLeft.classList.remove('deact')
            
            const slideWidth = this.slide.clientWidth + 49
            this.track.scrollLeft += slideWidth   
        })

        this.track.addEventListener('scroll', () => {
            const trackScrollWidth = this.track.scrollWidth
            const trackOuterWidth = this.track.clientWidth
    
            this.btnLeft.classList.remove('deact')
            this.btnRight.classList.remove('deact')
    
            if (this.track.scrollLeft <= 0) {
                this.btnLeft.classList.add('deact')
            }
            if (this.track.scrollLeft === trackScrollWidth - trackOuterWidth) {
                this.btnRight.classList.add('deact')
            }
        })
    }

    init(){
        if(!!this.slide){
            this.handleSlider()
        } 
    }
}