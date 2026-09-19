export type Gender = 'boy' | 'girl';

export type FamilyBackgroundType = 'healthy' | 'single_parent' | 'grandparents' | 'adversity';

export interface FamilyBackground {
  type: FamilyBackgroundType;
  title: string;
  description: string;
  statModifiers: {
    health: number;
    academics: number;
    social: number;
    resilience: number;
    mentalHealth?: number;
  };
}

export type LifeStageKey = 'primary' | 'secondary' | 'tertiary' | 'adult';

export interface LifeStageInfo {
  key: LifeStageKey;
  name: string;
  ageRange: string;
  days: number[];
  uniformType: 'primary' | 'secondary' | 'tertiary' | 'adult';
}

export type PostSecondaryPath = 
  | 'Polytechnic' 
  | 'Junior College' 
  | 'ITE College' 
  | 'Polytechnic Diploma' 
  | 'Junior College (JC)' 
  | null;

export interface PlayerStats {
  resilience: number;  // Fortitude against peer pressure
  health: number;      // Physical health & vitality
  academics: number;   // Study standing & cognitive sharpness
  energy: number;      // Stamina & energy
  mentalHealth: number;// Emotional well-being (low = severe eyebags, sallow)
  social: number;      // Peer relationships & trust (drops if drugs cause isolation)
  hunger: number;      // Nutrition alias for energy
}

export type InteractionCategory = 'positive' | 'neutral' | 'negative';

export const InteractionCategory = {
  POSITIVE: 'positive' as const,
  NEUTRAL: 'neutral' as const,
  NEGATIVE: 'negative' as const,
};

export type TransitionalScenery = 
  | 'chinatown' 
  | 'little_india' 
  | 'kampong_glam' 
  | 'changi_airport' 
  | 'hdb_voiddeck' 
  | 'hdb_void_deck'
  | 'mrt_station' 
  | 'bus_stop'
  | 'ice_cream_uncle'
  | 'ndr_rally'
  | 'scenic_commute';

export type BusType = 'sbs_green' | 'sbs_purple';

export type NegativeTransitionalEvent = 
  | 'family_argument' 
  | 'hospital_emergency' 
  | 'exam_burnout';

export type AdulthoodScenarioType = 'nightlife' | 'social_gathering';

export type CosmeticCategory = 'hair' | 'outfit' | 'accessory' | 'aura';

export interface CosmeticItem {
  id: string;
  name: string;
  category: CosmeticCategory;
  costResilience: number;
  unlockedByDefault?: boolean;
  unlockedWithEnding?: EndingType;
  description: string;
  previewColor?: string;
  badge?: string;
}

export type FaceExpression = 'cheerful' | 'calm' | 'determined' | 'focused' | 'gentle';
export type WardrobeStyle = 'uniform' | 'casual' | 'sporty' | 'smart_casual';

export interface AvatarConfig {
  name: string;
  gender: Gender;
  hairStyle: number;
  hairColor: string;
  hairColour?: string;
  skinTone?: string;
  shirtColor: string;
  pantsColor: string;
  faceExpression?: FaceExpression;
  wardrobeStyle?: WardrobeStyle;
  equippedHairId: string;
  equippedOutfitId: string;
  equippedAccessoryId: string;
  equippedAuraId: string;
}

export interface DilemmaOption {
  text: string;
  type: 'resist' | 'accept' | 'divert' | 'report';
  healthChange: number;
  resilienceChange: number;
  acadChange: number;
  socialChange: number;
  hungerChange: number;
  feedback: string;
  statTip: string;
}

export interface DilemmaScenario {
  id: string;
  stageRequired: LifeStageKey;
  room: string;
  title: string;
  speaker: string;
  speakerRole: string;
  narrative: string;
  locationLabel: string;
  options: [DilemmaOption, DilemmaOption, DilemmaOption, DilemmaOption];
}

export type EndingType = 'thriving' | 'rehab' | 'overdose' | 'jail';

export interface EndingDetails {
  type: EndingType;
  title: string;
  subtitle: string;
  badgeColor: string;
  narrative: string;
  explanation: string;
  legalAndHealthFact: string;
  unlockedCosmeticReward: string;
}

export interface InteractableObject {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  action: string;
  icon?: string;
  category?: InteractionCategory;
  description?: string;
}

export interface GameRoom {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  landmark?: string;
  objects: InteractableObject[];
}
