import CreateElement from '../CreateElement/CreateElement'
import { newElementAttributesInterface } from '../UniversalButton/types'
import API from "../../utils/API";
import TabContent from "../TabContent/TabContent.ts";



export const tabParams = await new API('../../../../dataJSON/tabsData.json').getRequest();
// Tab class
export default class TabHeader {
  public parent: HTMLElement
  public tabHaedItems: HTMLElement[] = []

  constructor(public params: newElementAttributesInterface[], public tabHeadWrapper: HTMLElement) {
    this.params = params
    this.parent = tabHeadWrapper
  }

  render (){
    this.params.forEach(tabHeadEl => {
      const tabHeadItem = new CreateElement('div', tabHeadEl).render()
      this.tabHaedItems.push(tabHeadItem)
    });

    this.tabHeadWrapper.append(...this.tabHaedItems)

    this.tabHeadWrapper.addEventListener('click', this.handleTabs)
  }

  handleTabs(event: Event) {
    let target = event.target as HTMLElement
    if(target?.classList.contains('tab')){
      if (target.classList.contains('tab--active')) {
        return
      } else if (!target.classList.contains('tab--active')) {
        let prevActiveTab = document.querySelector('.tab--active') as HTMLElement
        prevActiveTab.classList.remove('tab--active')
        target.classList.add('tab--active')
      }
      const content = new TabContent(target.dataset.tabHeader as string)
      content.render()
    }
  }
}



// tabHandler() {
//   document.querySelector('.popular__tabs__container')?.addEventListener('click', (e) => {
//     let target = e.target as HTMLElement;
//     if (target.classList.contains('tab') && !target.classList.contains('tab--active')) {
//       let carCardParent = document.querySelector('.popular__cars__container') as HTMLElement;
//       while (carCardParent.firstChild) {
//         carCardParent.removeChild(carCardParent.firstChild);
//       }
//       this.activeTab.classList.remove('tab--active');
//       this.activeTab = target;
//       this.activeTab.classList.add('tab--active');
//       let activeCarTypeRequested = this.activeTab.innerText;
//       if (activeCarTypeRequested === "all") {
//         let allCarsData: CarCardPropsExpanded[] = []
//         for (let carType in this.carData) {
//           this.carData[carType].forEach((car) => allCarsData.push(car))
//         }
//         allCarsData.slice(0, 15).forEach((car: CarCardPropsExpanded) => {
//           new CarCard(car, carCardParent as HTMLElement)
//         });
//       } else if (this.carData[activeCarTypeRequested]) {
//         this.carData[activeCarTypeRequested].forEach((car: CarCardPropsExpanded) => {
//           new CarCard(car, carCardParent as HTMLElement)
//         });
//       } else {
//         carCardParent.innerHTML = `<h2 class="error">Немає автомобілів згідно запиту</h2>`;
//       }
//     }
//   });
// }