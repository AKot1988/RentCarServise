import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import TabsSection from "./copmponent/TabsSection/TabsSection";
import { tabParams } from "./copmponent/Tab/Tab";
import renderTestimonials from "./copmponent/Testimonials/renderTestimonials";
import { allCarsData } from "./copmponent/CarCard/helper.ts"
import { Tab } from "./copmponent/Tab/Tab.ts"
import ListService from "./copmponent/ListService/ListService.ts";
import { serviceData, parentElement } from "./copmponent/ListService/helpers.ts";

fetchData();
renderTestimonials()

let allCars = await allCarsData('../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1')

new Tab(tabParams, document.querySelector('.popular__tabs__container') as HTMLDivElement);
new TabsSection(allCars);

const listService = new ListService(serviceData);
listService.render(parentElement)