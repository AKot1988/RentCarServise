import { Review } from "../../utils/types";
import { countingFlexBasis, countingGapSize, cutText } from "./countingSizes";
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
                const elemAllText = elem.text
                elem.text = cutText(elemAllText)
                
                const review = new TestimonialCard(elem)
                review.render(testimonialsList, flexBasis)
            })

            new Slider(
            '.testimonials__wrapper', 
            '.testimonials__wrapper-item', 
            '.testimonials__arrow-right', 
            '.testimonials__arrow-left', 
            gapSize,
            true, 
            true,
            2000
            ) 

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}