import { MenuConfigurtionItem } from "./types";

const menuConfig: MenuConfigurtionItem[] = [
  {
    innerText: "Home",
    anchor: "#",
  },
  {
    innerText: "How it Work",
    anchor: "#",
  },
  {
    innerText: "Rental Details",
    anchor: "#",
  },
  {
    innerText: "Why Choose Us",
    anchor: "#",
  },
  {
    innerText: "Testimonial",
    anchor: "#",
  },
];

export const createMenuList = (parent: HTMLUListElement): void => {
  menuConfig.forEach((element, index) => {
    const menuItem = document.createElement("li");
    menuItem.classList.add("navigation__menu-item");

    const menuLink = document.createElement("a");
    menuLink.classList.add("navigation__menu-link");
    if (index === 0) menuLink.classList.add("active");

    menuLink.innerText = element.innerText;
    menuLink.setAttribute("href", element.anchor);

    menuItem.append(menuLink);
    parent.append(menuItem);
  });
};
