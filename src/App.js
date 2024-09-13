import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

const discounts = [
  { text: '10%', color: '#FF4136', textColor: 'white', probability: 0.2 },
  { text: '3%', color: '#0074D9', textColor: 'white', probability: 0.5 },
  { text: '5%', color: '#FFDC00', textColor: 'black', probability: 0.25 },
  { text: 'Tente', color: '#B10DC9', textColor: 'white', probability: 0.05 },
];

const DiscountRoulette = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const sliceDegree = 360 / discounts.length;

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Weighted random selection
    const random = Math.random();
    let cumulativeProbability = 0;
    let selectedIndex = 0;

    for (let i = 0; i < discounts.length; i++) {
      cumulativeProbability += discounts[i].probability;
      if (random <= cumulativeProbability) {
        selectedIndex = i;
        break;
      }
    }

    // Calculate rotation to land on the selected slice
    const randomSpins = Math.floor(Math.random() * 3) + 3; // Between 3 and 5 spins
    const totalRotation = randomSpins * 360;
    const finalRotation =
      totalRotation + selectedIndex * sliceDegree + sliceDegree / 2;

    setRotation((prev) => prev + finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(discounts[selectedIndex]);
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
            {discounts.map((discount, index) => {
              const { color, text, textColor } = discount;

              // Calculate start and end angles
              const startAngle = index * sliceDegree;
              const endAngle = startAngle + sliceDegree;
              const largeArcFlag = sliceDegree > 180 ? 1 : 0;

              // Convert angles to radians
              const startRadians = ((startAngle - 90) * Math.PI) / 180;
              const endRadians = ((endAngle - 90) * Math.PI) / 180;

              // Calculate coordinates for the arc
              const x1 = 50 + 50 * Math.cos(startRadians);
              const y1 = 50 + 50 * Math.sin(startRadians);
              const x2 = 50 + 50 * Math.cos(endRadians);
              const y2 = 50 + 50 * Math.sin(endRadians);

              // Calculate text position
              const textAngle = startAngle + sliceDegree / 2;
              const textRadians = ((textAngle - 90) * Math.PI) / 180;
              const textX = 50 + 35 * Math.cos(textRadians);
              const textY = 50 + 35 * Math.sin(textRadians);

              return (
                <g key={index}>
                  <path
                    d={`M50,50 L${x1},${y1} A50,50 0 ${largeArcFlag},1 ${x2},${y2} z`}
                    fill={color}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="5"
                    fontWeight="bold"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {text}
                  </text>
                  {text === 'Tente' && (
                    <text
                      x={textX}
                      y={textY + 5}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="5"
                      fontWeight="bold"
                      transform={`rotate(${textAngle}, ${textX}, ${
                        textY + 5
                      })`}
                    >
                      novamente
                    </text>
                  )}
                </g>
              );
            })}
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
        <div
          className="text-2xl font-bold text-center text-blue-800"
          role="alert"
          aria-live="assertive"
        >
          {result.text !== 'Tente'
            ? `Parabéns! Você ganhou ${result.text} de desconto!`
            : 'Tente novamente.'}
        </div>
      )}
    </div>
  );
};

export default DiscountRoulette;
