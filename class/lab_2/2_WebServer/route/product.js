import express from "express";
import { productController } from "../controllers/index.js";

// Khai báo đối tượng router
const productRouter = express.Router();

// Tiến hành định tuyến theo URI
// GET: Get all products
productRouter.get("/", productController.getAllProducts);

// GET: Get Product by Id
productRouter.get("/:id", productController.getProductById);

// POST: Create a new Product
productRouter.post("/", productController.createProduct);

//Edit
productRouter.put("/:id", productController.updateProductById);
// delete
productRouter.delete("/:id", productController.deleteProductById);
export default productRouter;
