import '../../../scss/component/TabsSection.scss';
import CarCard from "../CarCard/CarCard";
import { CarCardPropsExpanded, carSetInterface } from "../CarCard/types";
import Loader from "../Loader/Loader";

new Loader(document.querySelector('.popular__cars__container') as HTMLElement);

export default class TabsSection {
  public carTypeWrapperArray: HTMLElement[] = [];
  public activeTab: HTMLElement;
  public activeCarTypeByDefault: string;
  public defaultCarDataToRender: CarCardPropsExpanded[] = [];

  constructor(public carData: carSetInterface)  {
    this.defaultCarDataToRender = []
    this.activeTab = document.querySelector('.tab--active') as HTMLElement;
    this.activeCarTypeByDefault = this.activeTab.innerText;
    this.render(this.carData);
    this.tabHandler();

  }
  render(carData: carSetInterface) {
    let carCardParent = document.querySelector('.popular__cars__container') as HTMLElement;
    while (carCardParent.firstChild) {
        carCardParent.removeChild(carCardParent.firstChild);
    }
    this.activeTab = document.querySelector('.tab--active') as HTMLElement;
    let selectedCarType: string = this.activeTab.innerText;
    if (selectedCarType === "all") {
      let allCarsData: CarCardPropsExpanded[] = []
      for (let carType in carData) {
        carData[carType].forEach((car) => allCarsData.push(car))
      }
      allCarsData.slice(0, 16).forEach((car: CarCardPropsExpanded) => {
        new CarCard(car, carCardParent as HTMLElement)
      });
    } else if (carData[selectedCarType]) {

      carData[selectedCarType].forEach((car: CarCardPropsExpanded) => {
        new CarCard(car, carCardParent as HTMLElement)
      });
    } else {
      carCardParent.innerHTML = `<h2 class="error">Немає автомобілів згідно запиту</h2>`;
    }
  }

  tabHandler() {
    document.querySelector('.popular__tabs__container')?.addEventListener('click', (e) => {
      let target = e.target as HTMLElement;
      if (target.classList.contains('tab') && !target.classList.contains('tab--active')) {
        let carCardParent = document.querySelector('.popular__cars__container') as HTMLElement;
        while (carCardParent.firstChild) {
          carCardParent.removeChild(carCardParent.firstChild);
        }
        this.activeTab.classList.remove('tab--active');
        this.activeTab = target;
        this.activeTab.classList.add('tab--active');
        let activeCarTypeRequested = this.activeTab.innerText;
        if (activeCarTypeRequested === "all") {
          let allCarsData: CarCardPropsExpanded[] = []
          for (let carType in this.carData) {
            this.carData[carType].forEach((car) => allCarsData.push(car))
          }
          allCarsData.slice(0, 15).forEach((car: CarCardPropsExpanded) => {
            new CarCard(car, carCardParent as HTMLElement)
          });
        } else if (this.carData[activeCarTypeRequested]) {
          this.carData[activeCarTypeRequested].forEach((car: CarCardPropsExpanded) => {
            new CarCard(car, carCardParent as HTMLElement)
          });
        } else {
          carCardParent.innerHTML = `<h2 class="error">Немає автомобілів згідно запиту</h2>`;
        }
      }
    });
  }
}