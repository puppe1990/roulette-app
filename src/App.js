import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

const discounts = [
  { text: '30% OFF', probability: 0.01, color: '#ff7ab5', textColor: 'black' },
  { text: 'TENTE NOVAMENTE', probability: 0.1199, color: '#ffd2e6', textColor: 'black' },
  { text: '20% OFF', probability: 0.04, color: '#ff7ab5', textColor: 'black' },
  { text: '15% OFF', probability: 0.14, color: '#ffd2e6', textColor: 'black' },
  { text: '15% OFF', probability: 0.15, color: '#ff7ab5', textColor: 'black' },
  { text: '5% OFF', probability: 0.12, color: '#ffd2e6', textColor: 'black' },
  { text: '5% OFF', probability: 0.10, color: '#ff7ab5', textColor: 'black' },
  { text: 'FRETE GRÁTIS', probability: 0.045, color: '#ffd2e6', textColor: 'black' },
  { text: 'FRETE GRÁTIS', probability: 0.065, color: '#ff7ab5', textColor: 'black' },
  { text: 'BRINDE DE SKIN CARE', probability: 0.05, color: '#ffd2e6', textColor: 'black' },
  { text: 'VESTIDO DA NOVA COLEÇÃO', probability: 0.0002, color: '#ff7ab5', textColor: 'black' },
  { text: 'TENTE NOVAMENTE', probability: 0.1599, color: '#ffd2e6', textColor: 'black' },
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

    // Adjust the rotation to align the selected slice under the arrow
    const targetSliceRotation = selectedIndex * sliceDegree + sliceDegree / 2;
    const finalRotation = totalRotation + (360 - targetSliceRotation);

    setRotation((prev) => prev + finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(discounts[selectedIndex]);
    }, 3000); // Duration should match the CSS animation duration
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#ffdce3' }}>
      <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#cf0265' }}>
        Roleta da Sorte Purchase Store - Dia do Cliente
      </h1>
      <div className="relative w-80 h-80 mb-8">
        {/* Position the arrow above the wheel */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
          <ArrowDown size={48} className="text-black" />
        </div>
        <div
          className="w-full h-full rounded-full overflow-hidden shadow-lg"
          style={{
            transition: spinning ? 'transform 3s cubic-bezier(0.33, 1, 0.68, 1)' : 'none',
            transform: `rotate(${rotation}deg)`,
            border: `8px solid #cf0265`,
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
              const textX = 50 + 30 * Math.cos(textRadians);
              const textY = 50 + 30 * Math.sin(textRadians);

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
                    fontSize="4"
                    fontWeight="bold"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {text}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <div className="text-center mb-8">
        <p className="text-xl mb-4" style={{ color: '#cf0265' }}>
          Gire a roleta e ganhe na hora um super desconto!
        </p>
        <button
          onClick={spinWheel}
          disabled={spinning}
          className="px-8 py-3 text-white text-xl rounded-full focus:outline-none focus:ring-4 disabled:opacity-50 transition"
          style={{
            backgroundColor: '#cf0265',
          }}
        >
          {spinning ? 'Girando...' : 'Girar a Roleta'}
        </button>
      </div>
      {result && (
        <div
          className="text-2xl font-bold text-center"
          role="alert"
          aria-live="assertive"
          style={{ color: '#cf0265' }}
        >
          {result.text !== 'TENTE NOVAMENTE'
            ? `Parabéns! Você ganhou ${result.text}!`
            : 'Tente novamente.'}
        </div>
      )}
    </div>
  );
};

export default DiscountRoulette;
