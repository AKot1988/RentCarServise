import '../../../scss/component/TabsSection.scss';
import { TabComponent } from "../TabComponent/TabComponent";
import CarCardComponent from "../CarCardComponent/CarCardComponent";
import { CarCardProps, carSetInterface } from "../CarCardComponent/types";
import Loader from "../Loader/Loader";
import { GenerateDataToRender } from "../CarCardComponent/helper";



const loader = new Loader(document.querySelector('.popular__cars__container') as HTMLElement);

export default class TabsSection {
  public tabComponent: TabComponent;
  // public carCardComponent: CarCardComponent;
  public carTypeWrapperArray: HTMLElement[] = [];
  public activeTab: HTMLElement;
  public activeCarTypeByDefault: string;
  public defaultCarDataToRender: CarCardProps[] = [];

  constructor(public tabParams: any, public type: string = "general") {
    this.tabComponent = new TabComponent(this.tabParams, document.querySelector('.popular__tabs__container') as HTMLDivElement);
    this.defaultCarDataToRender = []
    // this.carCardComponent = new CarCardComponent(this.defaultCarDataToRender, document.createElement('div') as HTMLDivElement);
    this.activeTab = document.querySelector('.tab--active') as HTMLElement;
    this.activeCarTypeByDefault = this.activeTab.innerText;
    switch (this.type) {
      case "general":
        this.render();
        this.tabHandler();
        break;
      case "accordingFilterRequest":
        this.renderAccordingFilterRequest();
        this.tabHandler()
        break;
    }

  }
  async render() {
      try {
        this.defaultCarDataToRender = await GenerateDataToRender(this.activeCarTypeByDefault, '../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1')
        loader.remove();
        this.defaultCarDataToRender.forEach((car: CarCardProps) => {
        new CarCardComponent(car, document.querySelector(`.popular__cars__container`) as HTMLDivElement);
      });
    } catch (error) {
      console.error('Помилка під час отримання даних:', error);
      loader.ErrorGif()
    }
  }



  async tabHandler() {
      document.querySelector('.popular__tabs__container')?.addEventListener('click', async (e) => {
          let target = e.target as HTMLElement;
          if (target.classList.contains('tab') && !target.classList.contains('tab--active')) {
              let carCardPArent = document.querySelector('.popular__cars__container') as HTMLElement;
              while (carCardPArent.firstChild) {
                  carCardPArent.removeChild(carCardPArent.firstChild);
              }
              this.activeTab.classList.remove('tab--active');
              this.activeTab = target;
              this.activeTab.classList.add('tab--active');
              this.activeCarTypeByDefault = this.activeTab.innerText;

              const loader = new Loader(document.querySelector('.popular__cars__container') as HTMLElement);

              try {
                  this.defaultCarDataToRender = await GenerateDataToRender(this.activeTab.innerText, '../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1');
                  loader.remove();
                  this.defaultCarDataToRender.forEach((car: CarCardProps) => {
                      new CarCardComponent(car, document.querySelector('.popular__cars__container') as HTMLDivElement);
                  });
              } catch (error) {
                  console.error('Помилка під час отримання даних:', error);
                  loader.ErrorGif()
              }
          }
      });
  }
}