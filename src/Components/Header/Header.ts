import { createMenuList } from "./helpers";
import "./styles.scss";

class Header {
  elements: any;

  constructor() {
    this.elements = {
      navigation: document.createElement("header"),
      logo: document.createElement("h2"),
      menu: document.createElement("ul"),
    };
  }

  render(parent: HTMLDivElement) {
    parent.replaceChildren();

    this.elements.navigation.classList.add("navigation");
    this.elements.logo.classList.add("navigation__logo");
    this.elements.menu.classList.add("navigation__menu");

    this.elements.logo.innerText = "Logo";

    createMenuList(this.elements.menu);

    this.elements.navigation.append(this.elements.logo, this.elements.menu);

    parent.append(this.elements.navigation);
  }
}

export default Header;
