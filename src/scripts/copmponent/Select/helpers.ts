import Select from "./select";
import API from "../../utils/API";
import { Data } from "./type";
import { filterCarData, GenerateDataToRender } from "../CarCard/helper";
import TabsSection from "../TabsSection/TabsSection";
import { carSetInterface } from "../CarCard/types"
import { Tab, tabParams } from "../Tab/Tab.ts"



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

    let tabParentElement = document.querySelector('.popular__tabs__container');
    while (tabParentElement?.firstChild) {
        console.log('видалили таб');
        tabParentElement.removeChild(tabParentElement.firstChild);
    }
    let parentElement = document.querySelector(".popular__cars__container");
    while (parentElement?.firstChild) {
     parentElement.removeChild(parentElement.firstChild);
    }

    const collectedData = collectDataFromSelect();
    if (collectedData) {
        let filteredData = await filterCarData('../../../../dataJSON/carData.json', collectedData);
        if(Object.values(filteredData).length === 0) {
            let tabParentElement = document.querySelector('.popular__tabs__container');
            tabParentElement?.insertAdjacentHTML('beforebegin', `<h2 class="error">Немає автомобілів згідно запиту</h2>`);
        } else {
            new Tab(tabParams, document.querySelector('.popular__tabs__container') as HTMLDivElement);
            new TabsSection(filteredData as carSetInterface);
        }
    }
})

