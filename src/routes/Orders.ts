import { Router } from "express";
import { v4 as uuid } from "uuid";
import { OrdersDTO } from "../DTOs";
import { ensuredAuthenticated } from "../middleware";


const orderRouter = Router();

let orders: OrdersDTO[] = [];

orderRouter.get("/orders", (request, response) => {
    return response.json(orders);
});

orderRouter.get("/orders/:id", (request, response) => {
    const { id } = request.params;
    const orderIndex = orders.findIndex(order => order.id === id);

    if (orderIndex === -1) {
        return response.status(400).json({ message: "Order doesn't exists! "});
    }

    const order = orders.find(order => order.id === id);
    return response.json(order);
});

orderRouter.post("/orders", ensuredAuthenticated, (request, response) =>{
    const { product } = request.body;

    const date = new Date().toISOString();

    const orderAlreadyExists = orders.find(
        order => order.date === date
    );

    if(orderAlreadyExists) {
        return response.status(400).json({ message: "Order Already exists! "});
    }

    const order: OrdersDTO = {
        date,
        product,
        id: uuid()
    };

    orders.push(order);
    
    return response.status(200).json(order);
});



orderRouter.delete("/orders/:id", ensuredAuthenticated, (request, response) =>{
    const { id } = request.params;

    const orderIndex = orders.findIndex(order => order.id === id);

    if (orderIndex === -1) {
        return response.status(400).json({ message: "Order doesn't exists! "});
    }
    
    orders = orders.filter((value, index, arr) => {
        return index !== orderIndex;
    });

    return response.status(200).json({ message: "Order deleted! "});
});


export { orderRouter };