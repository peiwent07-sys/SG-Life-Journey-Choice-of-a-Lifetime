import React from 'react';
import { GameRoom, LifeStageKey } from '../types';
import { MapPin, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface InitialSceneSelectorModalProps {
  stage: LifeStageKey;
  pathwayTitle?: string | null;
  availableRooms: GameRoom[];
  onSelectRoom: (roomId: string) => void;
}

export const InitialSceneSelectorModal: React.FC<InitialSceneSelectorModalProps> = ({
  stage,
  pathwayTitle,
  availableRooms,
  onSelectRoom
}) => {
  const getStageName = (s: LifeStageKey) => {
    if (pathwayTitle) return pathwayTitle;
    switch (s) {
      case 'primary': return 'Primary School Stage';
      case 'secondary': return 'Secondary School Stage';
      case 'tertiary': return 'Tertiary Education Stage';
      case 'adult': return 'Adulthood & Career Stage';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 select-none animate-fadeIn">
      <div className="pixel-box max-w-xl w-full p-5 text-stone-900 rounded-lg shadow-2xl flex flex-col gap-3.5 border-4 border-[#543315] bg-[#edd2af]">
        <div className="flex items-center justify-between border-b-2 border-[#543315] pb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-900" />
            <span className="font-pixel text-[11px] font-bold text-[#2e190b]">
              SELECT YOUR STARTING SCENE
            </span>
          </div>
          <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-[#543315] text-amber-200 uppercase">
            {getStageName(stage)}
          </span>
        </div>

        <p className="font-sans-sg text-xs text-stone-800 leading-snug">
          Where would you like to begin your journey in this stage? You can freely explore, converse with residents, or quick travel to other neighbourhood spots at any time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {availableRooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onSelectRoom(room.id);
              }}
              className="p-3 bg-[#fdf6ec] border-2 border-[#855223] hover:border-[#543315] hover:bg-[#faebd7] active:translate-y-0.5 rounded-md text-left flex flex-col justify-between transition shadow-sm group"
            >
              <div className="flex flex-col">
                <span className="font-pixel text-[9px] text-[#543315] font-bold group-hover:text-amber-900">
                  {room.name}
                </span>
                {room.landmark && (
                  <span className="font-sans-sg text-[11px] text-stone-600 line-clamp-1 mt-0.5">
                    {room.landmark}
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between text-[8px] font-pixel text-emerald-800 border-t border-[#855223]/20 pt-1.5">
                <span>{room.objects.length} Interactive Points</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
