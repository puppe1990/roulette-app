import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

const discounts = [
  { text: '30% OFF', probability: 0.01, code: 'SDC30', color: '#ff7ab5', textColor: 'black' },
  { text: 'TENTE\nNOVAMENTE', probability: 0.1199, code: '', color: '#ffd2e6', textColor: 'black' },
  { text: '5% OFF', probability: 0.10, code: '5FJK', color: '#ff7ab5', textColor: 'black' },
  { text: 'FRETE\nGRÁTIS', probability: 0.065, code: 'FRTFR0', color: '#ffd2e6', textColor: 'black' },
  { text: '15% OFF', probability: 0.15, code: 'PAPUA15', color: '#ff7ab5', textColor: 'black' },
  { text: '5% OFF', probability: 0.12, code: 'SMLL5', color: '#ffd2e6', textColor: 'black' },
  { text: '20% OFF', probability: 0.04, code: 'SVT20', color: '#ff7ab5', textColor: 'black' },
  { text: 'FRETE\nGRÁTIS', probability: 0.045, code: 'G7KL', color: '#ffd2e6', textColor: 'black' },
  { text: '15% OFF', probability: 0.14, code: 'KJIOI15', color: '#ff7ab5', textColor: 'black' },
  { text: 'BRINDE DE\nSKIN CARE', probability: 0.05, code: 'SKNBS0', color: '#ffd2e6', textColor: 'black' },
  { text: 'VESTIDO DA\nNOVA COLEÇÃO', probability: 0.0002, code: 'YRGTT73', color: '#ff7ab5', textColor: 'black' },
  { text: 'TENTE\nNOVAMENTE', probability: 0.1599, code: '', color: '#ffd2e6', textColor: 'black' },
];

const DiscountRoulette = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const sliceDegree = 360 / discounts.length;
  const SPIN_DURATION = 3000; // in milliseconds

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
    const randomSpins = Math.floor(Math.random() * 3) + 5; // Between 5 and 7 spins
    const totalRotation = randomSpins * 360;

    // Adjust the rotation to align the selected slice under the arrow
    const targetSliceRotation = selectedIndex * sliceDegree + sliceDegree / 2;
    const currentRotation = rotation % 360; // Normalize current rotation to [0, 360)
    const rotateBy = totalRotation + (360 - targetSliceRotation) - currentRotation;

    setRotation((prev) => prev + rotateBy);

    setTimeout(() => {
      setSpinning(false);
      setResult(discounts[selectedIndex]);
    }, SPIN_DURATION);
  };

  // Function to copy the coupon code
  const copyCode = () => {
    if (result && result.code) {
      navigator.clipboard.writeText(result.code)
        .then(() => {
          alert('Código copiado para a área de transferência!');
        })
        .catch(() => {
          alert('Não foi possível copiar o código. Por favor, copie manualmente.');
        });
    }
  };

  const specialPrizes = ['BRINDE DE\nSKIN CARE', 'VESTIDO DA\nNOVA COLEÇÃO'];

  // Determine if the button should be disabled
  const isButtonDisabled = spinning || (result && result.text !== 'TENTE\nNOVAMENTE');

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: '#ffdce3' }}
    >
      <h1
        className="text-2xl sm:text-4xl font-bold mb-8 text-center"
        style={{ color: '#cf0265' }}
      >
        Roleta da Sorte Purchase Store - Dia do Cliente
      </h1>
      <div
        className="relative mb-8"
        style={{
          width: '90vw',
          height: '90vw',
          maxWidth: '500px',
          maxHeight: '500px',
        }}
      >
        {/* Position the arrow above the wheel */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10"
          style={{ width: '10%', maxWidth: '48px' }}
        >
          <ArrowDown className="w-full h-auto text-black" />
        </div>
        <div
          className="w-full h-full rounded-full overflow-hidden shadow-lg"
          style={{
            transition: spinning
              ? `transform ${SPIN_DURATION}ms cubic-bezier(0.33, 1, 0.68, 1)`
              : 'none',
            transform: `rotate(${rotation}deg)`,
            border: '8px solid #cf0265',
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

              // Calculate text position closer to the center
              const textAngle = startAngle + sliceDegree / 2;
              const textRadians = ((textAngle - 90) * Math.PI) / 180;
              const textX = 50 + 25 * Math.cos(textRadians);
              const textY = 50 + 25 * Math.sin(textRadians);

              // Determine font size based on text length
              let fontSize = 3.5;
              const textLength = text.replace('\n', '').length;
              if (textLength > 10) {
                fontSize = 3;
              }
              if (textLength > 15) {
                fontSize = 2.5;
              }

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
                    fontSize={fontSize}
                    fontWeight="bold"
                    transform={`rotate(${textAngle}, ${textX}, ${textY}) rotate(90, ${textX}, ${textY})`}
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    {text.split('\n').map((line, i) => (
                      <tspan key={i} x={textX} dy={i === 0 ? '0em' : '1.2em'}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <div className="text-center mb-8">
        <p className="text-lg sm:text-xl mb-4" style={{ color: '#cf0265' }}>
          Gire a roleta e ganhe na hora um super desconto na próxima compra!
        </p>
        <button
          onClick={spinWheel}
          disabled={isButtonDisabled}
          className={`px-6 sm:px-8 py-2 sm:py-3 text-white text-lg sm:text-xl rounded-full focus:outline-none focus:ring-4 transition ${
            isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            backgroundColor: '#cf0265',
          }}
        >
          {spinning ? 'Girando...' : 'Girar a Roleta'}
        </button>
      </div>
      {result && (
        <div
          className="text-xl sm:text-2xl font-bold text-center space-y-4"
          role="alert"
          aria-live="assertive"
          style={{ color: '#cf0265' }}
        >
          {result.text !== 'TENTE\nNOVAMENTE' ? (
            <>
              <p>
                Parabéns! Você ganhou {result.text.replace('\n', ' ')}
                {specialPrizes.includes(result.text) ? ' na próxima compra' : ''}!
              </p>
              {result.code && (
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2">
                    <span>Código:</span>
                    <span className="font-mono px-2 py-1 bg-gray-200 rounded">
                      {result.code}
                    </span>
                    <button
                      onClick={copyCode}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                      Copiar
                    </button>
                  </div>
                  <a
                    href="https://www.purchasestore.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                  >
                    Usar Cupom
                  </a>
                </div>
              )}
            </>
          ) : (
            <p>Tente novamente.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscountRoulette;
