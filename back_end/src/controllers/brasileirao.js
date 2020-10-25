const response = require('../utils/response');
const Brasileirao = require('../repositories/brasileirao');
const { formatarTabela } = require('../utils/tabela');

const obterClassificacao = async (ctx) => {
	const tabela = await Brasileirao.obterTabela();
	return response(ctx, 200, tabela);
};

const obterJogosRodada = async (ctx) => {
	const { rodada = null } = ctx.params;
	if (!rodada) {
		return response(ctx, 400, 'Rodada não encontrada');
	}
	const result = await Brasileirao.obterJogosRodada(rodada);
	return response(ctx, 200, result);
};

/**
 * 1: Atualiza os jogos no banco de dados
 * 2: Obtem os jogos e os times e suas logos nas tabelas de jogos e times, respectivamente
 * 3: Formatam a tabela baseada nessa nova edição dos jogos e salva as logos nos objetos
 */
const editarPlacar = async (ctx) => {
	const { id = null, golsCasa = null, golsVisitante = null } = ctx.request.body;
	if (id === null || golsCasa === null || golsVisitante === null) {
		return response(ctx, 400, 'Placar mal formatado');
	}
	const result = await Brasileirao.editarPlacar(id, golsCasa, golsVisitante);
	const jogos = await Brasileirao.obterJogos();
	const images = await Brasileirao.obterTimes();
	await formatarTabela(jogos, images);
	return response(ctx, 200, result);
};

const deletarJogo = async (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const result = await Brasileirao.deletarJogo(id);
		return response(ctx, 200, result);
	}
};

module.exports = { obterClassificacao, obterJogosRodada, editarPlacar, deletarJogo };
