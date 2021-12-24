import { Router } from "express";
import { v4 as uuid } from "uuid";
import { ProductsDTO } from "../DTOs";
import { ensuredAuthenticated } from "../middleware";


const productRouter = Router();

let products: ProductsDTO[] = [];


productRouter.get("/products/findByName", (request, response) => {
    const { name } = request.query;
    const product = products.filter(value => value.name.includes(String(name)));
    return response.json(product);
});

productRouter.get("/products/:id", (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return response.status(400).json({ message: "Product doesn't exists! "});
    }
    
    const product = products.find(product => product.id === id);
    return response.json(product);
});

productRouter.post("/products", ensuredAuthenticated, (request, response) =>{
    const { name, description, price, category } = request.body;

    const productAlreadyExists = products.find(
        product => product.name === name
    );

    if(productAlreadyExists) {
        return response.status(400).json({ message: "Product Already exists! "});
    }


    const product: ProductsDTO = {
        description,
        name,
        price,
        category,
        id: uuid()
    };

    products.push(product);
    
    return response.status(200).json(product);
});

productRouter.put("/products/:id", ensuredAuthenticated, (request, response) =>{
    const { name, description, category } = request.body;
    const { id } = request.params;

    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return response.status(400).json({ message: "Product doesn't exists! "});
    }
    
    const product: ProductsDTO = Object.assign({
        id,  
        description,
        name,
        category,
    });

    products[productIndex] = product;

    return response.status(200).json(product);
});

productRouter.delete("/products/:id", ensuredAuthenticated, (request, response) =>{
    const { id } = request.params;

    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return response.status(400).json({ message: "Product doesn't exists! "});
    }
    
    products = products.filter( (value, index, arr) => {
        return index !== productIndex;
    });

    return response.status(200).json({ message: ' Product deleted.'});
});

export { productRouter };