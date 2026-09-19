import React, { useState } from 'react';
import { AvatarConfig, CosmeticCategory, CosmeticItem } from '../types';
import { COSMETICS_CATALOG } from '../data/cosmeticsData';
import { Sparkles, Lock, Check, X, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface WardrobeModalProps {
  avatar: AvatarConfig;
  resiliencePoints: number;
  unlockedItemIds: string[];
  onEquipItem: (category: CosmeticCategory, itemId: string) => void;
  onUnlockItem: (item: CosmeticItem) => void;
  onClose: () => void;
}

export const WardrobeModal: React.FC<WardrobeModalProps> = ({
  avatar,
  resiliencePoints,
  unlockedItemIds,
  onEquipItem,
  onUnlockItem,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<CosmeticCategory>('hair');

  const categories: { key: CosmeticCategory; label: string }[] = [
    { key: 'hair', label: 'HAIRSTYLES' },
    { key: 'outfit', label: 'OUTFITS' },
    { key: 'accessory', label: 'ACCESSORIES' },
    { key: 'aura', label: 'AURAS' }
  ];

  const filteredItems = COSMETICS_CATALOG.filter(item => item.category === activeTab);

  const isEquipped = (item: CosmeticItem) => {
    switch (item.category) {
      case 'hair': return avatar.equippedHairId === item.id;
      case 'outfit': return avatar.equippedOutfitId === item.id;
      case 'accessory': return avatar.equippedAccessoryId === item.id;
      case 'aura': return avatar.equippedAuraId === item.id;
    }
  };

  const isUnlocked = (item: CosmeticItem) => {
    return item.unlockedByDefault || unlockedItemIds.includes(item.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 overflow-y-auto">
      <div className="pixel-box max-w-2xl w-full p-5 text-stone-900 rounded-lg my-auto shadow-2xl flex flex-col gap-3.5">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#543315] pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-900" />
            <div>
              <h2 className="font-pixel text-sm text-[#2e190b] font-bold">
                FANTAGE COSMETICS CLOSET
              </h2>
              <span className="font-sans-sg text-xs text-stone-700">
                Dress up your chibi avatar with unlockable styles & auras
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Resilience Points Balance */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-800 to-indigo-900 text-amber-200 rounded-full border border-purple-400 font-pixel text-[9px] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>{resiliencePoints} PTS</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded bg-[#4a2e15] hover:bg-[#6b421a] text-amber-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1.5">
          {categories.map(cat => (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setActiveTab(cat.key);
                soundEngine.playClick();
              }}
              className={`py-1.5 font-pixel text-[9px] rounded border transition ${
                activeTab === cat.key
                  ? 'bg-[#543315] text-amber-200 border-[#2e190b] shadow-sm'
                  : 'bg-[#edd2af] border-[#855223] text-stone-800 hover:bg-[#faebd7]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cosmetics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
          {filteredItems.map(item => {
            const unlocked = isUnlocked(item);
            const equipped = isEquipped(item);
            const canAfford = resiliencePoints >= item.costResilience;

            return (
              <div
                key={item.id}
                className={`p-3 rounded-md border-2 transition flex flex-col justify-between gap-2 shadow-sm ${
                  equipped
                    ? 'bg-[#fef08a] border-[#ca8a04]'
                    : unlocked
                    ? 'bg-[#fcf5ec] border-[#855223]'
                    : 'bg-[#e2d6c5] border-stone-400 opacity-85'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Visual Color Chip / Icon */}
                    <div
                      className="w-5 h-5 rounded-full border border-stone-600 shrink-0 shadow-inner"
                      style={{ backgroundColor: item.previewColor || '#94a3b8' }}
                    />
                    <span className="font-pixel text-[9px] font-bold text-stone-900 leading-tight">
                      {item.name}
                    </span>
                  </div>

                  {item.badge && (
                    <span className="font-pixel text-[7px] px-1.5 py-0.5 rounded bg-[#4a2e15] text-amber-200 uppercase shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="font-sans-sg text-xs text-stone-700 leading-snug">
                  {item.description}
                </p>

                {/* Equip / Unlock Controls */}
                <div className="flex items-center justify-between pt-1 border-t border-stone-300/60 mt-auto">
                  {!unlocked ? (
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => onUnlockItem(item)}
                      className={`flex items-center gap-1 px-3 py-1 font-pixel text-[8px] rounded border transition ${
                        canAfford
                          ? 'bg-purple-700 hover:bg-purple-800 text-white border-purple-900 shadow-sm'
                          : 'bg-stone-400 text-stone-200 border-stone-500 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>UNLOCK ({item.costResilience} PTS)</span>
                    </button>
                  ) : equipped ? (
                    <span className="flex items-center gap-1 font-pixel text-[8px] text-emerald-800 font-bold">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> EQUIPPED
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onEquipItem(item.category, item.id)}
                      className="px-3 py-1 bg-[#543315] hover:bg-[#3d2311] text-amber-100 font-pixel text-[8px] rounded border border-[#2e190b] transition shadow-sm"
                    >
                      EQUIP ITEM
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info & Close */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-[#543315]">
          <span className="font-sans-sg text-xs text-stone-700">
            Earn Resilience Points by resisting substances across your lifetime runs!
          </span>
          <button
            type="button"
            onClick={onClose}
            className="pixel-btn px-4 py-1.5 text-stone-950 font-pixel text-[9px] font-bold uppercase tracking-wider shadow-sm"
          >
            SAVE & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
