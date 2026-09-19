import React, { useEffect, useRef, useState } from 'react';
import { 
  AvatarConfig, 
  BusType, 
  NegativeTransitionalEvent, 
  PlayerStats, 
  TransitionalScenery 
} from '../types';
import { soundEngine } from '../utils/audio';
import { FastForward, AlertTriangle, Bus } from 'lucide-react';

interface ContinuousTransitionViewProps {
  avatar: AvatarConfig;
  stats: PlayerStats;
  destinationName: string;
  scenery: TransitionalScenery;
  busType?: BusType | null;
  negativeEvent?: NegativeTransitionalEvent | null;
  onComplete: () => void;
}

export const ContinuousTransitionView: React.FC<ContinuousTransitionViewProps> = ({
  avatar,
  stats,
  destinationName,
  scenery,
  busType,
  negativeEvent,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const animFrameRef = useRef<number>(0);
  const scrollOffsetRef = useRef<number>(0);

  // Exactly 3.5 seconds cinematic bridge (USER REQUIREMENT)
  const durationMs = 3500;

  // Decoupled onComplete ref ensures movement/keypress re-renders NEVER reset the transition timer
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Sound cue on transition start
    if (scenery === 'mrt_station') {
      soundEngine.playMrtChime();
    } else if (negativeEvent === 'hospital_emergency') {
      soundEngine.playWarning();
    } else if (busType) {
      soundEngine.playSelect();
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        onCompleteRef.current();
      }
    }, 30);

    return () => clearInterval(interval);
    // Deliberately empty deps: timer runs uninterrupted for durationMs regardless of any movement or prop updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;
    const render = () => {
      tick++;
      scrollOffsetRef.current += 2.6; // Relaxed aesthetic Singapore stroll speed

      const w = canvas.width;
      const h = canvas.height;
      const scroll = scrollOffsetRef.current;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Multi-Layer Parallax Background
      drawParallaxBackground(ctx, w, h, scroll, scenery, busType, tick);

      // 2. Draw Moving Entity (Ambulance, Bus, or Continuous Walking Character)
      if (negativeEvent === 'hospital_emergency') {
        drawContinuousAmbulance(ctx, w, h, tick);
      } else if (busType) {
        drawContinuousBus(ctx, w, h, busType, avatar, stats, tick);
      } else {
        drawContinuousWalker(ctx, w, h, avatar, stats, tick);
      }

      // 3. Draw Negative Event Cutscene Overlay if active
      if (negativeEvent) {
        drawNegativeEventOverlay(ctx, w, h, negativeEvent, tick);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [avatar, stats, scenery, busType, negativeEvent]);

  return (
    <div className="relative w-full h-[380px] bg-black rounded-lg overflow-hidden border-2 border-[#543315] shadow-2xl flex flex-col justify-between select-none">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={380}
        className="w-full h-full object-cover"
      />

      {/* Top Banner: Transition Progress, Destination & Quick Skip */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-3 px-3 py-2 bg-[#1b120acc]/90 backdrop-blur-sm border border-[#543315] rounded-md text-amber-100 z-10">
        <div className="flex items-center gap-2">
          {busType ? (
            <Bus className={`w-4 h-4 ${busType === 'sbs_green' ? 'text-emerald-400' : 'text-purple-400'}`} />
          ) : negativeEvent ? (
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
          ) : (
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          )}
          <div className="flex flex-col">
            <span className="font-pixel text-[8px] text-amber-400 tracking-wider">
              {negativeEvent ? 'UNSETTLING TRANSITION' : busType ? 'BUS COMMUTE' : 'CINEMATIC COMMUTE'}
            </span>
            <span className="font-pixel text-[11px] text-white">
              Travelling to: <strong className="text-amber-200">{destinationName}</strong>
            </span>
          </div>
        </div>

        {/* Journey Progress Bar */}
        <div className="flex-1 max-w-xs mx-4 hidden sm:flex flex-col gap-1">
          <div className="flex justify-between text-[8px] font-pixel text-amber-300">
            <span>TRANSIT</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-stone-900 border border-amber-900/60 rounded-sm overflow-hidden">
            <div
              className={`h-full transition-all duration-100 ${
                negativeEvent ? 'bg-gradient-to-r from-rose-600 to-amber-500' : 'bg-gradient-to-r from-emerald-500 to-amber-400'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Instant Skip Button (USER REQUEST 3.1) */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onComplete();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#42250d] hover:bg-[#5c3413] active:translate-y-0.5 border border-amber-500 rounded text-amber-200 font-pixel text-[8px] tracking-wider transition shadow"
        >
          <span>SKIP</span>
          <FastForward className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// PARALLAX BACKGROUND RENDERING
// --------------------------------------------------------------------------
function drawParallaxBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scroll: number,
  scenery: TransitionalScenery,
  busType: BusType | null | undefined,
  tick: number
) {
  const floorY = 320;

  // Sky Gradient
  const sky = ctx.createLinearGradient(0, 0, 0, floorY);
  if (scenery === 'chinatown' || scenery === 'bus_stop') {
    sky.addColorStop(0, '#0f172a');
    sky.addColorStop(1, '#334155');
  } else if (scenery === 'little_india') {
    sky.addColorStop(0, '#31103f');
    sky.addColorStop(1, '#6b21a8');
  } else if (scenery === 'ice_cream_uncle') {
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(1, '#7dd3fc');
  } else if (scenery === 'ndr_rally') {
    sky.addColorStop(0, '#111827');
    sky.addColorStop(1, '#1e3a8a');
  } else {
    sky.addColorStop(0, '#1e293b');
    sky.addColorStop(1, '#475569');
  }
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, floorY);

  // Distant Singapore Skyline / HDB silhouettes (Slow Parallax: 0.2x)
  const distScroll = (scroll * 0.2) % 300;
  ctx.fillStyle = '#1e1b2e';
  for (let bx = -300; bx < w + 300; bx += 80) {
    const x = bx - distScroll;
    const bHeight = 80 + ((bx * 13) % 70);
    ctx.fillRect(x, floorY - bHeight, 70, bHeight);
    // Yellow lit windows
    ctx.fillStyle = '#fbbf24';
    for (let wy = floorY - bHeight + 10; wy < floorY - 10; wy += 14) {
      if ((bx + wy) % 5 === 0) {
        ctx.fillRect(x + 10, wy, 8, 8);
        ctx.fillRect(x + 30, wy, 8, 8);
        ctx.fillRect(x + 50, wy, 8, 8);
      }
    }
    ctx.fillStyle = '#1e1b2e';
  }

  // Midground: Singapore Themed Scenery (Medium Parallax: 0.6x)
  const midScroll = (scroll * 0.6) % 400;
  drawMidgroundScenery(ctx, w, floorY, midScroll, scenery, tick);

  // Ground Pavement & Road (Full speed: 1.0x)
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(0, floorY, w, h - floorY);

  // Yellow & White Road Markings
  const roadScroll = (scroll * 1.0) % 80;
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(0, floorY + 4, w, 4); // Edge curb line
  ctx.fillStyle = '#ffffff';
  for (let rx = -80; rx < w + 80; rx += 80) {
    ctx.fillRect(rx - roadScroll, floorY + 35, 45, 6);
  }

  // --- ANIMATED BACKGROUND TRAFFIC CARS (Traffic Context: ComfortDelGro Taxi & Sedan) ---
  const taxiSpeed = (scroll * 1.3) % 900;
  const taxiX = w + 200 - taxiSpeed;
  if (taxiX > -180 && taxiX < w + 180) {
    // ComfortDelGro Blue Taxi
    const ty = floorY - 32;
    ctx.fillStyle = '#1d4ed8'; // Singapore blue taxi
    ctx.fillRect(taxiX, ty, 85, 24);
    // Cabin roof
    ctx.beginPath();
    ctx.moveTo(taxiX + 15, ty);
    ctx.lineTo(taxiX + 30, ty - 14);
    ctx.lineTo(taxiX + 65, ty - 14);
    ctx.lineTo(taxiX + 75, ty);
    ctx.closePath();
    ctx.fill();
    // Windows
    ctx.fillStyle = '#93c5fd';
    ctx.fillRect(taxiX + 32, ty - 12, 14, 10);
    ctx.fillRect(taxiX + 48, ty - 12, 15, 10);
    // Yellow TAXI rooftop lightbox
    ctx.fillStyle = '#facc15';
    ctx.fillRect(taxiX + 42, ty - 19, 14, 5);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 4px sans-serif';
    ctx.fillText('TAXI', taxiX + 43, ty - 15);
    // Wheels
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(taxiX + 22, ty + 24, 7, 0, Math.PI * 2);
    ctx.arc(taxiX + 68, ty + 24, 7, 0, Math.PI * 2);
    ctx.fill();
    // Headlights
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(taxiX - 2, ty + 10, 4, 6);
  }

  const sedanSpeed = (scroll * 0.85) % 800;
  const sedanX = -120 + sedanSpeed;
  if (sedanX > -150 && sedanX < w + 150) {
    // Silver Singapore Family Sedan in far lane
    const sy = floorY - 36;
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(sedanX, sy, 80, 22);
    ctx.beginPath();
    ctx.moveTo(sedanX + 18, sy);
    ctx.lineTo(sedanX + 32, sy - 12);
    ctx.lineTo(sedanX + 60, sy - 12);
    ctx.lineTo(sedanX + 70, sy);
    ctx.closePath();
    ctx.fill();
    // Tinted windows
    ctx.fillStyle = '#334155';
    ctx.fillRect(sedanX + 34, sy - 10, 12, 8);
    ctx.fillRect(sedanX + 48, sy - 10, 11, 8);
    // Wheels
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(sedanX + 20, sy + 22, 6.5, 0, Math.PI * 2);
    ctx.arc(sedanX + 62, sy + 22, 6.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Streetlights & Tropical Trees passing by
  const fgScroll = (scroll * 1.0) % 250;
  for (let lx = -250; lx < w + 250; lx += 250) {
    const x = lx - fgScroll;
    // Lamp post
    ctx.fillStyle = '#475569';
    ctx.fillRect(x, floorY - 140, 6, 140);
    ctx.fillRect(x - 10, floorY - 140, 26, 6);
    // Warm light cone
    ctx.fillStyle = 'rgba(254, 240, 138, 0.12)';
    ctx.beginPath();
    ctx.moveTo(x + 3, floorY - 134);
    ctx.lineTo(x - 50, floorY);
    ctx.lineTo(x + 56, floorY);
    ctx.closePath();
    ctx.fill();
  }
}

function drawMidgroundScenery(
  ctx: CanvasRenderingContext2D,
  w: number,
  floorY: number,
  offset: number,
  scenery: TransitionalScenery,
  tick: number
) {
  for (let i = -400; i < w + 400; i += 380) {
    const x = i - offset;

    if (scenery === 'bus_stop') {
      // 1. Bus Stop Shelter with metal bench, route board & bus sign
      ctx.fillStyle = '#334155';
      ctx.fillRect(x + 20, floorY - 100, 140, 10); // Shelter roof
      ctx.fillStyle = '#64748b';
      ctx.fillRect(x + 30, floorY - 90, 8, 90); // Left pillar
      ctx.fillRect(x + 140, floorY - 90, 8, 90); // Right pillar
      // Orange & Yellow bus stop pole
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(x + 165, floorY - 110, 6, 110);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 158, floorY - 118, 20, 14);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 6px monospace';
      ctx.fillText('BUS', x + 160, floorY - 108);
      // Bench inside shelter
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 50, floorY - 35, 70, 8);
    } else if (scenery === 'ice_cream_uncle') {
      // 2. Ice Cream Uncle Stall with green/orange umbrella & motorcycle cart
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 40, floorY - 50, 70, 50); // Cart body
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x + 45, floorY - 45, 60, 35);
      // Umbrella pole
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 75, floorY - 50);
      ctx.lineTo(x + 75, floorY - 105);
      ctx.stroke();
      // Green & Orange Umbrella
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(x + 75, floorY - 105, 45, Math.PI, Math.PI * 1.5);
      ctx.fill();
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(x + 75, floorY - 105, 45, Math.PI * 1.5, Math.PI * 2);
      ctx.fill();
      // Wafer & Rainbow bread display
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 50, floorY - 55, 14, 8);
      ctx.fillStyle = '#f472b6';
      ctx.fillRect(x + 70, floorY - 55, 10, 8);
    } else if (scenery === 'ndr_rally') {
      // 3. National Day Rally Outdoor Grass Public Screening
      // Big projector screen
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 20, floorY - 130, 160, 105);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 25, floorY - 125, 150, 95);
      // Screen broadcast: Singapore Red/White Backdrop with Speaker Podium
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x + 30, floorY - 120, 140, 45);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 30, floorY - 75, 140, 40);
      // Speaker at podium (PM Lawrence Wong / SM Lee Hsien Loong addressing Singaporeans)
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(x + 92, floorY - 88, 16, 20); // Suit
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(x + 100, floorY - 95, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 6px "Press Start 2P"';
      ctx.fillText('NDR RALLY', x + 55, floorY - 45);
      // Audience silhouettes on lawn
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(x + 40, floorY - 15, 10, 0, Math.PI * 2);
      ctx.arc(x + 70, floorY - 12, 11, 0, Math.PI * 2);
      ctx.arc(x + 145, floorY - 14, 10, 0, Math.PI * 2);
      ctx.fill();
    } else if (scenery === 'scenic_commute') {
      // 4. Scenic Commute: Heritage Shophouses, Rain Tree Canopies, MRT Screen
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 20, floorY - 120, 130, 120);
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(x + 35, floorY - 105, 30, 40);
      ctx.fillRect(x + 85, floorY - 105, 30, 40);
      // Rain Tree Canopy
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(x + 175, floorY - 90, 40, 0, Math.PI * 2);
      ctx.arc(x + 195, floorY - 110, 35, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x + 170, floorY - 60, 14, 60);
    } else if (scenery === 'chinatown') {
      // Heritage Shophouse with Red Lanterns
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(x, floorY - 130, 140, 130);
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(x + 10, floorY - 110, 120, 110);
      // Traditional timber shutter windows
      ctx.fillStyle = '#172554';
      ctx.fillRect(x + 20, floorY - 95, 30, 40);
      ctx.fillRect(x + 90, floorY - 95, 30, 40);
      // Hanging glowing red lanterns
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(x + 35, floorY - 115, 8, 0, Math.PI * 2);
      ctx.arc(x + 105, floorY - 115, 8, 0, Math.PI * 2);
      ctx.fill();
    } else if (scenery === 'little_india') {
      // Vibrant multicolored shophouses
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(x, floorY - 120, 130, 120);
      ctx.fillStyle = '#059669';
      ctx.fillRect(x + 15, floorY - 100, 40, 35);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x + 75, floorY - 100, 40, 35);
      // Flower garland string
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, floorY - 110);
      ctx.quadraticCurveTo(x + 65, floorY - 95, x + 130, floorY - 110);
      ctx.stroke();
    } else if (scenery === 'kampong_glam') {
      // Golden Dome of Sultan Mosque silhouette
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(x + 70, floorY - 120, 28, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(x + 42, floorY - 120, 56, 120);
      // Minaret spire
      ctx.fillRect(x + 67, floorY - 155, 6, 35);
    } else if (scenery === 'mrt_station') {
      // SMRT Platform screen doors & digital display
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x, floorY - 130, 180, 130);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x + 10, floorY - 110, 160, 15);
      // SMRT LED Sign
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(x + 30, floorY - 90, 120, 18);
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px monospace';
      ctx.fillText('EAST-WEST LINE 2 MIN', x + 35, floorY - 78);
    } else {
      // Classic HDB Void Deck with bamboo poles
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(x, floorY - 140, 160, 140);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x + 15, floorY - 140, 20, 140);
      ctx.fillRect(x + 125, floorY - 140, 20, 140);
      // Bamboo laundry poles protruding
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 50, floorY - 120);
      ctx.lineTo(x - 20, floorY - 135);
      ctx.stroke();
    }
  }
}

// --------------------------------------------------------------------------
// CONTINUOUS AUTO-WALKER AVATAR RENDERING
// --------------------------------------------------------------------------
function drawContinuousWalker(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  avatar: AvatarConfig,
  stats: PlayerStats,
  tick: number
) {
  const cx = w * 0.38;
  const cy = 320; // Anchored strictly to floorY (320) so shoes contact pavement without floating

  // Degradation tiers based on mental health & substance penalty
  const mental = stats?.mentalHealth ?? 70;
  const isTier1 = mental < 70;
  const isTier2 = mental < 50;
  const isTier3 = mental < 30;

  // Walk cycle animation
  const walkSpeed = isTier3 ? 0.22 : isTier1 ? 0.28 : 0.34;
  const walkBob = Math.sin(tick * walkSpeed) * 3;
  const legSwing = Math.cos(tick * walkSpeed) * 7;

  ctx.save();
  ctx.translate(cx, cy);

  // Slouched posture if severely distressed
  if (isTier3) {
    ctx.rotate(0.08);
  } else if (isTier2) {
    ctx.rotate(0.04);
  }

  // 1. Shoes
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-10 + legSwing, -10 + walkBob, 8, 10);
  ctx.fillRect(2 - legSwing, -10 + walkBob, 8, 10);

  // 2. Pants / Uniform
  ctx.fillStyle = avatar.pantsColor || '#1e3a8a';
  ctx.fillRect(-10, -26 + walkBob, 20, 16);

  // 3. Torso / Shirt
  ctx.fillStyle = avatar.shirtColor || '#ffffff';
  ctx.fillRect(-12, -48 + walkBob, 24, 22);

  // 4. Neck connection
  let skinTone = avatar.skinTone || '#fed7aa';
  if (isTier3) skinTone = '#dcd5cc';
  else if (isTier2) skinTone = '#ece2d8';
  ctx.fillStyle = skinTone;
  ctx.fillRect(-4, -51 + walkBob, 8, 6);

  // 5. Head
  ctx.fillStyle = skinTone;
  ctx.beginPath();
  ctx.arc(0, -64 + walkBob, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#3e2412';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // 6. Eyes & Eyeballs
  const isBlinking = tick % 120 < 4;
  if (!isBlinking) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-8, -66 + walkBob, 5, isTier3 ? 5 : 7);
    ctx.fillRect(4, -66 + walkBob, 5, isTier3 ? 5 : 7);

    // Sparkle (only when healthy)
    if (!isTier2) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-7, -65 + walkBob, 2, 2);
      ctx.fillRect(5, -65 + walkBob, 2, 2);
    }
  } else {
    // Blinking
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-8, -63 + walkBob);
    ctx.lineTo(-3, -63 + walkBob);
    ctx.moveTo(4, -63 + walkBob);
    ctx.lineTo(9, -63 + walkBob);
    ctx.stroke();
  }

  // 7. Dynamic Eyebags based on Tiers
  if (isTier1) {
    const alpha = isTier3 ? 0.9 : isTier2 ? 0.6 : 0.35;
    ctx.fillStyle = `rgba(76, 29, 149, ${alpha})`;
    ctx.fillRect(-9, -58 + walkBob, 7, isTier3 ? 3.5 : 2);
    ctx.fillRect(3, -58 + walkBob, 7, isTier3 ? 3.5 : 2);
  }

  // 8. Cheeks
  if (!isTier2) {
    ctx.fillStyle = 'rgba(244, 114, 182, 0.5)';
    ctx.fillRect(-14, -61 + walkBob, 4, 3);
    ctx.fillRect(10, -61 + walkBob, 4, 3);
  }

  // 9. Mouth
  ctx.strokeStyle = '#4a2810';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  if (isTier3) {
    ctx.arc(0, -56 + walkBob, 4, Math.PI + 0.3, Math.PI * 2 - 0.3);
  } else if (isTier2) {
    ctx.moveTo(-3, -57 + walkBob);
    ctx.lineTo(3, -57 + walkBob);
  } else {
    ctx.arc(0, -58 + walkBob, 4, 0.2, Math.PI - 0.2);
  }
  ctx.stroke();

  // 10. Hair (Appearance Lock: Strictly matches character creation hairstyle & colour)
  const hairCol = avatar.hairColor || avatar.hairColour || '#1c1917';
  ctx.fillStyle = hairCol;
  const hs = avatar.hairStyle ?? 1;

  if (hs === 0) {
    // Neat Crop
    ctx.beginPath();
    ctx.arc(0, -68 + walkBob, 20, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(-16, -72 + walkBob, 32, 6);
  } else if (hs === 2) {
    // Classic Ponytail
    ctx.beginPath();
    ctx.arc(0, -68 + walkBob, 21, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(-18, -74 + walkBob, 36, 8);
    // Ponytail puff behind
    ctx.beginPath();
    ctx.arc(-20, -70 + walkBob, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#dc2626'; // Ribbon
    ctx.fillRect(-18, -72 + walkBob, 4, 6);
    ctx.fillStyle = hairCol;
  } else if (hs === 3) {
    // Messy Waves
    ctx.beginPath();
    ctx.arc(0, -68 + walkBob, 22, Math.PI * 0.85, Math.PI * 2.15);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-10, -78 + walkBob, 8, 0, Math.PI * 2);
    ctx.arc(6, -79 + walkBob, 9, 0, Math.PI * 2);
    ctx.arc(16, -74 + walkBob, 7, 0, Math.PI * 2);
    ctx.fill();
  } else if (hs === 4) {
    // Undercut Fade
    ctx.fillRect(-18, -70 + walkBob, 36, 7);
    ctx.beginPath();
    ctx.arc(0, -73 + walkBob, 17, Math.PI, 0);
    ctx.fill();
  } else if (hs === 5) {
    // Twin Braids
    ctx.beginPath();
    ctx.arc(0, -68 + walkBob, 21, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(-19, -66 + walkBob, 6, 22);
    ctx.fillRect(13, -66 + walkBob, 6, 22);
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-19, -46 + walkBob, 6, 3);
    ctx.fillRect(13, -46 + walkBob, 6, 3);
    ctx.fillStyle = hairCol;
  } else if (hs === 6) {
    // Modern Bob
    ctx.beginPath();
    ctx.arc(0, -68 + walkBob, 22, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(-20, -68 + walkBob, 7, 18);
    ctx.fillRect(13, -68 + walkBob, 7, 18);
  } else {
    // Side Part (Default 1)
    ctx.beginPath();
    ctx.arc(0, -68 + walkBob, 21, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(-18, -74 + walkBob, 36, 8);
    ctx.fillRect(-18, -68 + walkBob, 6, 12);
    ctx.fillRect(12, -68 + walkBob, 6, 12);
  }

  // Sweatdrop bubble if distressed
  if (isTier3) {
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(16, -80 + walkBob, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// --------------------------------------------------------------------------
// DYNAMIC BUS GENERATION: AUTHENTIC LTA LUSH GREEN OR SBS TRANSIT BUS
// Large panoramic windows, interior details (orange seats, yellow poles, straps),
// active front bus driver NPC, and seated avatar strictly matching creation parameters.
// --------------------------------------------------------------------------
function drawContinuousBus(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  busType: BusType,
  avatar: AvatarConfig,
  stats: PlayerStats,
  tick: number
) {
  const busX = w * 0.18;
  const busY = 145;
  const busW = 380;
  const busH = 145;

  const busBob = Math.sin(tick * 0.2) * 1.5;

  ctx.save();
  ctx.translate(busX, busY + busBob);

  const isGreen = busType === 'sbs_green';

  if (isGreen) {
    // Authentic LTA Lush Green Palette (MAN Lion's City / Volvo B9TL)
    ctx.fillStyle = '#008542'; // Authentic LTA Lush Green
    ctx.fillRect(0, 0, busW, busH);
    ctx.fillStyle = '#005a2b'; // Dark green lower skirting
    ctx.fillRect(0, busH - 22, busW, 22);
    ctx.fillStyle = '#00a854'; // Roof highlight
    ctx.fillRect(0, 0, busW, 10);
    // White SG<3BUS logo motif
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('SG♥BUS', 20, busH - 8);
  } else {
    // Authentic SBS Transit Livery: White upper body, purple base & red swoosh stripe
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, busW, busH);
    ctx.fillStyle = '#582c83'; // SBS Transit Purple base
    ctx.fillRect(0, 60, busW, busH - 60);
    ctx.fillStyle = '#e2231a'; // SBS Transit Red stripe
    ctx.fillRect(0, 52, busW, 8);
    // SBS Transit Logo
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 7px sans-serif';
    ctx.fillText('SBS Transit', 20, busH - 8);
  }

  // --- ENLARGED PANORAMIC PASSENGER WINDOWS WITH INTERIOR DETAIL ---
  const winY = 18;
  const winH = 50;
  const winStartX = 25;
  const winW = 60;
  const winGap = 68;

  // 1. Interior Cabin Backdrop visible through glass
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(winStartX, winY, busW - winStartX - 45, winH);

  // 2. Interior Seats & Handrails inside each window
  for (let wx = winStartX; wx < busW - 55; wx += winGap) {
    // Orange cushioned seats with grey frames
    ctx.fillStyle = '#475569'; // Grey frame
    ctx.fillRect(wx + 8, winY + 20, 22, 28);
    ctx.fillRect(wx + 34, winY + 20, 22, 28);
    ctx.fillStyle = '#ea580c'; // Vibrant orange cushion
    ctx.fillRect(wx + 10, winY + 22, 18, 24);
    ctx.fillRect(wx + 36, winY + 22, 18, 24);
    // Grey headrest
    ctx.fillStyle = '#334155';
    ctx.fillRect(wx + 12, winY + 14, 14, 8);
    ctx.fillRect(wx + 38, winY + 14, 14, 8);

    // Yellow vertical stanchion grab poles
    ctx.fillStyle = '#facc15';
    ctx.fillRect(wx + 30, winY, 3.5, winH);

    // Overhead hanging grab straps with loop
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(wx + 20, winY, 2, 10);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(wx + 21, winY + 13, 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 3. FRONT CABIN: ACTIVE BUS DRIVER NPC
  const driverWinX = busW - 46;
  const driverWinY = winY;
  // Cabin divider
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(driverWinX - 6, winY, 4, winH);
  // Driver Torso (White collared uniform shirt)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(driverWinX + 8, driverWinY + 22, 20, 22);
  // Driver Tie
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(driverWinX + 17, driverWinY + 24, 3, 14);
  // Driver Head & Peaked Cap
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(driverWinX + 18, driverWinY + 14, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a'; // Peaked bus captain cap
  ctx.fillRect(driverWinX + 10, driverWinY + 6, 16, 5);
  ctx.fillRect(driverWinX + 8, driverWinY + 9, 14, 2);
  // Driver Steering Wheel (turning subtly)
  const steerAngle = Math.sin(tick * 0.12) * 0.2;
  ctx.save();
  ctx.translate(driverWinX + 30, driverWinY + 36);
  ctx.rotate(steerAngle);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 4. PASSENGER WINDOW: SEATED AVATAR (Appearance Lock: Strictly matches creation!)
  const avatarWinX = winStartX + winGap; // Window 2
  const avX = avatarWinX + 26;
  const avY = winY + 30;

  ctx.save();
  // Seated Torso matching shirt color
  ctx.fillStyle = avatar.shirtColor || '#ffffff';
  ctx.fillRect(avX - 11, avY - 2, 22, 20);

  // Neck & Head matching user's skin tone
  const userSkin = avatar.skinTone || '#fed7aa';
  ctx.fillStyle = userSkin;
  ctx.fillRect(avX - 4, avY - 7, 8, 6);
  ctx.beginPath();
  ctx.arc(avX, avY - 14, 11, 0, Math.PI * 2);
  ctx.fill();

  // Hair strictly matching user's hairStyle & hairColor
  const userHairCol = avatar.hairColor || avatar.hairColour || '#1c1917';
  ctx.fillStyle = userHairCol;
  const uHs = avatar.hairStyle ?? 1;
  if (uHs === 0) {
    ctx.beginPath();
    ctx.arc(avX, avY - 16, 11, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
  } else if (uHs === 2) {
    ctx.beginPath();
    ctx.arc(avX, avY - 16, 12, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(avX - 11, avY - 17, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (uHs === 3) {
    ctx.beginPath();
    ctx.arc(avX, avY - 16, 12, Math.PI * 0.85, Math.PI * 2.15);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(avX - 5, avY - 22, 5, 0, Math.PI * 2);
    ctx.arc(avX + 4, avY - 22, 5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(avX, avY - 16, 12, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(avX - 10, avY - 20, 20, 5);
  }

  // Facial features looking out window
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(avX + 1, avY - 15, 2.5, 3.5);
  ctx.fillRect(avX + 6, avY - 15, 2.5, 3.5);
  ctx.strokeStyle = '#4a2810';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(avX + 4, avY - 10, 2.5, 0.2, Math.PI - 0.2);
  ctx.stroke();

  ctx.restore();

  // 5. High-gloss tinted glass pane overlays with sleek black pillar borders
  for (let wx = winStartX; wx < busW - 55; wx += winGap) {
    // Window glass tint
    ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
    ctx.fillRect(wx, winY, winW, winH);
    // Window frame border
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(wx, winY, winW, winH);
    // Specular glass shine
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(wx + 4, winY + 4);
    ctx.lineTo(wx + 22, winY + winH - 4);
    ctx.stroke();
  }

  // Front Windshield (curved aerodynamic)
  ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.fillRect(busW - 42, winY, 36, winH + 18);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(busW - 42, winY, 36, winH + 18);

  // Destination Electronic LED Board (Amber pixels)
  ctx.fillStyle = '#000000';
  ctx.fillRect(busW - 145, 6, 135, 14);
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 8px monospace';
  ctx.fillText(isGreen ? 'SG BUS 190 -> ORCHARD' : 'SBS 14 -> BEDOK INT', busW - 138, 17);

  // Front Headlights & Light Beam
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(busW - 6, busH - 42, 6, 14);
  ctx.fillStyle = 'rgba(254, 240, 138, 0.18)';
  ctx.beginPath();
  ctx.moveTo(busW, busH - 35);
  ctx.lineTo(busW + 140, busH - 60);
  ctx.lineTo(busW + 140, busH + 15);
  ctx.closePath();
  ctx.fill();

  // Rotating Double Wheels with detailed rim hubs
  const wheelRotate = (tick * 0.3) % (Math.PI * 2);
  const wheels = [65, 125, busW - 65];
  wheels.forEach(wx => {
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(wx, busH, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(wx, busH, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(wx + Math.cos(wheelRotate) * 10, busH + Math.sin(wheelRotate) * 10);
    ctx.lineTo(wx - Math.cos(wheelRotate) * 10, busH - Math.sin(wheelRotate) * 10);
    ctx.stroke();
  });

  ctx.restore();
}

// --------------------------------------------------------------------------
// NEGATIVE TRANSITIONAL EVENT CUTSCENE OVERLAY
// Visual Cleanliness: Clean, non-jarring ambient vignette without harsh blaring red strobe
// --------------------------------------------------------------------------
function drawNegativeEventOverlay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  event: NegativeTransitionalEvent,
  tick: number
) {
  // Gentle warm amber-rose vignette (non-jarring, no harsh rapid strobe)
  const grad = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, 380);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(1, 'rgba(67, 20, 7, 0.45)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

// --------------------------------------------------------------------------
// EMERGENCY SCDF AMBULANCE (Rushing along highway to KKH Hospital)
// --------------------------------------------------------------------------
function drawContinuousAmbulance(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  tick: number
) {
  const floorY = 320;
  const ambW = 230;
  const ambH = 100;
  const ambX = w * 0.28;
  const ambY = floorY - ambH;

  ctx.save();
  ctx.translate(ambX, ambY);

  // Red/Blue Emergency Flashing Beacons Reflection on road
  const isRed = tick % 12 < 6;
  const beaconColor = isRed ? 'rgba(239, 68, 68, 0.45)' : 'rgba(59, 130, 246, 0.45)';
  const lightGlow = ctx.createRadialGradient(ambW / 2, -10, 5, ambW / 2, 120, 220);
  lightGlow.addColorStop(0, beaconColor);
  lightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = lightGlow;
  ctx.fillRect(-100, -50, ambW + 200, ambH + 150);

  // Ambulance Body (Crisp White SCDF Paramedic Van)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 10, ambW, ambH - 10);

  // Front cabin slope
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(ambW - 35, 15);
  ctx.lineTo(ambW, 45);
  ctx.lineTo(ambW, ambH);
  ctx.lineTo(ambW - 35, ambH);
  ctx.closePath();
  ctx.fill();

  // Singapore Civil Defence Force Battenburg pattern & red stripe
  ctx.fillStyle = '#dc2626'; // SCDF Red stripe
  ctx.fillRect(0, 48, ambW, 14);
  // High-vis yellow-green reflective battenburg blocks
  for (let bx = 10; bx < ambW - 40; bx += 24) {
    ctx.fillStyle = (bx / 24) % 2 === 0 ? '#eab308' : '#16a34a';
    ctx.fillRect(bx, 62, 12, 10);
  }

  // Windows
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(15, 20, 50, 24); // Rear patient window
  ctx.fillRect(75, 20, 50, 24); // Side window
  ctx.fillRect(ambW - 35, 20, 30, 24); // Driver window
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(17, 22, 46, 20);
  ctx.fillRect(77, 22, 46, 20);
  ctx.fillRect(ambW - 33, 22, 26, 20);

  // SCDF Emergency Signage
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px monospace';
  ctx.fillText('SCDF PARAMEDIC 995', 18, 58);

  // KKH Hospital Signage
  ctx.fillStyle = '#0f766e';
  ctx.fillRect(20, 74, 130, 12);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 7px "Press Start 2P", monospace';
  ctx.fillText('EMERGENCY -> KKH', 24, 83);

  // Flashing Rooftop LED Lightbar
  ctx.fillStyle = '#334155';
  ctx.fillRect(ambW * 0.4, 0, 50, 10);
  // Red LED left, Blue LED right
  ctx.fillStyle = isRed ? '#ef4444' : '#7f1d1d';
  ctx.fillRect(ambW * 0.4 + 2, 2, 20, 8);
  ctx.fillStyle = !isRed ? '#3b82f6' : '#1e3a8a';
  ctx.fillRect(ambW * 0.4 + 28, 2, 20, 8);

  // Headlights casting forward beam
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(ambW - 4, 60, 6, 12);
  ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
  ctx.beginPath();
  ctx.moveTo(ambW, 66);
  ctx.lineTo(ambW + 140, 45);
  ctx.lineTo(ambW + 140, ambH + 20);
  ctx.closePath();
  ctx.fill();

  // Wheels
  const wheelRotate = (tick * 0.45) % (Math.PI * 2);
  const wheels = [45, ambW - 40];
  wheels.forEach(wx => {
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(wx, ambH, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(wx, ambH, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(wx + Math.cos(wheelRotate) * 7, ambH + Math.sin(wheelRotate) * 7);
    ctx.lineTo(wx - Math.cos(wheelRotate) * 7, ambH - Math.sin(wheelRotate) * 7);
    ctx.stroke();
  });

  ctx.restore();
}

