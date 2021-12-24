import { ICategoryRepository } from './ICategoryRepository'

export interface IProductRepository {
    name: string;
    description: string;
    price: number;
    category: ICategoryRepository
    id: string;
}