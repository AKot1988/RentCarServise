import '../../../scss/component/TabsSection.scss';
import { TabComponent } from "../TabComponent/TabComponent";
import CarCardComponent from "../CarCardComponent/CarCardComponent";
import CreateElement from "../CreateElement/CreateElement";
import { newElementAttributesInterface } from "../UniversalButton/types";
import Loader from "../Loader/Loader";
import { getCarByType } from "../CarCardComponent/helper";
import { GenerateDataToRender } from "../CarCardComponent/helper";



const loader = new Loader(document.querySelector('.popular') as HTMLElement);
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(loader.remove());
    }, 3000)
})

// let carData = await updatedCarCardData

export default class TabsSection {
  public tabComponent: TabComponent;
  public carCardComponent: CarCardComponent;
  public carTypeWrapper: HTMLElement;
  public carTypeWrapperArray: HTMLElement[] = [];
  public activeTab: HTMLElement;
  public activeCarTypeByDefault: string;

  constructor(public tabParams: any, public carCardData: any) {
    this.tabComponent = new TabComponent(this.tabParams, document.querySelector('.popular__tabs__container') as HTMLDivElement);


    this.carCardComponent = new CarCardComponent(this.carCardData, document.createElement('div') as HTMLDivElement);
    this.carTypeWrapper = document.createElement('div');
    this.activeTab = document.querySelector('.tab--active') as HTMLElement;
    console.dir(this.activeTab);
    this.activeCarTypeByDefault = this.activeTab.innerText;
    this.render();
    this.tabHandler();
  }

  render() {
    let dafaultCarDataToRender = GenerateDataToRender(this.activeCarTypeByDefault, '../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1')
    
    for (let carType in this.carCardData) {
      this.carTypeWrapper = new CreateElement('div', {classes: [`carTypeWrapper--${carType}`, 'carTypeWrapper'], dataset: { tabContent: `${carType}`}}).render();
      document.querySelector('.popular__cars__container')?.append(this.carTypeWrapper);

      if (this.carTypeWrapper.dataset.tabContent === this.activeTab.dataset.tabHeader) {
        this.carTypeWrapper.classList.add('content--active');
      }

      this.carCardData[carType].forEach((car: newElementAttributesInterface) => {
        new CarCardComponent(car, document.querySelector(`.carTypeWrapper--${carType}`) as HTMLDivElement);
      });

      this.carTypeWrapperArray.push(this.carTypeWrapper);
    }
  }

  tabHandler() {
    document.querySelector('.popular__tabs__container')?.addEventListener('click', (e) => {
      let target = e.target as HTMLElement;
      if (target.classList.contains('tab') && !target.classList.contains('tab--active')) {
        this.activeTab.classList.remove('tab--active');
        this.activeTab = target;
        this.activeTab.classList.add('tab--active');
        this.carTypeWrapperArray.forEach((wrapper) => {
          wrapper.classList.remove('content--active');
          if (wrapper.dataset.tabContent === this.activeTab.dataset.tabHeader) {
            wrapper.classList.add('content--active');
          }
        });
      }
    });
  }
}

// export default class TabsSection {
//   public tabComponent: TabComponent;
//   public carCardComponent: CarCardComponent;
//   public carTypeWrapper: HTMLElement;
//   public carTypeWrapperArray: HTMLElement[] = [];
//   public activeTab: HTMLElement;

//   constructor(public tabParams: any, public carCardData: any) {
//     this.tabComponent = new TabComponent(this.tabParams, document.querySelector('.popular__tabs__container') as HTMLDivElement);


//     this.carCardComponent = new CarCardComponent(this.carCardData, document.createElement('div') as HTMLDivElement);
//     this.carTypeWrapper = document.createElement('div');
//     this.activeTab = document.querySelector('.tab--active') as HTMLElement;
//     this.render();
//     this.tabHandler();
//   }

//   render() {
//     for (let carType in this.carCardData) {
//       this.carTypeWrapper = new CreateElement('div', {classes: [`carTypeWrapper--${carType}`, 'carTypeWrapper'], dataset: { tabContent: `${carType}`}}).render();
//       document.querySelector('.popular__cars__container')?.append(this.carTypeWrapper);

//       if (this.carTypeWrapper.dataset.tabContent === this.activeTab.dataset.tabHeader) {
//         this.carTypeWrapper.classList.add('content--active');
//       }

//       this.carCardData[carType].forEach((car: newElementAttributesInterface) => {
//         new CarCardComponent(car, document.querySelector(`.carTypeWrapper--${carType}`) as HTMLDivElement);
//       });

//       this.carTypeWrapperArray.push(this.carTypeWrapper);
//     }
//   }

//   tabHandler() {
//     document.querySelector('.popular__tabs__container')?.addEventListener('click', (e) => {
//       let target = e.target as HTMLElement;
//       if (target.classList.contains('tab') && !target.classList.contains('tab--active')) {
//         this.activeTab.classList.remove('tab--active');
//         this.activeTab = target;
//         this.activeTab.classList.add('tab--active');
//         this.carTypeWrapperArray.forEach((wrapper) => {
//           wrapper.classList.remove('content--active');
//           if (wrapper.dataset.tabContent === this.activeTab.dataset.tabHeader) {
//             wrapper.classList.add('content--active');
//           }
//         });
//       }
//     });
//   }
// }
