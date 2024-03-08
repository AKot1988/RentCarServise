export interface CarCardProps {
  "model": string
  "price": string,
  "image": string
}

export interface CarCardPropsExpanded extends CarCardProps{
  "location": string
  "data": string,
  "time": string
}

export interface carSetInterface {
  [k: string]: CarCardProps[] | CarCardPropsExpanded[]
}

export interface fetchResponse {
  height: number,
  id: string,
  url: string,
  width: number
}