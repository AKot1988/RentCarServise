import "../scss/main.scss";
import fetchData from "./copmponent/Select/helpers";
import UniversalButton from "./copmponent/UniversalButton/UniversalButton";


fetchData();


const buttonOptions = {
    innerText: 'Search',
    class: 'button__serch'
};

const parentElement = document.querySelector('.select__wrapper--drop') as HTMLElement;

const button = new UniversalButton(buttonOptions);
button.render(parentElement);


// import CarCardComponent from "../scripts/copmponent/CarCardComponent/CarCardComponent";

// import { carCardData, tabsData } from "../../dataJSON/carDada.ts";



// carCardData.forEach((car) => {new CarCardComponent(car, document.querySelector('.popular__cars'))})