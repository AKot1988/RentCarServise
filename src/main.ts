import './scss/main.scss'
import universalButton from './scripts/components/universalButton/universalButton.ts'
import { newElementAttributesInterface } from './scripts/types/types.ts'

const buttonOptions: newElementAttributesInterface = {
  type: 'button',
  id: 'newButton',
  className: 'newButton',
  innerText: 'Click me',
  style: {
    color: 'red',
    width: `100px`,
    height: `50px`, 
  },
  onClick: (event: Event) => {
    console.dir(event.target)
    console.log('clicked')
  }
}

const newButton = new universalButton(buttonOptions)
newButton.render(document.getElementById('app') as HTMLElement)
