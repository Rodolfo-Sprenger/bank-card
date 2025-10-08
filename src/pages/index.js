import Link from 'next/link';
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar validação se quiser
    router.push("/cartoes"); // Redireciona para a página de cartões
  };

  return (
    // Fundo com imagem, h-screen e rounded-3xl (se quiser na tela toda, remova o rounded-3xl)
    <div className="h-screen flex flex-col justify-center items-center text-white bg-cover bg-center bg-[url('/background.jpg')]">
      
      {/* Overlay Escuro para destacar o conteúdo, ocupando toda a tela */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Container principal e centralizado do formulário */}
      <div className="relative w-full max-w-sm mx-auto p-8 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        
        {/* Título com mais destaque */}
        <h1 className="text-6xl sm:text-7xl font-extrabold text-center mb-10 tracking-wider text-shadow-lg drop-shadow-lg">
          <span className="text-orange-400">Digi</span>-Wallet
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
          {/* Inputs com fundo branco-transparente e foco estilizado */}
          <input
            type="text"
            placeholder="Username"
            className="w-full px-5 py-3 text-lg rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-500 transition duration-300 shadow-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 text-lg rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-500 transition duration-300 shadow-md"
          />

          {/* Botão de Login com Gradiente, Sombra, Efeito de Pressionar e Hover */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-800 text-white text-xl font-bold rounded-xl mt-4 shadow-xl hover:shadow-2xl hover:from-orange-700 hover:to-orange-900 transition duration-300 transform active:scale-95"
          >
            Acessar
          </button>
        </form>

        {/* Link de Recuperação de Senha */}
        <div className="text-center mt-6">
          <Link
            href="/recuperar"
            className="text-sm font-medium text-white/80 hover:text-orange-300 transition duration-300 hover:underline"
          >
            Esqueceu a Senha?
          </Link>
        </div>
      </div>
    </div>
  );
}