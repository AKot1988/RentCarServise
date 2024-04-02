import Select from "./select";
import API from "../../utils/API";

import { filterCarData } from "../CarCard/helper";
import TabContent from "../TabContent/TabContent.ts";
import { ICollectedData } from "../../utils/types.ts";
import { Data } from "./type.ts";

import { allCarsData } from "../CarCard/helper.ts"
import Loader from "../Loader/Loader";



export default async function fetchData() {
    try {
        const api = new API<Data>('/dataJSON/dataSelect.json');
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
    }

};


const searchBtn = document.querySelector('.button__search') as HTMLButtonElement;


export function collectDataFromSelect(): ICollectedData {
    const selectedRadioValue = document.querySelector('input[type="radio"]:checked') as HTMLInputElement;
    const selectValues = document.querySelectorAll('.select__input-value') as NodeListOf<HTMLElement>;

    const sellectData: ICollectedData = {};

    if (selectedRadioValue && selectValues) {
        selectValues.forEach((selectValue, index) => {
            if (selectValue.classList.contains('checked')) {
                const name = selectValue.dataset.name;
                const textContent = selectValue.textContent?.trim();
                if (name && textContent) {
                    switch (index) {
                        case 0:
                            sellectData['location'] = textContent;
                            break;
                        case 1:
                            sellectData['date'] = textContent.split('.').join('-');
                            break;
                        case 2:
                            sellectData['time'] = textContent;
                            break;
                    }
                }
            }
        });
    }

    checkCollectedData(sellectData);
    return sellectData;
}


function checkCollectedData(collectedData: ICollectedData): boolean {
    const { location, date, time } = collectedData;
    if (location && date && time) {


        const searchBtn = document.querySelector('.button__search') as HTMLElement;
        searchBtn.classList.remove('disable')
        const targetSectionId = searchBtn.getAttribute('href');

        if (targetSectionId) {
            const targetSection = document.querySelector(targetSectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                return true;
            } else {
                console.error('Target section does not exist:', targetSectionId);
            }
        } else {
            console.error('Did not find any HREF.');
        }
    } else {
        handleIncompleteData();
    }
    return false;
}

function showPopup(message: string, delay: number) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = message;

    document.body.append(popup);

    setTimeout(() => {
        popup.remove();
    }, delay);
}


function handleIncompleteData() {
    const pickUpWrapper = document.querySelector('.pick-up__wrapper') as HTMLElement;
    const selectInputValue = pickUpWrapper.querySelectorAll('.select__input-value') as NodeListOf<HTMLElement>;

    selectInputValue.forEach(selectValue => {
        if (!selectValue || !selectValue.classList.contains('checked')) {
            selectValue.style.borderBottom = '1px solid red';
            setTimeout(() => {
                selectValue.style.borderBottom = 'none';
            }, 1500)

        } else {
            selectValue.style.border = 'none';
        }
    });
}

searchBtn.addEventListener('click', async () => {

    let carCardParent = document.querySelector('.popular__cars__container') as HTMLElement;
    while (carCardParent.firstChild) {
        carCardParent.removeChild(carCardParent.firstChild);
    }

    try {
        const newLoader = new Loader(carCardParent);
        const collectedData = collectDataFromSelect();
        if (checkCollectedData(collectedData)) {

            const allCars = await allCarsData('../../../../dataJSON/carData.json', 'https://api.thecatapi.com/v1/images/search?limit=1');
            localStorage.setItem("carData", JSON.stringify(allCars));
            handleIncompleteData();
            filterCarData(collectedData);
            console.log('Local storage data:', JSON.parse(localStorage.getItem('carData') || 'null'));
            newLoader.remove();
            new TabContent("all").render();
        } else {
            showPopup('Please, choose Pick-Up and enter all options!', 1500);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});



