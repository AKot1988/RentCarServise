import { Review } from "../../utils/types";
import { SizeScreen } from "../../utils/types"
import API from "../../utils/API"
import Testimonials from "./Testimonials";
import Slider from "../Slider";



export default async function renderTestimonials() {
const testimonialsList = document.querySelector('.testimonials__wrapper') as HTMLDivElement

    if(testimonialsList) {
        const api = new API<Review[]>("../../../../dataJSON/testimonials.json")
        try {
            const testimonials = await api.getRequest();
        
            testimonials.forEach((elem) =>{
                const review = new Testimonials(elem)
                review.render(testimonialsList)
            })
            
            let gapSize = 49

            if(window.outerWidth <= SizeScreen.mobile){
                console.log('mobile')
                gapSize = 20
            } else if(window.outerWidth <= SizeScreen.tablet){
                console.log('tablet');
                gapSize = 25
            } else if(window.outerWidth <= SizeScreen.tabletBigger){
                console.log('tablet-bigger');
                gapSize = 35
            }
            
            new Slider(
            '.testimonials__wrapper', 
            '.testimonials__wrapper-item', 
            '.testimonials__arrow-right', 
            '.testimonials__arrow-left', 
            gapSize,
            true, 
            1500
            ) 

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}