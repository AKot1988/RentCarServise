import { FieldsData } from "./types";

export const FIELDS_DATA_LOGIN: FieldsData[] = [
    {
        className: "form-field",
        type: "text",
        name: "email",
        placeholder: "Email address",
        value: "",
        required: true,
    },
    {
        className: "form-field",
        type: "password",
        name: "password",
        placeholder: "Password",
        value: "",
        required: true,
    },
    {
        className: "form-btn",
        id: "login",
        type: "submit",
        name: "submit",
        value: "Login",
    },
];

export const FIELDS_DATA_REGISTER: FieldsData[] = [
    {
        className: "form-field",
        type: "text",
        name: "fullName",
        placeholder: "Enter your nickName",
        value: "",
        required: true,
    },
    {
        className: "form-field",
        type: "password",
        name: "password",
        placeholder: "Password",
        value: "",
        required: true,
    },
    {
        className: "form-field",
        type: "email",
        name: "email",
        placeholder: "Email address",
        value: "",
        required: true,
    },
    {
        className: "form-btn",
        id: "register",
        type: "submit",
        name: "submit",
        value: "Sign Up",
    },
];
