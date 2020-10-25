const PORT = process.env.PORT || 8081;

const images = {
  setaEsquerda: "https://systemuicons.com/images/icons/arrow_left.svg",
  setaDireita: "https://systemuicons.com/images/icons/arrow_right.svg",
  setaBaixo: "https://systemuicons.com/images/icons/arrow_down.svg",
  setaCima: "https://systemuicons.com/images/icons/arrow_up.svg",
  setaDupla: "https://systemuicons.com/images/icons/sort.svg",
  check: "https://systemuicons.com/images/icons/check.svg",
  caneta: "https://systemuicons.com/images/icons/pen.svg",
};

/**
 * Para fazer requisições POST, PUT, DELETE, etc
 */
function fazerRequisicaoComBody(url, metodo, conteudo, token = null) {
  return fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
    },
    body: JSON.stringify(conteudo),
  });
}

/**
 * Função que obtém a tabela de times do Back-end
 */
async function obterTabela() {
  const result = await fazerRequisicaoComBody(
    `http://localhost:${PORT}/classificacao`,
    "GET"
  );
  return result.json();
}

/**
 * Função que obtém os jogos da rodada do Back-end
 */
async function obterRodada(rodada) {
  const result = await fazerRequisicaoComBody(
    `http://localhost:${PORT}/jogos/${rodada}`,
    "GET"
  );
  return result.json();
}

/**
 * Função que edita os jogos de uma rodada no banco de dados
 */
async function editarRodada(id, golsCasa = 0, golsVisitante = 0, token) {
  await fazerRequisicaoComBody(
    `http://localhost:${PORT}/jogos`,
    "POST",
    {
      id,
      golsCasa,
      golsVisitante,
    },
    token
  );
}

/**
 * Função que deleta jogos de uma rodada no banco de dados
 */
async function deletarJogo(id, token) {
  const result = await fazerRequisicaoComBody(
    `http://localhost:${PORT}/jogos/${id}`,
    "DELETE",
    {
      id,
    },
    token
  );
  return result.json();
}

/**
 * Função que realiza a autenticação dos dados do input com os users Db
 */
async function autenticar(email = null, password = null) {
  if (!email || !password) {
    return false;
  }

  const objetoJson = {
    email,
    password,
  };

  const result = await fazerRequisicaoComBody(
    `http://localhost:${PORT}/auth`,
    "POST",
    objetoJson
  );

  const dados = await result.json();
  if (dados.dados.token) {
    return dados.dados.token;
  } else {
    return false;
  }
}

/**
 * Função que analisa o estado de ordenação para caso seja igual a propriedade (posição, time ...), retorne a imagem correspondente
 * e reorganiza a tabela baseada na ordenação e prop
 */
function ordenarSetas(ordenacao, prop, tabela) {
  if (ordenacao.propriedade === prop) {
    if (ordenacao.valor === "crescente") {
      if (prop === "nome") {
        tabela.sort((a, b) => b[prop].localeCompare(a[prop]));
      } else {
        tabela.sort((a, b) => b[prop] - a[prop]);
      }
      return images.setaCima;
    } else {
      if (prop === "nome") {
        tabela.sort((a, b) => a[prop].localeCompare(b[prop]));
      } else {
        tabela.sort((a, b) => a[prop] - b[prop]);
      }
      return images.setaBaixo;
    }
  }
  return false;
}

/**
 * Função que retorna um novo objeto com a propriedade valor modificada, consequentemente mudando a imagem das setas
 */
function organizarSetas(ordenacao, prop) {
  const { ...novoObj } = ordenacao;
  novoObj.propriedade = prop;
  novoObj.valor = novoObj.valor === "crescente" ? "decrescente" : "crescente";
  return novoObj;
}

/**
 * Função que trabalha sobre o login do usuário e a possibilidade de edição dos resultados
 */
async function tentarLogar(
  email,
  senha,
  setLogado,
  setEditarPlacar,
  editarPlacar
) {
  autenticar(email, senha).then((res) => {
    if (res !== false) {
      setLogado(res);
      const newPlacar = { ...editarPlacar, valor: "caneta" };
      setEditarPlacar(newPlacar);
    } else {
      setLogado(false);
    }
  });
}

/**
 * Função que obtem rodada e depois refaz a tabela caso haja mudanças
 */
async function rodadasTabela(setTabela, setJogosRodada, rodada) {
  obterRodada(rodada)
    .then((respJson) => {
      setJogosRodada(respJson.dados);
      return;
    })
    .then(() => {
      let tempTabela = [];
      obterTabela().then((respJson) => {
        respJson.dados.forEach((time, i) => {
          tempTabela.push({ ...time, posicao: i + 1 });
        });
        setTabela(tempTabela);
      });
    });
}

export {
  images,
  obterTabela,
  obterRodada,
  editarRodada,
  autenticar,
  ordenarSetas,
  organizarSetas,
  tentarLogar,
  rodadasTabela,
  deletarJogo,
};
