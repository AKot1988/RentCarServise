import Select from "./select";
import API from "../../utils/API";
import { Data } from "./type";
import { filterCarData } from "../CarCard/helper";
import TabContent from "../TabContent/TabContent.ts";
// import { carSetInterface } from "../CarCard/types"
// import { Tab, tabParams } from "../TabHeader/TabHeader.ts"
import { allCarsData } from "../CarCard/helper.ts"
import Loader from "../Loader/Loader";



export default async function fetchData() {
    const api = new API<Data>('/dataJSON/dataSelect.json');
    try {
        const response = await api.getRequest();
        const { date, location, time } = response;

        const selectConfigs = [
            { id: '#select', placeholder: 'Select your city', data: location },
            { id: '#select1', placeholder: 'Select your date', data: date },
            { id: '#select2', placeholder: 'Select your time', data: time },
            { id: '#select3', placeholder: 'Select your city', data: location },
            { id: '#select4', placeholder: 'Select your date', data: date },
            { id: '#select5', placeholder: 'Select your time', data: time }
        ];

        selectConfigs.forEach(config => {
            new Select(config.id, {
                placeholder: config.placeholder,
                data: config.data
            }).render();
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    };
};

export function collectDataFromSelect() {
    const selectedRadioValue = document.querySelector('input[type="radio"]:checked') as HTMLInputElement;
    const selectValues = document.querySelectorAll('.select__input-value') as NodeListOf<HTMLElement>;
    let sellectData: { [key: string]: string | null } = {};

    if (selectedRadioValue && selectValues) {
        sellectData = Array.from(selectValues)
            .map(item => item.textContent)
            .filter(item => !item?.includes('Select'))
            .reduce((acc: { [key: string]: string | null }, currentValue, index) => {
                switch (index) {
                    case 0:
                        acc['location'] = currentValue;
                        break;
                    case 1:
                        acc['date'] = currentValue ? currentValue.split('.').join('-') : null;;
                        break;
                    case 2:
                        acc['time'] = currentValue;
                        break;
                    default:
                        break;
                }
                return acc;
            }, {});

        return sellectData;
    };
};

const searchBtn = document.querySelector('.button__search') as HTMLElement;
searchBtn.addEventListener('click', async () => {
    let carCardParent = document.querySelector('.popular__cars__container') as HTMLElement;
    while (carCardParent.firstChild) {
        carCardParent.removeChild(carCardParent.firstChild);
    }
    try{
        let newLoader = new Loader(document.querySelector('.popular__cars__container') as HTMLElement);
        let allCars = await allCarsData('../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1')
        localStorage.setItem("carData", JSON.stringify(allCars))
        const collectedData = collectDataFromSelect();
        filterCarData(collectedData)
        console.log(localStorage.getItem('carData') ? JSON.parse(localStorage.getItem('carData') as string) : null)
        newLoader.remove()
        new TabContent("all").render();
    }
    catch (error) {
        console.error('Error fetching data:', error);
    };
})

