import CreateElement from '../CreateElement/CreateElement'
import { newElementAttributesInterface } from '../UniversalButton/types'
import API from "../../utils/API";
export const tabParams = await new API('../../../../dataJSON/tabsData.json').getRequest();
export class Tab {
  public newTab: HTMLElement = document.createElement('div');
  public tabList: HTMLElement[] = [];
  
  constructor (public params: newElementAttributesInterface[], public parent: HTMLDivElement) {
    this.params.forEach((param) => {
      this.newTab = new CreateElement('div', param).render();
      this.tabList.push(this.newTab);
    });
    this.parent.append(...this.tabList);
  }
}