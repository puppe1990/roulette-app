import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

const discounts = [
  { text: '10%', color: '#FF4136', textColor: 'white' },
  { text: '3%', color: '#0074D9', textColor: 'white' },
  { text: '5%', color: '#FFDC00', textColor: 'black' },
  { text: 'Tente', color: '#B10DC9', textColor: 'white' },
];

const DiscountRoulette = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Calculate a random rotation between 3 and 5 spins
    const randomSpins = Math.floor(Math.random() * 3) + 3;
    const totalRotation = randomSpins * 360;
    const sliceDegree = 360 / discounts.length;
    const randomSlice = Math.floor(Math.random() * discounts.length);
    const extraRotation = randomSlice * sliceDegree + sliceDegree / 2;

    const finalRotation = totalRotation + extraRotation;

    setRotation((prev) => prev + finalRotation);

    setTimeout(() => {
      setSpinning(false);
      const normalizedRotation = (rotation + finalRotation) % 360;
      const winningIndex =
        discounts.length - 1 - Math.floor(normalizedRotation / sliceDegree);
      setResult(discounts[winningIndex]);
    }, 3000); // Duration should match the CSS animation duration
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center">
        Promoção: Roleta de Desconto
      </h1>
      <div className="relative w-80 h-80 mb-8">
        <div
          className="w-full h-full rounded-full overflow-hidden shadow-lg"
          style={{
            transition: spinning
              ? 'transform 3s cubic-bezier(0.33, 1, 0.68, 1)'
              : 'none',
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {discounts.map((discount, index) => (
              <g key={index} transform={`rotate(${index * 90} 50 50)`}>
                <path
                  d="M50 50 L50 0 A50 50 0 0 1 100 50 Z"
                  fill={discount.color}
                />
                <text
                  x="50"
                  y="15"
                  textAnchor="middle"
                  fill={discount.textColor}
                  fontSize="8"
                  fontWeight="bold"
                  transform="rotate(45 50 15)"
                >
                  {discount.text}
                </text>
                {discount.text === 'Tente' && (
                  <text
                    x="50"
                    y="22"
                    textAnchor="middle"
                    fill={discount.textColor}
                    fontSize="8"
                    fontWeight="bold"
                    transform="rotate(45 50 22)"
                  >
                    novamente
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <ArrowDown size={48} className="text-blue-800" />
        </div>
      </div>
      <div className="text-center mb-8">
        <p className="text-xl mb-4 text-blue-700">
          Gire a roleta e ganhe na hora um super desconto!
        </p>
        <button
          onClick={spinWheel}
          disabled={spinning}
          className="px-8 py-3 bg-blue-600 text-white text-xl rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition"
        >
          {spinning ? 'Girando...' : 'Girar a Roleta'}
        </button>
      </div>
      {result && (
        <div className="text-2xl font-bold text-center text-blue-800">
          {result.text !== 'Tente'
            ? `Parabéns! Você ganhou ${result.text} de desconto!`
            : 'Tente novamente.'}
        </div>
      )}
    </div>
  );
};

export default DiscountRoulette;
