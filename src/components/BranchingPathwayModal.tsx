import React, { useState } from 'react';
import { PostSecondaryPath } from '../types';
import { Award, BookOpen, Briefcase, GraduationCap, Check } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BranchingPathwayModalProps {
  academicsScore: number;
  onSelectPath: (path: PostSecondaryPath) => void;
}

export const BranchingPathwayModal: React.FC<BranchingPathwayModalProps> = ({
  academicsScore,
  onSelectPath
}) => {
  const [chosen, setChosen] = useState<PostSecondaryPath>('Polytechnic Diploma');

  const options: {
    path: PostSecondaryPath;
    title: string;
    badge: string;
    icon: React.ReactNode;
    desc: string;
    environment: string;
    pressures: string;
  }[] = [
    {
      path: 'Junior College (JC)',
      title: 'Junior College (JC Track - GCE A-Level Intensive)',
      badge: 'Academic Rigour',
      icon: <GraduationCap className="w-5 h-5 text-emerald-700" />,
      desc: 'High-octane academic curriculum preparing for university admissions with rigorous lecture tutorials and student leadership councils.',
      environment: 'Tiered lecture theatres, air-conditioned central library carrels, council room.',
      pressures: 'High-stakes A-Level exam cramming, late-night cram sessions, pressure to take "study drugs" or vapes to pull all-nighters vs clean study circles.'
    },
    {
      path: 'Polytechnic Diploma',
      title: 'Polytechnic (Poly Track - Applied Sciences & Design)',
      badge: 'Applied Innovation',
      icon: <Award className="w-5 h-5 text-blue-700" />,
      desc: 'Vibrant tertiary lifestyle featuring project coursework, creative studio labs, campus clubs, and industry internship placements.',
      environment: 'Modern campus plaza, multimedia design studio, student atrium food court.',
      pressures: 'CCA commitments, cafe hangouts, smoking corner peer invitations vs project teamwork and athletics.'
    },
    {
      path: 'ITE College',
      title: 'ITE College (Hands-On Technical Mastery)',
      badge: 'Practical Excellence',
      icon: <Briefcase className="w-5 h-5 text-amber-700" />,
      desc: 'Applied vocational mastery in advanced engineering, hospitality, and digital tech with state-of-the-art industry workshops.',
      environment: 'Hands-on engineering workshops, campus sports complex, central amphitheatre.',
      pressures: 'Internship workplace stress, hangout invitations at nearby void decks or mama shops vs peer mentorship and skills competitions.'
    }
  ];

  const handleConfirm = () => {
    if (!chosen) return;
    soundEngine.playResistSuccess();
    onSelectPath(chosen);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 overflow-y-auto select-none">
      <div className="pixel-box max-w-2xl w-full p-5 text-stone-900 rounded-lg my-auto shadow-2xl flex flex-col gap-4">
        <div className="text-center border-b-2 border-[#543315] pb-3">
          <span className="font-pixel text-[9px] text-[#6b3c12] uppercase tracking-wider">
            TERTIARY POSTING & ADMISSIONS RELEASE
          </span>
          <h2 className="font-pixel text-sm text-[#2e190b] mt-1 font-bold">
            SELECT YOUR TERTIARY EDUCATION PATHWAY
          </h2>
          <p className="font-sans-sg text-xs text-stone-700 mt-1">
            Current Academics Standing: <strong className="text-blue-900 font-pixel text-[10px]">{Math.round(academicsScore)}%</strong>
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {options.map(opt => {
            const isSelected = chosen === opt.path;
            return (
              <button
                key={opt.path}
                type="button"
                onClick={() => {
                  setChosen(opt.path);
                  soundEngine.playClick();
                }}
                className={`w-full text-left p-3.5 rounded-md border-2 transition flex items-start gap-3 shadow-sm ${
                  isSelected
                    ? 'bg-[#fde047] border-[#854d0e] text-stone-950 scale-[1.01]'
                    : 'bg-[#fcf5ec] border-[#855223] text-stone-800 hover:bg-[#faebd7]'
                }`}
              >
                <div className="p-2 rounded bg-white/80 border border-stone-300 mt-0.5 shrink-0 shadow-xs">
                  {opt.icon}
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-pixel text-[10px] font-bold text-[#3a200d]">
                      {opt.title}
                    </span>
                    <span className="font-pixel text-[7px] px-1.5 py-0.5 rounded bg-[#4a2e15] text-amber-200 uppercase">
                      {opt.badge}
                    </span>
                  </div>
                  <p className="font-sans-sg text-xs text-stone-800 mt-1 leading-snug">
                    {opt.desc}
                  </p>
                  <div className="mt-2 grid grid-cols-1 gap-1 text-[10px] bg-white/50 p-2 rounded border border-stone-200">
                    <p className="text-stone-700">
                      <strong>Campus Environments:</strong> {opt.environment}
                    </p>
                    <p className="text-stone-700">
                      <strong>Key Pressures:</strong> {opt.pressures}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="pixel-btn w-full py-2.5 text-stone-950 font-pixel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Check className="w-4 h-4" />
          ENROL IN {(chosen || 'TERTIARY PATH').toUpperCase()}
        </button>
      </div>
    </div>
  );
};
