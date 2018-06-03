import express from "express";
import { orders_get_all, orders_create_order, orders_get_order, orders_delete_order } from "../controllers/orders";
import { checkAuth } from "../middleware/check-auth";

const router = express.Router();

// Handle incoming GET requests to /orders
router.get("/", checkAuth, orders_get_all);

router.post("/", checkAuth, orders_create_order);

router.get("/:orderId", checkAuth, orders_get_order);

router.delete("/:orderId", checkAuth, orders_delete_order);

export default router;
