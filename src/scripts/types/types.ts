
export type newElementStyle = {[k: string]: string}

export type newElementAttributeType = string | newElementStyle | EventListener

export interface newElementAttributesInterface {
  [k: string]: newElementAttributeType
}

let newOptions = {
  id: 'my-button',
  style: {
    backgroundColor: 'blue',
    color: 'white'
  },
  innerText: 'Click me!',
  onClick: () => {console.log('Clicked!')}
}
