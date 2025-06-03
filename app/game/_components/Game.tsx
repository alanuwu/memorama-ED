'use client';
import React, { useState, useEffect } from 'react';
import Card from './Card';

const Game: React.FC = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(3);
  const [bestTimes, setBestTimes] = useState<{[key: number]: number}>({});
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [foundPairs, setFoundPairs] = useState<boolean[]>([]);
  const numberOfPairs = 8;

  useEffect(() => {
    loadBestTimes();
  }, []);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  const startGame = () => {
    setCards(generateCards(numberOfPairs));
    setFlipped(Array(numberOfPairs * 2).fill(false));
    setMoves(0);
    setScore(0);
    setTimer(0);
    setIsRunning(true);
    setFoundPairs(Array(numberOfPairs).fill(false));
  };

  const generateCards = (numberOfPairs: number): number[] => {
    const cardValues: number[] = [];
    for (let i = 1; i <= numberOfPairs; i++) {
      cardValues.push(i, i);
    }
    return shuffle(cardValues);
  };

  const shuffle = (array: number[]): number[] => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (index: number) => {
    if (flipped[index]) return;

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
    setMoves(moves + 1);

    const flippedCards = newFlipped.reduce((acc: number[], curr: boolean, i: number) => {
      if (curr) acc.push(i);
      return acc;
    }, []);

    if (flippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = flippedCards;
      if (cards[firstCardIndex] === cards[secondCardIndex]) {
        setScore(score + 100);
        const pairValue = cards[firstCardIndex];
        const pairIndex = Math.floor(pairValue) - 1;

        const newFoundPairs = [...foundPairs];
        newFoundPairs[pairIndex] = true;
        setFoundPairs(newFoundPairs);

        const newFlippedAll = [...flipped];
        newFlippedAll[firstCardIndex] = true;
        newFlippedAll[secondCardIndex] = true;
        setFlipped(newFlippedAll);
      } else {
        setTimeout(() => {
          const resetFlipped = [...flipped];
          resetFlipped[firstCardIndex] = false;
          resetFlipped[secondCardIndex] = false;
          setFlipped(resetFlipped);
        }, 1000);
      }
    } else if (flippedCards.length > 2) {
        const [firstCardIndex, secondCardIndex, ...rest] = flippedCards;
        const resetFlipped = [...flipped];
        resetFlipped[firstCardIndex] = false;
        resetFlipped[secondCardIndex] = false;
        setFlipped(resetFlipped);
    }
  };

  const loadBestTimes = () => {
    const storedTimes = localStorage.getItem('bestTimes');
    if (storedTimes) {
      setBestTimes(JSON.parse(storedTimes));
    }
  };

  const saveBestTime = (level: number, time: number) => {
    const updatedBestTimes = {...bestTimes, [level]: time};
    setBestTimes(updatedBestTimes);
    localStorage.setItem('bestTimes', JSON.stringify(updatedBestTimes));
  };

  useEffect(() => {
    const allPairsFound = foundPairs.every(pair => pair === true);
    if (allPairsFound && isRunning) {
      setIsRunning(false);
      if (!bestTimes[level] || timer < bestTimes[level]) {
        saveBestTime(level, timer);
        alert(`New best time for level ${level}: ${timer} seconds!`);
      } else {
        alert(`You completed level ${level} in ${timer} seconds!`);
      }
    }
  }, [score, level, timer, isRunning, bestTimes, foundPairs, cards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-blue-100 to-yellow-200 font-mario relative overflow-hidden">
      {/* Nubes decorativas */}
      <div className="absolute top-8 left-8 w-32 h-16 bg-white rounded-full opacity-60 blur-sm"></div>
      <div className="absolute top-20 right-16 w-24 h-10 bg-white rounded-full opacity-50 blur-sm"></div>
      {/* Suelo estilo Mario */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-yellow-700 to-yellow-400 flex items-end z-0">
        <div className="w-full h-8 bg-yellow-600 opacity-80"></div>
      </div>
      <h1 className="text-6xl font-extrabold mb-10 text-yellow-500 drop-shadow-lg z-10 tracking-widest">
        Memorama AIRA
      </h1>
      {/* Panel de datos */}
      <div className="flex flex-row items-center justify-center gap-8 mb-8 z-10">
        <div className="bg-white/80 rounded-2xl px-8 py-4 shadow-xl border-4 border-yellow-300 flex flex-col items-center min-w-[140px]">
          <span className="text-lg font-bold text-yellow-700 mb-1">Puntuación</span>
          <span className="text-3xl font-extrabold text-yellow-900">{score}</span>
        </div>
        <div className="bg-white/80 rounded-2xl px-8 py-4 shadow-xl border-4 border-blue-300 flex flex-col items-center min-w-[140px]">
          <span className="text-lg font-bold text-blue-700 mb-1">Movimientos</span>
          <span className="text-3xl font-extrabold text-blue-900">{moves}</span>
        </div>
        <div className="bg-white/80 rounded-2xl px-8 py-4 shadow-xl border-4 border-green-300 flex flex-col items-center min-w-[140px]">
          <span className="text-lg font-bold text-green-700 mb-1">Tiempo</span>
          <span className="text-3xl font-extrabold text-green-900">{timer} s</span>
        </div>
      </div>
      {/* Botón de nivel */}
      <div className="flex space-x-4 mb-8 z-10">
        <button
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-extrabold py-3 px-8 rounded-full shadow-lg border-2 border-yellow-600 text-xl transition-all duration-200"
          onClick={() => startGame()}
        >
          Reiniciar Nivel
        </button>
      </div>
      {/* Grid de cartas */}
      <div className="grid grid-cols-6 gap-4 z-10">
        {cards.map((value, index) => {
          const pairIndex = Math.floor(value) - 1;
          const isFound = foundPairs[pairIndex];
          return (
            <Card
              key={index}
              value={value}
              isFlipped={flipped[index]}
              onClick={() => handleCardClick(index)}
              isFound={isFound}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Game;