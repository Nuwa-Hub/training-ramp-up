import { Product } from "./interface";
import { sampleProducts } from "./sample-products";
var data:Product[]; 
data = [...sampleProducts];

const generateId = (data: any[]) =>
    data.reduce((acc: number, current: { ProductID: number; }) => Math.max(acc, current.ProductID), 0) + 1;

export const insertItem = (item: Product) => {
    item.ProductID = generateId(data);
    item.inEdit = false;
    data.unshift(item);
    return data;
};

export const getItems = () => {
    return data;
};

export const updateItem = (item: Product) => {
    let index = data.findIndex(record => record.ProductID === item.ProductID);
    data[index] = item;
    return data;
};

export const deleteItem = (item: Product) => {
    let index = data.findIndex(record => record.ProductID === item.ProductID);
    data.splice(index, 1);
    return data;
};
