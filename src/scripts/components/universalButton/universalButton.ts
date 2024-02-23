import { newElementAttributesInterface, newElementStyle } from '../../types/types.ts'

export default class universalButton {
  public newButton: HTMLButtonElement;
  constructor(public options: newElementAttributesInterface, public parent?: HTMLElement) {
    this.newButton = document.createElement('button') as HTMLButtonElement;
  }

  render(parent: HTMLElement): HTMLButtonElement{
    Object.keys(this.options).forEach((key) => {
      if(key === 'style'){
        Object.assign(this.newButton.style, this.options.style) // так значно простіше виглядає і не б'є помилки
      }
      else if(key === 'innerText'){this.newButton.innerText = this.options[key] as string}
      else if(key === "onClick") {
        if(typeof this.options.onClick === 'function') {
          this.newButton.addEventListener('click', this.options.onClick as EventListener);
        }
      } else {
        this.newButton.setAttribute(key, this.options[key])
      }
    })
    parent.appendChild(this.newButton);
    return this.newButton;
  }
}


