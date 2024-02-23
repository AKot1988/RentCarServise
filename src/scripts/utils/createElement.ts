export default class CreateElement {
    public tagName: string;
    public params: {[key: string]:any}
    constructor(tagName: string, params: {[key: string]: any}) {
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