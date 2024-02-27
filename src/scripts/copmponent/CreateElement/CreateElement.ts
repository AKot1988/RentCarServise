export default class CreateElement<Props> {
    public tagName: string;
    public params: Props
    constructor(tagName: string, params: Props) {
        this.tagName = tagName
        this.params = params
    }

    render(): HTMLElement {
        const element = document.createElement(this.tagName)
        for (let key in this.params) {
            switch (key) {
                case 'dataset':
                    for (let dataKey in this.params[key]) {
                        element.dataset[dataKey] = this.params[key][dataKey]
                    }
                    break
                default:
                    (element as any)[key]= this.params[key]
            }
        }
        return element
    }
}

// interface INodeElement {
//     textContent?: '',
//     className: '',
// }

// interface IImg extends INodeElement {
//     url: '',
//     alt: ''
// }

// interface PropsInput {
//     type: string
//     placeholder: string
// }

// new CreateElement<PropsInput>('asdasd', {
//     placeholder: 'asdsad',
// })


// type SelectFieldOptionProps {
//   value?: string
//   options: string[]
//   classes: string[]
// }

// type RadioFieldOptionProps {
//   value?: string
//   options: string[]
//   classes: string[]
// }

// interface CommonInputProps {
//   value?: string
//   classes: string[]
// }

// interface OptionsRequired {
//   options: string[]
// }

// type OptionableFieldProps = CommonInputProps & OptionsRequired


// type A = string
// type B = number 
// type S = A & B

// interface A extends B {

// }