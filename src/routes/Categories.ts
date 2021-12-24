import { Router } from "express";
import { v4 as uuid } from "uuid";
import { CategoriesDTO } from "../DTOs"
import { ensuredAuthenticated } from "../middleware";


const categoryRouter = Router();

let categories: CategoriesDTO[] = [];


categoryRouter.get("/categories/findByName", (request, response) => {
    const { name } = request.query;
    const category = categories.filter(value => value.name.includes(String(name)));
    return response.json(category);
});

categoryRouter.get("/categories/:id", (request, response) => {
    const { id } = request.params;
    const categoryIndex = categories.findIndex(category => category.id === id);

    if (categoryIndex === -1) {
        return response.status(400).json({ message: "Category doesn't exists! "});
    }

    const category = categories.find(category => category.id === id);
    return response.json(category);
});

categoryRouter.post("/categories", ensuredAuthenticated, (request, response) =>{
    const { name, description } = request.body;

    const categoryAlreadyExists = categories.find(
        category => category.name === name
    );

    if(categoryAlreadyExists) {
        return response.status(400).json({ message: "Category Already exists! "});
    }

    const category: CategoriesDTO = {
        description,
        name,
        id: uuid(),
    };

    categories.push(category);
    return response.status(200).json(category);
});

categoryRouter.put("/categories/:id", ensuredAuthenticated, (request, response) =>{
    const { name, description } = request.body;
    const { id } = request.params;

    const categoryIndex = categories.findIndex(category => category.id === id);

    if (categoryIndex === -1) {
        return response.status(400).json({ message: "Category doesn't exists! "});
    }
    
    const category: CategoriesDTO = Object.assign({
        id,  
        description,
        name
    });

    categories[categoryIndex] = category;

    return response.status(200).json(category);
});

categoryRouter.delete("/categories/:id", ensuredAuthenticated, (request, response) =>{
    const { id } = request.params;

    const categoryIndex = categories.findIndex(category => category.id === id);

    if (categoryIndex === -1) {
        return response.status(400).json({ message: "Category doesn't exists! "});
    }
    
    categories = categories.filter((value, index, arr) => {
        return index !== categoryIndex;
    });

    return response.status(200).json({ message: "Category deleted." });
});

export { categoryRouter };