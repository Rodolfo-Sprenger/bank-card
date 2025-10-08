import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  // Função para checar se o link é o ativo, para dar destaque
  const isActive = (path) => router.pathname === path;

  return (
    // Fundo escuro (gray-900), com um toque de borda sutil na parte inferior para profundidade
    <nav className="bg-gray-900/95 text-white p-4 flex justify-between items-center shadow-lg border-b border-gray-700/50 backdrop-blur-sm fixed w-full z-50 top-0">
      
      {/* Logotipo Digi-Wallet com destaque em laranja */}
      <Link href="/" className="text-2xl font-extrabold tracking-wider">
        <span className="text-orange-400">MB</span>-Wallet
      </Link>

      {/* Links de navegação */}
      <div className="flex space-x-8 text-lg font-medium">
        
        {/* Link 'Início' */}
        <Link 
          href="/home" 
          className={
            isActive('/home') 
              ? 'text-orange-400 border-b-2 border-orange-500 pb-1 transition duration-200' 
              : 'text-white/80 hover:text-orange-400 transition duration-200'
          }
        >
          Profile
        </Link>
        
        {/* Link 'Cartões' (assumindo que seja uma rota principal) */}
        <Link 
          href="/cartoes" 
          className={
            isActive('/cartoes') 
              ? 'text-orange-400 border-b-2 border-orange-500 pb-1 transition duration-200' 
              : 'text-white/80 hover:text-orange-400 transition duration-200'
          }
        >
          Cards
        </Link>
        
        {/* Link 'Extrato' (ou outra seção importante) */}
        <Link 
          href="/extrato" 
          className={
            isActive('/extrato') 
              ? 'text-orange-400 border-b-2 border-orange-500 pb-1 transition duration-200' 
              : 'text-white/80 hover:text-orange-400 transition duration-200'
          }
        >
          Info
        </Link>
        
      </div>
    </nav>
  );
}