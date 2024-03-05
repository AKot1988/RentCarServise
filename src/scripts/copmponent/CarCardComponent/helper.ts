import { fetchResponse, carSetInterface, CarCardProps } from "./types"
import API from "../../utils/API";


// //дає відповідь від мок дати у dataJSON
// export let carCardData = await new API <carSetInterface>('../../../../dataJSON/carData.json').getRequest();

// //оновлюємо дані з мок дати, додаючи до кожного обєкту посилання на картинку кота
// export let updatedCarCardData = await Promise.all(Object.values(carCardData).map(async (carType) => {
//   return Promise.all(carType.map(async (car: any) => {
//     let imageSRCReasponse = await new API <fetchResponse []>('https://api.thecatapi.com/v1/images/search?limit=1').getRequest();
//     car.image = imageSRCReasponse[0].url;
//     return car;
//   }));
// }));


//request by car category
export let getCarByType = async function (requestedCarType: string, URLtoCarData: string) {
  let response = await new API <carSetInterface>(URLtoCarData).getRequest();
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
    let response = await new API <fetchResponse[]>(URLtoFetchPhoto).getRequest();
    URLsArray.push(response[0].url);
  }
  return URLsArray;
}

// let GenerateDataToRender = async function (cb1: any, cb2: any, URLPhotoFetch: string) {
//   let carData = await cb1;
//   let photoURLs = await cb2 (carData.length, URLPhotoFetch);
//   let filledData: CarCardProps[] = []
//   carData.forEach((car: CarCardProps) => {
//     car.image = photoURLs.pop();
//     filledData.push(car);
//   })
//   return filledData
// }

// let carCardDataToRender = await GenerateDataToRender(getCarByType('Sedan', '../../../../dataJSON/carData.json'), getPhotoURLs, 'https://api.thecatapi.com/v1/images/search?limit=1')

export let GenerateDataToRender = async function (carType: string, linkToCarsJSON: string, linkToPhotoJSON: string) {
  let carData = await getCarByType(carType, linkToCarsJSON);
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
}

// export let carCardDataToRender = await GenerateDataToRender('Sedan', '../../../../dataJSON/carData.json','https://api.thecatapi.com/v1/images/search?limit=1')
// console.log(carCardDataToRender);
  