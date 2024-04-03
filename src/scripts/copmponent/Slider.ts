export default class Slider {
    public track: HTMLElement
    public slide: HTMLElement
    public btnRight: HTMLElement
    public btnLeft: HTMLElement

    public gap: number
    public loop: boolean
    public autoPlay: boolean
    public timeToPlay: number

    public currentOffset: number
    public currentElement: number
    public intervalId: null | number
    public slideWidth: number
    
    constructor(track: string, slideItem: string, btnRight: string, btnLeft: string, gap: number, loop: boolean, autoPlay?: boolean, timeToPlay?: number) {
        this.track = document.querySelector(track) as HTMLElement
        this.slide = document.querySelector(slideItem) as HTMLElement
        this.btnRight = document.querySelector(btnRight) as HTMLElement
        this.btnLeft = document.querySelector(btnLeft) as HTMLElement

        this.gap = gap
        this.loop = loop
        this.autoPlay = autoPlay as boolean
        this.timeToPlay = timeToPlay as number

        this.currentOffset = 0
        this.currentElement = 0
        this.intervalId = null
        this.slideWidth = this.slide.clientWidth
        
        this.init()
    }

    moveRight() {
        if(this.intervalId){
            clearInterval(this.intervalId)
        }

        if(!this.loop) {
            this.btnRight.classList.remove('deact')
            if (this.currentElement == 0) {
                this.btnLeft.classList.add('deact')
            } else {
                this.currentElement--
    
                this.track.style.cssText = 'transition:margin 750ms ease-in-out;'
                this.currentOffset += this.slide.clientWidth + this.gap
                this.track.style.marginLeft = this.currentOffset + 'px'  
            }
        } else {
            const num = 1 
            let that = this
            
            for (let i = 0; i < num; i++) {
                let lastSlide = that.track.lastElementChild
                if(lastSlide){
                    that.track.prepend(lastSlide)
                }
            }
            this.track.style.marginLeft = '-' + (this.slideWidth * num + this.gap) + 'px'
		    window.getComputedStyle(this.track).marginLeft
            this.track.style.cssText = 'transition:margin 750ms ease-in-out;'
            this.track.style.marginLeft = '0px'

            setTimeout (function(){
                that.track.style.transition = 'none'
            }, 750)
        }   
    }
    
    moveLeft() {
        if(this.intervalId){
            clearInterval(this.intervalId)
        }
        
        if(!this.loop) {
            this.currentElement++
            
            this.btnLeft.classList.remove('deact')
            if (this.currentElement == this.track.childElementCount - 3) {
                this.btnRight.classList.add('deact')
            }
    
            this.track.style.cssText = 'transition:margin 750ms ease-in-out;'
            this.currentOffset -= this.slide.clientWidth + this.gap
            this.track.style.marginLeft = this.currentOffset + 'px'
        } else {
            const num = 1
            let that = this
            
            this.track.style.cssText = 'transition:margin 750ms ease-in-out;'
            this.track.style.marginLeft = '-' + (this.slideWidth * num + this.gap) + 'px'
            setTimeout (function(){
                that.track.style.transition = 'none'
                for (let i = 0; i < num; i++) {
                    let firstSlide = that.track.firstElementChild
                    if(firstSlide){
                        that.track.append(firstSlide)
                    }
                }
                that.track.style.marginLeft = '0px'
            }, 750)
        }  
    }
    
    attachHandlers() {
        this.btnLeft.addEventListener('click', this.moveRight.bind(this))
        this.btnRight.addEventListener('click', this.moveLeft.bind(this))
    }
    
    autoScroll() {
        const that = this
        
        const callback = function (entries: IntersectionObserverEntry[]) {
    
            entries.forEach((entry: IntersectionObserverEntry) => {
                
                if (entry.isIntersecting){
                    that.intervalId = setInterval (() => {
                        that.moveLeft()
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
            this.attachHandlers()
        } 
        if(this.autoPlay){
            this.autoScroll()
        }
    }
}
