export interface CarCardProps {
  "model": string
  "price": string,
  "image": string
}

export interface carSetInterface {
  [k: string]: CarCardProps[]
}

export interface fetchResponse {
  height: number,
  id: string,
  url: string,
  width: number
}