const db = require('./database');
const fs = require('fs');
const util = require('util');
const lerArquivo = util.promisify(fs.readFile); // Para ler o arquivo sql que insere jogo a jogo nas tabelas criadas abaixo e o link da logo de cada time

const schema = {
	1: `CREATE TABLE IF NOT EXISTS jogos (
			id serial,
			time_casa varchar(255),
			time_visitante varchar(255),
			gols_casa int,
			gols_visitante int,
			rodada int
	);`,

	2: `CREATE TABLE IF NOT EXISTS users (
			id serial,
			email varchar(255),
			senha varchar(255)
	);`,

	3: `CREATE TABLE IF NOT EXISTS times (
		id SERIAL,
		time varchar(255),
		link_imagem varchar(255)
	);`,
};

/**
 * Função exclusiva que adiciona na tabela jogos um sql inserindo os dados jogo a jogo
 * e inseri na tabela times, o nome do time e seus respectivos links de logo
 * Para evitar duplicações, é necessário apagar as tabelas e fazer uma reinserção
 */
const leiturasSql = async () => {
	await drop('jogos');
	await up(1);
	await drop('times');
	await up(3);
	let sql = await lerArquivo('./jogos.sql');
	await db.query(sql.toString());
	sql = await lerArquivo('./linkImagens.sql');
	console.log('Schema.js rodado');
	return db.query(sql.toString());
};

const up = async (number = null) => {
	if (!number) {
		for (const value in schema) {
			await db.query({ text: schema[value] });
		}
	} else {
		await db.query({ text: schema[number] });
	}
};

const drop = async (table = null) => {
	if (table) {
		const query = `DROP TABLE ${table} `;
		return db.query(query);
	}
};

/**
 * Criar as tabelas
 */
up()
	/**
	 * Insere na tabela jogos o seu sql com jogo a jogo e na tabela times, o seu nome e o link da sua logo
	 */
	.then(() => leiturasSql());

/**
 * Caso queira deletar uma tabela específica
 */
// drop(nomeDaTabela)
