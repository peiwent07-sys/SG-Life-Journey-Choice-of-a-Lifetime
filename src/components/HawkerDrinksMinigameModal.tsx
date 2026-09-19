import React, { useState } from 'react';
import { Coffee, CheckCircle, Sparkles, X, Heart, Utensils } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HawkerDrinksMinigameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (energyBoost: number, healthBoost: number) => void;
}

interface DrinkOrder {
  prompt: string;
  description: string;
  correctDrink: string;
  options: { name: string; desc: string }[];
}

const DRINK_ORDERS: DrinkOrder[] = [
  {
    prompt: 'Kopi with evaporated milk and ice, less sweet!',
    description: 'A classic afternoon energiser before exam revision.',
    correctDrink: 'Kopi C Peng Siew Dai',
    options: [
      { name: 'Kopi C Peng Siew Dai', desc: 'Coffee + Evaporated Milk + Ice + Less Sugar' },
      { name: 'Kopi O Kosong', desc: 'Black Coffee, No Milk, No Sugar' },
      { name: 'Teh Tarik Peng', desc: 'Pulled Milk Tea with Ice' },
      { name: 'Kopi Gu You', desc: 'Traditional Nanyang Coffee with Butter' }
    ]
  },
  {
    prompt: 'Hot black tea with completely zero sugar!',
    description: 'Clean antioxidant herbal brew loved by uncles and students alike.',
    correctDrink: 'Teh O Kosong',
    options: [
      { name: 'Teh Tarik', desc: 'Sweet Pulled Tea with Condensed Milk' },
      { name: 'Teh O Kosong', desc: 'Fragrant Black Tea without Milk or Sugar' },
      { name: 'Kopi C', desc: 'Coffee with Evaporated Milk and Sugar' },
      { name: 'Milo Dinosaur', desc: 'Iced Milo piled high with undissolved powder' }
    ]
  },
  {
    prompt: 'Iced chocolate malt loaded with extra raw Milo powder on top!',
    description: 'The ultimate Singapore comfort beverage after sports training!',
    correctDrink: 'Milo Dinosaur',
    options: [
      { name: 'Kopi O Peng', desc: 'Iced Black Coffee with Sugar' },
      { name: 'Bandung', desc: 'Rose Syrup Milk Drink' },
      { name: 'Milo Dinosaur', desc: 'Thick Iced Milo topped with heaps of rich chocolate malt powder' },
      { name: 'Teh C Siew Dai', desc: 'Tea with Evaporated Milk, Less Sugar' }
    ]
  }
];

export const HawkerDrinksMinigameModal: React.FC<HawkerDrinksMinigameModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [orderIndex] = useState(() => Math.floor(Math.random() * DRINK_ORDERS.length));
  const currentOrder = DRINK_ORDERS[orderIndex];
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  if (!isOpen) return null;

  const handleSelect = (drinkName: string) => {
    setSelectedChoice(drinkName);
    if (drinkName === currentOrder.correctDrink) {
      soundEngine.playResistSuccess();
      setResult('correct');
    } else {
      soundEngine.playClick();
      setResult('wrong');
    }
  };

  const handleClaim = () => {
    onSuccess(25, 10);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-lg bg-[#24170d] border-3 border-[#855223] rounded-xl shadow-2xl overflow-hidden flex flex-col text-stone-100">
        {/* Header */}
        <div className="px-4 py-3 bg-[#3d2310] border-b-2 border-[#543315] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-amber-400" />
            <div>
              <span className="font-pixel text-[8px] text-amber-400/80 uppercase tracking-wider block">
                Hawker Centre Kopi Stall Mini-Game
              </span>
              <h2 className="font-pixel text-xs text-amber-100 font-bold">
                Singaporean Drink Ordering
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 bg-[#24170d] hover:bg-[#543315] text-amber-200 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3.5">
          {/* Uncle Sprite & Dialogue */}
          <div className="flex items-start gap-3 p-3 bg-[#191009] border border-[#543315] rounded-lg">
            {/* Kopitiam Uncle Avatar */}
            <div className="w-14 h-14 rounded-lg bg-[#2e1d10] border-2 border-amber-600/70 shrink-0 flex items-center justify-center overflow-hidden relative shadow-inner">
              <div className="w-8 h-8 rounded-full bg-[#fed7aa] relative flex items-center justify-center">
                {/* Hair & glasses */}
                <div className="absolute -top-1 w-9 h-4 bg-[#64748b] rounded-t-full" />
                <div className="w-2.5 h-1.5 border border-stone-800 rounded-xs mx-0.5 mt-1" />
                <div className="w-2.5 h-1.5 border border-stone-800 rounded-xs mx-0.5 mt-1" />
              </div>
              {/* White singlet & good morning towel */}
              <div className="absolute bottom-0 w-10 h-4 bg-white rounded-t-sm" />
              <div className="absolute bottom-0 right-1 w-2 h-6 bg-red-600" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-pixel text-[9px] text-amber-400">
                Ah Seng (Drinks Stall Uncle):
              </span>
              <p className="font-sans-sg text-xs text-stone-200 leading-relaxed italic">
                "{currentOrder.prompt}"
              </p>
              <span className="text-[10px] text-stone-400">
                {currentOrder.description}
              </span>
            </div>
          </div>

          {/* Prompt */}
          <span className="font-pixel text-[8px] text-amber-300 tracking-wider uppercase">
            What is the correct Singaporean Kopitiam order?
          </span>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2">
            {currentOrder.options.map(opt => {
              const isSelected = selectedChoice === opt.name;
              let btnStyle = 'bg-[#2f1c0f] border-[#5e3818] hover:bg-[#3d2413] text-stone-200';
              if (result && isSelected) {
                btnStyle = result === 'correct'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100'
                  : 'bg-rose-950/80 border-rose-500 text-rose-100';
              } else if (result === 'wrong' && opt.name === currentOrder.correctDrink) {
                btnStyle = 'bg-amber-950/60 border-amber-500/70 text-amber-200';
              }

              return (
                <button
                  key={opt.name}
                  type="button"
                  disabled={Boolean(result)}
                  onClick={() => handleSelect(opt.name)}
                  className={`p-2.5 rounded-lg border-2 text-left transition flex items-start gap-2.5 ${btnStyle}`}
                >
                  <Coffee className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <strong className="font-pixel text-[9px]">{opt.name}</strong>
                    <span className="text-[10px] text-stone-400">{opt.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Rewards */}
          {result === 'correct' && (
            <div className="p-3 bg-emerald-950/80 border-2 border-emerald-500 rounded-lg flex flex-col gap-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                <span className="font-pixel text-[9px] font-bold">
                  Swee lah! Order perfectly understood by Uncle!
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/90 leading-snug">
                The rich, authentic aroma of freshly brewed coffee restores your stamina and sharpens your spirits!
              </p>
              <div className="flex items-center gap-3 text-[10px] font-pixel text-amber-300 pt-1">
                <span className="flex items-center gap-1 text-amber-400">
                  <Utensils className="w-3 h-3" /> +25 Energy
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <Heart className="w-3 h-3" /> +10 Health
                </span>
              </div>
              <button
                type="button"
                onClick={handleClaim}
                className="mt-1 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-[9px] rounded transition shadow"
              >
                Enjoy Drink & Continue
              </button>
            </div>
          )}

          {result === 'wrong' && (
            <div className="p-3 bg-rose-950/80 border-2 border-rose-500 rounded-lg flex flex-col gap-2 animate-fadeIn">
              <span className="font-pixel text-[9px] text-rose-300 font-bold">
                Aiyah! Wrong order!
              </span>
              <p className="text-[11px] text-rose-200 leading-snug">
                Uncle scratched his head: "Huh boy, you said {selectedChoice}? The correct order is <strong>{currentOrder.correctDrink}</strong>!"
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedChoice(null);
                  setResult(null);
                }}
                className="mt-1 w-full py-2 bg-[#543315] hover:bg-[#6e4118] text-amber-200 font-pixel text-[8px] rounded transition"
              >
                Try Ordering Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
