import { useState } from "react";

// Ícones SVG para simular o chip e o logo de contato
const CardChip = () => (
  <svg className="w-10 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="3" fill="#D4AF37" />
    <rect x="4" y="7" width="16" height="10" rx="2" fill="#FFD700" />
    <rect x="6" y="9" width="4" height="6" rx="1" fill="#D4AF37" />
    <path d="M12 12H18" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 9H18" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="15" cy="15" r="1.5" fill="#333" />
  </svg>
);

const ContactlessIcon = () => (
  <svg className="w-8 h-8 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" opacity="0" />
    <path d="M8 10h.01" />
    <path d="M4.24 7.76c2.1-2.1 5.5-2.1 7.6 0" />
    <path d="M19.76 7.76c-2.1-2.1-5.5-2.1-7.6 0" />
    <path d="M2.5 12c.7-3.6 3.9-6.5 7.8-6.5" />
    <path d="M13.7 5.5c3.9.7 6.9 3.6 7.8 6.5" />
  </svg>
);


export default function Cartoes() {
  const initialCards = [
    {
      id: 1,
      nome: "VICKTORIA",
      numero: "4567 89** **** 1234",
      validity: "12/28",
      cor: "from-blue-700 to-indigo-900",
      bandeira: "VISA" // Adicionei bandeira
    },
    {
      id: 2,
      nome: "BRUNA M PEREIRA",
      numero: "5412 77** **** 5678",
      validity: "08/27",
      cor: "from-red-600 to-purple-800",
      bandeira: "MASTERCARD"
    },
    {
      id: 3,
      nome: "DIEGO S LIMA",
      numero: "3745 61** **** 9012",
      validity: "03/30",
      cor: "from-green-600 to-teal-800",
      bandeira: "AMEX"
    },
    {
      id: 4,
      nome: "RODOLFO A V",
      numero: "6060 11** **** 9012",
      validity: "03/30",
      cor: "from-slate-600 to-gray-900",
      bandeira: "ELO"
    }
  ];

  const [cartoes, setCartoes] = useState(initialCards);

  // Estados do formulário e edição (mantidos iguais)
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cartaoEditando, setCartaoEditando] = useState(null);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    numero: "",
    validity: "",
    cor: "from-indigo-500 to-blue-700",
    bandeira: "VISA"
  });

  const abrirFormularioEdicao = (cartao) => {
    setCartaoEditando(cartao);
    setDadosFormulario(cartao);
    setMostrarFormulario(true);
  };

  const adicionarOuEditarCartao = () => {
    if (!dadosFormulario.nome || !dadosFormulario.numero || !dadosFormulario.validity) return;

    if (cartaoEditando) {
      const atualizados = cartoes.map((c) =>
        c.id === cartaoEditando.id ? { ...dadosFormulario, id: c.id } : c
      );
      setCartoes(atualizados);
    } else {
      const novo = {
        ...dadosFormulario,
        id: Date.now()
      };
      setCartoes([...cartoes, novo]);
    }

    setDadosFormulario({ nome: "", numero: "", validity: "", cor: "from-indigo-500 to-blue-700", bandeira: "VISA" });
    setCartaoEditando(null);
    setMostrarFormulario(false);
  };

  const removerCartao = (id) => {
    setCartoes(cartoes.filter((cartao) => cartao.id !== id));
  };

  return (
    // Fundo com gradiente elegante e altura mínima de tela
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-800 to-black text-white p-4 sm:p-8 font-sans">
      <div className="max-w-screen-md mx-auto">
        
        {/* Título e Botão de Adicionar */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200 drop-shadow-md">
            Minha Carteira
          </h1>
          <button
            onClick={() => {
              setMostrarFormulario(!mostrarFormulario);
              setCartaoEditando(null);
              setDadosFormulario({ nome: "", numero: "", validity: "", cor: "from-indigo-500 to-blue-700", bandeira: "VISA" });
            }}
            // Botão "+" com estilo chamativo
            className="bg-orange-500 text-white text-3xl font-light w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 active:scale-95"
            title="Adicionar novo cartão"
          >
            +
          </button>
        </div>

        {/* Formulário embutido com efeito frosted glass */}
        {mostrarFormulario && (
          <div className="mb-10 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 transition-all duration-500">
            <h2 className="text-xl font-semibold mb-4 text-orange-400">
              {cartaoEditando ? "Editar Cartão" : "Novo Cartão"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nome do Titular (Maiúsculas)"
                value={dadosFormulario.nome}
                onChange={(e) => setDadosFormulario({ ...dadosFormulario, nome: e.target.value.toUpperCase() })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-inner"
              />
              <input
                type="text"
                placeholder="Número do Cartão (Ex: **** **** **** 1234)"
                value={dadosFormulario.numero}
                onChange={(e) => setDadosFormulario({ ...dadosFormulario, numero: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-inner"
              />
              <input
                type="text"
                placeholder="Validade (MM/AA)"
                value={dadosFormulario.validity}
                onChange={(e) => setDadosFormulario({ ...dadosFormulario, validity: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-inner"
              />
              <select
                value={dadosFormulario.cor}
                onChange={(e) => setDadosFormulario({ ...dadosFormulario, cor: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-inner"
              >
                <option value="from-blue-700 to-indigo-900">Azul/Roxo (Padrão)</option>
                <option value="from-red-600 to-purple-800">Vermelho/Roxo (Vinho)</option>
                <option value="from-green-600 to-teal-800">Verde/Ciano (Esmeralda)</option>
                <option value="from-slate-600 to-gray-900">Cinza/Preto (Metal)</option>
                <option value="from-yellow-500 to-orange-700">Amarelo/Laranja (Ouro)</option>
              </select>
              <button
                onClick={adicionarOuEditarCartao}
                className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition font-semibold shadow-md mt-4 transform active:scale-[0.99]"
              >
                {cartaoEditando ? "Salvar Alterações" : "Adicionar Cartão"}
              </button>
            </div>
          </div>
        )}

        {/* Cartões Renderizados */}
        <div className="flex flex-col items-center gap-8">
          {cartoes.map((cartao) => (
            <div
              key={cartao.id}
              // Estilo de Cartão de Crédito Real: Tamanho, Gradiente e Sombra forte
              className={`w-80 h-48 relative bg-gradient-to-br ${cartao.cor} text-white 
                shadow-[0_20px_40px_rgba(0,0,0,0.5)] 
                rounded-xl p-6 hover:scale-[1.03] transition-all duration-500 cursor-pointer 
                font-mono tracking-wide overflow-hidden`}
            >
              {/* Efeito de Brilho Sutil (Lente) - Simula o plástico refletindo a luz */}
              <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                  background: 'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)'
                }}
              ></div>

              {/* Linha 1: Chip e Contato */}
              <div className="relative z-10 flex justify-between items-start mb-4">
                <CardChip />
                <ContactlessIcon />
              </div>

              {/* Linha 2: Número do Cartão */}
              <p className="relative z-10 text-xl tracking-[0.15em] font-semibold mb-3 pt-2 drop-shadow-md">
                {cartao.numero}
              </p>

              {/* Linha 3: Titular e Validade */}
              <div className="relative z-10 flex justify-between items-end text-sm font-light uppercase">
                <div>
                    <p className="text-[10px] opacity-80 mb-1">Titular</p>
                    <p className="text-base font-medium tracking-wider">{cartao.nome}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] opacity-80 mb-1">Válido Até</p>
                    <p className="text-base font-medium">{cartao.validity}</p>
                </div>
              </div>

              {/* Bandeira (Canto Inferior Direito) */}
              <div className="absolute bottom-4 right-4 text-xl font-bold italic opacity-90 drop-shadow-lg">
                {cartao.bandeira}
              </div>

              {/* Botões de Ação (Aparecem no topo) */}
              <div className="absolute top-0 right-0 p-2 flex gap-1 z-20 transition-opacity duration-300 opacity-0 hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que o clique no botão ative o cursor:pointer
                    abrirFormularioEdicao(cartao);
                  }}
                  className="bg-yellow-500/90 text-gray-900 text-xs px-3 py-1 rounded-full shadow-md hover:bg-yellow-400 transition transform active:scale-95"
                  title="Editar cartão"
                >
                  EDITAR
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removerCartao(cartao.id);
                  }}
                  className="bg-red-500/90 text-white text-xs px-3 py-1 rounded-full shadow-md hover:bg-red-600 transition transform active:scale-95"
                  title="Remover cartão"
                >
                  REMOVER
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
