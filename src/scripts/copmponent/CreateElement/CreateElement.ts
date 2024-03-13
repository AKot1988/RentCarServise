export default class CreateElement {
    public tagName: string;
    public params: {
        [key: string]: unknown
    }
    constructor(
        tagName: string,
        params: {
            [key: string]: unknown
        }
    ) {
        this.tagName = tagName
        this.params = params
    }
    render(): HTMLElement {
        const element = document.createElement(this.tagName) as HTMLElement
        for (let key in this.params) {
            switch (key) {
                case 'dataset':
                    if (typeof this.params[key] === 'object') {
                        for (let dataKey in this.params[key] as object) {
                            element.dataset[dataKey] = (this.params[key] as keyof object)[dataKey]
                        } 
                    }   
                    break
                case 'classes': 
                    if (Array.isArray(this.params[key])) {
                        element.classList.add(...(this.params[key] as string[]))
                    } else 
                    if (typeof this.params[key] === 'string') {
                        element.classList.add(this.params[key] as string)
                    }
                    break
                default:
                    if (typeof this.params[key] === 'string'|| typeof this.params[key] === 'number' || typeof this.params[key] === 'boolean'){
                        (element[key as keyof HTMLElement] as string) = this.params[key] as keyof object
                    }
            }
        }
        return element
    }
}



//some change