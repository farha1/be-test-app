import express, { Request, Response } from "express";
import { getProduct } from "../src/modules/product/productController";
import { placeOrder } from "../src/modules/order/orderController";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express on Vercell");
});
app.get("/products", getProduct);
app.post("/order", placeOrder);

app.listen(8080, () => console.log("Server ready on port 8080."));

module.exports = app;
