import Constants from '../misc/constants';
import axios from 'axios';

let main = Constants.misc.api;

class UsersAPI {

	async getUserInformation(req, res, next) {
		try {
			console.log('User information', `${main}/users/${req.params.uid}`);
			const response = await axios.get(`${main}/users/${req.params.uid}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getEmail(req, res, next) {
		try {
			const response = await axios.get(`${main}/getEmail/${req.params.email}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getLists(req, res, next) {
		try {
			const response = await axios.get(`${main}/user/${req.params.uid}/lists/`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async postList(req, res, next) {
		try {
			const response = await axios.post(`${main}/profile/${req.params.id}/lists/`, req.body.obj);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getList(req, res, next) {
		try {
			const response = await axios.get(`${main}/profile/${req.params.uid}/lists/${req.params.id}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateList(req, res, next) {
		try {
			const response = await axios.put(`${main}/profile/${req.params.uid}/lists/${req.params.id}`, req.body.obj);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteList (req, res, next) {
		try {
			const response = await axios.delete(`${main}/profile/${req.params.uid}/lists/${req.params.id}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getSettings(req, res, next) {
		try {
			const response = await axios.get(`${main}/user/${req.params.uid}/settings`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateSettings(req, res, next) {
		try {
			const response = await axios.put(`${main}/user/${req.params.uid}/settings`, req.body.obj);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getProfile(req, res, next) {
		try {
			const response = await axios.get(`${main}/user/${req.params.uid}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateProfile(req, res, next) {
		try {
			const response = await axios.put(`${main}/user/${req.params.uid}/profile`, req.body.obj);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async productViewStatus(req, res, next) {
		try {
			console.log('Product Viewed API', `${main}/users/${req.body.uid}/viewed/${req.body.productID}`);
			const response = await axios.post(`${main}/users/${req.body.uid}/viewed/${req.body.productID}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async saveProduct(req, res, next) {
		try {
			console.log('Save product API', `${main}/users/${req.body.uid}/save/${req.body.productID}`);
			const response = await axios.post(`${main}/users/${req.body.uid}/save/${req.body.productID}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteProduct(req, res, next) {
		try {
			console.log('Delete product API', `${main}/users/${req.params.uid}/save/${req.params.productID}`);
			const response = await axios.delete(`${main}/users/${req.params.uid}/save/${req.params.productID}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async saveToWatchList(req, res, next) {
		try {
			console.log('WatchList API', `${main}/users/${req.body.uid}/watchlist/${req.body.productID}`);
			const response = await axios.post(`${main}/users/${req.body.uid}/watchlist/${req.body.productID}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async removeFromWatchList(req, res, next) {
		try {
			console.log('Remove From WatchList API', `${main}/users/${req.params.uid}/watchlist/${req.params.productID}`);
			const response = await axios.delete(`${main}/users/${req.params.uid}/watchlist/${req.params.productID}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async saveToShoppingList(req, res, next) {
		try {
			console.log('Shopping List API', `${main}/users/${req.body.uid}/shopping-list/${req.body.productID}`);
			const response = await axios.post(`${main}/users/${req.body.uid}/shopping-list/${req.body.productID}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

}

export default new UsersAPI();
