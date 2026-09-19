import React, { useEffect } from 'react';
import { LifeStageKey } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface LifeStageIntroBannerProps {
  stage: LifeStageKey;
  onContinue: () => void;
}

export const LifeStageIntroBanner: React.FC<LifeStageIntroBannerProps> = ({
  stage,
  onContinue
}) => {
  useEffect(() => {
    soundEngine.playLevelUp();
  }, []);

  const getStageData = (s: LifeStageKey) => {
    switch (s) {
      case 'primary':
        return {
          title: 'PRIMARY SCHOOL',
          subtitle: 'Ages 7 to 12 · Foundations & Childhood Wonder',
          desc: 'Waking up to the morning flag-raising ceremony, sharing ice cream wafers under the sheltered walkways, and learning the early virtues of integrity and resilience in your Singapore neighbourhood.',
          motto: 'Stand firm in character before the world unfolds.'
        };
      case 'secondary':
        return {
          title: 'SECONDARY SCHOOL',
          subtitle: 'Ages 13 to 16 · Identity, Comradeship & Crossroads',
          desc: 'NAPFA 2.4km running tracks, after-school hawker centre meals with peers, CCA teamwork, and navigating intense adolescent social pressures. True friends respect your personal boundaries.',
          motto: 'Real strength is saying no to what harms your future.'
        };
      case 'tertiary':
        return {
          title: 'JUNIOR COLLEGE & POLYTECHNIC',
          subtitle: 'Ages 17 to 20 · Independence, Ambition & Discipline',
          desc: 'Late-night project submissions, campus independence, and forging your distinctive career pathway. The decisions made during these formative years will echo across your entire adult life.',
          motto: 'Guard your mental clarity and cherish your true potential.'
        };
      case 'adult':
        return {
          title: 'ADULTHOOD & CAREER',
          subtitle: 'Ages 21 & Beyond · Purpose, Legacy & Civic Leadership',
          desc: 'Stepping out into the vibrant workforce, navigating high-stakes professional demands and nightlife socials, and choosing to give back as an anti-drug peer advocate and community leader.',
          motto: 'Lead by example; champion a healthy, drug-free nation.'
        };
    }
  };

  const data = getStageData(stage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 select-none animate-fadeIn">
      <div className="pixel-box max-w-lg w-full p-6 text-stone-900 rounded-lg shadow-2xl flex flex-col items-center text-center gap-4 border-4 border-[#543315] bg-[#edd2af]">
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#543315] text-amber-200 font-pixel text-[9px] uppercase tracking-widest shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>NEW LIFE STAGE REACHED</span>
        </div>

        <div>
          <h1 className="font-pixel text-xl sm:text-2xl text-[#2e190b] font-bold tracking-wider">
            {data.title}
          </h1>
          <p className="font-pixel text-[10px] text-[#6b3c12] mt-1">
            {data.subtitle}
          </p>
        </div>

        <div className="p-4 bg-[#fdf5eb] border-2 border-[#855223] rounded-md shadow-inner text-left flex flex-col gap-2">
          <p className="font-sans-sg text-xs sm:text-sm text-stone-800 leading-relaxed">
            {data.desc}
          </p>
          <div className="pt-2 border-t border-[#855223]/30">
            <span className="font-pixel text-[8px] text-[#543315] block">
              LIFE PRINCIPLE:
            </span>
            <span className="font-sans-sg text-xs italic font-semibold text-emerald-900">
              "{data.motto}"
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onContinue();
          }}
          className="pixel-btn w-full py-3 text-stone-950 font-pixel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          <span>CHOOSE STARTING LOCATION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
