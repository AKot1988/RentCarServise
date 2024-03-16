import CreateElement from "../CreateElement/CreateElement";
import { ServiceDataItem } from "./type";

export default class ListService {
    constructor(public data: ServiceDataItem[]) {
        this.data = data;
    }

    render(parentElement: HTMLElement) {
        this.data.forEach(itemData => {
            const { svg, title, body } = itemData;

            const listItem = new CreateElement('li', {
                className: 'advantages__list-item'
            }).render();

            const listItemImage = new CreateElement('figure', {
                className: 'advantages__list-item-image'
            }).render();

            const listItemSvg = new CreateElement('svg', {
                className: 'advantages__list-item-svg'
            }).render();

            listItemSvg.innerHTML = svg;

            const listItemInfo = new CreateElement('div', {
                className: 'advantages__list-item-info'
            }).render();

            const listItemInfoTitle = new CreateElement('h3', {
                className: "advantages__list-item-info-title",
                textContent: title,
            }).render();

            const listItemInfoDescription = new CreateElement('p', {
                className: 'advantages__list-item-info-description',
                textContent: body
            }).render();


            listItemImage.append(listItemSvg);
            listItemInfo.append(listItemInfoTitle, listItemInfoDescription);
            listItem.append(listItemImage, listItemInfo);
            parentElement.append(listItem)
        })

    }

}