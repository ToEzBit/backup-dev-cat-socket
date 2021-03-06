const express = require("express");
const devPassportJwt = require("../middlewares/devPassportJwt");
const userPassportJwt = require("../middlewares/userPassportJwt");
const upload = require("../middlewares/upload");

const router = express.Router();

const productController = require("../controllers/productController");

router.post("/", devPassportJwt, productController.createProduct);
router.post(
  "/:productId/image",
  devPassportJwt,
  upload.fields([
    { name: "standard", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),

  productController.addProductImage
);
router.patch("/:productId", devPassportJwt, productController.updateProduct);
router.post(
  "/:productId/package",
  devPassportJwt,
  productController.addProductPackage
);
router.patch(
  "/package/:packageId",
  devPassportJwt,
  productController.updateProductPackage
);
router.post(
  "/package/:packageId/detail",
  devPassportJwt,
  productController.addPackageDetail
);
router.patch(
  "/package/detail/:detailId",
  devPassportJwt,
  productController.updatePackageDetail
);
router.post(
  "/:productId/review",
  userPassportJwt,
  productController.createProductReview
);
router.patch(
  "/review/:reviewId",
  userPassportJwt,
  productController.editProductReview
);
router.get("/", productController.getAllProducts);
router.get("/dev/:devId", productController.getAllDevProducts);
router.get("/:productId", productController.getProductById);
router.delete(
  "/image/:imageId",
  devPassportJwt,
  productController.deleteProductImage
);
router.delete(
  "/package-detail/:packageDetailId",
  devPassportJwt,
  productController.deletePackageDetail
);
router.delete(
  "/review/:reviewId",
  userPassportJwt,
  productController.deleteReview
);

module.exports = router;
