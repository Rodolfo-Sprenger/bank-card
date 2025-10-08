import { useState } from "react";

export default function Cartoes() {
  const [cartoes, setCartoes] = useState([
    {
      id: 1,
      nome: "Vicktoria",
      numero: "**** **** **** 1234",
      validity: "12/28",
      cor: "from-green-400 to-blue-800"
    },
    {
      id: 2,
      nome: "Bruna",
      numero: "**** **** **** 5678",
      validity: "08/27",
      cor: "from-pink-800 to-orange-600"
    },
    {
      id: 3,
      nome: "Diego",
      numero: "**** **** **** 9012",
      validity: "03/30",
      cor: "from-purple-700 to-green-600"
    },
    {
      id: 4,
      nome: "Rodolfo",
      numero: "**** **** **** 9012",
      validity: "03/30",
      cor: "from-purple-900 to-red-800"
    }
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cartaoEditando, setCartaoEditando] = useState(null);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    numero: "",
    validity: "",
    cor: "from-indigo-500 to-blue-700"
  });

  const abrirFormularioEdicao = (cartao) => {
    setCartaoEditando(cartao);
    setDadosFormulario(cartao);
    setMostrarFormulario(true);
  };

  const adicionarOuEditarCartao = () => {
    if (!dadosFormulario.nome || !dadosFormulario.numero || !dadosFormulario.validity) return;

    if (cartaoEditando) {
      // Editar cartão existente
      const atualizados = cartoes.map((c) =>
        c.id === cartaoEditando.id ? { ...dadosFormulario, id: c.id } : c
      );
      setCartoes(atualizados);
    } else {
      // Adicionar novo cartão
      const novo = {
        ...dadosFormulario,
        id: Date.now()
      };
      setCartoes([...cartoes, novo]);
    }

    setDadosFormulario({ nome: "", numero: "", validity: "", cor: "from-indigo-500 to-blue-700" });
    setCartaoEditando(null);
    setMostrarFormulario(false);
  };

  const removerCartao = (id) => {
    setCartoes(cartoes.filter((cartao) => cartao.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-300 to-rose-800 text-white p-4 rounded-3xl">
      <div className="max-w-screen-md mx-auto">
        {/* Título + botão “+” no topo */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-center text-white p-4 drop-shadow-lg">My Cards</h1>
          <button
            onClick={() => {
              setMostrarFormulario(!mostrarFormulario);
              setCartaoEditando(null);
              setDadosFormulario({ nome: "", numero: "", validity: "", cor: "from-indigo-500 to-blue-700" });
            }}
            className="bg-white text-blue-800 text-xl font-bold w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-200 transition"
            title="Adicionar cartão"
          >
            +
          </button>
        </div>

        {/* Formulário embutido */}
        {mostrarFormulario && (
          <div className="mb-10 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20">
            <h2 className="text-xl font-semibold mb-4 text-white">
              {cartaoEditando ? "Editar Cartão" : "Novo Cartão"}
            </h2>
            <input
              type="text"
              placeholder="Nome"
              value={dadosFormulario.nome}
              onChange={(e) => setDadosFormulario({ ...dadosFormulario, nome: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="text"
              placeholder="Número"
              value={dadosFormulario.numero}
              onChange={(e) => setDadosFormulario({ ...dadosFormulario, numero: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="text"
              placeholder="validity"
              value={dadosFormulario.validity}
              onChange={(e) => setDadosFormulario({ ...dadosFormulario, validity: e.target.value })}
              className="w-full mb-4 px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={adicionarOuEditarCartao}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {cartaoEditando ? "Salvar Alterações" : "Adicionar"}
            </button>
          </div>
        )}

        {/* Cartões em coluna */}
        <div className="flex flex-col items-center gap-6">
          {cartoes.map((cartao) => (
            <div
              key={cartao.id}
              className={`w-80 bg-gradient-to-r ${cartao.cor} text-white shadow-2xl rounded-2xl p-6 min-h-[180px] hover:scale-105 transition-transform cursor-pointer relative`}
            >
              <h2 className="text-2xl font-bold mb-2">{cartao.nome}</h2>
              <p className="text-lg tracking-widest font-mono">{cartao.numero}</p>
              <p className="text-sm mt-2 opacity-80">validity: {cartao.validity}</p>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => abrirFormularioEdicao(cartao)}
                  className="bg-yellow-800 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600 transition"
                  title="Editar cartão"
                >
                  Edit
                </button>
                <button
                  onClick={() => removerCartao(cartao.id)}
                  className="bg-red-800 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition"
                  title="Remover cartão"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
