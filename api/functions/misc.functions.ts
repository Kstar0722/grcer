import * as fs from 'fs-extra';
import * as path from 'path';
import Constants from '../misc/constants';
import axios from 'axios';

// VARIABLES
let main = Constants.misc.search;

class MiscAPI {

	async assets(req, res, next) {
		let prod = process.env.Environment = 'Production' ? 'dist/browser' : 'src';
		let reqPath = path.join(process.cwd(), `${prod}/assets/json/${req.params.asset}.json`);

		try {
			const json = await fs.readJson(reqPath)
			res.json(json);
		} catch (err) {
			next(err);
		}
	}

	async search(req, res, next) {
		try {
			const response = await axios.get(`${main}/${req.params.value}`);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}
}

export default new MiscAPI();
