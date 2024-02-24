import { createMenuList } from "./helpers";
import { HeaderElements } from "./types";
import "./styles.scss";

class Header {
  elements: HeaderElements;

  constructor() {
    this.elements = {
      navigation: document.createElement("header"),
      logo: document.createElement("h2"),
      menu: document.createElement("ul"),
      menuContainer: document.createElement("menu"),
      buttonsContainer: document.createElement("div"),
      registerBtn: document.createElement("a"),
      logInBtn: document.createElement("button"),
    };
  }

  render(parent: HTMLDivElement) {
    parent.replaceChildren();

    this.elements.navigation.classList.add("navigation");
    this.elements.logo.classList.add("navigation__logo");
    this.elements.menu.classList.add("navigation__menu");
    this.elements.menuContainer.classList.add("navigation__menu-container");
    this.elements.buttonsContainer.classList.add(
      "navigation__buttons-container"
    );
    this.elements.registerBtn.classList.add("navigation__register-button");
    this.elements.logInBtn.classList.add("navigation__login-button");

    this.elements.logo.innerText = "Logo";

    createMenuList(this.elements.menu);

    this.elements.registerBtn.innerText = "Register";
    this.elements.registerBtn.onclick = (e) => {
      e.preventDefault();
      //TODO: show registration modal window;
    };

    this.elements.logInBtn.innerText = "Log In";
    this.elements.logInBtn.onclick = (e) => {
      e.preventDefault();
      //TODO: show log in modal window;
    };

    this.elements.buttonsContainer.append(
      this.elements.registerBtn,
      this.elements.logInBtn
    );

    this.elements.menuContainer.append(
      this.elements.menu,
      this.elements.buttonsContainer
    );

    this.elements.navigation.append(
      this.elements.logo,
      this.elements.menuContainer
    );

    parent.append(this.elements.navigation);
  }
}

export default Header;
