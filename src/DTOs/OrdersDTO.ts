import { IProductRepository } from "../Repositories";

export interface OrdersDTO {
    date: string;
    product: IProductRepository;
    id: string;
}