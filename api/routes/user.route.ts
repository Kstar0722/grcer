import {
Router,
} from 'express';

import UsersAPI from '../functions/users.functions';

const routes = new Router();

routes.route('/email/:email').get(UsersAPI.getEmail);

// user lists
routes.route('/lists/:uid').get(UsersAPI.getLists);

// user list
routes.route('/list/:id').post(UsersAPI.postList);
routes.route('/list/:uid/:id')
.get(UsersAPI.getList)
.put(UsersAPI.updateList)
.delete(UsersAPI.deleteList);

// settings
routes.route('/profile/settings/:uid')
.get(UsersAPI.getSettings)
.put(UsersAPI.updateSettings)
.delete(UsersAPI.deleteList);

// profile
routes.route('/:uid')
.get(UsersAPI.getProfile)
.put(UsersAPI.updateProfile);

// PRODUCT INFORMATION
routes.route('/getUserInformation/:uid')
.get(UsersAPI.getUserInformation);

routes.route('/setProductStatusViewed')
.post(UsersAPI.productViewStatus);

routes.route('/saveProduct')
.post(UsersAPI.saveProduct);

routes.route('/:uid/deleteProduct/:productID')
.delete(UsersAPI.deleteProduct);

routes.route('/saveToWatchList')
.post(UsersAPI.saveToWatchList);

routes.route('/:uid/removeFromWatchList/:productID')
.delete(UsersAPI.removeFromWatchList);

routes.route('/saveToShoppingList')
.post(UsersAPI.saveToShoppingList);

export default routes;
