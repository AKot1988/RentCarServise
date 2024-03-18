import CreateElement from "../CreateElement/CreateElement";
import { FIELDS_DATA_LOGIN, FIELDS_DATA_REGISTER } from "./helpers";

export default class Form {
    constructor(public parentElement: HTMLElement) {
        if (!this.parentElement) {
            throw new Error('Parent element not found!!!')
        }
    }


    renderFormLogin() {
        const form = new CreateElement("form", {
            className: "form-login"
        }).render();

        form.addEventListener("submit", this.handleSubmit.bind(this));

        FIELDS_DATA_LOGIN.forEach((field) => {
            const input = new CreateElement("input", field);
            form.append(input.render());
        });
        this.parentElement.append(form);
    }


    renderFormRegistr() {
        const form = new CreateElement("form", {
            className: "form-register"
        }).render();

        form.addEventListener("submit", this.handleSubmit.bind(this));

        FIELDS_DATA_REGISTER.forEach((value) => {
            const input = new CreateElement("input", value);
            form.append(input.render());
        });
        this.parentElement.append(form);
    }

    handleSubmit(event: Event) {
        event.preventDefault();

        const eventElem = event.currentTarget as HTMLFormElement;
        const dataFields: { [key: string]: string } = {};
        const formFields = eventElem.querySelectorAll(".form-field") as NodeListOf<HTMLInputElement>;

        formFields.forEach((input: HTMLInputElement) => {
            dataFields[input.name] = input.value;
            input.value = "";
        });
    }

}