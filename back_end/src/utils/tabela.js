let times; // times == tabela

/**
 * Função que já formata a tabela baseada no banco de dados dos jogos;
 * Primeiro: zera o array times para evidar duplicações
 * Segundo: mapeia os jogosDb e vai computando os pontos de cada time;
 * Terceiro: ordena os times, salva suas logos e retorna a variável times que corresponde a tabela;
 */

const formatarTabela = async (jogos = null, images = null) => {
	times = [];
	const jogosDb = jogos;
	jogosDb.forEach((jogo) => {
		if (jogo.gols_casa > jogo.gols_visitante) {
			computarPontos(jogo.time_casa, 3, jogo.gols_casa, jogo.gols_visitante, 'v');
			computarPontos(jogo.time_visitante, 0, jogo.gols_visitante, jogo.gols_casa, 'd');
		} else if (jogo.gols_casa < jogo.gols_visitante) {
			computarPontos(jogo.time_casa, 0, jogo.gols_casa, jogo.gols_visitante, 'd');
			computarPontos(jogo.time_visitante, 3, jogo.gols_visitante, jogo.gols_casa, 'v');
		} else {
			computarPontos(jogo.time_casa, 1, jogo.gols_casa, jogo.gols_visitante, 'e');
			computarPontos(jogo.time_visitante, 1, jogo.gols_visitante, jogo.gols_casa, 'e');
		}
	});

	ordenarTimes(images);
	return times;
};

/**
 * Função que computa a pontuação de cada time e adiciona no array de times;
 * Siglas: "v" - vitória; "e" - empate; "d" - derrota;
 */

function computarPontos(time, pontos, golsFeitos, golsSofridos, sigla) {
	for (let i = 0; i < times.length; i++) {
		if (times[i].nome == time) {
			times[i].jogos++;
			times[i].gols_feitos += golsFeitos;
			times[i].gols_sofridos += golsSofridos;
			times[i].saldo_de_gols = times[i].gols_feitos - times[i].gols_sofridos;
			times[i].pontos += pontos;
			if (sigla === 'v') {
				times[i].vitorias++;
			} else if (sigla === 'd') {
				times[i].derrotas++;
			} else {
				times[i].empates++;
			}

			return;
		}
	}

	times.push({
		nome: time,
		jogos: 1,
		pontos: pontos,
		vitorias: sigla === 'v' ? 1 : 0,
		derrotas: sigla === 'd' ? 1 : 0,
		empates: sigla === 'e' ? 1 : 0,
		gols_feitos: golsFeitos,
		gols_sofridos: golsSofridos,
		saldo_de_gols: golsFeitos - golsSofridos,
	});
}

/**
 * `Função de ordena corretamente os times no Brasileirão`
 * 1: Salva as logos e a id dos times em seus respectivos objetos
 * 2: Ordena os times baseado nas regras do Brasileirão
 */
function ordenarTimes(images) {
	for (let x = 0; x < images.length; x++) {
		for (let time = 0; time < times.length; time++) {
			if (times[time].nome === images[x].time) {
				times[time] = {
					...times[time],
					id: images[x].id,
					link_imagem: images[x].link_imagem,
				};
			}
		}
	}
	times.sort((a, b) => {
		if (a.pontos > b.pontos) {
			return -1;
		} else if (a.pontos < b.pontos) {
			return 1;
		} else {
			if (a.vitorias > b.vitorias) {
				return -1;
			} else if (a.vitorias < b.vitorias) {
				return 1;
			} else {
				if (a.saldo > b.saldo) {
					return -1;
				} else if (a.saldo < b.saldo) {
					return 1;
				} else {
					if (a.gols_feitos > b.gols_feitos) {
						return -1;
					} else if (a.gols_feitos < b.gols_feitos) {
						return 1;
					} else {
						a.nome.localeCompare(b.nome);
					}
				}
			}
		}
	});
}

module.exports = { formatarTabela };
