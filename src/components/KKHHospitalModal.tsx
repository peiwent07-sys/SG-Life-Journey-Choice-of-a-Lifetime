import React, { useEffect, useState } from 'react';
import { Heart, Activity, AlertOctagon, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface KKHHospitalModalProps {
  isOpen: boolean;
  onDischarge: () => void;
}

export const KKHHospitalModal: React.FC<KKHHospitalModalProps> = ({ isOpen, onDischarge }) => {
  const [pulseTick, setPulseTick] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(118);
  const [spo2, setSpo2] = useState<number>(88);

  useEffect(() => {
    if (!isOpen) return;

    soundEngine.playWarning();

    // Simulate recovering vitals
    const timer = setInterval(() => {
      setPulseTick(p => p + 1);
      setBpm(b => (b > 82 ? b - 1 : 80));
      setSpo2(s => (s < 98 ? s + 1 : 98));
    }, 400);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 overflow-y-auto select-none">
      <div className="relative w-full max-w-2xl bg-[#0c131d] border-3 border-[#0d9488] rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto text-stone-100">
        
        {/* Hospital Facade Header (Styled after KKH - KK Women's and Children's Hospital Singapore) */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0f4c5c] via-[#0d9488] to-[#14b8a6] border-b-2 border-[#115e59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* KKH Cross Logo */}
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center p-1 shadow-md shrink-0">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute w-6 h-2 bg-[#0d9488] rounded-xs" />
                <div className="absolute h-6 w-2 bg-[#0d9488] rounded-xs" />
                <div className="absolute w-2.5 h-2.5 bg-[#0891b2] rounded-full" />
              </div>
            </div>
            <div>
              <span className="font-pixel text-[8px] text-teal-100 tracking-widest uppercase block">
                EMERGENCY RESUSCITATION & ADOLESCENT MEDICINE
              </span>
              <h2 className="font-pixel text-sm text-white font-bold tracking-wide">
                KK Women's and Children's Hospital (KKH Singapore)
              </h2>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-rose-600/90 border border-rose-300 rounded font-pixel text-[8px] text-white animate-pulse">
            CRITICAL REVIVAL
          </span>
        </div>

        {/* Medical Ward Content */}
        <div className="p-5 space-y-4 text-xs">
          
          {/* Bedside Vital Signs Monitor UI */}
          <div className="p-3.5 bg-[#061019] border-2 border-[#164e63] rounded-lg shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-[#155e75]">
              <span className="font-pixel text-[9px] text-teal-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
                PATIENT MONITOR (BED 04 - TOXICOLOGY STABILISATION)
              </span>
              <span className="text-[10px] text-teal-200/80 font-mono">
                IV SALINE DRIP: 100 mL/hr | OXYGEN NASAL CANNULA: 4 L/min
              </span>
            </div>

            {/* ECG Wave Simulation Canvas */}
            <div className="h-12 w-full my-2 bg-black/60 rounded flex items-center px-2 overflow-hidden border border-teal-950">
              <svg className="w-full h-8" preserveAspectRatio="none" viewBox="0 0 400 50">
                <path
                  d={`M 0,25 Q 50,25 60,${25 + Math.sin(pulseTick * 0.8) * 4} L 90,25 L 100,5 L 110,45 L 120,15 L 130,25 L 200,25 Q 240,25 250,${25 + Math.sin(pulseTick * 0.8) * 4} L 280,25 L 290,5 L 300,45 L 310,15 L 320,25 L 400,25`}
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            {/* Vital Stats Readout */}
            <div className="grid grid-cols-3 gap-3 pt-1 font-mono">
              <div className="p-2 bg-[#0d2836] rounded border border-cyan-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-cyan-300 block">HEART RATE</span>
                  <span className="text-lg font-bold text-cyan-200">{bpm}</span>
                  <span className="text-[8px] text-cyan-400 ml-1">BPM</span>
                </div>
                <Heart className="w-5 h-5 text-rose-400 animate-ping" />
              </div>

              <div className="p-2 bg-[#0d2836] rounded border border-teal-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-teal-300 block">PULSE SpO2</span>
                  <span className="text-lg font-bold text-teal-200">{spo2}%</span>
                  <span className="text-[8px] text-teal-400 ml-1">O2 SAT</span>
                </div>
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="p-2 bg-[#0d2836] rounded border border-sky-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-sky-300 block">BLOOD PRESSURE</span>
                  <span className="text-lg font-bold text-sky-200">114/78</span>
                  <span className="text-[8px] text-sky-400 ml-1">mmHg</span>
                </div>
                <span className="text-[9px] text-emerald-300 font-pixel">STABILISED</span>
              </div>
            </div>
          </div>

          {/* Attending Physician Medical Assessment */}
          <div className="p-4 bg-[#111e2e] border border-[#1e3a5f] rounded-lg space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-800 flex items-center justify-center text-teal-100 font-bold font-pixel text-xs border border-teal-400">
                Dr
              </div>
              <div>
                <span className="font-pixel text-[10px] text-teal-300 font-bold block">
                  Dr Marcus Lim (Senior Consultant, Adolescent & Emergency Medicine)
                </span>
                <span className="text-[9px] text-stone-400">
                  KK Women's and Children's Hospital Emergency Department
                </span>
              </div>
            </div>

            <p className="font-sans-sg text-xs leading-relaxed text-stone-200 bg-black/30 p-3 rounded border border-stone-800">
              "Your heart was in dangerous tachycardia and your airways went into acute bronchospasm from synthetic toxic chemicals and vape adulterants. You collapsed in public and an SCDF paramedic ambulance rushed you here with oxygen support. 
              <br /><br />
              <strong className="text-amber-300">
                You are fortunate to have survived without permanent neurological damage. 
              </strong> 
              Your physical stamina and studies have taken a massive hit, but we have administered emergency bronchodilators and IV hydration. Please speak to your family and school counsellors immediately. Singapore youth support programmes exist to help you rebuild."
            </p>
          </div>

          {/* Clinical Penalties & Recovery Buffer Notice */}
          <div className="p-3 bg-gradient-to-r from-amber-950/70 to-[#291e0a] border border-amber-600/70 rounded-lg flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-spin" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[9px] text-amber-300 font-bold uppercase tracking-wide">
                  RECOVERY BUFFER ACTIVATED (1.8x REHABILITATION BOOST)
                </span>
              </div>
              <p className="text-[11px] text-amber-100/90 leading-snug">
                Health has been stabilized to <strong>50%</strong>. Heavy penalties applied: 
                <span className="text-rose-300 font-bold"> Energy -35, Academics -25, Social -20</span>. 
                However, engaging in positive choices (attending the CNB anti-drug booth, family meals, studying, and counselling) now grants <strong>1.8x Stat Multipliers</strong> to help you reclaim your future!
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-5 py-3.5 bg-[#091018] border-t border-[#134e4a] flex items-center justify-between">
          <span className="text-[10px] text-stone-400 font-mono">
            DISCHARGE STATUS: OUTPATIENT REHABILITATION SCHEDULED
          </span>
          <button
            type="button"
            onClick={onDischarge}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-pixel text-xs font-bold rounded-lg shadow-lg active:scale-95 transition"
          >
            <span>COMMIT TO RECOVERY & DISCHARGE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
