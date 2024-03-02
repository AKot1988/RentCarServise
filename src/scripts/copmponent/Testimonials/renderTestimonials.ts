import API from "../../utils/API"
import { Review } from "./types";
import Testimonials from "./Testimonials";
import Slider from "../Slider";

export default async function renderTestimonials() {
const testimonialsList = document.querySelector('.testimonials__wrapper') as HTMLDivElement

if(testimonialsList) {
    const api = new API<Review[]>("../../../../dataJSON/testimonials.json")
    try {
        const testimonials = await api.getRequest();
        
        let numberItem = 0 

        testimonials.forEach((elem) =>{
            const review = new Testimonials(elem)
            review.render(testimonialsList)
        })
        
        let allReviews = document.querySelectorAll('.testimonials__wrapper-item') 
        allReviews.forEach(elem => {
            numberItem++
            if(numberItem <= 3) {
                elem.classList.add('active')
            }
        })
        new Slider('.testimonials__arrow-right', '.testimonials__arrow-left', '.testimonials__wrapper-item', 0, 3, numberItem) 
    
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
}