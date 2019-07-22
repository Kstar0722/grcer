import Constants from '../misc/constants';
import axios from 'axios';

let main = Constants.misc.api;

class ProductsAPI {

	async getProducts(req, res, next) {
		try {
			let request_url;

			request_url = (req.query.order === '') ?
									`${main}/products/all/?$filter=${req.query.id} eq ` +
									`${req.query.cat}${req.query.filter}&$page=${req.query.pag}&$pageSize=50` :
									`${main}/products/all/?$filter=${req.query.id} eq ${req.query.cat}` +
									`${req.query.filter}&$page=${req.query.pag}&${req.query.order}&$pageSize=50`;

			console.log('URL', request_url);
			const response = await axios.get(request_url);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async searchProducts(req, res, next) {
		try {
			let request_url;

			request_url = (req.query.category !== undefined
										&& req.query.category !== 0) ?
										`${main}/products/SearchResults?` +
										`category=${req.query.category}&$page=1&$pageSize=10&` +
										`search=${req.query.search}` :
										`${main}/products/SearchResults?type=${req.query.type}&$page=1` +
										`&$pageSize=10&search=${req.query.search}`;

			console.log('Search Products URL', request_url);
			const response = await axios.get(request_url);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getSidebarFilters(req, res, next) {
		try {
			const response = await axios.get(`${main}/products/sidebarFilters?$filter=${req.query.id} eq ${req.query.cat}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getProduct(req, res, next) {
		try {
			const response = await axios.get(`${main}/product/${req.params.upc}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getProductDetails(req, res, next) {
		try {
			console.log('Details', `${main}/products/${req.params.product_id}/details`);
			const response = await axios.get(`${main}/products/${req.params.product_id}/details`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getProductImages(req, res, next) {
		try {
			console.log('Carousel', `${main}/products/${req.params.product_id}/images`);
			const response = await axios.get(`${main}/products/${req.params.product_id}/images`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getProductNutrition(req, res, next) {
		try {
			console.log('Nutrition', `${main}/products/${req.params.product_id}/nutrition`);
			const response = await axios.get(`${main}/products/${req.params.product_id}/nutrition`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getProductVendors(req, res, next) {
		try {
			console.log('Vendors', `${main}/products/${req.params.product_id}/vendors`);
			const response = await axios.get(`${main}/products/${req.params.product_id}/vendors`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getProductOverview(req, res, next) {
		try {
			console.log('Overview', `${main}/products/${req.params.product_id}/overview`);
			const response = await axios.get(`${main}/products/${req.params.product_id}/overview`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async postFeedback(req, res, next) {
		try {
			const response = await axios.post(`${main}/feedback/`, req.body.obj);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}
}

export default new ProductsAPI();
