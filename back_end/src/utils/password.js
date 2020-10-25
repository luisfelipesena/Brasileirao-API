const bycrypt = require('bcryptjs');

const compararSenhas = async (password, hash) => {
	const comparacao = await bycrypt.compare(password, hash);
	return comparacao;
};

const encriptarSenha = async (password) => {
	const hash = await bycrypt.hash(password, 10);
	return hash;
};

module.exports = { compararSenhas, encriptarSenha };
