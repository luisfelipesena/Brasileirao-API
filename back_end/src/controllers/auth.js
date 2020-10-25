const response = require('../utils/response');
const { obterUser } = require('../repositories/brasileirao');
const { compararSenhas } = require('../utils/password');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticar = async (ctx) => {
	const { email = null, password = null } = ctx.request.body;
	if (!email || !password) {
		return response(ctx, 400, 'Pedido mal formatado');
	}

	const user = await obterUser(email);

	if (user) {
		const comparacao = await compararSenhas(password, user.senha);
		if (comparacao) {
			const token = await jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET || 'cubosacademy',
				{
					expiresIn: `${process.env.EXPIRATION_TIME}` || '1h',
				}
			);
			return response(ctx, 200, { token });
		}
		response(ctx, 200, 'Senha incorreta');
	}
	response(ctx, 200, 'Email ou senha incorretos');
};

module.exports = { autenticar };
