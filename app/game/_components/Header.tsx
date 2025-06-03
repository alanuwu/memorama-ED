import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-6 left-6 z-50 flex items-center space-x-6 bg-white/80 rounded-full px-8 py-4 shadow-lg border-2 border-orange-300">
      <Link href="/" className="flex items-center group">
        <Image
          src="/logo_principal_game.svg"
          width={72}
          height={72}
          alt="Logo AIRA"
          draggable={false}
          className="select-none drop-shadow-lg transition-transform group-hover:scale-110"
          priority
        />
        <span className="ml-4 text-xl font-extrabold text-orange-500 group-hover:text-orange-600 transition-colors hidden sm:inline">
          Inicio
        </span>
      </Link>
    </header>
  );
}
