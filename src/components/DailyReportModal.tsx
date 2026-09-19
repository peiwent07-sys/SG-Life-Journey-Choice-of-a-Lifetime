import React from 'react';
import { PlayerStats } from '../types';
import { Moon, Sparkles, ArrowRight, Heart, GraduationCap, Users, ShieldCheck, Brain } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface DailyReportModalProps {
  day: number;
  stats: PlayerStats;
  resiliencePointsEarned: number;
  onNextDay: () => void;
}

export const DailyReportModal: React.FC<DailyReportModalProps> = ({
  day,
  stats,
  resiliencePointsEarned,
  onNextDay
}) => {
  const getReflection = () => {
    const mh = stats?.mentalHealth ?? 70;
    if (mh < 40) {
      return 'Visible exhaustion and eyebags reveal mental health strain and social disconnection. Taking time to step away from negative influences and sleep properly is essential.';
    }
    if ((stats?.health ?? 100) < 40) {
      return 'Your body and nervous system are struggling with physical consequences. Rest, hydration, and seeking help are vital.';
    }
    if ((stats?.resilience ?? 70) >= 80) {
      return 'You demonstrated rock-solid mental discipline. Standing up to pressure is shaping you into an inspiring, confident young leader.';
    }
    if ((stats?.academics ?? 70) >= 75) {
      return 'Solid study hours at the library and desk are keeping your options open for distinction awards and top diplomas.';
    }
    return 'Another full day navigating the hustle and bustle of Singapore youth life. Good rest tonight prepares you for tomorrow.';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 overflow-y-auto">
      <div className="pixel-box max-w-md w-full p-5 text-stone-900 rounded-lg my-auto shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="text-center border-b-2 border-[#543315] pb-3">
          <div className="flex items-center justify-center gap-2 text-indigo-900">
            <Moon className="w-5 h-5 text-indigo-950" />
            <span className="font-pixel text-[10px] uppercase tracking-wider">
              DAY {day} CONCLUDED (11:00 PM)
            </span>
          </div>
          <h2 className="font-pixel text-sm text-[#2e190b] mt-1 font-bold">
            DAILY REFLECTION & REST
          </h2>
        </div>

        {/* Stat Standings */}
        <div className="bg-[#edd2af] border-2 border-[#543315] rounded p-3.5 flex flex-col gap-2.5">
          <span className="font-pixel text-[8px] text-[#4a2e15] uppercase tracking-wider">
            END-OF-DAY VITAL REPORT
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-pixel">
            <div className="flex items-center justify-between p-1.5 bg-[#fdf5eb] rounded border border-[#855223]">
              <span className="flex items-center gap-1 text-rose-700">
                <Heart className="w-3 h-3 fill-rose-600" /> HEALTH
              </span>
              <span>{Math.round(stats.health)}%</span>
            </div>
            <div className="flex items-center justify-between p-1.5 bg-[#fdf5eb] rounded border border-[#855223]">
              <span className="flex items-center gap-1 text-cyan-800">
                <GraduationCap className="w-3 h-3" /> ACADEMICS
              </span>
              <span>{Math.round(stats.academics)}%</span>
            </div>
            <div className="flex items-center justify-between p-1.5 bg-[#fdf5eb] rounded border border-[#855223]">
              <span className="flex items-center gap-1 text-pink-700">
                <Users className="w-3 h-3" /> SOCIAL
              </span>
              <span>{Math.round(stats.social)}%</span>
            </div>
            <div className="flex items-center justify-between p-1.5 bg-[#fdf5eb] rounded border border-[#855223]">
              <span className="flex items-center gap-1 text-purple-800">
                <ShieldCheck className="w-3 h-3" /> RESILIENCE
              </span>
              <span>{Math.round(stats.resilience)}%</span>
            </div>
            <div className="flex items-center justify-between p-1.5 bg-[#fdf5eb] rounded border border-[#855223] col-span-2">
              <span className="flex items-center gap-1 text-teal-800">
                <Brain className="w-3 h-3" /> MENTAL HEALTH
              </span>
              <span className={(stats?.mentalHealth ?? 70) < 40 ? 'text-rose-700 font-bold' : 'text-teal-900'}>
                {Math.round(stats?.mentalHealth ?? 70)}% {(stats?.mentalHealth ?? 70) < 40 ? '(Eyebags Visible)' : ''}
              </span>
            </div>
          </div>

          {/* Daily Resilience Points */}
          <div className="flex items-center justify-between mt-1 px-3 py-2 bg-gradient-to-r from-purple-800 to-indigo-900 text-amber-200 rounded border border-purple-400">
            <span className="flex items-center gap-1.5 font-pixel text-[9px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              RESILIENCE POINTS EARNED:
            </span>
            <span className="font-pixel text-xs text-amber-300 font-bold">
              +{resiliencePointsEarned} PTS
            </span>
          </div>
        </div>

        {/* Reflection Note */}
        <div className="p-3 bg-[#fdf6ec] rounded border border-[#855223]">
          <p className="font-sans-sg text-xs text-stone-800 leading-relaxed italic">
            "{getReflection()}"
          </p>
        </div>

        {/* Advance Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playEatMeal();
            onNextDay();
          }}
          className="pixel-btn w-full py-2.5 text-stone-950 font-pixel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          <span>SLEEP & START DAY {day + 1}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
