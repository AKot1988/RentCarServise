export interface CarCardPropsExpanded {
  "model": string,
  "price": string,
  "image": string,
  "location": string,
  "date": string,
  "time": string
}
export interface carSetInterface {
  [k: string]: CarCardPropsExpanded[]
}

export interface fetchResponse {
  height: number,
  id: string,
  url: string,
  width: number
}