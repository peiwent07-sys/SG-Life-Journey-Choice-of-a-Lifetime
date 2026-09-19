import React, { useState } from 'react';
import { ShieldCheck, Award, BookOpen, CheckCircle, XCircle, X, Sparkles, FileText, Info, AlertTriangle, Stamp } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface AntiDrugBoothModalProps {
  isOpen: boolean;
  stageName: string;
  isRecoveryBufferActive?: boolean;
  onClose: () => void;
  onCompleteQuiz: (resilienceBonus: number, socialBonus: number) => void;
}

export const AntiDrugBoothModal: React.FC<AntiDrugBoothModalProps> = ({
  isOpen,
  stageName,
  isRecoveryBufferActive = false,
  onClose,
  onCompleteQuiz
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'quiz' | 'panels' | 'pledge'>('quiz');
  const [pledgeSigned, setPledgeSigned] = useState<boolean>(false);
  const [pledgeName, setPledgeName] = useState<string>('Singapore Youth Ambassador');

  if (!isOpen) return null;

  const questions = [
    {
      question: 'How do synthetic vapes and illicit pods harm developing adolescents?',
      options: [
        'They are laced with toxic heavy metals, synthetic cannabinoids, and cause acute irreversible bronchiolitis and brain injury.',
        'They are harmless water vapour that promotes good academic focus.',
        'They have no lasting impact on adolescent development or stamina.'
      ],
      correct: 0,
      explanation: 'Vaping liquid pods often contain dangerous adulterants, volatile chemicals, and heavy metals that destroy lung alveolar tissue and dopamine pathways.'
    },
    {
      question: 'What is Singapore\'s legal stance under the Misuse of Drugs Act (MDA)?',
      options: [
        'Zero tolerance: Strict capital and corporal punishments for trafficking, with comprehensive rehabilitation at Drug Rehabilitation Centres (DRC).',
        'Decriminalised in private entertainment venues.',
        'Permitted for recreational social use during university festivals.'
      ],
      correct: 0,
      explanation: 'Singapore upholds a firm zero-tolerance framework to protect families, neighbourhoods, and the public health of future generations.'
    },
    {
      question: 'What is the scientifically proven medical truth about cannabis/marijuana?',
      options: [
        'Cannabis causes severe cognitive decline, loss of IQ, memory impairment, and increases the risk of permanent psychotic disorders.',
        'Cannabis is completely non-addictive and enhances driving reflexes.',
        'Cannabis is a harmless natural plant with no adverse mental health effects.'
      ],
      correct: 0,
      explanation: 'Extensive clinical research demonstrates cannabis impairs developing brains, reduces executive functioning, and precipitates psychotic illnesses.'
    },
    {
      question: 'What is the most effective refusal skill when pressured by acquaintances to try unknown pills or vapes?',
      options: [
        'Give a firm, immediate "No, I value my health and sports," step away, and report the hazard to a trusted adult or counsellor.',
        'Take it to be polite and throw it into a drain when no one is watching.',
        'Pretend to hold it and laugh along to fit in with the group.'
      ],
      correct: 0,
      explanation: 'Direct, confident refusal and removing yourself from harmful environments protects your personal boundaries and physical safety.'
    }
  ];

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (submitted) return;
    soundEngine.playClick();
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmit = () => {
    soundEngine.playResistSuccess();
    setSubmitted(true);
  };

  const handleSignPledge = () => {
    soundEngine.playResistSuccess();
    setPledgeSigned(true);
  };

  const handleFinish = () => {
    const resilience = isRecoveryBufferActive ? 36 : 20;
    const social = isRecoveryBufferActive ? 18 : 10;
    onCompleteQuiz(resilience, social);
    onClose();
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 select-none">
      <div className="relative w-full max-w-2xl bg-[#141b18] border-3 border-[#0d9488] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Banner with Official CNB & NCADA Branding */}
        <div className="px-5 py-3 bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0f766e] border-b-2 border-[#10b981] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Green / Teal Ribbon Emblem */}
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md shrink-0 p-1">
              <div className="w-6 h-8 relative flex items-center justify-center">
                <div className="absolute w-2.5 h-7 bg-[#047857] rounded-full rotate-25 origin-top" />
                <div className="absolute w-2.5 h-7 bg-[#0d9488] rounded-full -rotate-25 origin-top" />
                <div className="absolute w-3 h-3 bg-[#10b981] rounded-full top-1" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[8px] bg-[#065f46] text-emerald-200 px-1.5 py-0.5 rounded uppercase tracking-widest border border-emerald-400/40">
                  CNB • NCADA SINGAPORE
                </span>
                <span className="font-pixel text-[8px] text-emerald-100">
                  {stageName.toUpperCase()}
                </span>
              </div>
              <h2 className="font-pixel text-xs text-white font-bold tracking-wide mt-0.5">
                "Life Does Not Rewind. Say NO to Drugs."
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-[#064e3b] hover:bg-[#065f46] text-emerald-100 border border-emerald-500 rounded-md transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-emerald-900/60 bg-[#0d1f18] px-4 pt-2 gap-2 text-[11px] font-pixel">
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('quiz'); }}
            className={`px-3 py-1.5 rounded-t transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#141b18] text-emerald-300 border-t-2 border-x-2 border-[#0d9488]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>PREVENTION QUIZ</span>
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('panels'); }}
            className={`px-3 py-1.5 rounded-t transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'panels'
                ? 'bg-[#141b18] text-emerald-300 border-t-2 border-x-2 border-[#0d9488]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>EDUCATIONAL PANELS</span>
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('pledge'); }}
            className={`px-3 py-1.5 rounded-t transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pledge'
                ? 'bg-[#141b18] text-emerald-300 border-t-2 border-x-2 border-[#0d9488]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>AMBASSADOR PLEDGE</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-stone-200 leading-relaxed">
          
          {isRecoveryBufferActive && (
            <div className="p-2.5 bg-gradient-to-r from-teal-950 to-emerald-950 border border-teal-500 rounded-lg flex items-center gap-2 text-teal-200 font-pixel text-[9px]">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0 animate-spin" />
              <span>RECOVERY BUFFER ACTIVE: Completing this booth awards an enhanced 1.8x rehabilitation stat multiplier!</span>
            </div>
          )}

          {/* TAB 1: MINI DRUG PREVENTION QUIZ */}
          {activeTab === 'quiz' && (
            <>
              <div className="p-3 bg-[#0a2319] border border-emerald-700/60 rounded-lg flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-emerald-100/90 leading-snug">
                  Welcome to the Central Narcotics Bureau (CNB) and National Council Against Drug Abuse (NCADA) youth education booth. Answer all questions correctly to earn your <strong>Drug-Free Ambassador Badge</strong> and boost your resilience!
                </p>
              </div>

              {/* Quiz Questions */}
              <div className="space-y-4">
                {questions.map((q, qIdx) => (
                  <div key={qIdx} className="p-3.5 bg-[#0b1411] border border-emerald-950 rounded-lg space-y-2">
                    <p className="font-pixel text-[10px] text-emerald-300">
                      {qIdx + 1}. {q.question}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedAnswers[qIdx] === oIdx;
                        const isCorrect = q.correct === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelect(qIdx, oIdx)}
                            className={`w-full p-2.5 rounded text-left flex items-center justify-between border transition text-[11px] cursor-pointer ${
                              submitted
                                ? isCorrect
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                                  : isSelected
                                  ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                  : 'bg-stone-900/40 border-stone-800 text-stone-500'
                                : isSelected
                                ? 'bg-teal-950/80 border-teal-400 text-teal-200'
                                : 'bg-stone-900/60 hover:bg-stone-800/80 border-stone-800 text-stone-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {submitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                            {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <p className="text-[10px] text-emerald-300/90 pt-1 font-mono">
                        ✓ {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAB 2: EDUCATIONAL PANELS */}
          {activeTab === 'panels' && (
            <div className="space-y-3">
              <div className="p-3 bg-[#0a2319] border border-emerald-700/60 rounded-lg">
                <span className="font-pixel text-[10px] text-emerald-300 uppercase block mb-1">
                  CNB SUBSTANCE AWARENESS & HARMS REPOSITORY
                </span>
                <p className="text-[11px] text-emerald-100/90">
                  Substances do not solve stress or academic burdens — they induce irreversible physiological destruction and legal consequences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Cannabis / Weed */}
                <div className="p-3 bg-[#0b1411] border border-amber-900/60 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-[10px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>CANNABIS & ILLICIT WEED</span>
                  </div>
                  <p className="text-[10px] text-stone-300">
                    <strong>Myths vs Reality:</strong> Popular media falsely claims cannabis is benign. Clinically, THC disrupts teenage prefrontal cortex formation, impairs executive function, and triggers severe chronic schizophrenia and depression.
                  </p>
                </div>

                {/* Methamphetamine / Ice */}
                <div className="p-3 bg-[#0b1411] border border-rose-900/60 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-400 font-pixel text-[10px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>METHAMPHETAMINE ("ICE")</span>
                  </div>
                  <p className="text-[10px] text-stone-300">
                    <strong>Harms:</strong> Extremely potent neurotoxin. Causes catastrophic brain damage, severe cardiac arrhythmia, violent hallucinations, rapid dental decay, and severe irreversible paranoia.
                  </p>
                </div>

                {/* Ketamine */}
                <div className="p-3 bg-[#0b1411] border border-purple-900/60 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-purple-400 font-pixel text-[10px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>KETAMINE</span>
                  </div>
                  <p className="text-[10px] text-stone-300">
                    <strong>Harms:</strong> An anaesthetic that causes irreversible ulcerative cystitis (bladder shrinkage), excruciating urination, permanent memory blackout, and acute paralysis.
                  </p>
                </div>

                {/* Synthetic Opioids & Vapes */}
                <div className="p-3 bg-[#0b1411] border border-cyan-900/60 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-pixel text-[10px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>SYNTHETIC VAPES & PODS</span>
                  </div>
                  <p className="text-[10px] text-stone-300">
                    <strong>Harms:</strong> Illicit pods are frequently adulterated with synthetic cannabinoids (K2/Spice) and heavy metals. They cause sudden bronchospasm, seizures, and fatal respiratory arrest.
                  </p>
                </div>
              </div>

              {/* Singapore Legal Framework */}
              <div className="p-3.5 bg-[#0e1726] border border-blue-800/60 rounded-lg space-y-2">
                <span className="font-pixel text-[10px] text-sky-300 uppercase block">
                  SINGAPORE LEGAL FRAMEWORK • MISUSE OF DRUGS ACT (MDA)
                </span>
                <ul className="text-[10px] text-stone-300 space-y-1 list-disc list-inside">
                  <li><strong>Strict Zero Tolerance:</strong> Possession, consumption, and trafficking carry severe legal penalties, including mandatory caning and capital punishment for specified trafficking thresholds.</li>
                  <li><strong>Tobacco Act:</strong> Purchase, possession, and use of e-vaporisers/vapes is strictly illegal in Singapore with fines up to $2,000 and enhanced enforcement.</li>
                  <li><strong>Community Rehabilitation:</strong> Youths seeking help are guided into supportive Drug Rehabilitation Centres (DRC) and community supervision programmes.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: ANTI-DRUG PLEDGE & CERTIFICATE */}
          {activeTab === 'pledge' && (
            <div className="space-y-4">
              {!pledgeSigned ? (
                <div className="p-4 bg-[#0a1e16] border border-teal-700/60 rounded-lg space-y-3">
                  <span className="font-pixel text-[11px] text-teal-300 block">
                    TAKE THE NATIONAL DRUG-FREE YOUTH PLEDGE
                  </span>
                  <p className="text-[11px] text-stone-300">
                    Commit to a healthy, vibrant future. By signing the pledge, you promise to uphold clean living, support your peers in resisting pressure, and be a positive role model in Singapore.
                  </p>
                  <div className="space-y-2">
                    <label className="text-[10px] text-emerald-400 font-pixel block">
                      YOUR PLEDGE NAME:
                    </label>
                    <input
                      type="text"
                      value={pledgeName}
                      onChange={e => setPledgeName(e.target.value)}
                      className="w-full p-2 bg-black/60 border border-emerald-600 rounded text-emerald-200 font-pixel text-xs focus:outline-none focus:border-teal-400"
                      placeholder="Enter your name..."
                    />
                  </div>
                  <button
                    onClick={handleSignPledge}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-pixel text-xs rounded-lg shadow-lg transition cursor-pointer"
                  >
                    <Stamp className="w-4 h-4" />
                    <span>SIGN THE ANTI-DRUG PLEDGE</span>
                  </button>
                </div>
              ) : (
                <div className="p-5 bg-[#fefce8] border-4 border-[#b45309] rounded-lg shadow-2xl text-stone-900 space-y-3 relative overflow-hidden">
                  {/* Watermark Crest */}
                  <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
                    <ShieldCheck className="w-32 h-32 text-emerald-800" />
                  </div>

                  <div className="text-center border-b-2 border-amber-800/40 pb-2">
                    <span className="font-pixel text-[8px] text-amber-800 uppercase tracking-widest block">
                      REPUBLIC OF SINGAPORE • NCADA & CNB
                    </span>
                    <h3 className="font-pixel text-xs font-bold text-emerald-950 mt-1">
                      DRUG-FREE YOUTH AMBASSADOR CERTIFICATE
                    </h3>
                  </div>

                  <div className="text-center py-2 space-y-1">
                    <span className="text-[10px] text-stone-600 uppercase font-mono block">THIS CERTIFIES THAT</span>
                    <h4 className="font-serif text-lg font-bold text-emerald-900 underline decoration-amber-600">
                      {pledgeName || 'Singapore Youth Ambassador'}
                    </h4>
                    <p className="text-[10px] text-stone-700 italic max-w-md mx-auto pt-1 leading-relaxed">
                      "Has solemnly pledged to live a vibrant, drug-free life, to stand strong against peer pressure, and to empower their school and community towards resilience and health."
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-amber-800/30 text-[9px] font-mono text-stone-600">
                    <div className="text-left">
                      <span className="block font-bold text-emerald-950">DATE: {new Date().toLocaleDateString('en-GB')}</span>
                      <span>STATUS: OFFICIALLY COMMITTED</span>
                    </div>
                    <div className="text-right flex items-center gap-1.5 text-emerald-800 font-pixel text-[8px]">
                      <Award className="w-5 h-5 text-amber-600" />
                      <span>OFFICIAL NCADA SEAL</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#0d1a14] border-t border-emerald-900 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#063a2a] hover:bg-[#084e38] border border-emerald-700 rounded text-emerald-200 font-pixel text-[10px] transition cursor-pointer"
          >
            CLOSE
          </button>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`px-4 py-1.5 font-pixel text-[10px] rounded border transition ${
                allAnswered
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-300 hover:brightness-110 shadow-md cursor-pointer'
                  : 'bg-stone-800 border-stone-700 text-stone-500 cursor-not-allowed'
              }`}
            >
              SUBMIT ANSWERS
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 border-2 border-emerald-300 rounded text-white font-pixel text-[10px] shadow-lg transition active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4 text-emerald-100" />
              <span>
                COLLECT AMBASSADOR BADGE ({isRecoveryBufferActive ? '+36 RESILIENCE, +18 SOCIAL' : '+20 RESILIENCE, +10 SOCIAL'})
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
