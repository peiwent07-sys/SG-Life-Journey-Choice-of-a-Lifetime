import { DilemmaScenario, FamilyBackground } from '../types';

export const FAMILY_BACKGROUNDS: FamilyBackground[] = [
  {
    type: 'healthy',
    title: 'Warm & Supportive Family',
    description: 'You grew up in a supportive household with caring parents who checked your homework and cooked warm dinners.',
    statModifiers: {
      health: 100,
      academics: 75,
      social: 70,
      resilience: 70,
      mentalHealth: 85
    }
  },
  {
    type: 'single_parent',
    title: 'Hardworking Single Parent',
    description: 'Your mother worked dual shifts at a hospital to provide for you. You learned independence and grit early on.',
    statModifiers: {
      health: 100,
      academics: 68,
      social: 60,
      resilience: 80,
      mentalHealth: 75
    }
  },
  {
    type: 'grandparents',
    title: 'Raised by Grandparents',
    description: 'Ah Ma and Ah Gong looked after you at the HDB flat, providing warmth, homemade herbal soup, and deep affection.',
    statModifiers: {
      health: 100,
      academics: 62,
      social: 75,
      resilience: 72,
      mentalHealth: 80
    }
  },
  {
    type: 'adversity',
    title: 'Overcoming Adversity (Substance-Exposed Home)',
    description: 'A difficult childhood surrounded by family turmoil and substance misuse. You vowed never to repeat those destructive mistakes.',
    statModifiers: {
      health: 90,
      academics: 55,
      social: 50,
      resilience: 60,
      mentalHealth: 60
    }
  }
];

export const DILEMMA_SCENARIOS: DilemmaScenario[] = [
  // 1. PRIMARY SCHOOL / TODDLER PHASE
  {
    id: 'pri_void_deck_vape',
    stageRequired: 'primary',
    room: 'voiddeck',
    locationLabel: 'HDB Void Deck Chess Table',
    title: 'Curious Puffs Behind the Pillars',
    speaker: 'Older Neighborhood Boys',
    speakerRole: 'Neighbourhood Dropouts',
    narrative: 'A pair of older teens sitting at the concrete stone table wave you over. "Oi pri-sch kid, hold this light-up pod. Smells like grape candy! Take a puff, nobody will catch you lah."',
    options: [
      {
        text: 'Firmly decline: "No thanks, I have badminton training at the community club." and walk away.',
        type: 'resist',
        healthChange: 2,
        resilienceChange: 20,
        acadChange: 3,
        socialChange: -4, // slight initial dip
        hungerChange: 0,
        feedback: 'You stood your ground firmly. They mocked you briefly, but your inner confidence and resilience surged. You headed safely to practice.',
        statTip: 'Resilience +20, Health +2, Academics +3, Social -4 (temporary dip)'
      },
      {
        text: 'Give in to peer pressure and inhale a deep puff to appear grown up.',
        type: 'accept',
        healthChange: -25, // drastic drop
        resilienceChange: -30, // drastic drop
        acadChange: -8, // gradual drop
        socialChange: 8, // temporary false spike (will collapse later)
        hungerChange: 0,
        feedback: 'You choked and coughed violently as harsh synthetic chemicals scalded your throat and lungs. Your head spun nauseously.',
        statTip: 'Health -25, Resilience -30, Academics -8, Social +8 (false spike)'
      },
      {
        text: 'Politely decline, then head straight over to the playground to join classmates playing catching.',
        type: 'divert',
        healthChange: 2,
        resilienceChange: 18,
        acadChange: 2,
        socialChange: 16, // rebounds quickly by finding good friends
        hungerChange: -5,
        feedback: 'You easily diverted away from danger and joined wholesome classmates. You formed genuine bonds while having active fun.',
        statTip: 'Resilience +18, Social +16, Health +2'
      },
      {
        text: 'Remind them that the neighbourhood police post is right next door and leave.',
        type: 'report',
        healthChange: 2,
        resilienceChange: 22,
        acadChange: 4,
        socialChange: -3,
        hungerChange: 0,
        feedback: 'Your prompt awareness made them hurriedly pocket the pod and leave. You safeguarded yourself and the estate.',
        statTip: 'Resilience +22, Academics +4, Social -3'
      }
    ]
  },

  // 2. PRIMARY SCHOOL: ICE CREAM UNCLE SCENE
  {
    id: 'pri_school_gate_powder',
    stageRequired: 'primary',
    room: 'school',
    locationLabel: 'Outside School by Red Ice Cream Cart',
    title: 'Whispering Behind the Rain Trees',
    speaker: 'Classmate influenced by older cousins',
    speakerRole: 'P6 Student',
    narrative: 'Behind the red ice cream motorcycle, a classmate opens a small plastic packet with white candy powder. "My older cousin gave me this energy booster. It makes you super fast during NAPFA test! Want to try half?"',
    options: [
      {
        text: '"Real athletes train properly. Let us just buy block wafer ice cream from Uncle instead."',
        type: 'resist',
        healthChange: 4,
        resilienceChange: 22,
        acadChange: 4,
        socialChange: 12,
        hungerChange: 15,
        feedback: 'You redirected your friend towards a wholesome treat. The Ice Cream Uncle told funny stories about his motorcycle trips in the 1980s.',
        statTip: 'Resilience +22, Social +12, Health +4, Hunger +15'
      },
      {
        text: 'Take the powder and swallow it secretly.',
        type: 'accept',
        healthChange: -28,
        resilienceChange: -32,
        acadChange: -12,
        socialChange: 5,
        hungerChange: 0,
        feedback: 'Immediate stomach cramping, acute dizziness, and trembling hands occurred. You had to sit in the general office feeling sick.',
        statTip: 'Health -28, Resilience -32, Academics -12'
      },
      {
        text: 'Explain to your friend that unregulated chemical powders cause irreversible heart and brain damage.',
        type: 'divert',
        healthChange: 3,
        resilienceChange: 24,
        acadChange: 6,
        socialChange: 8,
        hungerChange: 0,
        feedback: 'Your friend paused, realized the danger, and threw the packet straight into the bin. You saved both of your futures.',
        statTip: 'Resilience +24, Academics +6, Social +8'
      },
      {
        text: 'Inform your teacher or discipline master about suspicious substances outside the school.',
        type: 'report',
        healthChange: 2,
        resilienceChange: 25,
        acadChange: 5,
        socialChange: -5,
        hungerChange: 0,
        feedback: 'The school counselor intervened with the older youths. You protected your school environment from illicit supplies.',
        statTip: 'Resilience +25, Academics +5, Social -5'
      }
    ]
  },

  // 3. SECONDARY SCHOOL: LATE-NIGHT NATIONAL EXAM BURNOUT (O-Levels / N-Levels)
  {
    id: 'sec_exam_burnout',
    stageRequired: 'secondary',
    room: 'secondaryschool',
    locationLabel: 'Secondary School Study Area / Bedroom Desk',
    title: 'Late-Night National Exam Burnout',
    speaker: 'Acquaintance / Senior Student',
    speakerRole: 'Study Booster Peddler',
    narrative: 'You have been studying past midnight for upcoming major national exams. Fatigue is setting in, your eyes are heavy, and you are struggling to comprehend complex practice papers. An acquaintance contacts you offering an unmarked pill: "Take this study booster. It will instantly force your brain awake and help you think better!"',
    options: [
      {
        text: 'Option A (Substance Temptation): Take the unmarked pill/substance to instantly force your brain awake.',
        type: 'accept',
        healthChange: -26, // Takes 2-3 bad decisions to land in hospital
        resilienceChange: -24,
        acadChange: -15, // Temporarily rises then plummets due to chemical toxicity, anxiety, and crash
        socialChange: -12,
        hungerChange: -15,
        feedback: 'Health drops noticeably! A momentary nervous buzz gave way to chemical toxicity, severe palpitations, acute anxiety, and an inevitable crash. You could not focus during the actual exam papers.',
        statTip: 'Health -26, Academics -15 (Crash), Resilience -24, Social -12'
      },
      {
        text: 'Option B (Peer Support): Reach out to close friends and classmates for help, scheduling a group revision session at the void deck or canteen the next morning.',
        type: 'divert',
        healthChange: 0, // Health stays at 100%
        resilienceChange: 24,
        acadChange: 16, // Academic increases
        socialChange: 22, // Social increases
        hungerChange: 0,
        feedback: 'Health stays at 100%! Reaching out created a supportive, uplifting study circle. You and your friends quizzed each other and clarified difficult concepts together.',
        statTip: 'Health stays at 100%, Academics +16, Social +22, Resilience +24'
      },
      {
        text: 'Option C (Independent Revision): Head to the regional public library the following day to study alone in a quiet, structured, and distraction-free environment.',
        type: 'resist',
        healthChange: 0, // Health stays at 100%
        resilienceChange: 26,
        acadChange: 25, // Academic increases significantly
        socialChange: 0,
        hungerChange: 0,
        feedback: 'Health stays at 100%! The air-conditioned regional library provided pristine focus, quiet desks, and comprehensive reference books. Your exam mastery surged significantly.',
        statTip: 'Health stays at 100%, Academics +25 (Significant Mastery), Resilience +26'
      },
      {
        text: 'Option D (Rest & Wellness): Call it a night, get a full 8 hours of sleep, and seek advice from your family or school teacher regarding study pacing.',
        type: 'resist',
        healthChange: 0, // Health stays at 100%
        resilienceChange: 20,
        acadChange: 14, // Academic increases
        socialChange: 10,
        hungerChange: 100, // Energy completely recovers
        feedback: 'Health stays at 100%! Energy completely recovered after quality sleep. With a refreshed brain and teacher guidance on study pacing, your retention improved naturally.',
        statTip: 'Health stays at 100%, Energy fully recovered (100%), Academics +14, Resilience +20'
      }
    ]
  },

  // 4. SECONDARY SCHOOL: PASAR MALAM AMBUSH (SYNTHETIC VAPES)
  {
    id: 'sec_pasarmalam_spice',
    stageRequired: 'secondary',
    room: 'pasarmalam',
    locationLabel: 'Pasar Malam Behind the Ramly Burger Stall',
    title: 'The Sleek Silver Device',
    speaker: 'Alleyway Acquaintance',
    speakerRole: 'Telegram Vape Supplier',
    narrative: 'Behind the humming generator near the Ramly stall, an acquaintance corners you. "Bro, this pod has special synthetic cannabinoid oil from Telegram. One drag and your stress vanishes into thin air. Just try once, free trial!"',
    options: [
      {
        text: '"Under Singapore law and for my health, I do not touch illegal vapes or drugs. Move away."',
        type: 'resist',
        healthChange: 4,
        resilienceChange: 26,
        acadChange: 5,
        socialChange: -5,
        hungerChange: 0,
        feedback: 'You stated your boundary with unwavering eye contact. He backed down and slipped away into the crowd.',
        statTip: 'Resilience +26, Academics +5, Health +4, Social -5'
      },
      {
        text: 'Take three heavy puffs from the sleek vape device.',
        type: 'accept',
        healthChange: -26,
        resilienceChange: -24,
        acadChange: -12,
        socialChange: -10,
        hungerChange: 0,
        feedback: 'Synthetic cannabinoids (Spice/K2) hit your nervous system. Panic attack, blurred vision, and chest tightness incapacitated you on the pavement.',
        statTip: 'Health -26, Resilience -24, Academics -12, Social -10'
      },
      {
        text: 'Turn on your heels, order Tutu Kueh and Ramly burgers, and share them with your good friends in the bright centre of the market.',
        type: 'divert',
        healthChange: 3,
        resilienceChange: 22,
        acadChange: 4,
        socialChange: 18,
        hungerChange: 30,
        feedback: 'The warm, fragrant Tutu Kueh and burgers hit the spot. Laughter with trustworthy friends replaced any fleeting temptation.',
        statTip: 'Social +18, Hunger +30, Resilience +22'
      },
      {
        text: 'Report the illegal seller discreetly to nearby police officers conducting routine market patrols.',
        type: 'report',
        healthChange: 3,
        resilienceChange: 28,
        acadChange: 6,
        socialChange: 8,
        hungerChange: 0,
        feedback: 'Officers swiftly questioned the distributor, intercepting toxic vape cartridges before other youths could be harmed.',
        statTip: 'Resilience +28, Academics +6, Social +8'
      }
    ]
  },

  // 5. ADULT / CLARKE QUAY NIGHTLIFE AMBUSH
  {
    id: 'tertiary_clarkequay_club',
    stageRequired: 'adult',
    room: 'clarkequay',
    locationLabel: 'Clarke Quay / Read Bridge Neon Riverfront',
    title: 'Clarke Quay Nightlife Ambush',
    speaker: 'Promoter & College Seniors',
    speakerRole: 'Club Party Group',
    narrative: 'Beside the glowing neon shophouses and Read Bridge, lively techno music pulses from the clubs. A campus senior passes you a neon capsule: "It is an imported party booster. Everyone at the afterparty takes it. Do not be a killjoy, down it!"',
    options: [
      {
        text: '"No thanks. I came to enjoy music, good drinks, and river breeze. I keep my mind sharp."',
        type: 'resist',
        healthChange: 5,
        resilienceChange: 30, // massive resilience boost!
        acadChange: 6,
        socialChange: -8, // temporary social rejection from toxic crowd
        hungerChange: 0,
        feedback: 'They scoffed and moved away, but your resolve was rock-solid. You kept your safety, career prospects, and freedom intact.',
        statTip: 'Resilience +30, Health +5, Academics +6, Social -8 (temporary)'
      },
      {
        text: 'Down the neon capsule and wash it down with a party beverage.',
        type: 'accept',
        healthChange: -27,
        resilienceChange: -25,
        acadChange: -15,
        socialChange: -15,
        hungerChange: 0,
        feedback: 'Contaminated synthetic chemicals triggered acute hyperthermia and rapid heart rate. You had to sit down gasping for water as friends looked on in concern.',
        statTip: 'Health -27, Resilience -25, Academics -15, Social -15'
      },
      {
        text: 'Suggest taking your core friends to a 24-hour supper spot for prata and teh tarik along Jalan Besar instead.',
        type: 'divert',
        healthChange: 4,
        resilienceChange: 26,
        acadChange: 6,
        socialChange: 22, // genuine social surge
        hungerChange: 25,
        feedback: 'Your real friends immediately agreed! You had hilarious conversations over crispy egg prata and teh tarik, free from legal and medical jeopardy.',
        statTip: 'Social +22 (True friendships!), Resilience +26, Hunger +25'
      },
      {
        text: 'Alert club security and exit the nightlife strip safely via Clarke Quay MRT.',
        type: 'report',
        healthChange: 4,
        resilienceChange: 32,
        acadChange: 8,
        socialChange: 6,
        hungerChange: 0,
        feedback: 'Security escorted the peddlers off the premises. You protected innocent partygoers and boarded your train in peace.',
        statTip: 'Resilience +32, Academics +8'
      }
    ]
  },

  // 6. TERTIARY / ORCHARD ROAD & *SCAPE AMBUSH
  {
    id: 'tertiary_orchard_skate',
    stageRequired: 'tertiary',
    room: 'orchard',
    locationLabel: 'Orchard Road / *SCAPE Youth Skate Park',
    title: 'The Telegram "海外 Legal" Pitch',
    speaker: 'Skate Park Hypebeast',
    speakerRole: 'Overseas Returning Student',
    narrative: 'Sitting on the concrete ramp at *SCAPE, a flashy youth pulls out cannabis vape cartridges. "Bro, this is legal overseas in California and Canada, so it cannot be bad for you! Singapore is just too strict. Take a puff, relax lah."',
    options: [
      {
        text: '"Overseas legalization does not change neuroscience or Singapore law. Central Narcotics Bureau enforces zero-tolerance for a reason. No way."',
        type: 'resist',
        healthChange: 4,
        resilienceChange: 28,
        acadChange: 8,
        socialChange: -5,
        hungerChange: 0,
        feedback: 'You demonstrated mature understanding. He realized his manipulative argument failed and retreated.',
        statTip: 'Resilience +28, Academics +8, Health +4'
      },
      {
        text: 'Believe his logic and take several hits from the cannabis cartridge.',
        type: 'accept',
        healthChange: -26,
        resilienceChange: -25,
        acadChange: -15,
        socialChange: -12,
        hungerChange: 0,
        feedback: 'Heavy brain fog, cognitive decline, memory impairment, and drug residue detected in screening. Your scholastic record is put under review.',
        statTip: 'Health -26, Resilience -25, Academics -15'
      },
      {
        text: 'Challenge him to an ollie contest and street dance battle in front of the crowd instead.',
        type: 'divert',
        healthChange: 6,
        resilienceChange: 24,
        acadChange: 4,
        socialChange: 20,
        hungerChange: -10,
        feedback: 'The crowd cheered for your sick kickflips and breakdance spins! Natural adrenaline and sport mastery completely eclipsed toxic substances.',
        statTip: 'Social +20, Health +6, Resilience +24'
      },
      {
        text: 'Walk over to the youth guidance booth at the community centre and grab prevention flyers for peers.',
        type: 'report',
        healthChange: 3,
        resilienceChange: 25,
        acadChange: 7,
        socialChange: 10,
        hungerChange: 0,
        feedback: 'You equipped yourself with verified anti-drug facts and shared them on your youth council group chat.',
        statTip: 'Resilience +25, Academics +7, Social +10'
      }
    ]
  },

  // 7. ADULT / WORKPLACE BURNOUT AMBUSH
  {
    id: 'adult_office_burnout',
    stageRequired: 'adult',
    room: 'clarkequay',
    locationLabel: 'Clarke Quay Supper Spot Over Late Supper',
    title: 'The Overtime Coping Trap',
    speaker: 'Exhausted Senior Associate',
    speakerRole: 'Corporate Colleague',
    narrative: 'At 10:30 PM over chicken rice at Maxwell Hawker Centre, your coworker sighs heavily. "This merger project is killing me. I have methamphetamine ice crystals in my car. Half a pipe gives you 48 hours of laser focus. You need this to survive corporate life."',
    options: [
      {
        text: '"No project is worth destroying my brain, heart, and freedom. I manage workload with boundary setting and sleep."',
        type: 'resist',
        healthChange: 5,
        resilienceChange: 35,
        acadChange: 10,
        socialChange: 6,
        hungerChange: 0,
        feedback: 'Your supreme resilience anchored you. You maintained work excellence cleanly and earned the respect of department directors.',
        statTip: 'Resilience +35, Health +5, Academics +10'
      },
      {
        text: 'Follow your coworker to the carpark and smoke the methamphetamine crystals.',
        type: 'accept',
        healthChange: -27,
        resilienceChange: -26,
        acadChange: -20,
        socialChange: -20,
        hungerChange: 0,
        feedback: 'Severe acute paranoia, elevated blood pressure, and mental distress set in. You missed critical deadlines the next morning as your health deteriorated.',
        statTip: 'Health -27, Resilience -26, Academics -20, Social -20'
      },
      {
        text: 'Order freshly squeezed sugar cane juice with lemon, and help your coworker prioritize tasks for realistic delegation.',
        type: 'divert',
        healthChange: 6,
        resilienceChange: 28,
        acadChange: 10,
        socialChange: 24,
        hungerChange: 25,
        feedback: 'The refreshing sugarcane juice revitalized both of you. You taught your colleague healthy stress management without substance dependency.',
        statTip: 'Social +24, Resilience +28, Hunger +25'
      },
      {
        text: 'Confidential HR escalation & connect your coworker with the CNB Support Helpline (1800-600-0000).',
        type: 'report',
        healthChange: 4,
        resilienceChange: 32,
        acadChange: 8,
        socialChange: 12,
        hungerChange: 0,
        feedback: 'You intervened before your coworker suffered an overdose or legal ruin. Professional rehabilitation saved their life.',
        statTip: 'Resilience +32, Social +12'
      }
    ]
  },

  // 8. ORCHARD ROAD: INFLUENCER & FASHION DIET PILL TRAP
  {
    id: 'orchard_diet_pill_trap',
    stageRequired: 'tertiary',
    room: 'orchard',
    locationLabel: 'ION Orchard & Somerset Fashion Promenade',
    title: 'The Unlicensed "Slim & Focus" Pill Trap',
    speaker: 'Trendy Lifestyle Influencer',
    speakerRole: 'Social Media Creator',
    narrative: 'Outside the ION Orchard canopy after an audition, an older creator pulls out a plastic bag of unmarked colourful capsules. "You want to look sharp for photo shoots and stay awake for O-Levels? Take these imported slimming speed pills. Instant metabolism boost, zero hunger, and straight A focus!"',
    options: [
      {
        text: '"Unregulated pills often contain dangerous phentermine, amphetamine analogues, or banned sibutramine. True fitness comes from wholesome nutrition and real rest."',
        type: 'resist',
        healthChange: 5,
        resilienceChange: 26,
        acadChange: 6,
        socialChange: -3,
        hungerChange: 0,
        feedback: 'You refused to risk cardiac arrhythmia and addiction for superficial vanity. You prioritized authentic wellbeing.',
        statTip: 'Resilience +26, Academics +6, Health +5'
      },
      {
        text: 'Swallow two capsules hoping for rapid weight loss and endless study stamina.',
        type: 'accept',
        healthChange: -26,
        resilienceChange: -24,
        acadChange: -14,
        socialChange: -10,
        hungerChange: 0,
        feedback: 'Unpleasant heart palpitations, extreme insomnia, anxiety, and a severe chemical crash left you trembling and exhausted.',
        statTip: 'Health -26, Resilience -24, Academics -14'
      },
      {
        text: 'Invite your friends to grab refreshing brown sugar fresh milk with boba pearls and practice dance choreography at *SCAPE instead.',
        type: 'divert',
        healthChange: 4,
        resilienceChange: 22,
        acadChange: 3,
        socialChange: 22,
        hungerChange: 25,
        feedback: 'You channeled your energy into creative movement and real friendships. Natural dance endorphins beat synthetic chemicals any day.',
        statTip: 'Social +22, Resilience +22, Hunger +25'
      },
      {
        text: 'Report the illegal sale of unapproved prescription substances to the Health Sciences Authority (HSA) hotline.',
        type: 'report',
        healthChange: 3,
        resilienceChange: 28,
        acadChange: 8,
        socialChange: 8,
        hungerChange: 0,
        feedback: 'HSA acted swiftly against the illicit syndicate, protecting countless young teenagers from dangerous counterfeit stimulants.',
        statTip: 'Resilience +28, Academics +8'
      }
    ]
  },

  // 9. CLARKE QUAY: READ BRIDGE NIGHTTIME PARTY PILL
  {
    id: 'clarkequay_party_pill',
    stageRequired: 'adult',
    room: 'clarkequay',
    locationLabel: 'Read Bridge over Singapore River',
    title: 'Midnight Ecstasy Pressure by the River',
    speaker: 'Nightclub Promoter',
    speakerRole: 'Club Circuit Acquaintance',
    narrative: 'Sitting on the historic steps of Read Bridge listening to the river water, an acquaintance winks and slips out two MDMA ecstasy tablets. "Bro, the music at the club hits 10x harder on this. It\'s just party candy, everyone around Clarke Quay takes it to stay energized till dawn."',
    options: [
      {
        text: '"MDMA causes severe hyperthermia, brain serotonin depletion, and depression. Central Narcotics Bureau treats ecstasy as a Class A controlled drug. Absolute no."',
        type: 'resist',
        healthChange: 6,
        resilienceChange: 30,
        acadChange: 6,
        socialChange: -4,
        hungerChange: 0,
        feedback: 'You stood unshakable against party peer pressure. Your friends respected your solid boundaries and clear conscience.',
        statTip: 'Resilience +30, Health +6, Academics +6'
      },
      {
        text: 'Take the MDMA tablet to blend in with the party crowd.',
        type: 'accept',
        healthChange: -26,
        resilienceChange: -25,
        acadChange: -15,
        socialChange: -12,
        hungerChange: 0,
        feedback: 'Severe dehydration, uncomfortably elevated heart rate, acute neurotoxicity, and a strict security warning at the bridge landing.',
        statTip: 'Health -26, Resilience -25, Academics -15'
      },
      {
        text: 'Hop onto an electric river bumboat cruise and enjoy the illuminated city lights along Boat Quay and Marina Bay.',
        type: 'divert',
        healthChange: 4,
        resilienceChange: 24,
        acadChange: 4,
        socialChange: 25,
        hungerChange: -10,
        feedback: 'Cruising down the calm Singapore River under the night breeze was mesmerizing and 100% wholesome. You made unforgettable clean memories.',
        statTip: 'Social +25, Resilience +24, Health +4'
      },
      {
        text: 'Walk over to the police river patrol post and alert youth outreach ambassadors about illicit peddling near the bridge.',
        type: 'report',
        healthChange: 3,
        resilienceChange: 30,
        acadChange: 7,
        socialChange: 10,
        hungerChange: 0,
        feedback: 'River safety patrols secured the public bridge area, ensuring safe nightlife for all youth without toxic substances.',
        statTip: 'Resilience +30, Academics +7'
      }
    ]
  },

  // 10. MARINA BAY SANDS: LUXURY SUITE SYNTHETIC CANNABINOID VAPE
  {
    id: 'mbs_synthetic_vape',
    stageRequired: 'adult',
    room: 'marinabaysands',
    locationLabel: 'MBS SkyPark & Hotel Staycation Suite',
    title: 'The "Designer Luxury" K2 Spice Vape',
    speaker: 'Flashy High-Flyer Peer',
    speakerRole: 'Socialite Friend',
    narrative: 'At a rooftop staycation party overlooking the Marina Bay skyline, a peer brandishes a sleek gold vape device. "This is custom synthetic cannabinoid juice (K2/Spice) ordered online. Zero scent, super euphoric, and the hotel sensors won\'t even detect it. Take a deep puff with this city view."',
    options: [
      {
        text: '"Synthetic cannabinoids (K2/Spice) are volatile research chemicals causing sudden seizures, acute kidney failure, and psychosis. Singapore classifies them as Class A controlled drugs."',
        type: 'resist',
        healthChange: 5,
        resilienceChange: 32,
        acadChange: 8,
        socialChange: -4,
        hungerChange: 0,
        feedback: 'You pierced straight through their superficial illusion. They quietly put the contraband device away.',
        statTip: 'Resilience +32, Academics +8, Health +5'
      },
      {
        text: 'Inhale several deep clouds of the synthetic cannabinoid vape.',
        type: 'accept',
        healthChange: -27,
        resilienceChange: -25,
        acadChange: -16,
        socialChange: -14,
        hungerChange: 0,
        feedback: 'Violent dizzy spells, acute sensory disorientation, and cardiac distress forced you to sit on the floor while partygoers scattered.',
        statTip: 'Health -27, Resilience -25, Academics -16'
      },
      {
        text: 'Lead the group downstairs to the Event Plaza to watch the free Spectra outdoor water, laser, and orchestral symphony show.',
        type: 'divert',
        healthChange: 5,
        resilienceChange: 26,
        acadChange: 5,
        socialChange: 28,
        hungerChange: -5,
        feedback: 'The dancing water fountains and laser projections set to classical orchestral music blew everyone away. True awe requires no substances.',
        statTip: 'Social +28, Resilience +26, Health +5'
      },
      {
        text: 'Secretly report the illegal importation and distribution of synthetic vape pods via the CNB i-Witness portal.',
        type: 'report',
        healthChange: 4,
        resilienceChange: 35,
        acadChange: 10,
        socialChange: 8,
        hungerChange: 0,
        feedback: 'Your confidential report dismantled an underground distributor targeting university students across Singapore.',
        statTip: 'Resilience +35, Academics +10'
      }
    ]
  },

  // 11. CHANGI AIRPORT: TRANSIT LUGGAGE COURIER PROPOSAL
  {
    id: 'changi_luggage_courier',
    stageRequired: 'adult',
    room: 'changiairport',
    locationLabel: 'Changi Airport Jewel Departure Hall',
    title: 'The "Harmless Luggage Courier" Scheme',
    speaker: 'Smooth-Talking Travel Acquaintance',
    speakerRole: 'Overseas Tour Contact',
    narrative: 'Waiting near the Jewel Rain Vortex before checking in for a flight, an acquaintance hurries over holding a sealed souvenir tin. "Hey, my luggage is overweight! Just pack this harmless herbal tea tin into your check-in bag for me. I\'ll pay you $1,500 cash when we land. Free holiday money bro!"',
    options: [
      {
        text: '"Never ever carry unknown items through airport customs. Singapore\'s Misuse of Drugs Act holds anyone carrying narcotics criminally liable, with strict mandatory penalties. Step back."',
        type: 'resist',
        healthChange: 6,
        resilienceChange: 36,
        acadChange: 10,
        socialChange: 0,
        hungerChange: 0,
        feedback: 'You rejected the classic drug mule setup. You protected your life, legal innocence, and entire future from devastation.',
        statTip: 'Resilience +36, Academics +10, Health +6'
      },
      {
        text: 'Accept the $1,500 cash and pack the sealed tin into your personal backpack.',
        type: 'accept',
        healthChange: -28,
        resilienceChange: -26,
        acadChange: -20,
        socialChange: -20,
        hungerChange: 0,
        feedback: 'Customs screening flagged irregularities in the canister. You were subjected to rigorous border interrogation and extensive background checks.',
        statTip: 'Health -28, Resilience -26, Academics -20, Social -20'
      },
      {
        text: 'Walk over to the airline customer service counter together to assist with legitimate oversized baggage fees instead.',
        type: 'divert',
        healthChange: 3,
        resilienceChange: 26,
        acadChange: 6,
        socialChange: 18,
        hungerChange: 0,
        feedback: 'The individual panicked and fled immediately, confirming your sharp instincts saved you from a malicious trap.',
        statTip: 'Resilience +26, Social +18'
      },
      {
        text: 'Alert the Changi Airport Police Division (APD) and Central Narcotics Bureau border checkpoint officers on duty immediately.',
        type: 'report',
        healthChange: 5,
        resilienceChange: 40,
        acadChange: 12,
        socialChange: 15,
        hungerChange: 0,
        feedback: 'Changi Airport Police apprehended an international trafficking courier. You were commended for safeguarding national borders.',
        statTip: 'Resilience +40, Academics +12'
      }
    ]
  },

  // 12. CHIJMES: EXAM ANXIETY TRANQUILIZER AMBUSH
  {
    id: 'chijmes_tranquilizer_offer',
    stageRequired: 'adult',
    room: 'chijmes',
    locationLabel: 'CHIJMES Cloister Courtyard Under Fairy Lights',
    title: 'The Exam Anxiety "Chill Pill" Dilemma',
    speaker: 'Stressed Senior Student',
    speakerRole: 'Academic Tuition Peer',
    narrative: 'Sitting under the warm fairy lights outside the Gothic Chapel before an acoustic open mic, your study mate trembles with panic. "I can\'t cope with prelim stress and stage fright. My cousin gave me these prescription Xanax and codeine syrup. Take half a tablet, your anxiety will vanish instantly."',
    options: [
      {
        text: '"Prescription benzos and codeine are intensely addictive, cause respiratory depression, and impair memory retention. I manage stress with mindfulness, sleep, and honest preparation."',
        type: 'resist',
        healthChange: 5,
        resilienceChange: 28,
        acadChange: 8,
        socialChange: 2,
        hungerChange: 0,
        feedback: 'You taught your peer that coping mechanisms build long-term strength, whereas illicit pharmaceuticals build chemical dependency.',
        statTip: 'Resilience +28, Academics +8, Health +5'
      },
      {
        text: 'Take the tranquilizer pill and swallow it with iced tea to numb exam anxiety.',
        type: 'accept',
        healthChange: -26,
        resilienceChange: -24,
        acadChange: -16,
        socialChange: -12,
        hungerChange: 0,
        feedback: 'Heavy sedation, slurred speech, acute memory blackout, and impaired cognitive recall during your study review.',
        statTip: 'Health -26, Resilience -24, Academics -16'
      },
      {
        text: 'Buy two cups of calming chamomile mint tea and artisan pistachio gelato, and guide them through a 5-minute deep breathing exercise.',
        type: 'divert',
        healthChange: 5,
        resilienceChange: 25,
        acadChange: 6,
        socialChange: 24,
        hungerChange: 20,
        feedback: 'The warm tea and grounding breathwork restored calm naturally. Your peer gave an enchanting, heartfelt musical performance.',
        statTip: 'Social +24, Resilience +25, Hunger +20'
      },
      {
        text: 'Connect your friend with the school counsellor and the National Youth Mental Health Helpline (1771 / 1800-202-6868).',
        type: 'report',
        healthChange: 4,
        resilienceChange: 30,
        acadChange: 8,
        socialChange: 16,
        hungerChange: 0,
        feedback: 'Professional counselling helped your friend overcome anxiety safely without ever touching controlled drugs.',
        statTip: 'Resilience +30, Social +16'
      }
    ]
  },

  // 13. MERLION PARK: OVERSEAS CANNABIS EDIBLE GUMMIES
  {
    id: 'merlion_cannabis_gummies',
    stageRequired: 'adult',
    room: 'merlion',
    locationLabel: 'Merlion Park Waterfront by Marina Bay',
    title: 'The Overseas "Legal Weed Candy" Test',
    speaker: 'Foreign Exchange Student',
    speakerRole: 'Exchange Programme Buddy',
    narrative: 'While snapping selfies as the Merlion spouts water into the bay, an overseas student produces a colourful foil pouch of THC weed gummies. "Back home in Amsterdam and Canada, these are totally legal in convenience stores! Eat a couple, they taste just like gummy bears. You\'re in Singapore, nobody will ever test you."',
    options: [
      {
        text: '"Singapore law applies zero-tolerance to all narcotics including edibles. Singapore citizens and PRs consuming cannabis overseas are liable under the Misuse of Drugs Act upon return. No way."',
        type: 'resist',
        healthChange: 5,
        resilienceChange: 30,
        acadChange: 8,
        socialChange: -2,
        hungerChange: 0,
        feedback: 'Your clear understanding of extra-territorial drug laws and personal discipline kept your future 100% spotless.',
        statTip: 'Resilience +30, Academics +8, Health +5'
      },
      {
        text: 'Chew and swallow several THC cannabis gummy bears.',
        type: 'accept',
        healthChange: -26,
        resilienceChange: -24,
        acadChange: -15,
        socialChange: -12,
        hungerChange: 0,
        feedback: 'Uncontrolled cannabinoid dosage induced severe nausea, panic sensation, and heart palpitations during the evening walk.',
        statTip: 'Health -26, Resilience -24, Academics -15'
      },
      {
        text: 'Stroll across Jubilee Bridge to watch the evening sunset reflect over Marina Bay and grab coconut ice cream instead.',
        type: 'divert',
        healthChange: 4,
        resilienceChange: 24,
        acadChange: 4,
        socialChange: 22,
        hungerChange: 15,
        feedback: 'The breezy evening walk over the bay was refreshing. Your exchange buddy learned that Singapore offers world-class experiences without substances.',
        statTip: 'Social +22, Resilience +24, Hunger +15'
      },
      {
        text: 'Point out the prominent Central Narcotics Bureau preventive campaign sign and advise your buddy to dispose of contraband immediately.',
        type: 'report',
        healthChange: 4,
        resilienceChange: 32,
        acadChange: 9,
        socialChange: 12,
        hungerChange: 0,
        feedback: 'Your prompt intervention prevented a severe international criminal offense and saved your friend from detention.',
        statTip: 'Resilience +32, Academics +9'
      }
    ]
  },

  // 14. GARDENS BY THE BAY: SUPERTREE PSYCHEDELIC MUSHROOM OFFER
  {
    id: 'gardens_psychedelic_mushroom',
    stageRequired: 'tertiary',
    room: 'gardensbythebay',
    locationLabel: 'Supertree Grove Under Garden Rhapsody Lights',
    title: 'The "Cosmic" Psilocybin Mushroom Stash',
    speaker: 'Bohemian Arts Student',
    speakerRole: 'Creative Arts Acquaintance',
    narrative: 'As the towering Supertrees burst into magenta and neon cyan light during the Garden Rhapsody music show, an arts student whispers to you. "Look at the canopy! I brought dried psilocybin magic mushrooms. If you chew them now, the trees will breathe and talk to you. It\'s pure creative inspiration for your portfolio."',
    options: [
      {
        text: '"Psilocybin hallucinogens trigger terrifying psychological bad trips, persistent psychosis, and fatal accidents. True artistic creativity flows from lucid imagination, not brain toxins."',
        type: 'resist',
        healthChange: 5,
        resilienceChange: 32,
        acadChange: 9,
        socialChange: -3,
        hungerChange: 0,
        feedback: 'You embraced the magnificent botanical engineering and light artistry with razor-sharp clarity and authentic inspiration.',
        statTip: 'Resilience +32, Academics +9, Health +5'
      },
      {
        text: 'Chew the dried psilocybin mushrooms to experience hallucinations.',
        type: 'accept',
        healthChange: -27,
        resilienceChange: -25,
        acadChange: -16,
        socialChange: -15,
        hungerChange: 0,
        feedback: 'Disturbing sensory distortion, disorientation, acute nausea, and anxiety underneath the Supertrees left you shaken and miserable.',
        statTip: 'Health -27, Resilience -25, Academics -16'
      },
      {
        text: 'Take the elevator 22 meters up to the OCBC Skyway suspension bridge and photograph the breathtaking 360-degree Marina Bay skyline.',
        type: 'divert',
        healthChange: 4,
        resilienceChange: 26,
        acadChange: 6,
        socialChange: 25,
        hungerChange: -10,
        feedback: 'Walking high between the living Supertrees under the starry tropical night was genuinely magical. You captured award-winning photos cleanly.',
        statTip: 'Social +25, Resilience +26, Academics +6'
      },
      {
        text: 'Notify Gardens by the Bay security rangers regarding illicit substance possession in the public park.',
        type: 'report',
        healthChange: 4,
        resilienceChange: 34,
        acadChange: 10,
        socialChange: 10,
        hungerChange: 0,
        feedback: 'Park rangers secured the public family sanctuary, preserving Gardens by the Bay as an inspiring drug-free national landmark.',
        statTip: 'Resilience +34, Academics +10'
      }
    ]
  },

  // 15. JUNIOR COLLEGE (JC): SYNTHETIC COGNITIVE STIMULANTS FOR EXAM FOCUS
  {
    id: 'jc_study_stimulant_exam',
    stageRequired: 'tertiary',
    room: 'juniorcollege',
    locationLabel: 'Junior College Grand Concourse Study Corner',
    title: 'The "Exam Focus Enhancer" Dilemma',
    speaker: 'Stressed Classmate',
    speakerRole: 'A-Level Study Partner',
    narrative: 'A-Level Project Work and H2 Chemistry prelims are next week! A classmate with bloodshot eyes pulls you to the library terrace. "Bro, I got these cognitive smart pills online. One capsule lets you cram 36 hours straight without sleep. Half our tutorial group is using it to secure 90 rank points. Take one lah, our group project score depends on it!"',
    options: [
      {
        text: '"No chemical shortcuts. Real academic stamina comes from disciplined study schedules and good sleep. I will not risk heart damage or brain toxicity."',
        type: 'resist',
        healthChange: 5,
        resilienceChange: 32,
        acadChange: 12,
        socialChange: 4,
        hungerChange: 0,
        feedback: 'You stood firm on academic integrity and healthy discipline. You organized a focused study group and mastered the prelim topics cleanly.',
        statTip: 'Resilience +32, Academics +12, Health +5'
      },
      {
        text: 'Swallow the synthetic stimulant pill to pull all-nighters.',
        type: 'accept',
        healthChange: -26,
        resilienceChange: -24,
        acadChange: -16,
        socialChange: -12,
        hungerChange: 0,
        feedback: 'Severe cardiac palpitations, trembling hands during tutorials, mental blackout, and an acute cognitive crash that wrecked revision progress.',
        statTip: 'Health -26, Resilience -24, Academics -16'
      },
      {
        text: 'Suggest organizing a structured revision timetable with Pomodoro rest intervals and fresh fruit smoothies.',
        type: 'divert',
        healthChange: 6,
        resilienceChange: 26,
        acadChange: 14,
        socialChange: 18,
        hungerChange: -10,
        feedback: 'Your positive leadership helped your study group stay calm, focused, and mutually supportive throughout the rigorous prelim season.',
        statTip: 'Academics +14, Social +18, Resilience +26'
      },
      {
        text: 'Encourage your classmate to visit the JC school counsellor to address intense academic stress and burn-out.',
        type: 'report',
        healthChange: 4,
        resilienceChange: 30,
        acadChange: 10,
        socialChange: 15,
        hungerChange: 0,
        feedback: 'The school counsellor provided supportive study skills guidance and stress management techniques, saving your peer from panic.',
        statTip: 'Resilience +30, Social +15, Academics +10'
      }
    ]
  },

  // 16. POLYTECHNIC: FLAVOURED POD MOD PEER PRESSURE IN STAIRWELL
  {
    id: 'poly_flavour_vape_break',
    stageRequired: 'tertiary',
    room: 'polytechnic',
    locationLabel: 'Polytechnic Car Park Stairwell & Smoking Corner',
    title: 'The "Flavoured Cloud" Peer Pressure',
    speaker: 'Year 2 Studio Groupmate',
    speakerRole: 'Design Project Peer',
    narrative: 'During a break from your design capstone project, a studio groupmate nudges you into the secluded car park stairwell. "Client presentation in 2 hours! Check out this cool mint mango pod mod. It smells like candy and takes away all the deadline stress. Don\'t be so square, everybody in our course is puffing. Just take a puff!"',
    options: [
      {
        text: '"I value my lungs and sports too much. Vapes are laced with heavy metals and toxic synthetic adulterants. I\'m heading back to polish our presentation slides."',
        type: 'resist',
        healthChange: 6,
        resilienceChange: 32,
        acadChange: 10,
        socialChange: 2,
        hungerChange: 0,
        feedback: 'You firmly resisted peer pressure. Your lungs stayed clear and your presentation delivery impressed the industry panel.',
        statTip: 'Resilience +32, Health +6, Academics +10'
      },
      {
        text: 'Inhale deep puffs from the flavoured vape to blend into the social group.',
        type: 'accept',
        healthChange: -26,
        resilienceChange: -24,
        acadChange: -15,
        socialChange: -10,
        hungerChange: 0,
        feedback: 'Bronchospasm, persistent coughing fit, burning chest tightness, and a stern warning from campus safety personnel.',
        statTip: 'Health -26, Resilience -24, Academics -15'
      },
      {
        text: 'Suggest grabbing iced barley drinks and curry puffs from the student food court instead.',
        type: 'divert',
        healthChange: 5,
        resilienceChange: 24,
        acadChange: 8,
        socialChange: 20,
        hungerChange: 15,
        feedback: 'A cold drink and warm snack gave the entire team genuine stamina, and you rehearsed the pitch together on the sunny atrium lawn.',
        statTip: 'Social +20, Resilience +24, Health +5'
      },
      {
        text: 'Remind groupmates about campus zero-tolerance policy and invite them to the Poly Anti-Drug Peer Ambassador Booth.',
        type: 'report',
        healthChange: 4,
        resilienceChange: 32,
        acadChange: 9,
        socialChange: 12,
        hungerChange: 0,
        feedback: 'Your moral courage set a healthy tone for the studio cohort, reinforcing a clean, creative, and forward-looking culture.',
        statTip: 'Resilience +32, Social +12, Academics +9'
      }
    ]
  },

  // 17. ITE COLLEGE: "UNWIND AFTER HEAVY WORK" ILLICIT PILLS
  {
    id: 'ite_workshop_chill_pills',
    stageRequired: 'tertiary',
    room: 'itecollege',
    locationLabel: 'ITE Engineering Workshop Breakout Bench',
    title: 'The "Unwind After Heavy Work" Trap',
    speaker: 'Workshop Apprentice',
    speakerRole: 'Engineering Course Buddy',
    narrative: 'After a 6-hour vehicle engine overhaul workshop, your workshop partner rubs his sore shoulders and leans in behind the tool lockers. "Bro, that practical drill broke my back! My cousin passed me some synthetic muscle chill pills. Says it numbs all the pain and makes you fly. Let\'s pop them behind the locker room before the next shift."',
    options: [
      {
        text: '"Safety and precision come first. Real technicians stay sharp and sober. If your muscles are sore, do stretching and drink 100PLUS."',
        type: 'resist',
        healthChange: 6,
        resilienceChange: 34,
        acadChange: 12,
        socialChange: 4,
        hungerChange: 0,
        feedback: 'Your disciplined refusal protected both your life and workshop safety. Industrial heavy machinery requires 100% sobriety and alert reflexes.',
        statTip: 'Resilience +34, Health +6, Academics +12'
      },
      {
        text: 'Accept the synthetic chill pills and swallow them behind the lockers.',
        type: 'accept',
        healthChange: -27,
        resilienceChange: -25,
        acadChange: -16,
        socialChange: -12,
        hungerChange: 0,
        feedback: 'Neuromuscular impairment, dizziness, slowed reflexes, and near-miss accident in the workshop leading to safety retraining.',
        statTip: 'Health -27, Resilience -25, Academics -16'
      },
      {
        text: 'Challenge your buddy to a floorball scrimmage at the campus sports arena to release muscle tension naturally.',
        type: 'divert',
        healthChange: 10,
        resilienceChange: 26,
        acadChange: 6,
        socialChange: 24,
        hungerChange: -15,
        feedback: 'A fast-paced sports match got the endorphins pumping, worked out all the stiffness, and deepened your genuine brotherhood cleanly.',
        statTip: 'Health +10, Social +24, Resilience +26'
      },
      {
        text: 'Encourage your buddy to report to the campus health centre and speak with an ITE Youth Peer Leader.',
        type: 'report',
        healthChange: 5,
        resilienceChange: 32,
        acadChange: 8,
        socialChange: 16,
        hungerChange: 0,
        feedback: 'Campus student care officers provided ergonomic support and preventive guidance, keeping your cohort safe and united.',
        statTip: 'Resilience +32, Social +16, Academics +8'
      }
    ]
  }
];
