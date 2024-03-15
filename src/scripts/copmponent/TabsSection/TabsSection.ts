import '../../../scss/component/TabsSection.scss';
import { Tab } from "../Tab/Tab.ts";
import CarCardComponent from "../CarCard/CarCard";
import { CarCardPropsExpanded, carSetInterface } from "../CarCard/types";
import Loader from "../Loader/Loader";
import { GenerateDataToRender } from "../CarCard/helper";



const loader = new Loader(document.querySelector('.popular__cars__container') as HTMLElement);

export default class TabsSection {
  public tab: Tab;
  public carTypeWrapperArray: HTMLElement[] = [];
  public activeTab: HTMLElement;
  public activeCarTypeByDefault: string;
  public defaultCarDataToRender: CarCardPropsExpanded[] = [];

  constructor(public tabParams: any, public carDataLink: string | carSetInterface, public linkToPhotoFetch: string, public type: string = "general")  {
    this.carDataLink = carDataLink;
    this.tab = new Tab(this.tabParams, document.querySelector('.popular__tabs__container') as HTMLDivElement);
    this.defaultCarDataToRender = []
    this.activeTab = document.querySelector('.tab--active') as HTMLElement;
    this.activeCarTypeByDefault = this.activeTab.innerText;
    switch (this.type) {
      case "general":
        this.render(this.carDataLink, this.linkToPhotoFetch);
        this.tabHandler();
        break;
      case "accordingFilterRequest":
        this.renderAccordingFilterRequest();
        this.tabHandler()
        break;
    }

  }
  async render(carDataLink: string, linkToPhotoFetch: string ) {
      try {
        this.defaultCarDataToRender = await GenerateDataToRender(this.activeCarTypeByDefault, carDataLink, linkToPhotoFetch)
        loader.remove();
        this.defaultCarDataToRender.forEach((car: CarCardPropsExpanded) => {
        new CarCardComponent(car, document.querySelector(`.popular__cars__container`) as HTMLDivElement);
      });
    } catch (error) {
      console.error('Помилка під час отримання даних:', error);
      loader.ErrorGif()
    }
  }

  async renderAccordingFilterRequest() {
    try {
      this.defaultCarDataToRender = await GenerateDataToRender(this.activeCarTypeByDefault, this.carDataLink, this.linkToPhotoFetch, 'accordingFilterRequest');
      loader?.remove();
      // console.log(this.defaultCarDataToRender)
      this.defaultCarDataToRender.forEach((car: CarCardPropsExpanded) => {
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
                  this.defaultCarDataToRender.forEach((car: CarCardPropsExpanded) => {
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