import React from "react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-200 to-amber-200 flex flex-col items-center justify-center font-mario text-brown-900 p-8 relative overflow-hidden">
     
      {/* Nubes decorativas estilo Mario */}
      <div className="absolute top-10 left-10 w-32 h-16 bg-white rounded-full opacity-70 blur-sm"></div>
      <div className="absolute top-24 right-16 w-24 h-10 bg-white rounded-full opacity-60 blur-sm"></div>
      {/* Suelo estilo Mario */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-amber-700 to-amber-400 flex items-end">
        <div className="w-full h-8 bg-amber-600 opacity-90"></div>
      </div>
      <header className="text-center mb-8 z-10">
        <h1 className="text-6xl font-extrabold tracking-widest drop-shadow-lg text-orange-500">
          Bienvenido a <span className="text-yellow-400">AIRA GAMES</span>
        </h1>
        <h2 className="text-2xl font-normal mt-4 drop-shadow text-orange-700">
          El memorama inspirado en{" "}
          <span className="text-yellow-500">Mario Bros</span> que te reta a dominar{" "}
          <span className="text-yellow-500">estructuras de datos</span>
        </h2>
      </header>
      <section className="bg-white/70 rounded-2xl p-8 max-w-lg shadow-2xl mb-8 z-10 border-4 border-orange-300">
        <p className="text-lg mb-6 text-orange-700 font-semibold">
           Pon a prueba tu memoria con cartas de los personajes de Mario Bros, sumergete en su increible mundo!!
        </p>
        <ul className="list-none p-0 m-0 space-y-2 text-lg text-orange-800">
          <li>🍄 Ejercita tu memoria como Mario y sus amigos</li>
          <li>⭐ Memoriza las cartas y consigue puntos</li>
          <li>🏆 Supera tus récords y desbloquea logros</li>
        </ul>
      </section>
      <a
        href="/game"
        className="bg-orange-400 text-white px-10 py-4 rounded-full font-extrabold text-2xl shadow-lg hover:bg-orange-300 hover:scale-105 transition-all duration-200 z-10 border-2 border-orange-600"
      >
        ¡Jugar ahora!
      </a>
      <footer className="mt-12 text-sm opacity-80 z-10 text-orange-900">
        © {new Date().getFullYear()} AIRA - Memorama de Estructuras de Datos
      </footer>
    </div>
  );
}