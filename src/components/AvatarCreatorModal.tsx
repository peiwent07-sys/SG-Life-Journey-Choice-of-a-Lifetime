import React, { useState } from 'react';
import { AvatarConfig, FamilyBackground, Gender, FaceExpression, WardrobeStyle } from '../types';
import { FAMILY_BACKGROUNDS } from '../data/dilemmasData';
import { Dice5, Check, RefreshCw, Smile, Shirt, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface AvatarCreatorModalProps {
  onComplete: (avatar: AvatarConfig, background: FamilyBackground) => void;
}

const BOY_HAIRSTYLES = [
  { id: 0, label: 'Neat School Crop' },
  { id: 1, label: 'Classic Side Part' },
  { id: 2, label: 'Curtain Bangs' },
  { id: 3, label: 'Clean Buzz Cut' },
  { id: 4, label: 'Undercut Fade' },
  { id: 5, label: 'Sporty Spikes' }
];

const GIRL_HAIRSTYLES = [
  { id: 0, label: 'High Ponytail' },
  { id: 1, label: 'Twin Braids' },
  { id: 2, label: 'School Bob & Fringe' },
  { id: 3, label: 'Flowing Waves' },
  { id: 4, label: 'Half-Up Bun' },
  { id: 5, label: 'Chic Pixie' }
];

const HAIR_COLOURS = [
  { label: 'Natural Black', hex: '#1c1917' },
  { label: 'Dark Chestnut', hex: '#3b2219' },
  { label: 'Espresso', hex: '#451a03' },
  { label: 'Golden Honey', hex: '#b45309' },
  { label: 'Slate Ash', hex: '#475569' },
  { label: 'Warm Amber', hex: '#d97706' }
];

const SKIN_TONES = [
  { label: 'Fair Peach', hex: '#fed7aa' },
  { label: 'Warm Beige', hex: '#fcd34d' },
  { label: 'Golden Tan', hex: '#d97706' },
  { label: 'Rich Chestnut', hex: '#9a3412' },
  { label: 'Deep Amber', hex: '#78350f' }
];

const EXPRESSIONS: { id: FaceExpression; label: string }[] = [
  { id: 'cheerful', label: 'Cheerful' },
  { id: 'calm', label: 'Calm' },
  { id: 'determined', label: 'Determined' },
  { id: 'focused', label: 'Focused' },
  { id: 'gentle', label: 'Gentle' }
];

const BOY_WARDROBES: { id: WardrobeStyle; label: string; desc: string; shirt: string; pants: string }[] = [
  { id: 'uniform', label: 'School Uniform', desc: 'White shirt & navy school shorts', shirt: '#ffffff', pants: '#1e3a8a' },
  { id: 'casual', label: 'Streetwear Tee', desc: 'Graphic tee & cargo shorts', shirt: '#0284c7', pants: '#334155' },
  { id: 'sporty', label: 'Track Jersey', desc: 'Breathable sports singlet & shorts', shirt: '#dc2626', pants: '#0f172a' },
  { id: 'smart_casual', label: 'Collared Polo', desc: 'Collared polo & tailored chinos', shirt: '#475569', pants: '#1e293b' }
];

const GIRL_WARDROBES: { id: WardrobeStyle; label: string; desc: string; shirt: string; pants: string }[] = [
  { id: 'uniform', label: 'School Pinafore', desc: 'Crisp blouse with navy pleated pinafore', shirt: '#ffffff', pants: '#1e3a8a' },
  { id: 'casual', label: 'Pastel Skirt Set', desc: 'Lilac tee with pleated skater skirt', shirt: '#e0e7ff', pants: '#db2777' },
  { id: 'sporty', label: 'Athletic Track', desc: 'Zipped track jacket & running shorts', shirt: '#059669', pants: '#0f172a' },
  { id: 'smart_casual', label: 'Blouse & Midi', desc: 'Smart button blouse & pleated midi skirt', shirt: '#f8fafc', pants: '#475569' }
];

export const AvatarCreatorModal: React.FC<AvatarCreatorModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('Jun Wei');
  const [gender, setGender] = useState<Gender>('boy');
  const [hairStyle, setHairStyle] = useState(1);
  const [hairColour, setHairColour] = useState('#1c1917');
  const [skinTone, setSkinTone] = useState('#fed7aa');
  const [expression, setExpression] = useState<FaceExpression>('cheerful');
  const [wardrobe, setWardrobe] = useState<WardrobeStyle>('uniform');

  // Gender-specific lists
  const currentHairstyles = gender === 'boy' ? BOY_HAIRSTYLES : GIRL_HAIRSTYLES;
  const currentWardrobes = gender === 'boy' ? BOY_WARDROBES : GIRL_WARDROBES;

  // Change gender handler
  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);
    soundEngine.playClick();
    if (newGender === 'boy') {
      if (name === 'Chloe' || !name) setName('Jun Wei');
    } else {
      if (name === 'Jun Wei' || !name) setName('Chloe');
    }
  };

  // Random family background
  const [familyIndex, setFamilyIndex] = useState(0);

  const rollFamily = () => {
    soundEngine.playClick();
    const nextIdx = Math.floor(Math.random() * FAMILY_BACKGROUNDS.length);
    setFamilyIndex(nextIdx);
  };

  const selectedWardrobe = currentWardrobes.find(w => w.id === wardrobe) || currentWardrobes[0];

  const handleFinish = () => {
    soundEngine.playResistSuccess();
    const finalAvatar: AvatarConfig = {
      name: name.trim() || (gender === 'boy' ? 'Jayden' : 'Chloe'),
      gender,
      hairStyle,
      hairColor: hairColour,
      hairColour,
      skinTone,
      shirtColor: selectedWardrobe.shirt,
      pantsColor: selectedWardrobe.pants,
      faceExpression: expression,
      wardrobeStyle: wardrobe,
      equippedHairId: `hair_${gender}_${hairStyle}`,
      equippedOutfitId: `outfit_${gender}_${wardrobe}`,
      equippedAccessoryId: 'acc_backpack',
      equippedAuraId: 'aura_none'
    };
    onComplete(finalAvatar, FAMILY_BACKGROUNDS[familyIndex]);
  };

  const currentBg = FAMILY_BACKGROUNDS[familyIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 overflow-y-auto">
      <div className="pixel-box max-w-2xl w-full p-5 text-stone-900 flex flex-col gap-3 rounded-lg my-auto shadow-2xl bg-[#edd2af] border-4 border-[#543315]">
        {/* Title */}
        <div className="text-center border-b-2 border-[#543315] pb-2.5">
          <div className="flex items-center justify-center gap-1.5 text-[#543315] font-pixel text-[9px] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>SINGAPORE CITIZEN REGISTRY</span>
          </div>
          <h1 className="font-pixel text-lg text-[#2e190b] tracking-wider mt-0.5">
            CHARACTER CREATION & ORIGIN
          </h1>
          <p className="font-sans-sg text-xs text-[#543315]">
            Customise your Singaporean persona before stepping into your lifelong journey.
          </p>
        </div>

        {/* Two Column Section: Preview & Options */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Avatar Preview Box (Left 4 cols) */}
          <div className="md:col-span-4 bg-[#fdf5eb] border-2 border-[#855223] rounded-md p-3 flex flex-col items-center justify-between shadow-inner">
            <span className="font-pixel text-[8px] text-[#543315] tracking-wider">
              AVATAR PREVIEW
            </span>
            
            {/* Styled Character Vector Sprite */}
            <div className="relative w-32 h-44 flex items-center justify-center my-1 bg-[#fffaf3] rounded border border-[#c49b6b] shadow-sm">
              <svg width="110" height="150" viewBox="0 0 100 140" className="overflow-visible">
                {/* Shadow */}
                <ellipse cx="50" cy="128" rx="24" ry="6" fill="#cbd5e1" />

                {/* Shoes */}
                <rect x="34" y="116" width="12" height="10" fill="#1e293b" rx="2" />
                <rect x="54" y="116" width="12" height="10" fill="#1e293b" rx="2" />

                {/* Pants / Skirt depending on gender */}
                {gender === 'girl' ? (
                  /* Girl bottoms: Skirt or Pinafore lower half */
                  <>
                    <polygon
                      points="30,92 70,92 76,118 24,118"
                      fill={selectedWardrobe.pants}
                    />
                    {/* Pleat shadow lines */}
                    <line x1="38" y1="94" x2="36" y2="116" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                    <line x1="50" y1="94" x2="50" y2="116" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                    <line x1="62" y1="94" x2="64" y2="116" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                  </>
                ) : (
                  /* Boy bottoms: Shorts / Chinos */
                  <>
                    <rect x="32" y="92" width="36" height="26" fill={selectedWardrobe.pants} rx="3" />
                    {wardrobe === 'sporty' && (
                      <rect x="34" y="92" width="2" height="26" fill="#ffffff" />
                    )}
                  </>
                )}

                {/* Shirt / Attire */}
                <rect x="30" y="60" width="40" height="34" fill={selectedWardrobe.shirt} rx="4" />
                
                {/* Specific Attire details based on Gender */}
                {gender === 'girl' && wardrobe === 'uniform' && (
                  /* School pinafore straps over blouse */
                  <>
                    <rect x="36" y="60" width="7" height="34" fill="#1e3a8a" />
                    <rect x="57" y="60" width="7" height="34" fill="#1e3a8a" />
                    {/* School badge */}
                    <rect x="38" y="74" width="4" height="4" fill="#dc2626" rx="1" />
                  </>
                )}
                {gender === 'boy' && wardrobe === 'uniform' && (
                  /* School uniform red tie & badge */
                  <>
                    <polygon points="50,60 44,74 56,74" fill="#dc2626" />
                    <rect x="60" y="66" width="6" height="6" fill="#dc2626" rx="1" />
                  </>
                )}
                {wardrobe === 'smart_casual' && (
                  <path d="M 42 60 L 50 78 L 58 60" stroke="#94a3b8" strokeWidth="2" fill="none" />
                )}

                {/* Head */}
                <circle cx="50" cy="40" r="22" fill={skinTone} />

                {/* Eyes according to Expression */}
                {expression === 'cheerful' && (
                  <>
                    <path d="M 40 38 Q 44 32 48 38" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M 52 38 Q 56 32 60 38" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </>
                )}
                {expression === 'calm' && (
                  <>
                    <line x1="40" y1="36" x2="47" y2="36" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="53" y1="36" x2="60" y2="36" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                  </>
                )}
                {expression === 'determined' && (
                  <>
                    <line x1="40" y1="34" x2="48" y2="37" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="52" y1="37" x2="60" y2="34" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="44" cy="38" r="2" fill="#0f172a" />
                    <circle cx="56" cy="38" r="2" fill="#0f172a" />
                  </>
                )}
                {expression === 'focused' && (
                  <>
                    <rect x="40" y="34" width="7" height="6" fill="#0f172a" rx="1.5" />
                    <rect x="53" y="34" width="7" height="6" fill="#0f172a" rx="1.5" />
                    <rect x="42" y="35" width="2" height="2" fill="#ffffff" />
                    <rect x="55" y="35" width="2" height="2" fill="#ffffff" />
                  </>
                )}
                {expression === 'gentle' && (
                  <>
                    <ellipse cx="44" cy="37" rx="3" ry="4" fill="#0f172a" />
                    <ellipse cx="56" cy="37" rx="3" ry="4" fill="#0f172a" />
                    <circle cx="45" cy="36" r="1" fill="#ffffff" />
                    <circle cx="57" cy="36" r="1" fill="#ffffff" />
                  </>
                )}

                {/* Rosy Cheeks */}
                <circle cx="35" cy="44" r="3" fill="#f472b6" opacity="0.6" />
                <circle cx="65" cy="44" r="3" fill="#f472b6" opacity="0.6" />

                {/* Mouth */}
                <path d="M 46 47 Q 50 51 54 47" stroke="#4a2810" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Hairstyles (Gender-Specific) */}
                {gender === 'boy' ? (
                  /* BOY HAIRSTYLES */
                  <>
                    {hairStyle === 0 && (
                      /* Neat School Crop */
                      <path d="M 28 36 C 28 16, 72 16, 72 36 L 72 26 C 72 16, 28 16, 28 26 Z" fill={hairColour} />
                    )}
                    {hairStyle === 1 && (
                      /* Side Part */
                      <>
                        <path d="M 26 38 C 26 16, 74 16, 74 38 L 74 28 C 74 16, 26 16, 26 28 Z" fill={hairColour} />
                        <path d="M 32 26 Q 44 20 68 28 L 70 34 Q 46 24 30 30 Z" fill={hairColour} />
                      </>
                    )}
                    {hairStyle === 2 && (
                      /* Curtain Bangs */
                      <>
                        <path d="M 26 38 C 26 15, 74 15, 74 38 L 74 26 C 74 14, 26 14, 26 26 Z" fill={hairColour} />
                        <path d="M 30 26 Q 42 22 48 36 L 44 38 Q 40 26 28 30 Z" fill={hairColour} />
                        <path d="M 70 26 Q 58 22 52 36 L 56 38 Q 60 26 72 30 Z" fill={hairColour} />
                      </>
                    )}
                    {hairStyle === 3 && (
                      /* Clean Buzz Cut */
                      <path d="M 30 34 C 30 20, 70 20, 70 34 L 70 28 C 70 19, 30 19, 30 28 Z" fill={hairColour} />
                    )}
                    {hairStyle === 4 && (
                      /* Undercut Fade */
                      <>
                        <rect x="27" y="26" width="46" height="8" fill={hairColour} rx="2" />
                        <path d="M 30 26 Q 50 14 70 26 Z" fill={hairColour} />
                      </>
                    )}
                    {hairStyle === 5 && (
                      /* Sporty Spikes */
                      <>
                        <path d="M 28 36 C 28 16, 72 16, 72 36 L 72 26 C 72 16, 28 16, 28 26 Z" fill={hairColour} />
                        <polygon points="36,24 40,14 44,24" fill={hairColour} />
                        <polygon points="46,22 50,12 54,22" fill={hairColour} />
                        <polygon points="56,24 60,14 64,24" fill={hairColour} />
                      </>
                    )}
                  </>
                ) : (
                  /* GIRL HAIRSTYLES */
                  <>
                    {hairStyle === 0 && (
                      /* High Ponytail */
                      <>
                        <path d="M 26 38 C 26 16, 74 16, 74 38 L 74 26 C 74 16, 26 16, 26 26 Z" fill={hairColour} />
                        <circle cx="21" cy="22" r="11" fill={hairColour} />
                        <rect x="24" y="22" width="5" height="7" fill="#dc2626" rx="2" />
                      </>
                    )}
                    {hairStyle === 1 && (
                      /* Twin Braids */
                      <>
                        <path d="M 26 38 C 26 16, 74 16, 74 38 L 74 26 C 74 16, 26 16, 26 26 Z" fill={hairColour} />
                        <rect x="21" y="34" width="7" height="26" fill={hairColour} rx="3" />
                        <rect x="72" y="34" width="7" height="26" fill={hairColour} rx="3" />
                        <rect x="21" y="56" width="7" height="4" fill="#f43f5e" rx="1" />
                        <rect x="72" y="56" width="7" height="4" fill="#f43f5e" rx="1" />
                      </>
                    )}
                    {hairStyle === 2 && (
                      /* School Bob with Fringe */
                      <>
                        <path d="M 24 46 C 24 16, 76 16, 76 46 L 76 26 C 76 15, 24 15, 24 26 Z" fill={hairColour} />
                        <rect x="24" y="28" width="8" height="22" fill={hairColour} rx="2" />
                        <rect x="68" y="28" width="8" height="22" fill={hairColour} rx="2" />
                        <rect x="32" y="24" width="36" height="8" fill={hairColour} rx="2" />
                      </>
                    )}
                    {hairStyle === 3 && (
                      /* Long Flowing Waves */
                      <>
                        <path d="M 22 56 C 22 14, 78 14, 78 56 L 78 26 C 78 12, 22 12, 22 26 Z" fill={hairColour} />
                        <circle cx="34" cy="18" r="7" fill={hairColour} />
                        <circle cx="50" cy="16" r="8" fill={hairColour} />
                        <circle cx="66" cy="19" r="7" fill={hairColour} />
                        <rect x="20" y="36" width="9" height="34" fill={hairColour} rx="4" />
                        <rect x="71" y="36" width="9" height="34" fill={hairColour} rx="4" />
                      </>
                    )}
                    {hairStyle === 4 && (
                      /* Half-Up Bun */
                      <>
                        <path d="M 24 46 C 24 16, 76 16, 76 46 L 76 26 C 76 15, 24 15, 24 26 Z" fill={hairColour} />
                        <circle cx="50" cy="12" r="9" fill={hairColour} />
                        <rect x="46" y="16" width="8" height="4" fill="#f43f5e" rx="1" />
                      </>
                    )}
                    {hairStyle === 5 && (
                      /* Chic Pixie */
                      <>
                        <path d="M 27 38 C 27 16, 73 16, 73 38 L 73 26 C 73 16, 27 16, 27 26 Z" fill={hairColour} />
                        <polygon points="38,26 44,18 48,26" fill={hairColour} />
                        <polygon points="48,26 54,17 58,26" fill={hairColour} />
                      </>
                    )}
                  </>
                )}
              </svg>
            </div>

            <div className="text-center mt-1">
              <span className="font-pixel text-[10px] text-[#2e190b] font-bold block">
                {name || 'Singapore Citizen'}
              </span>
              <span className="font-sans-sg text-[11px] text-stone-600 block capitalize">
                {gender} · {selectedWardrobe.label}
              </span>
            </div>
          </div>

          {/* Customisation Controls (Right 8 cols) */}
          <div className="md:col-span-8 flex flex-col gap-2.5">
            {/* Name & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="font-pixel text-[8px] text-[#3d2311] block mb-1">
                  CHARACTER NAME
                </label>
                <input
                  type="text"
                  value={name}
                  maxLength={16}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-2.5 py-1 bg-[#fef7ee] border-2 border-[#543315] rounded text-xs font-sans-sg text-stone-900 font-semibold focus:outline-none"
                  placeholder="e.g. Rachel, Jayden"
                />
              </div>

              <div>
                <label className="font-pixel text-[8px] text-[#3d2311] block mb-1">
                  GENDER IDENTITY
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleGenderChange('boy')}
                    className={`py-1 font-pixel text-[8px] rounded border-2 transition ${
                      gender === 'boy'
                        ? 'bg-[#1e3a8a] text-white border-[#0f172a]'
                        : 'bg-[#edd2af] border-[#855223] text-stone-800'
                    }`}
                  >
                    BOY
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange('girl')}
                    className={`py-1 font-pixel text-[8px] rounded border-2 transition ${
                      gender === 'girl'
                        ? 'bg-[#db2777] text-white border-[#831843]'
                        : 'bg-[#edd2af] border-[#855223] text-stone-800'
                    }`}
                  >
                    GIRL
                  </button>
                </div>
              </div>
            </div>

            {/* Expression */}
            <div>
              <label className="font-pixel text-[8px] text-[#3d2311] flex items-center gap-1 mb-1">
                <Smile className="w-3 h-3 text-amber-800" />
                <span>FACIAL EXPRESSION</span>
              </label>
              <div className="grid grid-cols-5 gap-1">
                {EXPRESSIONS.map(exp => (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => { setExpression(exp.id); soundEngine.playClick(); }}
                    className={`py-1 font-pixel text-[7.5px] rounded border transition ${
                      expression === exp.id
                        ? 'bg-[#543315] text-amber-200 border-[#2e190b]'
                        : 'bg-[#fdf6ec] border-[#855223] text-stone-800 hover:bg-[#faebd7]'
                    }`}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wardrobe Style (Gender-Specific) */}
            <div>
              <label className="font-pixel text-[8px] text-[#3d2311] flex items-center gap-1 mb-1">
                <Shirt className="w-3 h-3 text-amber-800" />
                <span>{gender.toUpperCase()} WARDROBE & ATTIRE</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                {currentWardrobes.map(w => (
                  <button
                    key={w.id}
                    type="button"
                    title={w.desc}
                    onClick={() => { setWardrobe(w.id); soundEngine.playClick(); }}
                    className={`py-1 px-1 font-pixel text-[7.5px] rounded border transition text-center truncate ${
                      wardrobe === w.id
                        ? 'bg-[#543315] text-amber-200 border-[#2e190b]'
                        : 'bg-[#fdf6ec] border-[#855223] text-stone-800 hover:bg-[#faebd7]'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hairstyle Selection (Gender-Specific) */}
            <div>
              <label className="font-pixel text-[8px] text-[#3d2311] block mb-1">
                {gender.toUpperCase()} HAIRSTYLE OPTIONS
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                {currentHairstyles.map(h => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => { setHairStyle(h.id); soundEngine.playClick(); }}
                    className={`py-1 px-1 font-pixel text-[7px] rounded border transition text-center truncate ${
                      hairStyle === h.id
                        ? 'bg-[#543315] text-amber-200 border-[#2e190b]'
                        : 'bg-[#fdf6ec] border-[#855223] text-stone-800 hover:bg-[#faebd7]'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Colour Palette */}
            <div>
              <label className="font-pixel text-[8px] text-[#3d2311] block mb-1">
                HAIR COLOUR PALETTES
              </label>
              <div className="flex gap-2 items-center flex-wrap">
                {HAIR_COLOURS.map(c => (
                  <button
                    key={c.hex}
                    type="button"
                    title={c.label}
                    onClick={() => { setHairColour(c.hex); soundEngine.playClick(); }}
                    className={`w-6 h-6 rounded-full border-2 transition transform hover:scale-110 flex items-center justify-center ${
                      hairColour === c.hex ? 'border-amber-400 ring-2 ring-[#543315]' : 'border-[#543315]'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {hairColour === c.hex && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Tone Palette */}
            <div>
              <label className="font-pixel text-[8px] text-[#3d2311] block mb-1">
                SKIN TONE PALETTES
              </label>
              <div className="flex gap-2 items-center flex-wrap">
                {SKIN_TONES.map(s => (
                  <button
                    key={s.hex}
                    type="button"
                    title={s.label}
                    onClick={() => { setSkinTone(s.hex); soundEngine.playClick(); }}
                    className={`w-6 h-6 rounded-full border-2 transition transform hover:scale-110 flex items-center justify-center ${
                      skinTone === s.hex ? 'border-amber-400 ring-2 ring-[#543315]' : 'border-[#543315]'
                    }`}
                    style={{ backgroundColor: s.hex }}
                  >
                    {skinTone === s.hex && <Check className="w-3.5 h-3.5 text-stone-900 drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Random Family Background Generator */}
        <div className="bg-[#ecd5b5] border-2 border-[#543315] rounded p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[8px] text-[#3d2311] flex items-center gap-1.5">
              <Dice5 className="w-3.5 h-3.5 text-amber-700" />
              <span>FAMILY BACKGROUND & STARTING NEIGHBOURHOOD</span>
            </span>
            <button
              type="button"
              onClick={rollFamily}
              className="flex items-center gap-1 px-2 py-0.5 bg-[#855223] hover:bg-[#633a14] text-amber-100 font-pixel text-[7.5px] rounded border border-[#4a2e1b] transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>REROLL</span>
            </button>
          </div>

          <div className="bg-[#fcf5ec] p-2 rounded border border-[#855223]">
            <h3 className="font-pixel text-[9px] text-[#854d0e]">{currentBg.title}</h3>
            <p className="font-sans-sg text-[11px] text-stone-700 mt-0.5 leading-snug">
              {currentBg.description}
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-[8.5px] font-pixel text-[#543315] flex-wrap">
              <span>Health: {currentBg.statModifiers.health}</span>
              <span>Academics: {currentBg.statModifiers.academics}</span>
              <span>Social: {currentBg.statModifiers.social}</span>
              <span>Resilience: {currentBg.statModifiers.resilience}</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          id="btn-begin-journey"
          type="button"
          onClick={handleFinish}
          className="pixel-btn w-full py-2.5 text-stone-950 font-pixel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
        >
          <Check className="w-4 h-4" />
          BEGIN MY SINGAPORE LIFE JOURNEY
        </button>
      </div>
    </div>
  );
};
