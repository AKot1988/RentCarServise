// import '../../scss/component/TabContent.scss';
import CarCard from "../CarCard/CarCard";
import { CarCardPropsExpanded, carSetInterface } from "../CarCard/types";
import Loader from "../Loader/Loader";

new Loader(document.querySelector('.popular__cars__container') as HTMLElement);

export default class TabContent {
  public carTypeWrapperArray: HTMLElement[] = [];
  public carData: carSetInterface = {}

  constructor(public carType: string)  {

  }
  render() {
    let carCardParent = document.querySelector('.popular__cars__container') as HTMLElement;
    while (carCardParent.firstChild) {
        carCardParent.removeChild(carCardParent.firstChild);
    }
    this.carData = localStorage.getItem('carData') ? JSON.parse(localStorage.getItem('carData') as string) : this.carData;
    if (this.carType === "all") {
        let allCarsData: CarCardPropsExpanded[] = []
        for (let carType in this.carData) {
            this.carData[carType].forEach((car) => allCarsData.push(car))
        }
        allCarsData.slice(0, 16).forEach((car: CarCardPropsExpanded) => {
            new CarCard(car, carCardParent as HTMLElement)
        });
    } else if (this.carData[this.carType] && Array.isArray(this.carData[this.carType]) && this.carData[this.carType].length > 0) {
        this.carData[this.carType].forEach((car: CarCardPropsExpanded) => {
            new CarCard(car, carCardParent as HTMLElement)
        });
    } else {
        carCardParent.innerHTML = `<h2 class="error">Немає автомобілів згідно запиту</h2>`;
    }
  }
}





// class TabContent {
// constructor(dataParams) {
//   this.dataParams = dataParams
//   this.list = []
//   this.activeTab = document.querySelector('.tab--active') as HTMLElement;
// }

// render() {
//   const data = localStorage.getItem('carData')
  
//   while (condition) {
//     removeChild
//   }
//   if (this.dataParams === "all") {
        
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
// } 

// filterContent(collectedData) {
//     const newData = filterCarData(collectedData)
//     this.activeTab = document.querySelector('.tab--active') as HTMLElement;
// }
// }