import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import TabsSection from "./copmponent/TabsSection/TabsSection";
import { tabParams } from "./copmponent/TabComponent/TabComponent";
import renderTestimonials from "./copmponent/Testimonials/renderTestimonials";
import { serviceData, parentElement } from "./copmponent/ListService/helpers";
import ListService from "./copmponent/ListService/ListService";



fetchData();
renderTestimonials()




new TabsSection(tabParams);
const listService = new ListService(serviceData);
listService.render(parentElement);

