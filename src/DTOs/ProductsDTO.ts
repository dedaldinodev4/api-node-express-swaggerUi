import { ICategoryRepository } from "../Repositories";


export interface ProductsDTO {
    name: string;
    description: string;
    price: number;
    category: ICategoryRepository;
    id: string;
}