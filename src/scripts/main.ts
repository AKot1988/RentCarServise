import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import UniversalButton from "./copmponent/UniversalButton/UniversalButton";
import TabsSection from "./copmponent/TabsSection/TabsSection";
import { carCardData } from "./copmponent/CarCardComponent/CarCardComponent";
import { tabParams } from "./copmponent/TabComponent/TabComponent";
import renderTestimonials from "./copmponent/Testimonials/renderTestimonials";

const tabsSection = new TabsSection(tabParams, carCardData);

fetchData();
renderTestimonials()


const buttonOptions = {
    innerText: 'Search',
    class: 'button__serch'
};

const parentElement = document.querySelector('.select__wrapper--drop') as HTMLElement;

const button = new UniversalButton(buttonOptions);
button.render(parentElement);






