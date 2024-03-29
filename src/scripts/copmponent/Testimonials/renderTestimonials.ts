import { Review } from "../../utils/types";
import { SizeScreen } from "../../utils/types"
import API from "../../utils/API"
import TestimonialCard from "./TestimonialCard";
import Slider from "../Slider";


export default async function renderTestimonials() {
const testimonialsList = document.querySelector('.testimonials__wrapper') as HTMLDivElement

    if(testimonialsList) {
        const api = new API<Review[]>("../../../../dataJSON/testimonials.json")
        try {
            const width = window.innerWidth
            
            let gapSize = 49
            let marginSize = 65
            let widthTesWrap = width - 2 * gapSize - 2 * marginSize
            let maxWidthWrap = SizeScreen.desktop - 2 * gapSize - 2 * marginSize
            let flexBasis = 25.88 - ((maxWidthWrap - widthTesWrap) / 130)
            
            if (width <= SizeScreen.mobile){
                gapSize = 20
                marginSize = 20
                widthTesWrap = width - 2 * marginSize
                maxWidthWrap = SizeScreen.mobile - 2 * marginSize
                flexBasis = 89.4 - ((maxWidthWrap - widthTesWrap) / 30)
                
            } else if(width <= SizeScreen.tablet){
                gapSize = 25
                marginSize = 30
                widthTesWrap = width - 2 * marginSize
                maxWidthWrap = SizeScreen.tablet - 2 * marginSize
                flexBasis = 95 - ((maxWidthWrap - widthTesWrap) / 70)
                
            } else if(width <= SizeScreen.tabletBigger){
                gapSize = 35
                marginSize = 55
                widthTesWrap = width - gapSize - 2 * marginSize
                maxWidthWrap = SizeScreen.tabletBigger - 2 * gapSize - 2 * marginSize
                flexBasis = 44.8 - ((maxWidthWrap - widthTesWrap) / 130) 
                
            } else if (SizeScreen.desktop <= width) {
                flexBasis = 25.88 
            } 
            
            const testimonials = await api.getRequest();
            testimonials.forEach((elem) =>{
                if(elem.text.length > 156){
                    elem.text = elem.text.slice(0, 155) + '...'
                }
                const review = new TestimonialCard(elem)
                review.render(testimonialsList, flexBasis)
            })

            new Slider(
            '.testimonials__wrapper', 
            '.testimonials__wrapper-item', 
            '.testimonials__arrow-right', 
            '.testimonials__arrow-left', 
            gapSize,
            false, 
            false,
            2000
            ) 

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}