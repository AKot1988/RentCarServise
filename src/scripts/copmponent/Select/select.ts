import CreateElement from "../CreateElement/CreateElement";
import { DataItem } from "./type";

export default class Select {
    public elem: HTMLElement;
    private arrow!: HTMLElement;
    private value!: HTMLElement;
    private selectedId: string | null;

    constructor(public select: string, private options: { placeholder: string, data: DataItem[] }) {
        this.elem = document.querySelector(select) as HTMLElement;

        if (!this.elem) {
            throw new Error(`Element with selector '${select}' not found.`);
        }
        this.selectedId = null;
    }

    render() {
        const { data, placeholder } = this.options;

        const selectInputWrapper = new CreateElement('div', {
            className: 'select__input',
            dataset: { type: 'input' }
        }).render();

        const selectInputValue = new CreateElement('span', {
            className: 'select__input-value',
            dataset: { type: 'value' },
            textContent: placeholder
        }).render();

        const selectSvg = new CreateElement('svg', {
            className: 'select__svg',
            dataset: { type: 'arrow' }
        }).render();

        selectSvg.innerHTML = `
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M6.0002 5.79963C5.59186 5.79963 5.18353 5.64213 4.87436 5.33297L1.07103 1.52963C0.901861 
           1.36047 0.901861 1.08047 1.07103 0.911299C1.24019 0.742132 1.52019 0.742132 1.68936 0.911299L5.49269
           4.71463C5.7727 4.99463 6.22769 4.99463 6.5077 4.71463L10.311 0.911299C10.4802 0.742132 10.7602 0.742132 10.9294
           0.911299C11.0985 1.08047 11.0985 1.36047 10.9294 1.52963L7.12603 5.33297C6.81686 5.64213 6.40853 5.79963 6.0002 5.79963Z"
              fill="#1A202C" stroke="#1A202C" stroke-width="0.5"/>
        </svg>
        `
        selectInputWrapper.append(selectInputValue, selectSvg);

        const selectDropdown = new CreateElement('div', {
            className: 'select__dropdown',
        }).render();

        const selectList = new CreateElement('ul', {
            className: 'select__list'
        }).render();

        data.forEach(item => {
            const selectListItem = new CreateElement('li', {
                className: 'select__item',
                dataset: { type: 'item', id: item.id },
                textContent: item.value
            }).render();

            selectList.append(selectListItem);
            selectDropdown.append(selectList);

            this.elem.append(selectInputWrapper, selectDropdown)
        })

        this.elem.classList.add('select');
        this.arrow = this.elem.querySelector('[data-type="arrow"]') as HTMLElement;
        this.value = this.elem.querySelector('[data-type="value"]') as HTMLElement;

        this.initListeners();
    }

    initListeners() {
        this.elem.addEventListener('click', this.clickHandler.bind(this));
        this.keydownHandler();
        this.closeDropdown();
    }

    clickHandler(event: Event) {
        const eventElem = event.target as HTMLElement;
        const dataset = eventElem.dataset;

        if (!dataset) return;
        const { type, id } = dataset;

        if (this.elem.contains(eventElem)) {
            this.toggle();
        }

        if (type === 'item') {
            this.selectItem(id as string);
        }
    }

    keydownHandler() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Tab' || event.key === 'Escape') {
                this.close();
            }
        });
    }

    closeDropdown() {
        document.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;
            if (!this.elem.contains(target)) {
                this.close();
            }
        });
    }

    selectItem(id: string) {
        this.selectedId = id;
        const selectedItem = this.options.data.find(item => item.id === this.selectedId);
        if (selectedItem) {
            this.value.textContent = selectedItem.value;
            this.value.style.fontSize = '16px';
            this.close();
            this.elem.querySelectorAll('[data-type="item"]').forEach(item => {
                item.classList.remove('selected');
            });
            (this.elem.querySelector(`[data-id="${id}"]`) as HTMLElement).classList.add('selected');
        }
    }

    toggle() {
        if (this.elem.classList.contains('open')) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.elem.classList.add('open');
        this.arrow.classList.add('rotate');
    }

    close() {
        this.elem.classList.remove('open');
        this.arrow.classList.remove('rotate');
    }

}
