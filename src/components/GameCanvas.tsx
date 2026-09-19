import React, { useEffect, useRef } from 'react';
import { AvatarConfig, GameRoom, InteractableObject, LifeStageKey, PlayerStats } from '../types';
import { drawRoomBackground } from './RoomBackgrounds';
import { drawSceneObject } from './SceneObjects';

interface GameCanvasProps {
  currentRoom: GameRoom;
  playerX: number;
  playerFacing: 'left' | 'right';
  isMoving: boolean;
  avatar: AvatarConfig;
  stage: LifeStageKey;
  currentHour: number;
  stats?: PlayerStats;
  nearestObject: InteractableObject | null;
  canProgressStage?: boolean;
  isCollapsing?: boolean;
  collapseStage?: number;
  onInteract: (obj: InteractableObject) => void;
  onCanvasClick: (targetX: number) => void;
  onTouchMoveDirection?: (dir: 'left' | 'right' | null) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  currentRoom,
  playerX,
  playerFacing,
  isMoving,
  avatar,
  stage,
  currentHour,
  stats,
  nearestObject,
  canProgressStage = false,
  isCollapsing = false,
  collapseStage = 0,
  onInteract,
  onCanvasClick,
  onTouchMoveDirection,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const tickRef = useRef<number>(0);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);

  // Background and character rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const render = () => {
      tickRef.current += 1;
      const tick = tickRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw Base Room Architecture
      drawRoomBackground(ctx, currentRoom.id, width, height, tick, currentHour);

      // 2. Draw Interactable Scene Objects
      currentRoom.objects.forEach(obj => {
        drawSceneObject(ctx, obj, currentRoom.id, tick, nearestObject?.id === obj.id);
      });

      // 3. Draw Player Avatar or Collapse Animation
      if (isCollapsing) {
        drawCollapseAnimation(
          ctx,
          playerX,
          340,
          avatar,
          collapseStage,
          tick
        );
        // Emergency pulse overlay
        const emergencyAlpha = (Math.sin(tick * 0.15) + 1) * 0.12;
        ctx.fillStyle = `rgba(220, 38, 38, ${emergencyAlpha})`;
        ctx.fillRect(0, 0, width, height);

        // Emergency Text Banner Overlay (Requirement 4.1)
        const bannerH = 34;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
        ctx.fillRect(0, 18, width, bannerH);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(0, 18, width, 2);
        ctx.fillRect(0, 18 + bannerH - 2, width, 2);

        ctx.fillStyle = '#fef2f2';
        ctx.font = 'bold 8.5px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('EMERGENCY: ACUTE PHYSIOLOGICAL COLLAPSE - 995 SCDF PARAMEDICS DISPATCHED', width / 2, 39);
        ctx.textAlign = 'left';
      } else {
        drawFantageAvatar(
          ctx,
          playerX,
          340, // Base foot level
          playerFacing,
          isMoving,
          avatar,
          stage,
          stats,
          tick
        );
      }

      // 4. Draw Interaction prompt if standing near hotspot
      if (nearestObject) {
        drawInteractionPrompt(ctx, nearestObject, tick);
      }

      // 4b. Draw Subtle Milestone Progression Cue
      if (canProgressStage) {
        const pulse = (Math.sin(tick * 0.1) + 1) * 0.5;
        ctx.save();
        ctx.fillStyle = `rgba(245, 158, 11, ${0.8 + pulse * 0.2})`;
        ctx.fillRect(width - 146, height - 36, 138, 26);
        ctx.fillStyle = '#1e1005';
        ctx.fillRect(width - 144, height - 34, 134, 22);
        ctx.font = 'bold 7px "Press Start 2P", monospace';
        ctx.fillStyle = '#fbbf24';
        ctx.textAlign = 'center';
        ctx.fillText('WALK RIGHT ➔', width - 77, height - 20);
        ctx.restore();
      }

      // 5. Ambient Time of Day Overlay (Morning, Afternoon, Sunset, Night)
      drawTimeOfDayFilter(ctx, width, height, currentHour);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [currentRoom, playerX, playerFacing, isMoving, avatar, stage, stats, currentHour, nearestObject, canProgressStage, isCollapsing, collapseStage]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check if clicked directly on an interactable
    const clickedObj = currentRoom.objects.find(
      obj => clickX >= obj.x && clickX <= obj.x + obj.w && clickY >= obj.y && clickY <= obj.y + obj.h
    );

    if (clickedObj) {
      onInteract(clickedObj);
    } else {
      onCanvasClick(clickX);
    }
  };

  // Seamless invisible touch handling for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const touchX = (touch.clientX - rect.left) * scaleX;
    const touchY = (touch.clientY - rect.top) * scaleY;
    touchStartPosRef.current = { x: touchX, y: touchY };

    // Check if tapped directly on an interactable
    const tappedObj = currentRoom.objects.find(
      obj => touchX >= obj.x && touchX <= obj.x + obj.w && touchY >= obj.y && touchY <= obj.y + obj.h
    );
    if (tappedObj) {
      onInteract(tappedObj);
      return;
    }

    // Directional tap or drag relative to player
    if (onTouchMoveDirection) {
      if (touchX > playerX + 15) {
        onTouchMoveDirection('right');
      } else if (touchX < playerX - 15) {
        onTouchMoveDirection('left');
      }
    } else {
      onCanvasClick(touchX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const touchX = (touch.clientX - rect.left) * scaleX;

    if (onTouchMoveDirection) {
      if (touchX > playerX + 15) {
        onTouchMoveDirection('right');
      } else if (touchX < playerX - 15) {
        onTouchMoveDirection('left');
      } else {
        onTouchMoveDirection(null);
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartPosRef.current = null;
    if (onTouchMoveDirection) {
      onTouchMoveDirection(null);
    }
  };

  return (
    <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-lg overflow-hidden border-4 border-[#3a220e] shadow-2xl bg-[#1c1511]">
      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full block cursor-pointer pixelated touch-none"
      />
      <div className="crt-overlay absolute inset-0 pointer-events-none" />
    </div>
  );
};

// -------------------------------------------------------------
// AVATAR & HUD DRAW FUNCTIONS
// -------------------------------------------------------------

function drawFantageAvatar(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  facing: 'left' | 'right',
  isMoving: boolean,
  avatar: AvatarConfig,
  stage: LifeStageKey,
  stats: PlayerStats | undefined,
  tick: number
) {
  ctx.save();
  ctx.translate(px, py);
  if (facing === 'left') {
    ctx.scale(-1, 1);
  }

  const walkBob = isMoving ? Math.sin(tick * 0.3) * 3 : 0;
  const legSwing = isMoving ? Math.sin(tick * 0.3) * 6 : 0;

  // 1. Draw AURA (Fantage style floating behind)
  if (avatar.equippedAuraId === 'aura_fantage_stars') {
    // Twinkling stars orbiting
    for (let s = 0; s < 4; s++) {
      const angle = tick * 0.05 + (s * Math.PI) / 2;
      const starX = Math.cos(angle) * 35;
      const starY = Math.sin(angle) * 20 - 45;
      ctx.fillStyle = '#fde047';
      drawPixelStar(ctx, starX, starY, 5);
    }
  } else if (avatar.equippedAuraId === 'aura_shield') {
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, -40, 32, 45, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else if (avatar.equippedAuraId === 'aura_gold_halo') {
    // Official Singapore Anti-Drug Ribbon Halo (#DRUGFREESG teal ribbon)
    // 1. Soft radiant teal glow
    const tealGlow = ctx.createRadialGradient(0, -82 + walkBob, 2, 0, -82 + walkBob, 32);
    tealGlow.addColorStop(0, 'rgba(0, 165, 165, 0.45)');
    tealGlow.addColorStop(0.7, 'rgba(13, 148, 136, 0.2)');
    tealGlow.addColorStop(1, 'rgba(13, 148, 136, 0)');
    ctx.fillStyle = tealGlow;
    ctx.beginPath();
    ctx.arc(0, -82 + walkBob, 32, 0, Math.PI * 2);
    ctx.fill();

    // 2. Teal Folded Ribbon Halo Loop
    ctx.strokeStyle = '#00a5a5';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, -82 + walkBob, 18, 7, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Crisp white border trim of the ribbon
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, -82 + walkBob, 20, 8.5, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Crossed Ribbon Tails at back
    ctx.strokeStyle = '#008b8b';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-5, -77 + walkBob);
    ctx.lineTo(-11, -66 + walkBob);
    ctx.moveTo(5, -77 + walkBob);
    ctx.lineTo(11, -66 + walkBob);
    ctx.stroke();

    // White trim on tails
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -77 + walkBob);
    ctx.lineTo(-12, -66 + walkBob);
    ctx.moveTo(6, -77 + walkBob);
    ctx.lineTo(12, -66 + walkBob);
    ctx.stroke();

    // 5. Sparkling Singapore Anti-Drug Teal & Emerald Particles
    for (let p = 0; p < 3; p++) {
      const pAngle = tick * 0.08 + (p * Math.PI * 2) / 3;
      const px = Math.cos(pAngle) * 26;
      const py = Math.sin(pAngle) * 9 - 82 + walkBob;
      ctx.fillStyle = p % 2 === 0 ? '#2dd4bf' : '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. Legs / Shoes
  ctx.fillStyle = '#1e293b'; // Shoes
  ctx.fillRect(-10 + legSwing, -10 + walkBob, 8, 10);
  ctx.fillRect(2 - legSwing, -10 + walkBob, 8, 10);

  // 3. Pants / Skirt
  let pantsColor = avatar.pantsColor || '#1e3a8a';
  if (stage === 'primary') {
    pantsColor = '#1e3a8a'; // Navy pinafore / shorts
  } else if (stage === 'secondary') {
    pantsColor = '#166534'; // Green sec school uniform
  }
  ctx.fillStyle = pantsColor;

  if (avatar.gender === 'girl') {
    // Pleated pinafore / skirt
    ctx.beginPath();
    ctx.moveTo(-11, -26 + walkBob);
    ctx.lineTo(11, -26 + walkBob);
    ctx.lineTo(15, -12 + walkBob);
    ctx.lineTo(-15, -12 + walkBob);
    ctx.closePath();
    ctx.fill();
    // Pleat shadow lines
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -26 + walkBob); ctx.lineTo(-7, -12 + walkBob);
    ctx.moveTo(0, -26 + walkBob); ctx.lineTo(0, -12 + walkBob);
    ctx.moveTo(6, -26 + walkBob); ctx.lineTo(7, -12 + walkBob);
    ctx.stroke();
  } else {
    // Boy shorts / trousers
    ctx.fillRect(-10, -26 + walkBob, 20, 16);
    // Separation line between short legs
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(-1, -20 + walkBob, 2, 10);
  }

  // 4. Torso / Shirt / School Uniform
  let shirtColor = avatar.shirtColor || '#f8fafc';
  if (stage === 'primary' || stage === 'secondary') {
    shirtColor = '#ffffff'; // Crisp white uniform
  }
  ctx.fillStyle = shirtColor;
  ctx.fillRect(-12, -48 + walkBob, 24, 22);

  // Attire details
  if (avatar.gender === 'girl' && (stage === 'primary' || avatar.wardrobeStyle === 'uniform')) {
    // Pinafore straps
    ctx.fillStyle = pantsColor;
    ctx.fillRect(-9, -48 + walkBob, 4, 22);
    ctx.fillRect(5, -48 + walkBob, 4, 22);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-8, -38 + walkBob, 2.5, 2.5); // Badge
  } else if (stage === 'primary' || stage === 'secondary') {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(2, -44 + walkBob, 4, 4); // School badge
  }

  // Neck connection (solidly connects torso to head)
  ctx.fillStyle = '#fce7d2';
  ctx.fillRect(-4, -51 + walkBob, 8, 8);

  // 5. Chibi Head (Fantage oversized rounded head)
  // Skin tone paleness/sallowness based on mental health & physical health
  const mentalHealth = stats?.mentalHealth ?? 70;
  const isSeverelyDistressed = mentalHealth < 35;
  const isTired = mentalHealth < 60;

  // Sallow/dull tone if mental health is low
  let skinTone = '#fce7d2'; // Default healthy peach chibi skin
  if (mentalHealth < 30) {
    skinTone = '#e2d5c8'; // Ashen/sallow tint
  } else if (mentalHealth < 50) {
    skinTone = '#f3ddce';
  }

  ctx.fillStyle = skinTone;
  ctx.beginPath();
  ctx.arc(0, -60 + walkBob, 18, 0, Math.PI * 2);
  ctx.fill();

  // Big Fantage Expressive Eyes
  const eyeBlink = tick % 140 < 4;
  if (!eyeBlink) {
    // Left eye
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-9, -63 + walkBob, 5, 8);
    // Left eye sparkle (only if not severely distressed)
    if (!isSeverelyDistressed) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-8, -62 + walkBob, 2, 2);
    }

    // Right eye
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, -63 + walkBob, 5, 8);
    // Right eye sparkle
    if (!isSeverelyDistressed) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(5, -62 + walkBob, 2, 2);
    }
  } else {
    // Closed tired or happy eye slit
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-9, -60 + walkBob);
    ctx.lineTo(-4, -60 + walkBob);
    ctx.moveTo(4, -60 + walkBob);
    ctx.lineTo(9, -60 + walkBob);
    ctx.stroke();
  }

  // Eyebags visual effect for deteriorating mental health
  if (isTired) {
    const eyebagAlpha = isSeverelyDistressed ? 0.85 : 0.45;
    // Dark purplish/greyish under-eye shadow
    ctx.fillStyle = `rgba(75, 45, 95, ${eyebagAlpha})`;
    // Left eyebag
    ctx.fillRect(-10, -55 + walkBob, 7, 2.5);
    // Right eyebag
    ctx.fillRect(3, -55 + walkBob, 7, 2.5);

    if (isSeverelyDistressed) {
      // Deeper hollow crescent under eyes for severe mental health decline
      ctx.strokeStyle = 'rgba(60, 25, 75, 0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(-6.5, -53 + walkBob, 3.5, 0.1, Math.PI - 0.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(6.5, -53 + walkBob, 3.5, 0.1, Math.PI - 0.1);
      ctx.stroke();
    }
  }

  // Rosy cheeks (fades or turns pale when mental health drops)
  if (!isSeverelyDistressed) {
    ctx.fillStyle = isTired ? 'rgba(244, 114, 182, 0.25)' : 'rgba(244, 114, 182, 0.6)';
    ctx.fillRect(-14, -58 + walkBob, 4, 3);
    ctx.fillRect(10, -58 + walkBob, 4, 3);
  }

  // Expression: cute smile if healthy, flat or downturned mouth if distressed
  ctx.strokeStyle = '#4a2810';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (isSeverelyDistressed) {
    // Downturned sad / stressed frown
    ctx.arc(0, -52 + walkBob, 4, Math.PI + 0.3, Math.PI * 2 - 0.3);
  } else if (isTired) {
    // Neutral flat line
    ctx.moveTo(-3, -55 + walkBob);
    ctx.lineTo(3, -55 + walkBob);
  } else {
    // Cute happy smile
    ctx.arc(0, -55 + walkBob, 4, 0.2, Math.PI - 0.2);
  }
  ctx.stroke();

  // 6. Hairstyle (Fantage style hair bangs & volume)
  ctx.fillStyle = avatar.hairColor || '#382212';
  const hairId = avatar.equippedHairId || (avatar.gender === 'girl' ? 'hair_girl_0' : 'hair_boy_0');

  if (hairId === 'hair_girl_0' || hairId === 'hair_ponytail' || hairId === 'hair_2') {
    // High sporty ponytail behind head
    ctx.beginPath();
    ctx.arc(0, -65 + walkBob, 20, Math.PI, Math.PI * 2);
    ctx.fill();
    // Ponytail puff & tie
    ctx.beginPath();
    ctx.arc(-18, -68 + walkBob, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-12, -68 + walkBob, 4, 6);
    ctx.fillStyle = avatar.hairColor || '#382212';
    // Bangs
    ctx.fillRect(-14, -72 + walkBob, 28, 10);
  } else if (hairId === 'hair_girl_1' || hairId === 'hair_5') {
    // Twin braids
    ctx.beginPath();
    ctx.arc(0, -65 + walkBob, 20, Math.PI, Math.PI * 2);
    ctx.fill();
    // Left & right braids
    ctx.fillRect(-18, -62 + walkBob, 5, 22);
    ctx.fillRect(13, -62 + walkBob, 5, 22);
    // Hair ties
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-18, -44 + walkBob, 5, 3);
    ctx.fillRect(13, -44 + walkBob, 5, 3);
    ctx.fillStyle = avatar.hairColor || '#382212';
    ctx.fillRect(-14, -72 + walkBob, 28, 10);
  } else if (hairId === 'hair_girl_2' || hairId === 'hair_6') {
    // School bob with fringe
    ctx.beginPath();
    ctx.arc(0, -64 + walkBob, 21, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-18, -62 + walkBob, 6, 18);
    ctx.fillRect(12, -62 + walkBob, 6, 18);
    ctx.fillRect(-14, -72 + walkBob, 28, 11);
  } else if (hairId === 'hair_girl_3' || hairId === 'hair_3') {
    // Flowing long waves
    ctx.beginPath();
    ctx.arc(0, -65 + walkBob, 21, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-19, -60 + walkBob, 7, 26);
    ctx.fillRect(12, -60 + walkBob, 7, 26);
    ctx.fillRect(-14, -72 + walkBob, 28, 10);
  } else if (hairId === 'hair_girl_4') {
    // Half-up bun
    ctx.beginPath();
    ctx.arc(0, -64 + walkBob, 20, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, -82 + walkBob, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-3, -76 + walkBob, 6, 3);
    ctx.fillStyle = avatar.hairColor || '#382212';
    ctx.fillRect(-14, -72 + walkBob, 28, 10);
  } else if (hairId === 'hair_girl_5') {
    // Chic pixie
    ctx.beginPath();
    ctx.arc(0, -65 + walkBob, 20, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(-15, -72 + walkBob, 18, 11);
  } else if (hairId === 'hair_boy_1' || hairId === 'hair_1') {
    // Side part
    ctx.beginPath();
    ctx.arc(0, -64 + walkBob, 20, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(-15, -73 + walkBob, 22, 11);
  } else if (hairId === 'hair_boy_2' || hairId === 'hair_kpop_bangs') {
    // Curtain bangs
    ctx.beginPath();
    ctx.arc(0, -65 + walkBob, 20, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-16, -72 + walkBob, 11, 14);
    ctx.fillRect(5, -72 + walkBob, 11, 14);
  } else if (hairId === 'hair_boy_3') {
    // Clean buzz cut
    ctx.beginPath();
    ctx.arc(0, -64 + walkBob, 19, Math.PI * 0.95, Math.PI * 2.05);
    ctx.fill();
    ctx.fillRect(-12, -70 + walkBob, 24, 6);
  } else if (hairId === 'hair_boy_4' || hairId === 'hair_4') {
    // Undercut fade
    ctx.beginPath();
    ctx.arc(0, -65 + walkBob, 20, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-14, -74 + walkBob, 28, 10);
  } else if (hairId === 'hair_boy_5') {
    // Sporty spikes
    ctx.beginPath();
    ctx.arc(0, -64 + walkBob, 20, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(-14, -72 + walkBob, 28, 10);
    // Spikes on top
    ctx.beginPath();
    ctx.moveTo(-10, -72 + walkBob); ctx.lineTo(-6, -82 + walkBob); ctx.lineTo(-2, -72 + walkBob);
    ctx.moveTo(-1, -72 + walkBob); ctx.lineTo(3, -84 + walkBob); ctx.lineTo(7, -72 + walkBob);
    ctx.moveTo(8, -72 + walkBob); ctx.lineTo(12, -80 + walkBob); ctx.lineTo(16, -72 + walkBob);
    ctx.fill();
  } else {
    // Default neat crop
    ctx.beginPath();
    ctx.arc(0, -64 + walkBob, 20, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(-14, -72 + walkBob, 28, 10);
  }

  // 7. Accessories
  if (avatar.equippedAccessoryId === 'acc_boba') {
    // Boba cup in hand
    ctx.fillStyle = '#b45309';
    ctx.fillRect(12, -38 + walkBob, 8, 12);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(14, -44 + walkBob, 2, 6); // Straw
  } else if (avatar.equippedAccessoryId === 'acc_airpods') {
    // Over-ear headphones
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-18, -64 + walkBob, 4, 10);
    ctx.fillRect(14, -64 + walkBob, 4, 10);
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -68 + walkBob, 17, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  }

  ctx.restore();
}

function drawPixelStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r * 0.3, y - r * 0.3);
  ctx.lineTo(x + r, y);
  ctx.lineTo(x + r * 0.3, y + r * 0.3);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r * 0.3, y + r * 0.3);
  ctx.lineTo(x - r, y);
  ctx.lineTo(x - r * 0.3, y - r * 0.3);
  ctx.closePath();
  ctx.fill();
}

function drawInteractionPrompt(
  ctx: CanvasRenderingContext2D,
  obj: InteractableObject,
  tick: number
) {
  const bob = Math.sin(tick * 0.15) * 4;
  const px = obj.x + obj.w / 2;
  const py = obj.y - 18 + bob;

  ctx.save();
  ctx.fillStyle = '#facc15';
  ctx.strokeStyle = '#422006';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.roundRect(px - 45, py - 14, 90, 24, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#422006';
  ctx.font = '9px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText('[E] INTERACT', px, py + 3);

  ctx.restore();
}

function drawTimeOfDayFilter(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hour: number
) {
  if (hour >= 18 && hour < 20) {
    // Warm sunset tint
    ctx.fillStyle = 'rgba(249, 115, 22, 0.14)';
    ctx.fillRect(0, 0, w, h);
  } else if (hour >= 20 || hour < 7) {
    // Night blue ambient tint
    ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
    ctx.fillRect(0, 0, w, h);
  }
}

// --------------------------------------------------------------------------
// CUSTOM PIXEL COLLAPSE ANIMATION (HEALTH <= 0 SUBSTANCE COLLAPSE)
// --------------------------------------------------------------------------
function drawCollapseAnimation(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  avatar: AvatarConfig,
  stage: number, // 0: stumbling, 1: knees & breathless, 2: flat on pavement
  tick: number
) {
  ctx.save();
  ctx.translate(px, py);

  if (stage === 0) {
    // Stage 0: Stumbling unsteadily with dizziness
    const wobble = Math.sin(tick * 0.25) * 8;
    ctx.rotate((wobble * Math.PI) / 180);

    // Dizzy yellow stars circling overhead
    for (let i = 0; i < 3; i++) {
      const angle = tick * 0.15 + (i * Math.PI * 2) / 3;
      const sx = Math.cos(angle) * 22;
      const sy = -80 + Math.sin(angle) * 8;
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(sx, sy, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Legs & Shoes
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-12, -10, 8, 10);
    ctx.fillRect(4, -10, 8, 10);
    // Slumped Pants
    ctx.fillStyle = avatar.pantsColor || '#1e3a8a';
    ctx.fillRect(-12, -26, 24, 16);
    // Torso tilted
    ctx.fillStyle = avatar.shirtColor || '#ffffff';
    ctx.fillRect(-12, -48, 24, 22);
    // Ashen head slumping forward
    ctx.fillStyle = '#dcd5cc';
    ctx.beginPath();
    ctx.arc(0, -60, 18, 0, Math.PI * 2);
    ctx.fill();
    // Spiral dizzy eyes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(-6, -62, 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(6, -62, 3, 0, Math.PI * 2);
    ctx.stroke();

    // Sweatdrop
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(16, -72, 3.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (stage === 1) {
    // Stage 1: Drops to knees, clutching chest/neck, breathless
    ctx.translate(0, 16); // Lowered closer to floor

    // Bent kneeling legs
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-16, -6, 14, 6);
    ctx.fillRect(2, -6, 14, 6);
    ctx.fillStyle = avatar.pantsColor || '#1e3a8a';
    ctx.fillRect(-14, -18, 28, 12);
    // Torso clutching chest
    ctx.fillStyle = avatar.shirtColor || '#ffffff';
    ctx.fillRect(-12, -36, 24, 18);
    // Hands clutching chest
    ctx.fillStyle = '#dcd5cc';
    ctx.fillRect(-6, -28, 12, 6);

    // Drooped head
    ctx.fillStyle = '#dcd5cc';
    ctx.beginPath();
    ctx.arc(0, -48, 17, 0, Math.PI * 2);
    ctx.fill();
    // Strained eyes
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-8, -50);
    ctx.lineTo(-3, -48);
    ctx.moveTo(3, -48);
    ctx.lineTo(8, -50);
    ctx.stroke();

    // SPEECH BUBBLE: "I can't... breathe..." (User Request 4.1)
    const bubbleW = 150;
    const bubbleH = 34;
    const bx = -bubbleW / 2;
    const by = -96;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(bx, by, bubbleW, bubbleH, 6);
    ctx.fill();
    ctx.stroke();

    // Tail pointer
    ctx.beginPath();
    ctx.moveTo(0, by + bubbleH);
    ctx.lineTo(0, by + bubbleH + 8);
    ctx.lineTo(8, by + bubbleH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fee2e2';
    ctx.font = 'bold 8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText("I can't...", 0, by + 13);
    ctx.fillText('breathe...', 0, by + 26);
    ctx.textAlign = 'left';
  } else {
    // Stage 2: Falls flat on the ground
    ctx.translate(0, 24);

    // Lying flat horizontally
    ctx.fillStyle = '#1e293b'; // Shoes
    ctx.fillRect(-35, -4, 10, 8);
    ctx.fillStyle = avatar.pantsColor || '#1e3a8a'; // Pants
    ctx.fillRect(-25, -6, 20, 10);
    ctx.fillStyle = avatar.shirtColor || '#ffffff'; // Shirt
    ctx.fillRect(-5, -8, 22, 12);
    ctx.fillStyle = '#dcd5cc'; // Head on pavement
    ctx.beginPath();
    ctx.arc(26, -5, 14, 0, Math.PI * 2);
    ctx.fill();

    // Knocked out cross eyes
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    // Cross 1
    ctx.beginPath();
    ctx.moveTo(22, -8);
    ctx.lineTo(26, -4);
    ctx.moveTo(26, -8);
    ctx.lineTo(22, -4);
    // Cross 2
    ctx.moveTo(29, -8);
    ctx.lineTo(33, -4);
    ctx.moveTo(33, -8);
    ctx.lineTo(29, -4);
    ctx.stroke();
  }

  ctx.restore();
}

