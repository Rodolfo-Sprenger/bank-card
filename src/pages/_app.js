import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    // 1. Fundo escuro total: min-h-screen e bg-gray-900. 
    // Garante que o fundo preto cubra toda a tela, resolvendo a questão do fundo branco.
    <div className="min-h-screen bg-gray-900 flex flex-col">
      
      {/* 2. Incluindo a Navbar fixa no topo */}
      <Navbar />

      {/* 3. Container principal para as páginas. O pt-20 é essencial para deixar espaço para a Navbar fixa. */}
      {/* max-w-7xl centraliza o conteúdo em telas grandes, e px-4 adiciona padding lateral. */}
      <main className="flex-grow container mx-auto max-w-7xl px-4 pt-20 pb-8"> 
        <Component {...pageProps} />
      </main>
      
      {/* 4. Incluindo o Footer */}
      <Footer />
      
    </div>
  );
}