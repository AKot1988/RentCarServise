import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import TabsSection from "./copmponent/TabsSection/TabsSection";
import { tabParams } from "./copmponent/Tab/Tab";
import renderTestimonials from "./copmponent/Testimonials/renderTestimonials";



fetchData();
renderTestimonials()
new TabsSection(tabParams, '../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1', 'general');