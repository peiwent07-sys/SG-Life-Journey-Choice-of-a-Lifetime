import { CosmeticItem } from '../types';

export const COSMETICS_CATALOG: CosmeticItem[] = [
  // HAIRSTYLES
  {
    id: 'hair_neat_crop',
    name: 'Neat Classic Crop',
    category: 'hair',
    costResilience: 0,
    unlockedByDefault: true,
    description: 'School-approved neat haircut. Clean and disciplined.',
    previewColor: '#2b2320'
  },
  {
    id: 'hair_side_part',
    name: 'Modern Side Part',
    category: 'hair',
    costResilience: 0,
    unlockedByDefault: true,
    description: 'Crisp layered fringe popular among Singapore secondary schoolers.',
    previewColor: '#4a2e1b'
  },
  {
    id: 'hair_ponytail',
    name: 'Sporty High Ponytail',
    category: 'hair',
    costResilience: 0,
    unlockedByDefault: true,
    description: 'Keeps hair away during netball and badminton drills.',
    previewColor: '#1e1b18'
  },
  {
    id: 'hair_kpop_bangs',
    name: 'K-Pop Curtain Bangs',
    category: 'hair',
    costResilience: 25,
    description: 'Effortlessly styled bangs, inspired by trendy youth fashion.',
    previewColor: '#5c3a21',
    badge: 'Popular'
  },
  {
    id: 'hair_wolf_cut',
    name: 'Textured Wolf-Cut',
    category: 'hair',
    costResilience: 40,
    description: 'Shaggy multi-layered wolf cut seen around *SCAPE and Orchard.',
    previewColor: '#3d405b',
    badge: 'Trendy'
  },
  {
    id: 'hair_dyed_curls',
    name: 'Ash Grey Dyed Waves',
    category: 'hair',
    costResilience: 60,
    description: 'Expressive post-secondary dyed curls with vibrant highlights.',
    previewColor: '#7b8794',
    badge: 'Expressive'
  },
  {
    id: 'hair_gold_halo',
    name: 'Golden Radiant Crown',
    category: 'hair',
    costResilience: 80,
    unlockedWithEnding: 'thriving',
    description: 'Exclusive glorious luminous hairstyle awarded for staying 100% drug-free.',
    previewColor: '#f59e0b',
    badge: 'Ending Reward'
  },

  // OUTFITS
  {
    id: 'outfit_casual_tee',
    name: 'Everyday Cotton Tee & Shorts',
    category: 'outfit',
    costResilience: 0,
    unlockedByDefault: true,
    description: 'Standard weekend HDB void deck hangout attire.',
    previewColor: '#3b82f6'
  },
  {
    id: 'outfit_pri_uniform',
    name: 'SG Primary School Uniform',
    category: 'outfit',
    costResilience: 0,
    unlockedByDefault: true,
    description: 'Iconic crisp white shirt and deep navy shorts/pinafore.',
    previewColor: '#1e3a8a'
  },
  {
    id: 'outfit_sec_uniform',
    name: 'SG Secondary School Uniform',
    category: 'outfit',
    costResilience: 0,
    unlockedByDefault: true,
    description: 'White polo shirt with forest green trousers/pleated skirt and school badge.',
    previewColor: '#15803d'
  },
  {
    id: 'outfit_streetwear',
    name: 'Orchard Aesthetic Streetwear',
    category: 'outfit',
    costResilience: 45,
    description: 'Oversized boxy graphic tee with multi-pocket cargo pants and cross-body bag.',
    previewColor: '#18181b',
    badge: 'Streetwear'
  },
  {
    id: 'outfit_poly_bomber',
    name: 'Polytechnic Varsity Bomber',
    category: 'outfit',
    costResilience: 50,
    description: 'Cozy campus varsity jacket representing creative student projects.',
    previewColor: '#b91c1c',
    badge: 'Campus'
  },
  {
    id: 'outfit_jc_blazer',
    name: 'JC Honours College Blazer',
    category: 'outfit',
    costResilience: 60,
    description: 'Smart formal blazer for debate club and academic symposiums.',
    previewColor: '#1e293b',
    badge: 'Distinction'
  },
  {
    id: 'outfit_grad_gown',
    name: 'Marina Bay Graduation Regalia',
    category: 'outfit',
    costResilience: 100,
    unlockedWithEnding: 'thriving',
    description: 'Ceremonial mortarboard and gold-trimmed graduation gown celebrating a clean, victorious life.',
    previewColor: '#ca8a04',
    badge: 'Legendary'
  },

  // ACCESSORIES
  {
    id: 'acc_backpack',
    name: 'Standard Ergonomic Backpack',
    category: 'accessory',
    costResilience: 0,
    unlockedByDefault: true,
    description: 'Reliable school bag filled with Ten-Year-Series textbooks and notes.',
    previewColor: '#475569'
  },
  {
    id: 'acc_boba',
    name: 'Tiger Sugar BBT Cup',
    category: 'accessory',
    costResilience: 20,
    description: 'Iced brown sugar fresh milk with chewy boba pearls. 25% sugar level.',
    previewColor: '#b45309'
  },
  {
    id: 'acc_airpods',
    name: 'Noise-Cancelling Headphones',
    category: 'accessory',
    costResilience: 35,
    description: 'Over-ear headphones playing study lofi beats while revising at the library.',
    previewColor: '#e2e8f0',
    badge: 'Lofi'
  },
  {
    id: 'acc_badminton',
    name: 'Yonex Badminton Racket Bag',
    category: 'accessory',
    costResilience: 30,
    description: 'CCA pride! Keeps your fitness high and provides healthy fun with real friends.',
    previewColor: '#0284c7'
  },
  {
    id: 'acc_sneakers',
    name: 'Chunky Retro Skate Sneakers',
    category: 'accessory',
    costResilience: 50,
    description: 'Fresh white and silver kicks bought from Orchard Road sneaker drops.',
    previewColor: '#f1f5f9'
  },
  {
    id: 'badge_drug_free',
    name: 'CNB Drug-Free Ambassador Lapel Pin',
    category: 'accessory',
    costResilience: 0,
    description: 'Prestigious green-and-teal ribbon lapel pin awarded by CNB & NCADA for completing youth leadership training.',
    previewColor: '#059669',
    badge: 'Ambassador'
  },

  // AURAS (FANTAGE-STYLE)
  {
    id: 'aura_none',
    name: 'No Aura',
    category: 'aura',
    costResilience: 0,
    unlockedByDefault: true,
    description: 'Natural, down-to-earth presence.',
    previewColor: 'transparent'
  },
  {
    id: 'aura_fantage_stars',
    name: 'Fantage Twinkling Stars',
    category: 'aura',
    costResilience: 30,
    description: 'Nostalgic golden and pastel starlets orbiting smoothly around your avatar.',
    previewColor: '#facc15',
    badge: 'Fantage Classic'
  },
  {
    id: 'aura_shield',
    name: 'Emerald Resilience Aegis',
    category: 'aura',
    costResilience: 60,
    description: 'A luminous protective green aura signifying unshakeable mental strength.',
    previewColor: '#10b981',
    badge: 'Resilient'
  },
  {
    id: 'aura_gold_halo',
    name: 'Singapore #DRUGFREESG Ribbon Halo',
    category: 'aura',
    costResilience: 90,
    unlockedWithEnding: 'thriving',
    description: 'Official folded Singapore teal-and-white anti-drug ribbon halo with luminous emerald-cyan aura sparkles, celebrating a victorious drug-free life.',
    previewColor: '#00a5a5',
    badge: '#DRUGFREESG'
  }
];
