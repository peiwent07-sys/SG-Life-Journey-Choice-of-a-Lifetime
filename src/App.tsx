import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  AvatarConfig, 
  CosmeticCategory, 
  CosmeticItem, 
  DilemmaOption, 
  DilemmaScenario, 
  EndingType, 
  FamilyBackground, 
  InteractableObject, 
  LifeStageKey, 
  PlayerStats, 
  PostSecondaryPath 
} from './types';
import { GAME_ROOMS } from './data/roomsData';
import { DILEMMA_SCENARIOS, FAMILY_BACKGROUNDS } from './data/dilemmasData';
import { COSMETICS_CATALOG } from './data/cosmeticsData';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { AvatarCreatorModal } from './components/AvatarCreatorModal';
import { DilemmaModal } from './components/DilemmaModal';
import { BranchingPathwayModal } from './components/BranchingPathwayModal';
import { LifeAlbumModal } from './components/LifeAlbumModal';
import { ContinuousTransitionView } from './components/ContinuousTransitionView';
import { LifeStageIntroBanner } from './components/LifeStageIntroBanner';
import { InitialSceneSelectorModal } from './components/InitialSceneSelectorModal';
import { VolunteerInfoModal } from './components/VolunteerInfoModal';
import { LaptopWarningModal } from './components/LaptopWarningModal';
import { AntiDrugBoothModal } from './components/AntiDrugBoothModal';
import { KKHHospitalModal } from './components/KKHHospitalModal';
import { 
  BusType, 
  NegativeTransitionalEvent, 
  TransitionalScenery 
} from './types';
import { WardrobeModal } from './components/WardrobeModal';
import { soundEngine } from './utils/audio';

const STORAGE_KEY_RESILIENCE = 'sg_life_resilience_pts';
const STORAGE_KEY_COSMETICS = 'sg_life_unlocked_cosmetics';

export default function App() {
  // Game Initialization
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<AvatarConfig>({
    name: 'Jun Wei',
    gender: 'boy',
    hairStyle: 1,
    hairColor: '#2b2320',
    shirtColor: '#ffffff',
    pantsColor: '#1e3a8a',
    equippedHairId: 'hair_side_part',
    equippedOutfitId: 'outfit_pri_uniform',
    equippedAccessoryId: 'acc_backpack',
    equippedAuraId: 'aura_none'
  });
  const [familyBackground, setFamilyBackground] = useState<FamilyBackground>(FAMILY_BACKGROUNDS[0]);

  // Sequential Stage Progression & Milestones (No Day / Clock Limits)
  const [stage, setStage] = useState<LifeStageKey>('primary');
  const [postSecondaryPath, setPostSecondaryPath] = useState<PostSecondaryPath>(null);
  const [stageMilestones, setStageMilestones] = useState<number>(0);
  const [stageCompleted, setStageCompleted] = useState<boolean>(false);
  const REQUIRED_STAGE_MILESTONES = 4;

  // Core 5 Stats
  const [stats, setStats] = useState<PlayerStats>({
    health: 100,
    academics: 70,
    social: 70,
    resilience: 70,
    energy: 85,
    hunger: 85,
    mentalHealth: 80
  });

  // Substance encounter tracking
  const [substanceAcceptedCount, setSubstanceAcceptedCount] = useState<number>(0);
  const [substanceResistedCount, setSubstanceResistedCount] = useState<number>(0);
  const [completedDilemmaIds, setCompletedDilemmaIds] = useState<string[]>([]);

  // Persisted Cosmetics & Economy
  const [resiliencePoints, setResiliencePoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESILIENCE);
      return saved ? parseInt(saved, 10) : 50;
    } catch {
      return 50;
    }
  });

  const [unlockedCosmeticIds, setUnlockedCosmeticIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COSMETICS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // World Navigation & Canvas Player State
  const [currentRoomId, setCurrentRoomId] = useState<string>('school');
  const [playerX, setPlayerX] = useState<number>(220);
  const [playerFacing, setPlayerFacing] = useState<'left' | 'right'>('right');
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const moveDirectionRef = useRef<'left' | 'right' | null>(null);

  // Continuous Auto-Walking Transition State (Life is a Game engine)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionDestination, setTransitionDestination] = useState<string>('Primary School');
  const [transitionTargetRoomId, setTransitionTargetRoomId] = useState<string>('school');
  const [transitionScenery, setTransitionScenery] = useState<TransitionalScenery>('hdb_void_deck');
  const [transitionBusType, setTransitionBusType] = useState<BusType | null>(null);
  const [activeNegativeEvent, setActiveNegativeEvent] = useState<NegativeTransitionalEvent | null>(null);

  // Overlays & Modals
  const [activeDilemma, setActiveDilemma] = useState<DilemmaScenario | null>(null);
  const [showPathwayChoice, setShowPathwayChoice] = useState<boolean>(false);
  const [activeEnding, setActiveEnding] = useState<EndingType | null>(null);
  const [showWardrobe, setShowWardrobe] = useState<boolean>(false);
  const [showAntiDrugBooth, setShowAntiDrugBooth] = useState<boolean>(false);
  const [showLaptopModal, setShowLaptopModal] = useState<boolean>(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState<boolean>(false);
  const [showStageIntro, setShowStageIntro] = useState<boolean>(false);
  const [showSceneSelector, setShowSceneSelector] = useState<boolean>(false);
  const [isRecoveryBufferActive, setIsRecoveryBufferActive] = useState<boolean>(false);
  const [recoveryBufferRemaining, setRecoveryBufferRemaining] = useState<number>(0);
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);
  const [collapseStage, setCollapseStage] = useState<number>(0);
  const [showKKHModal, setShowKKHModal] = useState<boolean>(false);
  const [interactionCounts, setInteractionCounts] = useState<Record<string, number>>({});
  const [notification, setNotification] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());

  // Room lookup
  const currentRoom = GAME_ROOMS.find(r => r.id === currentRoomId) || GAME_ROOMS[0];

  // Nearest interactable calculation
  const nearestObject = currentRoom.objects.find(obj => {
    const objCenterX = obj.x + obj.w / 2;
    return Math.abs(playerX - objCenterX) < 60;
  }) || null;

  // Persist economy changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESILIENCE, resiliencePoints.toString());
    } catch {
      // Ignore
    }
  }, [resiliencePoints]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COSMETICS, JSON.stringify(unlockedCosmeticIds));
    } catch {
      // Ignore
    }
  }, [unlockedCosmeticIds]);

  // Acute Collapse Trigger Sequence (Requirement 4.1)
  const triggerEmergencyCollapse = useCallback(() => {
    if (isCollapsing || isTransitioning || showKKHModal) return;

    moveDirectionRef.current = null;
    setIsMoving(false);
    setIsCollapsing(true);
    setCollapseStage(0);
    soundEngine.playHeartbeatTinnitus();

    // Stage 0: Staggering dizzy wobbling (1.2s)
    setTimeout(() => {
      setCollapseStage(1);
      // Stage 1: Falling to knees & clutching chest (1.5s)
      setTimeout(() => {
        setCollapseStage(2);
        // Stage 2: Prone on ground (1.5s)
        setTimeout(() => {
          // Transition directly to SCDF Emergency Ambulance cinematic
          setIsCollapsing(false);
          setCollapseStage(0);
          setTransitionScenery('scenic_commute');
          setActiveNegativeEvent('hospital_emergency');
          setTransitionDestination('KKH Emergency Resuscitation Ward');
          setTransitionTargetRoomId('hospital_ward');
          setIsTransitioning(true);
        }, 1500);
      }, 1500);
    }, 1200);
  }, [isCollapsing, isTransitioning, showKKHModal]);

  // Stat Multiplier Buffer Handler (Requirement 5.1 & 5.2)
  const applyStatChangeWithBuffer = useCallback((changes: Partial<PlayerStats>, reason?: string) => {
    const isBuffActive = isRecoveryBufferActive && recoveryBufferRemaining > 0;
    const mult = isBuffActive ? 1.8 : 1.0;

    let hasPositive = false;
    const newChanges: Partial<PlayerStats> = {};

    for (const [key, val] of Object.entries(changes) as [keyof PlayerStats, number][]) {
      if (typeof val === 'number') {
        if (val > 0) {
          hasPositive = true;
          newChanges[key] = Math.round(val * mult);
        } else {
          newChanges[key] = val;
        }
      }
    }

    setStats(prev => {
      const updated = { ...prev };
      for (const [k, v] of Object.entries(newChanges) as [keyof PlayerStats, number][]) {
        if (typeof v === 'number') {
          const current = (updated[k] as number) ?? 50;
          updated[k] = Math.max(0, Math.min(100, current + v));
        }
      }
      return updated;
    });

    if (isBuffActive && hasPositive) {
      setRecoveryBufferRemaining(r => {
        const next = r - 1;
        if (next <= 0) {
          setIsRecoveryBufferActive(false);
          showToast('Recovery Buffer fulfilled! Your rehabilitation was successful.');
          return 0;
        } else {
          showToast(`Recovery Buffer (1.8x applied): ${next} boosted action${next > 1 ? 's' : ''} remaining.`);
          return next;
        }
      });
    } else if (reason) {
      showToast(reason);
    }
  }, [isRecoveryBufferActive, recoveryBufferRemaining]);

  // KKH Hospital Discharge and Recovery Buffer Activation (Requirement 4.3 & 5.1)
  const handleDischargeKKH = useCallback(() => {
    soundEngine.playResistSuccess();
    setShowKKHModal(false);

    // Apply discharge penalties & stabilised health
    setStats(prev => ({
      ...prev,
      health: 50, // Health resets to 50% (stabilised)
      energy: Math.max(15, prev.energy - 35), // Energy drops by -35
      academics: Math.max(10, prev.academics - 25), // Academics drops by -25
      social: Math.max(10, prev.social - 20), // Social drops by -20
      mentalHealth: Math.max(20, (prev.mentalHealth ?? 75) - 20)
    }));

    // Activate Recovery Buffer (1.8x multiplier for next 4 positive actions)
    setIsRecoveryBufferActive(true);
    setRecoveryBufferRemaining(4);

    // Safely return to HDB Void deck to rest & recuperate
    setCurrentRoomId('voiddeck');
    setPlayerX(160);

    showToast('Discharged from KKH! Recovery Buffer activated: Next 4 positive actions receive 1.8x stat boost!');
  }, []);

  // Check critical health or ending conditions
  useEffect(() => {
    if (!hasStarted) return;

    if (stats.health <= 0) {
      setActiveEnding('overdose');
      return;
    }

    if (stats.health <= 10 && !isCollapsing && !isTransitioning && !showKKHModal) {
      triggerEmergencyCollapse();
      return;
    }

    if (stats.resilience <= 12 && substanceAcceptedCount >= 2) {
      setActiveEnding('jail');
      return;
    }
  }, [stats.health, stats.resilience, substanceAcceptedCount, hasStarted, isCollapsing, isTransitioning, showKKHModal, triggerEmergencyCollapse]);

  // Notification toaster timer
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  // Keyboard Movement Loop (Strictly decoupled from transition timers)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasStarted || isTransitioning || activeDilemma || showPathwayChoice || activeEnding || showWardrobe || showStageIntro || showSceneSelector || isCollapsing || showKKHModal) {
        return;
      }

      if (e.key === 'a' || e.key === 'ArrowLeft') {
        moveDirectionRef.current = 'left';
        setPlayerFacing('left');
        setIsMoving(true);
      } else if (e.key === 'd' || e.key === 'ArrowRight') {
        moveDirectionRef.current = 'right';
        setPlayerFacing('right');
        setIsMoving(true);
      } else if (e.key === 'e' || e.key === ' ') {
        e.preventDefault();
        if (nearestObject) {
          handleObjectInteract(nearestObject);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isTransitioning) {
        moveDirectionRef.current = null;
        setIsMoving(false);
        return;
      }
      if (e.key === 'a' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'ArrowRight') {
        moveDirectionRef.current = null;
        setIsMoving(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [hasStarted, isTransitioning, nearestObject, activeDilemma, showPathwayChoice, activeEnding, showWardrobe, showStageIntro, showSceneSelector, isCollapsing, showKKHModal]);

  // Movement physics tick (Decoupled from transition timer countdown)
  useEffect(() => {
    const timer = setInterval(() => {
      if (isTransitioning) {
        moveDirectionRef.current = null;
        setIsMoving(false);
        return;
      }
      if (moveDirectionRef.current === 'left') {
        setPlayerX(x => Math.max(60, x - 7));
      } else if (moveDirectionRef.current === 'right') {
        setPlayerX(x => {
          const nextX = x + 7;
          if (nextX >= 735 && !isTransitioning) {
            moveDirectionRef.current = null;
            setIsMoving(false);
            setTimeout(() => {
              handleContinueJourney();
            }, 10);
            return 725;
          }
          return Math.min(740, nextX);
        });
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isTransitioning, stage, stageMilestones, stageCompleted, currentRoomId, postSecondaryPath]);

  // Milestone Progress Recorder (Repeated positive interactions complete each stage)
  const recordMilestoneInteraction = useCallback((actionName: string, milestoneName: string) => {
    setStageMilestones(prev => {
      if (prev >= REQUIRED_STAGE_MILESTONES) return prev;
      const nextCount = prev + 1;
      if (nextCount >= REQUIRED_STAGE_MILESTONES) {
        setStageCompleted(true);
        soundEngine.playLevelUp();
        if (stage === 'primary') {
          showToast(`🎉 Primary School Milestones Completed (${nextCount}/${REQUIRED_STAGE_MILESTONES})! Proceed right to enter your PSLE Celebration!`);
        } else if (stage === 'secondary') {
          showToast(`🎉 Secondary School Milestones Completed (${nextCount}/${REQUIRED_STAGE_MILESTONES})! Proceed right to collect your O-Level Results!`);
        } else if (stage === 'tertiary') {
          showToast(`🎓 Tertiary Education Milestones Completed (${nextCount}/${REQUIRED_STAGE_MILESTONES})! Proceed right to enter Young Adulthood & Career!`);
        } else if (stage === 'adult') {
          showToast(`💼 Young Adulthood Milestones Completed (${nextCount}/${REQUIRED_STAGE_MILESTONES})! Proceed right to view your Lifetime Retrospective!`);
        }
      } else {
        showToast(`Milestone recorded: ${milestoneName} (${nextCount}/${REQUIRED_STAGE_MILESTONES})`);
      }
      return nextCount;
    });
  }, [stage, REQUIRED_STAGE_MILESTONES]);

  // Stage-Specific Unique Scene Resolver (Strictly non-repeating across life stages)
  const getStageRooms = useCallback((targetStage: LifeStageKey) => {
    switch (targetStage) {
      case 'primary':
        return GAME_ROOMS.filter(r => 
          ['school', 'mamashop', 'voiddeck', 'bedroom', 'barbershop'].includes(r.id) ||
          (r.id === 'psle_celebration' && (stageCompleted || currentRoomId === 'psle_celebration'))
        );
      case 'secondary':
        return GAME_ROOMS.filter(r => 
          ['secondaryschool', 'hawker', 'pasarmalam', 'nationalstadium', 'singaporezoo', 'universalstudios'].includes(r.id) ||
          (r.id === 'olevel_plaza' && (stageCompleted || currentRoomId === 'olevel_plaza'))
        );
      case 'tertiary': {
        const myPathRoom = postSecondaryPath === 'Junior College (JC)'
          ? 'juniorcollege'
          : postSecondaryPath === 'Polytechnic'
          ? 'polytechnic'
          : 'itecollege';
        return GAME_ROOMS.filter(r => 
          [myPathRoom, 'student_cafe', 'orchard', 'gardensbythebay', 'mrt', 'seaaquarium'].includes(r.id)
        );
      }
      case 'adult':
        return GAME_ROOMS.filter(r => 
          ['clarkequay', 'marinabaysands', 'merlion', 'f1circuit', 'chinatown', 'changiairport', 'sentosabeach', 'chijmes'].includes(r.id)
        );
    }
  }, [stageCompleted, currentRoomId, postSecondaryPath]);

  const evaluateLifetimeEnding = useCallback(() => {
    if (stats.health < 35) {
      setActiveEnding('overdose');
    } else if (substanceAcceptedCount >= 2 || stats.resilience < 45) {
      setActiveEnding('jail');
    } else if (substanceAcceptedCount === 1) {
      setActiveEnding('rehab');
    } else {
      // True Good Ending!
      setActiveEnding('thriving');
      // Unlock exclusive ending cosmetics
      setUnlockedCosmeticIds(prev => [
        ...new Set([...prev, 'hair_gold_halo', 'outfit_grad_gown', 'aura_gold_halo'])
      ]);
    }
  }, [stats.health, stats.resilience, substanceAcceptedCount]);

  // Object Interactions
  const handleObjectInteract = (obj: InteractableObject) => {
    soundEngine.playSelect();

    // Check if a dilemma should trigger here
    const availableDilemma = DILEMMA_SCENARIOS.find(
      d => d.room === currentRoom.id && !completedDilemmaIds.includes(d.id) && d.stageRequired === stage
    );

    if (availableDilemma && (obj.action === 'dilemma_check' || Math.random() < 0.5)) {
      soundEngine.playWarning();
      setActiveDilemma(availableDilemma);
      return;
    }

    if (obj.action !== 'wardrobe') {
      recordMilestoneInteraction(obj.action, obj.label);
    }

    switch (obj.action) {
      case 'study':
      case 'study_school':
        soundEngine.playStudyChime();
        setStats(s => ({
          ...s,
          academics: Math.min(100, s.academics + 8),
          resilience: Math.min(100, s.resilience + 3),
          hunger: Math.max(10, s.hunger - 10)
        }));
        showToast('You revised Ten-Year Series practice papers! Academics +8, Resilience +3');
        break;

      case 'sleep':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          energy: 100,
          hunger: Math.min(100, s.hunger + 15),
          health: Math.min(100, s.health + 4),
          mentalHealth: Math.min(100, (s.mentalHealth ?? 75) + 6)
        }));
        showToast('Restful, peaceful sleep in your bedroom! Energy fully restored to 100%.');
        break;

      case 'eat_home':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: 100,
          health: Math.min(100, s.health + 3),
          social: Math.min(100, s.social + 4)
        }));
        showToast('Enjoyed warm homecooked ABC Soup and steamed fish with family! Energy +100%');
        break;

      case 'wardrobe':
        setShowWardrobe(true);
        break;

      case 'pet_cat': {
        const catKey = `${stage}_pet_cat`;
        const catCount = interactionCounts[catKey] || 0;
        if (catCount >= 3) {
          showToast('The community ginger cat is taking a peaceful catnap now! Come back in your next life stage.');
          break;
        }
        setInteractionCounts(prev => ({ ...prev, [catKey]: catCount + 1 }));
        soundEngine.playResistSuccess();
        setStats(s => ({
          ...s,
          social: Math.min(100, s.social + 5),
          resilience: Math.min(100, s.resilience + 2)
        }));
        showToast(`The HDB ginger cat purred happily in your lap! Social +5, Resilience +2 (${catCount + 1}/3 this stage)`);
        break;
      }

      case 'talk_voiddeck_uncle': {
        const uncleKey = `${stage}_voiddeck_uncle`;
        const uncleCount = interactionCounts[uncleKey] || 0;
        if (uncleCount >= 3) {
          showToast('Uncle is peacefully reading the newspaper and sipping his Teh-C: "Remember what Uncle said, okay? Stay clean and study hard!"');
          break;
        }
        setInteractionCounts(prev => ({ ...prev, [uncleKey]: uncleCount + 1 }));
        soundEngine.playResistSuccess();
        setStats(s => ({
          ...s,
          social: Math.min(100, s.social + 6),
          resilience: Math.min(100, s.resilience + 8)
        }));
        const uncleWisdom = [
          'Uncle smiles: "Ah boy/Ah girl, in our kampung days, got hardship we help each other, never touch drugs or vices. True courage is standing firm for your family!" (+Social, +Resilience)',
          'Uncle sips his glass kopi: "Life has sweet and bitter moments, just like kopi. Don\'t seek fake short-term highs that ruin your future. Keep your path straight!" (+Social, +Resilience)',
          'Uncle pats your shoulder: "Look out for your peers. If anyone passes you funny vaporisers or pills, walk away immediately. Steady pom pi pi!" (+Social, +Resilience)'
        ];
        showToast(uncleWisdom[uncleCount % uncleWisdom.length]);
        break;
      }

      case 'play_sports': {
        const sportsKey = `${stage}_play_sports`;
        const sportsCount = interactionCounts[sportsKey] || 0;
        if (sportsCount >= 3) {
          showToast('You are breathless from running and swinging! Give other neighbourhood youths a turn.');
          break;
        }
        setInteractionCounts(prev => ({ ...prev, [sportsKey]: sportsCount + 1 }));
        soundEngine.playResistSuccess();
        setStats(s => ({
          ...s,
          health: Math.min(100, s.health + 4),
          resilience: Math.min(100, s.resilience + 5),
          social: Math.min(100, s.social + 6),
          hunger: Math.max(10, s.hunger - 15)
        }));
        showToast(`Played actively at the playground! Fitness and camaraderie boosted. (${sportsCount + 1}/3 this stage)`);
        break;
      }

      case 'walk_lantern_arch':
        soundEngine.playSelect();
        setStats(s => ({
          ...s,
          social: Math.min(100, s.social + 4),
          resilience: Math.min(100, s.resilience + 4)
        }));
        showToast('Strolled under the glowing Chinatown red lantern arches! The rich cultural heritage uplifts your spirits.');
        break;

      case 'drink_oolong_tea':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: Math.min(100, s.hunger + 15),
          health: Math.min(100, s.health + 5),
          resilience: Math.min(100, s.resilience + 6)
        }));
        showToast('Enjoyed fragrant Tie Guan Yin Oolong tea with warm lotus buns at the traditional teahouse.');
        break;

      case 'walk_suspension_bridge':
        soundEngine.playSelect();
        setStats(s => ({
          ...s,
          health: Math.min(100, s.health + 4),
          resilience: Math.min(100, s.resilience + 5)
        }));
        showToast('Crossed the Palawan timber suspension bridge to the Southernmost Point of Continental Asia! Crisp sea breeze.');
        break;

      case 'drink_coconut_water':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: Math.min(100, s.hunger + 25),
          health: Math.min(100, s.health + 6)
        }));
        showToast('Sipped chilled, refreshing fresh coconut water straight from the husk by the beach!');
        break;

      case 'eat_icecream':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: Math.min(100, s.hunger + 25),
          social: Math.min(100, s.social + 4)
        }));
        showToast('Traditional rainbow bread with peppermint chocolate wafer ice cream! Super sedap.');
        break;

      case 'anti_drug_pledge':
      case 'open_antidrug_booth':
      case 'sec_peer_pledge':
      case 'jc_anti_drug_pledge':
        setShowAntiDrugBooth(true);
        break;

      case 'open_laptop_warning':
        setShowLaptopModal(true);
        break;

      case 'open_volunteer_modal':
        setShowVolunteerModal(true);
        break;

      case 'eat_chicken_rice':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: 100,
          health: Math.min(100, s.health + 2),
          social: Math.min(100, s.social + 3)
        }));
        showToast('Steaming Hainanese fragrant chicken rice with spicy chilli garlic dip! Delicious.');
        break;

      case 'eat_satay':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: Math.min(100, s.hunger + 35),
          social: Math.min(100, s.social + 5)
        }));
        showToast('Munching juicy charcoal satay sticks with warm peanut pineapple gravy.');
        break;

      case 'topup_ezlink':
      case 'tap_card':
        soundEngine.playLevelUp();
        applyStatChangeWithBuffer({
          resilience: 8,
          academics: 5,
          social: 4
        }, 'Topped up SimplyGo EZ-Link card at the transit ticketing kiosk! Concession balance ready for commute.');
        break;

      case 'eat_durian':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: Math.min(100, s.hunger + 40),
          resilience: Math.min(100, s.resilience + 4)
        }));
        showToast('Creamy bitter-sweet Mao Shan Wang durian! The King of Fruits restores your vigour.');
        break;

      case 'eat_ramly':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: 100,
          social: Math.min(100, s.social + 6)
        }));
        showToast('Hot sizzling Ramly burger with egg wrap and special seasoning! Pasar malam favourite.');
        break;

      case 'eat_tutu':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: Math.min(100, s.hunger + 30),
          social: Math.min(100, s.social + 4)
        }));
        showToast('Fluffy, piping hot steamed Tutu Kueh filled with sweet grated coconut.');
        break;

      case 'read_cnb_screen':
        soundEngine.playResistSuccess();
        setStats(s => ({
          ...s,
          resilience: Math.min(100, s.resilience + 8),
          academics: Math.min(100, s.academics + 4)
        }));
        showToast('Read CNB facts: Singapore zero-tolerance policy protects lives! Call 1800-600-0000.');
        break;

      case 'enjoy_music':
        soundEngine.playResistSuccess();
        setStats(s => ({
          ...s,
          social: Math.min(100, s.social + 8),
          resilience: Math.min(100, s.resilience + 4)
        }));
        showToast('Listened to talented local acoustic buskers by the Singapore River! Wholesome vibes.');
        break;

      case 'skate_trick':
        soundEngine.playResistSuccess();
        setStats(s => ({
          ...s,
          resilience: Math.min(100, s.resilience + 7),
          social: Math.min(100, s.social + 6),
          hunger: Math.max(10, s.hunger - 15)
        }));
        showToast('Landed a clean kickflip at *SCAPE skate park! The crowd gave you props.');
        break;

      case 'buy_boba':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: Math.min(100, s.hunger + 30),
          social: Math.min(100, s.social + 6)
        }));
        showToast('Brown sugar fresh milk with warm boba pearls! Shared with close classmates.');
        break;

      case 'haircut':
        soundEngine.playResistSuccess();
        setStats(s => ({
          ...s,
          academics: Math.min(100, s.academics + 5),
          resilience: Math.min(100, s.resilience + 4),
          social: Math.min(100, s.social + 4)
        }));
        showToast('Neat traditional school haircut from the barber uncle! Looking sharp & disciplined.');
        break;

      case 'chat_barber_uncle':
        soundEngine.playResistSuccess();
        setStats(s => ({
          ...s,
          resilience: Math.min(100, s.resilience + 6),
          social: Math.min(100, s.social + 5)
        }));
        showToast('The uncle shared wise life advice over the newspaper: "Focus on your goals, avoid bad company!"');
        break;

      case 'buy_vending_drink':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: Math.min(100, s.hunger + 25),
          social: Math.min(100, s.social + 3)
        }));
        showToast('Clink! An ice-cold drink dropped from the vintage vending machine under the rain tree.');
        break;

      case 'study_jc':
        soundEngine.playStudyChime();
        applyStatChangeWithBuffer({
          academics: 10,
          resilience: 4
        }, 'Studied rigorous A-Level H2 Chemistry & Economics notes on the grand staircase! Academics +10');
        break;

      case 'study_poly':
        soundEngine.playStudyChime();
        applyStatChangeWithBuffer({
          academics: 10,
          social: 6,
          mentalHealth: 6
        }, 'Collaborated on industry capstone project & digital design at Poly! Academics +10, Social +6');
        break;

      case 'study_ite':
        soundEngine.playStudyChime();
        applyStatChangeWithBuffer({
          academics: 10,
          resilience: 6,
          health: 4
        }, 'Mastered technical mechatronics drill in ITE workshop! Academics +10, Resilience +6');
        break;

      case 'buy_milo':
        soundEngine.playEatMeal();
        applyStatChangeWithBuffer({ hunger: 20, health: 5, energy: 15 }, 'Chilled Yeo\'s Chrysanthemum Tea & Milo Dinosaur! Refreshing local drink.');
        break;

      case 'buy_snacks':
        soundEngine.playEatMeal();
        applyStatChangeWithBuffer({ hunger: 25, energy: 10, social: 5 }, 'Crunchy prawn keropok and sweet iced gem biscuits! Childhood happiness.');
        break;

      case 'chat_uncle':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ resilience: 8, social: 6, mentalHealth: 8 }, 'Mama shop uncle shared advice: "Steady pom pi pi! Focus on good CCA and avoid dodgy friends!"');
        break;

      case 'discuss_peer':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({
          social: 6,
          academics: 6
        }, 'Discussed Project Work and General Paper essays with driven peers along the red railings.');
        break;

      case 'jc_anti_drug_pledge':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({
          resilience: 8,
          academics: 5
        }, 'Signed the Junior College Drug-Free Youth Ambassador charter! Resilience +8');
        break;

      case 'read_psle_posting':
        soundEngine.playLevelUp();
        setStats(s => ({
          ...s,
          academics: Math.min(100, s.academics + 10),
          resilience: Math.min(100, s.resilience + 10),
          mentalHealth: Math.min(100, (s.mentalHealth ?? 75) + 10)
        }));
        showToast('You checked your PSLE posting slip! Good conduct and steadfast discipline recognized.');
        break;

      case 'eat_psle_feast':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: 100,
          energy: 100,
          social: Math.min(100, s.social + 10),
          mentalHealth: Math.min(100, (s.mentalHealth ?? 75) + 10)
        }));
        showToast('Shared warm celebratory feast and halal curry puffs with family & neighbours!');
        break;

      case 'talk_psle_icecream':
        soundEngine.playEatMeal();
        setStats(s => ({
          ...s,
          hunger: Math.min(100, s.hunger + 25),
          social: Math.min(100, s.social + 6),
          mentalHealth: Math.min(100, (s.mentalHealth ?? 75) + 8)
        }));
        showToast('Uncle gives you a celebratory rainbow bread ice cream wafer! "Good job! Be upright in Secondary School!"');
        break;

      case 'proceed_to_secondary':
        handleContinueJourney();
        break;

      case 'collect_olevel_results':
        soundEngine.playLevelUp();
        setStats(s => ({
          ...s,
          academics: Math.min(100, s.academics + 12),
          resilience: Math.min(100, s.resilience + 12),
          mentalHealth: Math.min(100, (s.mentalHealth ?? 75) + 12)
        }));
        showToast('Collected national O-Level / N-Level examination certificate with distinction honours!');
        break;

      case 'talk_ecg_counsellor':
        soundEngine.playStudyChime();
        setStats(s => ({
          ...s,
          academics: Math.min(100, s.academics + 8),
          resilience: Math.min(100, s.resilience + 8)
        }));
        showToast('ECG Counsellor: "Whichever tertiary pathway you choose—JC, Poly, or ITE—staying drug-free unlocks your fullest potential!"');
        break;

      case 'celebrate_peers':
        soundEngine.playResistSuccess();
        setStats(s => ({
          ...s,
          social: Math.min(100, s.social + 15),
          mentalHealth: Math.min(100, (s.mentalHealth ?? 75) + 12)
        }));
        showToast('Celebrated at the O-Level memory wall! Signed graduation uniforms with lifelong friends.');
        break;

      case 'open_pathway_selection':
        handleContinueJourney();
        break;

      // Adulthood & Career Interactive Stations
      case 'eat_prata':
        soundEngine.playEatMeal();
        applyStatChangeWithBuffer({ hunger: 30, social: 8, energy: 20 }, 'Crispy Roti Prata with dhal and iced Milo Dinosaur by the river!');
        recordMilestoneInteraction('Supper Prata', 'Enjoyed late-night supper with trustworthy friends cleanly');
        break;

      case 'sign_pledge':
      case 'anti_drug_pledge':
        soundEngine.playLevelUp();
        applyStatChangeWithBuffer({ resilience: 15, social: 10, mentalHealth: 10 }, 'Signed the National Anti-Drug Youth & Community Pledge at Merlion Park!');
        recordMilestoneInteraction('Signed Anti-Drug Pledge', 'Signed the National Anti-Drug Youth & Community Pledge');
        break;

      case 'view_merlion':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ resilience: 8, mentalHealth: 10 }, 'Looked out over Marina Bay and the iconic Merlion. Grateful for peace and clear health.');
        recordMilestoneInteraction('Marina Bay Vista', 'Reflected on personal growth and healthy lifestyle at Merlion Park');
        break;

      case 'read_history':
        soundEngine.playStudyChime();
        applyStatChangeWithBuffer({ academics: 8, resilience: 6 }, 'Read the Singapore River historic maritime milestone plaques.');
        recordMilestoneInteraction('Heritage Knowledge', 'Appreciated Singapore founding heritage and resilience');
        break;

      case 'walk_gardens':
      case 'view_city':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ resilience: 8, mentalHealth: 10, social: 6 }, 'Enjoyed panoramic 360-degree views of Singapore skyline from Marina Bay Sands!');
        recordMilestoneInteraction('Skyline Reflection', 'Took in the city skyline with clarity and sober wonder');
        break;

      case 'watch_light_show':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ social: 10, mentalHealth: 10, resilience: 6 }, 'Watched Spectra outdoor light, water and orchestral symphony show with loved ones!');
        recordMilestoneInteraction('Spectra Show', 'Shared awe-inspiring music and light show experience cleanly');
        break;

      case 'sim_race':
      case 'visit_pitlane':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ resilience: 10, academics: 8, health: 6 }, 'Navigated Singapore F1 Night Race street circuit simulator with razor reflexes!');
        recordMilestoneInteraction('F1 Sim Precision', 'Showcased sharp motor reflexes and peak cognitive focus');
        break;

      case 'explore_heritage':
      case 'consult_herbalist':
        soundEngine.playStudyChime();
        applyStatChangeWithBuffer({ academics: 8, resilience: 8, health: 6 }, 'Immersed in Chinatown heritage and traditional wellness holistic medicine!');
        recordMilestoneInteraction('Chinatown Heritage', 'Cherished cultural roots and natural holistic wellbeing');
        break;

      case 'drink_tea':
        soundEngine.playEatMeal();
        applyStatChangeWithBuffer({ hunger: 15, mentalHealth: 10, health: 6 }, 'Sipped fragrant Tie Guan Yin Oolong tea at historic Chinatown tea house.');
        recordMilestoneInteraction('Mindful Tea', 'Practiced grounding mindfulness and traditional tea appreciation');
        break;

      case 'watch_vortex':
      case 'stroll_canopy':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ mentalHealth: 10, resilience: 8 }, 'Strolled around the Jewel Rain Vortex beneath the lush indoor forest canopy.');
        recordMilestoneInteraction('Jewel Nature Walk', 'Reflected on Singapore sustainable architecture and greenery');
        break;

      case 'visit_border_booth':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ resilience: 12, academics: 8 }, 'Learned about Singapore border narcotics vigilance at Changi Airport Jewel!');
        recordMilestoneInteraction('Border Vigilance', 'Supported border security and preventive narcotics awareness');
        break;

      case 'play_volleyball':
      case 'walk_coast':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ health: 12, social: 10, resilience: 8 }, 'Active physical exercise under the Sentosa Palawan Beach sunshine!');
        recordMilestoneInteraction('Beach Sports', 'Channeled physical energy into sports and coastal vitality');
        break;

      case 'drink_shake':
        soundEngine.playEatMeal();
        applyStatChangeWithBuffer({ hunger: 25, energy: 20, mentalHealth: 8 }, 'Sipped refreshing cold coconut shake with coconut flesh by the beach!');
        recordMilestoneInteraction('Fresh Coconut Shake', 'Refreshed with natural, healthy tropical drinks');
        break;

      case 'chapel_mindfulness':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ mentalHealth: 12, resilience: 10 }, 'Grounding mindfulness and peaceful reflection in CHIJMES historic courtyard.');
        recordMilestoneInteraction('CHIJMES Mindfulness', 'Practiced grounding mindfulness and inner peace');
        break;

      case 'listen_open_mic':
        soundEngine.playResistSuccess();
        applyStatChangeWithBuffer({ social: 10, mentalHealth: 8 }, 'Listened to youth acoustic songwriters performing under fairy lights.');
        recordMilestoneInteraction('Acoustic Open Mic', 'Supported local youth arts and live acoustic music');
        break;

      case 'eat_gelato':
        soundEngine.playEatMeal();
        applyStatChangeWithBuffer({ hunger: 20, social: 8, mentalHealth: 8 }, 'Enjoyed handcrafted pistachio and dark chocolate gelato with friends!');
        recordMilestoneInteraction('Artisan Gelato', 'Shared sweet moments with good friends cleanly');
        break;

      default:
        showToast(`You interacted with ${obj.label}.`);
        break;
    }
  };

  // Dilemma Choice Handler (With Recovery Buffer 1.8x Multiplier & Collapse Trigger)
  const handleDilemmaChoice = (opt: DilemmaOption) => {
    if (!activeDilemma) return;

    setCompletedDilemmaIds(prev => [...prev, activeDilemma.id]);

    if (opt.type === 'accept') {
      setSubstanceAcceptedCount(c => c + 1);
      soundEngine.playDrugAcceptDamage();
    } else {
      setSubstanceResistedCount(c => c + 1);
      soundEngine.playResistSuccess();
      recordMilestoneInteraction(opt.text, 'Resisted Peer Pressure & Substance Temptation');
    }

    const isBuffActive = isRecoveryBufferActive && recoveryBufferRemaining > 0;
    const mult = isBuffActive ? 1.8 : 1.0;

    // Positive gains are multiplied by 1.8 if recovery buffer is active!
    const healthChange = opt.healthChange > 0 ? Math.round(opt.healthChange * mult) : opt.healthChange;
    const acadChange = opt.acadChange > 0 ? Math.round(opt.acadChange * mult) : opt.acadChange;
    const socialChange = opt.socialChange > 0 ? Math.round(opt.socialChange * mult) : opt.socialChange;
    const resilienceChange = opt.resilienceChange > 0 ? Math.round(opt.resilienceChange * mult) : opt.resilienceChange;

    const nextHealth = Math.max(0, Math.min(100, stats.health + healthChange));

    setStats(s => ({
      health: nextHealth,
      academics: Math.max(0, Math.min(100, s.academics + acadChange)),
      social: Math.max(0, Math.min(100, s.social + socialChange)),
      resilience: Math.max(0, Math.min(100, s.resilience + resilienceChange)),
      energy: Math.max(0, Math.min(100, s.energy + (opt.hungerChange ?? 0))),
      hunger: Math.max(0, Math.min(100, s.hunger + (opt.hungerChange ?? 0))),
      mentalHealth: Math.max(0, Math.min(100, (s.mentalHealth ?? 75) + (opt.type === 'accept' ? -25 : Math.round(8 * mult))))
    }));

    if (opt.type !== 'accept' && isBuffActive && (healthChange > 0 || acadChange > 0 || socialChange > 0 || resilienceChange > 0)) {
      setRecoveryBufferRemaining(r => {
        const next = r - 1;
        if (next <= 0) {
          setIsRecoveryBufferActive(false);
          showToast('Recovery Buffer fulfilled! Your rehabilitation was successful.');
          return 0;
        } else {
          showToast(`Recovery Buffer (1.8x applied): ${next} boosted action${next > 1 ? 's' : ''} remaining.`);
          return next;
        }
      });
    }

    setActiveDilemma(null);

    // If accept caused a severe drop or health <= 25, trigger emergency collapse sequence!
    if (opt.type === 'accept' && (nextHealth <= 25 || opt.healthChange <= -35)) {
      setTimeout(() => {
        triggerEmergencyCollapse();
      }, 400);
    }
  };

  // Continuous Journey Stages & Scenery Pipeline (Life is a Game dynamic engine)
  const JOURNEY_STAGES: Array<{
    roomId: string;
    stage: LifeStageKey;
    label: string;
    scenery: TransitionalScenery;
    busType?: BusType;
  }> = [
    { roomId: 'school', stage: 'primary', label: 'Primary School Concourse & Library', scenery: 'hdb_void_deck' },
    { roomId: 'mamashop', stage: 'primary', label: 'Traditional HDB Mama Shop', scenery: 'chinatown' },
    { roomId: 'secondaryschool', stage: 'secondary', label: 'Secondary School Campus & Track', scenery: 'bus_stop', busType: 'sbs_green' },
    { roomId: 'hawker', stage: 'secondary', label: 'Old Airport Road Hawker Centre', scenery: 'little_india' },
    { roomId: 'juniorcollege', stage: 'tertiary', label: 'Junior College Grand Concourse', scenery: 'mrt_station' },
    { roomId: 'polytechnic', stage: 'tertiary', label: 'Polytechnic Design & Media Atrium', scenery: 'scenic_commute' },
    { roomId: 'itecollege', stage: 'tertiary', label: 'ITE College Engineering Workshop', scenery: 'mrt_station' },
    { roomId: 'gardensbythebay', stage: 'tertiary', label: 'Gardens by the Bay Supertrees', scenery: 'bus_stop', busType: 'sbs_purple' },
    { roomId: 'clarkequay', stage: 'adult', label: 'Clarke Quay Waterfront & Community Booth', scenery: 'kampong_glam' },
    { roomId: 'merlion', stage: 'adult', label: 'Merlion Park Waterfront Promenade', scenery: 'chinatown' }
  ];

  // Continue Journey to Next Stage / Filler Scene via Continuous Side-Scrolling Transition
  const handleContinueJourney = () => {
    if (isTransitioning) return;

    let negEvent: NegativeTransitionalEvent | null = null;
    if (substanceAcceptedCount === 1) negEvent = 'family_argument';
    else if (substanceAcceptedCount === 2) negEvent = 'exam_burnout';
    else if (substanceAcceptedCount >= 3) negEvent = 'hospital_emergency';

    // 1. PRIMARY SCHOOL SEQUENTIAL PROGRESSION
    if (stage === 'primary') {
      if (currentRoomId === 'psle_celebration') {
        // Leaving filler celebration -> advance to Secondary School chapter!
        soundEngine.playLevelUp();
        setTransitionDestination('Secondary School Campus & Track');
        setTransitionTargetRoomId('secondaryschool');
        setTransitionScenery('bus_stop');
        setTransitionBusType('sbs_green');
        setActiveNegativeEvent(negEvent);
        setIsTransitioning(true);
        return;
      }

      if (!stageCompleted && stageMilestones < REQUIRED_STAGE_MILESTONES) {
        soundEngine.playWarning();
        showToast(`Complete ${REQUIRED_STAGE_MILESTONES - stageMilestones} more milestones in Primary School to proceed! Study papers, talk with elders, or resist peer pressure.`);
        return;
      }

      // Milestones met -> transition into the PSLE Celebration filler scene!
      soundEngine.playLevelUp();
      setTransitionDestination('PSLE Results & Family Celebration');
      setTransitionTargetRoomId('psle_celebration');
      setTransitionScenery('chinatown');
      setTransitionBusType(null);
      setActiveNegativeEvent(negEvent);
      setIsTransitioning(true);
      return;
    }

    // 2. SECONDARY SCHOOL SEQUENTIAL PROGRESSION
    if (stage === 'secondary') {
      if (currentRoomId === 'olevel_plaza') {
        // Leaving O-Level plaza -> Trigger Tertiary Education Pathway selection FIRST!
        soundEngine.playSelect();
        setShowPathwayChoice(true);
        return;
      }

      if (!stageCompleted && stageMilestones < REQUIRED_STAGE_MILESTONES) {
        soundEngine.playWarning();
        showToast(`Complete ${REQUIRED_STAGE_MILESTONES - stageMilestones} more milestones in Secondary School to graduate! Attend anti-drug exhibitions, sports, and studies.`);
        return;
      }

      // Milestones met -> transition into the O-Level Plaza filler scene!
      soundEngine.playLevelUp();
      setTransitionDestination('O-Level Graduation Plaza & ECG Counselling');
      setTransitionTargetRoomId('olevel_plaza');
      setTransitionScenery('scenic_commute');
      setTransitionBusType('sbs_purple');
      setActiveNegativeEvent(negEvent);
      setIsTransitioning(true);
      return;
    }

    // 3. TERTIARY EDUCATION PROGRESSION
    if (stage === 'tertiary') {
      if (!stageCompleted && stageMilestones < REQUIRED_STAGE_MILESTONES) {
        soundEngine.playWarning();
        showToast(`Complete ${REQUIRED_STAGE_MILESTONES - stageMilestones} more milestones in Tertiary Education to graduate! Complete campus projects, workshops, and civic actions.`);
        return;
      }

      // Milestones met -> transition into Young Adulthood & Career stage!
      soundEngine.playLevelUp();
      setTransitionDestination('Clarke Quay Riverfront & Community Hub');
      setTransitionTargetRoomId('clarkequay');
      setTransitionScenery('kampong_glam');
      setTransitionBusType('sbs_purple');
      setActiveNegativeEvent(negEvent);
      setIsTransitioning(true);
      return;
    }

    // 4. YOUNG ADULTHOOD & CAREER PROGRESSION
    if (stage === 'adult') {
      if (!stageCompleted && stageMilestones < REQUIRED_STAGE_MILESTONES) {
        soundEngine.playWarning();
        showToast(`Complete ${REQUIRED_STAGE_MILESTONES - stageMilestones} more milestones in Adulthood to conclude your life journey! Take part in community initiatives, anti-drug pledges, and wholesome activities.`);
        return;
      }

      // Adulthood complete -> Lifetime Graduation & Retrospective Ending!
      soundEngine.playLevelUp();
      evaluateLifetimeEnding();
      return;
    }

    evaluateLifetimeEnding();
  };

  // Complete Transition: Arrive at destination stage & stop for free-roam exploration
  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setActiveNegativeEvent(null);

    // If arriving from an ambulance emergency, open KKH hospital modal directly!
    if (activeNegativeEvent === 'hospital_emergency' || transitionTargetRoomId === 'hospital_ward') {
      setCurrentRoomId('hospital_ward');
      setPlayerX(400);
      setPlayerFacing('right');
      setIsMoving(false);
      setShowKKHModal(true);
      return;
    }

    setCurrentRoomId(transitionTargetRoomId);
    setPlayerX(160);
    setPlayerFacing('right');
    setIsMoving(false);

    let currentActiveStage: LifeStageKey = stage;

    // If transitioning from psle_celebration into secondaryschool, update stage:
    if (transitionTargetRoomId === 'secondaryschool' && stage === 'primary') {
      setStage('secondary');
      currentActiveStage = 'secondary';
      setStageMilestones(0);
      setStageCompleted(false);
      setShowStageIntro(true);
    } else if (transitionTargetRoomId === 'clarkequay' && stage === 'tertiary') {
      // Transition from Tertiary to Young Adulthood & Career
      setStage('adult');
      currentActiveStage = 'adult';
      setStageMilestones(0);
      setStageCompleted(false);
      setShowStageIntro(true);
    }

    // Check if room triggers a stage dilemma
    const roomDilemma = DILEMMA_SCENARIOS.find(
      d => d.room === transitionTargetRoomId && !completedDilemmaIds.includes(d.id) && d.stageRequired === currentActiveStage
    );
    if (roomDilemma) {
      setTimeout(() => {
        soundEngine.playWarning();
        setActiveDilemma(roomDilemma);
      }, 500);
    }
  };

  // Local Sub-Scene Fast Travel (Instant, zero transition animation, retains screen position)
  const handleSelectRoom = (roomId: string) => {
    soundEngine.playClick();
    const targetRoom = GAME_ROOMS.find(r => r.id === roomId);
    if (!targetRoom) return;

    setCurrentRoomId(roomId);
    setIsMoving(false);
    showToast(`Arrived at ${targetRoom.name}`);
  };

  // Educational Anti-Drug Exhibition Booth Quiz
  const handleCompleteAntiDrugQuiz = () => {
    soundEngine.playResistSuccess();
    setStats(s => ({
      ...s,
      resilience: Math.min(100, s.resilience + 20),
      academics: Math.min(100, s.academics + 15),
      mentalHealth: Math.min(100, (s.mentalHealth ?? 75) + 10)
    }));
    recordMilestoneInteraction('anti_drug_quiz', 'Anti-Drug Peer Ambassador Certificate');
    setShowAntiDrugBooth(false);
    showToast('Completed the Anti-Drug Peer Ambassador Quiz! Resilience +20, Academics +15');
  };

  // Laptop Warning / Cyber Safety Terminal
  const handleLaptopSafeReport = () => {
    soundEngine.playResistSuccess();
    setStats(s => ({
      ...s,
      resilience: Math.min(100, s.resilience + 25),
      academics: Math.min(100, s.academics + 10),
      mentalHealth: Math.min(100, (s.mentalHealth ?? 75) + 8)
    }));
    recordMilestoneInteraction('laptop_safe_report', 'Cyber Safety & Anti-Solicitation Report');
    setShowLaptopModal(false);
    showToast('Reported cyber-solicitation and online illicit group! Resilience +25');
  };

  const handleLaptopNegativeChoice = () => {
    soundEngine.playWarning();
    setSubstanceAcceptedCount(prev => prev + 1);
    setStats(s => ({
      ...s,
      health: Math.max(10, s.health - 30),
      resilience: Math.max(5, s.resilience - 30),
      academics: Math.max(5, s.academics - 25),
      mentalHealth: Math.max(5, (s.mentalHealth ?? 75) - 35)
    }));
    setShowLaptopModal(false);
    showToast('Incurred legal jeopardy and cyber scam trap! Mental health plummeted.');
  };

  // Civic Volunteer Pledge
  const handlePledgeVolunteer = () => {
    soundEngine.playResistSuccess();
    setStats(s => ({
      ...s,
      resilience: Math.min(100, s.resilience + 25),
      social: Math.min(100, s.social + 15),
      mentalHealth: Math.min(100, (s.mentalHealth ?? 75) + 15)
    }));
    recordMilestoneInteraction('pledge_volunteer', 'Youth Community Volunteer Pledge');
    setShowVolunteerModal(false);
    showToast('Registered as an Anti-Drug Youth & Community Volunteer! Inspiring peers nationwide.');
  };

  // Canvas Click-to-move
  const handleCanvasClick = (targetX: number) => {
    soundEngine.playFootstep();
    setPlayerFacing(targetX > playerX ? 'right' : 'left');
    setPlayerX(Math.max(60, Math.min(740, targetX)));
  };

  // Character Creation Finish
  const handleCreatorFinish = (createdAvatar: AvatarConfig, bg: FamilyBackground) => {
    setAvatar(createdAvatar);
    setFamilyBackground(bg);
    setStats({
      health: bg.statModifiers.health,
      academics: bg.statModifiers.academics,
      social: bg.statModifiers.social,
      resilience: bg.statModifiers.resilience,
      energy: 85,
      hunger: 90,
      mentalHealth: bg.statModifiers.mentalHealth ?? 80
    });
    setHasStarted(true);
    soundEngine.startAmbientBgm();
    setShowStageIntro(true);
  };

  const handleStageIntroContinue = () => {
    setShowStageIntro(false);
    setShowSceneSelector(true);
  };

  const handleInitialSceneSelect = (selectedRoomId: string) => {
    setShowSceneSelector(false);
    handleSelectRoom(selectedRoomId);
  };

  // Wardrobe Equipping & Unlocking
  const handleEquipCosmetic = (category: CosmeticCategory, itemId: string) => {
    soundEngine.playSelect();
    setAvatar(prev => {
      switch (category) {
        case 'hair': return { ...prev, equippedHairId: itemId };
        case 'outfit': return { ...prev, equippedOutfitId: itemId };
        case 'accessory': return { ...prev, equippedAccessoryId: itemId };
        case 'aura': return { ...prev, equippedAuraId: itemId };
      }
    });
    showToast('Equipped item successfully!');
  };

  const handleUnlockCosmetic = (item: CosmeticItem) => {
    if (resiliencePoints >= item.costResilience) {
      soundEngine.playResistSuccess();
      setResiliencePoints(pts => pts - item.costResilience);
      setUnlockedCosmeticIds(prev => [...prev, item.id]);
      showToast(`Unlocked ${item.name}! You can equip it now.`);
    }
  };

  // Restart Lifetime Run
  const handleRestart = () => {
    setStage('primary');
    setPostSecondaryPath(null);
    setStageMilestones(0);
    setStageCompleted(false);
    setSubstanceAcceptedCount(0);
    setSubstanceResistedCount(0);
    setCompletedDilemmaIds([]);
    setCurrentRoomId('school');
    setPlayerX(220);
    setActiveEnding(null);
    setIsTransitioning(false);
    setShowStageIntro(false);
    setShowSceneSelector(false);
    setHasStarted(false); // Opens creation modal for next lifetime
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-between p-2 sm:p-4 bg-gradient-to-b from-[#1c1511] via-[#241a14] to-[#140e0b]">
      {/* Central Screen Container */}
      <div className="w-full max-w-4xl flex flex-col gap-2 relative">
        {/* HUD: Stats, Stage, Singapore Fast Travel (Hidden during cinematic transitions) */}
        {!isTransitioning && (
          <HUD
            stats={stats}
            stage={stage}
            path={postSecondaryPath}
            currentRoom={currentRoom}
            allRooms={GAME_ROOMS}
            availableStageRooms={getStageRooms(stage)}
            isMuted={isMuted}
            stageMilestones={stageMilestones}
            requiredMilestones={REQUIRED_STAGE_MILESTONES}
            stageCompleted={stageCompleted}
            isRecoveryBufferActive={isRecoveryBufferActive}
            recoveryBufferRemaining={recoveryBufferRemaining}
            onToggleMute={() => {
              const nextMute = soundEngine.toggleMute();
              setIsMuted(nextMute);
            }}
            onOpenWardrobe={() => setShowWardrobe(true)}
            onSelectRoom={handleSelectRoom}
          />
        )}

        {/* 2D Side-Scrolling Interactive Game Canvas / Continuous Transition View */}
        <div className="relative w-full">
          {isTransitioning ? (
            <ContinuousTransitionView
              avatar={avatar}
              stats={stats}
              destinationName={transitionDestination}
              scenery={transitionScenery}
              busType={transitionBusType}
              negativeEvent={activeNegativeEvent}
              onComplete={handleTransitionComplete}
            />
          ) : (
            <GameCanvas
              currentRoom={currentRoom}
              playerX={playerX}
              playerFacing={playerFacing}
              isMoving={isMoving}
              avatar={avatar}
              stage={stage}
              currentHour={14}
              stats={stats}
              nearestObject={nearestObject}
              canProgressStage={stageCompleted || currentRoomId === 'psle_celebration' || currentRoomId === 'olevel_plaza'}
              isCollapsing={isCollapsing}
              collapseStage={collapseStage}
              onInteract={handleObjectInteract}
              onCanvasClick={handleCanvasClick}
            />
          )}

          {/* Floating In-Game Toast Notification */}
          {notification && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-[#2c1a0e]/95 border-2 border-amber-400 rounded-md shadow-xl text-amber-200 font-sans-sg text-xs font-semibold animate-bounce flex items-center gap-2">
              <span>{notification}</span>
            </div>
          )}
        </div>
      </div>

      {/* MODALS & OVERLAYS */}

      {/* 1. Startup Character Customization & Random Family Background Generator */}
      {!hasStarted && (
        <AvatarCreatorModal onComplete={handleCreatorFinish} />
      )}

      {/* 2. Interactive Dilemma / Decision Point Modal */}
      {activeDilemma && (
        <DilemmaModal
          scenario={activeDilemma}
          onChoiceSelected={handleDilemmaChoice}
        />
      )}

      {/* 3. Post-Secondary Pathway Branching Modal (Chosen FIRST before Tertiary Scene Selector) */}
      {showPathwayChoice && (
        <BranchingPathwayModal
          academicsScore={stats.academics}
          onSelectPath={path => {
            setPostSecondaryPath(path);
            setShowPathwayChoice(false);
            setStage('tertiary');
            setStageMilestones(0);
            setStageCompleted(false);
            soundEngine.playLevelUp();
            // Open starting scene selector for Tertiary Education
            setShowSceneSelector(true);
            showToast(`Pathway confirmed: ${path}! Choose your starting scene for Tertiary Education.`);
          }}
        />
      )}

      {/* 4. End of Lifetime Album Retrospective & CNB Resources */}
      {activeEnding && (
        <LifeAlbumModal
          endingType={activeEnding}
          stats={stats}
          avatar={avatar}
          onRestart={handleRestart}
          onOpenWardrobe={() => setShowWardrobe(true)}
        />
      )}

      {/* 5. Wardrobe & Attire Closet */}
      {showWardrobe && (
        <WardrobeModal
          avatar={avatar}
          resiliencePoints={resiliencePoints}
          unlockedItemIds={unlockedCosmeticIds}
          onEquipItem={handleEquipCosmetic}
          onUnlockItem={handleUnlockCosmetic}
          onClose={() => setShowWardrobe(false)}
        />
      )}

      {/* 6. Life Stage Introduction & Thematic Banner */}
      {showStageIntro && (
        <LifeStageIntroBanner
          stage={stage}
          onContinue={handleStageIntroContinue}
        />
      )}

      {/* 7. Stage Initial Scene Selector */}
      {showSceneSelector && (
        <InitialSceneSelectorModal
          stage={stage}
          pathwayTitle={postSecondaryPath || undefined}
          availableRooms={getStageRooms(stage).filter(r => r.id !== 'psle_celebration' && r.id !== 'olevel_plaza')}
          onSelectRoom={handleInitialSceneSelect}
        />
      )}

      {/* 9. Anti-Drug Peer Exhibition Booth Modal */}
      <AntiDrugBoothModal
        isOpen={showAntiDrugBooth}
        stageName={currentRoom.name}
        isRecoveryBufferActive={isRecoveryBufferActive}
        onClose={() => setShowAntiDrugBooth(false)}
        onCompleteQuiz={handleCompleteAntiDrugQuiz}
      />

      {/* 10. Laptop Online Safety & Dark Web Trap Modal */}
      <LaptopWarningModal
        isOpen={showLaptopModal}
        onClose={() => setShowLaptopModal(false)}
        onSafeReport={handleLaptopSafeReport}
        onNegativeChoice={handleLaptopNegativeChoice}
      />

      {/* 11. Civic Action & Community Volunteer Modal */}
      <VolunteerInfoModal
        isOpen={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
        onPledgeVolunteer={handlePledgeVolunteer}
      />

      {/* 12. KKH Emergency Resuscitation & Adolescent Medicine Modal */}
      <KKHHospitalModal
        isOpen={showKKHModal}
        onDischarge={handleDischargeKKH}
      />
    </div>
  );
}
