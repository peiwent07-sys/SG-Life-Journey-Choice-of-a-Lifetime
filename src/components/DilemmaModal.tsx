import React, { useState, useEffect, useRef } from 'react';
import { DilemmaOption, DilemmaScenario } from '../types';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface DilemmaModalProps {
  scenario: DilemmaScenario;
  onChoiceSelected: (opt: DilemmaOption) => void;
}

export const DilemmaModal: React.FC<DilemmaModalProps> = ({ scenario, onChoiceSelected }) => {
  const [selectedOption, setSelectedOption] = useState<DilemmaOption | null>(null);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const fullText = scenario.narrative;
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect streaming character by character
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    typingTimerRef.current = setInterval(() => {
      index++;
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        if (index % 4 === 0) {
          soundEngine.playSelect();
        }
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setIsTypingComplete(true);
      }
    }, 20);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [fullText]);

  // Click dialogue box to fast-forward typewriter
  const handleFastForward = () => {
    if (!isTypingComplete) {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setDisplayedText(fullText);
      setIsTypingComplete(true);
    }
  };

  const handlePick = (opt: DilemmaOption) => {
    setSelectedOption(opt);
    if (opt.type === 'accept') {
      soundEngine.playDrugAcceptDamage();
    } else {
      soundEngine.playResistSuccess();
    }
  };

  const handleConfirm = () => {
    if (selectedOption) {
      onChoiceSelected(selectedOption);
    }
  };

  // Render contextual Stardew-style pixel portrait
  const renderNpcPortrait = () => {
    const roleLower = (scenario.speakerRole || '').toLowerCase();
    const speakerLower = (scenario.speaker || '').toLowerCase();

    if (roleLower.includes('officer') || roleLower.includes('ambassador') || roleLower.includes('volunteer')) {
      // Anti-drug officer / youth ambassador with teal ribbon
      return (
        <div className="w-20 h-20 rounded-lg bg-[#0f2c25] border-2 border-teal-500 shrink-0 flex flex-col items-center justify-center relative overflow-hidden shadow-md">
          <div className="w-10 h-10 rounded-full bg-[#fed7aa] relative flex items-center justify-center">
            {/* Dark hair */}
            <div className="absolute -top-1 w-11 h-4 bg-[#1e293b] rounded-t-full" />
            {/* Eyes */}
            <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mx-1.5 mt-1" />
            <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mx-1.5 mt-1" />
          </div>
          {/* Uniform shirt with teal ribbon badge */}
          <div className="w-14 h-6 bg-[#0d9488] rounded-t-md relative flex items-center justify-center">
            <div className="w-2.5 h-3 bg-teal-200 rounded-xs border border-white" />
          </div>
          <span className="text-[7px] font-pixel text-teal-300 mt-0.5">CNB YOUTH</span>
        </div>
      );
    }

    if (roleLower.includes('uncle') || speakerLower.includes('uncle') || speakerLower.includes('older')) {
      // Weathered Neighbourhood Uncle / Senior
      return (
        <div className="w-20 h-20 rounded-lg bg-[#2e1d10] border-2 border-amber-600 shrink-0 flex flex-col items-center justify-center relative overflow-hidden shadow-md">
          <div className="w-10 h-10 rounded-full bg-[#fed7aa] relative flex items-center justify-center">
            {/* Grey thinning hair */}
            <div className="absolute -top-1 w-11 h-3 bg-[#64748b] rounded-t-full" />
            {/* Glasses */}
            <div className="w-2.5 h-2 border border-stone-900 rounded-xs mx-0.5 mt-1" />
            <div className="w-2.5 h-2 border border-stone-900 rounded-xs mx-0.5 mt-1" />
          </div>
          {/* White singlet & Good Morning Towel */}
          <div className="w-14 h-6 bg-stone-100 rounded-t-md relative flex items-center justify-end px-1">
            <div className="w-2 h-6 bg-red-600 rounded-xs" />
          </div>
          <span className="text-[7px] font-pixel text-amber-300 mt-0.5">UNCLE</span>
        </div>
      );
    }

    if (roleLower.includes('club') || roleLower.includes('party') || roleLower.includes('nightlife')) {
      // Nightlife partygoer
      return (
        <div className="w-20 h-20 rounded-lg bg-[#24103c] border-2 border-purple-500 shrink-0 flex flex-col items-center justify-center relative overflow-hidden shadow-md">
          <div className="w-10 h-10 rounded-full bg-[#fed7aa] relative flex items-center justify-center">
            {/* Trendy dyed hair */}
            <div className="absolute -top-1 w-11 h-5 bg-[#7c3aed] rounded-t-full" />
            <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mx-1.5 mt-1" />
            <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mx-1.5 mt-1" />
          </div>
          <div className="w-14 h-6 bg-[#4c1d95] rounded-t-md relative flex items-center justify-center">
            <div className="w-4 h-1 bg-fuchsia-400" />
          </div>
          <span className="text-[7px] font-pixel text-purple-300 mt-0.5">PEER</span>
        </div>
      );
    }

    // Default: Schoolmate / Campus Peer
    return (
      <div className="w-20 h-20 rounded-lg bg-[#1e293b] border-2 border-sky-500 shrink-0 flex flex-col items-center justify-center relative overflow-hidden shadow-md">
        <div className="w-10 h-10 rounded-full bg-[#fed7aa] relative flex items-center justify-center">
          {/* School hairstyle */}
          <div className="absolute -top-1 w-11 h-4 bg-[#334155] rounded-t-full" />
          <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mx-1.5 mt-1" />
          <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mx-1.5 mt-1" />
        </div>
        {/* School uniform */}
        <div className="w-14 h-6 bg-[#0284c7] rounded-t-md relative flex items-center justify-center">
          <div className="w-1 h-4 bg-white" />
        </div>
        <span className="text-[7px] font-pixel text-sky-300 mt-0.5">CLASSMATE</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-2 sm:p-4 backdrop-blur-xs select-none">
      {/* Stardew Valley Bottom Dialogue Box */}
      <div 
        onClick={handleFastForward}
        className="w-full max-w-3xl bg-[#28180d] border-4 border-[#855223] rounded-xl shadow-2xl p-4 flex flex-col gap-3 text-stone-100 cursor-pointer"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(69, 40, 19, 0.95), rgba(30, 17, 8, 0.98))'
        }}
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-[#5c3717] pb-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="font-pixel text-[8px] text-amber-300 uppercase tracking-wider">
              {scenario.locationLabel} • {scenario.title}
            </span>
          </div>
          <span className="px-2 py-0.5 bg-[#4a2e15] border border-[#6d411b] rounded text-amber-200 font-pixel text-[8px]">
            CHOICE POINT
          </span>
        </div>

        {!selectedOption ? (
          <>
            {/* Dialogue & Animated Portrait Row */}
            <div className="flex items-start gap-3.5 pt-1">
              {renderNpcPortrait()}

              <div className="flex-1 flex flex-col gap-1.5">
                {/* Speaker Name Tag */}
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[10px] text-amber-300 font-bold">
                    {scenario.speaker}
                  </span>
                  <span className="text-[9px] font-sans-sg text-stone-300 bg-[#3d2311] px-1.5 py-0.5 rounded border border-[#5e381a]">
                    {scenario.speakerRole}
                  </span>
                </div>

                {/* Typewriter Dialogue Text */}
                <div className="min-h-[50px] font-dialogue text-xl text-[#fef3c7] leading-snug tracking-wide">
                  "{displayedText}"
                  {/* Blinking Ellipsis Indicator */}
                  {!isTypingComplete ? (
                    <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse" />
                  ) : (
                    <span className="text-amber-400 ml-1 font-bold animate-bounce">...</span>
                  )}
                </div>
              </div>
            </div>

            {/* 4 Uniform Neutral Choices (Stardew Style) */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#5c3717]">
              <span className="font-pixel text-[8px] text-amber-400/90 uppercase tracking-wider">
                How do you respond?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {scenario.options.map((opt, idx) => {
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePick(opt);
                      }}
                      className="text-left p-2.5 rounded-lg border-2 border-[#6b421c] bg-[#3a2211] hover:bg-[#4a2c16] hover:border-amber-500/80 active:translate-y-0.5 transition flex items-start gap-2 shadow-sm text-stone-100 group"
                    >
                      <span className="font-pixel text-[8px] px-1.5 py-0.5 rounded bg-[#1f1107] text-amber-300 border border-[#523115] shrink-0 mt-0.5 group-hover:bg-amber-600 group-hover:text-white transition">
                        {idx + 1}
                      </span>
                      <span className="font-sans-sg text-xs text-stone-200 leading-snug group-hover:text-amber-100">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Consequence Readout View */
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="flex flex-col gap-3 p-3 bg-[#1e130a] border-2 border-[#543315] rounded-lg"
          >
            <div className="flex items-center gap-2">
              {selectedOption.type === 'accept' ? (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              <h3 className="font-pixel text-[11px] text-white font-bold">
                {selectedOption.type === 'accept' ? 'HAZARDOUS OUTCOME' : 'RESILIENT CHOICE!'}
              </h3>
            </div>

            <p className="font-sans-sg text-xs leading-relaxed text-stone-200">
              {selectedOption.feedback}
            </p>

            <div className="p-2 bg-[#2d1b0d] border border-[#5e381a] rounded text-[10px] font-pixel text-amber-300">
              <span className="block text-[8px] text-stone-400 mb-0.5">LIFE TRAJECTORY IMPACT:</span>
              <span>{selectedOption.statTip}</span>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="mt-1 w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-pixel text-xs font-bold rounded shadow-lg flex items-center justify-center gap-2 transition"
            >
              <span>CONTINUE JOURNEY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
