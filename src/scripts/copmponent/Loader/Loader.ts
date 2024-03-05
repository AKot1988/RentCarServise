import CreateElement from "../CreateElement/CreateElement";

let loader = './src/assets/img/GIF/loader.gif'

export default class Loader {
  public self: HTMLElement;
  public spinner: HTMLElement;
  constructor(public parent: HTMLElement) {
    this.self = new CreateElement('div', {classes: 'loader'}).render();
    this.spinner = new CreateElement('img', {classes: 'loader__spinner', src: loader}).render();
    this.render();
  }

  render() {
    this.self.append(this.spinner);
    this.parent.append(this.self);
    return this.self; 
  }

  remove() {
    this.self.remove();
  }
}