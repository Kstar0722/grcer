import {
Router,
} from 'express';

import TransactionsAPI from '../functions/transaction.functions';

const routes = new Router();

routes.route('/:uid')
.get(TransactionsAPI.getTransactions)
.post(TransactionsAPI.postTransaction);

routes.route('/:uid/:tid')
.get(TransactionsAPI.getTransaction)
.put(TransactionsAPI.updateTransaction);

export default routes;
