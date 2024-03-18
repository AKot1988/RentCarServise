import Form from "../Form/Form";

export default class Modal {
    constructor(public navigationPanel: HTMLElement) {
        this.navigationPanel = navigationPanel;
    }

    initListeners() {
        if (!this.navigationPanel) {
            throw new Error('NO parameters were passed!!!');
        }
        this.navigationPanel.addEventListener('click', this.handleControlContent.bind(this));
        (document.querySelector(".modal") as HTMLElement)?.addEventListener("click", this.handleCloseContent.bind(this));
    }

    handleControlContent(event: Event) {
        const eventElem = event.target as HTMLElement;

        const modal = document.querySelector('.modal') as HTMLElement;
        const formWrapper = modal.querySelector('.modal__content') as HTMLElement;
        const form = new Form(formWrapper);

        if (this.navigationPanel.contains(eventElem)
            && !eventElem.classList.contains('navigation__buttons-container')) {
            modal.classList.add('active')
        }

        if (eventElem.classList.contains('navigation__register-button')) {
            formWrapper.innerHTML = '';
            form.renderFormRegistr();
        } else {
            formWrapper.innerHTML = '';
            form.renderFormLogin();
        }
    }

    handleCloseContent(event: Event) {
        const eventElem = event.target as HTMLElement;
        const modal = document.querySelector('.modal') as HTMLElement;

        if (eventElem.classList.contains("modal")
            || eventElem.classList.contains("modal__close")) {
            modal.classList.remove("active");
        }
    }
}
