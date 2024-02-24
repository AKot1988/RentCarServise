import { newElementAttributesInterface } from '../../types/types.ts'

export default class UniversalButton {
  public newButton: HTMLButtonElement;
  constructor(public options: newElementAttributesInterface, public parent?: HTMLElement) {
    this.newButton = document.createElement('button');
  }

  render(parent: HTMLElement): HTMLButtonElement{
    Object.keys(this.options).forEach((key) => {
      if(key === 'style'){
        Object.assign(this.newButton.style, this.options.style)
      }
      else if(key === 'innerText'){this.newButton.innerText = this.options[key] as string}
      else if(key === "onClick") {
        if(typeof this.options.onClick === 'function') {
          this.newButton.addEventListener('click', this.options.onClick as EventListener);
        }
      } else {
        this.newButton.setAttribute(key, this.options[key] as string)
      }
    })
    parent.appendChild(this.newButton);
    return this.newButton;
  }
}


