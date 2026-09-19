import React, { useState } from 'react';
import { ShieldCheck, GraduationCap, CheckCircle, X, Trophy } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface VoidDeckChessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (acadBoost: number, resBoost: number) => void;
}

export const VoidDeckChessModal: React.FC<VoidDeckChessModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [selectedMove, setSelectedMove] = useState<string | null>(null);
  const [status, setStatus] = useState<'correct' | 'wrong' | null>(null);

  if (!isOpen) return null;

  // The 1-move checkmate puzzle:
  // White: Queen on f5, King on g6, Pawn on h6.
  // Black: King on h8, Pawn on g7.
  // Solution: Queen to h7# (protected by King on g6 and pawn, delivering unstoppable checkmate!)
  const moves = [
    {
      id: 'Qh7',
      label: 'Queen moves to h7 (Qh7#)',
      desc: 'Deliver checkmate on h7, solidly supported by the White King on g6!',
      isCorrect: true
    },
    {
      id: 'Qf8',
      label: 'Queen moves to f8 (Qf8+)',
      desc: 'Checks the Black King, but Black King escapes to h7.',
      isCorrect: false
    },
    {
      id: 'Qe5',
      label: 'Queen moves to e5 (Qe5)',
      desc: 'Centralizes the Queen, giving Black time to defend with g6.',
      isCorrect: false
    }
  ];

  const handlePickMove = (id: string, isCorrect: boolean) => {
    setSelectedMove(id);
    if (isCorrect) {
      soundEngine.playResistSuccess();
      setStatus('correct');
    } else {
      soundEngine.playClick();
      setStatus('wrong');
    }
  };

  const handleClaim = () => {
    onSuccess(20, 15);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-lg bg-[#1c1917] border-3 border-[#78716c] rounded-xl shadow-2xl overflow-hidden flex flex-col text-stone-100">
        {/* Header */}
        <div className="px-4 py-3 bg-[#292524] border-b-2 border-[#57534e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <span className="font-pixel text-[8px] text-amber-400/80 uppercase tracking-wider block">
                HDB Void Deck Terrazzo Chess Table
              </span>
              <h2 className="font-pixel text-xs text-stone-100 font-bold">
                Void Deck Chess: 1-Move Checkmate
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 bg-[#1c1917] hover:bg-[#44403c] text-stone-300 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3.5">
          {/* Uncle & Board Story */}
          <div className="flex items-start gap-3 p-3 bg-[#0c0a09] border border-[#44403c] rounded-lg">
            <div className="w-14 h-14 rounded-lg bg-[#292524] border border-stone-600 shrink-0 flex items-center justify-center relative shadow-inner">
              {/* Chess King Icon */}
              <div className="text-2xl">♟️</div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-pixel text-[9px] text-amber-400">
                Uncle Tan (Retired Maritime Engineer):
              </span>
              <p className="font-sans-sg text-xs text-stone-300 leading-relaxed">
                "Ah Boy/Girl! Take a seat on the stone stool. Look at this position on the terrazzo board. White to play and deliver instant checkmate in ONE move. Find the winning continuation!"
              </p>
            </div>
          </div>

          {/* Graphical Chessboard Visualizer (Authentic 4x4 Focus Area) */}
          <div className="flex items-center justify-center py-2">
            <div className="p-2 bg-[#44403c] border-2 border-[#a8a29e] rounded-md shadow-lg">
              <div className="grid grid-cols-4 gap-0 border border-stone-900">
                {/* 4x4 tactical grid around e6-h8 */}
                {[
                  // Row 8: [e8, f8, g8, h8 (Black King)]
                  { sq: 'e8', col: '#cbd5e1', piece: '' },
                  { sq: 'f8', col: '#78716c', piece: '' },
                  { sq: 'g8', col: '#cbd5e1', piece: '' },
                  { sq: 'h8', col: '#78716c', piece: '♚' }, // Black King
                  // Row 7: [e7, f7, g7 (Black Pawn), h7 (Target Checkmate!)]
                  { sq: 'e7', col: '#78716c', piece: '' },
                  { sq: 'f7', col: '#cbd5e1', piece: '' },
                  { sq: 'g7', col: '#78716c', piece: '♟' },
                  { sq: 'h7', col: '#cbd5e1', piece: selectedMove === 'Qh7' ? '♛' : '★' },
                  // Row 6: [e6, f6, g6 (White King), h6 (White Pawn)]
                  { sq: 'e6', col: '#cbd5e1', piece: '' },
                  { sq: 'f6', col: '#78716c', piece: '' },
                  { sq: 'g6', col: '#cbd5e1', piece: '♔' }, // White King protecting h7
                  { sq: 'h6', col: '#78716c', piece: '♙' }, // White Pawn
                  // Row 5: [e5, f5 (White Queen), g5, h5]
                  { sq: 'e5', col: '#78716c', piece: '' },
                  { sq: 'f5', col: '#cbd5e1', piece: selectedMove === 'Qh7' ? '' : '♕' }, // White Queen
                  { sq: 'g5', col: '#78716c', piece: '' },
                  { sq: 'h5', col: '#cbd5e1', piece: '' },
                ].map((c, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: c.col }}
                    className="w-12 h-12 flex items-center justify-center text-xl font-bold text-stone-900 border border-stone-800/30 relative"
                  >
                    {c.piece === '★' ? (
                      <span className="text-amber-600 text-xs animate-pulse">★ h7</span>
                    ) : (
                      c.piece
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[8px] font-pixel text-stone-300 pt-1 px-1">
                <span>e-file to h-file</span>
                <span>White to move & checkmate</span>
              </div>
            </div>
          </div>

          {/* Move Choices */}
          <div className="grid grid-cols-1 gap-2">
            {moves.map(m => {
              const isSelected = selectedMove === m.id;
              let style = 'bg-[#292524] border-[#57534e] hover:bg-[#3d3835] text-stone-200';
              if (status && isSelected) {
                style = status === 'correct'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100'
                  : 'bg-rose-950/80 border-rose-500 text-rose-100';
              }

              return (
                <button
                  key={m.id}
                  type="button"
                  disabled={Boolean(status)}
                  onClick={() => handlePickMove(m.id, m.isCorrect)}
                  className={`p-2.5 rounded-lg border-2 text-left transition flex items-start gap-2.5 ${style}`}
                >
                  <span className="font-pixel text-[8px] px-1.5 py-0.5 rounded bg-stone-800 text-amber-300 mt-0.5 shrink-0">
                    MOVE
                  </span>
                  <div className="flex flex-col">
                    <strong className="font-pixel text-[9px]">{m.label}</strong>
                    <span className="text-[10px] text-stone-400">{m.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Result */}
          {status === 'correct' && (
            <div className="p-3 bg-emerald-950/80 border-2 border-emerald-500 rounded-lg flex flex-col gap-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                <span className="font-pixel text-[9px] font-bold">
                  CHECKMATE! Brilliant tactical foresight!
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/90 leading-snug">
                Uncle Tan slaps his knee in delight: "Wah, sharp eye ah! The Queen cuts off all retreat while your King safeguards the square. True discipline!"
              </p>
              <div className="flex items-center gap-3 text-[10px] font-pixel text-amber-300 pt-1">
                <span className="flex items-center gap-1 text-cyan-400">
                  <GraduationCap className="w-3 h-3" /> +20 Academics
                </span>
                <span className="flex items-center gap-1 text-purple-400">
                  <ShieldCheck className="w-3 h-3" /> +15 Resilience
                </span>
              </div>
              <button
                type="button"
                onClick={handleClaim}
                className="mt-1 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-[9px] rounded transition shadow"
              >
                Thank Uncle Tan & Continue
              </button>
            </div>
          )}

          {status === 'wrong' && (
            <div className="p-3 bg-rose-950/80 border-2 border-rose-500 rounded-lg flex flex-col gap-2 animate-fadeIn">
              <span className="font-pixel text-[9px] text-rose-300 font-bold">
                Not quite! Black's King slips away!
              </span>
              <p className="text-[11px] text-rose-200 leading-snug">
                Uncle Tan smiles gently: "Take another look at the h7 square. Can the Queen land there with royal protection?"
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedMove(null);
                  setStatus(null);
                }}
                className="mt-1 w-full py-2 bg-[#44403c] hover:bg-[#57534e] text-stone-200 font-pixel text-[8px] rounded transition"
              >
                Try Another Move
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
