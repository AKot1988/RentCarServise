export interface DataItem {
    id: string;
    value: string;
}

export interface Data {
    location: DataItem[];
    date: DataItem[];
    time: DataItem[];
}
