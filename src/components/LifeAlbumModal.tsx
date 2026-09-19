import React, { useEffect } from 'react';
import { EndingType, EndingDetails, PlayerStats, AvatarConfig } from '../types';
import confetti from 'canvas-confetti';
import { Award, AlertOctagon, HeartHandshake, ShieldAlert, Phone, RotateCcw, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface LifeAlbumModalProps {
  endingType: EndingType;
  stats: PlayerStats;
  avatar: AvatarConfig;
  onRestart: () => void;
  onOpenWardrobe: () => void;
}

export const LifeAlbumModal: React.FC<LifeAlbumModalProps> = ({
  endingType,
  stats,
  avatar,
  onRestart,
  onOpenWardrobe
}) => {
  useEffect(() => {
    if (endingType === 'thriving') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      soundEngine.playEndingFanfare();
    } else if (endingType === 'rehab') {
      soundEngine.playResistSuccess();
    } else {
      soundEngine.playDrugAcceptDamage();
    }
  }, [endingType]);

  const getEndingData = (type: EndingType): EndingDetails => {
    switch (type) {
      case 'thriving':
        return {
          type: 'thriving',
          title: 'THE DRUG-FREE THRIVING CITIZEN',
          subtitle: 'True Good Ending: Resilience, Honour & Lifelong Fulfillment',
          badgeColor: 'bg-emerald-600 text-white',
          narrative: `Standing on the Marina Bay waterfront in graduation robes alongside trusted, lifelong friends, ${avatar.name} smiles into the morning breeze. Through primary school temptations, secondary school exam stresses, and Clarke Quay nightlife pressure, you chose health, integrity, and self-respect every single time.`,
          explanation: `Your unwavering resilience shielded your cognitive ability, cardiovascular endurance, and clean record. You achieved top honors, built genuine social networks, and secured a prosperous career in Singapore's vibrant economy.`,
          legalAndHealthFact: `Facts: Over 98% of Singapore youths live completely drug-free. Choosing clean living protects your neurodevelopment, career licensing, overseas travel visas, and mental well-being for life.`,
          unlockedCosmeticReward: `Unlocked 'Golden Radiant Crown' Hair, 'Marina Bay Graduation Regalia', and 'Pure Drug-Free Halo' Aura!`
        };
      case 'rehab':
        return {
          type: 'rehab',
          title: 'REHABILITATION & REDEMPTION',
          subtitle: 'A Hard-Fought Second Chance: Overcoming Dependency',
          badgeColor: 'bg-amber-600 text-white',
          narrative: `After stumbling through peer pressure in your earlier years, you took the brave step to reach out for help. Through the Central Narcotics Bureau's youth diversionary framework and counselling at NAMS, ${avatar.name} broke free from the cycle of addiction and rebuilt trust with family.`,
          explanation: `While past mistakes left academic setbacks and emotional scars, your courageous turnaround proved that adversity does not define your destiny. You earned your diploma and now mentor at-risk teens.`,
          legalAndHealthFact: `Help is Available: Singapore's enhanced drug rehabilitation regime focuses on targeted counselling, family support, and psychological intervention for young first-time offenders who genuinely seek reform.`,
          unlockedCosmeticReward: `Unlocked 'Polytechnic Varsity Bomber' and 'Emerald Resilience Aegis'!`
        };
      case 'overdose':
        return {
          type: 'overdose',
          title: 'CRITICAL MEDICAL EMERGENCY',
          subtitle: 'Tragic Outcome: Cardiovascular Collapse & Organ Breakdown',
          badgeColor: 'bg-rose-700 text-white',
          narrative: `Monitors beep erratically in the Singapore General Hospital (SGH) Intensive Care Unit. Unregulated synthetic cannabinoids and stimulant pills caused hyperthermia, cardiac arrhythmia, and acute pulmonary damage. Your parents weep by your bedside.`,
          explanation: `Taking illegal drugs drastically depleted your health and resilience to critical levels. Illicit chemicals and vape liquids often contain lethal adulterants, heavy metals, and toxic chemical pesticides with no dosage control.`,
          legalAndHealthFact: `Medical Reality: Synthetic cannabinoids and designer drugs carry unpredictable toxicity that can trigger irreversible heart attacks, kidney failure, and psychotic episodes even on a single first try.`,
          unlockedCosmeticReward: `Tip: In your next playthrough, resist temptations early to build up Resilience shields!`
        };
      case 'jail':
        return {
          type: 'jail',
          title: 'LEGAL INCARCERATION & DRC DETENTION',
          subtitle: 'Grim Consequence: Enforcement Under the Misuse of Drugs Act',
          badgeColor: 'bg-stone-800 text-white',
          narrative: `Steel cell doors slide shut with a heavy echo inside the Drug Rehabilitation Centre (DRC). Following repeated drug use and participation in illegal vape/drug transactions, Central Narcotics Bureau (CNB) officers conducted an enforcement raid.`,
          explanation: `Surrendering to peer pressure eroded your personal freedom and damaged your family's dignity. A criminal drug record severely restricts employment options, government licenses, and international travel.`,
          legalAndHealthFact: `Singapore Law: The Misuse of Drugs Act strictly prohibits the possession, consumption, and trafficking of controlled drugs. Electronic vaporizers are also strictly prohibited under the Tobacco Act.`,
          unlockedCosmeticReward: `Tip: Divert towards sports and wholesome friends to maintain a high Social stat without substances!`
        };
    }
  };

  const details = getEndingData(endingType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 overflow-y-auto">
      <div className="pixel-box max-w-2xl w-full p-6 text-stone-900 rounded-lg my-auto shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="text-center border-b-2 border-[#543315] pb-3">
          <span className="font-pixel text-[9px] text-[#6b3c12] uppercase tracking-wider">
            SG LIFE JOURNEY • RETROSPECTIVE ALBUM
          </span>
          <h1 className="font-pixel text-base text-[#2e190b] mt-1 font-bold">
            {details.title}
          </h1>
          <div className="flex justify-center mt-1">
            <span className={`font-pixel text-[8px] px-2.5 py-1 rounded uppercase tracking-wide ${details.badgeColor}`}>
              {details.subtitle}
            </span>
          </div>
        </div>

        {/* Ending Narrative Scene */}
        <div className="bg-[#edd2af] border-2 border-[#543315] rounded p-4 flex flex-col gap-2.5">
          <p className="font-sans-sg text-xs text-stone-900 leading-relaxed font-semibold">
            {details.narrative}
          </p>
          <div className="p-2.5 bg-[#fdf5eb] rounded border border-[#855223]">
            <span className="font-pixel text-[8px] text-[#4a2e15] block mb-1">
              CAUSE & EFFECT ANALYSIS:
            </span>
            <p className="font-sans-sg text-xs text-stone-700 leading-relaxed">
              {details.explanation}
            </p>
          </div>
        </div>

        {/* Final Lifetime Stats Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="p-2 bg-[#fdf5eb] rounded border border-[#855223]">
            <span className="font-pixel text-[8px] text-rose-700 block">FINAL HEALTH</span>
            <span className="font-pixel text-sm text-stone-900 font-bold">{Math.round(stats.health)}%</span>
          </div>
          <div className="p-2 bg-[#fdf5eb] rounded border border-[#855223]">
            <span className="font-pixel text-[8px] text-cyan-800 block">FINAL ACADEMICS</span>
            <span className="font-pixel text-sm text-stone-900 font-bold">{Math.round(stats.academics)}%</span>
          </div>
          <div className="p-2 bg-[#fdf5eb] rounded border border-[#855223]">
            <span className="font-pixel text-[8px] text-pink-700 block">FINAL SOCIAL</span>
            <span className="font-pixel text-sm text-stone-900 font-bold">{Math.round(stats.social)}%</span>
          </div>
          <div className="p-2 bg-[#fdf5eb] rounded border border-[#855223]">
            <span className="font-pixel text-[8px] text-purple-800 block">FINAL RESILIENCE</span>
            <span className="font-pixel text-sm text-stone-900 font-bold">{Math.round(stats.resilience)}%</span>
          </div>
        </div>

        {/* Educational Fact Box */}
        <div className="p-3 bg-[#e0f2fe] border-2 border-[#0284c7] rounded text-cyan-950 flex flex-col gap-1.5">
          <span className="font-pixel text-[8px] text-cyan-900 flex items-center gap-1.5 font-bold">
            <Award className="w-3.5 h-3.5 text-cyan-700" />
            SINGAPORE ANTI-DRUG AWARENESS & FACT
          </span>
          <p className="font-sans-sg text-xs leading-relaxed text-cyan-900">
            {details.legalAndHealthFact}
          </p>
          <div className="mt-1 pt-1.5 border-t border-cyan-300/60 flex items-center justify-between flex-wrap gap-2 text-[10px] font-sans-sg font-semibold text-cyan-900">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-cyan-700" /> CNB 24/7 Hotline: 1800-600-0000
            </span>
            <span>NAMS Clinic: 6732-6837</span>
            <span>Youth Line SG: 6334-5678</span>
          </div>
        </div>

        {/* Unlock Reward Banner */}
        <div className="p-2.5 bg-gradient-to-r from-amber-200 to-amber-300 border-2 border-amber-600 rounded flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-800 shrink-0" />
          <span className="font-sans-sg text-xs text-amber-950 font-bold">
            {details.unlockedCosmeticReward}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={onOpenWardrobe}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-700 to-pink-600 hover:brightness-110 text-white font-pixel text-[10px] rounded border-2 border-purple-300 flex items-center justify-center gap-2 shadow-md transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            CUSTOMIZE IN WARDROBE
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="pixel-btn px-4 py-2.5 text-stone-950 font-pixel text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            PLAY ANOTHER LIFETIME
          </button>
        </div>
      </div>
    </div>
  );
};
