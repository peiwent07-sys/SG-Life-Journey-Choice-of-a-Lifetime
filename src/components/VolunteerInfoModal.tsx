import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Users, 
  ExternalLink, 
  QrCode, 
  CheckCircle2, 
  PhoneCall, 
  Award,
  X
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface VolunteerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPledgeVolunteer: () => void;
}

export const VolunteerInfoModal: React.FC<VolunteerInfoModalProps> = ({
  isOpen,
  onClose,
  onPledgeVolunteer
}) => {
  if (!isOpen) return null;

  const handlePledge = () => {
    soundEngine.playResistSuccess();
    onPledgeVolunteer();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3">
      <div className="relative w-full max-w-2xl bg-[#1e150e] border-3 border-[#78461b] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#3e2412] to-[#5a3216] border-b-2 border-[#78461b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-pixel text-[9px] text-amber-400 tracking-widest uppercase">
                CIVIC PARTICIPATION & REAL-WORLD IMPACT
              </span>
              <h2 className="font-pixel text-base text-white">
                Volunteer at Anti-Drug Initiatives in Singapore
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-[#2b180d] hover:bg-[#42250d] text-amber-200 border border-[#633b19] rounded-md transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-stone-200 text-xs leading-relaxed">
          {/* Hero Banner */}
          <div className="p-3.5 bg-[#2a1b10] border border-amber-900/60 rounded-lg flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-amber-100">
              In real life, youth play a pivotal role in keeping Singapore safe and drug-free. 
              Discover how you can take civic action, empower peers, and lead preventive drug education roadshows.
            </p>
          </div>

          {/* 3 Main Real-Life Pathways */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* CNB Anti-Drug Advocate (DAD) */}
            <div className="p-3.5 bg-[#17120c] border border-emerald-900/60 rounded-lg flex flex-col justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-pixel text-[11px] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CNB Anti-Drug Advocate Programme</span>
                </div>
                <p className="text-stone-300 text-[11px]">
                  Join the <strong>Central Narcotics Bureau (CNB)</strong> youth movement. Receive specialized training 
                  to lead community outreach, facilitate school assembly roadshows, and engage vulnerable youths.
                </p>
              </div>
              <div className="text-[10px] text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-800/40">
                ✓ Eligibility: Students aged 15-25 & Young Working Adults
              </div>
            </div>

            {/* NCADA Youth Innovation */}
            <div className="p-3.5 bg-[#17120c] border border-cyan-900/60 rounded-lg flex flex-col justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-pixel text-[11px] mb-1">
                  <Users className="w-4 h-4" />
                  <span>NCADA Youth Grassroots Projects</span>
                </div>
                <p className="text-stone-300 text-[11px]">
                  Collaborate with the <strong>National Council Against Drug Abuse (NCADA)</strong>. Pitch creative anti-drug media, 
                  short films, and social campaigns funded by the NCADA Youth Grant.
                </p>
              </div>
              <div className="text-[10px] text-cyan-300 bg-cyan-950/40 p-2 rounded border border-cyan-800/40">
                ✓ Grants up to $10,000 for student-led anti-drug projects
              </div>
            </div>
          </div>

          {/* QR Code & How to Sign Up Section */}
          <div className="p-4 bg-[#26170d] border-2 border-[#5a3216] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center sm:text-left">
              <h4 className="font-pixel text-[11px] text-amber-300">
                HOW TO REGISTER AS A VOLUNTEER
              </h4>
              <p className="text-stone-300 text-[11px]">
                Visit the official volunteer portal on <strong>CNB.gov.sg/volunteer</strong> or 
                register through the Youth Corps Singapore platform.
              </p>
              <div className="flex items-center gap-3 pt-1 text-[10px] text-stone-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Peer Leadership
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Certificate of Service
                </span>
              </div>
            </div>

            {/* QR Code Simulation Graphic */}
            <div className="flex flex-col items-center gap-1 p-2.5 bg-white rounded-md shrink-0 shadow-md">
              <QrCode className="w-16 h-16 text-stone-900" />
              <span className="font-pixel text-[7px] text-stone-700 tracking-tighter">
                SCAN TO REGISTER
              </span>
            </div>
          </div>

          {/* National Help & Reporting Hotlines */}
          <div className="p-3 bg-[#16120e] border border-stone-800 rounded-lg">
            <div className="flex items-center gap-2 text-amber-400 font-pixel text-[10px] mb-2">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>SINGAPORE HELPLINES & COUNSELING</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-stone-900/60 rounded border border-stone-800">
                <span className="text-stone-400 block text-[9px]">CNB Anti-Drug Hotline (24/7)</span>
                <span className="text-emerald-400 font-mono font-bold text-[12px]">1800-732-4444</span>
              </div>
              <div className="p-2 bg-stone-900/60 rounded border border-stone-800">
                <span className="text-stone-400 block text-[9px]">SAMH Mental Health Helpline</span>
                <span className="text-teal-400 font-mono font-bold text-[12px]">1800-283-7019</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 bg-[#24150b] border-t border-[#543315] flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#381f0d] hover:bg-[#4f2c14] border border-[#6b3e1a] rounded text-stone-300 font-pixel text-[10px] transition"
          >
            CLOSE
          </button>
          <button
            onClick={handlePledge}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 border-2 border-emerald-300 rounded text-white font-pixel text-[10px] shadow-lg transition active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-100" />
            <span>TAKE VOLUNTEER PLEDGE (+25 RESILIENCE, +15 SOCIAL)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
