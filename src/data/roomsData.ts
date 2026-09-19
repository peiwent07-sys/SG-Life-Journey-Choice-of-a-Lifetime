import { GameRoom, InteractionCategory } from '../types';

export const GAME_ROOMS: GameRoom[] = [
  {
    id: 'bedroom',
    name: 'HDB Bedroom & Family Flat',
    shortName: 'HDB Flat',
    icon: 'Home',
    landmark: 'Bishan / Ang Mo Kio HDB Estate',
    objects: [
      {
        id: 'study_desk',
        x: 180,
        y: 290,
        w: 90,
        h: 60,
        label: 'Study Desk (Ten-Year Series)',
        action: 'study',
        icon: 'BookOpen'
      },
      {
        id: 'bed',
        x: 60,
        y: 270,
        w: 80,
        h: 90,
        label: 'Cozy Bed (Rest & Recharge)',
        action: 'sleep',
        icon: 'Moon'
      },
      {
        id: 'family_table',
        x: 540,
        y: 280,
        w: 120,
        h: 70,
        label: 'Family Dinner (ABC Soup & Rice)',
        action: 'eat_home',
        icon: 'Utensils'
      },
      {
        id: 'wardrobe_closet',
        x: 350,
        y: 240,
        w: 70,
        h: 90,
        label: 'Wardrobe & Attire Closet',
        action: 'wardrobe',
        icon: 'Sparkles'
      }
    ]
  },
  {
    id: 'voiddeck',
    name: 'HDB Void Deck & Playground',
    shortName: 'Void Deck',
    icon: 'Building2',
    landmark: 'Block 208 Void Deck',
    objects: [
      {
        id: 'chess_table',
        x: 140,
        y: 280,
        w: 90,
        h: 70,
        label: 'Stone Chess Table (Terrazzo Board)',
        action: 'dilemma_check',
        icon: 'Users'
      },
      {
        id: 'voiddeck_uncle',
        x: 255,
        y: 270,
        w: 60,
        h: 65,
        label: 'Void Deck Uncle (Kopi & Wisdom)',
        action: 'talk_voiddeck_uncle',
        icon: 'Users',
        category: InteractionCategory.POSITIVE,
        description: 'Listen to Uncle share stories of Singapore kampung resilience and integrity.'
      },
      {
        id: 'ginger_cat',
        x: 370,
        y: 320,
        w: 50,
        h: 40,
        label: 'Community Ginger Cat (Pet for Joy)',
        action: 'pet_cat',
        icon: 'Heart'
      },
      {
        id: 'playground',
        x: 580,
        y: 250,
        w: 120,
        h: 95,
        label: 'Dragon Playground Swings',
        action: 'play_sports',
        icon: 'Activity'
      }
    ]
  },
  {
    id: 'school',
    name: 'Primary School Concourse & Gate',
    shortName: 'Primary School',
    icon: 'GraduationCap',
    landmark: 'Primary School Concourse & Library',
    objects: [
      {
        id: 'ice_cream_cart',
        x: 160,
        y: 270,
        w: 100,
        h: 80,
        label: 'Traditional Ice Cream Cart ($1.50 Wafer)',
        action: 'eat_icecream',
        icon: 'IceCream',
        category: InteractionCategory.POSITIVE,
        description: 'Traditional treat that restores energy and mood.'
      },
      {
        id: 'school_library',
        x: 420,
        y: 260,
        w: 120,
        h: 80,
        label: 'Air-conditioned School Library',
        action: 'study_school',
        icon: 'Library',
        category: InteractionCategory.POSITIVE,
        description: 'Quiet sanctuary to build academic foundations.'
      },
      {
        id: 'student_council_booth',
        x: 640,
        y: 280,
        w: 90,
        h: 70,
        label: 'Anti-Drug Peer Exhibition Booth',
        action: 'open_antidrug_booth',
        icon: 'ShieldCheck',
        category: InteractionCategory.POSITIVE,
        description: 'Interactive exhibition booth on youth health and resilience.'
      }
    ]
  },
  {
    id: 'mamashop',
    name: 'Traditional HDB Mama Shop',
    shortName: 'Mama Shop',
    icon: 'ShoppingBag',
    landmark: 'Ground Floor Corner Provisions',
    objects: [
      {
        id: 'drink_fridge',
        x: 140,
        y: 250,
        w: 80,
        h: 100,
        label: 'Chilled Milo & Chrysanthemum Tea ($1.20)',
        action: 'buy_milo',
        icon: 'Coffee'
      },
      {
        id: 'snack_rack',
        x: 360,
        y: 260,
        w: 100,
        h: 90,
        label: 'Keropok, Haw Flakes & Iced Gems',
        action: 'buy_snacks',
        icon: 'ShoppingBag'
      },
      {
        id: 'uncle_counter',
        x: 590,
        y: 270,
        w: 110,
        h: 80,
        label: 'Chat with Mama Shop Uncle (Life Advice)',
        action: 'chat_uncle',
        icon: 'MessageSquare'
      }
    ]
  },
  {
    id: 'barbershop',
    name: 'Neighbourhood Barber & Rain Tree',
    shortName: 'Barber Shop',
    icon: 'Scissors',
    landmark: 'Void Deck Traditional Barber',
    objects: [
      {
        id: 'barber_pole',
        x: 150,
        y: 250,
        w: 90,
        h: 100,
        label: 'Barber Shop ($10 Neat Haircut)',
        action: 'haircut',
        icon: 'Scissors'
      },
      {
        id: 'newspaper_uncle',
        x: 380,
        y: 270,
        w: 100,
        h: 80,
        label: 'Uncle Reading Newspaper (Chats & Advice)',
        action: 'chat_barber_uncle',
        icon: 'MessageSquare'
      },
      {
        id: 'coke_machine',
        x: 620,
        y: 250,
        w: 80,
        h: 100,
        label: 'Chilled Drink Vending Machine ($1.20)',
        action: 'buy_vending_drink',
        icon: 'Coffee'
      }
    ]
  },
  {
    id: 'juniorcollege',
    name: 'Junior College Grand Concourse',
    shortName: 'Junior College',
    icon: 'GraduationCap',
    landmark: 'Junior College Modernist Campus',
    objects: [
      {
        id: 'jc_staircase',
        x: 140,
        y: 260,
        w: 110,
        h: 90,
        label: 'Grand Staircase (A-Level Revision)',
        action: 'study_jc',
        icon: 'BookOpen',
        category: InteractionCategory.POSITIVE,
        description: 'Rigorous A-Level and project study sessions.'
      },
      {
        id: 'jc_red_railings',
        x: 330,
        y: 260,
        w: 100,
        h: 80,
        label: 'Terrace Railings (Peer Discussion)',
        action: 'discuss_peer',
        icon: 'Users',
        category: InteractionCategory.POSITIVE,
        description: 'Collaborate with driven classmates.'
      },
      {
        id: 'jc_laptop_station',
        x: 490,
        y: 270,
        w: 90,
        h: 70,
        label: 'Campus Laptop (Online Safety Check)',
        action: 'open_laptop_warning',
        icon: 'Laptop',
        category: InteractionCategory.NEUTRAL,
        description: 'Interactive online terminal addressing cyber invitations and illicit risks.'
      },
      {
        id: 'jc_ambassador_booth',
        x: 630,
        y: 260,
        w: 100,
        h: 90,
        label: 'JC Anti-Drug Youth Exhibition Booth',
        action: 'open_antidrug_booth',
        icon: 'ShieldCheck',
        category: InteractionCategory.POSITIVE,
        description: 'Learn evidence-based drug facts and take the youth ambassador pledge.'
      }
    ]
  },
  {
    id: 'hawker',
    name: 'Hawker Centre & Fruit Stalls',
    shortName: 'Hawker Centre',
    icon: 'UtensilsCrossed',
    landmark: 'Old Airport Road / Maxwell Centre',
    objects: [
      {
        id: 'chicken_rice_stall',
        x: 140,
        y: 260,
        w: 110,
        h: 90,
        label: 'Hainanese Chicken Rice ($4.50)',
        action: 'eat_chicken_rice',
        icon: 'Utensils'
      },
      {
        id: 'satay_grill',
        x: 370,
        y: 270,
        w: 100,
        h: 80,
        label: 'Charcoal Grilled Satay with Peanut Dip',
        action: 'eat_satay',
        icon: 'Flame'
      },
      {
        id: 'durian_stall',
        x: 610,
        y: 260,
        w: 110,
        h: 90,
        label: 'Mao Shan Wang Durian Stall',
        action: 'eat_durian',
        icon: 'Sun'
      }
    ]
  },
  {
    id: 'pasarmalam',
    name: 'Pasar Malam Festive Night Market',
    shortName: 'Pasar Malam',
    icon: 'Sparkles',
    landmark: 'Beside MRT Open Field',
    objects: [
      {
        id: 'ramly_stall',
        x: 150,
        y: 260,
        w: 110,
        h: 90,
        label: 'Special Ramly Burger Wrapped in Egg ($5.00)',
        action: 'eat_ramly',
        icon: 'Flame'
      },
      {
        id: 'tutu_stall',
        x: 370,
        y: 270,
        w: 100,
        h: 80,
        label: 'Steaming Tutu Kueh (Coconut & Peanut)',
        action: 'eat_tutu',
        icon: 'Cookie'
      },
      {
        id: 'game_booth',
        x: 600,
        y: 260,
        w: 120,
        h: 90,
        label: 'Ring Toss & Dart Carnival Booth',
        action: 'play_carnival',
        icon: 'Award'
      }
    ]
  },
  {
    id: 'mrt',
    name: 'Bus Interchange & SMRT MRT Platform',
    shortName: 'MRT Station',
    icon: 'Train',
    landmark: 'City Hall & Dhoby Ghaut Interchange',
    objects: [
      {
        id: 'topup_machine',
        x: 140,
        y: 235,
        w: 110,
        h: 115,
        label: 'Top Up EZ-Link / SimplyGo Card (Transit Kiosk)',
        action: 'topup_ezlink',
        icon: 'CreditCard',
        category: InteractionCategory.POSITIVE,
        description: 'Add value to your student concession transit card via NETS, cash or mobile pay.'
      },
      {
        id: 'bus_bay',
        x: 390,
        y: 260,
        w: 120,
        h: 90,
        label: 'Lush Green SG Bus Stop (Line 190)',
        action: 'ride_bus',
        icon: 'Bus'
      },
      {
        id: 'cnb_digital_screen',
        x: 620,
        y: 240,
        w: 90,
        h: 110,
        label: 'CNB Anti-Drug Screen (Help Hotline 1800-600-0000)',
        action: 'read_cnb_screen',
        icon: 'Info'
      }
    ]
  },
  {
    id: 'clarkequay',
    name: 'Clarke Quay & Singapore River Waterfront',
    shortName: 'Clarke Quay',
    icon: 'Music',
    landmark: 'Singapore River Neon Shophouses & Read Bridge',
    objects: [
      {
        id: 'read_bridge_steps',
        x: 140,
        y: 270,
        w: 110,
        h: 80,
        label: 'Read Bridge Steps (River Breeze & Chats)',
        action: 'dilemma_check',
        icon: 'Users'
      },
      {
        id: 'bumboat_cruise',
        x: 360,
        y: 260,
        w: 110,
        h: 90,
        label: 'Electric Bumboat River Cruise ($8.00)',
        action: 'ride_bumboat',
        icon: 'Ship'
      },
      {
        id: 'live_acoustic_corner',
        x: 480,
        y: 260,
        w: 90,
        h: 80,
        label: 'Live Acoustic Busking (Clean Music)',
        action: 'enjoy_music',
        icon: 'Headphones',
        category: InteractionCategory.POSITIVE,
        description: 'Wholesome music and vibrant community vibes.'
      },
      {
        id: 'adulthood_volunteer_desk',
        x: 580,
        y: 260,
        w: 90,
        h: 80,
        label: 'Anti-Drug Civic Volunteer Booth',
        action: 'open_volunteer_modal',
        icon: 'ShieldCheck',
        category: InteractionCategory.POSITIVE,
        description: 'Learn how to register as a volunteer for CNB & NCADA anti-drug initiatives.'
      },
      {
        id: 'supper_prata_stall',
        x: 680,
        y: 270,
        w: 80,
        h: 80,
        label: '24hr Crispy Roti Prata & Milo Dinosaur',
        action: 'eat_prata',
        icon: 'Utensils',
        category: InteractionCategory.POSITIVE,
        description: 'Late-night comfort supper with friends.'
      }
    ]
  },
  {
    id: 'orchard',
    name: 'Orchard Road & ION Orchard Canopy',
    shortName: 'Orchard Road',
    icon: 'Compass',
    landmark: 'ION Orchard Glass Lattice & Somerset',
    objects: [
      {
        id: 'ion_canopy_entrance',
        x: 130,
        y: 250,
        w: 120,
        h: 100,
        label: 'ION Glass Canopy & MRT Bubble Entrance',
        action: 'visit_ion_mall',
        icon: 'Compass'
      },
      {
        id: 'designer_boutique',
        x: 340,
        y: 260,
        w: 110,
        h: 90,
        label: 'Luxury Fashion Arcade (Window Shopping)',
        action: 'luxury_browse',
        icon: 'ShoppingBag'
      },
      {
        id: 'skate_ramp',
        x: 510,
        y: 260,
        w: 100,
        h: 90,
        label: '*SCAPE Skate Plaza (Kickflips & Tricks)',
        action: 'skate_trick',
        icon: 'Zap'
      },
      {
        id: 'boba_street_shop',
        x: 650,
        y: 260,
        w: 90,
        h: 90,
        label: 'Signature Boba Milk Tea ($4.80)',
        action: 'buy_boba',
        icon: 'Coffee'
      }
    ]
  },
  {
    id: 'marinabaysands',
    name: 'Marina Bay Sands & ArtScience Museum',
    shortName: 'Marina Bay Sands',
    icon: 'Building',
    landmark: 'MBS SkyPark, Lotus Museum & Waterfront',
    objects: [
      {
        id: 'mbs_skypark_deck',
        x: 140,
        y: 250,
        w: 120,
        h: 100,
        label: 'MBS SkyPark Lookout (City Skyline)',
        action: 'visit_skypark',
        icon: 'Building'
      },
      {
        id: 'artscience_museum',
        x: 370,
        y: 250,
        w: 120,
        h: 90,
        label: 'ArtScience Museum Lotus Exhibition',
        action: 'visit_artscience',
        icon: 'Sparkles'
      },
      {
        id: 'waterfront_light_show',
        x: 590,
        y: 260,
        w: 120,
        h: 90,
        label: 'Spectra Light & Water Show (Event Plaza)',
        action: 'watch_spectra_show',
        icon: 'Sun'
      }
    ]
  },
  {
    id: 'merlion',
    name: 'Merlion Park Waterfront Promenade',
    shortName: 'Merlion Park',
    icon: 'Droplets',
    landmark: 'The Merlion Statue & Marina Bay Basin',
    objects: [
      {
        id: 'merlion_spout',
        x: 140,
        y: 240,
        w: 120,
        h: 110,
        label: 'The Merlion Fountain (Water Spout Photo)',
        action: 'take_merlion_photo',
        icon: 'Camera'
      },
      {
        id: 'jubilee_bridge',
        x: 380,
        y: 260,
        w: 120,
        h: 90,
        label: 'Jubilee Bridge Promenade (Bay Breeze)',
        action: 'walk_jubilee_bridge',
        icon: 'Compass'
      },
      {
        id: 'anti_drug_pledge_post',
        x: 600,
        y: 250,
        w: 110,
        h: 100,
        label: 'CNB Anti-Drug Pillar & Youth Pledge',
        action: 'pledge_anti_drug_waterfront',
        icon: 'ShieldCheck'
      }
    ]
  },
  {
    id: 'changiairport',
    name: 'Changi Airport & Jewel Changi Dome',
    shortName: 'Changi Airport',
    icon: 'Plane',
    landmark: 'Changi ATC Tower, Rain Vortex & Jewel',
    objects: [
      {
        id: 'atc_tower_lookout',
        x: 140,
        y: 240,
        w: 120,
        h: 110,
        label: 'Changi ATC Tower & Aviation Viewing Deck',
        action: 'view_planes',
        icon: 'Plane'
      },
      {
        id: 'jewel_rain_vortex',
        x: 370,
        y: 250,
        w: 120,
        h: 100,
        label: 'Jewel HSBC Rain Vortex & Forest Valley',
        action: 'visit_rain_vortex',
        icon: 'Droplets'
      },
      {
        id: 'customs_cnb_counter',
        x: 600,
        y: 250,
        w: 120,
        h: 100,
        label: 'ICA & CNB Anti-Trafficking Warning Post',
        action: 'cnb_customs_advice',
        icon: 'ShieldCheck'
      }
    ]
  },
  {
    id: 'chijmes',
    name: 'CHIJMES Historic Gothic Chapel & Cloisters',
    shortName: 'CHIJMES',
    icon: 'Church',
    landmark: 'Neo-Gothic Spire, Lawn & Fairy Lights',
    objects: [
      {
        id: 'chijmes_chapel',
        x: 150,
        y: 240,
        w: 120,
        h: 110,
        label: 'Gothic Chapel Spire & Stained Glass',
        action: 'admire_chapel',
        icon: 'Church'
      },
      {
        id: 'cloister_courtyard',
        x: 380,
        y: 260,
        w: 120,
        h: 90,
        label: 'Fairy-lit Lawn (Acoustic Open Mic)',
        action: 'listen_acoustic_openmic',
        icon: 'Music'
      },
      {
        id: 'alfresco_gelato',
        x: 610,
        y: 260,
        w: 110,
        h: 90,
        label: 'Alfresco Artisan Gelato & Mint Tea ($5.50)',
        action: 'eat_gelato',
        icon: 'Coffee'
      }
    ]
  },
  {
    id: 'gardensbythebay',
    name: 'Gardens by the Bay & Supertree Grove',
    shortName: 'Gardens by Bay',
    icon: 'TreePine',
    landmark: 'Supertree Grove & Glass Conservatories',
    objects: [
      {
        id: 'supertree_canopy',
        x: 150,
        y: 240,
        w: 120,
        h: 110,
        label: 'Supertree Grove (Garden Rhapsody Neon)',
        action: 'watch_supertree_show',
        icon: 'TreePine'
      },
      {
        id: 'ocbc_skyway',
        x: 380,
        y: 250,
        w: 120,
        h: 90,
        label: 'OCBC Skyway Suspension Walkway (22m)',
        action: 'walk_skyway',
        icon: 'Compass'
      },
      {
        id: 'cloud_forest_dome',
        x: 600,
        y: 250,
        w: 120,
        h: 100,
        label: 'Cloud Forest Dome & Indoor Waterfall',
        action: 'visit_cloud_forest',
        icon: 'Droplets'
      }
    ]
  },
  {
    id: 'secondaryschool',
    name: 'Secondary School & Stadium Grandstand',
    shortName: 'Secondary School',
    icon: 'GraduationCap',
    landmark: 'Secondary School Campus Grandstand & Track',
    objects: [
      {
        id: 'sec_grandstand_steps',
        x: 140,
        y: 250,
        w: 120,
        h: 100,
        label: 'Grandstand Bleachers (Group Study & Peer Revision)',
        action: 'study_sec',
        icon: 'GraduationCap'
      },
      {
        id: 'sec_running_track',
        x: 370,
        y: 260,
        w: 120,
        h: 90,
        label: '400m Sports Running Track (NAPFA & Cardio Fitness)',
        action: 'run_track',
        icon: 'Zap'
      },
      {
        id: 'sec_peer_leaders',
        x: 590,
        y: 250,
        w: 120,
        h: 100,
        label: 'Anti-Drug Peer Leaders & Exhibition Corner',
        action: 'open_antidrug_booth',
        icon: 'ShieldCheck',
        category: InteractionCategory.POSITIVE,
        description: 'Interactive anti-drug quiz and healthy peer support circle.'
      }
    ]
  },
  {
    id: 'nationalstadium',
    name: 'National Stadium (Taylor Swift Concert)',
    shortName: 'National Stadium',
    icon: 'Music',
    landmark: 'Singapore Sports Hub & Eras Tour Arena',
    objects: [
      {
        id: 'taylor_concert_stage',
        x: 140,
        y: 240,
        w: 130,
        h: 110,
        label: 'Eras Tour Concert Stage (Taylor Swift Live on Stage)',
        action: 'attend_taylor_concert',
        icon: 'Music'
      },
      {
        id: 'lightup_wristband_booth',
        x: 380,
        y: 260,
        w: 110,
        h: 90,
        label: 'Synchronized LED Wristband Station (Pulsing Glow)',
        action: 'sync_wristband',
        icon: 'Sparkles'
      },
      {
        id: 'concert_merch_corner',
        x: 600,
        y: 250,
        w: 120,
        h: 100,
        label: 'Friendship Bracelets Trading Corner (School Friends)',
        action: 'trade_bracelets',
        icon: 'Users'
      }
    ]
  },
  {
    id: 'f1circuit',
    name: 'Marina Bay Street Circuit (F1 Night Race)',
    shortName: 'F1 Night Race',
    icon: 'Flag',
    landmark: 'Singapore Grand Prix Paddock & Turn 1 Grandstand',
    objects: [
      {
        id: 'f1_grandstand_seats',
        x: 140,
        y: 240,
        w: 120,
        h: 110,
        label: 'Turn 1 Grandstand (Watch 300km/h Night Race Cars)',
        action: 'watch_f1_race',
        icon: 'Zap'
      },
      {
        id: 'f1_paddock_lounge',
        x: 370,
        y: 250,
        w: 120,
        h: 100,
        label: 'Paddock Hospitality & Racing Telemetry Pit',
        action: 'f1_simulator',
        icon: 'Compass'
      },
      {
        id: 'f1_merch_pit',
        x: 600,
        y: 250,
        w: 120,
        h: 100,
        label: 'Singapore GP Clean Energy & Anti-Drug Youth Exhibit',
        action: 'f1_cheer',
        icon: 'ShieldCheck'
      }
    ]
  },
  {
    id: 'singaporezoo',
    name: 'Singapore Zoo & Rainforest Enclosures',
    shortName: 'Singapore Zoo',
    icon: 'TreePine',
    landmark: 'Mandai Rainforest, Timber Louvres & Red Rhino',
    objects: [
      {
        id: 'zoo_red_rhino',
        x: 140,
        y: 240,
        w: 120,
        h: 110,
        label: 'Iconic Red Rhinoceros Sculpture (Mandai Photo Spot)',
        action: 'photo_red_rhino',
        icon: 'Camera'
      },
      {
        id: 'zoo_orangutan_enclosure',
        x: 380,
        y: 240,
        w: 120,
        h: 110,
        label: 'Free-Ranging Orangutan Canopy & Boardwalk',
        action: 'visit_orangutans',
        icon: 'TreePine'
      },
      {
        id: 'zoo_tram_station',
        x: 610,
        y: 250,
        w: 110,
        h: 100,
        label: 'Mandai Safari Guided Tram (Family Bonding Tour)',
        action: 'ride_zoo_tram',
        icon: 'Compass'
      }
    ]
  },
  {
    id: 'seaaquarium',
    name: 'S.E.A. Aquarium (Resorts World Sentosa)',
    shortName: 'S.E.A. Aquarium',
    icon: 'Droplets',
    landmark: 'Open Ocean Acrylic Viewing Habitat & Manta Rays',
    objects: [
      {
        id: 'aquarium_viewing_panel',
        x: 140,
        y: 240,
        w: 130,
        h: 110,
        label: 'Massive Oceanarium Glass (Gliding Manta Rays & Calmness)',
        action: 'view_ocean_panel',
        icon: 'Eye'
      },
      {
        id: 'aquarium_shark_tunnel',
        x: 380,
        y: 250,
        w: 120,
        h: 100,
        label: 'Underwater Acrylic Shark Tunnel Walkway',
        action: 'walk_shark_tunnel',
        icon: 'Compass'
      },
      {
        id: 'aquarium_marine_conservation',
        x: 610,
        y: 250,
        w: 110,
        h: 100,
        label: 'Marine Biology Lab & Clean Ocean Conservation',
        action: 'study_marine_biology',
        icon: 'Sparkles'
      }
    ]
  },
  {
    id: 'universalstudios',
    name: 'Universal Studios Singapore (USS Sentosa)',
    shortName: 'Universal Studios',
    icon: 'Sparkles',
    landmark: 'Rotating USS Globe & Dueling Roller Coasters',
    objects: [
      {
        id: 'uss_globe_monument',
        x: 140,
        y: 240,
        w: 120,
        h: 110,
        label: 'Rotating Universal Studios Globe (Post-Exam Photo)',
        action: 'photo_uss_globe',
        icon: 'Camera'
      },
      {
        id: 'uss_roller_coaster',
        x: 380,
        y: 240,
        w: 120,
        h: 110,
        label: 'Battlestar Galactica Dueling Coaster (Adrenaline Thrill)',
        action: 'ride_roller_coaster',
        icon: 'Zap'
      },
      {
        id: 'uss_theme_diner',
        x: 610,
        y: 250,
        w: 110,
        h: 100,
        label: "Mel's Drive-In Vintage Diner (Milkshake & Fries)",
        action: 'eat_uss_diner',
        icon: 'Utensils'
      }
    ]
  },
  {
    id: 'chinatown',
    name: 'Chinatown Heritage Shophouses & Pagoda Street',
    shortName: 'Chinatown',
    icon: 'Building',
    landmark: 'Pagoda Street Shophouses & Lantern Canopy',
    objects: [
      {
        id: 'chinatown_lantern_canopy',
        x: 140,
        y: 240,
        w: 120,
        h: 110,
        label: 'Festive Red Lantern Arch (Heritage Walk)',
        action: 'walk_lantern_arch',
        icon: 'Sparkles',
        category: InteractionCategory.POSITIVE,
        description: 'Atmospheric heritage shophouse promenade.'
      },
      {
        id: 'traditional_tea_house',
        x: 380,
        y: 250,
        w: 120,
        h: 100,
        label: 'Traditional Teahouse (Oolong Tea & Dim Sum)',
        action: 'drink_oolong_tea',
        icon: 'Coffee',
        category: InteractionCategory.POSITIVE,
        description: 'Mindful brewing and relaxation with elders.'
      },
      {
        id: 'chinatown_civic_booth',
        x: 610,
        y: 250,
        w: 120,
        h: 100,
        label: 'Central Singapore Youth Anti-Drug Hub',
        action: 'open_antidrug_booth',
        icon: 'ShieldCheck',
        category: InteractionCategory.POSITIVE,
        description: 'Heritage district community outreach and anti-drug pledges.'
      }
    ]
  },
  {
    id: 'sentosabeach',
    name: 'Sentosa Palawan Beach & Suspension Bridge',
    shortName: 'Sentosa Beach',
    icon: 'Sun',
    landmark: 'Southernmost Point of Continental Asia & Coconut Palms',
    objects: [
      {
        id: 'palawan_suspension_bridge',
        x: 140,
        y: 240,
        w: 130,
        h: 110,
        label: 'Palawan Suspension Timber Bridge',
        action: 'walk_suspension_bridge',
        icon: 'Compass',
        category: InteractionCategory.POSITIVE,
        description: 'Breathtaking sea view and coastal breeze.'
      },
      {
        id: 'beach_volleyball_court',
        x: 390,
        y: 250,
        w: 120,
        h: 100,
        label: 'Beach Volleyball Court (Healthy Friendship Match)',
        action: 'play_sports',
        icon: 'Activity',
        category: InteractionCategory.POSITIVE,
        description: 'Energetic outdoor sports match with peers (+Health, +Social).'
      },
      {
        id: 'coastal_juice_bar',
        x: 610,
        y: 250,
        w: 110,
        h: 100,
        label: 'Fresh Coconut Water & Smoothies ($5.00)',
        action: 'drink_coconut_water',
        icon: 'Coffee',
        category: InteractionCategory.POSITIVE,
        description: 'Hydrating coconut refreshment by the sea.'
      }
    ]
  },
  {
    id: 'polytechnic',
    name: 'Polytechnic Design & Media Atrium',
    shortName: 'Polytechnic',
    icon: 'Laptop',
    landmark: 'Makerspace Lab & Student Media Atrium',
    objects: [
      {
        id: 'poly_studio_lab',
        x: 140,
        y: 250,
        w: 110,
        h: 90,
        label: 'Multimedia Design & Prototype Studio',
        action: 'study_poly',
        icon: 'Laptop',
        category: InteractionCategory.POSITIVE,
        description: 'Collaborate on industry capstone projects and digital media design.'
      },
      {
        id: 'poly_smoking_stairwell',
        x: 330,
        y: 260,
        w: 100,
        h: 80,
        label: 'Car Park Stairwell (Peer Pressure Zone)',
        action: 'dilemma_check',
        icon: 'AlertTriangle',
        category: InteractionCategory.NEGATIVE,
        description: 'A secluded stairwell where peers vape between lectures.'
      },
      {
        id: 'poly_atrium_cafe',
        x: 490,
        y: 260,
        w: 100,
        h: 90,
        label: 'Student Atrium Cafe & Iced Barley Lounge',
        action: 'buy_boba',
        icon: 'Coffee',
        category: InteractionCategory.POSITIVE,
        description: 'Refreshing iced drinks and wholesome project discussions.'
      },
      {
        id: 'poly_ambassador_booth',
        x: 630,
        y: 250,
        w: 110,
        h: 100,
        label: 'Poly Anti-Drug Peer Ambassador Booth',
        action: 'open_antidrug_booth',
        icon: 'ShieldCheck',
        category: InteractionCategory.POSITIVE,
        description: 'CNB & NCADA interactive booth with peer refusal training.'
      }
    ]
  },
  {
    id: 'itecollege',
    name: 'ITE College Engineering Workshop',
    shortName: 'ITE College',
    icon: 'Hammer',
    landmark: 'Mechatronics Hangar & Technical Training Center',
    objects: [
      {
        id: 'ite_workshop_bay',
        x: 140,
        y: 250,
        w: 110,
        h: 90,
        label: 'Applied Engineering & Mechatronics Lab',
        action: 'study_ite',
        icon: 'Hammer',
        category: InteractionCategory.POSITIVE,
        description: 'Hands-on mechanical overhaul and robotics precision training.'
      },
      {
        id: 'ite_breakout_bench',
        x: 330,
        y: 260,
        w: 100,
        h: 80,
        label: 'Workshop Breakout Bench & Lockers',
        action: 'dilemma_check',
        icon: 'AlertTriangle',
        category: InteractionCategory.NEGATIVE,
        description: 'Breakout area where tired apprentices take breaks.'
      },
      {
        id: 'ite_sports_arena',
        x: 490,
        y: 250,
        w: 100,
        h: 90,
        label: 'Campus Sports Arena (Floorball Court)',
        action: 'play_sports',
        icon: 'Activity',
        category: InteractionCategory.POSITIVE,
        description: 'Blow off steam through competitive indoor sports with classmates.'
      },
      {
        id: 'ite_peer_booth',
        x: 630,
        y: 250,
        w: 110,
        h: 100,
        label: 'ITE Youth Peer Leadership & Anti-Drug Booth',
        action: 'open_antidrug_booth',
        icon: 'ShieldCheck',
        category: InteractionCategory.POSITIVE,
        description: 'Learn substance prevention and sign the drug-free pledge.'
      }
    ]
  },
  {
    id: 'student_cafe',
    name: 'Neighbourhood Student Cafe & Study Lounge',
    shortName: 'Student Cafe',
    icon: 'Coffee',
    landmark: 'Timber Study Carrels & Iced Teh-C Lounge',
    objects: [
      {
        id: 'cafe_barista_counter',
        x: 140,
        y: 250,
        w: 115,
        h: 95,
        label: 'Barista Counter (Iced Teh-C & Barley Water)',
        action: 'buy_boba',
        icon: 'Coffee',
        category: InteractionCategory.POSITIVE,
        description: 'Order refreshing cold drinks and wholesome snacks with peers.'
      },
      {
        id: 'cafe_study_booth',
        x: 370,
        y: 250,
        w: 120,
        h: 95,
        label: 'Padded Study Booth (Peer Group Discussion)',
        action: 'study_jc',
        icon: 'GraduationCap',
        category: InteractionCategory.POSITIVE,
        description: 'Revise notes, collaborate on projects, and support friends academically.'
      },
      {
        id: 'cafe_toast_platter',
        x: 600,
        y: 250,
        w: 115,
        h: 95,
        label: 'Kaya Toast & Soft-Boiled Eggs ($3.50)',
        action: 'eat_hawker_meal',
        icon: 'Utensils',
        category: InteractionCategory.POSITIVE,
        description: 'Wholesome Singapore breakfast fuel to recharge stamina (+Health, +Energy).'
      }
    ]
  },
  {
    id: 'psle_celebration',
    name: 'PSLE Results & Void Deck Celebration',
    shortName: 'PSLE Celebration',
    icon: 'GraduationCap',
    landmark: 'Block 208 Void Deck Community Plaza',
    objects: [
      {
        id: 'psle_posting_board',
        x: 140,
        y: 260,
        w: 110,
        h: 90,
        label: 'PSLE Posting Slip Board (Results Collected)',
        action: 'read_psle_posting',
        icon: 'Award',
        category: InteractionCategory.POSITIVE,
        description: 'Read your school posting slip! Your diligence and clear mind yielded great outcomes.'
      },
      {
        id: 'celebration_table',
        x: 350,
        y: 270,
        w: 120,
        h: 80,
        label: 'Family Celebration Feast (Curry Puffs & Halal Buffet)',
        action: 'eat_psle_feast',
        icon: 'Utensils',
        category: InteractionCategory.POSITIVE,
        description: 'Share a heartfelt celebration feast with proud family and neighbours.'
      },
      {
        id: 'psle_icecream_uncle',
        x: 520,
        y: 265,
        w: 90,
        h: 85,
        label: 'Friendly Ice Cream Uncle ($1.50 Wafer)',
        action: 'talk_psle_icecream',
        icon: 'IceCream',
        category: InteractionCategory.POSITIVE,
        description: 'Celebratory ice cream wafer from the friendly neighbourhood uncle.'
      },
      {
        id: 'secondary_signpost',
        x: 660,
        y: 250,
        w: 90,
        h: 100,
        label: 'Embark to Secondary School Campus ->',
        action: 'proceed_to_secondary',
        icon: 'ArrowRight',
        category: InteractionCategory.POSITIVE,
        description: 'Board the green SBS transit bus and start your Secondary School chapter!'
      }
    ]
  },
  {
    id: 'olevel_plaza',
    name: 'O-Level & N-Level Results Day Plaza',
    shortName: 'Results Day Plaza',
    icon: 'Award',
    landmark: 'Regional Youth Concourse & Amphitheatre',
    objects: [
      {
        id: 'results_collection',
        x: 140,
        y: 260,
        w: 110,
        h: 90,
        label: 'O-Level / N-Level Results Counter',
        action: 'collect_olevel_results',
        icon: 'Award',
        category: InteractionCategory.POSITIVE,
        description: 'Collect your national examination certs. Resisting peer temptations kept your focus razor sharp.'
      },
      {
        id: 'ecg_counsellor',
        x: 340,
        y: 260,
        w: 110,
        h: 90,
        label: 'ECG Guidance & Admissions Counsellor',
        action: 'talk_ecg_counsellor',
        icon: 'BookOpen',
        category: InteractionCategory.POSITIVE,
        description: 'Receive personalized advice on Junior College, Polytechnic, and ITE pathways.'
      },
      {
        id: 'peer_photo_wall',
        x: 510,
        y: 265,
        w: 100,
        h: 85,
        label: 'Classmate Photo Wall & Signatures',
        action: 'celebrate_peers',
        icon: 'Users',
        category: InteractionCategory.POSITIVE,
        description: 'Cherish memories with true friends who always supported your healthy lifestyle.'
      },
      {
        id: 'tertiary_portal',
        x: 670,
        y: 250,
        w: 90,
        h: 100,
        label: 'Choose Tertiary Pathway & Chapter ->',
        action: 'open_pathway_selection',
        icon: 'ArrowRight',
        category: InteractionCategory.POSITIVE,
        description: 'Submit your tertiary posting application and select your path (JC, Poly, or ITE)!'
      }
    ]
  }
];
