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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-purple-200 font-sans">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Memory Game</h1>
      <div className="flex space-x-4 mb-8">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-300" onClick={() => startGame()}>Level 3</button>
      </div>
      <div className="text-2xl mb-4 text-gray-700">Score: {score}</div>
      <div className="text-2xl mb-4 text-gray-700">Moves: {moves}</div>
      <div className="text-2xl mb-4 text-gray-700">Time: {timer} seconds</div>
      <div className={`grid grid-cols-6 gap-4`}>
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