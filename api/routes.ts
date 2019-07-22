import { Router } from 'express';

import MiscRoutes from './routes/misc.route';
import ProductRoutes from './routes/product.route';
import SearchRoutes from './routes/search.route';
import TransactionRoutes from './routes/transaction.route';
import UserRoutes from './routes/user.route';
import errorHandler from './misc/error-handler';
export const routes = new Router();

// Misc routes
routes.use('/misc', MiscRoutes);

// Products Routes
routes.use('/products', ProductRoutes);

// Search Routes
routes.use('/search', SearchRoutes);

// Users Routes
routes.use('/users', UserRoutes);

// Transaction Routes
routes.use('/transactions', TransactionRoutes);

routes.use(errorHandler);

export default routes;
