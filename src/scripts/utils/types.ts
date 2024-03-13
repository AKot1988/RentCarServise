export type Options = {
  method: string,
  body: any
}

export interface DataItem {[key: string]: string}
export interface Data {[k: string]: DataItem[];}

export enum SizeScreen {
  mobile = 375,
  tablet = 768,
  tabletBigger = 1024,
  desktop = 1440,
}

export interface Review {
  _id: number
  image: string
  name: string
  place: string
  rating: string
  text: string
}