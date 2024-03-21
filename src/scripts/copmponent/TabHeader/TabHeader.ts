import CreateElement from '../CreateElement/CreateElement'
import { newElementAttributesInterface } from '../UniversalButton/types'
import API from "../../utils/API";
import TabContent from "../TabContent/TabContent.ts";



export const tabParams = await new API('../../../../dataJSON/tabsData.json').getRequest();
export default class TabHeader {
  public parent: HTMLElement
  public tabHaedItems: HTMLElement[] = []

  constructor(public params: newElementAttributesInterface[], public tabHeadWrapper: HTMLElement) {
    this.params = params
    this.parent = tabHeadWrapper
  }

  render (){
    this.params.forEach(tabHeadEl => {
      const tabHeadItem = new CreateElement('div', tabHeadEl).render()
      this.tabHaedItems.push(tabHeadItem)
    });

    this.tabHeadWrapper.append(...this.tabHaedItems)

    this.tabHeadWrapper.addEventListener('click', this.handleTabs)
  }

  handleTabs(event: Event) {
    let target = event.target as HTMLElement
    if(target?.classList.contains('tab')){
      if (target.classList.contains('tab--active')) {
        return
      } else if (!target.classList.contains('tab--active')) {
        let prevActiveTab = document.querySelector('.tab--active') as HTMLElement
        prevActiveTab.classList.remove('tab--active')
        target.classList.add('tab--active')
      }
      const content = new TabContent(target.dataset.tabHeader as string)
      content.render()
    }
  }
}