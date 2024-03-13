import { fetchResponse, carSetInterface, CarCardProps } from "./types"
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

export let GenerateDataToRender = async function (carType: string, linkToCarsJSON: string, linkToPhotoJSON: string) {
  let carData = await getCarByType(carType, linkToCarsJSON);
  if (!carData) {
    throw new Error('No such car type');
  }
  let photoURLs = await getPhotoURLs(carData.length, linkToPhotoJSON);
  let filledData: CarCardProps[] = []
  carData.forEach((car: CarCardProps) => {
    car.image = photoURLs.pop();
    filledData.push(car);
  })
  return filledData
}

export let carCardDataToRender = await GenerateDataToRender('Sedan', '../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1')


// {location:'Kiev',data:'2024:25:02',time:'10:00'}

