import express from "express";
import multer from "multer";

import Product from "../models/product";
import {
  products_get_all,
  products_create_product,
  products_get_a_product,
  products_patch_product,
  products_delete_product
} from "../controllers/products";
import { checkAuth } from "../middleware/check-auth";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const filename = new Date().toDateString() + file.originalname;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // reject a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", products_get_all);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  products_create_product
);

router.get("/:productId", products_get_a_product);

// [
// 	{ "propName": "name", "value": "Harry Potter VI" }
// ]
router.patch("/:productId", products_patch_product);

router.delete("/:productId", products_delete_product);

export default router;
