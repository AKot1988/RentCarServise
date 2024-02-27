import "../scss/main.scss";
import CarCardComponent from "../scripts/copmponent/CarCardComponent/CarCardComponent";

import { carCardData, tabsData } from "../../dataJSON/carDada.ts";



carCardData.forEach((car) => {new CarCardComponent(car, document.querySelector('.popular__cars'))})