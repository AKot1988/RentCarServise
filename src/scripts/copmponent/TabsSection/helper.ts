// import { CarCardProps, carSetInterface } from "../CarCardComponent/types";


// export const renderAccordingFilterRequest = async function(filterCondition: {location: string, data: string, time: string}, linkToGeneralCarData: string, linkToPhotoJSON: string) {
//   let fitratedCarJSON: carSetInterface = await fetch('../../../../dataJSON/carData.json').then(response => {
//     let preparedData = {}
//     let fetchedData = response.json()
//     let filterCondition = {location: 'Kiev', data: '2024-03-10', time: '10:00'}



//     //Формування табсів для рендеру відповідно до фільтра
//       let tabOptions = []
//       Object.keys(fetchedData).forEach((carType) => {
//       if (tabOptions.length === 0) {
//         let tabOption = {
//           "innerText": carType,
//           "className": "tab tab--active",
//           "dataset": {"tabHeader": `${carType}`}
//         }
//         tabOptions.push(tabOption)
//       } else {
//         let tabOption = {
//           "innerText": carType,
//           "className": "tab",
//           "dataset": {"tabHeader": `${carType}`}
//         }
//         tabOptions.push(tabOption)
//       }
//     });
//     this.defaultCarDataToRender = await GenerateDataToRender(this.activeCarTypeByDefault, '../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1')
//   })
// }