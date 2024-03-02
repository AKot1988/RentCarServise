export type Options = {
  method: string,
  body: any
}

export interface DataItem {[key: string]: string}
export interface Data {[k: string]: DataItem[];}