import { Review } from "../../utils/types";
import { countingFlexBasis, countingGapSize } from "./countingSizesForRender";
import API from "../../utils/API";
import TestimonialCard from "./TestimonialCard";
import Slider from "../Slider";


export default async function renderTestimonials() {
const testimonialsList = document.querySelector('.testimonials__wrapper') as HTMLDivElement

    if(testimonialsList) {
        const api = new API<Review[]>("../../../../dataJSON/testimonials.json")
        try {
            const flexBasis = countingFlexBasis()
            const gapSize = countingGapSize()

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