export interface IFormData {
    id?: string;
    name: string;
    surname: string;
    age: string;
    city: string;
}

export interface ITableData {
    id: string;
    data: IFormData[];
}

export interface IRootState {
    init: ITableData;
    rows: ITableData[];
}