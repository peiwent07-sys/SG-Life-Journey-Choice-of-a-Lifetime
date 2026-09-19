// SceneObjects.ts
// Renders interactable objects and NPCs in the game scenes
import { InteractableObject } from '../types';

export function drawSceneObject(
  ctx: CanvasRenderingContext2D,
  obj: InteractableObject,
  roomId: string,
  tick: number,
  isNearest: boolean
) {
  const { x, y, w, h, id } = obj;

  ctx.save();

  // Subtle highlight glow if player is near
  if (isNearest) {
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 14;
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 2, y - 2, w + 4, h + 4);
  }

  switch (id) {
    // -------------------------------------------------------------
    // PHOTO 1 REFERENCE: Wooden bed with light-blue and white checkered duvet
    // -------------------------------------------------------------
    case 'bed': {
      // Wooden bed headboard and frame (Photo 1)
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x, y + 5, 12, h - 5); // Headboard
      ctx.fillRect(x, y + 22, w, h - 22); // Bed frame base

      // Mattress
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 12, y + 16, w - 16, h - 24);

      // Light-blue and white checkered bedsheet & duvet (Photo 1)
      const checkW = 10;
      const checkH = 8;
      const duvetX = x + 25;
      const duvetY = y + 26;
      const duvetW = w - 30;
      const duvetH = h - 30;

      for (let cy = duvetY; cy < duvetY + duvetH; cy += checkH) {
        for (let cx = duvetX; cx < duvetX + duvetW; cx += checkW) {
          const isBlue = (Math.floor((cx - duvetX) / checkW) + Math.floor((cy - duvetY) / checkH)) % 2 === 0;
          ctx.fillStyle = isBlue ? '#93c5fd' : '#ffffff';
          ctx.fillRect(cx, cy, checkW, checkH);
        }
      }

      // Pale blue pillow (Photo 1)
      ctx.fillStyle = '#bfdbfe';
      ctx.beginPath();
      ctx.roundRect(x + 14, y + 18, 28, 16, 4);
      ctx.fill();
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 1;
      ctx.stroke();
      break;
    }

    // -------------------------------------------------------------
    // PHOTO 1 REFERENCE: Study desk with Ten-Year Series textbooks & lamp
    // -------------------------------------------------------------
    case 'study_desk': {
      // Wooden desk
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(x, y + 20, w, h - 20);
      // Desk legs
      ctx.fillStyle = '#713f12';
      ctx.fillRect(x + 4, y + 28, 8, h - 28);
      ctx.fillRect(x + w - 12, y + 28, 8, h - 28);

      // Stack of Ten-Year Series (TYS) practice textbooks (Photo 1)
      ctx.fillStyle = '#dc2626'; // Red TYS Math
      ctx.fillRect(x + 12, y + 12, 28, 8);
      ctx.fillStyle = '#2563eb'; // Blue TYS Science
      ctx.fillRect(x + 10, y + 4, 30, 8);

      // Modern gooseneck desk lamp (Photo 1)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x + w - 18, y + 20);
      ctx.quadraticCurveTo(x + w - 15, y - 6, x + w - 28, y - 2);
      ctx.stroke();
      // Lamp shade
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + w - 34, y - 4, 12, 10);
      break;
    }

    // -------------------------------------------------------------
    // PHOTOS 4 & 5 REFERENCE: Ice Cream Uncle Cart with green & orange umbrella
    // -------------------------------------------------------------
    case 'ice_cream_cart': {
      // Motorcycle front & wheels
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(x + 20, y + h - 12, 12, 0, Math.PI * 2);
      ctx.arc(x + w - 20, y + h - 12, 12, 0, Math.PI * 2);
      ctx.fill();

      // Red and silver freezer box
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x + 15, y + 28, w - 28, h - 36);
      ctx.fillStyle = '#e2e8f0'; // Stainless steel freezer lid
      ctx.fillRect(x + 18, y + 22, w - 34, 8);

      // Wafer boxes and rainbow bread on display
      ctx.fillStyle = '#fef08a'; // Wafer biscuits
      ctx.fillRect(x + 24, y + 16, 16, 7);
      ctx.fillStyle = '#f472b6'; // Rainbow bread pink
      ctx.fillRect(x + 44, y + 16, 8, 7);
      ctx.fillStyle = '#4ade80'; // Rainbow bread green
      ctx.fillRect(x + 52, y + 16, 8, 7);

      // The Legendary Green & Orange Segmented Umbrella (Photos 4 & 5)
      const umbX = x + w / 2;
      const umbY = y + 12;
      const radius = 50;

      // Umbrella pole
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(umbX, umbY);
      ctx.lineTo(umbX, y + 28);
      ctx.stroke();

      // 6 Segmented slices alternating Green and Orange
      const slices = 6;
      for (let s = 0; s < slices; s++) {
        const startAngle = Math.PI + (s * Math.PI) / slices;
        const endAngle = Math.PI + ((s + 1) * Math.PI) / slices;
        ctx.fillStyle = s % 2 === 0 ? '#16a34a' : '#ea580c'; // Green vs Orange
        ctx.beginPath();
        ctx.moveTo(umbX, umbY);
        ctx.arc(umbX, umbY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
      }
      break;
    }

    // -------------------------------------------------------------
    // PHOTO 9 REFERENCE: Traditional Spinning Spiral Barber Pole
    // -------------------------------------------------------------
    case 'barber_pole': {
      // Chrome top and bottom mounting caps (Photo 9)
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(x + 25, y + 10, 36, 12);
      ctx.fillRect(x + 25, y + h - 18, 36, 12);

      // Cylindrical glass housing
      const poleX = x + 28;
      const poleY = y + 22;
      const poleW = 30;
      const poleH = h - 40;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(poleX, poleY, poleW, poleH);

      // Spinning diagonal helical stripes: Red, White, Blue (Photo 9)
      const stripeHeight = 16;
      const offset = (tick * 1.2) % (stripeHeight * 3);

      ctx.save();
      ctx.beginPath();
      ctx.rect(poleX, poleY, poleW, poleH);
      ctx.clip();

      for (let sy = -stripeHeight * 2; sy < poleH + stripeHeight * 2; sy += stripeHeight * 3) {
        const currentY = poleY + sy + offset;

        // Red stripe
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.moveTo(poleX, currentY);
        ctx.lineTo(poleX + poleW, currentY + 12);
        ctx.lineTo(poleX + poleW, currentY + 12 + stripeHeight);
        ctx.lineTo(poleX, currentY + stripeHeight);
        ctx.closePath();
        ctx.fill();

        // Blue stripe
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.moveTo(poleX, currentY + stripeHeight * 2);
        ctx.lineTo(poleX + poleW, currentY + stripeHeight * 2 + 12);
        ctx.lineTo(poleX + poleW, currentY + stripeHeight * 3);
        ctx.lineTo(poleX, currentY + stripeHeight * 2.5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Glass highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(poleX + 3, poleY, 5, poleH);
      break;
    }

    // -------------------------------------------------------------
    // PHOTO 9 REFERENCE: Uncle sitting outside on plastic chair reading newspaper
    // -------------------------------------------------------------
    case 'newspaper_uncle': {
      // White plastic kopitiam / void deck chair (Photo 9)
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 20, y + 35, 35, 8); // Seat
      ctx.fillRect(x + 18, y + 15, 6, 28); // Backrest
      ctx.fillRect(x + 22, y + 42, 5, 28); // Front leg
      ctx.fillRect(x + 48, y + 42, 5, 28); // Back leg

      // Uncle in printed casual batik shirt sitting down (Photo 9)
      // Legs in grey shorts
      ctx.fillStyle = '#475569';
      ctx.fillRect(x + 28, y + 36, 20, 16);
      ctx.fillRect(x + 36, y + 50, 7, 20);

      // Printed patterned shirt
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 22, y + 16, 22, 22);
      ctx.fillStyle = '#facc15'; // Pattern dots
      ctx.fillRect(x + 26, y + 20, 3, 3);
      ctx.fillRect(x + 34, y + 26, 3, 3);

      // Uncle Head & spectacles
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(x + 32, y + 8, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#334155'; // Grey hair
      ctx.beginPath();
      ctx.arc(x + 32, y + 5, 9, Math.PI, Math.PI * 2);
      ctx.fill();
      // Glasses
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 34, y + 6, 6, 4);

      // Open physical newspaper spread in hands (Photo 9)
      const paperBob = Math.sin(tick * 0.08) * 1.5;
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 38, y + 12 + paperBob, 36, 28);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 38, y + 12 + paperBob, 36, 28);
      // Newspaper headlines & columns
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 42, y + 16 + paperBob, 28, 4); // Headline
      ctx.fillStyle = '#64748b';
      for (let ny = y + 23; ny < y + 36; ny += 4) {
        ctx.fillRect(x + 42, ny + paperBob, 12, 2);
        ctx.fillRect(x + 56, ny + paperBob, 14, 2);
      }
      break;
    }

    // -------------------------------------------------------------
    // PHOTO 9 REFERENCE: Bright Red Coca-Cola Vintage Vending Machine
    // -------------------------------------------------------------
    case 'coke_machine': {
      // Coca-Cola Red rectangular cabinet (Photo 9)
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x, y + 5, w, h - 5);
      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y + 5, w, h - 5);

      // Illuminated brand header
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 10, y + 14, w - 20, 18);
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 7px "Press Start 2P"';
      ctx.fillText('COLD DRINKS', x + 13, y + 26);

      // Illuminated display glass with drink selection buttons
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 10, y + 36, w - 20, 32);

      // Cans inside
      const canColors = ['#dc2626', '#16a34a', '#2563eb', '#f59e0b'];
      for (let c = 0; c < 4; c++) {
        ctx.fillStyle = canColors[c];
        ctx.fillRect(x + 14 + c * 13, y + 42, 9, 14);
        // Push button
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(x + 15 + c * 13, y + 59, 7, 4);
      }

      // Coin slot and change return
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + w - 18, y + 74, 10, 12);
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + w - 14, y + 78, 2, 6);

      // Drink dispenser drop flap
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 14, y + h - 18, w - 28, 12);
      break;
    }

    // -------------------------------------------------------------
    // PHOTO 10 REFERENCE: Grand Staircase Study Spot
    // -------------------------------------------------------------
    case 'jc_staircase': {
      // Granite steps
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(x, y + 20, w, h - 20);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 8, y + 35, w - 16, h - 35);

      // High-level A-Level study binders and Ten-Year Series papers
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(x + 20, y + 15, 30, 10);
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(x + 18, y + 6, 32, 10);

      // Student backpack
      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(x + 60, y + 14, 26, 26);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 68, y + 20, 10, 6);
      break;
    }

    // -------------------------------------------------------------
    // PHOTO 10 REFERENCE: Terrace Red Railings (Peer Study Circle)
    // -------------------------------------------------------------
    case 'jc_red_railings': {
      // Signature bright red handrails from Photo 10
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x, y + 15);
      ctx.lineTo(x + w, y + 15);
      ctx.moveTo(x, y + 28);
      ctx.lineTo(x + w, y + 28);
      ctx.stroke();

      // Posts
      for (let rx = x + 15; rx < x + w; rx += 30) {
        ctx.beginPath();
        ctx.moveTo(rx, y + 5);
        ctx.lineTo(rx, y + h);
        ctx.stroke();
      }

      // 2 JC students in crisp white uniforms discussing notes
      const peers = [x + 25, x + 70];
      peers.forEach((px, i) => {
        const nod = Math.sin(tick * 0.1 + i) * 2;
        // Body
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px - 8, y + 25 + nod, 16, 24);
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(px - 7, y + 49 + nod, 14, 20);
        // Head
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(px, y + 16 + nod, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(px, y + 13 + nod, 8, Math.PI, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // -------------------------------------------------------------
    // IMAGE 6 REFERENCE: Junior College Campus Laptop Study Station
    // -------------------------------------------------------------
    case 'jc_laptop_station': {
      // Modern campus study desk (Light natural wood top with white frame)
      ctx.fillStyle = '#f8fafc'; // White frame
      ctx.fillRect(x + 6, y + 36, 6, h - 36);
      ctx.fillRect(x + w - 12, y + 36, 6, h - 36);
      // Desk tabletop
      ctx.fillStyle = '#fde68a'; // Warm birch wood
      ctx.fillRect(x, y + 30, w, 8);
      ctx.fillStyle = '#d97706';
      ctx.fillRect(x, y + 38, w, 2);

      // Ergonomic mesh office study chair
      ctx.fillStyle = '#334155';
      ctx.fillRect(x + w / 2 - 12, y + 42, 24, 20); // Chair seat
      ctx.fillRect(x + w / 2 - 10, y + 22, 20, 20); // Mesh backrest
      ctx.fillStyle = '#64748b';
      ctx.fillRect(x + w / 2 - 2, y + 62, 4, 8);

      // Sleek silver laptop computer open on desk (Image 6)
      const lapX = x + w / 2 - 18;
      const lapY = y + 16;
      // Laptop base & keyboard
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(lapX - 2, lapY + 12, 38, 5);
      ctx.fillStyle = '#1e293b'; // Keyboard keys
      ctx.fillRect(lapX + 2, lapY + 13, 30, 3);
      // Open angled screen
      ctx.fillStyle = '#475569';
      ctx.fillRect(lapX, lapY - 10, 34, 22);
      // Glowing LCD display
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(lapX + 2, lapY - 8, 30, 18);

      // Screen content: Browser window with glowing cyan and warning alert icon (Image 6)
      ctx.fillStyle = '#0284c7'; // Browser header
      ctx.fillRect(lapX + 2, lapY - 8, 30, 4);
      ctx.fillStyle = '#38bdf8'; // Web content text lines
      ctx.fillRect(lapX + 4, lapY - 2, 16, 2);
      ctx.fillRect(lapX + 4, lapY + 2, 20, 2);
      // Glowing orange alert badge on screen
      const pulseAlert = Math.sin(tick * 0.15) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(249, 115, 22, ${pulseAlert})`;
      ctx.fillRect(lapX + 22, lapY - 2, 6, 6);

      // Coffee mug with rising steam vapor
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 8, y + 22, 9, 10);
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(x + 10, y + 18, 5, 4); // Steam
      // Spiral notebook & pen
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + w - 24, y + 26, 16, 6);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x + w - 22, y + 28, 12, 2);
      break;
    }

    // -------------------------------------------------------------
    // IMAGE 8 REFERENCE: Central Narcotics Bureau (CNB) #DRUGFREESG Booth
    // -------------------------------------------------------------
    case 'jc_ambassador_booth': {
      // 1. TALL CNB #DRUGFREESG PULL-UP BANNER STANDEE (Image 8 Left)
      const bStandX = x + 4;
      const bStandY = y - 18;
      const bStandW = 42;
      const bStandH = h + 16;

      // Banner background (Deep Teal to Jade Gradient)
      const bGrad = ctx.createLinearGradient(bStandX, bStandY, bStandX, bStandY + bStandH);
      bGrad.addColorStop(0, '#0f766e');
      bGrad.addColorStop(0.5, '#0d9488');
      bGrad.addColorStop(1, '#064e3b');
      ctx.fillStyle = bGrad;
      ctx.fillRect(bStandX, bStandY, bStandW, bStandH);
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(bStandX, bStandY, bStandW, bStandH);

      // Looped Teal Anti-Drug Ribbon emblem on top (Image 8)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(bStandX + bStandW / 2, bStandY + 12, 7, 0, Math.PI * 2);
      ctx.fill();
      // Teal ribbon geometry
      ctx.strokeStyle = '#0d9488';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bStandX + bStandW / 2, bStandY + 11, 4, Math.PI, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(bStandX + bStandW / 2 - 4, bStandY + 11);
      ctx.lineTo(bStandX + bStandW / 2 + 3, bStandY + 17);
      ctx.moveTo(bStandX + bStandW / 2 + 4, bStandY + 11);
      ctx.lineTo(bStandX + bStandW / 2 - 3, bStandY + 17);
      ctx.stroke();

      // Banner Typography (Image 8)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 5px sans-serif';
      ctx.fillText('#DRUGFREESG', bStandX + 3, bStandY + 25);
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 4px sans-serif';
      ctx.fillText('SAY NO TO DRUGS', bStandX + 2, bStandY + 33);
      ctx.fillStyle = '#ffffff';
      ctx.font = '4px sans-serif';
      ctx.fillText('PROTECT YOUR', bStandX + 3, bStandY + 40);
      ctx.fillText('LOVED ONES', bStandX + 5, bStandY + 46);

      // 2. INTERACTIVE DIGITAL QUIZ VENDING MACHINE (Image 8 Right)
      const vendX = x + w - 38;
      const vendY = y - 10;
      const vendW = 34;
      const vendH = h + 8;

      // Teal Kiosk Chassis
      ctx.fillStyle = '#115e59';
      ctx.fillRect(vendX, vendY, vendW, vendH);
      ctx.strokeStyle = '#5eead4';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(vendX, vendY, vendW, vendH);

      // Header: "TAKE OUR QUIZ & WIN FREE PREMIUMS" (Image 8)
      ctx.fillStyle = '#042f2e';
      ctx.fillRect(vendX + 2, vendY + 3, vendW - 4, 12);
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 3.5px sans-serif';
      ctx.fillText('TAKE OUR QUIZ', vendX + 3, vendY + 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('& WIN PREMIUMS', vendX + 3, vendY + 13);

      // Glowing Interactive Digital Touchscreen (Image 8)
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(vendX + 3, vendY + 18, vendW - 6, 26);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 4px "Press Start 2P", monospace';
      ctx.fillText('QUIZ', vendX + 8, vendY + 28);
      // "START NOW" green button
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(vendX + 6, vendY + 34, vendW - 12, 7);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 3.5px sans-serif';
      ctx.fillText('START', vendX + 9, vendY + 39);

      // Dispenser slot at base for prizes and anti-drug badges
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(vendX + 6, vendY + vendH - 12, vendW - 12, 6);
      ctx.fillStyle = '#2dd4bf'; // Prize ribbon peeking out
      ctx.fillRect(vendX + 10, vendY + vendH - 10, 8, 3);

      // 3. EXHIBITION TABLE DRAPED IN PLEATED WHITE TABLECLOTH (Image 8 Center)
      const tblX = x + 38;
      const tblY = y + 26;
      const tblW = w - 66;
      const tblH = h - 26;

      // Tabletop
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(tblX - 4, tblY, tblW + 8, 6);
      // Crisp white pleated tablecloth
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tblX, tblY + 6, tblW, tblH - 6);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      // Pleats
      for (let pl = tblX + 6; pl < tblX + tblW; pl += 8) {
        ctx.beginPath();
        ctx.moveTo(pl, tblY + 6);
        ctx.lineTo(pl, tblY + tblH);
        ctx.stroke();
      }

      // GARLAND OF MINI #DRUGFREESG TEAL FOLDED PAPER RIBBONS (Image 8)
      // Hanging string garland across front of tablecloth
      ctx.strokeStyle = '#0d9488';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tblX + 2, tblY + 12);
      ctx.quadraticCurveTo(tblX + tblW / 2, tblY + 20, tblX + tblW - 2, tblY + 12);
      ctx.stroke();

      // Mini teal folded ribbons pinned to string
      for (let r = 0; r < 4; r++) {
        const rx = tblX + 8 + r * 11;
        const ry = tblY + 14 + Math.sin((r / 3) * Math.PI) * 4;
        ctx.fillStyle = '#0d9488';
        ctx.beginPath();
        ctx.ellipse(rx, ry, 2.5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(rx - 1.5, ry + 2, 1, 3);
        ctx.fillRect(rx + 0.5, ry + 2, 1, 3);
      }

      // Tabletop display: Tray full of folded ribbons and DIY Captain Drug Buster models (Image 8)
      ctx.fillStyle = '#0f766e'; // Green tray
      ctx.fillRect(tblX + 4, tblY - 4, 16, 5);
      ctx.fillStyle = '#2dd4bf'; // Folded ribbons in tray
      ctx.fillRect(tblX + 6, tblY - 3, 12, 3);

      // Captain Drug Buster paper figurine
      ctx.fillStyle = '#dc2626'; // Red cape
      ctx.fillRect(tblX + tblW - 14, tblY - 8, 8, 9);
      ctx.fillStyle = '#fed7aa'; // Head
      ctx.fillRect(tblX + tblW - 12, tblY - 11, 4, 4);
      break;
    }

    // -------------------------------------------------------------
    // Void Deck Stone Chess Table with Terrazzo Top & Stools (Fixes Grey Block)
    // -------------------------------------------------------------
    case 'chess_table': {
      // Concrete round base
      ctx.fillStyle = '#64748b';
      ctx.fillRect(x + w / 2 - 12, y + 25, 24, h - 30);
      ctx.fillStyle = '#475569';
      ctx.fillRect(x + w / 2 - 10, y + h - 10, 20, 8);

      // Terrazzo Table Top (Speckled Stone pattern)
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 22, w / 2 - 4, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Terrazzo specks
      const specks = [
        { dx: -18, dy: -4, c: '#0f172a' },
        { dx: 14, dy: 6, c: '#78350f' },
        { dx: -8, dy: 8, c: '#b91c1c' },
        { dx: 20, dy: -5, c: '#0284c7' },
        { dx: -22, dy: 4, c: '#334155' }
      ];
      specks.forEach(sp => {
        ctx.fillStyle = sp.c;
        ctx.fillRect(x + w / 2 + sp.dx, y + 22 + sp.dy, 2, 2);
      });

      // Etched Chessboard Square (8x8 pixel grid)
      const boardSize = 24;
      const bLeft = x + w / 2 - boardSize / 2;
      const bTop = y + 12;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(bLeft - 1, bTop - 1, boardSize + 2, boardSize + 2);
      const sq = boardSize / 6;
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          ctx.fillStyle = (r + c) % 2 === 0 ? '#f8fafc' : '#334155';
          ctx.fillRect(bLeft + c * sq, bTop + r * sq, sq, sq);
        }
      }

      // Small chess pieces on board
      ctx.fillStyle = '#ef4444'; // Red piece
      ctx.fillRect(bLeft + sq * 2 + 1, bTop + sq * 2 + 1, 2, 3);
      ctx.fillStyle = '#38bdf8'; // Blue piece
      ctx.fillRect(bLeft + sq * 4 + 1, bTop + sq * 3 + 1, 2, 3);

      // Kopitiam Glass Coffee Cup & Saucer
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + w / 2 + 20, y + 18, 9, 3); // Saucer
      ctx.fillStyle = '#78350f'; // Dark Kopi
      ctx.fillRect(x + w / 2 + 21, y + 12, 7, 7);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; // Glass shine
      ctx.fillRect(x + w / 2 + 21, y + 12, 2, 7);

      // Surrounding Concrete Stools
      const stools = [
        { sx: x + 8, sy: y + 26 },
        { sx: x + w - 18, sy: y + 26 },
        { sx: x + w / 2 - 8, sy: y + h - 16 }
      ];
      stools.forEach(st => {
        ctx.fillStyle = '#475569';
        ctx.fillRect(st.sx + 2, st.sy + 6, 8, 10);
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.ellipse(st.sx + 6, st.sy + 4, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      break;
    }

    // -------------------------------------------------------------
    // Void Deck Uncle NPC (Sitting at Stone Bench with Kopi)
    // -------------------------------------------------------------
    case 'voiddeck_uncle': {
      const breath = Math.sin(tick * 0.08) * 1.5;

      // Concrete Stool Seat
      ctx.fillStyle = '#475569';
      ctx.fillRect(x + 18, y + 40, 14, 18);
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.ellipse(x + 25, y + 38, 14, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Uncle in white singlet / polo & bermuda shorts
      // Legs in shorts
      ctx.fillStyle = '#475569'; // Grey Bermuda shorts
      ctx.fillRect(x + 16, y + 30, 18, 14);
      // Uncle Legs
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(x + 18, y + 42, 5, 14);
      ctx.fillRect(x + 27, y + 42, 5, 14);
      // Slippers
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 16, y + 54, 9, 3);
      ctx.fillRect(x + 25, y + 54, 9, 3);

      // Torso in white singlet
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 14, y + 14 + breath, 22, 18);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 14, y + 14 + breath, 22, 18);

      // Arms (one resting, one holding coffee cup)
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(x + 8, y + 18 + breath, 6, 12);
      ctx.fillRect(x + 36, y + 16 + breath, 10, 5);

      // Hot Kopi in glass cup
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x + 44, y + 12 + breath, 6, 8);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 43, y + 20 + breath, 8, 2);
      // Rising steam
      const steamBob = (tick * 0.8) % 15;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(x + 46, y + 8 - steamBob + breath, 2, 3);

      // Head with spectacles & silver hair
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(x + 25, y + 6 + breath, 9, 0, Math.PI * 2);
      ctx.fill();
      // Silver-grey hair
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(x + 25, y + 3 + breath, 9, Math.PI, Math.PI * 2);
      ctx.fill();
      // Reading glasses
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(x + 22, y + 4 + breath, 4, 3);
      ctx.strokeRect(x + 28, y + 4 + breath, 4, 3);
      ctx.beginPath();
      ctx.moveTo(x + 26, y + 5 + breath);
      ctx.lineTo(x + 28, y + 5 + breath);
      ctx.stroke();

      // Warm friendly smile
      ctx.strokeStyle = '#9a3412';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(x + 25, y + 9 + breath, 3, 0.2, Math.PI - 0.2);
      ctx.stroke();
      break;
    }

    // -------------------------------------------------------------
    // Iconic Dragon Playground Swings (Mosaic Tile Dragon Head & Swings)
    // -------------------------------------------------------------
    case 'playground': {
      // Golden sandpit ground base
      ctx.fillStyle = '#d4a373';
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h - 8, w / 2 + 6, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sand specks
      ctx.fillStyle = '#b08968';
      ctx.fillRect(x + 15, y + h - 6, 2, 2);
      ctx.fillRect(x + 45, y + h - 10, 2, 2);
      ctx.fillRect(x + w - 25, y + h - 7, 2, 2);

      // THE ICONIC TOA PAYOH DRAGON HEAD (Orange & Yellow Mosaic Tiles)
      const dX = x + 10;
      const dY = y + 8;

      // Dragon Head Silhouette
      ctx.fillStyle = '#ea580c'; // Vibrant Orange Mosaic
      ctx.beginPath();
      ctx.moveTo(dX, dY + 35);
      ctx.lineTo(dX + 20, dY + 10);
      ctx.lineTo(dX + 45, dY + 6);
      ctx.lineTo(dX + 50, dY + 18);
      ctx.lineTo(dX + 40, dY + 30);
      ctx.lineTo(dX + 55, dY + 36);
      ctx.lineTo(dX + 42, dY + 48);
      ctx.lineTo(dX + 15, dY + 48);
      ctx.closePath();
      ctx.fill();

      // Yellow Mosaic Tile Accents on Dragon Crest & Snout
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.moveTo(dX + 18, dY + 12);
      ctx.lineTo(dX + 35, dY + 8);
      ctx.lineTo(dX + 32, dY + 22);
      ctx.lineTo(dX + 15, dY + 24);
      ctx.closePath();
      ctx.fill();

      // Mosaic Grid Lines on Dragon Head
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.lineWidth = 1;
      for (let mx = dX + 5; mx < dX + 48; mx += 6) {
        ctx.beginPath();
        ctx.moveTo(mx, dY + 10);
        ctx.lineTo(mx, dY + 45);
        ctx.stroke();
      }
      for (let my = dY + 12; my < dY + 45; my += 6) {
        ctx.beginPath();
        ctx.moveTo(dX + 5, my);
        ctx.lineTo(dX + 50, my);
        ctx.stroke();
      }

      // Dragon Eye (Round black pupil with white gleam)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(dX + 28, dY + 18, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(dX + 29, dY + 16, 2, 2);

      // Dragon Nostril
      ctx.fillStyle = '#7c2d12';
      ctx.fillRect(dX + 6, dY + 32, 4, 3);

      // Galvanised Steel Tubular Pipe Frame
      ctx.strokeStyle = '#0284c7'; // Blue tubular steel spine
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(dX + 45, dY + 24);
      ctx.lineTo(x + w - 10, dY + 24);
      ctx.lineTo(x + w - 10, y + h - 10);
      ctx.stroke();

      // Diagonal support strut
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + w - 35, dY + 24);
      ctx.lineTo(x + w - 10, y + h - 10);
      ctx.stroke();

      // 2 Swing Chains with Gentle Sway Animation
      const swingSway = Math.sin(tick * 0.08) * 3.5;
      const swingPositions = [x + 60, x + 88];

      swingPositions.forEach(swX => {
        // Steel suspension chains
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(swX - 4, dY + 24);
        ctx.lineTo(swX - 4 + swingSway, y + 54);
        ctx.moveTo(swX + 4, dY + 24);
        ctx.lineTo(swX + 4 + swingSway, y + 54);
        ctx.stroke();

        // Rubber tire / swing seat
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(swX - 8 + swingSway, y + 54, 16, 4);
      });
      break;
    }

    // -------------------------------------------------------------
    // Open-Wall School Classroom Corridor Scene (Fixes Grey Block)
    // -------------------------------------------------------------
    case 'school_library':
    case 'school_classroom': {
      // Classroom back wall
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#38bdf8'; // Blue school accent trim
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      // Top lintel / corridor awning
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x, y, w, 8);

      // Large Classroom Green Chalkboard with wooden frame
      const cbX = x + 10;
      const cbY = y + 12;
      const cbW = 44;
      const cbH = 28;
      ctx.fillStyle = '#78350f'; // Wood frame
      ctx.fillRect(cbX - 2, cbY - 2, cbW + 4, cbH + 4);
      ctx.fillStyle = '#166534'; // Green Chalkboard
      ctx.fillRect(cbX, cbY, cbW, cbH);

      // Chalk equations & "PSLE / EXAM TIPS"
      ctx.fillStyle = '#f8fafc';
      ctx.font = '5px monospace';
      ctx.fillText('a²+b²=c²', cbX + 4, cbY + 8);
      ctx.fillText('PSLE TIPS', cbX + 3, cbY + 16);
      ctx.fillStyle = '#facc15';
      ctx.fillText('FOCUS!', cbX + 8, cbY + 24);

      // Teacher pixel sprite at chalkboard
      const teacherX = cbX + cbW + 6;
      const tNod = Math.sin(tick * 0.1) * 1.5;
      // Teacher Body (Smart blouse & skirt)
      ctx.fillStyle = '#9333ea';
      ctx.fillRect(teacherX, y + 20 + tNod, 10, 16);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(teacherX + 1, y + 36, 8, 12);
      // Teacher Head
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(teacherX + 5, y + 15 + tNod, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(teacherX + 5, y + 13 + tNod, 5, Math.PI, Math.PI * 2);
      ctx.fill();
      // Teacher pointing arm towards board
      ctx.strokeStyle = '#fed7aa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(teacherX, y + 24 + tNod);
      ctx.lineTo(teacherX - 6, y + 18);
      ctx.stroke();

      // 2 Wooden Student Desks with studying students
      const studentDesks = [x + w - 46, x + w - 22];
      studentDesks.forEach((deskX, sIdx) => {
        const sBob = Math.sin(tick * 0.12 + sIdx) * 1.5;

        // Wooden Desk
        ctx.fillStyle = '#b45309';
        ctx.fillRect(deskX, y + 32, 18, 14);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(deskX + 2, y + 46, 3, 10);
        ctx.fillRect(deskX + 13, y + 46, 3, 10);

        // Open White Notebook on desk
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(deskX + 4, y + 30, 8, 5);
        ctx.fillStyle = '#dc2626'; // Pen
        ctx.fillRect(deskX + 13, y + 30, 2, 5);

        // Student seated behind desk (Crisp white school uniform shirt)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(deskX + 3, y + 22 + sBob, 12, 10);
        // Navy shorts/pinafore
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(deskX + 4, y + 30 + sBob, 10, 6);

        // Student Head
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(deskX + 9, y + 17 + sBob, 5, 0, Math.PI * 2);
        ctx.fill();
        // Hair
        ctx.fillStyle = '#1c1917';
        ctx.beginPath();
        ctx.arc(deskX + 9, y + 15 + sBob, 5, Math.PI, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // -------------------------------------------------------------
    // Community HDB Ginger Cat (Void Deck)
    // -------------------------------------------------------------
    case 'ginger_cat': {
      const breath = Math.sin(tick * 0.1) * 2;
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.ellipse(x + 25, y + 20, 18, 12 + breath, 0, 0, Math.PI * 2);
      ctx.fill();
      // Cat ears
      ctx.fillStyle = '#c2410c';
      ctx.beginPath();
      ctx.moveTo(x + 15, y + 12);
      ctx.lineTo(x + 20, y + 4);
      ctx.lineTo(x + 25, y + 12);
      ctx.fill();
      // Tail
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 40, y + 20);
      ctx.quadraticCurveTo(x + 52, y + 10 + breath * 2, x + 46, y + 5);
      ctx.stroke();
      break;
    }

    // -------------------------------------------------------------
    // Ramly Burger Stall (Pasar Malam)
    // -------------------------------------------------------------
    case 'ramly_stall': {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x, y + 20, w, h - 20);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 10, y + 25, w - 20, 20);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x + 20, y + 28, 20, 12);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 55, y + 28, 22, 12);
      for (let s = 0; s < 3; s++) {
        const steamY = y + 15 - ((tick * 0.8 + s * 15) % 30);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(x + 25 + s * 25, steamY, 6, 6);
      }
      break;
    }

    // -------------------------------------------------------------
    // Chicken Rice Stall (Hawker)
    // -------------------------------------------------------------
    case 'chicken_rice_stall': {
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x, y, w, 20);
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px "Press Start 2P"';
      ctx.fillText('CHICKEN RICE', x + 6, y + 14);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.3)';
      ctx.fillRect(x + 5, y + 22, w - 10, h - 25);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(x + 18, y + 28, 14, 25);
      ctx.fillRect(x + 48, y + 28, 14, 25);
      ctx.fillRect(x + 78, y + 28, 14, 25);
      break;
    }

    // -------------------------------------------------------------
    // ION Canopy & MRT Bubble Entrance (Orchard)
    // -------------------------------------------------------------
    case 'ion_canopy_entrance': {
      // Modern glass curved canopy terminal
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(x, y + 10, w, h - 10, [12, 12, 0, 0]);
      ctx.fill();
      // Glass sheen
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fillRect(x + 8, y + 16, w - 16, 20);
      // MRT symbol
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x + 15, y + 42, (w - 30) / 2, 14);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(x + 15 + (w - 30) / 2, y + 42, (w - 30) / 2, 14);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px sans-serif';
      ctx.fillText('ION · MRT', x + w / 2 - 20, y + 52);
      break;
    }

    // -------------------------------------------------------------
    // Luxury Fashion Arcade (Orchard)
    // -------------------------------------------------------------
    case 'designer_boutique': {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x, y + 10, w, h - 10);
      // Polished gold border
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 4, y + 14, w - 8, h - 18);
      // Display window mannequin
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(x + w / 2 - 8, y + 26, 16, 24);
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 22, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // Singapore River Bumboat (Clarke Quay)
    // -------------------------------------------------------------
    case 'bumboat_cruise': {
      // Red boat hull
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(x, y + 45);
      ctx.lineTo(x + w, y + 45);
      ctx.lineTo(x + w - 15, y + h);
      ctx.lineTo(x + 15, y + h);
      ctx.closePath();
      ctx.fill();
      // Green passenger canopy
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(x + 12, y + 20, w - 24, 18);
      // Windows
      ctx.fillStyle = '#fef08a';
      for (let bx = x + 18; bx < x + w - 20; bx += 16) {
        ctx.fillRect(bx, y + 24, 10, 10);
      }
      break;
    }

    // -------------------------------------------------------------
    // MBS SkyPark Deck (Marina Bay Sands)
    // -------------------------------------------------------------
    case 'mbs_skypark_deck': {
      // SkyPark surfboard deck model
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.roundRect(x, y + 25, w, 22, 8);
      ctx.fill();
      // Aqua infinity pool
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x + 10, y + 28, w - 20, 8);
      // 3 hotel tower supports
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 12, y + 47, 18, h - 47);
      ctx.fillRect(x + w / 2 - 9, y + 47, 18, h - 47);
      ctx.fillRect(x + w - 30, y + 47, 18, h - 47);
      break;
    }

    // -------------------------------------------------------------
    // ArtScience Museum (Marina Bay Sands)
    // -------------------------------------------------------------
    case 'artscience_museum': {
      // Blooming lotus petals
      ctx.fillStyle = '#f8fafc';
      const cx = x + w / 2;
      const cy = y + h - 15;
      for (let p = -3; p <= 3; p++) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(cx + p * 16, cy - 35, cx + p * 18, cy - 55);
        ctx.quadraticCurveTo(cx + p * 12, cy - 25, cx, cy);
        ctx.fill();
      }
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, w / 2 - 10, 12, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }

    // -------------------------------------------------------------
    // Spectra Light & Water Show (Marina Bay Sands)
    // -------------------------------------------------------------
    case 'waterfront_light_show': {
      // Water fountain jets & laser projectors
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 15, y + 40, w - 30, h - 40);
      // Animated dancing water jets
      const jetWave = Math.sin(tick * 0.15) * 15;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 30, y + 40);
      ctx.quadraticCurveTo(x + 40, y + 10 + jetWave, x + 50, y + 40);
      ctx.moveTo(x + w - 50, y + 40);
      ctx.quadraticCurveTo(x + w - 40, y + 10 - jetWave, x + w - 30, y + 40);
      ctx.stroke();
      // Laser beam
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y + 40);
      ctx.lineTo(x + w / 2 + Math.sin(tick * 0.1) * 30, y + 5);
      ctx.stroke();
      break;
    }

    // -------------------------------------------------------------
    // Merlion Fountain (Merlion Park)
    // -------------------------------------------------------------
    case 'merlion_spout': {
      // Merlion miniature statue
      ctx.fillStyle = '#ffffff';
      // Head
      ctx.beginPath();
      ctx.arc(x + 35, y + 30, 16, 0, Math.PI * 2);
      ctx.fill();
      // Body
      ctx.fillRect(x + 25, y + 40, 20, 35);
      // Spouting water arc
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 45, y + 32);
      ctx.quadraticCurveTo(x + 75, y + 15, x + 90, y + 60);
      ctx.stroke();
      // Splashing water ripples
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(x + 85, y + 58, 12, 6);
      break;
    }

    // -------------------------------------------------------------
    // Jubilee Bridge (Merlion Park)
    // -------------------------------------------------------------
    case 'jubilee_bridge': {
      // Modern white pedestrian curved bridge
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 45);
      ctx.quadraticCurveTo(x + w / 2, y + 20, x + w - 10, y + 45);
      ctx.stroke();
      // Vertical tension supports
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      for (let bx = x + 25; bx < x + w - 20; bx += 18) {
        ctx.beginPath();
        ctx.moveTo(bx, y + 32);
        ctx.lineTo(bx, y + 60);
        ctx.stroke();
      }
      break;
    }

    // -------------------------------------------------------------
    // CNB Anti-Drug Pillar & Youth Pledge (Merlion Park / Changi)
    // -------------------------------------------------------------
    case 'anti_drug_pledge_post':
    case 'customs_cnb_counter': {
      // Interactive anti-drug digital kiosk
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 20, y + 15, w - 40, h - 20);
      // Digital screen
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 26, y + 22, w - 52, 36);
      // Glowing green CNB shield logo
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 36, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px sans-serif';
      ctx.fillText('CNB · 1800-600-0000', x + 24, y + 68);
      break;
    }

    // -------------------------------------------------------------
    // Changi ATC Tower & Aviation Viewing Deck (Changi Airport)
    // -------------------------------------------------------------
    case 'atc_tower_lookout': {
      // Miniature ATC Tower model
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + w / 2 - 8, y + 35, 16, h - 45);
      // Cabin
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + w / 2 - 16, y + 22, 32, 14);
      // Golf ball radome
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 14, 12, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // Jewel HSBC Rain Vortex (Changi Airport)
    // -------------------------------------------------------------
    case 'jewel_rain_vortex': {
      // Glass toroidal dome & 40m indoor waterfall
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 25, w / 2 - 10, 16, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Cascading water column
      const waterAnim = (tick * 2) % 15;
      const grad = ctx.createLinearGradient(0, y + 25, 0, y + h);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(1, '#0284c7');
      ctx.fillStyle = grad;
      ctx.fillRect(x + w / 2 - 8, y + 25, 16, h - 35);
      // Spray mist
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h - 10, 22, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // CHIJMES Gothic Chapel & Cloisters
    // -------------------------------------------------------------
    case 'chijmes_chapel': {
      // White gothic spire & rose window
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y + 10);
      ctx.lineTo(x + w / 2 + 18, y + 45);
      ctx.lineTo(x + w / 2 - 18, y + 45);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(x + 20, y + 45, w - 40, h - 50);
      // Amber stained-glass window
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 60, 10, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // Fairy-lit Lawn & Open Mic (CHIJMES)
    // -------------------------------------------------------------
    case 'cloister_courtyard': {
      // Acoustic stage & fairy lights
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x + 10, y + 45, w - 20, 20);
      // Microphone stand
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y + 45);
      ctx.lineTo(x + w / 2, y + 20);
      ctx.stroke();
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 18, 4, 0, Math.PI * 2);
      ctx.fill();
      // Acoustic guitar
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.ellipse(x + w / 2 - 14, y + 36, 8, 12, 0.4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // Alfresco Artisan Gelato (CHIJMES)
    // -------------------------------------------------------------
    case 'alfresco_gelato': {
      // Italian gelato glass vitrine
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 10, y + 25, w - 20, h - 30);
      // Gelato flavors (pistachio green, berry pink, vanilla)
      ctx.fillStyle = '#86efac';
      ctx.beginPath();
      ctx.arc(x + 25, y + 35, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f472b6';
      ctx.beginPath();
      ctx.arc(x + 45, y + 35, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(x + 65, y + 35, 8, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // Supertree Grove Canopy (Gardens by the Bay)
    // -------------------------------------------------------------
    case 'supertree_canopy': {
      // Miniature glowing supertree
      ctx.fillStyle = '#166534';
      ctx.fillRect(x + w / 2 - 10, y + 30, 20, h - 35);
      // Flared canopy
      ctx.fillStyle = '#581c87';
      ctx.beginPath();
      ctx.moveTo(x + 15, y + 12);
      ctx.lineTo(x + w - 15, y + 12);
      ctx.lineTo(x + w / 2 + 10, y + 35);
      ctx.lineTo(x + w / 2 - 10, y + 35);
      ctx.closePath();
      ctx.fill();
      // Neon pulsing ribs
      ctx.strokeStyle = (tick % 20 > 10) ? '#ec4899' : '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 25, y + 12);
      ctx.lineTo(x + w / 2, y + 35);
      ctx.lineTo(x + w - 25, y + 12);
      ctx.stroke();
      break;
    }

    // -------------------------------------------------------------
    // OCBC Skyway Walkway (Gardens by the Bay)
    // -------------------------------------------------------------
    case 'ocbc_skyway': {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 35);
      ctx.quadraticCurveTo(x + w / 2, y + 20, x + w - 10, y + 35);
      ctx.stroke();
      // Cable suspenders
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1;
      for (let cx = x + 20; cx < x + w - 15; cx += 15) {
        ctx.beginPath();
        ctx.moveTo(cx, y + 28);
        ctx.lineTo(cx, y + 45);
        ctx.stroke();
      }
      break;
    }

    // -------------------------------------------------------------
    // Cloud Forest Dome (Gardens by the Bay)
    // -------------------------------------------------------------
    case 'cloud_forest_dome': {
      // Glass biome dome with misty mountain
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 35, w / 2 - 12, 22, 0, Math.PI, 0);
      ctx.stroke();
      // Mountain waterfall
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.moveTo(x + w / 2 - 15, y + 45);
      ctx.lineTo(x + w / 2, y + 20);
      ctx.lineTo(x + w / 2 + 15, y + 45);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#bae6fd';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y + 24);
      ctx.lineTo(x + w / 2, y + 45);
      ctx.stroke();
      break;
    }

    // -------------------------------------------------------------
    // Secondary School & Grandstand Objects
    // -------------------------------------------------------------
    case 'sec_grandstand_steps': {
      // Stepped grandstand bleachers with revision notes
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x + 10, y + 40, w - 20, 20);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(x + 20, y + 20, w - 40, 20);
      // Study file & colorful highlighters
      ctx.fillStyle = '#38bdf8'; // Blue revision folder
      ctx.fillRect(x + 35, y + 16, 22, 14);
      ctx.fillStyle = '#facc15'; // Neon yellow highlighter
      ctx.fillRect(x + 62, y + 22, 12, 4);
      ctx.fillStyle = '#f43f5e'; // Pink pen
      ctx.fillRect(x + 62, y + 28, 12, 4);
      break;
    }

    case 'sec_running_track': {
      // Hurdle & running track gear
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 4;
      ctx.strokeRect(x + 15, y + 25, 45, 35);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 15, y + 22, 45, 6); // Hurdle top bar
      // Running shoes & sports water bottle
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(x + 70, y + 32, 14, 28); // Water bottle
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 72, y + 26, 10, 6); // Bottle cap
      break;
    }

    case 'sec_peer_leaders': {
      // Anti-drug peer support booth & poster
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 15, y + 15, w - 30, h - 25);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 20, y + 20, w - 40, 30);
      ctx.fillStyle = '#0369a1';
      ctx.font = 'bold 7px sans-serif';
      ctx.fillText('PEER SUPPORT', x + 24, y + 32);
      ctx.fillStyle = '#dc2626';
      ctx.fillText('DRUG-FREE SG', x + 26, y + 44);
      break;
    }

    // -------------------------------------------------------------
    // National Stadium (Taylor Swift Concert) Objects
    // -------------------------------------------------------------
    case 'taylor_concert_stage': {
      // Concert spotlight & diamond catwalk center
      ctx.fillStyle = '#f472b6';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 35, 34, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // Golden acoustic guitar stand
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y + 10);
      ctx.lineTo(x + w / 2, y + 42);
      ctx.stroke();
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 28, 8, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'lightup_wristband_booth': {
      // Interactive LED wristband dispenser box
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(x + 15, y + 15, w - 30, h - 25);
      // Glowing wristbands
      const colors = ['#06b6d4', '#ec4899', '#fbbf24', '#10b981'];
      for (let i = 0; i < 4; i++) {
        const c = colors[(i + Math.floor(tick / 10)) % colors.length];
        ctx.fillStyle = c;
        ctx.shadowColor = c;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x + 30 + i * 16, y + 38, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      break;
    }

    case 'concert_merch_corner': {
      // Friendship bracelets board & official tour cards
      ctx.fillStyle = '#4a044e';
      ctx.fillRect(x + 10, y + 15, w - 20, h - 25);
      // Colorful bead bracelets
      const beadColors = ['#f472b6', '#a78bfa', '#38bdf8', '#fbbf24', '#34d399'];
      for (let b = 0; b < 5; b++) {
        ctx.fillStyle = beadColors[b];
        ctx.beginPath();
        ctx.arc(x + 24 + b * 16, y + 32, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 7px sans-serif';
      ctx.fillText('FRIENDSHIP BRACELETS', x + 14, y + 48);
      break;
    }

    // -------------------------------------------------------------
    // Marina Bay Street Circuit (F1) Objects
    // -------------------------------------------------------------
    case 'f1_grandstand_seats': {
      // Red F1 bucket seats & racing binoculars
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x + 15, y + 25, 35, 30);
      ctx.fillRect(x + 55, y + 25, 35, 30);
      // F1 Team Cap
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(x + 32, y + 20, 10, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'f1_paddock_lounge': {
      // Racing telemetry monitor & steering wheel
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 15, y + 12, w - 30, 40);
      ctx.fillStyle = '#22c55e';
      ctx.font = '7px monospace';
      ctx.fillText('SECTOR 1: 27.8s', x + 20, y + 26);
      ctx.fillText('MAX SPEED: 318kmh', x + 20, y + 38);
      // F1 Steering wheel
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 62, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'f1_merch_pit': {
      // Checkered flags & youth anti-drug commitment banner
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 15, y + 15, w - 30, h - 25);
      // Checkered pattern
      for (let cx = x + 20; cx < x + w - 25; cx += 10) {
        ctx.fillStyle = ((cx / 10) % 2 === 0) ? '#ffffff' : '#000000';
        ctx.fillRect(cx, y + 20, 10, 10);
      }
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 7px sans-serif';
      ctx.fillText('CLEAN ENERGY & SPORT', x + 18, y + 42);
      break;
    }

    // -------------------------------------------------------------
    // Singapore Zoo Objects
    // -------------------------------------------------------------
    case 'zoo_red_rhino': {
      // Sculpted bright red rhinoceros statue (Photo 2)
      ctx.fillStyle = '#475569';
      ctx.fillRect(x + 10, y + 45, w - 20, 15); // Plinth
      // Red rhino body & horn
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(x + 45, y + 30, 24, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      // Horn
      ctx.beginPath();
      ctx.moveTo(x + 18, y + 24);
      ctx.quadraticCurveTo(x + 10, y + 14, x + 22, y + 18);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'zoo_orangutan_enclosure': {
      // Wooden boardwalk & hanging rope with tropical fruits
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x + 15, y + 15, 8, 45);
      ctx.fillRect(x + w - 23, y + 15, 8, 45);
      ctx.fillRect(x + 15, y + 20, w - 30, 8);
      // Tropical bananas & papaya
      ctx.fillStyle = '#facc15'; // Bananas
      ctx.beginPath();
      ctx.arc(x + w / 2 - 8, y + 36, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ea580c'; // Papaya
      ctx.beginPath();
      ctx.arc(x + w / 2 + 8, y + 36, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'zoo_tram_station': {
      // Mandai safari zebra-striped tram car
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 15, y + 20, w - 30, 36);
      // Zebra stripes
      ctx.fillStyle = '#0f172a';
      for (let zx = x + 25; zx < x + w - 25; zx += 16) {
        ctx.fillRect(zx, y + 20, 6, 36);
      }
      // Tram wheels
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(x + 32, y + 58, 8, 0, Math.PI * 2);
      ctx.arc(x + w - 32, y + 58, 8, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // S.E.A. Aquarium Objects
    // -------------------------------------------------------------
    case 'aquarium_viewing_panel': {
      // Deep blue oceanarium panel with swimming clownfish
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(x + 15, y + 12, w - 30, 45);
      // Clownfish (Orange & white)
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.ellipse(x + 45, y + 32, 12, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 43, y + 26, 4, 12);
      break;
    }

    case 'aquarium_shark_tunnel': {
      // Arched acrylic tunnel walkway
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 35, 36, 24, 0, Math.PI, 0);
      ctx.stroke();
      // Swimming shark silhouette
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 22, 16, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'aquarium_marine_conservation': {
      // Marine research microscope & clean reef test tubes
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 15, y + 20, w - 30, 38);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(x + 30, y + 14, 8, 22);
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(x + 45, y + 14, 8, 22);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(x + 60, y + 14, 8, 22);
      break;
    }

    // -------------------------------------------------------------
    // Universal Studios Singapore Objects
    // -------------------------------------------------------------
    case 'uss_globe_monument': {
      // Rotating Universal globe model & fountain pool
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 46, 32, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      // Blue and gold globe
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 26, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 26, 24, 6, -Math.PI / 12, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }

    case 'uss_roller_coaster': {
      // Battlestar Galactica coaster car & track
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 45);
      ctx.quadraticCurveTo(x + w / 2, y + 10, x + w - 10, y + 45);
      ctx.stroke();
      // Coaster car
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(x + w / 2 - 14, y + 20, 28, 14);
      break;
    }

    case 'uss_theme_diner': {
      // Mel's Drive-In tall milkshake glass & golden fries
      ctx.fillStyle = '#f43f5e'; // Strawberry milkshake
      ctx.fillRect(x + 35, y + 18, 14, 30);
      ctx.fillStyle = '#ffffff'; // Whipped cream
      ctx.beginPath();
      ctx.arc(x + 42, y + 16, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#dc2626'; // Red cherry
      ctx.beginPath();
      ctx.arc(x + 42, y + 10, 3, 0, Math.PI * 2);
      ctx.fill();
      // Red striped carton of golden fries
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x + 60, y + 26, 18, 22);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 63, y + 16, 3, 14);
      ctx.fillRect(x + 68, y + 14, 3, 16);
      ctx.fillRect(x + 73, y + 16, 3, 14);
      break;
    }

    // -------------------------------------------------------------
    // HDB BEDROOM & HOME STATIONS
    // -------------------------------------------------------------
    case 'family_table': {
      // Warm mahogany dining table
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x + 4, y + 22, w - 8, h - 22);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(x, y + 16, w, 8);
      // Steaming ABC Soup tureen
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(x + w / 2 - 18, y + 12, 14, 0, Math.PI);
      ctx.fill();
      ctx.fillStyle = '#f59e0b'; // golden broth
      ctx.fillRect(x + w / 2 - 28, y + 8, 20, 4);
      // Carrots & corn in soup
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(x + w / 2 - 24, y + 8, 4, 3);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + w / 2 - 16, y + 8, 5, 3);
      // Steamed Fish Oval Platter
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.ellipse(x + w / 2 + 18, y + 12, 16, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#94a3b8'; // Fish body
      ctx.beginPath();
      ctx.ellipse(x + w / 2 + 18, y + 12, 11, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Green spring onions garnish
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(x + w / 2 + 14, y + 10, 8, 2);
      // Gentle steam wisps
      const steamBob = Math.sin(tick * 0.1) * 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + w / 2 - 20, y + 4);
      ctx.lineTo(x + w / 2 - 18, y - 6 + steamBob);
      ctx.stroke();
      break;
    }

    case 'wardrobe_closet': {
      // Warm teak wardrobe closet with full-length mirror
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#713f12';
      ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
      // Left door with panel molding
      ctx.strokeStyle = '#a16207';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 5, y + 6, (w - 14) / 2, h - 12);
      // Right door: Full-length mirror
      const mirrorX = x + w / 2 + 2;
      const mirrorW = w / 2 - 7;
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(mirrorX, y + 6, mirrorW, h - 12);
      // Mirror light reflection diagonal stripe
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.moveTo(mirrorX + 4, y + 10);
      ctx.lineTo(mirrorX + mirrorW - 6, y + 22);
      ctx.lineTo(mirrorX + mirrorW - 6, y + 36);
      ctx.lineTo(mirrorX + 4, y + 24);
      ctx.closePath();
      ctx.fill();
      // Brass door handles
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + w / 2 - 5, y + h / 2, 3, 8);
      ctx.fillRect(mirrorX + 2, y + h / 2, 3, 8);
      break;
    }

    // -------------------------------------------------------------
    // SCHOOL INTERACTION STATIONS
    // -------------------------------------------------------------
    case 'student_council_booth': {
      // School Anti-Drug Student Council Booth
      ctx.fillStyle = '#1e3a8a'; // Navy tablecloth
      ctx.fillRect(x, y + 18, w, h - 18);
      ctx.fillStyle = '#172554';
      ctx.fillRect(x + 2, y + 14, w - 4, 6);
      // Anti-Drug Pop-up Display Stand
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 6, y - 8, w - 12, 22);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 6, y - 8, w - 12, 22);
      // Bold Text Badge
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 6px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('NO TO DRUGS', x + w / 2, y + 2);
      ctx.textAlign = 'left';
      // Official Teal Ribbon graphic
      ctx.strokeStyle = '#00a5a5';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 9, 3, 0, Math.PI * 2);
      ctx.stroke();
      // Informational pamphlets on table
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 12, y + 20, 16, 10);
      ctx.fillRect(x + 34, y + 19, 16, 11);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x + 14, y + 22, 12, 2);
      break;
    }

    // -------------------------------------------------------------
    // MAMA SHOP STATIONS (REFINED & NO GREY BOXES)
    // -------------------------------------------------------------
    case 'drink_fridge': {
      // Glass door illuminated drink refrigerator
      ctx.fillStyle = '#334155'; // Outer metal casing
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
      // Glass door frame with cool blue glow
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 5, y + 5, w - 10, h - 10);
      ctx.fillStyle = 'rgba(224, 242, 254, 0.85)';
      ctx.fillRect(x + 7, y + 7, w - 14, h - 14);
      // Shelves with iconic Singapore canned drinks
      const shelfY1 = y + 16;
      const shelfY2 = y + 36;
      const shelfY3 = y + 56;
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x + 8, shelfY1 + 10, w - 16, 2);
      ctx.fillRect(x + 8, shelfY2 + 10, w - 16, 2);
      ctx.fillRect(x + 8, shelfY3 + 10, w - 16, 2);
      // Top shelf: Yeo's Chrysanthemum Tea (Yellow) & Soy Bean (White)
      for (let c = 0; c < 4; c++) {
        ctx.fillStyle = c % 2 === 0 ? '#facc15' : '#ffffff';
        ctx.fillRect(x + 10 + c * 14, shelfY1, 10, 10);
      }
      // Middle shelf: 100 Plus (Blue) & Kickapoo (Orange)
      for (let c = 0; c < 4; c++) {
        ctx.fillStyle = c % 2 === 0 ? '#2563eb' : '#ea580c';
        ctx.fillRect(x + 10 + c * 14, shelfY2, 10, 10);
      }
      // Bottom shelf: Milo Cans (Green)
      for (let c = 0; c < 4; c++) {
        ctx.fillStyle = '#15803d';
        ctx.fillRect(x + 10 + c * 14, shelfY3, 10, 10);
      }
      // Glass reflection shine
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + 12, y + 10);
      ctx.lineTo(x + w - 14, y + 42);
      ctx.stroke();
      break;
    }

    case 'snack_rack': {
      // Wire rack with hanging keropok and nostalgic tidbit bags
      ctx.fillStyle = '#475569';
      ctx.fillRect(x + w / 2 - 2, y, 4, h); // Main pole
      ctx.fillRect(x + 4, y + h - 6, w - 8, 6); // Base stand
      // Hanging arms
      ctx.fillStyle = '#64748b';
      ctx.fillRect(x + 6, y + 14, w - 12, 3);
      ctx.fillRect(x + 6, y + 36, w - 12, 3);
      ctx.fillRect(x + 6, y + 58, w - 12, 3);
      // Colorful snack bags (Keropok, Murukku, Iced Gem biscuits)
      const bagColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];
      for (let r = 0; r < 3; r++) {
        const ry = y + 17 + r * 22;
        for (let c = 0; c < 3; c++) {
          const rx = x + 8 + c * 18;
          ctx.fillStyle = bagColors[(r * 3 + c) % bagColors.length];
          ctx.fillRect(rx, ry, 14, 16);
          // Zigzag top packaging seal
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(rx + 2, ry + 1, 10, 2);
        }
      }
      break;
    }

    case 'uncle_counter': {
      // Mama Shop Wooden Counter with traditional sweets jars
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x, y + 14, w, h - 14);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(x - 2, y + 10, w + 4, 8);
      // 3 Traditional glass jars with red screw-tops on counter
      for (let j = 0; j < 3; j++) {
        const jx = x + 10 + j * 24;
        const jy = y - 4;
        // Glass jar
        ctx.fillStyle = 'rgba(224, 242, 254, 0.7)';
        ctx.fillRect(jx, jy + 3, 18, 14);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.strokeRect(jx, jy + 3, 18, 14);
        // Red screw top lid
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(jx + 2, jy, 14, 4);
        // Inside candy (White rabbit, chocolate coins, haw flakes)
        const candyColor = j === 0 ? '#ffffff' : j === 1 ? '#facc15' : '#b91c1c';
        ctx.fillStyle = candyColor;
        ctx.fillRect(jx + 3, jy + 6, 12, 8);
      }
      // Counter front display shelf
      ctx.fillStyle = '#451a03';
      ctx.fillRect(x + 6, y + 26, w - 12, h - 34);
      ctx.strokeStyle = '#b45309';
      ctx.strokeRect(x + 6, y + 26, w - 12, h - 34);
      break;
    }

    // -------------------------------------------------------------
    // HAWKER & PASAR MALAM FOOD STALLS
    // -------------------------------------------------------------
    case 'satay_grill': {
      // Charcoal Satay Grill with glowing embers and smoke
      ctx.fillStyle = '#1e293b'; // Cast-iron grill body
      ctx.fillRect(x + 6, y + 16, w - 12, h - 16);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 4, y + 12, w - 8, 6);
      // Glowing charcoal embers
      const emberPulse = (Math.sin(tick * 0.15) + 1) * 0.25;
      ctx.fillStyle = `rgba(239, 68, 68, ${0.75 + emberPulse})`;
      ctx.fillRect(x + 8, y + 14, w - 16, 4);
      ctx.fillStyle = `rgba(245, 158, 11, ${0.85 + emberPulse})`;
      ctx.fillRect(x + 12, y + 15, w - 24, 2);
      // Satay Skewers aligned in rows
      for (let s = 0; s < 5; s++) {
        const sx = x + 10 + s * 14;
        ctx.fillStyle = '#78350f'; // Bamboo skewer stick
        ctx.fillRect(sx, y + 4, 2, 18);
        ctx.fillStyle = '#b45309'; // Marinated satay meat cubes
        ctx.fillRect(sx - 3, y + 7, 7, 7);
        // Char marks
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(sx - 2, y + 9, 3, 3);
      }
      // Delicate aromatic smoke particles
      const smokeWisp = Math.sin(tick * 0.12) * 5;
      ctx.strokeStyle = 'rgba(241, 245, 249, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y + 8);
      ctx.quadraticCurveTo(x + w / 2 + smokeWisp, y - 6, x + w / 2 - smokeWisp, y - 18);
      ctx.stroke();
      break;
    }

    case 'durian_stall': {
      // King of Fruits Durian Stall with crates & pricing signs
      ctx.fillStyle = '#854d0e'; // Wooden display crates
      ctx.fillRect(x + 4, y + 14, w - 8, h - 14);
      ctx.fillStyle = '#713f12';
      ctx.fillRect(x + 2, y + 10, w - 4, 6);
      // Spiky green durians in crate
      for (let d = 0; d < 4; d++) {
        const dx = x + 8 + d * 18;
        const dy = y + 4;
        ctx.fillStyle = '#4d7c0f'; // Durian shell
        ctx.beginPath();
        ctx.arc(dx + 7, dy + 7, 7, 0, Math.PI * 2);
        ctx.fill();
        // Spikes
        ctx.fillStyle = '#65a30d';
        ctx.fillRect(dx + 2, dy + 2, 3, 3);
        ctx.fillRect(dx + 10, dy + 2, 3, 3);
        ctx.fillRect(dx + 6, dy + 11, 3, 3);
      }
      // "MAO SHAN WANG" Red Blackboard Banner
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x + 6, y + 24, w - 12, 14);
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 6px "Press Start 2P", monospace';
      ctx.fillText('MSW DURIAN', x + 10, y + 34);
      break;
    }

    case 'tutu_stall': {
      // Traditional Steamed Tutu Kueh Stainless Steel Steamer
      ctx.fillStyle = '#94a3b8'; // Stainless body
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(x + 2, y + 10, w - 4, 8);
      // Round Tutu Kueh steamer molds with white linen cloth
      for (let t = 0; t < 3; t++) {
        const tx = x + 10 + t * 24;
        // White snowy Tutu Kueh with pandan leaf base
        ctx.fillStyle = '#15803d'; // Green pandan square
        ctx.fillRect(tx + 1, y + 8, 14, 4);
        ctx.fillStyle = '#f8fafc'; // Pure white steamed rice cake
        ctx.beginPath();
        ctx.arc(tx + 8, y + 5, 6, Math.PI, Math.PI * 2);
        ctx.fill();
        // Brown Gula Melaka filling center dot
        ctx.fillStyle = '#b45309';
        ctx.fillRect(tx + 7, y + 2, 2, 2);
      }
      // Tutu Kueh Signboard
      ctx.fillStyle = '#047857';
      ctx.fillRect(x + 8, y + 28, w - 16, 12);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 6px "Press Start 2P", monospace';
      ctx.fillText('TUTU KUEH', x + 12, y + 37);
      break;
    }

    case 'game_booth': {
      // Pasar Malam Carnival Game Booth (Balloon Dart & Ring Toss)
      // Striped carnival canopy
      const stripeW = w / 6;
      for (let s = 0; s < 6; s++) {
        ctx.fillStyle = s % 2 === 0 ? '#dc2626' : '#fef08a';
        ctx.fillRect(x + s * stripeW, y, stripeW, 14);
      }
      // Counter
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x + 4, y + 14, w - 8, h - 14);
      // Prize plushies hanging
      ctx.fillStyle = '#f472b6'; // Pink bear
      ctx.beginPath();
      ctx.arc(x + 18, y + 26, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#38bdf8'; // Blue dolphin
      ctx.beginPath();
      ctx.arc(x + w - 18, y + 26, 8, 0, Math.PI * 2);
      ctx.fill();
      // Dart target board
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 28, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 28, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // TRANSIT & COMMUTE STATIONS (SMRT / BUS)
    // -------------------------------------------------------------
    case 'topup_machine':
    case 'fare_gate': {
      // Singapore SimplyGo / TransitLink General Ticketing Top-Up Machine (GTM)
      // Main Stainless Steel & Slate Kiosk Body
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 5, y + 5, w - 10, h - 5);
      ctx.fillStyle = '#334155';
      ctx.fillRect(x + 8, y + 8, w - 16, h - 12);

      // Top Marquee Banner - Iconic SimplyGo Magenta / Purple Accent
      const bannerGrad = ctx.createLinearGradient(x + 10, y + 10, x + w - 10, y + 10);
      bannerGrad.addColorStop(0, '#9333ea');
      bannerGrad.addColorStop(0.5, '#db2777');
      bannerGrad.addColorStop(1, '#e11d48');
      ctx.fillStyle = bannerGrad;
      ctx.fillRect(x + 10, y + 10, w - 20, 16);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 6.5px "Press Start 2P", monospace';
      ctx.fillText('SimplyGo', x + 16, y + 22);

      // Main Interactive Touchscreen Display
      const screenX = x + 14;
      const screenY = y + 30;
      const screenW = w - 28;
      const screenH = 40;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(screenX, screenY, screenW, screenH);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(screenX, screenY, screenW, screenH);

      // Screen Header & Top-up Prompt
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 5px monospace';
      ctx.fillText('TOP UP EZ-LINK / CONCESSION', screenX + 4, screenY + 9);

      // Touch Buttons on Screen ($10, $20, $50)
      const btnW = (screenW - 12) / 3;
      const btnH = 12;
      const btnAmounts = ['$10', '$20', '$50'];
      btnAmounts.forEach((amt, i) => {
        const bx = screenX + 3 + i * (btnW + 3);
        const by = screenY + 14;
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(bx, by, btnW, btnH);
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, btnW, btnH);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 5px monospace';
        ctx.fillText(amt, bx + 4, by + 8);
      });

      // Flashing instructional subtitle on screen
      if (Math.floor(tick / 20) % 2 === 0) {
        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 4.5px monospace';
        ctx.fillText('>> TAP CARD ON READER <<', screenX + 5, screenY + 34);
      } else {
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 4.5px monospace';
        ctx.fillText('NETS / CASH / CONTACTLESS', screenX + 4, screenY + 34);
      }

      // Contactless Card Reader Target Platform
      const padX = x + 16;
      const padY = y + 74;
      const padW = 34;
      const padH = 22;

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(padX, padY, padW, padH);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(padX, padY, padW, padH);

      // Radio Wave Contactless Symbol & Blinking Green Reader LED
      const isGreenLed = (tick % 40) < 25;
      ctx.fillStyle = isGreenLed ? '#22c55e' : '#15803d';
      ctx.beginPath();
      ctx.arc(padX + 7, padY + 7, 3, 0, Math.PI * 2);
      ctx.fill();

      // Card illustration sitting on reader
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(padX + 13, padY + 5, 17, 11);
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(padX + 14, padY + 8, 15, 3);

      // Cash / Banknote Feeder Slot (Right Side)
      const cashX = x + 58;
      const cashY = y + 74;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(cashX, cashY, 36, 6);
      ctx.fillStyle = isGreenLed ? '#4ade80' : '#1e293b';
      ctx.fillRect(cashX + 4, cashY + 2, 28, 2);

      // NETS Pin Pad & Payment Terminal
      ctx.fillStyle = '#475569';
      ctx.fillRect(cashX + 4, cashY + 11, 28, 11);
      ctx.fillStyle = '#1e293b';
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 3; c++) {
          ctx.fillRect(cashX + 7 + c * 8, cashY + 13 + r * 4, 5, 3);
        }
      }

      // Receipt Dispenser Tray at base with printed slip
      const trayX = x + 30;
      const trayY = y + h - 11;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(trayX, trayY, 50, 7);
      // Paper receipt sticking out
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(trayX + 12, trayY - 2, 26, 4);
      break;
    }

    case 'bus_bay': {
      // SBS Transit Bus Shelter & Arrival Display
      // Roof canopy
      ctx.fillStyle = '#f97316'; // SBS Orange
      ctx.fillRect(x - 4, y, w + 8, 8);
      ctx.fillStyle = '#15803d'; // Green roof band
      ctx.fillRect(x - 4, y + 8, w + 8, 3);
      // Steel support pillar
      ctx.fillStyle = '#64748b';
      ctx.fillRect(x + 6, y + 11, 6, h - 11);
      ctx.fillRect(x + w - 12, y + 11, 6, h - 11);
      // Commuter bench
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x + 8, y + 36, w - 16, 6);
      ctx.fillRect(x + 12, y + 42, 4, h - 42);
      ctx.fillRect(x + w - 16, y + 42, 4, h - 42);
      // Electronic Bus Arrival LED Board
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 16, y + 14, w - 32, 16);
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 5.5px "Press Start 2P", monospace';
      ctx.fillText('BUS 190 2M', x + 18, y + 25);
      break;
    }

    case 'cnb_digital_screen': {
      // High-res Outdoor LED Billboard with Anti-Drug Hotline
      ctx.fillStyle = '#0f172a'; // Screen bezel
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#020617';
      ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
      // Glowing CNB Teal header
      ctx.fillStyle = '#00a5a5';
      ctx.fillRect(x + 5, y + 5, w - 10, 10);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 6px "Press Start 2P", monospace';
      ctx.fillText('CNB #DRUGFREESG', x + 8, y + 13);
      // Screen Warning & Hotline
      ctx.fillStyle = '#f8fafc';
      ctx.font = '5px "Press Start 2P", monospace';
      ctx.fillText('HOTLINE: 1800-600-0000', x + 8, y + 26);
      // Live pulsing green shield emblem
      const shieldGlow = (Math.sin(tick * 0.1) + 1) * 0.25;
      ctx.fillStyle = `rgba(16, 185, 129, ${0.75 + shieldGlow})`;
      ctx.beginPath();
      ctx.moveTo(x + w - 16, y + 18);
      ctx.lineTo(x + w - 24, y + 22);
      ctx.lineTo(x + w - 24, y + 30);
      ctx.lineTo(x + w - 16, y + 36);
      ctx.lineTo(x + w - 8, y + 30);
      ctx.lineTo(x + w - 8, y + 22);
      ctx.closePath();
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // CLARKE QUAY & NIGHTLIFE STATIONS
    // -------------------------------------------------------------
    case 'read_bridge_steps': {
      // Historic Read Bridge Wooden Deck & River Railings
      ctx.fillStyle = '#5c2b0e'; // Timber steps
      ctx.fillRect(x, y + 12, w, h - 12);
      ctx.fillStyle = '#78350f';
      for (let s = 0; s < 4; s++) {
        ctx.fillRect(x, y + 12 + s * 14, w, 4);
      }
      // Wrought Iron Heritage Balustrade
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y + 8);
      ctx.lineTo(x + w, y + 8);
      ctx.stroke();
      for (let p = 0; p < 5; p++) {
        ctx.fillRect(x + 4 + p * (w / 4 - 2), y, 3, 14);
      }
      // Glowing teal reflection from river
      ctx.fillStyle = 'rgba(20, 184, 166, 0.25)';
      ctx.fillRect(x, y + h - 8, w, 8);
      break;
    }

    case 'live_acoustic_corner': {
      // Live Acoustic Busking Setup: Wooden Guitar, Mic & Amp
      // Compact black guitar amplifier
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 10, y + 24, 26, 26);
      ctx.fillStyle = '#334155';
      ctx.fillRect(x + 13, y + 27, 20, 20);
      // Glowing red power LED on amp
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x + 13, y + 25, 2, 2);
      // Microphone stand
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x + 42, y, 2, h);
      ctx.fillRect(x + 36, y + h - 4, 14, 4); // base
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(x + 43, y + 3, 4, 0, Math.PI * 2);
      ctx.fill();
      // Acoustic wooden guitar on stand
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(x + w - 18, y + 28, 9, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(x + w - 18, y + 28, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#78350f'; // Guitar neck
      ctx.fillRect(x + w - 20, y + 4, 4, 16);
      // Floating music notes
      const noteY = Math.sin(tick * 0.1) * 4;
      ctx.fillStyle = '#facc15';
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillText('♪', x + w - 12, y + 8 + noteY);
      break;
    }

    case 'adulthood_volunteer_desk': {
      // Anti-Drug Civic Volunteer Registration Booth
      ctx.fillStyle = '#0284c7'; // Vibrant teal/blue desk
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(x + 2, y + 12, w - 4, 6);
      // Volunteer Desk Sign Banner
      ctx.fillStyle = '#0f766e';
      ctx.fillRect(x + 6, y - 4, w - 12, 16);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 5.5px "Press Start 2P", monospace';
      ctx.fillText('CIVIC VOLUNTEER', x + 8, y + 7);
      // Registration Tablet on desk
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 14, y + 18, 18, 14);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x + 16, y + 20, 14, 10);
      // Stacks of informational flyers
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + w - 28, y + 18, 16, 10);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x + w - 26, y + 20, 12, 2);
      break;
    }

    case 'supper_prata_stall': {
      // Sizzling Roti Prata Flat Griddle & Curry Pots
      ctx.fillStyle = '#1e293b'; // Griddle chassis
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#0f172a'; // Black steel griddle top
      ctx.fillRect(x + 2, y + 10, w - 4, 8);
      // Golden Crispy Square Prata on griddle
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 10, y + 11, 16, 6);
      ctx.fillStyle = '#d97706'; // Golden toasted spots
      ctx.fillRect(x + 14, y + 12, 4, 3);
      ctx.fillRect(x + 20, y + 13, 3, 2);
      // Steel Curry Pot with red/orange curry
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(x + w - 18, y + 12, 9, 0, Math.PI);
      ctx.fill();
      ctx.fillStyle = '#ea580c'; // Curry gravy
      ctx.fillRect(x + w - 25, y + 10, 14, 4);
      // Teh Tarik Frothy Mug
      ctx.fillStyle = '#d97706';
      ctx.fillRect(x + w / 2 - 4, y + 10, 8, 8);
      ctx.fillStyle = '#ffffff'; // Thick froth
      ctx.fillRect(x + w / 2 - 4, y + 9, 8, 2);
      break;
    }

    // -------------------------------------------------------------
    // ORCHARD ROAD & YOUTH *SCAPE STATIONS
    // -------------------------------------------------------------
    case 'skate_ramp': {
      // *SCAPE Skate Park Wooden Quarter-Pipe Ramp with Graffiti
      ctx.fillStyle = '#78350f'; // Ramp base
      ctx.beginPath();
      ctx.moveTo(x, y + h);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + w, y + 8);
      ctx.quadraticCurveTo(x + 18, y + 22, x, y + h);
      ctx.closePath();
      ctx.fill();
      // Metal coping rail at top
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x + w - 4, y + 4, 4, 8);
      // Urban Graffiti splash
      ctx.fillStyle = '#ec4899';
      ctx.font = 'bold 7px "Press Start 2P", monospace';
      ctx.fillText('*SCAPE', x + 18, y + h - 14);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x + 22, y + h - 10, 24, 2);
      break;
    }

    case 'boba_street_shop': {
      // Trendy Bubble Tea Counter with Sealing Machine
      ctx.fillStyle = '#fde047'; // Cheerful yellow counter
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#eab308';
      ctx.fillRect(x + 2, y + 12, w - 4, 6);
      // Cup Sealing Machine
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 8, y - 4, 18, 18);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x + 11, y - 1, 12, 6);
      // Boba Tapioca Pearl Clear Dispenser
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(x + 30, y + 2, 16, 12);
      ctx.fillStyle = '#1c1917'; // Dark boba pearls
      for (let p = 0; p < 6; p++) {
        ctx.beginPath();
        ctx.arc(x + 33 + (p % 3) * 5, y + 6 + Math.floor(p / 3) * 4, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      // Menu Board
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + w - 24, y - 2, 20, 16);
      ctx.fillStyle = '#facc15';
      ctx.font = '4.5px "Press Start 2P", monospace';
      ctx.fillText('BOBA', x + w - 21, y + 7);
      break;
    }

    // -------------------------------------------------------------
    // CHINATOWN HERITAGE STATIONS
    // -------------------------------------------------------------
    case 'chinatown_lantern_canopy': {
      // Red Silk Festive Lantern Canopy
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y + 10);
      ctx.quadraticCurveTo(x + w / 2, y + 18, x + w, y + 10);
      ctx.stroke();
      // 3 Glowing Red Lanterns
      for (let l = 0; l < 3; l++) {
        const lx = x + 16 + l * (w / 2 - 16);
        const ly = y + 12 + Math.sin(l * 1.5) * 4;
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.ellipse(lx, ly + 8, 8, 11, 0, 0, Math.PI * 2);
        ctx.fill();
        // Gold ribs & bottom tassels
        ctx.fillStyle = '#facc15';
        ctx.fillRect(lx - 5, ly - 1, 10, 2);
        ctx.fillRect(lx - 5, ly + 17, 10, 2);
        ctx.fillRect(lx - 1, ly + 19, 2, 8); // Tassel
      }
      break;
    }

    case 'traditional_tea_house': {
      // Traditional Tea House Table & Purple Clay Yixing Teaware
      ctx.fillStyle = '#451a03'; // Dark carved rosewood table
      ctx.fillRect(x + 4, y + 18, w - 8, h - 18);
      ctx.fillStyle = '#5c2b0e';
      ctx.fillRect(x + 2, y + 12, w - 4, 8);
      // Rosewood tea tray
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x + 8, y + 8, w - 16, 6);
      // Purple clay Yixing teapot
      ctx.fillStyle = '#831843';
      ctx.beginPath();
      ctx.arc(x + w / 2 - 6, y + 4, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(x + w / 2 - 14, y + 3, 4, 2); // Spout
      // Tiny celadon oolong tea tasting cups
      ctx.fillStyle = '#a7f3d0';
      ctx.fillRect(x + w / 2 + 6, y + 4, 6, 5);
      ctx.fillRect(x + w / 2 + 15, y + 4, 6, 5);
      // Aromatic tea steam
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + w / 2 - 6, y - 2);
      ctx.lineTo(x + w / 2 - 4, y - 10);
      ctx.stroke();
      break;
    }

    case 'chinatown_civic_booth': {
      // Heritage Shophouse Anti-Drug Community Booth
      ctx.fillStyle = '#831843'; // Heritage maroon table
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#500724';
      ctx.fillRect(x + 2, y + 12, w - 4, 6);
      // Traditional bilingual banner
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x + 6, y - 4, w - 12, 16);
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 5.5px "Press Start 2P", monospace';
      ctx.fillText('CIVIC HEALTH', x + 8, y + 6);
      // Display stand with health pamphlets
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 12, y + 18, 16, 12);
      ctx.fillRect(x + 32, y + 18, 16, 12);
      break;
    }

    // -------------------------------------------------------------
    // SENTOSA BEACH & COASTAL RESORT STATIONS
    // -------------------------------------------------------------
    case 'palawan_suspension_bridge': {
      // Palawan Timber Suspension Bridge Posts & Ropes
      ctx.fillStyle = '#78350f'; // Bridge towers
      ctx.fillRect(x + 4, y, 10, h);
      ctx.fillRect(x + w - 14, y, 10, h);
      // Crossbeams
      ctx.fillRect(x + 4, y + 8, w - 8, 4);
      // Sagging suspension rope cables
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x + 9, y + 10);
      ctx.quadraticCurveTo(x + w / 2, y + 24, x + w - 9, y + 10);
      ctx.stroke();
      // Wooden walking bridge walkway planks
      ctx.fillStyle = '#b45309';
      ctx.fillRect(x + 4, y + 36, w - 8, 8);
      break;
    }

    case 'beach_volleyball_court': {
      // Beach Volleyball Net & Golden Sand Court
      ctx.fillStyle = '#fef08a'; // Sand mound
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h - 6, w / 2 - 4, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Upright wooden poles
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(x + 4, y + 6, 5, h - 10);
      ctx.fillRect(x + w - 9, y + 6, 5, h - 10);
      // White woven net
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 9, y + 14, w - 18, 14);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 9, y + 14, w - 18, 14);
      // Volleyball resting on sand
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(x + w / 2 + 10, y + h - 10, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + w / 2 + 8, y + h - 12, 4, 4);
      break;
    }

    case 'coastal_juice_bar': {
      // Tropical Bamboo Thatch Hut & Fresh Coconuts
      // Bamboo counter
      ctx.fillStyle = '#a16207';
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      // Thatch grass roof
      ctx.fillStyle = '#ca8a04';
      ctx.beginPath();
      ctx.moveTo(x - 2, y + 16);
      ctx.lineTo(x + w / 2, y);
      ctx.lineTo(x + w + 2, y + 16);
      ctx.closePath();
      ctx.fill();
      // Fresh Green Coconuts on counter
      for (let c = 0; c < 3; c++) {
        const cx = x + 10 + c * 16;
        ctx.fillStyle = '#65a30d';
        ctx.beginPath();
        ctx.arc(cx + 6, y + 13, 6, 0, Math.PI * 2);
        ctx.fill();
        // Red striped straw
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(cx + 5, y + 4, 2, 6);
      }
      break;
    }

    // -------------------------------------------------------------
    // POLYTECHNIC CAMPUS STATIONS
    // -------------------------------------------------------------
    case 'poly_studio_lab': {
      // Digital Media Studio iMac Workstation & Drawing Tablet
      ctx.fillStyle = '#334155'; // Workstation desk
      ctx.fillRect(x + 4, y + 24, w - 8, h - 24);
      // Dual Slim Modern Displays
      ctx.fillStyle = '#0f172a'; // Display 1
      ctx.fillRect(x + 8, y + 4, 26, 18);
      ctx.fillStyle = '#0284c7'; // Active screen
      ctx.fillRect(x + 10, y + 6, 22, 14);
      ctx.fillStyle = '#0f172a'; // Display 2
      ctx.fillRect(x + 36, y + 4, 26, 18);
      ctx.fillStyle = '#7c3aed'; // Code / Design screen
      ctx.fillRect(x + 38, y + 6, 22, 14);
      // Graphics Drawing Tablet & Stylus
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 22, y + 26, 22, 12);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x + 38, y + 24, 2, 10); // Stylus
      break;
    }

    case 'poly_smoking_stairwell': {
      // Concrete Fire Stairwell with Anti-Vaping Fine Signage
      ctx.fillStyle = '#475569'; // Concrete wall pillar
      ctx.fillRect(x + 4, y, w - 8, h);
      ctx.fillStyle = '#cbd5e1'; // Metal handrail
      ctx.fillRect(x + 6, y + 26, w - 12, 4);
      ctx.fillRect(x + 10, y + 30, 4, h - 30);
      ctx.fillRect(x + w - 14, y + 30, 4, h - 30);
      // Strict Red "NO VAPING" Signboard
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 12, y + 6, w - 24, 16);
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 12, y + 6, w - 24, 16);
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 5px "Press Start 2P", monospace';
      ctx.fillText('NO VAPING', x + 15, y + 17);
      break;
    }

    case 'poly_atrium_cafe': {
      // Polytechnic Campus Study Bench with Cold Brew & Laptop
      ctx.fillStyle = '#713f12'; // Timber communal table
      ctx.fillRect(x + 4, y + 18, w - 8, h - 18);
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(x + 2, y + 14, w - 4, 6);
      // Open Student Laptop
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x + 12, y + 6, 18, 10);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 14, y + 8, 14, 6);
      // Iced Cold Brew Glass Bottle
      ctx.fillStyle = '#451a03';
      ctx.fillRect(x + w - 22, y + 8, 8, 12);
      ctx.fillStyle = '#ffffff'; // White bottle label
      ctx.fillRect(x + w - 21, y + 12, 6, 5);
      break;
    }

    case 'poly_ambassador_booth': {
      // Peer Wellness Ambassador Information Kiosk
      ctx.fillStyle = '#0f766e'; // Teal table
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#115e59';
      ctx.fillRect(x + 2, y + 12, w - 4, 6);
      // Banner
      ctx.fillStyle = '#14b8a6';
      ctx.fillRect(x + 6, y - 4, w - 12, 16);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 5px "Press Start 2P", monospace';
      ctx.fillText('WELLNESS PEER', x + 8, y + 6);
      // Interactive Tablet
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 16, y + 18, 16, 12);
      ctx.fillStyle = '#2dd4bf';
      ctx.fillRect(x + 18, y + 20, 12, 8);
      break;
    }

    // -------------------------------------------------------------
    // ITE COLLEGE WORKSHOP & ARENA STATIONS
    // -------------------------------------------------------------
    case 'ite_workshop_bay': {
      // Advanced Engineering Workbench & Articulated Robotic Arm
      ctx.fillStyle = '#334155'; // Heavy duty steel bench
      ctx.fillRect(x + 4, y + 22, w - 8, h - 22);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 2, y + 18, w - 4, 6);
      // Robotic articulated arm (Yellow)
      ctx.fillStyle = '#eab308';
      ctx.fillRect(x + 14, y + 6, 6, 14);
      ctx.fillRect(x + 18, y + 6, 14, 4);
      // Tool chest & oscilloscope monitor
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + w - 28, y + 4, 22, 16);
      ctx.fillStyle = '#22c55e'; // Green pulse trace
      ctx.fillRect(x + w - 26, y + 11, 18, 2);
      break;
    }

    case 'ite_breakout_bench': {
      // Outdoor Campus Bench with Leafy Landscaping
      ctx.fillStyle = '#854d0e'; // Wooden slats
      ctx.fillRect(x + 8, y + 20, w - 16, 10);
      ctx.fillStyle = '#475569'; // Steel legs
      ctx.fillRect(x + 10, y + 30, 4, h - 30);
      ctx.fillRect(x + w - 14, y + 30, 4, h - 30);
      // Potted campus tropical plant
      ctx.fillStyle = '#b45309'; // Clay pot
      ctx.fillRect(x + 2, y + 14, 8, 16);
      ctx.fillStyle = '#16a34a'; // Green foliage
      ctx.beginPath();
      ctx.arc(x + 6, y + 10, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ite_sports_arena': {
      // Indoor Arena Hardwood Court & Basketball Hoop
      ctx.fillStyle = '#ca8a04'; // Hardwood court floor
      ctx.fillRect(x + 4, y + 26, w - 8, h - 26);
      // Basketball Backboard & Rim
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + w / 2 - 12, y, 24, 18);
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + w / 2 - 12, y, 24, 18);
      ctx.strokeRect(x + w / 2 - 6, y + 6, 12, 8);
      // Orange rim & net
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(x + w / 2 - 8, y + 14, 16, 2);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + w / 2 - 6, y + 16, 12, 8);
      break;
    }

    case 'ite_peer_booth': {
      // ITE Peer Mentorship & Youth Advocacy Stand
      ctx.fillStyle = '#dc2626'; // ITE Red table
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(x + 2, y + 12, w - 4, 6);
      // Banner
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 6, y - 4, w - 12, 16);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 5px "Press Start 2P", monospace';
      ctx.fillText('ITE ADVOCACY', x + 8, y + 6);
      // Pamphlet rack
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 14, y + 18, 16, 12);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(x + 16, y + 20, 12, 3);
      break;
    }

    // -------------------------------------------------------------
    // STUDENT CAFE & STUDY LOUNGE STATIONS
    // -------------------------------------------------------------
    case 'cafe_barista_counter': {
      // Hipster Cafe Barista Counter with Chrome Espresso Machine
      ctx.fillStyle = '#78350f'; // Dark wood counter
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(x + 2, y + 12, w - 4, 6);
      // Chrome Dual-Group Espresso Machine
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 10, y - 2, 24, 16);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(x + 12, y + 2, 20, 8);
      // Portafilter handles
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 14, y + 10, 4, 4);
      ctx.fillRect(x + 24, y + 10, 4, 4);
      // Glass display dome with fresh pastries
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(x + w - 18, y + 6, 8, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#d97706'; // Croissant
      ctx.fillRect(x + w - 22, y + 8, 8, 4);
      break;
    }

    case 'cafe_study_booth': {
      // Forest-Green Upholstered Cafe Booth with Warm Walnut Table
      ctx.fillStyle = '#166534'; // Green booth backrest
      ctx.fillRect(x + 4, y + 4, 12, h - 4);
      ctx.fillRect(x + w - 16, y + 4, 12, h - 4);
      // Walnut table in center
      ctx.fillStyle = '#713f12';
      ctx.fillRect(x + 16, y + 18, w - 32, h - 18);
      // Overhead hanging warm Edison pendant lamp
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y - 10);
      ctx.lineTo(x + w / 2, y + 2);
      ctx.stroke();
      ctx.fillStyle = '#fef08a'; // Glowing lamp bulb
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 5, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'cafe_toast_platter': {
      // Sourdough Toast & Iced Matcha Latte Platter
      ctx.fillStyle = '#b45309'; // Wooden platter
      ctx.fillRect(x + 6, y + 18, w - 12, 12);
      // Sourdough Toast slices
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 10, y + 14, 14, 8);
      ctx.fillStyle = '#15803d'; // Avocado spread
      ctx.fillRect(x + 12, y + 15, 10, 4);
      // Tall Matcha Latte Glass
      ctx.fillStyle = '#4ade80'; // Creamy matcha green
      ctx.fillRect(x + w - 24, y + 6, 10, 16);
      ctx.fillStyle = '#ffffff'; // Cold foam topping
      ctx.fillRect(x + w - 24, y + 4, 10, 3);
      break;
    }

    // -------------------------------------------------------------
    // TRANSITION & FILLER SCENES (PSLE & O-LEVEL PLAZA)
    // -------------------------------------------------------------
    case 'psle_posting_board': {
      // Large Bulletin Notice Board with Secondary School Postings
      ctx.fillStyle = '#a16207'; // Corkboard frame
      ctx.fillRect(x + 4, y, w - 8, h);
      ctx.fillStyle = '#d97706'; // Cork texture
      ctx.fillRect(x + 7, y + 3, w - 14, h - 6);
      // Pinned Paper Result Lists
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 12, y + 8, 22, 28);
      ctx.fillRect(x + 38, y + 12, 22, 24);
      // Congratulatory ribbons
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(x + 10, y + 6, 6, 6);
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(x + 36, y + 10, 6, 6);
      break;
    }

    case 'celebration_table': {
      // Void Deck Celebration Banquet with Curry Puffs & Yellow Milo Dispenser
      ctx.fillStyle = '#dc2626'; // Festive red tablecloth
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(x + 2, y + 12, w - 4, 6);
      // Platter of golden curry puffs
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 10, y + 12, 22, 4);
      ctx.fillStyle = '#d97706'; // Golden pastry puffs
      for (let p = 0; p < 3; p++) {
        ctx.beginPath();
        ctx.arc(x + 14 + p * 6, y + 10, 3, Math.PI, Math.PI * 2);
        ctx.fill();
      }
      // Yellow Insulated Milo Dispenser Tank
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + w - 26, y - 2, 18, 16);
      ctx.fillStyle = '#15803d'; // Green Milo logo band
      ctx.fillRect(x + w - 26, y + 4, 18, 5);
      // Dispenser spigot tap
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + w - 10, y + 10, 4, 3);
      break;
    }

    case 'psle_icecream_uncle': {
      // Celebratory Ice Cream Cart with Rainbow Bread
      ctx.fillStyle = '#dc2626'; // Motorcycle cart
      ctx.fillRect(x + 4, y + 14, w - 8, h - 14);
      // Stainless steel ice cream cooler lid
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(x + 8, y + 10, w - 16, 6);
      // Striped orange & green umbrella
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + 6, 18, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(x + w / 2 - 3, y - 6, 6, 12);
      // Pink and Green Rainbow Bread loaf
      ctx.fillStyle = '#f472b6';
      ctx.fillRect(x + 10, y + 6, 8, 4);
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(x + 18, y + 6, 8, 4);
      break;
    }

    case 'secondary_signpost': {
      // Park-Style Directional Pole with Arrows
      ctx.fillStyle = '#1e293b'; // Cast iron pole
      ctx.fillRect(x + w / 2 - 2, y, 4, h);
      // Direction arrow 1: Secondary School (Pointing right)
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(x + w / 2, y + 8, 28, 10);
      ctx.fillStyle = '#ffffff';
      ctx.font = '5px "Press Start 2P", monospace';
      ctx.fillText('SEC ➔', x + w / 2 + 3, y + 16);
      // Direction arrow 2: Sports Stadium (Pointing left)
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(x + w / 2 - 28, y + 22, 28, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('◄ GYM', x + w / 2 - 26, y + 30);
      break;
    }

    case 'results_collection': {
      // School Hall Registration Desks with Official Examination Result Slips
      ctx.fillStyle = '#1e3a8a'; // Navy draped table
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#172554';
      ctx.fillRect(x + 2, y + 12, w - 4, 6);
      // Neat stacks of sealed result certificate envelopes
      ctx.fillStyle = '#fef08a'; // Manila envelopes
      ctx.fillRect(x + 12, y + 4, 18, 10);
      ctx.fillRect(x + 34, y + 6, 18, 8);
      // Official Red Certification Stamp
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(x + 21, y + 9, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ecg_counsellor': {
      // Education & Career Guidance Consultation Booth
      ctx.fillStyle = '#0d9488'; // Teal ECG desk
      ctx.fillRect(x + 4, y + 16, w - 8, h - 16);
      ctx.fillStyle = '#0f766e';
      ctx.fillRect(x + 2, y + 12, w - 4, 6);
      // Pathway Guidebooks (JC, Poly, ITE)
      ctx.fillStyle = '#2563eb'; // JC Blue guide
      ctx.fillRect(x + 10, y + 6, 10, 8);
      ctx.fillStyle = '#16a34a'; // Poly Green guide
      ctx.fillRect(x + 22, y + 6, 10, 8);
      ctx.fillStyle = '#ea580c'; // ITE Orange guide
      ctx.fillRect(x + 34, y + 6, 10, 8);
      // ECG Pathway banner
      ctx.fillStyle = '#134e4a';
      ctx.fillRect(x + 6, y - 4, w - 12, 12);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 5px "Press Start 2P", monospace';
      ctx.fillText('CAREER GUIDANCE', x + 8, y + 5);
      break;
    }

    case 'peer_photo_wall': {
      // Graduation Celebration Balloon Arch & Photo Backdrop
      // Rainbow balloon arch
      const balloonColors = ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6'];
      for (let b = 0; b < 7; b++) {
        const bx = x + 6 + b * 10;
        const by = y + 8 - Math.sin((b / 6) * Math.PI) * 12;
        ctx.fillStyle = balloonColors[b % balloonColors.length];
        ctx.beginPath();
        ctx.arc(bx, by, 7, 0, Math.PI * 2);
        ctx.fill();
      }
      // Backdrop banner
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 8, y + 16, w - 16, h - 16);
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 6px "Press Start 2P", monospace';
      ctx.fillText('CONGRATULATIONS', x + 10, y + 32);
      break;
    }

    case 'tertiary_portal': {
      // Grand Post-Secondary Gateway Archway to Tertiary Institutions
      ctx.fillStyle = '#1e293b'; // Stone pillars
      ctx.fillRect(x + 4, y, 10, h);
      ctx.fillRect(x + w - 14, y, 10, h);
      // Overhead ceremonial archway
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 2, y, w - 4, 16);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 6px "Press Start 2P", monospace';
      ctx.fillText('TERTIARY PATH', x + 14, y + 11);
      // Glowing path light
      ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.fillRect(x + 14, y + 16, w - 28, h - 16);
      break;
    }

    default: {
      // Sophisticated Singapore Civic / Heritage Kiosk (NO generic grey boxes!)
      // Wooden stall base
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x, y + 14, w, h - 14);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(x - 2, y + 10, w + 4, 6);
      // Striped awning
      const awningW = w / 4;
      for (let a = 0; a < 4; a++) {
        ctx.fillStyle = a % 2 === 0 ? '#0284c7' : '#f8fafc';
        ctx.fillRect(x + a * awningW, y, awningW, 12);
      }
      // Illuminated counter display
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 6, y + 20, w - 12, h - 26);
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 6px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('INTERACT', x + w / 2, y + 34);
      ctx.textAlign = 'left';
      break;
    }
  }

  // Label banner with interaction indicator
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fillRect(x - 5, y + h + 2, w + 10, 16);
  ctx.fillStyle = isNearest ? '#facc15' : '#f8fafc';
  ctx.font = '8px "Press Start 2P"';
  ctx.textAlign = 'center';
  const shortText = obj.label.length > 20 ? obj.label.substring(0, 20) + '..' : obj.label;
  ctx.fillText(shortText, x + w / 2, y + h + 13);
  ctx.textAlign = 'start';

  ctx.restore();
}
