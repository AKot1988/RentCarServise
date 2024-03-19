import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import TabContent from "./copmponent/TabContent/TabContent.ts";
import { tabParams } from "./copmponent/TabHeader/TabHeader.ts";
import renderTestimonials from "./copmponent/Testimonials/renderTestimonials";
import { allCarsData } from "./copmponent/CarCard/helper.ts"
import TabHeader from "./copmponent/TabHeader/TabHeader.ts"
import ListService from "./copmponent/ListService/ListService.ts";
import { serviceData, parentElement } from "./copmponent/ListService/helpers.ts";
import Modal from "./copmponent/Modal/Modal.ts";
import { toggleMenu } from "./utils/toggleMenu.ts";
import API from "./utils/API.ts";
import { newElementAttributesInterface } from "./copmponent/UniversalButton/types.ts";


fetchData();
renderTestimonials();
toggleMenu();

const listService = new ListService(serviceData);
listService.render(parentElement);


const navigationBtn = document.querySelector('.navigation__buttons-container') as HTMLElement;
const modal = new Modal(navigationBtn);
modal.initListeners();



// window.addEventListener('DOMContentLoaded', async () => {
// const tabParams = await new API('../../../../dataJSON/tabsData.json').getRequest() as newElementAttributesInterface[];
// new TabHeader(tabParams, document.querySelector('.popular__tabs__container') as HTMLDivElement).render()

// let allCars = await allCarsData('../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1')
// localStorage.setItem("carData", JSON.stringify(allCars))
// let loader = document.querySelector('.loader') as HTMLElement;
// loader.remove();
// })




const tabParams = await new API('../../../../dataJSON/tabsData.json').getRequest() as newElementAttributesInterface[];
new TabHeader(tabParams, document.querySelector('.popular__tabs__container') as HTMLDivElement).render()
let allCars = await allCarsData('../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1')
localStorage.setItem("carData", JSON.stringify(allCars))
