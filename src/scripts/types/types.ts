
export type newElementStyle = {[k: string]: string}

export type newElementAttributeType = string | newElementStyle | EventListener

export interface newElementAttributesInterface {
  [k: string]: newElementAttributeType
}
