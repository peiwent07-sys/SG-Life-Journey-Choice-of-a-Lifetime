import React from 'react';
import { Laptop, ShieldAlert, CheckCircle, AlertOctagon, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface LaptopWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSafeReport: () => void;
  onNegativeChoice: () => void;
}

export const LaptopWarningModal: React.FC<LaptopWarningModalProps> = ({
  isOpen,
  onClose,
  onSafeReport,
  onNegativeChoice
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3">
      <div className="relative w-full max-w-lg bg-[#18141e] border-3 border-[#6b21a8] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#2e1065] border-b-2 border-[#7e22ce] flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-200">
            <Laptop className="w-5 h-5 text-purple-400" />
            <span className="font-pixel text-[11px] text-white">
              Campus Laptop: Online Safety Warning
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 bg-[#1e1b4b] hover:bg-[#312e81] text-purple-200 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-stone-200 leading-relaxed">
          <div className="p-3 bg-[#24103c] border border-purple-800/60 rounded-lg flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-purple-100">
              An unverified chat message on your browser suggests looking into illicit substances online. 
              Singapore laws strictly prohibit purchasing, importing, or possessing harmful contraband through postal or courier channels.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-pixel text-[10px] text-amber-300">
              HOW DO YOU RESPOND TO THIS ONLINE SOLICITATION?
            </p>

            {/* Safe Refusal & Report Option */}
            <button
              onClick={() => {
                soundEngine.playResistSuccess();
                onSafeReport();
              }}
              className="w-full p-3 bg-emerald-950/70 hover:bg-emerald-900/80 border-2 border-emerald-500 rounded-lg text-left flex items-start gap-3 transition"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-pixel text-[10px] text-emerald-200">
                  Close browser and report suspicious solicitation
                </strong>
                <span className="text-[11px] text-emerald-100/90">
                  Resist curiosity, safeguard your records, and alert official cyber-safety channels (+25 Resilience, +15 Academics).
                </span>
              </div>
            </button>

            {/* Negative Risky Option */}
            <button
              onClick={() => {
                soundEngine.playDrugAcceptDamage();
                onNegativeChoice();
              }}
              className="w-full p-3 bg-rose-950/70 hover:bg-rose-900/80 border-2 border-rose-600 rounded-lg text-left flex items-start gap-3 transition"
            >
              <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-pixel text-[10px] text-rose-300">
                  Give in to curiosity and browse illicit marketplaces
                </strong>
                <span className="text-[11px] text-rose-200/90">
                  Violates cyber laws, risks heavy legal interception, anxiety, and sharp mental health decline (-35 Health, -30 Resilience, -25 Mental).
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
