import UniversalButton from "../UniversalButton/UniversalButton";
import CreateElement from "../CreateElement/CreateElement";
import { heart_to_favoritesSVG } from "../../../assets/img/SVG/svg";
import { newElementAttributesInterface } from "../UniversalButton/types";
import { CarCardProps, carSetInterface, fetchResponse } from "./types";

import API from "../../utils/API";

export let carCardData = await new API<carSetInterface>('../../../../dataJSON/carDada.json').getRequest();
console.log(carCardData);

export let updatedCarCardData = await Promise.all(Object.values(carCardData).map(async (carType) => {
  return Promise.all(carType.map(async (car: any) => {
    let imageSRCReasponse = await new API<fetchResponse[]>('https://api.thecatapi.com/v1/images/search?limit=1').getRequest();
    car.image = imageSRCReasponse[0].url;
    return car;
  }));
}));

console.log(updatedCarCardData);

let buttonOptions: newElementAttributesInterface = {
  innerText: 'Rent Now',
  class: "rent_now-button",
  onClick: () => {
    console.log('rent now')
  },
}

export class CarCardComponent {
  public self: HTMLElement
  public modelFavContainer: HTMLElement
  public carmodel: HTMLElement
  public price: HTMLElement
  public image: HTMLElement
  public priceButtonContainer: HTMLElement
  public button: UniversalButton
  public favIcon: HTMLElement

  constructor(public data: newElementAttributesInterface, public parent?: HTMLElement) {
    this.self = new CreateElement('div', { classes: 'car-card' }).render();
    this.modelFavContainer = new CreateElement('div', { classes: 'car-card__model-fav-container' }).render();
    this.carmodel = new CreateElement('p', { classes: 'car-card__model', innerText: this.data.model }).render();
    this.price = new CreateElement('p', { classes: 'car-card__price', innerText: this.data.price }).render();
    this.image = new CreateElement('img', { classes: 'car-card__image', src: this.data.image }).render();
    this.priceButtonContainer = new CreateElement('div', { classes: 'car-card__price-button-container' }).render();
    this.button = new UniversalButton(buttonOptions);
    this.favIcon = new CreateElement('figure', { classes: 'car-card__fav-icon', innerHTML: heart_to_favoritesSVG }).render();
    this.parent = parent;

    this.render();
  }

  render() {


    this.modelFavContainer.append(this.carmodel, this.favIcon);
    this.priceButtonContainer.append(this.price);
    this.button.render(this.priceButtonContainer);

    this.self.append(this.modelFavContainer, this.image, this.priceButtonContainer);
    this.parent?.append(this.self);
  }
}