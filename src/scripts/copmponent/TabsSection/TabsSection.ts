import '../../../scss/component/TabsSection.scss';
import { TabComponent } from "../TabComponent/TabComponent";
import { CarCardComponent } from "../CarCardComponent/CarCardComponent";
import CreateElement from "../CreateElement/CreateElement";
import { newElementAttributesInterface } from "../UniversalButton/types";

export default class TabsSection {
  public tabComponent: TabComponent;
  public carCardComponent: CarCardComponent;
  public carTypeWrapper: HTMLElement;
  public carTypeWrapperArray: HTMLElement[] = [];
  public activeTab: HTMLElement;

  constructor(public tabParams: any, public carCardData: any) {
    this.tabComponent = new TabComponent(tabParams, document.querySelector('.popular__tabs__container') as HTMLDivElement);
    this.carCardComponent = new CarCardComponent(carCardData, document.createElement('div') as HTMLDivElement);
    this.carTypeWrapper = document.createElement('div');
    
    this.activeTab = document.querySelector('.tab--active') as HTMLElement;
    console.dir(this.activeTab);

    this.render();

    this.tabHandler();
  }

  render() {
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
      console.dir(e.target);
      if (e.target.classList.contains('tab') && !e.target.classList.contains('tab--active')) {
        this.activeTab.classList.remove('tab--active');
        this.activeTab = e.target;
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


// const arr = [
// 	{ a: 1, b: 2 },
// 	{ a: 3, b: 4 },
// 	{ a: 5, b: 6 },
// ]

// arr.forEach((item, index) => {
// 	const { a, b } = item
// })
// arr.forEach(({ a, b }, index) => {
// 	// const { a, b } = item
// })
