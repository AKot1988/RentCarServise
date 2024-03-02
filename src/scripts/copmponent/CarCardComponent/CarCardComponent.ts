import UniversalButton from "../UniversalButton/UniversalButton";
import { heart_to_favoritesSVG } from "../../../assets/img/SVG/svg";
import { newElementAttributesInterface } from "../UniversalButton/types";
import API from "../../utils/API";

export let carCardData = await new API('../../../../dataJSON/carDada.json').getRequest();


// export let updatedCarCardData = Object.values(carCardData).map((carType) => {
//   carType.map(async (car: any) => {
//     let imageSRCReasponse = await new API('https://api.thecatapi.com/v1/images/search?limit=1').getRequest()
//     console.log(imageSRCReasponse[0].url);
//     car.image = imageSRCReasponse.url;
//   });
// })
// console.log(updatedCarCardData);

export let updatedCarCardData = await Promise.all(Object.values(carCardData).map(async (carType) => {
  return Promise.all(carType.map(async (car: any) => {
    let imageSRCReasponse = await new API('https://api.thecatapi.com/v1/images/search?limit=1').getRequest();
    console.log(imageSRCReasponse[0].url);
    car.image = imageSRCReasponse[0].url;
    return car;
  }));
}));

console.log(updatedCarCardData);


>>>>>>> Stashed changes
let buttonOptions: newElementAttributesInterface = {
  innerText: 'Rent Now',
  class: "rent_now-button",
  onClick: () => {
    console.log('rent now')
  },
}

export default class CarCardComponent {
  public self: HTMLDivElement;
  public modelFavContainer: HTMLDivElement;
  public carmodel: HTMLParagraphElement;
  public price: HTMLParagraphElement;
  public image: HTMLImageElement;
  public priceButtonContainer: HTMLDivElement;
  public button: UniversalButton;
  public favIcon: HTMLElement;

  constructor (public data: any, public parent?: HTMLElement){
    this.self = document.createElement('div');
    this.modelFavContainer = document.createElement('div');
    this.priceButtonContainer = document.createElement('div');
    this.carmodel = document.createElement('p');
    this.price = document.createElement('p');
    this.image = document.createElement('img');
    this.favIcon = document.createElement('figure');
    this.button = new UniversalButton(buttonOptions);

    if (this.parent) {
      this.render();
    }
  }
  render() {
    this.self.classList.add('car-card');
    this.modelFavContainer.classList.add('car-card__model-fav-container');
    this.priceButtonContainer.classList.add('car-card__price-button-container');
    this.carmodel.classList.add('car-card__model');
    this.price.classList.add('car-card__price');
    this.image.classList.add('car-card__image');
    this.favIcon.classList.add('car-card__fav-icon');
    this.favIcon.innerHTML = heart_to_favoritesSVG;
    this.image.src = this.data.image;
    this.carmodel.innerText = this.data.model;
    this.price.innerHTML = `$${this.data.price}.00/<span class="car-card__price--period">day</span>`;

    this.modelFavContainer.append(this.carmodel, this.favIcon);
    this.priceButtonContainer.append(this.price);
    this.button.render(this.priceButtonContainer);

    this.self.append(this.modelFavContainer, this.image, this.priceButtonContainer);
    this.parent?.append(this.self);
  }
}