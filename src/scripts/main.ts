import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import TabsSection from "./copmponent/TabsSection/TabsSection";
import { tabParams } from "./copmponent/TabComponent/TabComponent";
import renderTestimonials from "./copmponent/Testimonials/renderTestimonials";



fetchData();
renderTestimonials()




new TabsSection(tabParams);