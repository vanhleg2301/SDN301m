import express from "express";
import productController from "../controller/product.js";

const productRouter = express.Router();

// Get All Products
productRouter.get("/", (productController.getAllProducts))


// Get Product By Id
productRouter.get("/:id", (productController.getProductById))

export default productRouter;
