import UniversalButton from "../UniversalButton/UniversalButton";
import CreateElement from "../CreateElement/CreateElement";
import { heart_to_favoritesSVG } from "../../../assets/img/SVG/svg";
import { newElementAttributesInterface } from "../UniversalButton/types";
import { CarCardPropsExpanded } from "./types";



export default class CarCard {
  public self: HTMLElement
  public modelFavContainer: HTMLElement
  public carmodel: HTMLElement
  public price: HTMLElement
  public image: HTMLElement
  public priceButtonContainer: HTMLElement
  public button: UniversalButton
  public favIcon: HTMLElement

  constructor (public data: CarCardPropsExpanded, public parent?: HTMLElement){
    this.parent = parent;
    this.self = document.createElement('div');
    this.modelFavContainer = document.createElement('div');
    this.carmodel = document.createElement('p');
    this.price = document.createElement('p');
    this.image = document.createElement('img');
    this.priceButtonContainer = document.createElement('div');
    this.button = new UniversalButton ({innerText: 'Rent Now', class: "rent_now-button", onClick: () => console.log(this.data.model, ' rented for ', this.data.price)});
    this.favIcon = document.createElement('figure');
    this.render();
  }
  
  render() {
        
    this.self = new CreateElement('div', {classes: 'car-card'}).render();
    this.modelFavContainer = new CreateElement('div', {classes: 'car-card__model-fav-container'}).render();
    this.carmodel = new CreateElement('p', {classes: 'car-card__model', innerText: this.data.model}).render();
    this.price = new CreateElement('p', {classes: 'car-card__price', innerHTML: `${this.data.price}/<span class="car-card__price--period">day</span>`}).render();
    this.image = new CreateElement('img', {classes: 'car-card__image', src: this.data.image}).render();
    this.priceButtonContainer = new CreateElement('div', {classes: 'car-card__price-button-container'}).render();
    this.favIcon = new CreateElement('figure', { classes: 'car-card__fav-icon', innerHTML: heart_to_favoritesSVG }).render();
    this.modelFavContainer.append(this.carmodel, this.favIcon);
    this.priceButtonContainer.append(this.price);

    this.button.render(this.priceButtonContainer);

    this.self.append(this.modelFavContainer, this.image, this.priceButtonContainer);
    this.parent?.append(this.self);
  }
}