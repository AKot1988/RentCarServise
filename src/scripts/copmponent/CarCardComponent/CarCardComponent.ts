import UniversalButton from "../UniversalButton/UniversalButton";
import CreateElement from "../CreateElement/CreateElement";
import { heart_to_favoritesSVG } from "../../../assets/img/SVG/svg";
import { newElementAttributesInterface } from "../UniversalButton/types";



export const carCardData = {
  Sedan: [
    {
      "model": "BMW",
      "price": "100",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Audi",
      "price": "200",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Toyota",
      "price": "500",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Nissan",
      "price": "600",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Mazda",
      "price": "700",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Mercedes",
      "price": "300",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Lexus",
      "price": "400",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Honda",
      "price": "800",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    }
  ],
  SUV:[
  {
    "model": "BMW",
    "price": "100",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Audi",
    "price": "200",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Mercedes",
    "price": "300",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Lexus",
    "price": "400",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Toyota",
    "price": "500",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Nissan",
    "price": "600",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Mazda",
    "price": "700",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Honda",
    "price": "800",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  }
],
  Hatchback:[
  {
    "model": "BMW",
    "price": "100",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Audi",
    "price": "200",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Mercedes",
    "price": "300",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Lexus",
    "price": "400",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Toyota",
    "price": "500",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Nissan",
    "price": "600",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Mazda",
    "price": "700",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  },
  {
    "model": "Honda",
    "price": "800",
    "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
  }
],
  Wagon:[
    {
      "model": "BMW",
      "price": "100",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Audi",
      "price": "200",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Mercedes",
      "price": "300",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Lexus",
      "price": "400",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Toyota",
      "price": "500",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Nissan",
      "price": "600",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Mazda",
      "price": "700",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    },
    {
      "model": "Honda",
      "price": "800",
      "image": "https://cdn2.thecatapi.com/images/2o6.jpg"
    }
  ]
}



let buttonOptions: newElementAttributesInterface = {
  innerText: 'Rent Now',
  class: "rent_now-button",
  onClick: () => console.log('rent now'),
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

  constructor (public data: newElementAttributesInterface, public parent?: HTMLElement){
    this.self = new CreateElement('div', {classes: 'car-card'}).render();
    this.modelFavContainer = new CreateElement('div', {classes: 'car-card__model-fav-container'}).render();
    this.carmodel = new CreateElement('p', {classes: 'car-card__model', innerText: this.data.model}).render();
    this.price = new CreateElement('p', {classes: 'car-card__price', innerText: this.data.price}).render();
    this.image = new CreateElement('img', {classes: 'car-card__image', src: this.data.image}).render();
    this.priceButtonContainer = new CreateElement('div', {classes: 'car-card__price-button-container'}).render();
    this.button = new UniversalButton(buttonOptions);
    this.favIcon = new CreateElement('figure', {classes: 'car-card__fav-icon',  innerHTML: heart_to_favoritesSVG}).render();
    this.parent = parent;

    this.render();
  }
  
  render() {


    this.modelFavContainer.append(this.carmodel, this.favIcon);
    this.priceButtonContainer.append(this.price);
    this.button.render(this.priceButtonContainer);

    this.self.append(this.modelFavContainer, this.image, this.priceButtonContainer);
    if (this.parent) {
      this.parent.append(this.self);
    } else {
      new Error('Parent is not defined');
      document.body.append(this.self); // Додавання до body, якщо parent не заданий
    }
  }
}


// export default class CarCardComponent {
//   public self: HTMLDivElement;
//   public modelFavContainer: HTMLDivElement;
//   public carmodel: HTMLParagraphElement;
//   public price: HTMLParagraphElement;
//   public image: HTMLImageElement;
//   public priceButtonContainer: HTMLDivElement;
//   public button: UniversalButton;
//   public favIcon: HTMLElement;

//   constructor (public data: any, public parent?: HTMLElement){
//     this.self = document.createElement('div');
//     this.modelFavContainer = document.createElement('div');
//     this.priceButtonContainer = document.createElement('div');
//     this.carmodel = document.createElement('p');
//     this.price = document.createElement('p');
//     this.image = document.createElement('img');
//     this.favIcon = document.createElement('figure');
//     this.button = new UniversalButton(buttonOptions);

//     if (this.parent) {
//       this.render();
//     }
//   }
//   render() {
//     this.self.classList.add('car-card');
//     this.modelFavContainer.classList.add('car-card__model-fav-container');
//     this.priceButtonContainer.classList.add('car-card__price-button-container');
//     this.carmodel.classList.add('car-card__model');
//     this.price.classList.add('car-card__price');
//     this.image.classList.add('car-card__image');
//     this.favIcon.classList.add('car-card__fav-icon');
//     this.favIcon.innerHTML = heart_to_favoritesSVG;
//     this.image.src = this.data.image;
//     this.carmodel.innerText = this.data.model;
//     this.price.innerHTML = `$${this.data.price}.00/<span class="car-card__price--period">day</span>`;

//     this.modelFavContainer.append(this.carmodel, this.favIcon);
//     this.priceButtonContainer.append(this.price);
//     this.button.render(this.priceButtonContainer);

//     this.self.append(this.modelFavContainer, this.image, this.priceButtonContainer);
//     this.parent?.append(this.self);
//   }
// }