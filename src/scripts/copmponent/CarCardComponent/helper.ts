import { fetchResponse, carSetInterface, CarCardProps, CarCardPropsExpanded } from "./types"
import { newElementAttributesInterface } from '../UniversalButton/types'
import API from "../../utils/API";

export let getCarByType = async function (requestedCarType: string, URLtoCarData: string) {
  let response = await new API<carSetInterface>(URLtoCarData).getRequest();
  let responseCarType = undefined
  for (let carType in response) {
    if (carType === requestedCarType) {
      responseCarType = response[carType];
      break
    }
  }
  return responseCarType;
}

let getPhotoURLs = async function (requestQantity: number, URLtoFetchPhoto: string) {
  let URLsArray: string[] = [];
  for (let i = 0; i < requestQantity; i++) {
    let response = await new API<fetchResponse[]>(URLtoFetchPhoto).getRequest();
    URLsArray.push(response[0].url);
  }
  return URLsArray;
}

export let GenerateDataToRender = async function (carType: string, linkToCarsJSON: string | carSetInterface, linkToPhotoJSON: string, type: string = "general") {
  switch(type) {
    case "general":
      let carData = await getCarByType(carType, linkToCarsJSON as string);
      if (!carData) {
        throw new Error('No such car type');
      }
      let photoURLs = await getPhotoURLs (carData.length, linkToPhotoJSON);
      let filledData: CarCardProps[] = []
      carData.forEach((car: CarCardProps) => {
      car.image = photoURLs.pop();
      filledData.push(car);
      })
    return filledData
    case "accordingFilterRequest":
      let carDataFromFilteredObject = linkToCarsJSON[carType]
      if (!carDataFromFilteredObject) {
        throw new Error('No such car type');
      }
      let photoURLsFromFilteredObject = await getPhotoURLs (carDataFromFilteredObject.length, linkToPhotoJSON);
      let filledDataFromFilteredObject: CarCardPropsExpanded[] = []
      carDataFromFilteredObject.forEach((car: CarCardPropsExpanded) => {
      car.image = photoURLsFromFilteredObject.pop();
      filledDataFromFilteredObject.push(car);
      })
    return filledDataFromFilteredObject
  }
}

// export let carCardDataToRender = await GenerateDataToRender('Sedan', '../../../../dataJSON/carData.json','https://api.thecatapi.com/v1/images/search?limit=1')




export let filterCarData = async function (linkToCarsJSON: string, filterOptions: any) {
  try {
    let response = await new API <carSetInterface>(linkToCarsJSON).getRequest();
    console.log(response)
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
    console.log(filteredCarData)
    return filteredCarData;
  }
  catch (error) {
    console.error('Помилка під час отримання даних:', error);
  }
}

export const generateTabsOptions = function (carData: carSetInterface) {
  let tabOptions: newElementAttributesInterface[] = [];
  Object.keys(carData).map((carType) => {
    if (tabOptions.length === 0) {
      let tabOption = {
        "innerText": carType,
        "className": "tab tab--active",
        "dataset": { "tabHeader": `${carType}` }
      };
      tabOptions.push(tabOption);
    } else {
      let tabOption = {
        "innerText": carType,
        "className": "tab",
        "dataset": { "tabHeader": `${carType}` }
      };
      tabOptions.push(tabOption);
    }
  });
  return tabOptions;
};

