import "../scss/main.scss";
import CarCardComponent from "../scripts/copmponent/CarCardComponent/CarCardComponent";

import { carCardData } from "../../dataJSON/carDada.ts";

carCardData.forEach((car) => {new CarCardComponent(car, document.querySelector('.popular__cars'))})
