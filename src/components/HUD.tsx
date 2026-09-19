import React, { useState } from 'react';
import { PlayerStats, LifeStageKey, GameRoom, PostSecondaryPath } from '../types';
import { 
  Heart, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Utensils, 
  Volume2, 
  VolumeX, 
  Sparkles,
  MapPin,
  Brain,
  ChevronDown
} from 'lucide-react';

interface HUDProps {
  stats: PlayerStats;
  stage: LifeStageKey;
  path: PostSecondaryPath;
  currentRoom: GameRoom;
  allRooms: GameRoom[];
  availableStageRooms: GameRoom[];
  isMuted: boolean;
  stageMilestones?: number;
  requiredMilestones?: number;
  stageCompleted?: boolean;
  isRecoveryBufferActive?: boolean;
  recoveryBufferRemaining?: number;
  onToggleMute: () => void;
  onOpenWardrobe: () => void;
  onSelectRoom: (roomId: string) => void;
}

export const HUD: React.FC<HUDProps> = ({
  stats,
  stage,
  path,
  currentRoom,
  availableStageRooms,
  isMuted,
  stageMilestones = 0,
  requiredMilestones = 4,
  stageCompleted = false,
  isRecoveryBufferActive = false,
  recoveryBufferRemaining = 0,
  onToggleMute,
  onOpenWardrobe,
  onSelectRoom
}) => {
  const [showTravelDropdown, setShowTravelDropdown] = useState(false);

  const getStageTitle = (s: LifeStageKey) => {
    switch (s) {
      case 'primary': return 'Primary School (Ages 7–12)';
      case 'secondary': return 'Secondary School (Ages 13–16)';
      case 'tertiary': return path ? `${path} (Ages 17–20)` : 'Tertiary Education (Ages 17–20)';
      case 'adult': return 'Adulthood & Career (Ages 21+)';
    }
  };

  const statItems = [
    {
      label: 'Resilience',
      value: Math.round(stats.resilience),
      icon: ShieldCheck,
      color: 'text-purple-400',
      barColor: 'from-purple-700 to-fuchsia-400',
      tip: 'Fortitude against negative peer pressure and temptations'
    },
    {
      label: 'Health',
      value: Math.round(stats.health),
      icon: Heart,
      color: 'text-rose-400',
      barColor: 'from-rose-700 to-rose-400',
      tip: 'Physical vitality, lung capacity, and stamina'
    },
    {
      label: 'Academics',
      value: Math.round(stats.academics),
      icon: GraduationCap,
      color: 'text-cyan-400',
      barColor: 'from-sky-700 to-cyan-400',
      tip: 'Academic focus, examinations, and cognitive sharpness'
    },
    {
      label: 'Energy',
      value: Math.round(stats.energy ?? stats.hunger ?? 85),
      icon: Utensils,
      color: 'text-amber-400',
      barColor: 'from-amber-700 to-amber-400',
      tip: 'Daily stamina and nutrition; restored at hawker centres & home'
    },
    {
      label: 'Mental',
      value: Math.round(stats.mentalHealth ?? 70),
      icon: Brain,
      color: 'text-teal-400',
      barColor: (stats.mentalHealth ?? 70) < 40 ? 'from-purple-900 to-rose-600' : 'from-teal-700 to-emerald-400',
      tip: 'Emotional well-being and stress tolerance'
    },
    {
      label: 'Social',
      value: Math.round(stats.social),
      icon: Users,
      color: 'text-pink-400',
      barColor: 'from-pink-700 to-pink-400',
      tip: 'Family trust, wholesome friendships, and community support'
    }
  ];

  return (
    <>
      {/* 1. TOP-LEFT COMPACT HUD (Stardew Valley Inspired) */}
      <div 
        id="compact-hud" 
        className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5 p-2 bg-[#2c1d11dd] backdrop-blur-md border-2 border-[#543315] rounded-md shadow-xl text-stone-100 max-w-[290px] select-none pointer-events-auto"
      >
        {/* Header row: Stage Badge & Quick Tools */}
        <div className="flex items-center justify-between gap-2 border-b border-[#543315] pb-1.5">
          <div className="flex flex-col">
            <span className="font-pixel text-[8px] text-amber-400 tracking-wider">
              {getStageTitle(stage)}
            </span>
            <span className="font-pixel text-[9px] text-stone-200 font-bold truncate">
              {currentRoom.name}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-pixel text-[7px] text-amber-300">
                Milestones: {stageMilestones}/{requiredMilestones}
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: requiredMilestones }).map((_, i) => (
                  <span
                    key={i}
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      i < stageMilestones ? 'bg-amber-400 shadow-[0_0_4px_#fbbf24]' : 'bg-stone-700'
                    }`}
                  />
                ))}
              </div>
              {stageCompleted && (
                <span className="font-pixel text-[6.5px] bg-emerald-900 text-emerald-300 px-1 rounded animate-pulse">
                  READY
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Sound Mute */}
            <button
              type="button"
              onClick={onToggleMute}
              className="p-1 bg-[#42250d] hover:bg-[#5e3514] border border-[#6b421a] rounded text-amber-200 transition"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            {/* Wardrobe Closet */}
            <button
              type="button"
              onClick={onOpenWardrobe}
              className="p-1 bg-[#5b21b6] hover:bg-[#6d28d9] border border-purple-400 rounded text-amber-300 transition"
              title="Open Wardrobe & Outfits"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 Compact Meter Rows in 2 Columns of 3 */}
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-1 pt-0.5">
          {statItems.map(item => {
            const Icon = item.icon;
            return (
              <div 
                key={item.label}
                title={`${item.label}: ${item.value}% - ${item.tip}`}
                className="flex flex-col gap-0.5 group cursor-help"
              >
                <div className="flex items-center justify-between text-[8px] font-pixel leading-none">
                  <span className={`flex items-center gap-1 ${item.color}`}>
                    <Icon className="w-2.5 h-2.5" />
                    <span>{item.label}</span>
                  </span>
                  <span className="text-stone-300">{item.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-900 border border-stone-700/80 rounded-xs overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.barColor} transition-all duration-300`}
                    style={{ width: `${Math.max(0, Math.min(100, item.value))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Glowing Recovery Buffer Active Badge */}
        {isRecoveryBufferActive && (
          <div className="mt-1 pt-1 border-t border-[#0d9488]/60 flex items-center justify-between gap-1.5 px-1.5 py-1 bg-gradient-to-r from-teal-950/90 to-emerald-950/90 rounded border border-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.6)] animate-pulse">
            <span className="flex items-center gap-1 font-pixel text-[8px] text-teal-300 font-bold">
              <Sparkles className="w-2.5 h-2.5 text-teal-300 animate-spin" />
              <span>RECOVERY BUFFER (1.8x STATS)</span>
            </span>
            <span className="font-pixel text-[8px] bg-teal-800 text-teal-100 px-1 py-0.2 rounded">
              {recoveryBufferRemaining} LEFT
            </span>
          </div>
        )}
      </div>

      {/* 2. TOP-RIGHT QUICK-TRAVEL OVERLAY */}
      <div 
        id="quick-travel-overlay"
        className="absolute top-2.5 right-2.5 z-20 flex flex-col items-end pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={() => setShowTravelDropdown(prev => !prev)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#2c1d11dd] backdrop-blur-md hover:bg-[#3d2716] border-2 border-[#543315] rounded-md text-amber-200 font-pixel text-[8px] shadow-lg transition"
        >
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>QUICK TRAVEL</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${showTravelDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {showTravelDropdown && (
          <div className="mt-1 w-52 p-1.5 bg-[#20150cee] backdrop-blur-md border-2 border-[#543315] rounded-md shadow-2xl flex flex-col gap-1 max-h-72 overflow-y-auto">
            <span className="font-pixel text-[7px] text-amber-400/90 px-1 py-0.5 uppercase tracking-wider">
              {getStageTitle(stage)} Locations:
            </span>
            {availableStageRooms.map(room => {
              const isActive = currentRoom.id === room.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => {
                    setShowTravelDropdown(false);
                    onSelectRoom(room.id);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded text-[8px] font-pixel flex items-center justify-between transition border ${
                    isActive
                      ? 'bg-amber-700/80 text-amber-100 border-amber-500 font-bold'
                      : 'bg-[#2d1b0f] text-stone-300 border-[#472a15] hover:bg-[#3e2413] hover:text-white'
                  }`}
                >
                  <span className="truncate">{room.name}</span>
                  {isActive && <span className="text-[7px] text-amber-300 ml-1">● HERE</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
