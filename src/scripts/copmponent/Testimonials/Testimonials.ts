import { Review } from "./types"
import CreateElement from "../CreateElement/CreateElement"

export default class Testimonials {
    constructor(public singleReview: Review) { 
    }
    render(container: HTMLElement): void {
        const wrapperItem = new CreateElement('div', {classes: 'testimonials__wrapper-item', id: this.singleReview._id}).render()
        
        const pic = new CreateElement ('picture', {classes: 'testimonials__wrapper-item-pic'}).render()
        const img = new CreateElement ('img', {src: this.singleReview.image, alt: 'photo', classes: 'testimonials__wrapper-item-pic-photo'}).render()
        
        const customer = new CreateElement ('div', {classes: 'testimonials__wrapper-item-customer'}).render()
        const customerName = new CreateElement ('h2', {textContent: this.singleReview.name, classes: 'testimonials__wrapper-item-customer-name'}).render()
        const location = new CreateElement ('p', {textContent: this.singleReview.place, classes: 'testimonials__wrapper-item-customer-location'}).render()
        
        const rating = new CreateElement ('p', {textContent: `${this.singleReview.rating}`, classes: 'testimonials__wrapper-item-rating'}).render()
        const text = new CreateElement ('p', {textContent: this.singleReview.text, classes: 'testimonials__wrapper-item-content'}).render()
        
        pic.append(img)
        customer.append(customerName, location)
        wrapperItem.append(pic, customer, rating, text)
        container.append(wrapperItem)
    }
}