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
        
            testimonials.forEach((elem) =>{
                const review = new Testimonials(elem)
                review.render(testimonialsList)
            })
        
            new Slider('.testimonials__wrapper', '.testimonials__wrapper-item', '.testimonials__arrow-right', '.testimonials__arrow-left') 

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

