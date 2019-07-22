import {
	Router,
} from 'express';

import ProductsAPI from '../functions/products.functions';

const routes = new Router();

routes.route('/').get(ProductsAPI.getProducts);

routes.route('/search').get(ProductsAPI.searchProducts);

routes.route('/sidebarFilters').get(ProductsAPI.getSidebarFilters);

routes.route('/:upc').get(ProductsAPI.getProduct);

// single product
routes.route('/product/details/:product_id')
	.get(ProductsAPI.getProductDetails);
routes.route('/product/images/:product_id')
	.get(ProductsAPI.getProductImages);
routes.route('/product/nutrition/:product_id')
	.get(ProductsAPI.getProductNutrition);
routes.route('/product/vendors/:product_id')
  .get(ProductsAPI.getProductVendors);
routes.route('/product/overview/:product_id')
	.get(ProductsAPI.getProductOverview);

// product feedback
routes.route('product/feedback').post(ProductsAPI.postFeedback);

export default routes;
