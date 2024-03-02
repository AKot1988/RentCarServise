import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import UniversalButton from "./copmponent/UniversalButton/UniversalButton";
import TabsSection from "./copmponent/TabsSection/TabsSection";
import { carCardData, updatedCarCardData } from "./copmponent/CarCardComponent/CarCardComponent";
import { tabParams } from "./copmponent/TabComponent/TabComponent";

let newCarData = await (updatedCarCardData as any);

const tabsSection = new TabsSection(tabParams, updatedCarCardData);


// carCardData.forEach((car) => {new CarCardComponent(car, document.querySelector('.popular__cars'))})



fetchData();


const buttonOptions = {
    innerText: 'Search',
    class: 'button__serch'
};

const parentElement = document.querySelector('.select__wrapper--drop') as HTMLElement;

const button = new UniversalButton(buttonOptions);
button.render(parentElement);






