import CreateElement from "../CreateElement/CreateElement";
import { DataItem } from "./type";
import { Icon } from "../../utils/Icon";

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
            dataset: { type: 'value', name: 'name' },
            textContent: placeholder
        }).render();

        const selectSvg = new CreateElement('svg', {
            className: 'select__svg',
            dataset: { type: 'arrow' }
        }).render();

        selectSvg.innerHTML = Icon.arrowSelect();

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
            this.value.classList.add('checked');
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
