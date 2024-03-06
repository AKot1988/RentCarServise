import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import UniversalButton from "./copmponent/UniversalButton/UniversalButton";
import TabsSection from "./copmponent/TabsSection/TabsSection";
import { carCardDataToRender } from "./copmponent/CarCardComponent/helper";
import { tabParams } from "./copmponent/TabComponent/TabComponent";
import renderTestimonials from "./copmponent/Testimonials/renderTestimonials";



fetchData();
renderTestimonials()


const buttonOptions = {
    innerText: 'Search',
    class: 'button__serch'
};

const parentElement = document.querySelector('.select__wrapper--drop') as HTMLElement;

const button = new UniversalButton(buttonOptions);
button.render(parentElement);


new TabsSection(tabParams, carCardDataToRender);






