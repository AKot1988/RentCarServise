import Select from "./select";
import API from "../../utils/API";
import { Data } from "./type";
import { filterCarData, generateTabsOptions, GenerateDataToRender } from "../CarCardComponent/helper";
import TabsSection from "../TabsSection/TabsSection";
import { carSetInterface } from "../CarCardComponent/types"



export default async function fetchData() {
    const api = new API<Data>('/dataJSON/dataSelect.json');
    try {
        const response = await api.getRequest();
        const { date, location, time } = response;

        new Select('#select', {
            placeholder: 'Select your city',
            data: location
        });

        new Select('#select1', {
            placeholder: 'Select your date',
            data: date
        });

        new Select('#select2', {
            placeholder: 'Select your time',
            data: time
        });

        new Select('#select3', {
            placeholder: 'Select your city',
            data: location
        });

        new Select('#select4', {
            placeholder: 'Select your date',
            data: date
        });

        new Select('#select5', {
            placeholder: 'Select your time',
            data: time
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

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
    }
}


const searchBtn = document.querySelector('.button__search') as HTMLElement;

searchBtn.addEventListener('click', async () => {
    const collectedData = collectDataFromSelect();
    if (collectedData) {
        console.log(collectedData);
        let filteredData = await filterCarData('../../../../dataJSON/carData.json', collectedData);
        console.log(filteredData);
        let tabsOptions = generateTabsOptions(filteredData as carSetInterface);
        console.log(tabsOptions);
        let parentElement = document.getElementById("parent");
        while (parentElement?.firstChild) {
         parentElement.removeChild(parentElement.firstChild);
        }
        new TabsSection(tabsOptions, filteredData as carSetInterface , 'https://api.thecatapi.com/v1/images/search?limit=1', 'accordingFilterRequest');
    } else {
        throw new Error('No data collected!')
    }
})