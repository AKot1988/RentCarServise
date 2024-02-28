import CreateElement from '../CreateElement/CreateElement'
import { newElementAttributesInterface } from '../UniversalButton/types'

export class TabComponent {
  public newTab: HTMLElement
  constructor (public params: newElementAttributesInterface, public parent?: HTMLDivElement) {
    this.newTab = new CreateElement<newElementAttributesInterface>('div', this.params).render()
  }
  render(parent?: HTMLDivElement) {
    if (parent) {
      parent.append(this.newTab)
    }
  }
}