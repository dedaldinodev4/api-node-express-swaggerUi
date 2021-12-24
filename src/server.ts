import express from "express"
import { productRouter, categoryRouter, orderRouter } from "./routes"
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

const app = express();


app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (request, response) => {
    return response.json({
        message: 'Termos de Serviço',
    });
});

app.use("/v1", productRouter);
app.use("/v1", categoryRouter);
app.use("/v1", orderRouter);

app.listen(process.env.PORT_APP, () => 
    console.log(`Server is running on port ${process.env.PORT_APP}`)
);