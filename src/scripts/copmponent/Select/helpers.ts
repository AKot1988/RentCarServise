import Select from "./select";
import API from "../../utils/Api";

export default async function fetchData() {
    const api = new API('../src/data/data.json');
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