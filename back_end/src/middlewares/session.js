const response = require('../utils/response');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificar = async (ctx, next) => {
	const { authorization = null } = ctx.headers;
	if (!authorization) {
		return response(ctx, 403, 'Ação proibida');
	}

	const [bearer, token = null] = authorization.split(' ');

	try {
		const verification = await jwt.verify(token, process.env.JWT_SECRET);
		ctx.state.userId = verification.id;
		ctx.state.email = verification.email;
	} catch (err) {
		console.error(err);
		return response(ctx, 403, 'Ação proibida');
	}
	return next();
};

module.exports = { verificar };
