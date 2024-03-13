export default class Slider {
    public track: HTMLElement
    public slide: HTMLElement
    public btnRight: HTMLElement
    public btnLeft: HTMLElement
    public gap: number
    public autoPlay: boolean
    public timeToPlay: number
    public intervalId: null | number
    
    constructor(track: string, slideItem: string, btnRight: string, btnLeft: string, gap: number, autoPlay?: boolean, timeToPlay?: number) {
        this.track = document.querySelector(track) as HTMLElement
        this.slide = document.querySelector(slideItem) as HTMLElement
        this.btnRight = document.querySelector(btnRight) as HTMLElement
        this.btnLeft = document.querySelector(btnLeft) as HTMLElement
        this.gap = gap
        this.autoPlay = autoPlay as boolean
        this.timeToPlay = timeToPlay as number
        this.intervalId = null
        
        this.init()
    }

    slideLeft() {
        this.btnRight.classList.remove('deact')
        if(this.intervalId){
            clearInterval(this.intervalId)
        }
        const slideWidth = this.slide.clientWidth + this.gap
        this.track.scrollLeft -= slideWidth 
    }

    slideRight() {
        this.btnLeft.classList.remove('deact')
        if(this.intervalId){
            clearInterval(this.intervalId)
        }
        const slideWidth = this.slide.clientWidth + this.gap
        this.track.scrollLeft += slideWidth   
    }

    handleScroll() {
        const spaceForScroll = this.track.scrollWidth - this.track.clientWidth

        this.btnLeft.classList.remove('deact')
        this.btnRight.classList.remove('deact')
    
        if (this.track.scrollLeft <= 0) {
            this.btnLeft.classList.add('deact')
        }
        if (this.track.scrollLeft === spaceForScroll || this.track.scrollLeft === spaceForScroll - 1) {
            this.btnRight.classList.add('deact')
            if(this.intervalId){
                clearInterval(this.intervalId)
            }
        }
    }
    
    handleSlider() {
        
        this.btnLeft.addEventListener('click', this.slideLeft.bind(this))
        
        this.btnRight.addEventListener('click', this.slideRight.bind(this))

        this.track.addEventListener('scroll', this.handleScroll.bind(this))
    }
    
    autoScroll() {
        const that = this
        
        const callback = function (entries: IntersectionObserverEntry[]) {
    
            entries.forEach((entry: IntersectionObserverEntry) => {
                
                if (entry.isIntersecting){
                    that.intervalId = setInterval (() => {
                        const slide = entry.target.firstChild
                        if (slide instanceof HTMLElement) {
                            const slideWidth = slide.clientWidth + that.gap
                            entry.target.scrollLeft += slideWidth
                        }
                    }, that.timeToPlay)
                } else {
                    if(that.intervalId){
                        clearInterval(that.intervalId)
                    }
                }
            })
        }
        const options = {
            threshold: 1.0,
        }
        const observer = new IntersectionObserver(callback, options)
        observer.observe(this.track)
    }
        
    init(){
        if(!!this.slide){
            this.handleSlider()
        } 
        if(this.autoPlay){
            this.autoScroll()
        }
    }
}
