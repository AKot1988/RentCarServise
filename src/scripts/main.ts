import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import UniversalButton from "./copmponent/UniversalButton/UniversalButton";
// import { carCardData, tabsData } from "../../dataJSON/carDada.ts";
// import CarCardComponent from "../scripts/copmponent/CarCardComponent/CarCardComponent";

// carCardData.forEach((car) => {new CarCardComponent(car, document.querySelector('.popular__cars'))})



fetchData();


const buttonOptions = {
    innerText: 'Search',
    class: 'button__serch'
};

const parentElement = document.querySelector('.select__wrapper--drop') as HTMLElement;

const button = new UniversalButton(buttonOptions);
button.render(parentElement);






