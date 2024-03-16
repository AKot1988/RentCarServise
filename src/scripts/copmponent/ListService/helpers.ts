import { Icon } from "../../utils/Icon";
import API from "../../utils/API";
import { ServiceDataItem, IFetchData } from "./type";

export const serviceData: ServiceDataItem[] = [
    {
        svg: Icon.phone(),
        title: 'Customer Support',
        body: 'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.'
    },
    {
        svg: Icon.price(),
        title: 'Best Price Guarantted',
        body: 'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.'
    },
    {
        svg: Icon.location(),
        title: 'Many Location',
        body: 'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.'
    }
]

export const parentElement = document.querySelector('.advantages__list') as HTMLUListElement;


const getUrlPicture = async () => {
    const api = new API<IFetchData[]>("https://api.thecatapi.com/v1/images/search");
    try {
        const data = await api.getRequest();
        const urlPicture = data.map(item => item.url);
        return urlPicture[0];

    } catch (error) {
        console.log(error);
    }
}

const showPicture = async () => {
    const url = await getUrlPicture();
    if (url) {
        const pictureElement = document.querySelector('.advantages__img') as HTMLImageElement
        pictureElement.src = url;
    }
}
showPicture();

