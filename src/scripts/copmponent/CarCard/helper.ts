import { fetchResponse, carSetInterface, CarCardPropsExpanded } from "./types"
import { newElementAttributesInterface } from '../UniversalButton/types'
import API from "../../utils/API";



export let getCarByType = async function (requestedCarType: string, URLtoCarData: string) {
  let response = await new API<carSetInterface>(URLtoCarData).getRequest();
  let responseCarType = undefined
  switch(requestedCarType){
    case "all":
      let allCarsData: CarCardPropsExpanded [] = []
      for (let carType in response) {
        response[carType].forEach((car) => allCarsData.push(car))
      }
      return allCarsData.slice(0, 15);
    default:
      for (let carType in response) {
        if (carType === requestedCarType) {
          responseCarType = response[carType];
          break
        }
      }
      return responseCarType;
  }
}

export let allCarsData = async function (URLtoCarData: string, linkToPhotoJSON: string): Promise<carSetInterface> {
  try {
    let response = await new API<carSetInterface>(URLtoCarData).getRequest();
    let allCarsData: carSetInterface = {};
    
    for (let carType in response) {
      let updatedCarType = await Promise.all(response[carType].map(async (car) => {
        const photoURLs = await new API<fetchResponse[]>(linkToPhotoJSON).getRequest();
        car.image = photoURLs[0].url;
        return car;
      }));
      allCarsData[carType] = updatedCarType;
    }
    
    return allCarsData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Передаємо помилку наверх для обробки
  }
}

export let GenerateDataToRender = async function (carType: string, linkToCarsJSON: string | carSetInterface, linkToPhotoJSON: string) {
  let carData;
  try {
    if (carType === "all") {
      carData = await getCarByType("all", linkToCarsJSON as string);
    } else {
      carData = await getCarByType(carType, linkToCarsJSON as string);
    }

    if (!carData) {
      throw new Error('No such car type');
    }

    const photoURLs = await getPhotoURLs(carData.length, linkToPhotoJSON);
    const filledData: CarCardPropsExpanded[] = [];

    carData.forEach((car: CarCardPropsExpanded) => {
      car.image = photoURLs.pop();
      filledData.push(car);
    });
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.remove();
    }

    return filledData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Передаємо помилку наверх для обробки
  }
}



export let filterCarData = async function (linkToCarsJSON: string, filterOptions: any) {
  try {
    let response = localStorage.get('carData');
    let filteredCarData: carSetInterface = {}
    let requestedFullTime = new Date(filterOptions['date'] + 'T' + filterOptions['time']).getTime();
    for (let carType in response) {
      filteredCarData[carType] = []
      response[carType].forEach((car: CarCardPropsExpanded): void => {
        let carFullTime = new Date(car.date + 'T' + car.time).getTime();
        if (car.location === filterOptions['location'] && (carFullTime > requestedFullTime) ) {
          filteredCarData[carType].push(car)
        }
      });
      if (filteredCarData[carType].length === 0) {
        delete filteredCarData[carType];
      }
    }
    return filteredCarData;
  }
  catch (error) {
    console.error('Помилка під час отримання даних:', error);
  }
}


let getPhotoURLs = async function (requestQantity: number, URLtoFetchPhoto: string) {
  let URLsArray: string[] = [];
  for (let i = 0; i < requestQantity; i++) {
    let response = await new API<fetchResponse[]>(URLtoFetchPhoto).getRequest();
    URLsArray.push(response[0].url);
  }
  return URLsArray;
}
// export const generateTabsOptions = function (carData: carSetInterface) {
//   let tabOptions: newElementAttributesInterface[] = [];
//   Object.keys(carData).map((carType) => {
//     if (tabOptions.length === 0) {
//       let tabOption = {
//         "innerText": carType,
//         "className": "tab tab--active",
//         "dataset": { "tabHeader": `${carType}` }
//       };
//       tabOptions.push(tabOption);
//     } else {
//       let tabOption = {
//         "innerText": carType,
//         "className": "tab",
//         "dataset": { "tabHeader": `${carType}` }
//       };
//       tabOptions.push(tabOption);
//     }
//   });
//   return tabOptions;
// };

