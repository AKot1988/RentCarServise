const buttonActive = document.getElementById("menuToggle") as HTMLElement;
const menu = document.querySelector(".navigation__menu-container") as HTMLElement;

export function toggleMenu() {
    buttonActive.addEventListener("click", () => {
        menu.classList.toggle("active");
        buttonActive.classList.toggle("active");
    });
}