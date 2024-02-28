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

  // Конструктор класу TabsSection
  constructor(public tabParams: any, public carCardData: any) {
    // Створення екземпляру TabComponent та присвоєння його до властивості tabComponent
    this.tabComponent = new TabComponent(tabParams, document.querySelector('.popular__tabs__container'));

    // Отримання активної вкладки і присвоєння її до властивості activeTab
    this.activeTab = document.querySelector('.tab--active');

    // Виклик методу render, який рендерить вміст відповідно до активної вкладки
    this.render();

    // Виклик методу tabHandler, який встановлює обробник подій для переключення вкладок
    this.tabHandler();
  }

  // Метод, який рендерить вміст відповідно до активної вкладки
  render() {
    // Проходження через дані автомобілів та рендерінг кожного типу автомобілів
    for (let carType in this.carCardData) {
      // Створення обгортки типу автомобілів
      this.carTypeWrapper = new CreateElement('div', {
        classes: `carTypeWrapper--${carType}`,
        dataset: { tabContent: `${carType}` }
      }).render();

      // Позначення активної вкладки
      if (this.carTypeWrapper.dataset.tabContent === this.activeTab.dataset.tabHeader) {
        this.carTypeWrapper.classList.add('active');
      }

      // Рендерінг кожного автомобіля відповідно до типу
      this.carCardData[carType].forEach((car: newElementAttributesInterface) => {
        new CarCardComponent(car, document.querySelector(`.carTypeWrapper--${carType}`));
      });

      // Додавання обгортки типу автомобілів до масиву
      this.carTypeWrapperArray.push(this.carTypeWrapper);
    }
  }

  // Метод, який встановлює обробник подій для переключення вкладок
  tabHandler() {
    document.querySelector('.popular__tabs__container').addEventListener('click', (e) => {
      if (e.target.classList.contains('tab') && !e.target.classList.contains('tab--active')) {
        // Видалення класу 'tab--active' з попередньої активної вкладки
        this.activeTab.classList.remove('tab--active');

        // Присвоєння поточної вкладки до activeTab
        this.activeTab = e.target;

        // Додавання класу 'tab--active' до нової активної вкладки
        this.activeTab.classList.add('tab--active');

        // Відобразити відповідний вміст для нової вкладки
        this.carTypeWrapperArray.forEach((wrapper) => {
          wrapper.classList.remove('active');
          if (wrapper.dataset.tabContent === this.activeTab.dataset.tabHeader) {
            wrapper.classList.add('active');
          }
        });
      }
    });
  }
}
