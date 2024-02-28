
export type newElementStyle = {[k: string]: string}

export type newElementAttributeType = string | newElementStyle | EventListener | string[] 

export interface newElementAttributesInterface {
  [k: string]: newElementAttributeType
}