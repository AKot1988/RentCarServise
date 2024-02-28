import CreateElement from '../CreateElement/CreateElement'
import { newElementAttributesInterface } from '../UniversalButton/types'

export const tabParams: newElementAttributesInterface[] = [
  {
    innerText: 'Sedan',
    classes: ['tab', 'tab--active'],
    dataset: {tabHeader: 'Sedan'}
  },

  {
    innerText:`SUV`,
    classes: 'tab',
    dataset: {tabHeader: 'SUV'}
  },

  {
    innerText: 'Hatchback',
    classes: 'tab',
    dataset: {tabHeader: 'Hatchback'}
  },

  {
    innerText: 'Wagon',
    classes: 'tab',
    dataset: {tabHeader: 'Wagon'}
  }
]

export class TabComponent {
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

