import { Router } from "express";
import organizations from "./organizations";
import beverages from "./beverages";
import cart from "./cart";
import orders from "./orders";
import groupOrders from "./group-orders";

const router = Router();
const v1Router = Router();

// set up prefix for v1
router.use("/api/v1", v1Router);

v1Router.use("/organizations", organizations);
v1Router.use("/beverages", beverages);
v1Router.use("/cart", cart);
v1Router.use("/orders", orders);
v1Router.use("/group-orders", groupOrders);

export default router;