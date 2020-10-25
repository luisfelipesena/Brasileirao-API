import React from "react";
import "./App.css";
import { EditarRodadas, formatarBotaoTabela } from "./components/components";
import {
  images,
  editarRodada,
  tentarLogar,
  rodadasTabela,
} from "./functions/functions";

require("dotenv").config();

function App() {
  // Objeto responsável pela ordenação da tabela e a setas correspondentes
  const [ordenacao, setOrdenacao] = React.useState({
    propriedade: "",
    valor: "",
  });

  const [email, setEmail] = React.useState(null); // Guarda o email posto no input
  const [senha, setSenha] = React.useState(null); // Guarda a senha posta no input
  const [logado, setLogado] = React.useState(null); // Enquanto deslogado = false; quando logado -> Guarda o Token de autenticação

  const [rodada, setRodada] = React.useState(1);
  const [jogosRodada, setJogosRodada] = React.useState([]);

  const [tabela, setTabela] = React.useState([]);
  const [editarPlacar, setEditarPlacar] = React.useState({
    //Objeto que define as imagens do checkbox (caneta,check) e o id do responsável pela mudança
    valor: null,
    id: null,
  });

  React.useEffect(() => {
    setJogosRodada(null);
    rodadasTabela(setTabela, setJogosRodada, rodada);
  }, [rodada]);

  return (
    <div className="App">
      <div className="main">
        <div className="header">
          <div className="conteudo">
            <a href="app.js" title="Menu Principal" className="page-landing">
              <img
                className="logoBr"
                src="http://cdn.bleacherreport.net/images/team_logos/328x328/brasileirao.png"
                alt="Logo"
                title="Logo Brasileirão"
              ></img>
              <h1>Brasileirão</h1>
            </a>
            <div className="direita">
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                }}
              >
                {!logado && (
                  <label>
                    <span>Email</span>
                    <input
                      style={
                        logado !== false
                          ? { margin: 0 }
                          : { background: "#ffd1d1" }
                      }
                      type="email"
                      onInput={(ev) => setEmail(ev.target.value)}
                    />
                  </label>
                )}
                {!logado && (
                  <label>
                    <span>Senha</span>
                    <input
                      style={
                        logado !== false
                          ? { margin: 0 }
                          : { background: "#ffd1d1" }
                      }
                      type="password"
                      onInput={(ev) => setSenha(ev.target.value)}
                    />
                  </label>
                )}

                <button
                  onClick={(ev) => {
                    if (ev.target.innerText === "Deslogar") {
                      setLogado(null);
                      setEmail(null);
                      setSenha(null);
                      const newPlacar = { ...editarPlacar, valor: null };
                      setEditarPlacar(newPlacar);
                      return;
                    }

                    tentarLogar(
                      email,
                      senha,
                      setLogado,
                      setEditarPlacar,
                      editarPlacar
                    );
                  }}
                >
                  {logado ? "Deslogar" : "Logar"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="colunas">
          <div className="centro">
            <div className="jogos">
              <div className="cabecalho">
                <button
                  title="Anterior"
                  onClick={(ev) => {
                    rodada === 1 ? (ev.disabled = true) : setRodada(rodada - 1);
                  }}
                >
                  <img src={images.setaEsquerda} alt="seta esquerda"></img>
                </button>

                <h2 className="rodada">
                  <span>{rodada}ª </span>rodada
                </h2>

                <button
                  title="Próxima"
                  onClick={(ev) => {
                    rodada === 38
                      ? (ev.disabled = true)
                      : setRodada(rodada + 1);
                  }}
                >
                  <img src={images.setaDireita} alt="seta direita"></img>
                </button>
              </div>

              <div className="jogosRodada">
                <table>
                  <tbody>
                    {jogosRodada === null || jogosRodada.length === 0 ? (
                      <tr>
                        <td className="carregando">Carregando ...</td>
                        <td>
                          <img
                            src="https://www.blogson.com.br/wp-content/uploads/2017/10/loading-2.gif"
                            alt="carregando"
                          ></img>
                        </td>
                      </tr>
                    ) : (
                      jogosRodada.map((jogo) => (
                        <EditarRodadas
                          key={jogo.id}
                          editarRodada={editarRodada}
                          rodadasTabela={rodadasTabela}
                          jogo={jogo}
                          editarPlacar={editarPlacar}
                          setEditarPlacar={setEditarPlacar}
                          logado={logado}
                          setTabela={setTabela}
                          setJogosRodada={setJogosRodada}
                          rodada={rodada}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="tabela">
              <table>
                <thead>
                  <tr>
                    <th>
                      <span className="posicao">Posição</span>
                      {formatarBotaoTabela(
                        setOrdenacao,
                        tabela,
                        ordenacao,
                        "posicao"
                      )}
                    </th>
                    <th className="time">
                      <span className="time">Time</span>
                      {formatarBotaoTabela(
                        setOrdenacao,
                        tabela,
                        ordenacao,
                        "nome"
                      )}
                    </th>
                    <th>
                      <span title="Pontos">PTS</span>
                      {formatarBotaoTabela(
                        setOrdenacao,
                        tabela,
                        ordenacao,
                        "pontos"
                      )}
                    </th>
                    <th>
                      <span title="Empates">E</span>
                      {formatarBotaoTabela(
                        setOrdenacao,
                        tabela,
                        ordenacao,
                        "empates"
                      )}
                    </th>
                    <th>
                      <span title="Vitórias">V</span>
                      {formatarBotaoTabela(
                        setOrdenacao,
                        tabela,
                        ordenacao,
                        "vitorias"
                      )}
                    </th>
                    <th>
                      <span title="Derrotas">D</span>
                      {formatarBotaoTabela(
                        setOrdenacao,
                        tabela,
                        ordenacao,
                        "derrotas"
                      )}
                    </th>
                    <th>
                      <span title="Gols Feitos">GF</span>
                      {formatarBotaoTabela(
                        setOrdenacao,
                        tabela,
                        ordenacao,
                        "gols_feitos"
                      )}
                    </th>
                    <th>
                      <span title="Gols Sofridos">GS</span>
                      {formatarBotaoTabela(
                        setOrdenacao,
                        tabela,
                        ordenacao,
                        "gols_sofridos"
                      )}
                    </th>
                    <th>
                      <span title="Saldo de Gols">SG</span>
                      {formatarBotaoTabela(
                        setOrdenacao,
                        tabela,
                        ordenacao,
                        "saldo_de_gols"
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tabela.length === 0 ? (
                    <tr>
                      <td className="carregando">Carregando ...</td>
                      <td>
                        <img
                          src="https://www.blogson.com.br/wp-content/uploads/2017/10/loading-2.gif"
                          alt="carregando"
                        ></img>
                      </td>
                    </tr>
                  ) : (
                    tabela.map((time) => (
                      <tr key={time.id}>
                        <td
                          className={
                            time.posicao <= 4
                              ? "libertadores"
                              : time.posicao >= 17
                              ? "rebaixamento"
                              : time.posicao > 4 && time.posicao <= 6
                              ? "prelibertadores"
                              : time.posicao > 6 && time.posicao <= 12
                              ? "americana"
                              : "permanece"
                          }
                        >
                          <img
                            className="icones"
                            src={time.link_imagem}
                            alt={time.nome}
                            title={time.nome}
                          ></img>

                          {Number(time.posicao) === 1 ? (
                            <img
                              title="Campeão"
                              className="lider"
                              src="http://clevervinicius.com.br/virtual/wp-content/uploads/2016/11/Trofeu_Campeonato-300x300.png"
                              alt="lider"
                            ></img>
                          ) : (
                            ""
                          )}

                          {time.posicao}
                        </td>
                        <td>{time.nome}</td>
                        <td>{time.pontos}</td>
                        <td>{time.empates}</td>
                        <td>{time.vitorias}</td>
                        <td>{time.derrotas}</td>
                        <td>{time.gols_feitos}</td>
                        <td>{time.gols_sofridos}</td>
                        <td>{time.saldo_de_gols}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="quadrados">
                <span className="quadrados">
                  <div className="verdeLiberta"></div>
                  <span>Libertadores</span>
                </span>
                <span className="quadrados">
                  <div className="azulPreLiberta"></div>
                  <span>Pré-libertadores</span>
                </span>
                <span className="quadrados">
                  <div className="amareloAmericana"></div>
                  <span>Sul-americana</span>
                </span>
                <span className="quadrados">
                  <div className="permaneceBlock"></div>
                  <span>Manteve</span>
                </span>
                <span className="quadrados">
                  <div className="vermelhoRebaixamento"></div>
                  <span>Rebaixamento</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <h3 title="Github">
          <span>Designed by</span>
          <a href="https://github.com/luisfelipesena"> Luis Felipe Sena</a>
        </h3>
      </div>
    </div>
  );
}

export default App;
