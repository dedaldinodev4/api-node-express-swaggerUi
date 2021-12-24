import { IProductRepository } from "./IProductRepository";

export interface IOrderRepository {
    date: string;
    product: IProductRepository,
    id: string;
}