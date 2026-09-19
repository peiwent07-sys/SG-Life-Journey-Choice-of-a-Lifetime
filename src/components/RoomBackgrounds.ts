// RoomBackgrounds.ts
// Authentic Singapore environment background rendering for SG Life Journey
// Accurately rendered based on authentic photographic references

export function drawRoomBackground(
  ctx: CanvasRenderingContext2D,
  roomId: string,
  w: number,
  h: number,
  tick: number,
  currentHour: number
) {
  const floorY = 320;

  switch (roomId) {
    case 'bedroom':
      drawHDBBedroom(ctx, w, h, floorY, currentHour);
      break;

    case 'voiddeck':
      drawVoidDeck(ctx, w, h, floorY, tick);
      break;

    case 'school':
      drawSchoolGate(ctx, w, h, floorY, tick);
      break;

    case 'mamashop':
      drawMamaShop(ctx, w, h, floorY, tick);
      break;

    case 'mrt':
      drawMRTAndInterchange(ctx, w, h, floorY, tick, currentHour);
      break;

    case 'barbershop':
      drawBarberShop(ctx, w, h, floorY, tick);
      break;

    case 'juniorcollege':
      drawJuniorCollege(ctx, w, h, floorY, tick);
      break;

    case 'polytechnic':
      drawPolytechnic(ctx, w, h, floorY, tick);
      break;

    case 'itecollege':
      drawITECollege(ctx, w, h, floorY, tick);
      break;

    case 'kkh_ward':
      drawKKHHospitalWard(ctx, w, h, floorY, tick);
      break;

    case 'hawker':
      drawHawkerCentre(ctx, w, h, floorY, tick);
      break;

    case 'pasarmalam':
      drawPasarMalam(ctx, w, h, floorY, tick);
      break;

    case 'clarkequay':
      drawClarkeQuay(ctx, w, h, floorY, tick);
      break;

    case 'orchard':
      drawOrchardRoad(ctx, w, h, floorY, tick);
      break;

    case 'marinabaysands':
      drawMarinaBaySands(ctx, w, h, floorY, tick);
      break;

    case 'merlion':
      drawMerlionPark(ctx, w, h, floorY, tick);
      break;

    case 'changiairport':
      drawChangiAirport(ctx, w, h, floorY, tick);
      break;

    case 'chijmes':
      drawCHIJMES(ctx, w, h, floorY, tick);
      break;

    case 'gardensbythebay':
      drawGardensByTheBay(ctx, w, h, floorY, tick);
      break;

    case 'secondaryschool':
      drawSecondarySchool(ctx, w, h, floorY, tick);
      break;

    case 'nationalstadium':
      drawNationalStadium(ctx, w, h, floorY, tick);
      break;

    case 'f1circuit':
      drawF1Circuit(ctx, w, h, floorY, tick);
      break;

    case 'singaporezoo':
      drawSingaporeZoo(ctx, w, h, floorY, tick);
      break;

    case 'seaaquarium':
      drawSEAAquarium(ctx, w, h, floorY, tick);
      break;

    case 'universalstudios':
      drawUniversalStudios(ctx, w, h, floorY, tick);
      break;

    case 'chinatown':
      drawChinatownHeritage(ctx, w, h, floorY, tick);
      break;

    case 'sentosabeach':
      drawSentosaPalawanBeach(ctx, w, h, floorY, tick);
      break;

    case 'student_cafe':
      drawStudentCafe(ctx, w, h, floorY, tick);
      break;

    case 'psle_celebration':
      drawPSLECelebration(ctx, w, h, floorY, tick);
      break;

    case 'olevel_plaza':
      drawOLevelPlaza(ctx, w, h, floorY, tick);
      break;

    default:
      drawDefaultRoom(ctx, w, h, floorY);
      break;
  }
}

// -------------------------------------------------------------
// PSLE CELEBRATION & VOID DECK COMMUNITY SQUARE
// -------------------------------------------------------------
function drawPSLECelebration(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // 1. Festive void deck background
  drawVoidDeck(ctx, w, h, floorY, tick);

  // 2. Celebratory Hanging Bunting & Paper Flags
  const flagColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
  for (let fx = 10; fx < w - 20; fx += 28) {
    const col = flagColors[Math.floor(fx / 28) % flagColors.length];
    const sway = Math.sin(tick * 0.05 + fx) * 3;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(fx, 45 + sway);
    ctx.lineTo(fx + 22, 45 + sway);
    ctx.lineTo(fx + 11, 68 + sway);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // String holding the bunting
  ctx.strokeStyle = '#573315';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 45);
  ctx.quadraticCurveTo(w / 2, 60, w, 45);
  ctx.stroke();

  // 3. Official Celebration Banner
  ctx.fillStyle = '#b91c1c'; // Singapore festive red
  ctx.fillRect(180, 80, 440, 48);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#fef08a'; // Golden trim
  ctx.strokeRect(180, 80, 440, 48);

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 9px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CONGRATULATIONS PRIMARY 6 GRADUATES!', 400, 100);
  ctx.font = '7.5px "Press Start 2P", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('RESILIENCE · EXCELLENCE · READY FOR SECONDARY SCHOOL', 400, 118);
  ctx.textAlign = 'left';
}

// -------------------------------------------------------------
// O-LEVEL / N-LEVEL RESULTS PLAZA & YOUTH AMPHITHEATRE
// -------------------------------------------------------------
function drawOLevelPlaza(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Sunny blue sky with modern architectural trellis
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#38bdf8');
  skyGrad.addColorStop(0.7, '#bae6fd');
  skyGrad.addColorStop(1, '#e0f2fe');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Modernist Youth Campus Building in background
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(60, floorY - 210, w - 120, 210);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(70, floorY - 200, w - 140, 18);

  // Campus Glass Windows
  ctx.fillStyle = '#93c5fd';
  for (let wx = 90; wx < w - 100; wx += 48) {
    ctx.fillRect(wx, floorY - 170, 36, 45);
    ctx.fillRect(wx, floorY - 110, 36, 45);
  }

  // Modernist Amphitheatre Ground / Terraces
  const groundGrad = ctx.createLinearGradient(0, floorY, 0, h);
  groundGrad.addColorStop(0, '#e2e8f0');
  groundGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Festive Archway & Results Banner
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(160, 50, 480, 50);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(160, 50, 480, 50);

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 9px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('NATIONAL EXAMS RESULTS RELEASE & JAE POSTING', 400, 72);
  ctx.font = '7.5px "Press Start 2P", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('CHOOSE YOUR TERTIARY PATHWAY: JC · POLY · ITE', 400, 89);
  ctx.textAlign = 'left';

  // Festive floating confetti
  const confettiColors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'];
  for (let i = 0; i < 20; i++) {
    const cx = (i * 39 + tick * 1.5) % w;
    const cy = 110 + ((i * 19 + tick * 0.8) % 180);
    ctx.fillStyle = confettiColors[i % confettiColors.length];
    ctx.fillRect(cx, cy, 5, 5);
  }
}

// -------------------------------------------------------------
// CHINATOWN HERITAGE SHOPHOUSES & PAGODA STREET
// -------------------------------------------------------------
function drawChinatownHeritage(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Dusk twilight sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#1e1b4b');
  skyGrad.addColorStop(0.6, '#431407');
  skyGrad.addColorStop(1, '#9a3412');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Heritage Shophouses
  const colors = ['#f59e0b', '#0d9488', '#dc2626', '#d97706', '#2563eb'];
  for (let sx = 0; sx < w; sx += 160) {
    const col = colors[(sx / 160) % colors.length];
    // Main building facade
    ctx.fillStyle = col;
    ctx.fillRect(sx + 10, floorY - 180, 145, 180);
    // Roof cornice / pediment
    ctx.fillStyle = '#78350f';
    ctx.fillRect(sx + 5, floorY - 185, 155, 8);
    // Upper shutter windows
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(sx + 25, floorY - 150, 35, 45);
    ctx.fillRect(sx + 95, floorY - 150, 35, 45);
    // Timber shutters
    ctx.fillStyle = '#451a03';
    ctx.fillRect(sx + 27, floorY - 148, 15, 41);
    ctx.fillRect(sx + 43, floorY - 148, 15, 41);
    ctx.fillRect(sx + 97, floorY - 148, 15, 41);
    ctx.fillRect(sx + 113, floorY - 148, 15, 41);
    // Ground level five-foot-way arcade
    ctx.fillStyle = '#1e1b18';
    ctx.fillRect(sx + 25, floorY - 70, 115, 70);
  }

  // Suspended Strings of Red Lanterns
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, floorY - 130);
  ctx.quadraticCurveTo(w / 4, floorY - 100, w / 2, floorY - 120);
  ctx.quadraticCurveTo((3 * w) / 4, floorY - 140, w, floorY - 125);
  ctx.stroke();

  for (let lx = 30; lx < w; lx += 60) {
    const lY = floorY - 120 + Math.sin(lx * 0.02) * 15;
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(lx, lY, 9, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    // Glowing yellow core
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(lx - 2, lY - 2, 4, 4);
    // Golden tassel
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(lx, lY + 11);
    ctx.lineTo(lx, lY + 18);
    ctx.stroke();
  }

  // Cobblestone pedestrian street floor
  ctx.fillStyle = '#292524';
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#44403c';
  ctx.lineWidth = 1;
  for (let gx = 0; gx < w; gx += 20) {
    ctx.beginPath();
    ctx.moveTo(gx, floorY);
    ctx.lineTo(gx - 40, h);
    ctx.stroke();
  }
}

// -------------------------------------------------------------
// SENTOSA PALAWAN BEACH & SUSPENSION TIMBER BRIDGE
// -------------------------------------------------------------
function drawSentosaPalawanBeach(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Sunny tropical sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#38bdf8');
  skyGrad.addColorStop(0.7, '#bae6fd');
  skyGrad.addColorStop(1, '#fef08a');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Fluffy clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(150, 60, 24, 0, Math.PI * 2);
  ctx.arc(180, 50, 32, 0, Math.PI * 2);
  ctx.arc(215, 60, 22, 0, Math.PI * 2);
  ctx.fill();

  // Tropical Azure Sea
  const seaY = floorY - 65;
  const seaGrad = ctx.createLinearGradient(0, seaY, 0, floorY);
  seaGrad.addColorStop(0, '#0284c7');
  seaGrad.addColorStop(0.5, '#0ea5e9');
  seaGrad.addColorStop(1, '#38bdf8');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, seaY, w, 65);

  // Gentle wave foam
  const waveBob = Math.sin(tick * 0.08) * 3;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillRect(0, floorY - 10 + waveBob, w, 6);

  // Palawan Suspension Bridge & Twin Viewing Towers in distance
  const brX = w * 0.55;
  ctx.fillStyle = '#78350f';
  ctx.fillRect(brX, seaY - 30, 16, 45); // Tower 1
  ctx.fillRect(brX + 90, seaY - 30, 16, 45); // Tower 2
  ctx.strokeStyle = '#94a3b8'; // Suspension cables
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(brX + 8, seaY - 26);
  ctx.quadraticCurveTo(brX + 53, seaY - 10, brX + 98, seaY - 26);
  ctx.stroke();
  // Timber walkway
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(brX + 8, seaY - 12);
  ctx.lineTo(brX + 98, seaY - 12);
  ctx.stroke();

  // Fine white/golden beach sand
  const sandGrad = ctx.createLinearGradient(0, floorY, 0, h);
  sandGrad.addColorStop(0, '#fef3c7');
  sandGrad.addColorStop(1, '#fde68a');
  ctx.fillStyle = sandGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Leaning Coconut Palm Tree
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(70, h);
  ctx.quadraticCurveTo(95, floorY - 50, 140, floorY - 110);
  ctx.stroke();
  // Palm Fronds
  const frondAngles = [-2.5, -2.0, -1.5, -1.0, -0.5, 0, 0.5];
  frondAngles.forEach(fa => {
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(140, floorY - 110);
    ctx.lineTo(140 + Math.cos(fa) * 55, floorY - 110 + Math.sin(fa) * 40);
    ctx.stroke();
  });
}

// -------------------------------------------------------------
// 1. PHOTO 1 REFERENCE: HDB Bedroom
// Pale muted blue/teal walls, white metal security grilles with horizontal glass louvres,
// wooden bed with light-blue and white checkered duvet, nightstand with books, wall electrical socket.
// -------------------------------------------------------------
function drawHDBBedroom(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  currentHour: number
) {
  // Pale muted blue/teal wall gradient
  const wallGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  wallGrad.addColorStop(0, '#8aa6b5');
  wallGrad.addColorStop(0.6, '#7e9cad');
  wallGrad.addColorStop(1, '#6c899a');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Parquet / vinyl wooden floorboards with perspective lines
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#754622');
  floorGrad.addColorStop(1, '#5a3417');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  ctx.strokeStyle = 'rgba(60, 32, 12, 0.6)';
  ctx.lineWidth = 1.5;
  for (let px = -50; px < w + 100; px += 35) {
    ctx.beginPath();
    ctx.moveTo(px, floorY);
    ctx.lineTo(px + (px - w / 2) * 0.4, h);
    ctx.stroke();
  }
  // Floorboard horizontal joints
  for (let py = floorY + 25; py < h; py += 30) {
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(w, py);
    ctx.stroke();
  }

  // Baseboard skirting
  ctx.fillStyle = '#422410';
  ctx.fillRect(0, floorY - 8, w, 8);

  // Electrical wall socket on the left wall with black power cord (from photo)
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(60, 180, 24, 28);
  ctx.fillStyle = '#94a3b8';
  ctx.strokeRect(60, 180, 24, 28);
  // Socket switches
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(64, 186, 6, 8);
  ctx.fillRect(74, 186, 6, 8);
  // Plug and wire trailing to the floor
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(65, 198, 5, 5);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(67, 203);
  ctx.quadraticCurveTo(55, 260, 95, floorY);
  ctx.stroke();

  // Signature HDB Window with adjustable horizontal glass louvres & white security grilles (Photo 1)
  const winX = 460;
  const winY = 30;
  const winW = 280;
  const winH = 190;

  // Window outer reveal
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(winX - 6, winY - 6, winW + 12, winH + 12);
  ctx.fillStyle = '#475569';
  ctx.strokeRect(winX - 6, winY - 6, winW + 12, winH + 12);

  // Outside view (Day vs Night)
  if (currentHour >= 19 || currentHour < 7) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(winX, winY, winW, winH);
    // Distant HDB block lights
    ctx.fillStyle = '#fef08a';
    for (let bx = winX + 20; bx < winX + winW - 30; bx += 25) {
      ctx.fillRect(bx, winY + 60, 8, 8);
      ctx.fillRect(bx + 10, winY + 90, 8, 8);
    }
  } else {
    // Bright tropical Singapore daylight
    const skyGrad = ctx.createLinearGradient(0, winY, 0, winY + winH);
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(1, '#bae6fd');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(winX, winY, winW, winH);

    // Distant pastel HDB block
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(winX + 30, winY + 70, 70, winH - 70);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(winX + 45, winY + 70, 20, winH - 70);
    // Neighbour's block
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(winX + 130, winY + 50, 90, winH - 50);
    // Lush green tree tops outside
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.ellipse(winX + winW - 30, winY + winH - 20, 45, 30, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Horizontal glass louvre slats (tilted)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 3;
  for (let ly = winY + 16; ly < winY + winH; ly += 22) {
    ctx.beginPath();
    ctx.moveTo(winX, ly);
    ctx.lineTo(winX + winW, ly);
    ctx.stroke();
  }

  // White painted metal security grilles (Signature Singapore HDB pattern)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3.5;
  // Vertical grille divider bars
  for (let gx = winX + 45; gx < winX + winW; gx += 45) {
    ctx.beginPath();
    ctx.moveTo(gx, winY);
    ctx.lineTo(gx, winY + winH);
    ctx.stroke();
  }
  // Horizontal grille bars
  for (let gy = winY + 38; gy < winY + winH; gy += 38) {
    ctx.beginPath();
    ctx.moveTo(winX, gy);
    ctx.lineTo(winX + winW, gy);
    ctx.stroke();
  }

  // Angled sunlight beams streaming from the window onto the floor
  if (currentHour >= 8 && currentHour <= 17) {
    ctx.fillStyle = 'rgba(255, 255, 210, 0.12)';
    ctx.beginPath();
    ctx.moveTo(winX + 30, winY + 40);
    ctx.lineTo(winX + winW, winY + 40);
    ctx.lineTo(winX + 120, floorY + 40);
    ctx.lineTo(winX - 160, floorY + 40);
    ctx.closePath();
    ctx.fill();
  }
}

// -------------------------------------------------------------
// 2. PHOTOS 2 & 3 REFERENCE: HDB Void Deck, Lift Lobby (BLK 267) & Facade
// Photo 2: "BLK. 267", alternating salmon/cream tiles, burgundy lift doors with dual oval lattice slits,
// red LED floor indicator "1", Police CCTV sign.
// Photo 3: Upper facade with ochre and bold vermillion red accent panel, clothes drying on bamboo poles, pigeons.
// -------------------------------------------------------------
function drawVoidDeck(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Sky in the background
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // --- HDB Block Upper Facade (Photo 3: "The Little Things" Reference) ---
  // Ochre / Sandy Beige main block wall
  ctx.fillStyle = '#d8ba98';
  ctx.fillRect(360, 20, 440, 160);

  // Bold geometric vermillion red accent section
  ctx.fillStyle = '#c73939';
  ctx.fillRect(520, 20, 140, 160);

  // Black louvered open windows
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(390, 50, 45, 35);
  ctx.fillRect(450, 50, 45, 35);
  ctx.fillRect(680, 50, 45, 35);
  ctx.fillRect(740, 50, 45, 35);
  // Red section windows
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(545, 50, 40, 35);
  ctx.fillRect(600, 50, 40, 35);

  // Open corridor ledge
  ctx.fillStyle = '#eedcc5';
  ctx.fillRect(360, 95, 440, 16);
  ctx.fillStyle = '#bfa588';
  ctx.fillRect(360, 111, 440, 4);

  // Bamboo Laundry Poles with clothes hanging out to dry (Photo 3)
  const poles = [
    { x: 410, y: 100, color: '#facc15' }, // yellow shirt
    { x: 470, y: 100, color: '#f8fafc' }, // white towel
    { x: 570, y: 100, color: '#1e3a8a' }, // navy shorts
    { x: 630, y: 100, color: '#b45309' }, // brown pants
    { x: 710, y: 100, color: '#ef4444' }  // red t-shirt
  ];
  poles.forEach((p, idx) => {
    // Bamboo pole sticking out
    ctx.strokeStyle = '#a16207';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(p.x - 5, p.y + 10);
    ctx.lineTo(p.x + 25, p.y + 35);
    ctx.stroke();

    // Clothes fluttering slightly
    const flutter = Math.sin(tick * 0.08 + idx) * 2;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x + 8, p.y + 20, 14, 18 + flutter);
  });

  // Cute pigeons perched on the concrete ledge (Photo 3)
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.ellipse(500, 93, 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(505, 90, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.ellipse(730, 93, 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Green rain tree branches on the right
  drawRainTreeBranch(ctx, 680, 0, 140, 120);

  // --- PHOTO 2 REFERENCE: HDB Void Deck Lift Lobby (BLK. 267) ---
  // Concrete ceiling beam across the void deck
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 120, w, 35);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, 150, w, 6);

  // Lift Lobby Tiled Wall (Left half, x: 0 to 340)
  const tileWallW = 340;
  // Alternating bands of terracotta-salmon tiles and cream tiles
  const bandH = 22;
  for (let ty = 156; ty < floorY; ty += bandH) {
    const isSalmon = Math.floor((ty - 156) / bandH) % 2 === 0;
    ctx.fillStyle = isSalmon ? '#b86d65' : '#f3eee7';
    ctx.fillRect(0, ty, tileWallW, bandH);

    // Individual tile vertical grout lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 1;
    for (let tx = 0; tx < tileWallW; tx += 26) {
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx, ty + bandH);
      ctx.stroke();
    }
  }

  // White signboard above lift: "BLK. 267" (Exact from Photo 2)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(40, 168, 140, 32);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 168, 140, 32);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 12px "Press Start 2P"';
  ctx.fillText('BLK. 267', 52, 190);

  // Blue Police CCTV notice board (Photo 2)
  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(205, 172, 75, 26);
  ctx.fillStyle = '#ffffff';
  ctx.font = '6px "Press Start 2P"';
  ctx.fillText('POLICE CCTV', 210, 184);
  ctx.fillText('IN OPERATION', 208, 193);

  // Stainless Steel Lift Entrance Frame (Photo 2)
  const liftX = 70;
  const liftY = 205;
  const liftW = 150;
  const liftH = floorY - liftY;

  ctx.fillStyle = '#cbd5e1'; // Stainless steel outer architrave
  ctx.fillRect(liftX - 10, liftY - 12, liftW + 20, liftH + 12);
  ctx.fillStyle = '#94a3b8';
  ctx.strokeRect(liftX - 10, liftY - 12, liftW + 20, liftH + 12);

  // Red LED 7-segment digital floor indicator: "1" (Photo 2)
  ctx.fillStyle = '#000000';
  ctx.fillRect(liftX + 45, liftY - 10, 60, 16);
  ctx.fillStyle = '#ef4444'; // Glowing red digital display
  ctx.font = '9px "Press Start 2P"';
  ctx.fillText('▲ 1', liftX + 57, liftY + 2);

  // Dark burgundy elevator doors with central seam (Photo 2)
  ctx.fillStyle = '#8c525b';
  ctx.fillRect(liftX, liftY + 8, liftW, liftH - 8);
  // Center door seam
  ctx.strokeStyle = '#4a252c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(liftX + liftW / 2, liftY + 8);
  ctx.lineTo(liftX + liftW / 2, floorY);
  ctx.stroke();

  // The iconic pair of long vertical glass windows with decorative lattice crosses (Photo 2)
  const drawLiftWindow = (wx: number) => {
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(wx - 2, liftY + 24, 18, 55);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(wx, liftY + 26, 14, 51);
    // Decorative curved lattice cross inside window
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(wx + 2, liftY + 36);
    ctx.lineTo(wx + 12, liftY + 68);
    ctx.moveTo(wx + 12, liftY + 36);
    ctx.lineTo(wx + 2, liftY + 68);
    ctx.stroke();
  };
  drawLiftWindow(liftX + 25);
  drawLiftWindow(liftX + liftW - 39);

  // Silver call button panel on right side of door
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(liftX + liftW + 12, liftY + 45, 16, 30);
  ctx.fillStyle = '#10b981'; // Green lit arrow
  ctx.fillRect(liftX + liftW + 16, liftY + 52, 8, 6);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(liftX + liftW + 16, liftY + 62, 8, 6);

  // Void Deck Concourse Floor (Square grey tiles)
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  for (let gx = 0; gx < w; gx += 45) {
    for (let gy = floorY; gy < h; gy += 45) {
      ctx.strokeRect(gx, gy, 45, 45);
    }
  }

  // Stone chess table with stools in the right void deck concourse
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.ellipse(540, floorY + 30, 45, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#64748b';
  ctx.fillRect(518, floorY + 30, 44, 25);
  // Checkerboard on table
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(525, floorY + 22, 30, 14);
  // 4 round stone stools around table
  const stools = [
    { x: 480, y: floorY + 20 },
    { x: 600, y: floorY + 20 },
    { x: 510, y: floorY + 55 },
    { x: 570, y: floorY + 55 }
  ];
  ctx.fillStyle = '#94a3b8';
  stools.forEach(st => {
    ctx.beginPath();
    ctx.ellipse(st.x, st.y, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

// -------------------------------------------------------------
// 3. PHOTOS 4 & 5 REFERENCE: School Covered Walkway & Ice Cream Uncle Cart
// Flat sheltered covered linkway with square grey pillars, yellow warning tactile line,
// green and orange segmented umbrella ice cream cart, queueing students in uniform, rain trees.
// -------------------------------------------------------------
function drawSchoolGate(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Vibrant Singapore tropical sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(1, '#7dd3fc');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Distant HDB residential blocks behind the school (Photo 4)
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(80, 15, 95, 120);
  ctx.fillRect(580, 20, 110, 115);
  // HDB window grids
  ctx.fillStyle = '#94a3b8';
  for (let hy = 25; hy < 110; hy += 16) {
    ctx.fillRect(90, hy, 16, 9);
    ctx.fillRect(115, hy, 16, 9);
    ctx.fillRect(140, hy, 16, 9);
    ctx.fillRect(595, hy, 18, 9);
    ctx.fillRect(625, hy, 18, 9);
    ctx.fillRect(655, hy, 18, 9);
  }

  // --- NGEE ANN PRIMARY / SG SCHOOL FACADE (Photo 4) ---
  // Crisp white and sky-blue multistory classroom block
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(40, 35, 720, 140);
  // Sky-blue structural bands & cantilevered corridor lintels (Photo 4)
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(40, 35, 720, 14);
  ctx.fillRect(40, 80, 720, 10);
  ctx.fillRect(40, 125, 720, 10);

  // Classroom tinted windows & safety railings
  for (let r = 0; r < 3; r++) {
    const wy = 52 + r * 42;
    for (let wx = 60; wx < 720; wx += 50) {
      // Windows
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(wx, wy, 36, 20);
      // White corridor safety railing (Photo 4)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(wx - 4, wy + 14, 44, 8);
    }
  }

  // Red school crest emblem on the main entrance facade
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(380, 58, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 7px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PRIMARY', 380, 56);
  ctx.fillText('SCHOOL', 380, 64);
  ctx.textAlign = 'start';

  // Singapore Flagpole fluttering proudly (Photo 4)
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(220, floorY);
  ctx.lineTo(220, 25);
  ctx.stroke();
  // Gold ball on top of flagpole
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(220, 24, 4, 0, Math.PI * 2);
  ctx.fill();
  // Singapore National Flag (Red & White with crescent & 5 stars)
  const flagWave = Math.sin(tick * 0.15) * 3;
  ctx.fillStyle = '#ef4444'; // Red top half
  ctx.fillRect(222, 28 + flagWave, 28, 10);
  ctx.fillStyle = '#ffffff'; // White bottom half
  ctx.fillRect(222, 38 + flagWave, 28, 10);
  // White crescent & stars on red half
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(228, 33 + flagWave, 3, 0, Math.PI * 2);
  ctx.fill();

  // Lush Rain Trees and Green Foliage behind fence (Photo 4/5)
  drawRainTrees(ctx, 80, 170);
  drawRainTrees(ctx, 420, 170);
  drawRainTrees(ctx, 620, 170);

  // Dense garden hedge with red-tipped tropical shrubs alongside the walkway
  for (let hx = 0; hx < w; hx += 50) {
    ctx.fillStyle = '#15803d'; // Rich green hedge
    ctx.beginPath();
    ctx.ellipse(hx + 25, 225, 35, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    // Red-tipped ornamental shrub accents (Photo 4/5)
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.ellipse(hx + 35, 215, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- THE COVERED LINKWAY (Photos 4 & 5) ---
  // Sheltered roof canopy running overhead
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 160, w, 22);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, 182, w, 6);

  // Sturdy square concrete pillars supporting the covered walkway
  const pillars = [60, 260, 480, 680];
  pillars.forEach(px => {
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(px, 188, 24, floorY - 188);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(px + 18, 188, 6, floorY - 188);
  });

  // Walkway Pavement (Smooth red-brick/grey stone paving)
  ctx.fillStyle = '#b45309';
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 1.5;
  for (let bx = 0; bx < w; bx += 30) {
    ctx.strokeRect(bx, floorY, 30, h - floorY);
  }

  // Yellow warning tactile paving line along the walkway edge (Photo 4/5)
  ctx.fillStyle = '#eab308';
  ctx.fillRect(0, floorY + 4, w, 14);
  // Tactile studs
  ctx.fillStyle = '#ca8a04';
  for (let dot = 6; dot < w; dot += 16) {
    ctx.fillRect(dot, floorY + 7, 8, 8);
  }

  // Queuing secondary / primary school students in uniform waiting for ice cream (Photos 4 & 5)
  const students = [
    { x: 300, y: floorY - 10, gender: 'boy' },
    { x: 340, y: floorY - 10, gender: 'girl' },
    { x: 380, y: floorY - 10, gender: 'boy' }
  ];
  students.forEach((st, idx) => {
    const bob = Math.sin(tick * 0.1 + idx) * 2;
    // Legs
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(st.x - 6, st.y - 12 + bob, 5, 12);
    ctx.fillRect(st.x + 1, st.y - 12 + bob, 5, 12);
    // Crisp white school shirt
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(st.x - 8, st.y - 32 + bob, 16, 20);
    // School backpack
    ctx.fillStyle = idx % 2 === 0 ? '#dc2626' : '#2563eb';
    ctx.fillRect(st.x - 14, st.y - 30 + bob, 7, 16);
    // Head & hair
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(st.x, st.y - 40 + bob, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#29180c';
    ctx.beginPath();
    ctx.arc(st.x, st.y - 43 + bob, 9, Math.PI, Math.PI * 2);
    ctx.fill();
  });
}

// -------------------------------------------------------------
// 4. PHOTO 6 REFERENCE: Traditional Mama Shop Redesign
// Varied architectural structure, vintage canvas awning, stepped shelves,
// authentic glass snack jars with red lids, drinks chiller, ice cream chest freezer,
// localized hanging snacks, and animated shopkeeper Uncle with wiping & stocking idle loops.
// -------------------------------------------------------------
function drawMamaShop(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Cozy warm HDB void deck interior backdrop
  const bgGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  bgGrad.addColorStop(0, '#1c1917');
  bgGrad.addColorStop(0.6, '#292524');
  bgGrad.addColorStop(1, '#3f3f46');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Left White HDB Structural Pillar & Wall
  const pillarW = 80;
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, pillarW, floorY);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(pillarW - 6, 0, 6, floorY);

  // Red circle-slash NO SMOKING sign on pillar
  const noSmokeY = 70;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(14, noSmokeY, 52, 44);
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(40, noSmokeY + 20, 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(30, noSmokeY + 10);
  ctx.lineTo(50, noSmokeY + 30);
  ctx.stroke();
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(35, noSmokeY + 18, 10, 4);
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 6px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NO SMOKING', 40, noSmokeY + 40);
  ctx.textAlign = 'left';

  // Lighter & battery display cabinet on pillar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(14, noSmokeY + 52, 52, 75);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.strokeRect(14, noSmokeY + 52, 52, 75);
  const lighterColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
  for (let ly = noSmokeY + 58; ly < noSmokeY + 120; ly += 14) {
    for (let lx = 18; lx < 60; lx += 9) {
      ctx.fillStyle = lighterColors[(lx + ly) % lighterColors.length];
      ctx.fillRect(lx, ly, 7, 9);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(lx + 1, ly - 2, 5, 2);
    }
  }

  // --- VINTAGE BLUE-AND-WHITE STRIPED SHOP AWNING ---
  const awningY = 16;
  const awningH = 34;
  const awningStartX = pillarW;
  const awningW = w - pillarW - 10;
  const stripeW = 24;
  let stripeIdx = 0;
  for (let ax = awningStartX; ax < awningStartX + awningW; ax += stripeW) {
    ctx.fillStyle = stripeIdx % 2 === 0 ? '#0284c7' : '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(ax, awningY);
    ctx.lineTo(ax + stripeW, awningY);
    ctx.lineTo(ax + stripeW - 6, awningY + awningH);
    ctx.lineTo(ax - 6, awningY + awningH);
    ctx.closePath();
    ctx.fill();

    // Scalloped valance edge
    ctx.beginPath();
    ctx.arc(ax + stripeW / 2 - 3, awningY + awningH, 8, 0, Math.PI);
    ctx.fill();
    stripeIdx++;
  }
  // Awning frame trim
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(awningStartX, awningY + awningH - 3, awningW - 6, 4);

  // --- STEPPED MULTI-TIER BACK WALL WOODEN SHELVES (Varied architecture) ---
  const shelfX = pillarW + 10;
  const shelfW = 390;
  for (let row = 0; row < 4; row++) {
    const ry = 65 + row * 42;
    // Stepped width: top shelves are slightly wider
    const curShelfW = shelfW - row * 10;

    // Shelf bracket supports
    ctx.fillStyle = '#451a03';
    ctx.fillRect(shelfX + 20, ry + 24, 10, 16);
    ctx.fillRect(shelfX + curShelfW - 30, ry + 24, 10, 16);

    // Warm wooden shelf plank
    ctx.fillStyle = '#78350f';
    ctx.fillRect(shelfX, ry + 24, curShelfW, 8);
    ctx.fillStyle = '#451a03';
    ctx.fillRect(shelfX, ry + 30, curShelfW, 2);

    if (row === 0) {
      // Row 0: Iconic TRADITIONAL CLEAR GLASS TIDBIT JARS WITH RED LIDS
      const jarW = 28;
      const jarH = 22;
      const biscuitColors = ['#f59e0b', '#d97706', '#fbbf24', '#b45309', '#e0a96d', '#fde047', '#fed7aa'];
      for (let jx = shelfX + 12; jx < shelfX + curShelfW - 20; jx += 38) {
        // Red plastic screw-on lid
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(jx + 3, ry + 2, jarW - 6, 4);
        ctx.fillRect(jx + 6, ry, jarW - 12, 2);

        // Glass jar body
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillRect(jx, ry + 6, jarW, jarH);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(jx, ry + 6, jarW, jarH);

        // Colorful biscuits / snacks inside jar
        const bCol = biscuitColors[(jx) % biscuitColors.length];
        for (let bx = jx + 4; bx < jx + jarW - 4; bx += 6) {
          for (let by = ry + 10; by < ry + jarH + 4; by += 5) {
            ctx.fillStyle = bCol;
            ctx.fillRect(bx, by, 4, 3);
            if ((bx + by) % 3 === 0) {
              // Pink / green iced gem tops!
              ctx.fillStyle = (bx % 2 === 0) ? '#f472b6' : '#34d399';
              ctx.fillRect(bx + 1, by - 1, 2, 2);
            }
          }
        }
        // Glass specular shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(jx + 2, ry + 8, 3, jarH - 4);
      }
    } else if (row === 1) {
      // Row 1: Shampoos, Talcum powders & Dettol/Lifebuoy Soaps
      for (let px = shelfX + 10; px < shelfX + curShelfW - 15; px += 20) {
        ctx.fillStyle = ['#dc2626', '#2563eb', '#16a34a', '#f59e0b'][(px) % 4];
        ctx.fillRect(px, ry + 8, 14, 16);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(px + 2, ry + 12, 10, 5);
      }
    } else {
      // Row 2 & 3: Canned Milo tins, condensed milk, canned sardines, Tiger Balm
      for (let px = shelfX + 8; px < shelfX + curShelfW - 12; px += 18) {
        ctx.fillStyle = ['#15803d', '#dc2626', '#d97706', '#0284c7'][(px + row) % 4];
        ctx.fillRect(px, ry + 10, 13, 14);
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(px + 2, ry + 10, 9, 3);
      }
    }
  }

  // --- RIGHT CORNER: UPRIGHT COLD DRINKS CHILLER REFRIGERATOR ---
  const fridgeX = w - 175;
  const fridgeY = 55;
  const fridgeW = 100;
  const fridgeH = floorY - fridgeY - 4;

  // Metal outer casing
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(fridgeX, fridgeY, fridgeW, fridgeH);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.strokeRect(fridgeX, fridgeY, fridgeW, fridgeH);

  // Illuminated top header sign ("COLD DRINKS • 冰水")
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(fridgeX + 4, fridgeY + 4, fridgeW - 8, 16);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 7px monospace';
  ctx.fillText('COLD DRINKS 冰水', fridgeX + 8, fridgeY + 15);

  // Glass door with blue illuminated interior
  ctx.fillStyle = 'rgba(14, 165, 233, 0.15)';
  ctx.fillRect(fridgeX + 4, fridgeY + 22, fridgeW - 8, fridgeH - 26);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(fridgeX + 4, fridgeY + 22, fridgeW - 8, fridgeH - 26);

  // Wire shelves inside fridge stocked with Yeo's Chrysanthemum, Soya Bean, Pokka, 100PLUS
  for (let fRow = 0; fRow < 4; fRow++) {
    const fry = fridgeY + 30 + fRow * 28;
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(fridgeX + 6, fry + 18);
    ctx.lineTo(fridgeX + fridgeW - 6, fry + 18);
    ctx.stroke();

    // Drink cans & packet drinks
    const drinkPacks = [
      { col: '#facc15', label: 'YEO' }, // Chrysanthemum Tea Yellow
      { col: '#16a34a', label: 'SOY' }, // Soya Bean Green
      { col: '#0284c7', label: '100' }, // 100PLUS Blue
      { col: '#dc2626', label: 'COK' }, // Red Soda
      { col: '#a855f7', label: 'GRA' }  // Grape
    ];
    drinkPacks.forEach((dp, di) => {
      const dx = fridgeX + 8 + di * 16;
      ctx.fillStyle = dp.col;
      ctx.fillRect(dx, fry + 2, 12, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(dx + 2, fry + 6, 8, 4);
    });
  }

  // --- RETRO ICE CREAM CHEST FREEZER (Beside fridge) ---
  const freezerX = fridgeX - 95;
  const freezerY = floorY - 95;
  const freezerW = 90;
  const freezerH = 92;

  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(freezerX, freezerY, freezerW, freezerH);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(freezerX, freezerY, freezerW, 10);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 6px sans-serif';
  ctx.fillText('ICE CREAM 雪糕', freezerX + 10, freezerY + 8);

  // Sliding curved glass top
  ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.fillRect(freezerX + 6, freezerY + 12, freezerW - 12, 28);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(freezerX + 6, freezerY + 12, freezerW - 12, 28);

  // Ice cream packs visible through glass (Potong, Paddle Pop, Cornetto)
  const icColors = ['#10b981', '#f43f5e', '#8b5cf6', '#f59e0b'];
  icColors.forEach((ic, i) => {
    ctx.fillStyle = ic;
    ctx.fillRect(freezerX + 12 + i * 18, freezerY + 18, 14, 16);
  });

  // --- OVERHEAD SUSPENSION WIRES WITH LOCALIZED HANGING MAGAZINES & SNACK PACKS ---
  ctx.strokeStyle = '#a8a29e';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(pillarW, 50);
  ctx.lineTo(fridgeX - 10, 50);
  ctx.stroke();

  // Hanging snack packets (Keropok, Dahfa Fish Fillet, Mamee Monster, Haw Flakes)
  const hangingSnacks = [
    { name: 'KEROPOK', col: '#ef4444' },
    { name: 'DAHFA', col: '#f59e0b' },
    { name: 'MAMEE', col: '#eab308' },
    { name: 'APOLLO', col: '#b45309' },
    { name: 'HAW', col: '#dc2626' }
  ];
  hangingSnacks.forEach((hs, idx) => {
    const hx = pillarW + 20 + idx * 52;
    // Wooden peg
    ctx.fillStyle = '#b45309';
    ctx.fillRect(hx + 8, 48, 4, 6);

    // Strip of 3 snack packets linked vertically
    for (let p = 0; p < 3; p++) {
      const py = 54 + p * 18;
      ctx.fillStyle = hs.col;
      ctx.fillRect(hx, py, 20, 15);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(hx, py, 20, 15);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(hx + 3, py + 3, 14, 4);
    }
  });

  // Hanging warm Edison lightbulbs
  [210, 360, 500].forEach(bx => {
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx, 16);
    ctx.lineTo(bx, 45);
    ctx.stroke();

    const flicker = Math.sin(tick * 0.15 + bx) * 0.05;
    const bulbGlow = ctx.createRadialGradient(bx, 52, 2, bx, 52, 35);
    bulbGlow.addColorStop(0, `rgba(254, 240, 138, ${0.85 + flicker})`);
    bulbGlow.addColorStop(0.5, `rgba(251, 191, 36, ${0.35 + flicker})`);
    bulbGlow.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = bulbGlow;
    ctx.beginPath();
    ctx.arc(bx, 52, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(bx, 52, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // --- ANIMATED SHOPKEEPER NPC (UNCLE) WITH NATURAL FLUID IDLE CYCLES ---
  const counterY = 240;
  const baseUncleX = 350;
  
  // Natural subtle body swaying & breathing
  const bodySway = Math.sin(tick * 0.03) * 1.8;
  const breathBob = Math.sin(tick * 0.06) * 1.2;
  const uncleX = baseUncleX + bodySway;
  const uncleY = counterY - 56 + breathBob;
  
  // Head gentle natural lag/lead
  const headBob = Math.sin(tick * 0.06 + 0.4) * 1.0;
  const headTilt = Math.sin(tick * 0.03 + 0.3) * 1.2;

  // Animation cycle: 540 frames loop with smooth transitions
  // 0 - 220: Circular cloth wiping with articulated elbow & wrist
  // 220 - 360: Warm greeting, gentle head nod, friendly wave to patron
  // 360 - 540: Holding & reading Straits Times newspaper, natural breathing
  const fullCycle = 540;
  const cycleTick = tick % fullCycle;

  // Uncle Torso (Light cream collared short-sleeve shirt with gentle breathing expansion)
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(uncleX - 20, uncleY + 22, 40, 36);
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1;
  ctx.strokeRect(uncleX - 20, uncleY + 22, 40, 36);

  // Shirt collar & chest pocket with pen
  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  ctx.moveTo(uncleX - 10, uncleY + 22);
  ctx.lineTo(uncleX, uncleY + 31);
  ctx.lineTo(uncleX + 10, uncleY + 22);
  ctx.closePath();
  ctx.fill();
  // Small red ballpoint pen in pocket
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(uncleX - 14, uncleY + 29, 6, 8);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(uncleX - 12, uncleY + 27, 2, 5);

  // Head & Warm Skin Tone
  ctx.fillStyle = '#9a3412';
  ctx.beginPath();
  ctx.arc(uncleX + headTilt, uncleY + 8 + headBob, 15, 0, Math.PI * 2);
  ctx.fill();

  // Natural Salt-and-Pepper Wavy Hair
  ctx.fillStyle = '#292524';
  ctx.beginPath();
  ctx.arc(uncleX + headTilt, uncleY + 4 + headBob, 16, Math.PI * 0.75, Math.PI * 2.25);
  ctx.fill();
  // Grey hair highlights at temples
  ctx.fillStyle = '#a8a29e';
  ctx.fillRect(uncleX - 14 + headTilt, uncleY + 3 + headBob, 4, 3);
  ctx.fillRect(uncleX + 10 + headTilt, uncleY + 3 + headBob, 4, 3);

  // Retro Wire Spectacles
  ctx.strokeStyle = '#d4d4d8';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(uncleX - 10 + headTilt, uncleY + 6 + headBob, 7, 6);
  ctx.strokeRect(uncleX + 3 + headTilt, uncleY + 6 + headBob, 7, 6);
  ctx.beginPath();
  ctx.moveTo(uncleX - 3 + headTilt, uncleY + 9 + headBob);
  ctx.lineTo(uncleX + 3 + headTilt, uncleY + 9 + headBob);
  ctx.stroke();

  // Natural Eye Blinking
  const isBlinking = tick % 150 < 6;
  if (!isBlinking) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(uncleX - 8 + headTilt, uncleY + 8 + headBob, 3, 3);
    ctx.fillRect(uncleX + 5 + headTilt, uncleY + 8 + headBob, 3, 3);
    // Eyebrows
    ctx.fillRect(uncleX - 9 + headTilt, uncleY + 4 + headBob, 5, 2);
    ctx.fillRect(uncleX + 4 + headTilt, uncleY + 4 + headBob, 5, 2);
  } else {
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(uncleX - 9 + headTilt, uncleY + 9 + headBob);
    ctx.lineTo(uncleX - 5 + headTilt, uncleY + 9 + headBob);
    ctx.moveTo(uncleX + 4 + headTilt, uncleY + 9 + headBob);
    ctx.lineTo(uncleX + 8 + headTilt, uncleY + 9 + headBob);
    ctx.stroke();
  }

  // Signature Moustache
  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.ellipse(uncleX + headTilt, uncleY + 16 + headBob, 8, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Friendly Smile (Warmer when looking at patron)
  const isGreetingPhase = cycleTick >= 220 && cycleTick < 360;
  ctx.strokeStyle = '#fef3c7';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(uncleX + headTilt, uncleY + 17 + headBob, isGreetingPhase ? 5 : 3.2, 0.15, Math.PI - 0.15);
  ctx.stroke();

  // Uncle Articulated Arms & Natural Movement
  if (cycleTick < 220) {
    // --- MODE 1: NATURAL CIRCULAR COUNTER POLISHING ---
    // Left arm comfortably bracing on counter
    ctx.strokeStyle = '#9a3412';
    ctx.lineWidth = 5.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(uncleX - 16, uncleY + 28);
    ctx.lineTo(uncleX - 26, counterY - 12);
    ctx.lineTo(uncleX - 22, counterY - 2);
    ctx.stroke();

    // Right arm wiping in organic circular ellipse pattern
    const wipeSpeed = tick * 0.1;
    const wipeX = Math.cos(wipeSpeed) * 16;
    const wipeY = Math.sin(wipeSpeed) * 5;
    const elbowX = uncleX + 22 + wipeX * 0.35;
    const elbowY = counterY - 16 + wipeY * 0.4;
    const handX = uncleX + 20 + wipeX;
    const handY = counterY - 3 + wipeY;

    ctx.beginPath();
    ctx.moveTo(uncleX + 16, uncleY + 28);
    ctx.lineTo(elbowX, elbowY);
    ctx.lineTo(handX, handY);
    ctx.stroke();

    // Yellow Good Morning / Microfiber cleaning cloth moving with hand
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(handX + 2, handY - 1, 9, 5, wipeSpeed * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.stroke();
  } else if (cycleTick >= 220 && cycleTick < 360) {
    // --- MODE 2: WARM GREETING & FRIENDLY HAND WAVE ---
    // Left hand resting relaxed on countertop
    ctx.strokeStyle = '#9a3412';
    ctx.lineWidth = 5.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(uncleX - 16, uncleY + 28);
    ctx.lineTo(uncleX - 24, counterY - 10);
    ctx.lineTo(uncleX - 20, counterY - 2);
    ctx.stroke();

    // Right arm raised in welcoming wave
    const waveAngle = Math.sin(tick * 0.18) * 8;
    const waveElbowX = uncleX + 24;
    const waveElbowY = uncleY + 20;
    const waveHandX = uncleX + 28 + waveAngle;
    const waveHandY = uncleY + 2;

    ctx.beginPath();
    ctx.moveTo(uncleX + 16, uncleY + 28);
    ctx.lineTo(waveElbowX, waveElbowY);
    ctx.lineTo(waveHandX, waveHandY);
    ctx.stroke();

    // Open hand waving palm
    ctx.fillStyle = '#9a3412';
    ctx.beginPath();
    ctx.arc(waveHandX, waveHandY - 2, 4.5, 0, Math.PI * 2);
    ctx.fill();
    // Fingers
    for (let f = -2; f <= 2; f++) {
      ctx.fillRect(waveHandX + f * 2 - 1, waveHandY - 8 + Math.abs(f), 1.8, 4);
    }
  } else {
    // --- MODE 3: HOLDING & READING NEWSPAPER ---
    // Left & right arms holding newspaper open
    ctx.strokeStyle = '#9a3412';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Left arm to paper
    ctx.beginPath();
    ctx.moveTo(uncleX - 16, uncleY + 28);
    ctx.lineTo(uncleX - 22, counterY - 14);
    ctx.lineTo(uncleX - 14, counterY - 6);
    ctx.stroke();

    // Right arm to paper
    ctx.beginPath();
    ctx.moveTo(uncleX + 16, uncleY + 28);
    ctx.lineTo(uncleX + 22, counterY - 14);
    ctx.lineTo(uncleX + 14, counterY - 6);
    ctx.stroke();

    // The Straits Times Newspaper sheet
    const paperX = uncleX - 18;
    const paperY = counterY - 22;
    ctx.fillStyle = '#f5f5f4';
    ctx.fillRect(paperX, paperY, 36, 22);
    ctx.strokeStyle = '#a8a29e';
    ctx.lineWidth = 1;
    ctx.strokeRect(paperX, paperY, 36, 22);

    // Newspaper center crease
    ctx.strokeStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(uncleX, paperY);
    ctx.lineTo(uncleX, paperY + 22);
    ctx.stroke();

    // Newspaper headline text lines
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(paperX + 2, paperY + 3, 14, 2); // Red header
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(paperX + 2, paperY + 7, 14, 1.5);
    ctx.fillRect(paperX + 2, paperY + 10, 14, 1.5);
    ctx.fillRect(paperX + 2, paperY + 13, 14, 1.5);
    ctx.fillRect(paperX + 20, paperY + 3, 14, 1.5);
    ctx.fillRect(paperX + 20, paperY + 6, 14, 1.5);
    ctx.fillRect(paperX + 20, paperY + 9, 14, 1.5);
    ctx.fillRect(paperX + 20, paperY + 12, 14, 1.5);
  }

  // --- RICH WOODEN MAMA SHOP COUNTER & DISPLAY ---
  const counterX = pillarW;
  const counterW = freezerX - pillarW + 5;
  // Counter top slab
  ctx.fillStyle = '#5c2b0e';
  ctx.fillRect(counterX, counterY - 8, counterW, 12);
  ctx.fillStyle = '#3f1d08';
  ctx.fillRect(counterX, counterY + 4, counterW, floorY - counterY);

  // Front counter display compartments with wafer bars, Mentos, sweets
  ctx.fillStyle = '#78350f';
  ctx.fillRect(counterX + 10, counterY + 16, counterW - 20, 48);
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 2;
  ctx.strokeRect(counterX + 10, counterY + 16, counterW - 20, 48);

  const confectionColors = ['#dc2626', '#facc15', '#2563eb', '#16a34a', '#ea580c', '#8b5cf6', '#ec4899'];
  for (let cy = counterY + 20; cy < counterY + 58; cy += 12) {
    for (let cx = counterX + 16; cx < counterX + counterW - 24; cx += 16) {
      const cCol = confectionColors[(cx + cy) % confectionColors.length];
      ctx.fillStyle = cCol;
      ctx.fillRect(cx, cy, 13, 9);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx + 2, cy + 2, 9, 3);
    }
  }

  // Retro Orange/Yellow Push-Button Cash Register
  const regX = counterX + 20;
  const regY = counterY - 42;
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(regX, regY, 50, 36);
  ctx.fillStyle = '#c2410c';
  ctx.fillRect(regX, regY + 30, 50, 6);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(regX + 6, regY + 12, 38, 16);
  for (let by = regY + 14; by < regY + 26; by += 4) {
    for (let bx = regX + 8; bx < regX + 42; bx += 6) {
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(bx, by, 4, 3);
    }
  }
  ctx.fillStyle = '#064e3b';
  ctx.fillRect(regX + 8, regY + 4, 34, 7);
  ctx.fillStyle = '#4ade80';
  ctx.font = 'bold 5px monospace';
  ctx.fillText('$1.50', regX + 12, regY + 9);

  // Woven plastic sweet baskets on counter top
  const baskets = [
    { x: uncleX - 85, col: '#f8fafc', sweetCol: '#ef4444' }, // White basket
    { x: uncleX + 55, col: '#3b82f6', sweetCol: '#facc15' }  // Blue basket
  ];
  baskets.forEach(b => {
    ctx.fillStyle = b.col;
    ctx.fillRect(b.x, counterY - 20, 34, 14);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.strokeRect(b.x, counterY - 20, 34, 14);
    for (let s = 0; s < 4; s++) {
      ctx.fillStyle = b.sweetCol;
      ctx.beginPath();
      ctx.arc(b.x + 6 + s * 7, counterY - 20, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Hanging Milo Tin Coin Holder (Pulley Coin Container - Iconic Singapore Detail!)
  const coinTinX = uncleX + 105;
  ctx.strokeStyle = '#78716c';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(coinTinX + 7, 50);
  ctx.lineTo(coinTinX + 7, counterY - 45);
  ctx.stroke();

  ctx.fillStyle = '#15803d'; // Milo green tin
  ctx.fillRect(coinTinX, counterY - 45, 15, 20);
  ctx.fillStyle = '#facc15';
  ctx.fillRect(coinTinX + 2, counterY - 38, 11, 4);

  // Authentic HDB Void Deck Terrazzo / Tile Floor
  ctx.fillStyle = '#52525b';
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#3f3f46';
  ctx.lineWidth = 2;
  for (let fx = 0; fx < w; fx += 48) {
    ctx.strokeRect(fx, floorY, 48, h - floorY);
  }
}

// -------------------------------------------------------------
// UNIVERSAL TERTIARY: Neighbourhood Student Cafe & Study Lounge
// Scandinavian timber aesthetics, acoustic wood slats, warm Edison bulbs,
// barista espresso & iced teh-c counter, study carrels, and pastry display.
// -------------------------------------------------------------
function drawStudentCafe(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Cozy industrial cafe aesthetic: warm brick wall & dark timber
  const bgGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  bgGrad.addColorStop(0, '#1c1917');
  bgGrad.addColorStop(0.4, '#292524');
  bgGrad.addColorStop(1, '#44403c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Exposed Red Brick Accent Wall on left & middle
  ctx.fillStyle = '#7f1d1d';
  for (let by = 0; by < floorY; by += 16) {
    const isOdd = (by / 16) % 2 === 1;
    const startX = isOdd ? -14 : 0;
    for (let bx = startX; bx < 380; bx += 32) {
      ctx.fillStyle = (bx + by) % 64 === 0 ? '#991b1b' : '#7f1d1d';
      ctx.fillRect(bx + 1, by + 1, 30, 14);
      ctx.fillStyle = '#44403c';
      ctx.fillRect(bx, by, 32, 1);
      ctx.fillRect(bx, by, 1, 15);
    }
  }

  // Dark Walnut Acoustic Wood Slats along upper wall
  ctx.fillStyle = '#451a03';
  for (let sx = 370; sx < w; sx += 14) {
    ctx.fillRect(sx, 0, 5, 80);
  }

  // Hanging Industrial Steel Ceiling Grid with Cascading Indoor Greenery
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 26);
  ctx.lineTo(w, 26);
  ctx.stroke();
  for (let gx = 40; gx < w; gx += 50) {
    ctx.strokeRect(gx, 10, 40, 16);
  }

  // Cascading Devil's Ivy (Pothos) & Hanging Vines
  const plantClusters = [60, 150, 290, 480, 620, 710];
  plantClusters.forEach(px => {
    ctx.fillStyle = '#b45309';
    ctx.fillRect(px - 10, 24, 20, 10);
    for (let leaf = 0; leaf < 6; leaf++) {
      const sway = Math.sin(tick * 0.05 + px + leaf) * 4;
      const lx = px - 12 + leaf * 5 + sway;
      const ly = 32 + leaf * 6;
      ctx.fillStyle = leaf % 2 === 0 ? '#15803d' : '#22c55e';
      ctx.beginPath();
      ctx.ellipse(lx, ly, 4, 7, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Large Picture Window looking out onto sunny Singapore rain trees & foliage
  const winX = 18;
  const winY = 60;
  const winW = 155;
  const winH = 145;

  ctx.fillStyle = '#0c0a09';
  ctx.fillRect(winX, winY, winW, winH);
  const gardenGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
  gardenGrad.addColorStop(0, '#7dd3fc');
  gardenGrad.addColorStop(0.4, '#86efac');
  gardenGrad.addColorStop(1, '#15803d');
  ctx.fillStyle = gardenGrad;
  ctx.fillRect(winX + 4, winY + 4, winW - 8, winH - 8);

  // Tropical Rain Trees in window
  ctx.fillStyle = '#065f46';
  for (let tx = winX + 15; tx < winX + winW - 10; tx += 36) {
    ctx.beginPath();
    ctx.arc(tx, winY + winH - 12, 26, Math.PI, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = '#1c1917';
  ctx.lineWidth = 4;
  ctx.strokeRect(winX + 2, winY + 2, winW - 4, winH - 4);
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2, winY);
  ctx.lineTo(winX + winW / 2, winY + winH);
  ctx.moveTo(winX, winY + winH / 2);
  ctx.lineTo(winX + winW, winY + winH / 2);
  ctx.stroke();

  // Blackboard Wall & Hand-drawn Chalk Specials
  const menuX = 190;
  const menuY = 70;
  const menuW = 165;
  const menuH = 130;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(menuX, menuY, menuW, menuH);
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 3;
  ctx.strokeRect(menuX, menuY, menuW, menuH);

  // Chalk Latte Art Coffee Cup Drawing
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(menuX + 125, menuY + 12, 22, 16);
  ctx.beginPath();
  ctx.arc(menuX + 149, menuY + 20, 5, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();
  const sWave = Math.sin(tick * 0.1) * 2;
  ctx.beginPath();
  ctx.moveTo(menuX + 132 + sWave, menuY + 10);
  ctx.lineTo(menuX + 134 - sWave, menuY + 4);
  ctx.moveTo(menuX + 139 - sWave, menuY + 10);
  ctx.lineTo(menuX + 141 + sWave, menuY + 4);
  ctx.stroke();

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 7px "Press Start 2P", monospace';
  ctx.fillText('STUDENT LOUNGE', menuX + 8, menuY + 18);
  ctx.fillStyle = '#ffffff';
  ctx.font = '5.5px monospace';
  ctx.fillText('• Iced Teh-C Peng . . $2.20', menuX + 8, menuY + 36);
  ctx.fillText('• Milo Dinosaur . . . $2.80', menuX + 8, menuY + 50);
  ctx.fillText('• Kaya Toast & Eggs . $3.50', menuX + 8, menuY + 64);
  ctx.fillText('• Pandan Chiffon . . . $2.50', menuX + 8, menuY + 78);
  ctx.fillText('• Cold Brew Tea . . . $3.00', menuX + 8, menuY + 92);
  ctx.fillStyle = '#4ade80';
  ctx.font = 'bold 5px monospace';
  ctx.fillText('FREE WIFI • STUDY PODS • 24/7', menuX + 8, menuY + 116);

  // Warm Edison Hanging Bulbs with Pulsing Halos
  [110, 260, 440, 600, 720].forEach(lx => {
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(lx, 0);
    ctx.lineTo(lx, 55);
    ctx.stroke();

    const flicker = Math.sin(tick * 0.1 + lx) * 0.08;
    const bulbGlow = ctx.createRadialGradient(lx, 60, 2, lx, 60, 48);
    bulbGlow.addColorStop(0, `rgba(254, 240, 138, ${0.9 + flicker})`);
    bulbGlow.addColorStop(0.5, `rgba(245, 158, 11, ${0.35 + flicker})`);
    bulbGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = bulbGlow;
    ctx.beginPath();
    ctx.arc(lx, 60, 48, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(lx, 60, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  // --- BARISTA COFFEE & ORDERING BAR (Right Side) ---
  const barX = 390;
  const barY = 210;
  const barW = w - barX - 25;
  const barH = floorY - barY;

  ctx.fillStyle = '#1c1917';
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = '#b45309';
  for (let bx = barX + 6; bx < barX + barW - 6; bx += 14) {
    ctx.fillRect(bx, barY + 6, 8, barH - 8);
  }
  ctx.fillStyle = '#78350f';
  ctx.fillRect(barX - 6, barY - 8, barW + 12, 12);
  ctx.fillStyle = '#d97706';
  ctx.fillRect(barX - 6, barY - 8, barW + 12, 2);

  // Chrome Commercial Dual-Group Espresso Machine
  const espX = barX + 16;
  const espY = barY - 48;
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(espX, espY, 56, 42);
  ctx.fillStyle = '#475569';
  ctx.fillRect(espX + 4, espY + 4, 48, 12);
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(espX + 16, espY + 24, 5, 0, Math.PI * 2);
  ctx.arc(espX + 40, espY + 24, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(espX + 15, espY + 23, 2, 2);
  ctx.fillRect(espX + 39, espY + 23, 2, 2);

  // Animated Steam Puffs Rising from the Espresso Machine
  for (let s = 0; s < 3; s++) {
    const steamY = espY - 6 - ((tick * 1.5 + s * 14) % 36);
    const steamX = espX + 22 + Math.sin(tick * 0.1 + s) * 5;
    const steamAlpha = Math.max(0, 1 - ((tick * 1.5 + s * 14) % 36) / 36);
    ctx.fillStyle = `rgba(255, 255, 255, ${steamAlpha * 0.6})`;
    ctx.beginPath();
    ctx.arc(steamX, steamY, 4 + s, 0, Math.PI * 2);
    ctx.fill();
  }

  // Glass Pastry Showcase on Counter (Golden Croissants, Egg Tarts, Pandan Cake)
  const caseX = barX + 90;
  const caseY = barY - 42;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillRect(caseX, caseY, 78, 36);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(caseX, caseY, 78, 36);

  // Pastry treats inside showcase
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(caseX + 8, caseY + 18, 18, 12);
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(caseX + 42, caseY + 24, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(caseX + 58, caseY + 16, 14, 14);

  // Takeaway cups stack & Glass Tip Jar with notes
  ctx.fillStyle = '#f8fafc';
  for (let c = 0; c < 4; c++) {
    ctx.fillRect(barX + 182, barY - 14 - c * 5, 10, 5);
  }
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillRect(barX + 200, barY - 22, 16, 18);
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(barX + 203, barY - 16, 10, 8);

  // ANIMATED NPC 1: FRIENDLY STUDENT BARISTA BEHIND COUNTER
  const baristaX = barX + 235;
  const baristaY = barY - 32;
  const baristaHeadBob = Math.sin(tick * 0.08) * 1.5;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(baristaX - 10, baristaY + 12, 20, 24);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(baristaX - 6, baristaY + 8, 12, 6);
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(baristaX, baristaY + baristaHeadBob, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(baristaX - 9, baristaY - 9 + baristaHeadBob, 18, 8);
  const pitcherY = baristaY + 18 + Math.sin(tick * 0.15) * 4;
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(baristaX - 18, pitcherY, 8, 11);
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(baristaX - 14, baristaY + 14, 6, 6);

  // --- STUDY BOOTH & SEATING AREA (Left Side) ---
  const boothX = 26;
  const boothY = floorY - 98;
  const tableX = 98;

  ctx.fillStyle = '#064e3b';
  ctx.fillRect(boothX, boothY - 24, 26, 80);
  ctx.fillStyle = '#047857';
  ctx.fillRect(boothX + 4, boothY - 20, 18, 72);
  ctx.fillStyle = '#022c22';
  for (let ty = boothY - 14; ty < boothY + 45; ty += 16) {
    ctx.fillRect(boothX + 12, ty, 3, 3);
  }

  ctx.fillStyle = '#b45309';
  ctx.fillRect(tableX - 25, boothY + 24, 85, 9);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(tableX + 12, boothY + 33, 10, floorY - (boothY + 33));

  // Study Materials on Table
  ctx.fillStyle = '#64748b';
  ctx.fillRect(tableX - 18, boothY + 12, 24, 12);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(tableX - 16, boothY + 14, 20, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(tableX - 14, boothY + 16, 12, 1);
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(tableX - 14, boothY + 18, 8, 1);

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(tableX + 10, boothY + 19, 18, 8);
  ctx.fillStyle = '#facc15';
  ctx.fillRect(tableX + 12, boothY + 17, 4, 3);
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(tableX + 18, boothY + 17, 4, 3);
  ctx.fillStyle = '#d97706';
  ctx.fillRect(tableX + 38, boothY + 12, 9, 14);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(tableX + 42, boothY + 7, 2, 7);

  // ANIMATED NPC 2: DEDICATED STUDENT STUDYING WITH HEADPHONES
  const studentX = boothX + 38;
  const studentY = boothY + 10;
  const typeFingers = Math.sin(tick * 0.25) * 2;
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(studentX - 8, studentY + 8, 16, 22);
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(studentX, studentY, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#3b0764';
  ctx.fillRect(studentX - 8, studentY - 8, 16, 6);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(studentX, studentY, 9, Math.PI, 0);
  ctx.stroke();
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(studentX - 10, studentY - 2, 3, 6);
  ctx.fillRect(studentX + 7, studentY - 2, 3, 6);
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(studentX + 6, studentY + 18 + typeFingers, 6, 4);

  // Herringbone Parquet Wood Flooring
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#854d0e');
  floorGrad.addColorStop(1, '#543007');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.5;
  for (let fx = 0; fx < w; fx += 28) {
    ctx.beginPath();
    ctx.moveTo(fx, floorY);
    ctx.lineTo(fx + 14, h);
    ctx.moveTo(fx + 14, floorY);
    ctx.lineTo(fx, h);
    ctx.stroke();
  }
}

// -------------------------------------------------------------
// 5. PHOTOS 7 & 8 REFERENCE: Bus Interchange (Berth B3) & SMRT MRT Train Carriage
// Photo 7: Berth B3 overhead sign, queue railings, route signs (177 Bukit Panjang, 106, 61, 945, 941).
// Photo 8: SMRT train interior with curved ceiling, yellow/white triangular grab handles,
// triple-branching vertical pole, pink priority seats, blue standard seats, panoramic windows.
// -------------------------------------------------------------
function drawMRTAndInterchange(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number,
  currentHour: number
) {
  const midX = 380;

  // ================= LEFT HALF: BUS INTERCHANGE (Photo 7) =================
  // Roof canopy of bus interchange
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 0, midX, floorY);

  // Bus bay road outside in background
  ctx.fillStyle = '#334155';
  ctx.fillRect(0, 60, midX, 120);

  // Green SBS / Tower Transit Buses parked in bus bay (Photo 7)
  ctx.fillStyle = '#16a34a'; // Lush green livery
  ctx.fillRect(30, 85, 150, 80);
  ctx.fillStyle = '#15803d';
  ctx.fillRect(200, 85, 140, 80);
  // Bus windows & destination screen
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(40, 95, 130, 30);
  ctx.fillRect(210, 95, 120, 30);
  ctx.fillStyle = '#f59e0b'; // Amber LED destination
  ctx.font = '6px "Press Start 2P"';
  ctx.fillText('177 BT PANJANG', 45, 112);
  ctx.fillText('945 BUKIT BATOK', 215, 112);

  // Structural pillars of the bus interchange
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(10, 20, 26, floorY - 20);
  ctx.fillRect(midX - 30, 20, 26, floorY - 20);

  // Overhead Gantry: "BERTH B3" (Exact from Photo 7)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(40, 18, 290, 44);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 18, 290, 44);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 10px "Press Start 2P"';
  ctx.fillText('BERTH B3', 55, 42);

  // Distinctive Hanging Multi-Colored Service Route Boxes (Exact from Photo 7)
  // Green box: 177 BUKIT PANJANG
  ctx.fillStyle = '#15803d';
  ctx.fillRect(45, 70, 75, 45);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px "Press Start 2P"';
  ctx.fillText('177', 52, 88);
  ctx.font = '5px "Press Start 2P"';
  ctx.fillText('BT PANJANG', 50, 102);

  // Red box: 106
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(128, 70, 40, 45);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px "Press Start 2P"';
  ctx.fillText('106', 133, 96);

  // Blue box: 61
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(174, 70, 40, 45);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px "Press Start 2P"';
  ctx.fillText('61', 182, 96);

  // Green box: 945
  ctx.fillStyle = '#15803d';
  ctx.fillRect(220, 70, 40, 45);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px "Press Start 2P"';
  ctx.fillText('945', 225, 96);

  // Red box: 941
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(266, 70, 40, 45);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px "Press Start 2P"';
  ctx.fillText('941', 271, 96);

  // Stainless Steel Queue Railings forming passenger lanes (Photo 7)
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3.5;
  // Railing horizontal bars
  ctx.beginPath();
  ctx.moveTo(50, 240);
  ctx.lineTo(340, 240);
  ctx.moveTo(50, 270);
  ctx.lineTo(340, 270);
  // Railing vertical posts
  for (let rx = 50; rx <= 340; rx += 45) {
    ctx.moveTo(rx, 230);
    ctx.lineTo(rx, floorY);
  }
  ctx.stroke();

  // Terracotta/reddish tiled floor for Bus Interchange
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(0, floorY, midX, h - floorY);
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 1.5;
  for (let tx = 0; tx < midX; tx += 35) {
    ctx.strokeRect(tx, floorY, 35, h - floorY);
  }

  // ================= RIGHT HALF: SMRT MRT TRAIN CARRIAGE INTERIOR (Photo 8) =================
  const trainX = midX;
  const trainW = w - midX;

  // Carriage Wall & Curved ceiling (Photo 8)
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(trainX, 0, trainW, floorY);

  // Train panoramic windows showing sunny Singapore skyline (Photo 8)
  const winX = trainX + 40;
  const winY = 60;
  const winW = trainW - 80;
  const winH = 110;

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(winX, winY, winW, winH);
  // Passing HDB skyline outside
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(winX + 20, winY + 40, 50, 70);
  ctx.fillRect(winX + 90, winY + 20, 60, 90);
  ctx.fillRect(winX + 170, winY + 50, 70, 60);
  // Window frame & safety sticker
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.strokeRect(winX, winY, winW, winH);

  // Digital LED route map banner above the window (Photo 8)
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(winX - 10, winY - 24, winW + 20, 16);
  // Flashing green route dots
  for (let dot = winX; dot < winX + winW; dot += 24) {
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(dot, winY - 19, 6, 6);
  }

  // Overhead Curved Stainless Steel Handrails (Photo 8)
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(trainX + 20, 45);
  ctx.lineTo(w - 20, 45);
  ctx.stroke();

  // Hanging Yellow/White Triangular Grab Handles swinging gently (Photo 8)
  for (let hx = trainX + 50; hx < w - 40; hx += 40) {
    const swing = Math.sin(tick * 0.08 + hx) * 3;
    // Strap
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(hx, 45);
    ctx.lineTo(hx + swing, 75);
    ctx.stroke();

    // Triangular grab loop
    ctx.strokeStyle = '#facc15'; // Bright yellow triangular grip
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(hx + swing, 75);
    ctx.lineTo(hx + swing - 7, 90);
    ctx.lineTo(hx + swing + 7, 90);
    ctx.closePath();
    ctx.stroke();
  }

  // The Distinctive Central Triple-Branching Stanchion Grab Pole (Signature Singapore MRT, Photo 8)
  const poleX = trainX + trainW / 2;
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 4;
  // Lower vertical pole
  ctx.beginPath();
  ctx.moveTo(poleX, floorY);
  ctx.lineTo(poleX, 150);
  // Branching 3 curved prongs going up to the ceiling
  ctx.lineTo(poleX - 18, 45);
  ctx.moveTo(poleX, 150);
  ctx.lineTo(poleX, 45);
  ctx.moveTo(poleX, 150);
  ctx.lineTo(poleX + 18, 45);
  ctx.stroke();

  // Row of passenger bucket seats (Photo 8)
  // Pink Priority / Reserved Seat ("Reserved Seat") and Blue standard seats
  const seatY = 210;
  const seatH = 75;
  // Blue seats
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(trainX + 30, seatY, 110, seatH);
  // Pink Priority Seat (Photo 8)
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(trainX + 150, seatY, 70, seatH);
  ctx.fillStyle = '#ffffff';
  ctx.font = '6px "Press Start 2P"';
  ctx.fillText('RESERVED', trainX + 154, seatY + 20);
  // Blue seats right side
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(trainX + 230, seatY, 120, seatH);

  // Commuters sitting down looking at smartphones (Photo 8)
  const passengers = [trainX + 70, trainX + 185, trainX + 280];
  passengers.forEach(px => {
    // Body
    ctx.fillStyle = '#334155';
    ctx.fillRect(px - 10, seatY + 15, 20, 35);
    // Head
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(px, seatY + 5, 8, 0, Math.PI * 2);
    ctx.fill();
    // Glowing smartphone in hands
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(px - 4, seatY + 32, 8, 12);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(px - 3, seatY + 34, 6, 8);
  });

  // Polished granite floor of the MRT train carriage
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(trainX, floorY, trainW, h - floorY);
  // Yellow tactile door safety line
  ctx.fillStyle = '#eab308';
  ctx.fillRect(trainX, floorY, trainW, 10);
}

// -------------------------------------------------------------
// 6. PHOTO 9 REFERENCE: Traditional Neighbourhood Barber Shop at Void Deck
// Bold vibrant orange void deck corridor pillars, spinning spiral red-white-blue barber pole,
// uncle in casual shirt sitting outside reading a newspaper, red Coca-Cola vending machine,
// giant rain tree with yellow ceremonial umbrella/shrine.
// -------------------------------------------------------------
function drawBarberShop(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Sunlight & tropical outdoor sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // --- Giant Heritage Rain Tree with yellow umbrella shrine (Photo 9) ---
  const treeX = 640;
  const treeY = 160;
  // Giant trunk with textured rough bark
  ctx.fillStyle = '#452b14';
  ctx.fillRect(treeX, treeY, 90, floorY - treeY);
  ctx.fillStyle = '#36210e';
  for (let ty = treeY; ty < floorY; ty += 14) {
    ctx.fillRect(treeX + 15, ty, 30, 4);
    ctx.fillRect(treeX + 55, ty + 7, 25, 4);
  }
  // Massive rain tree canopy
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.ellipse(treeX + 45, treeY - 40, 130, 80, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.ellipse(treeX + 70, treeY - 25, 90, 50, 0, 0, Math.PI * 2);
  ctx.fill();

  // Traditional Yellow Ceremonial Umbrella / mini altar at tree base (Photo 9)
  const shrineX = treeX - 30;
  const shrineY = floorY - 55;
  // Yellow umbrella canopy
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.arc(shrineX + 25, shrineY, 28, Math.PI, Math.PI * 2);
  ctx.fill();
  // Umbrella gold fringe & pole
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(shrineX + 25, shrineY);
  ctx.lineTo(shrineX + 25, floorY);
  ctx.stroke();
  // Small shrine platform with red incense burner
  ctx.fillStyle = '#78350f';
  ctx.fillRect(shrineX + 10, floorY - 18, 30, 18);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(shrineX + 18, floorY - 24, 14, 8);

  // --- Void Deck Shophouse Barber Shop Exterior (Photo 9) ---
  const shopX = 60;
  const shopW = 500;

  // Shop front wall
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(shopX, 60, shopW, floorY - 60);

  // Retro "BARBER SHOP" Signboard above the door (Photo 9)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(shopX + 40, 75, 300, 36);
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 3;
  ctx.strokeRect(shopX + 40, 75, 300, 36);
  ctx.fillStyle = '#1e3a8a';
  ctx.font = 'bold 12px "Press Start 2P"';
  ctx.fillText('BARBER SHOP', shopX + 75, 100);

  // Glass entrance door with vintage haircut model posters (Photo 9)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(shopX + 50, 120, 110, floorY - 120);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.fillRect(shopX + 54, 124, 102, floorY - 128);

  // Haircut posters in window
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(shopX + 62, 140, 36, 45);
  ctx.fillRect(shopX + 110, 140, 36, 45);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(shopX + 68, 148, 24, 24);
  ctx.fillRect(shopX + 116, 148, 24, 24);

  // Inside barber chairs visible through glass
  ctx.fillStyle = '#dc2626'; // Red barber chair
  ctx.fillRect(shopX + 75, 230, 25, 30);
  ctx.fillStyle = '#e2e8f0'; // Chrome headrest
  ctx.fillRect(shopX + 82, 215, 12, 15);

  // --- VIBRANT ORANGE VOID DECK CORRIDOR PILLARS (Photo 9) ---
  // The iconic orange-painted structural rectangular columns
  const orangePillars = [shopX - 30, shopX + 200, shopX + 420];
  orangePillars.forEach(opx => {
    ctx.fillStyle = '#ea580c'; // Vibrant warm orange
    ctx.fillRect(opx, 40, 50, floorY - 40);
    ctx.fillStyle = '#c2410c'; // Shadow edge
    ctx.fillRect(opx + 40, 40, 10, floorY - 40);
  });

  // Tiled corridor pavement
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.5;
  for (let cx = 0; cx < w; cx += 40) {
    ctx.strokeRect(cx, floorY, 40, h - floorY);
  }
}

// -------------------------------------------------------------
// 7. PHOTO 10 REFERENCE: Junior College Campus
// USER'S MANDATORY RESTRICTION: "the final photo is a juunior college but do not put in words apart from 'junior college'"
// Grand modernist white concrete facade with clean geometric lines under deep azure sky,
// sweeping central curved canopy with panoramic tinted windows, grand multi-tiered entrance staircase,
// bright red safety railings, terracotta paved forecourt, and strictly labeled "JUNIOR COLLEGE".
// -------------------------------------------------------------
function drawJuniorCollege(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Brilliant tropical deep blue Singapore sky (Photo 10)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.6, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Light fluffy tropical cumulus clouds (Photo 10)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  const drawCloud = (cx: number, cy: number, cw: number) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, cw, 18, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 20, cy - 8, cw * 0.7, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 20, cy - 4, cw * 0.6, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  drawCloud(160, 45, 65);
  drawCloud(620, 55, 80);

  // --- GRAND MODERNIST WHITE FACADE (Photo 10) ---
  const jcX = 50;
  const jcW = 700;

  // Main white building block
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(jcX, 70, jcW, 170);

  // Upper floor ribbon windows & geometric louvre grilles (Photo 10)
  ctx.fillStyle = '#0f172a';
  for (let wy = 85; wy < 140; wy += 28) {
    for (let wx = jcX + 30; wx < jcX + jcW - 40; wx += 55) {
      // Don't draw over the central canopy area
      if (wx > jcX + 240 && wx < jcX + 460) continue;
      ctx.fillRect(wx, wy, 42, 20);
    }
  }

  // --- CENTRAL CURVED CANOPY & PANORAMIC GLASS (Photo 10) ---
  const canopyX = jcX + 200;
  const canopyW = 300;
  const canopyY = 70;

  // White curved upper canopy overhang
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(canopyX, canopyY + 40);
  ctx.quadraticCurveTo(canopyX + canopyW / 2, canopyY - 10, canopyX + canopyW, canopyY + 40);
  ctx.lineTo(canopyX + canopyW, canopyY + 120);
  ctx.lineTo(canopyX, canopyY + 120);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Dark panoramic glass concourse under canopy
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(canopyX + 25, canopyY + 45, canopyW - 50, 75);
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(canopyX + 30, canopyY + 50, canopyW - 60, 65);

  // STRICT REQUIREMENT CHECK: User specified:
  // "(the final photo is a juunior college but do not put in words apart from 'junior college')"
  // We ONLY render the words "JUNIOR COLLEGE" and nothing else!
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(canopyX + 45, canopyY + 20, canopyW - 90, 22);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  ctx.strokeRect(canopyX + 45, canopyY + 20, canopyW - 90, 22);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 9px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText('JUNIOR COLLEGE', canopyX + canopyW / 2, canopyY + 35);
  ctx.textAlign = 'start';

  // --- GRAND MULTI-TIERED ENTRANCE STAIRCASE (Photo 10) ---
  const stairTopY = 190;
  const stairSteps = 7;
  const stepH = (floorY - stairTopY) / stairSteps;
  for (let s = 0; s < stairSteps; s++) {
    const sy = stairTopY + s * stepH;
    const inset = (stairSteps - s) * 16;
    ctx.fillStyle = s % 2 === 0 ? '#f1f5f9' : '#e2e8f0';
    ctx.fillRect(jcX + inset, sy, jcW - inset * 2, stepH);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.strokeRect(jcX + inset, sy, jcW - inset * 2, stepH);
  }

  // --- BRIGHT RED SAFETY RAILINGS (Signature from Photo 10) ---
  // Vermillion red railings along the upper terrace and staircase ramps
  ctx.strokeStyle = '#dc2626'; // Vibrant red
  ctx.lineWidth = 3.5;

  // Upper terrace horizontal red railing
  ctx.beginPath();
  ctx.moveTo(jcX + 30, stairTopY);
  ctx.lineTo(jcX + jcW - 30, stairTopY);
  ctx.moveTo(jcX + 30, stairTopY + 12);
  ctx.lineTo(jcX + jcW - 30, stairTopY + 12);
  // Vertical posts
  for (let rx = jcX + 40; rx < jcX + jcW - 30; rx += 35) {
    ctx.moveTo(rx, stairTopY - 8);
    ctx.lineTo(rx, stairTopY + 16);
  }
  ctx.stroke();

  // Left and right stepped red handrails down the grand staircase
  const drawStairRailing = (startX: number, deltaX: number) => {
    ctx.beginPath();
    ctx.moveTo(startX, stairTopY);
    ctx.lineTo(startX - deltaX, floorY);
    ctx.moveTo(startX, stairTopY + 12);
    ctx.lineTo(startX - deltaX, floorY + 12);
    ctx.stroke();
  };
  drawStairRailing(jcX + 110, 80);
  drawStairRailing(jcX + jcW - 110, -80);

  // Terracotta Red Paved Forecourt Plaza (Photo 10)
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 1.5;
  for (let px = 0; px < w; px += 35) {
    ctx.strokeRect(px, floorY, 35, h - floorY);
  }
}

// -------------------------------------------------------------
// 8. Hawker Centre
// -------------------------------------------------------------
function drawHawkerCentre(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Bustling high-ceiling hawker centre hall backdrop
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, w, floorY);

  // Metal high-ceiling roof trusses and ventilation skylight
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2.5;
  for (let tx = 0; tx < w; tx += 80) {
    ctx.beginPath();
    ctx.moveTo(tx, 0);
    ctx.lineTo(tx + 40, 75);
    ctx.lineTo(tx + 80, 0);
    ctx.stroke();
    // Cross brace
    ctx.beginPath();
    ctx.moveTo(tx + 20, 38);
    ctx.lineTo(tx + 60, 38);
    ctx.stroke();
  }

  // Giant industrial ceiling fans slowly spinning
  for (let fx = 120; fx < w; fx += 260) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(fx - 3, 10, 6, 35);
    ctx.save();
    ctx.translate(fx, 45);
    ctx.rotate(tick * 0.08);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(-45, -4, 90, 8);
    ctx.fillRect(-4, -45, 8, 90);
    ctx.restore();
  }

  // =========================================================================
  // STALL 1: CHARCOAL GRILLED SATAY & NASI LEMAK - ARANG ASLI (Image 2)
  // =========================================================================
  const satayX = 20;
  const satayW = 230;
  const stallH = 175;
  const stallY = floorY - stallH;

  // Stall back wall & tile
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(satayX, stallY, satayW, stallH);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  for (let ty = stallY; ty < floorY; ty += 16) {
    ctx.beginPath();
    ctx.moveTo(satayX, ty);
    ctx.lineTo(satayX + satayW, ty);
    ctx.stroke();
  }

  // Stall Overhead Signboard: "NASI LEMAK & SATAY - ARANG ASLI" (Image 2)
  ctx.fillStyle = '#1e3a8a'; // Deep blue header banner
  ctx.fillRect(satayX, stallY, satayW, 36);
  ctx.fillStyle = '#facc15'; // Bright yellow lettering
  ctx.font = 'bold 8px "Press Start 2P", monospace';
  ctx.fillText('NASI LEMAK & SATAY', satayX + 8, stallY + 16);
  ctx.fillStyle = '#f87171'; // Red highlight
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('★ ARANG ASLI (TRADITIONAL CHARCOAL) ★', satayX + 12, stallY + 30);

  // Stainless steel counter table
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(satayX, stallY + 95, satayW, floorY - (stallY + 95));
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(satayX, stallY + 90, satayW, 6);

  // Long Stainless Steel Charcoal Grill Trough (Image 2)
  const grillX = satayX + 25;
  const grillY = stallY + 80;
  const grillW = 145;
  const grillH = 22;

  ctx.fillStyle = '#334155'; // Metal grill trough
  ctx.fillRect(grillX, grillY, grillW, grillH);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.strokeRect(grillX, grillY, grillW, grillH);

  // Glowing red & orange hot charcoal embers inside grill
  for (let cx = grillX + 4; cx < grillX + grillW - 6; cx += 8) {
    const emberPulse = Math.sin(tick * 0.2 + cx) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(239, 68, 68, ${emberPulse})`;
    ctx.fillRect(cx, grillY + 6, 6, 12);
    ctx.fillStyle = `rgba(245, 158, 11, ${emberPulse})`;
    ctx.fillRect(cx + 1, grillY + 8, 4, 8);
  }

  // Metal grill mesh grate bars
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  for (let gx = grillX + 2; gx < grillX + grillW; gx += 6) {
    ctx.beginPath();
    ctx.moveTo(gx, grillY);
    ctx.lineTo(gx, grillY + grillH);
    ctx.stroke();
  }

  // Rows of Chicken & Mutton Satay Skewers sizzling over coals (Image 2)
  for (let sk = grillX + 8; sk < grillX + grillW - 8; sk += 10) {
    // Bamboo skewer stick
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sk, grillY - 14);
    ctx.lineTo(sk, grillY + 14);
    ctx.stroke();
    // Marinated skewered meat chunks (golden-brown with charred grill marks)
    ctx.fillStyle = '#b45309';
    ctx.fillRect(sk - 3, grillY - 6, 6, 14);
    ctx.fillStyle = '#451a03'; // Charred grill mark
    ctx.fillRect(sk - 2, grillY - 2, 4, 3);
  }

  // Charred banana leaf Otah packets grilling at side of grill (Image 2)
  ctx.fillStyle = '#15803d'; // Green banana leaf
  ctx.fillRect(grillX + grillW - 28, grillY - 12, 22, 10);
  ctx.fillStyle = '#1c1917'; // Char mark
  ctx.fillRect(grillX + grillW - 24, grillY - 10, 8, 6);

  // Satay Uncle in Apron waving traditional woven bamboo hand fan (Image 2)
  const sUncleX = satayX + satayW - 35;
  const sUncleY = stallY + 45;

  // Uncle head & cap
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(sUncleX, sUncleY + 10, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1e293b'; // Cap
  ctx.fillRect(sUncleX - 12, sUncleY - 2, 24, 7);
  // Uncle body & blue apron
  ctx.fillStyle = '#ffffff'; // White polo
  ctx.fillRect(sUncleX - 12, sUncleY + 21, 24, 35);
  ctx.fillStyle = '#2563eb'; // Blue apron
  ctx.fillRect(sUncleX - 10, sUncleY + 25, 20, 32);

  // Arm & Woven Bamboo Hand Fan (waving back and forth!)
  const fanAngle = Math.sin(tick * 0.25) * 0.4;
  ctx.save();
  ctx.translate(sUncleX - 10, sUncleY + 32);
  ctx.rotate(fanAngle);
  // Hand
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(-12, -3, 12, 5);
  // Woven triangular bamboo fan
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(-12, -2);
  ctx.lineTo(-32, -18);
  ctx.lineTo(-32, 14);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  // Burlap Sacks of Lumpwood Charcoal stacked beside stall: "ARANG ASLI" (Image 2)
  ctx.fillStyle = '#92400e';
  ctx.fillRect(satayX + 4, floorY - 45, 22, 38);
  ctx.strokeStyle = '#78350f';
  ctx.strokeRect(satayX + 4, floorY - 45, 22, 38);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 5px sans-serif';
  ctx.fillText('ARANG', satayX + 5, floorY - 26);
  ctx.fillText('ASLI', satayX + 6, floorY - 18);

  // --- DYNAMIC RISING CHARCOAL SMOKE EFFECT (Image 2 Requirement!) ---
  // White/grey smoke particles drifting upwards with curling turbulence
  for (let i = 0; i < 9; i++) {
    const smokeAge = (tick * 1.8 + i * 22) % 110;
    const smokeY = grillY - smokeAge;
    const sway = Math.sin(tick * 0.08 + i) * 16 + Math.cos(smokeAge * 0.06) * 10;
    const smokeX = grillX + 20 + (i * 14) + sway;
    const radius = 6 + smokeAge * 0.22;
    const opacity = Math.max(0, 0.45 - (smokeAge / 110) * 0.45);

    const smokeGrad = ctx.createRadialGradient(smokeX, smokeY, 1, smokeX, smokeY, radius);
    smokeGrad.addColorStop(0, `rgba(241, 245, 249, ${opacity * 1.2})`);
    smokeGrad.addColorStop(0.5, `rgba(203, 213, 225, ${opacity})`);
    smokeGrad.addColorStop(1, 'rgba(203, 213, 225, 0)');

    ctx.fillStyle = smokeGrad;
    ctx.beginPath();
    ctx.arc(smokeX, smokeY, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // =========================================================================
  // STALL 2: HAINANESE CHICKEN RICE & DRINKS STALL (Middle Transition)
  // =========================================================================
  const chickenX = 265;
  const chickenW = 220;

  // Stall backdrop
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(chickenX, stallY, chickenW, stallH);

  // Signboard: "TIAN TIAN HAINANESE CHICKEN RICE"
  ctx.fillStyle = '#dc2626'; // Vibrant red header
  ctx.fillRect(chickenX, stallY, chickenW, 36);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px "Press Start 2P", monospace';
  ctx.fillText('HAINANESE CHICKEN RICE', chickenX + 8, stallY + 16);
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('TRADITIONAL ROAST & STEAMED CHICKEN', chickenX + 16, stallY + 30);

  // Glass hanging display case with chickens
  ctx.fillStyle = 'rgba(224, 242, 254, 0.4)';
  ctx.fillRect(chickenX + 20, stallY + 45, 90, 50);
  ctx.strokeStyle = '#94a3b8';
  ctx.strokeRect(chickenX + 20, stallY + 45, 90, 50);

  // Hanging golden roasted and white poached chickens
  for (let ck = 0; ck < 3; ck++) {
    const chkX = chickenX + 35 + ck * 24;
    // Meat hook
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(chkX, stallY + 45);
    ctx.lineTo(chkX, stallY + 52);
    ctx.stroke();
    // Chicken body
    ctx.fillStyle = ck % 2 === 0 ? '#b45309' : '#fef08a'; // Roasted brown or steamed yellow-white
    ctx.beginPath();
    ctx.ellipse(chkX, stallY + 66, 8, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Stainless counter & cutting block
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(chickenX, stallY + 95, chickenW, floorY - (stallY + 95));
  ctx.fillStyle = '#78350f'; // Thick round wooden butcher chopping block
  ctx.fillRect(chickenX + 125, stallY + 80, 42, 18);
  ctx.fillStyle = '#64748b'; // Meat cleaver
  ctx.fillRect(chickenX + 138, stallY + 70, 16, 12);

  // Traditional Kopi Pot & Sock Strainers on right of middle stall
  ctx.fillStyle = '#cbd5e1'; // Tall aluminium coffee kettle
  ctx.fillRect(chickenX + 180, stallY + 74, 18, 24);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(chickenX + 198, stallY + 78, 6, 12);

  // =========================================================================
  // STALL 3: MSW DURIAN STORE "GOLDEN MOMENTS - FRESHLY PACKED" (Image 1)
  // =========================================================================
  const durianX = 500;
  const durianW = 280;

  // Deep matte black wall backdrop (Image 1)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(durianX, stallY, durianW, stallH);

  // Overhead Canopy & Signboard: "GOLDEN MOMENTS - FRESHLY PACKED DURIANS" (Image 1)
  ctx.fillStyle = '#09090b'; // Deep black canopy
  ctx.fillRect(durianX, stallY, durianW, 40);
  ctx.strokeStyle = '#eab308'; // Gold luxury border
  ctx.lineWidth = 2;
  ctx.strokeRect(durianX, stallY, durianW, 40);

  // Gold warm spotlights above sign (Image 1)
  [durianX + 45, durianX + 140, durianX + 235].forEach(lx => {
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(lx, stallY + 5, 4, 0, Math.PI * 2);
    ctx.fill();

    const spotGrad = ctx.createRadialGradient(lx, stallY + 5, 2, lx, stallY + 45, 35);
    spotGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
    spotGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
    ctx.fillStyle = spotGrad;
    ctx.beginPath();
    ctx.arc(lx, stallY + 30, 35, 0, Math.PI * 2);
    ctx.fill();
  });

  // Sign text in metallic gold & crisp white (Image 1)
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 9px "Press Start 2P", monospace';
  ctx.fillText('GOLDEN MOMENTS', durianX + 28, stallY + 18);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('FRESHLY PACKED DURIANS • MAO SHAN WANG (D197)', durianX + 20, stallY + 32);

  // Artificial Green Turf Grass covering the counter table (Image 1)
  ctx.fillStyle = '#15803d'; // Vibrant artificial turf green
  ctx.fillRect(durianX, stallY + 92, durianW, 8);
  ctx.fillStyle = '#166534'; // Grass blade texture
  for (let gx = durianX; gx < durianX + durianW; gx += 4) {
    ctx.fillRect(gx, stallY + 90, 2, 4);
  }

  // Black counter lower facade
  ctx.fillStyle = '#18181b';
  ctx.fillRect(durianX, stallY + 100, durianW, floorY - (stallY + 100));

  // Pyramids of Spiky Golden-Green Mao Shan Wang Durians on counter (Image 1)
  // Left pyramid stack
  const drawDurian = (dx: number, dy: number) => {
    // Spiky oval body
    ctx.fillStyle = '#65a30d'; // Olive golden-green husk
    ctx.beginPath();
    ctx.ellipse(dx, dy, 10, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    // Spikes around rim
    ctx.fillStyle = '#84cc16';
    for (let sa = 0; sa < Math.PI * 2; sa += 0.7) {
      const sx = dx + Math.cos(sa) * 12;
      const sy = dy + Math.sin(sa) * 14;
      ctx.fillRect(sx - 1, sy - 1, 2, 2);
    }
    // Wooden stalk
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(dx, dy - 13);
    ctx.lineTo(dx + 2, dy - 18);
    ctx.stroke();
  };

  // Stack of whole durians left & right
  [
    { x: durianX + 25, y: stallY + 80 },
    { x: durianX + 45, y: stallY + 80 },
    { x: durianX + 35, y: stallY + 60 },
    { x: durianX + durianW - 35, y: stallY + 80 },
    { x: durianX + durianW - 55, y: stallY + 80 },
    { x: durianX + durianW - 45, y: stallY + 60 },
  ].forEach(d => drawDurian(d.x, d.y));

  // Open Black Plastic Trays displaying creamy golden MSW durian pulps (Image 1)
  const trayX = durianX + 70;
  const trayY = stallY + 82;
  const trayW = 55;
  const trayH = 14;

  ctx.fillStyle = '#09090b'; // Black tray container
  ctx.fillRect(trayX, trayY, trayW, trayH);
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1;
  ctx.strokeRect(trayX, trayY, trayW, trayH);

  // Plump, creamy golden-yellow MSW durian flesh segments
  for (let seg = 0; seg < 4; seg++) {
    ctx.fillStyle = '#facc15'; // Rich Mao Shan Wang yellow flesh
    ctx.beginPath();
    ctx.ellipse(trayX + 8 + seg * 12, trayY + 7, 5, 4.5, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#eab308'; // Creamy shadow
    ctx.fillRect(trayX + 7 + seg * 12, trayY + 8, 3, 2);
  }

  // Durian Seller Uncle in black t-shirt & white cutting glove opening a durian (Image 1)
  const dUncleX = durianX + 165;
  const dUncleY = stallY + 45;

  // Uncle head & hair
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(dUncleX, dUncleY + 8, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1e293b'; // Short dark hair
  ctx.beginPath();
  ctx.arc(dUncleX, dUncleY + 5, 12, Math.PI * 0.8, Math.PI * 2.2);
  ctx.fill();

  // Uncle body: Black polo shirt (Image 1)
  ctx.fillStyle = '#18181b';
  ctx.fillRect(dUncleX - 12, dUncleY + 19, 24, 38);
  ctx.fillStyle = '#fbbf24'; // Golden Moments logo on chest
  ctx.fillRect(dUncleX - 8, dUncleY + 24, 6, 3);

  // White protective cut-resistant glove on left hand holding durian (Image 1)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(dUncleX - 16, dUncleY + 38, 10, 8);
  // Curved durian knife in right hand
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(dUncleX + 10, dUncleY + 36, 12, 4);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(dUncleX + 16, dUncleY + 34, 14, 2);

  // Sacks of fresh durians resting on floor (Image 1)
  ctx.fillStyle = '#92400e';
  ctx.fillRect(durianX + durianW - 30, floorY - 36, 26, 30);
  ctx.strokeStyle = '#78350f';
  ctx.strokeRect(durianX + durianW - 30, floorY - 36, 26, 30);
  ctx.fillStyle = '#84cc16'; // Green durian peeking out top
  ctx.beginPath();
  ctx.arc(durianX + durianW - 17, floorY - 38, 8, Math.PI, Math.PI * 2);
  ctx.fill();

  // =========================================================================
  // FOREGROUND: TERRACOTTA TILED FLOOR, ROUND TABLES, PATRONS & TISSUE CHOPE
  // =========================================================================
  ctx.fillStyle = '#c2410c'; // Warm Singapore terracotta floor tiles
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#9a3412';
  ctx.lineWidth = 2;
  for (let tx = 0; tx < w; tx += 48) {
    ctx.strokeRect(tx, floorY, 48, h - floorY);
  }

  // Round hawker centre tables and plastic stools
  const tables = [
    { x: 120, y: floorY + 22, plateCol: '#ea580c' },
    { x: 400, y: floorY + 25, plateCol: '#16a34a' },
    { x: 670, y: floorY + 20, plateCol: '#facc15' }
  ];

  tables.forEach(tbl => {
    // Round table surface
    ctx.fillStyle = '#e2e8f0'; // Clean grey-white composite table top
    ctx.beginPath();
    ctx.ellipse(tbl.x, tbl.y, 36, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Table metal leg
    ctx.fillStyle = '#475569';
    ctx.fillRect(tbl.x - 3, tbl.y + 11, 6, 25);

    // Stools
    ctx.fillStyle = '#dc2626'; // Red round stool
    ctx.beginPath();
    ctx.ellipse(tbl.x - 42, tbl.y + 16, 12, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(tbl.x + 42, tbl.y + 16, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Melamine plate with food
    ctx.fillStyle = tbl.plateCol;
    ctx.beginPath();
    ctx.ellipse(tbl.x - 8, tbl.y - 2, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iconic Singapore Tissue Packet Chope!
    ctx.fillStyle = '#f8fafc'; // White tissue pack
    ctx.fillRect(tbl.x + 12, tbl.y - 5, 12, 7);
    ctx.fillStyle = '#2563eb'; // Blue branding stripe
    ctx.fillRect(tbl.x + 14, tbl.y - 4, 8, 2);
  });
}

// -------------------------------------------------------------
// 9. Pasar Malam
// -------------------------------------------------------------
function drawPasarMalam(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Night sky
  ctx.fillStyle = '#090d1f';
  ctx.fillRect(0, 0, w, floorY);

  // Red and white striped canopy
  const stripeW = 28;
  for (let sx = 0; sx < w; sx += stripeW) {
    const isRed = (sx / stripeW) % 2 === 0;
    ctx.fillStyle = isRed ? '#dc2626' : '#ffffff';
    ctx.fillRect(sx, 30, stripeW, 55);
  }

  // Glowing string fairy lights
  for (let x = 15; x < w; x += 30) {
    const glow = (Math.sin(tick * 0.1 + x) + 1) * 0.5;
    ctx.fillStyle = `rgba(250, 204, 21, ${0.6 + glow * 0.4})`;
    ctx.beginPath();
    ctx.arc(x, 90 + Math.sin(x * 0.05) * 8, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Wet market asphalt floor
  ctx.fillStyle = '#334155';
  ctx.fillRect(0, floorY, w, h - floorY);
}

// -------------------------------------------------------------
// 10. Clarke Quay Waterfront & Singapore River
// -------------------------------------------------------------
function drawClarkeQuay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Deep night sky with riverside twilight glow
  const sky = ctx.createLinearGradient(0, 0, 0, floorY);
  sky.addColorStop(0, '#0a0e27');
  sky.addColorStop(0.6, '#181b40');
  sky.addColorStop(1, '#2d1845');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, floorY);

  // Distant financial district skyscraper silhouettes
  ctx.fillStyle = '#111827';
  ctx.fillRect(80, 40, 55, floorY - 40);
  ctx.fillRect(160, 20, 65, floorY - 20);
  ctx.fillRect(440, 30, 70, floorY - 30);
  ctx.fillRect(540, 50, 60, floorY - 50);

  // Historic Read Bridge steel truss structure spanning the river in distance
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 150);
  ctx.lineTo(340, 150);
  ctx.stroke();
  for (let bx = 110; bx < 330; bx += 30) {
    ctx.beginPath();
    ctx.moveTo(bx, 150);
    ctx.lineTo(bx + 15, 125);
    ctx.lineTo(bx + 30, 150);
    ctx.stroke();
  }

  // Colorful heritage riverside shophouses (salmon, turquoise, mustard yellow, jade green)
  const shophouseColors = ['#f472b6', '#38bdf8', '#fbbf24', '#34d399'];
  const roofColors = ['#be185d', '#0284c7', '#d97706', '#059669'];
  let sx = 20;
  for (let i = 0; i < 4; i++) {
    const sw = 160;
    const sh = 140;
    const sy = floorY - sh;

    // Base shophouse wall
    ctx.fillStyle = shophouseColors[i];
    ctx.fillRect(sx, sy, sw, sh);

    // Terracotta decorative roof cornice
    ctx.fillStyle = roofColors[i];
    ctx.fillRect(sx - 4, sy - 8, sw + 8, 10);

    // Second-storey arched timber louvre windows
    for (let wx = sx + 20; wx <= sx + sw - 40; wx += 45) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(wx, sy + 25, 26, 42);
      ctx.beginPath();
      ctx.arc(wx + 13, sy + 25, 13, Math.PI, 0);
      ctx.fill();

      // Window louvres
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      for (let ly = sy + 30; ly < sy + 65; ly += 6) {
        ctx.beginPath();
        ctx.moveTo(wx + 2, ly);
        ctx.lineTo(wx + 24, ly);
        ctx.stroke();
      }
    }

    // Ground floor archway walkway (Five-foot way arcade)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(sx + 30, sy + 85, 100, 55);
    ctx.beginPath();
    ctx.arc(sx + 80, sy + 85, 50, Math.PI, 0);
    ctx.fill();

    // Pulsing neon nightlife signs
    const pulse = (Math.sin(tick * 0.08 + i * 1.5) + 1) * 0.5;
    ctx.fillStyle = i % 2 === 0 ? `rgba(244, 63, 94, ${0.75 + pulse * 0.25})` : `rgba(34, 211, 238, ${0.75 + pulse * 0.25})`;
    ctx.fillRect(sx + 20, sy + 72, sw - 40, 12);

    sx += sw + 35;
  }

  // Singapore River water below promenade
  const riverGrad = ctx.createLinearGradient(0, floorY, 0, h);
  riverGrad.addColorStop(0, '#0c1a2f');
  riverGrad.addColorStop(1, '#050b14');
  ctx.fillStyle = riverGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Cruising Singapore River Bumboat (Electric Eco-boat)
  const boatX = ((tick * 1.2) % (w + 200)) - 100;
  const boatY = floorY + 38;
  // Red hull
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(boatX, boatY + 12);
  ctx.lineTo(boatX + 70, boatY + 12);
  ctx.lineTo(boatX + 60, boatY + 26);
  ctx.lineTo(boatX + 8, boatY + 26);
  ctx.closePath();
  ctx.fill();
  // Painted dragon/eye on bow
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(boatX + 62, boatY + 18, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(boatX + 63, boatY + 18, 2, 0, Math.PI * 2);
  ctx.fill();
  // Green canopy
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(boatX + 15, boatY + 2, 42, 10);
  ctx.fillStyle = '#fef08a'; // Glowing lantern
  ctx.fillRect(boatX + 32, boatY + 4, 8, 6);

  // Neon water ripples reflecting shophouse lights
  for (let i = 0; i < 7; i++) {
    const rippleY = floorY + 16 + i * 14;
    const alpha = 0.35 + Math.sin(tick * 0.06 + i) * 0.2;
    ctx.fillStyle = i % 2 === 0 ? `rgba(236, 72, 153, ${alpha})` : `rgba(6, 182, 212, ${alpha})`;
    ctx.fillRect((tick * 1.4 + i * 105) % w, rippleY, 120, 3);
  }

  // Quayside stone promenade balustrade
  ctx.fillStyle = '#475569';
  ctx.fillRect(0, floorY - 6, w, 6);
  ctx.fillStyle = '#64748b';
  for (let px = 10; px < w; px += 35) {
    ctx.fillRect(px, floorY - 18, 6, 12);
  }
  ctx.fillRect(0, floorY - 20, w, 4);
}

// -------------------------------------------------------------
// 11. Orchard Road & ION Orchard Canopy (Photo 1 Reference)
// -------------------------------------------------------------
function drawOrchardRoad(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Deep tropical daylight sky
  const sky = ctx.createLinearGradient(0, 0, 0, floorY);
  sky.addColorStop(0, '#0284c7');
  sky.addColorStop(0.7, '#7dd3fc');
  sky.addColorStop(1, '#bae6fd');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, floorY);

  // Soft cirrus clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.beginPath();
  ctx.ellipse(180, 45, 90, 22, 0, 0, Math.PI * 2);
  ctx.ellipse(550, 35, 120, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  // --- ION ORCHARD FACADE & ORGANIC CANOPY (Photo 1) ---
  // Background curved glass building facade
  const glassGrad = ctx.createLinearGradient(0, 30, 0, floorY);
  glassGrad.addColorStop(0, '#0f766e');
  glassGrad.addColorStop(0.5, '#14b8a6');
  glassGrad.addColorStop(1, '#99f6e4');
  ctx.fillStyle = glassGrad;
  ctx.fillRect(0, 30, w, floorY - 30);

  // Faceted triangular glass geometric pattern of ION Orchard
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1.5;
  for (let gx = 0; gx < w; gx += 48) {
    for (let gy = 40; gy < floorY - 80; gy += 38) {
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx + 24, gy + 38);
      ctx.lineTo(gx + 48, gy);
      ctx.stroke();
    }
  }

  // Branching tree-like steel columns supporting the soaring canopy (Photo 1)
  const drawBranchingPillar = (px: number) => {
    ctx.fillStyle = '#e2e8f0';
    // Main vertical trunk
    ctx.fillRect(px - 10, 110, 20, floorY - 110);
    // Left diagonal branch
    ctx.beginPath();
    ctx.moveTo(px - 10, 140);
    ctx.lineTo(px - 45, 50);
    ctx.lineTo(px - 32, 48);
    ctx.lineTo(px + 4, 130);
    ctx.closePath();
    ctx.fill();
    // Right diagonal branch
    ctx.beginPath();
    ctx.moveTo(px + 10, 140);
    ctx.lineTo(px + 45, 50);
    ctx.lineTo(px + 32, 48);
    ctx.lineTo(px - 4, 130);
    ctx.closePath();
    ctx.fill();
  };
  drawBranchingPillar(110);
  drawBranchingPillar(370);
  drawBranchingPillar(630);

  // Sweeping undulating glass-and-steel canopy roof overhead
  ctx.fillStyle = 'rgba(241, 245, 249, 0.85)';
  ctx.beginPath();
  ctx.moveTo(0, 45);
  ctx.bezierCurveTo(200, 15, 300, 75, 480, 35);
  ctx.bezierCurveTo(620, 10, 720, 60, w, 40);
  ctx.lineTo(w, 20);
  ctx.lineTo(0, 20);
  ctx.closePath();
  ctx.fill();

  // --- LUXURY STOREFRONT BOUTIQUES (Street Level) ---
  // Storefront 1: TIFFANY & CO. (Signature Robin Egg Blue / Turquoise #0abab5)
  ctx.fillStyle = '#0abab5';
  ctx.fillRect(40, 195, 160, floorY - 195);
  ctx.fillStyle = '#065f46';
  ctx.fillRect(48, 225, 144, floorY - 225);
  ctx.fillStyle = '#fef08a'; // Polished gold lettering
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('TIFFANY & CO.', 75, 215);

  // Storefront 2: LOUIS VUITTON (Checkered Damier / Monogram warm gold)
  ctx.fillStyle = '#451a03';
  ctx.fillRect(230, 195, 180, floorY - 195);
  // Checkered pattern
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 0) {
        ctx.fillStyle = '#78350f';
        ctx.fillRect(238 + col * 20, 222 + row * 18, 18, 16);
      }
    }
  }
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('LOUIS VUITTON', 270, 215);

  // --- ORCHARD MRT STATION GLASS BUBBLE ENTRANCE (Photo 1) ---
  // Futuristic curved glass tube portal leading underground
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(610, 240, 65, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(545, 240, 130, floorY - 240);
  // Glass ribbed arches
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(610, 240, 65, Math.PI, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(610, 240, 50, Math.PI, 0);
  ctx.stroke();
  // MRT Red/Green icon pill
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(570, 225, 38, 12);
  ctx.fillStyle = '#10b981';
  ctx.fillRect(608, 225, 38, 12);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('MRT NS22/TE14', 574, 234);

  // Escalators descending underground
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  for (let esc = 0; esc < 6; esc++) {
    ctx.beginPath();
    ctx.moveTo(565 + esc * 12, 255 + esc * 9);
    ctx.lineTo(605 + esc * 12, 255 + esc * 9);
    ctx.stroke();
  }

  // Orchard Road Granite Paver Plaza (Checkered grey and charcoal paving)
  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  for (let gx = 0; gx < w; gx += 40) {
    for (let gy = floorY; gy < h; gy += 25) {
      ctx.strokeRect(gx, gy, 40, 25);
    }
  }

  // Designer red curved plaza bench
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.roundRect(430, floorY + 15, 85, 22, 8);
  ctx.fill();
}

// -------------------------------------------------------------
// 12. Marina Bay Sands & ArtScience Museum (Photo 3 Reference)
// -------------------------------------------------------------
function drawMarinaBaySands(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Deep twilight night sky over Marina Bay
  const sky = ctx.createLinearGradient(0, 0, 0, floorY);
  sky.addColorStop(0, '#060a1f');
  sky.addColorStop(0.5, '#13193e');
  sky.addColorStop(1, '#2a1a4a');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, floorY);

  // Twinkling stars
  for (let s = 0; s < 25; s++) {
    const sx = (s * 37 + 12) % w;
    const sy = (s * 19 + 7) % 110;
    const flicker = Math.sin(tick * 0.1 + s) * 0.4 + 0.6;
    ctx.fillStyle = `rgba(255, 255, 255, ${flicker})`;
    ctx.fillRect(sx, sy, 2, 2);
  }

  // Distant financial district towers on the far left
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(15, 90, 45, floorY - 90);
  ctx.fillRect(65, 60, 50, floorY - 60);
  ctx.fillRect(120, 75, 40, floorY - 75);

  // --- THE THREE MARINA BAY SANDS TOWERS (Photo 3) ---
  const towerW = 60;
  const towerH = 175;
  const towerY = floorY - towerH;
  const towers = [190, 280, 370];

  towers.forEach(tx => {
    // Elegant curved tower shaft (slanted inward profile)
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(tx - 4, floorY);
    ctx.lineTo(tx + 4, towerY);
    ctx.lineTo(tx + towerW - 4, towerY);
    ctx.lineTo(tx + towerW + 4, floorY);
    ctx.closePath();
    ctx.fill();

    // Thousands of glowing hotel room windows
    ctx.fillStyle = '#fef08a';
    for (let wy = towerY + 12; wy < floorY - 10; wy += 11) {
      for (let wx = tx + 8; wx < tx + towerW - 8; wx += 10) {
        if ((wx + wy + tick * 0.1) % 3 > 0.8) {
          ctx.fillRect(wx, wy, 5, 4);
        }
      }
    }
  });

  // --- THE SKYPARK SURFBOARD ROOF DECK (Photo 3) ---
  // Cantilevered infinity pool ship spanning all 3 towers
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(150, towerY + 4);
  ctx.lineTo(465, towerY + 4);
  ctx.bezierCurveTo(495, towerY - 6, 480, towerY - 18, 440, towerY - 16);
  ctx.lineTo(170, towerY - 16);
  ctx.bezierCurveTo(140, towerY - 16, 130, towerY - 2, 150, towerY + 4);
  ctx.closePath();
  ctx.fill();

  // Infinity pool edge glowing aqua blue
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(180, towerY - 12, 220, 3);
  // Silhouetted rooftop palm trees atop SkyPark
  ctx.fillStyle = '#0f172a';
  for (let px = 200; px <= 380; px += 35) {
    ctx.fillRect(px, towerY - 22, 2, 8);
    ctx.beginPath();
    ctx.arc(px + 1, towerY - 22, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- ARTSCIENCE MUSEUM LOTUS FLOWER (Photo 3) ---
  const lotusX = 490;
  const lotusY = floorY - 35;
  // White illuminated curved petals
  ctx.fillStyle = '#f1f5f9';
  const petalOffsets = [-35, -20, -6, 8, 24, 38];
  petalOffsets.forEach((po, idx) => {
    ctx.beginPath();
    ctx.moveTo(lotusX + po * 0.5, lotusY);
    ctx.quadraticCurveTo(lotusX + po * 1.3, lotusY - 30 - Math.abs(idx - 2.5) * 4, lotusX + po, lotusY - 45 + Math.abs(idx - 2.5) * 5);
    ctx.quadraticCurveTo(lotusX + po * 0.8, lotusY - 15, lotusX + po * 0.3, lotusY);
    ctx.fill();
  });
  // Violet glow at museum base
  ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
  ctx.beginPath();
  ctx.ellipse(lotusX, lotusY, 50, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // --- MARINA BAY WATER & REFLECTIONS ---
  const waterGrad = ctx.createLinearGradient(0, floorY, 0, h);
  waterGrad.addColorStop(0, '#0c1a35');
  waterGrad.addColorStop(1, '#050a18');
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Vibrantly shimmering reflections of MBS towers & lights on water
  for (let i = 0; i < 8; i++) {
    const wy = floorY + 12 + i * 13;
    const wave = Math.sin(tick * 0.08 + i) * 12;
    // Tower reflections
    ctx.fillStyle = `rgba(254, 240, 138, ${0.35 + Math.sin(tick * 0.05 + i) * 0.15})`;
    ctx.fillRect(200 + wave, wy, 210, 2.5);
    // ArtScience lotus violet reflection
    ctx.fillStyle = `rgba(192, 132, 252, ${0.4 + Math.sin(tick * 0.07 + i) * 0.2})`;
    ctx.fillRect(470 + wave * 0.7, wy, 65, 2);
  }

  // Spectra Fountain Light Show laser beams shooting into sky
  const laserAngle = Math.sin(tick * 0.04) * 0.25;
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(590, floorY);
  ctx.lineTo(590 + laserAngle * 400, 20);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(236, 72, 153, 0.55)';
  ctx.beginPath();
  ctx.moveTo(630, floorY);
  ctx.lineTo(630 - laserAngle * 350, 20);
  ctx.stroke();

  // Waterfront Event Plaza Wooden Boardwalk Decking
  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, floorY - 4, w, 4);
  ctx.fillStyle = '#92400e';
  for (let px = 0; px < w; px += 20) {
    ctx.fillRect(px, floorY - 4, 18, 4);
  }
}

// -------------------------------------------------------------
// 13. Merlion Park Waterfront Promenade (Photo 2 Reference)
// -------------------------------------------------------------
function drawMerlionPark(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Vibrant sunny tropical sky over Marina Bay
  const sky = ctx.createLinearGradient(0, 0, 0, floorY);
  sky.addColorStop(0, '#0284c7');
  sky.addColorStop(0.65, '#38bdf8');
  sky.addColorStop(1, '#bae6fd');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, floorY);

  // Fluffy white cumulus clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.beginPath();
  ctx.ellipse(220, 45, 80, 26, 0, 0, Math.PI * 2);
  ctx.ellipse(580, 55, 110, 32, 0, 0, Math.PI * 2);
  ctx.fill();

  // Distant skyline across Marina Bay: Mini Marina Bay Sands & ArtScience Museum
  ctx.fillStyle = '#64748b';
  // MBS Towers in background
  ctx.fillRect(450, 100, 24, 75);
  ctx.fillRect(485, 100, 24, 75);
  ctx.fillRect(520, 100, 24, 75);
  // SkyPark atop
  ctx.fillRect(435, 94, 125, 8);
  // ArtScience Lotus in background
  ctx.beginPath();
  ctx.arc(580, 155, 22, Math.PI, 0);
  ctx.fill();

  // Shimmering Marina Bay water basin
  const waterGrad = ctx.createLinearGradient(0, 175, 0, floorY);
  waterGrad.addColorStop(0, '#0284c7');
  waterGrad.addColorStop(1, '#0369a1');
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, 175, w, floorY - 175);

  // Soft gentle waves on the bay
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1.5;
  for (let wy = 185; wy < floorY - 20; wy += 14) {
    ctx.beginPath();
    ctx.moveTo(0, wy);
    for (let wx = 0; wx < w; wx += 40) {
      ctx.quadraticCurveTo(wx + 20, wy - 3, wx + 40, wy);
    }
    ctx.stroke();
  }

  // --- THE MERLION STATUE & PEDESTAL (Photo 2) ---
  const merlionX = 180;
  const merlionY = floorY - 145;

  // 1. Curved wave-tiled blue mosaic pedestal
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(merlionX - 35, floorY - 35, 70, 35, [16, 16, 0, 0]);
  ctx.fill();
  // Mosaic wave pattern lines
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  for (let py = floorY - 30; py < floorY; py += 7) {
    ctx.beginPath();
    ctx.moveTo(merlionX - 30, py);
    ctx.quadraticCurveTo(merlionX, py - 3, merlionX + 30, py);
    ctx.stroke();
  }

  // 2. The Merlion body: Fish tail with scales
  ctx.fillStyle = '#f8fafc'; // Pure white limestone
  ctx.beginPath();
  ctx.moveTo(merlionX - 22, floorY - 35);
  ctx.quadraticCurveTo(merlionX - 30, floorY - 70, merlionX - 12, floorY - 95);
  ctx.lineTo(merlionX + 18, floorY - 95);
  ctx.quadraticCurveTo(merlionX + 24, floorY - 65, merlionX + 16, floorY - 35);
  ctx.closePath();
  ctx.fill();

  // Fish scales texture
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  for (let scY = floorY - 85; scY < floorY - 40; scY += 10) {
    for (let scX = merlionX - 16; scX < merlionX + 14; scX += 8) {
      ctx.beginPath();
      ctx.arc(scX, scY, 4, 0, Math.PI);
      ctx.stroke();
    }
  }

  // 3. The Merlion Head: Majestic lion mane & face
  ctx.fillStyle = '#f8fafc';
  // Lion head circle
  ctx.beginPath();
  ctx.arc(merlionX + 5, merlionY + 28, 22, 0, Math.PI * 2);
  ctx.fill();
  // Lion mane tufts
  const maneTufts = [
    { x: -14, y: 12 }, { x: -18, y: 25 }, { x: -16, y: 38 },
    { x: 2, y: 8 }, { x: 18, y: 10 }
  ];
  maneTufts.forEach(t => {
    ctx.beginPath();
    ctx.arc(merlionX + 5 + t.x, merlionY + t.y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Lion eyes and open mouth
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(merlionX + 16, merlionY + 24, 3, 0, Math.PI * 2); // Eye
  ctx.fill();
  // Open roaring mouth
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(merlionX + 26, merlionY + 32, 6, 8, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // --- ANIMATED MERLION WATER FOUNTAIN SPOUT (Photo 2) ---
  // High pressure water jet arching into the bay
  const waterStart = { x: merlionX + 28, y: merlionY + 32 };
  const waterTarget = { x: merlionX + 130, y: floorY - 10 };
  const controlPoint = { x: merlionX + 85, y: merlionY - 15 };

  // Jet water arc
  ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(waterStart.x, waterStart.y);
  ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, waterTarget.x, waterTarget.y);
  ctx.stroke();

  // Inner fast core
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(waterStart.x, waterStart.y);
  ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, waterTarget.x, waterTarget.y);
  ctx.stroke();

  // Animated splashing foam and water spray where fountain hits bay
  const splashSize = 14 + Math.sin(tick * 0.2) * 4;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.ellipse(waterTarget.x, waterTarget.y, splashSize, splashSize * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  for (let sp = 0; sp < 6; sp++) {
    const spX = waterTarget.x + Math.cos(tick * 0.15 + sp) * 16;
    const spY = waterTarget.y - Math.sin(tick * 0.2 + sp) * 12;
    ctx.fillRect(spX, spY, 3, 3);
  }

  // --- WATERFRONT PROMENADE QUAY PAVEMENT ---
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, floorY, w, h - floorY);
  // Large granite flagstone joints
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.5;
  for (let gx = 0; gx < w; gx += 55) {
    for (let gy = floorY; gy < h; gy += 30) {
      ctx.strokeRect(gx, gy, 55, 30);
    }
  }

  // Promenade safety railing & green planter boxes
  ctx.fillStyle = '#475569';
  ctx.fillRect(0, floorY - 6, w, 6);
  ctx.fillStyle = '#15803d'; // Planters with colorful flowers
  for (let plx = 280; plx < w - 40; plx += 110) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(plx, floorY - 16, 50, 14);
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.ellipse(plx + 25, floorY - 18, 22, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(plx + 18, floorY - 22, 6, 6);
    ctx.fillRect(plx + 32, floorY - 21, 6, 6);
  }
}

// -------------------------------------------------------------
// 14. Changi Airport & Jewel Dome (Photo 5 Reference)
// -------------------------------------------------------------
function drawChangiAirport(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Clear tropical blue sky over Changi
  const sky = ctx.createLinearGradient(0, 0, 0, floorY);
  sky.addColorStop(0, '#0284c7');
  sky.addColorStop(0.65, '#38bdf8');
  sky.addColorStop(1, '#bae6fd');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, floorY);

  // Singapore Airlines commercial plane climbing in the distance
  const planeX = ((tick * 0.8) % (w + 200)) - 80;
  const planeY = 40;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(planeX, planeY, 35, 7);
  ctx.fillStyle = '#1d4ed8'; // SQ navy tail
  ctx.beginPath();
  ctx.moveTo(planeX + 5, planeY);
  ctx.lineTo(planeX, planeY - 14);
  ctx.lineTo(planeX + 12, planeY - 14);
  ctx.lineTo(planeX + 16, planeY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fbbf24'; // Gold SQ kris bird emblem
  ctx.fillRect(planeX + 4, planeY - 10, 5, 4);

  // --- JEWEL CHANGI AIRPORT DOME (Photo 5) ---
  // Giant glass geodesic toroidal dome behind the tower
  const domeX = 490;
  const domeY = floorY - 15;
  const domeW = 260;
  const domeH = 150;

  const domeGrad = ctx.createLinearGradient(domeX - domeW / 2, 0, domeX + domeW / 2, 0);
  domeGrad.addColorStop(0, '#0284c7');
  domeGrad.addColorStop(0.5, '#7dd3fc');
  domeGrad.addColorStop(1, '#0284c7');
  ctx.fillStyle = domeGrad;
  ctx.beginPath();
  ctx.ellipse(domeX, domeY, domeW / 2, domeH, 0, Math.PI, 0);
  ctx.fill();

  // Glass triangular diagrid network on Jewel dome
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1;
  for (let dx = domeX - domeW / 2 + 20; dx < domeX + domeW / 2; dx += 24) {
    ctx.beginPath();
    ctx.moveTo(dx, domeY);
    ctx.lineTo(domeX, domeY - domeH);
    ctx.stroke();
  }

  // --- THE WORLD-FAMOUS CHANGI ATC TOWER (Photo 5) ---
  const atcX = 210;
  const towerH = 200;
  const towerTop = floorY - towerH;

  // 1. Sleek concrete tower shaft with vertical architectural ribs
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(atcX - 18, floorY);
  ctx.lineTo(atcX - 12, towerTop + 35);
  ctx.lineTo(atcX + 12, towerTop + 35);
  ctx.lineTo(atcX + 18, floorY);
  ctx.closePath();
  ctx.fill();

  // Center vertical structural flute
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(atcX - 2, towerTop + 35, 4, towerH - 35);

  // 2. Octagonal Air Traffic Control glass cabin
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(atcX - 24, towerTop + 35);
  ctx.lineTo(atcX + 24, towerTop + 35);
  ctx.lineTo(atcX + 32, towerTop + 14);
  ctx.lineTo(atcX - 32, towerTop + 14);
  ctx.closePath();
  ctx.fill();

  // 3. Distinctive spherical white radar dome (The "Golf Ball" radome, Photo 5)
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(atcX, towerTop - 2, 20, 0, Math.PI * 2);
  ctx.fill();
  // Geodesic hexagon seams on sphere
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(atcX, towerTop - 2, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(atcX, towerTop - 2, 14, 20, 0, 0, Math.PI * 2);
  ctx.stroke();

  // --- CHANGI AIRPORT BOULEVARD ROADSIDE LANDSCAPING (Photo 5) ---
  // Iconic Traveler's Palm Fans (Ravenala madagascariensis)
  const drawTravelerPalm = (tx: number, ty: number) => {
    ctx.fillStyle = '#15803d';
    for (let f = -5; f <= 5; f++) {
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.quadraticCurveTo(tx + f * 12, ty - 35, tx + f * 18, ty - 60);
      ctx.quadraticCurveTo(tx + f * 14, ty - 30, tx, ty);
      ctx.fill();
    }
  };
  drawTravelerPalm(70, floorY);
  drawTravelerPalm(340, floorY);
  drawTravelerPalm(690, floorY);

  // Dense Bougainvillea crimson hedges along the highway
  for (let bx = 0; bx < w; bx += 38) {
    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.ellipse(bx + 19, floorY - 14, 24, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    // Magenta bougainvillea flowers
    ctx.fillStyle = '#db2777';
    ctx.beginPath();
    ctx.ellipse(bx + 20, floorY - 18, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- GREEN HIGHWAY DIRECTIONAL GANTRY SIGN (Photo 5) ---
  // Overhead expressway gantry frame
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(370, floorY);
  ctx.lineTo(370, 110);
  ctx.lineTo(620, 110);
  ctx.lineTo(620, floorY);
  ctx.stroke();

  // Green reflective highway signboard
  ctx.fillStyle = '#15803d'; // LTA Highway Green
  ctx.fillRect(380, 115, 230, 46);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(383, 118, 224, 40);

  // Sign text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px sans-serif';
  ctx.fillText('⬅ Jewel Car Park', 392, 133);
  ctx.fillText('Terminals 1 · 2 · 3 ➡', 485, 133);
  ctx.font = '7px sans-serif';
  ctx.fillText('Airport Boulevard / PIE', 430, 148);

  // Multi-lane Airport Boulevard Asphalt Floor
  ctx.fillStyle = '#334155';
  ctx.fillRect(0, floorY, w, h - floorY);

  // White highway lane divider markings
  ctx.fillStyle = '#ffffff';
  for (let rx = 15; rx < w; rx += 70) {
    ctx.fillRect(rx, floorY + 30, 40, 4);
  }
}

// -------------------------------------------------------------
// 15. CHIJMES Historic Gothic Chapel & Cloisters
// -------------------------------------------------------------
function drawCHIJMES(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Twilight evening sky with warm amber backlight
  const sky = ctx.createLinearGradient(0, 0, 0, floorY);
  sky.addColorStop(0, '#0f172a');
  sky.addColorStop(0.65, '#2e1065');
  sky.addColorStop(1, '#581c87');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, floorY);

  // --- THE GOTHIC REVIVAL CHAPEL (Convent of the Holy Infant Jesus) ---
  const chapelX = 180;
  const chapelW = 200;
  const chapelY = floorY - 180;

  // Limestone white/cream gothic facade
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(chapelX, chapelY + 60, chapelW, floorY - (chapelY + 60));

  // High central steeple and spire rising into sky
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.moveTo(chapelX + 70, chapelY + 60);
  ctx.lineTo(chapelX + 100, chapelY - 45); // Spire peak
  ctx.lineTo(chapelX + 130, chapelY + 60);
  ctx.closePath();
  ctx.fill();

  // Spire cross
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(chapelX + 100, chapelY - 45);
  ctx.lineTo(chapelX + 100, chapelY - 60);
  ctx.moveTo(chapelX + 93, chapelY - 54);
  ctx.lineTo(chapelX + 107, chapelY - 54);
  ctx.stroke();

  // Flying buttresses & pinnacles flanking the facade
  const pinnacles = [chapelX - 10, chapelX + 45, chapelX + 155, chapelX + chapelW + 10];
  pinnacles.forEach(px => {
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(px - 4, chapelY + 30, 8, floorY - (chapelY + 30));
    ctx.beginPath();
    ctx.moveTo(px - 6, chapelY + 30);
    ctx.lineTo(px, chapelY + 12);
    ctx.lineTo(px + 6, chapelY + 30);
    ctx.fill();
  });

  // Lancet Pointed Stained-Glass Arched Windows glowing with warm jewel tones
  for (let wx = chapelX + 25; wx <= chapelX + chapelW - 40; wx += 42) {
    // Window frame
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(wx, chapelY + 140);
    ctx.lineTo(wx, chapelY + 95);
    ctx.quadraticCurveTo(wx + 12, chapelY + 75, wx + 24, chapelY + 95);
    ctx.lineTo(wx + 24, chapelY + 140);
    ctx.closePath();
    ctx.fill();

    // Glowing warm stained glass
    const glassGrad = ctx.createLinearGradient(wx, chapelY + 75, wx, chapelY + 140);
    glassGrad.addColorStop(0, '#fbbf24');
    glassGrad.addColorStop(0.5, '#f59e0b');
    glassGrad.addColorStop(1, '#ef4444');
    ctx.fillStyle = glassGrad;
    ctx.fillRect(wx + 2, chapelY + 98, 20, 40);
  }

  // Large Rose Window above the main portal
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(chapelX + 100, chapelY + 50, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // --- CLOISTER WALKWAY ARCADE (Right Side) ---
  const cloisterX = 430;
  for (let cx = cloisterX; cx < w; cx += 55) {
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(cx, floorY - 90, 10, 90);
    // Pointed gothic archway
    ctx.beginPath();
    ctx.moveTo(cx, floorY - 70);
    ctx.quadraticCurveTo(cx + 25, floorY - 95, cx + 55, floorY - 70);
    ctx.lineTo(cx + 55, floorY - 76);
    ctx.quadraticCurveTo(cx + 25, floorY - 105, cx, floorY - 76);
    ctx.fill();
  }

  // --- STRUNG FAIRY LIGHTS ACROSS COURTYARD ---
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(chapelX + chapelW, chapelY + 80);
  ctx.quadraticCurveTo(w / 2 + 50, chapelY + 130, w, chapelY + 90);
  ctx.stroke();

  // Glowing fairy light bulbs
  for (let fx = chapelX + chapelW + 10; fx < w - 10; fx += 25) {
    const tRatio = (fx - (chapelX + chapelW)) / (w - (chapelX + chapelW));
    const fy = (chapelY + 80) * (1 - tRatio) + (chapelY + 90) * tRatio + Math.sin(tRatio * Math.PI) * 45;
    const bulbGlow = 0.7 + Math.sin(tick * 0.15 + fx) * 0.3;
    ctx.fillStyle = `rgba(254, 240, 138, ${bulbGlow})`;
    ctx.beginPath();
    ctx.arc(fx, fy, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // European Herringbone Cobblestone Courtyard Floor
  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1;
  for (let gx = 0; gx < w; gx += 35) {
    for (let gy = floorY; gy < h; gy += 20) {
      ctx.strokeRect(gx, gy, 35, 20);
    }
  }

  // Alfresco dining table with candle and umbrella
  ctx.fillStyle = '#b91c1c'; // Red umbrella
  ctx.beginPath();
  ctx.moveTo(560, floorY - 55);
  ctx.lineTo(625, floorY - 55);
  ctx.lineTo(592, floorY - 80);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#475569';
  ctx.fillRect(591, floorY - 55, 3, 55);
  // Table
  ctx.fillStyle = '#78350f';
  ctx.fillRect(575, floorY - 25, 35, 6);
  // Candle lantern on table
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(590, floorY - 33, 5, 8);
}

// -------------------------------------------------------------
// 16. Gardens by the Bay & Supertree Grove
// -------------------------------------------------------------
function drawGardensByTheBay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Deep nocturnal night sky over the Gardens
  const sky = ctx.createLinearGradient(0, 0, 0, floorY);
  sky.addColorStop(0, '#050515');
  sky.addColorStop(0.5, '#120b2e');
  sky.addColorStop(1, '#250e42');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, floorY);

  // Sparkling celestial stars
  for (let s = 0; s < 30; s++) {
    const sx = (s * 41 + 17) % w;
    const sy = (s * 23 + 11) % (floorY - 60);
    const starAlpha = 0.5 + Math.sin(tick * 0.12 + s) * 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha})`;
    ctx.fillRect(sx, sy, 2, 2);
  }

  // Distant Flower Dome & Cloud Forest Glass Biomes
  ctx.fillStyle = '#0f2942';
  ctx.beginPath();
  ctx.ellipse(650, floorY - 15, 85, 45, 0, Math.PI, 0);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // --- TWO MAJESTIC SUPERTREES (25m - 50m) ---
  const drawSupertree = (tx: number, th: number, isMajor: boolean) => {
    const ty = floorY - th;
    const trunkW = isMajor ? 55 : 42;
    const crownW = isMajor ? 160 : 120;

    // Inverted funnel trumpet canopy at top
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.moveTo(tx - crownW / 2, ty);
    ctx.lineTo(tx + crownW / 2, ty);
    ctx.lineTo(tx + trunkW / 2, ty + 45);
    ctx.lineTo(tx - trunkW / 2, ty + 45);
    ctx.closePath();
    ctx.fill();

    // Living plant trunk (Vertical garden covered in bromeliads and ferns)
    const trunkGrad = ctx.createLinearGradient(tx - trunkW / 2, 0, tx + trunkW / 2, 0);
    trunkGrad.addColorStop(0, '#14532d');
    trunkGrad.addColorStop(0.5, '#166534');
    trunkGrad.addColorStop(1, '#14532d');
    ctx.fillStyle = trunkGrad;
    ctx.beginPath();
    ctx.moveTo(tx - trunkW / 2, ty + 45);
    ctx.lineTo(tx + trunkW / 2, ty + 45);
    ctx.lineTo(tx + trunkW / 2 + 12, floorY);
    ctx.lineTo(tx - trunkW / 2 - 12, floorY);
    ctx.closePath();
    ctx.fill();

    // Plant foliage patches on trunk
    for (let py = ty + 50; py < floorY - 20; py += 22) {
      ctx.fillStyle = py % 2 === 0 ? '#15803d' : '#854d0e';
      ctx.fillRect(tx - trunkW / 2 + 6, py, trunkW - 12, 10);
    }

    // --- GARDEN RHAPSODY NEON LIGHT SHOW ANIMATION ---
    // Pulsing fiber-optic ribs of magenta, violet, and electric cyan
    const colorPulse = Math.sin(tick * 0.1 + tx) * 0.5 + 0.5;
    const neonColor1 = `rgba(236, 72, 153, ${0.7 + colorPulse * 0.3})`;
    const neonColor2 = `rgba(6, 182, 212, ${0.7 + (1 - colorPulse) * 0.3})`;

    ctx.strokeStyle = isMajor ? neonColor1 : neonColor2;
    ctx.lineWidth = 2.5;

    // Canopy radial branch ribs
    for (let rx = tx - crownW / 2 + 15; rx <= tx + crownW / 2 - 15; rx += 18) {
      ctx.beginPath();
      ctx.moveTo(rx, ty);
      ctx.lineTo(tx, ty + 45);
      ctx.stroke();
    }

    // Trunk vertical spiral light strands
    for (let lx = tx - trunkW / 2 + 8; lx <= tx + trunkW / 2 - 8; lx += 12) {
      ctx.strokeStyle = (lx + tick * 2) % 24 > 12 ? neonColor1 : neonColor2;
      ctx.beginPath();
      ctx.moveTo(lx, ty + 45);
      ctx.lineTo(lx, floorY);
      ctx.stroke();
    }
  };

  drawSupertree(210, 225, true);  // Left Giant Supertree
  drawSupertree(480, 195, false); // Right Supertree

  // --- OCBC SKYWAY AERIAL SUSPENSION BRIDGE (22m height) ---
  // Graceful curving walkway connecting the two Supertrees
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(210, floorY - 145);
  ctx.quadraticCurveTo(345, floorY - 125, 480, floorY - 130);
  ctx.stroke();

  // Suspension tension cables hanging from supertrees
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.6)';
  ctx.lineWidth = 1;
  for (let cx = 230; cx < 460; cx += 25) {
    const t = (cx - 210) / (480 - 210);
    const cableBottomY = (floorY - 145) * (1 - t) + (floorY - 130) * t + Math.sin(t * Math.PI) * 18;
    ctx.beginPath();
    ctx.moveTo(cx, cableBottomY);
    ctx.lineTo(cx < 345 ? 210 : 480, floorY - 195);
    ctx.stroke();
  }

  // Silhouetted visitors strolling on the skyway
  ctx.fillStyle = '#0f172a';
  for (let vx = 270; vx <= 420; vx += 45) {
    const vt = (vx - 210) / (480 - 210);
    const vy = (floorY - 145) * (1 - vt) + (floorY - 130) * vt + Math.sin(vt * Math.PI) * 18;
    ctx.fillRect(vx, vy - 10, 4, 8);
    ctx.beginPath();
    ctx.arc(vx + 2, vy - 12, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Botanical Garden Park Floor
  const parkFloor = ctx.createLinearGradient(0, floorY, 0, h);
  parkFloor.addColorStop(0, '#14532d');
  parkFloor.addColorStop(1, '#052e16');
  ctx.fillStyle = parkFloor;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Winding illuminated pedestrian pathway
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(0, floorY + 15);
  ctx.quadraticCurveTo(240, floorY + 5, w, floorY + 30);
  ctx.lineTo(w, floorY + 55);
  ctx.quadraticCurveTo(240, floorY + 35, 0, floorY + 45);
  ctx.closePath();
  ctx.fill();

  // Glowing pathway edge lamps
  for (let lx = 30; lx < w; lx += 80) {
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(lx, floorY + 18, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

// -------------------------------------------------------------
// 17. PHOTO 1 REFERENCE: Secondary School & Grandstand
// CHIJ St. Nicholas Girls' School facade: Multistory white campus with sky-blue accents,
// blue stairwell towers, Chinese and English school crest, grandstand bleachers overlooking running track & field.
// -------------------------------------------------------------
function drawSecondarySchool(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Vibrant tropical Singapore sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.7, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Distant cumulus clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.beginPath();
  ctx.ellipse(180, 40, 50, 18, 0, 0, Math.PI * 2);
  ctx.ellipse(215, 35, 35, 22, 0, 0, Math.PI * 2);
  ctx.ellipse(540, 30, 60, 20, 0, 0, Math.PI * 2);
  ctx.ellipse(580, 25, 40, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Lush hillside greenery on the left (Photo 1)
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.moveTo(0, floorY - 50);
  ctx.quadraticCurveTo(80, floorY - 140, 160, floorY - 60);
  ctx.lineTo(160, floorY);
  ctx.lineTo(0, floorY);
  ctx.closePath();
  ctx.fill();

  // Tropical palm trees on the hillside
  for (let px = 20; px <= 120; px += 35) {
    ctx.strokeStyle = '#543d2b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px, floorY - 70);
    ctx.quadraticCurveTo(px - 5, floorY - 110, px, floorY - 130);
    ctx.stroke();
    // Palm fronds
    ctx.fillStyle = '#166534';
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
      const fx = px + Math.cos(angle) * 22;
      const fy = floorY - 130 + Math.sin(angle) * 12;
      ctx.beginPath();
      ctx.ellipse(fx, fy, 14, 5, angle, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- CHIJ ST. NICHOLAS GIRLS' SCHOOL MULTISTORY CAMPUS (Photo 1) ---
  const bldgX = 140;
  const bldgW = 640;
  const bldgY = 45;
  const bldgH = 140;

  // Main white building block
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(bldgX, bldgY, bldgW, bldgH);

  // Bright sky-blue structural band and columns (Photo 1)
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(bldgX, bldgY, bldgW, 14); // Roofline cornice
  ctx.fillRect(bldgX, bldgY + 50, bldgW, 8); // Level 3 floorplate
  ctx.fillRect(bldgX, bldgY + 95, bldgW, 8); // Level 2 floorplate

  // Sky-blue vertical stairwell towers (Photo 1)
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(bldgX + 80, bldgY, 32, bldgH);
  ctx.fillRect(bldgX + 360, bldgY, 36, bldgH);
  // Louvred ventilation slots on stairwells
  ctx.fillStyle = '#e0f2fe';
  for (let ly = bldgY + 20; ly < bldgY + bldgH - 15; ly += 12) {
    ctx.fillRect(bldgX + 86, ly, 20, 4);
    ctx.fillRect(bldgX + 368, ly, 20, 4);
  }

  // Classroom windows with blue tinted glass and white safety railings (Photo 1)
  for (let row = 0; row < 3; row++) {
    const wy = bldgY + 20 + row * 45;
    for (let col = 0; col < 9; col++) {
      const wx = bldgX + 10 + col * 70;
      // Avoid drawing over stairwells
      if ((wx >= bldgX + 70 && wx <= bldgX + 115) || (wx >= bldgX + 350 && wx <= bldgX + 395)) continue;
      // Blue window
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(wx, wy, 38, 20);
      // Window mullions
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(wx, wy, 38, 20);
      ctx.beginPath();
      ctx.moveTo(wx + 19, wy);
      ctx.lineTo(wx + 19, wy + 20);
      ctx.stroke();
      // White corridor safety railing (Photo 1)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(wx - 4, wy + 14, 46, 8);
    }
  }

  // School Title Plaque: Just "SECONDARY SCHOOL"
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(bldgX + 160, bldgY + 6, 170, 20);
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(bldgX + 160, bldgY + 6, 170, 20);

  ctx.fillStyle = '#0c4a6e';
  ctx.font = 'bold 9px "Press Start 2P", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SECONDARY SCHOOL', bldgX + 245, bldgY + 20);
  ctx.textAlign = 'start';

  // --- GRANDSTAND BLEACHERS & CANTILEVERED ROOF (Photo 1) ---
  const gsX = 80;
  const gsY = 175;
  const gsW = 280;
  const gsH = 95;

  // Cantilevered Grandstand Roof Structure
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(gsX - 10, gsY - 15);
  ctx.lineTo(gsX + gsW + 10, gsY - 25);
  ctx.lineTo(gsX + gsW + 5, gsY - 15);
  ctx.lineTo(gsX - 5, gsY - 5);
  ctx.closePath();
  ctx.fill();

  // Roof steel supports
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  for (let rx = gsX + 20; rx <= gsX + gsW - 20; rx += 60) {
    ctx.beginPath();
    ctx.moveTo(rx, gsY - 18);
    ctx.lineTo(rx + 15, gsY + 10);
    ctx.stroke();
  }

  // Stepped Concrete Grandstand Bleachers (Photo 1)
  const steps = 6;
  const stepH = gsH / steps;
  const stepW = gsW / steps;
  for (let s = 0; s < steps; s++) {
    const sy = gsY + s * stepH;
    const sx = gsX + (steps - s) * 12;
    const sw = gsW - (steps - s) * 12;
    // Step tread
    ctx.fillStyle = s % 2 === 0 ? '#94a3b8' : '#cbd5e1';
    ctx.fillRect(sx, sy, sw, stepH);
    // Safety railing on top tiers
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.strokeRect(sx, sy, sw, 3);
  }

  // Seated student silhouettes in school uniform
  ctx.fillStyle = '#0284c7'; // Blue pinafore/shorts
  ctx.fillRect(gsX + 70, gsY + 30, 8, 12);
  ctx.fillRect(gsX + 110, gsY + 45, 8, 12);
  ctx.fillRect(gsX + 160, gsY + 45, 8, 12);
  ctx.fillRect(gsX + 200, gsY + 60, 8, 12);
  ctx.fillStyle = '#f8fafc'; // White blouse
  ctx.fillRect(gsX + 70, gsY + 26, 8, 6);
  ctx.fillRect(gsX + 110, gsY + 41, 8, 6);
  ctx.fillRect(gsX + 160, gsY + 41, 8, 6);
  ctx.fillRect(gsX + 200, gsY + 56, 8, 6);

  // Covered Walkway linking to the sports complex (Photo 1)
  ctx.fillStyle = '#475569';
  ctx.fillRect(gsX + gsW + 10, floorY - 45, 120, 6); // Flat canopy
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(gsX + gsW + 30, floorY - 40, 6, 40); // Pillars
  ctx.fillRect(gsX + gsW + 70, floorY - 40, 6, 40);
  ctx.fillRect(gsX + gsW + 110, floorY - 40, 6, 40);

  // --- SPORTS FIELD & RED RUNNING TRACK (Photo 1 foreground) ---
  // Lush green grass infield
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(0, floorY - 35, w, 35);
  ctx.fillStyle = '#15803d';
  ctx.fillRect(0, floorY - 15, w, 15);

  // Terracotta Red 400m Running Track (Photo 1)
  const trackGrad = ctx.createLinearGradient(0, floorY, 0, h);
  trackGrad.addColorStop(0, '#c2410c'); // Deep red track rubber
  trackGrad.addColorStop(0.6, '#ea580c');
  trackGrad.addColorStop(1, '#9a3412');
  ctx.fillStyle = trackGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  // White Track Lane Lines (Photo 1)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  for (let ly = floorY + 16; ly < h; ly += 24) {
    ctx.beginPath();
    ctx.moveTo(0, ly);
    ctx.lineTo(w, ly);
    ctx.stroke();
  }

  // Track distance markings
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = 'bold 12px "Press Start 2P"';
  ctx.fillText('100M', 40, floorY + 36);
  ctx.fillText('200M', 320, floorY + 36);
  ctx.fillText('FINISH', 600, floorY + 36);
}

// -------------------------------------------------------------
// 18. NATIONAL STADIUM (Taylor Swift Eras Tour Concert Scene)
// Dome trusses, concert stage, Taylor Swift pixel art performing live, crowd silhouettes with glowing wristbands.
// -------------------------------------------------------------
function drawNationalStadium(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Arena dark concert atmosphere
  const arenaGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  arenaGrad.addColorStop(0, '#090514');
  arenaGrad.addColorStop(0.5, '#1e1138');
  arenaGrad.addColorStop(1, '#3b124d');
  ctx.fillStyle = arenaGrad;
  ctx.fillRect(0, 0, w, floorY);

  // National Stadium Architectural Arched Roof Trusses (Singapore Sports Hub)
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 40);
  ctx.quadraticCurveTo(w / 2, -20, w, 40);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 70);
  ctx.quadraticCurveTo(w / 2, 10, w, 70);
  ctx.stroke();

  // Roof diagonal crisscross struts
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
  for (let rx = 30; rx < w; rx += 40) {
    ctx.beginPath();
    ctx.moveTo(rx, 40);
    ctx.lineTo(rx + 20, 70);
    ctx.stroke();
  }

  // Dynamic Concert Moving Spotlights
  const spotAngle1 = Math.sin(tick * 0.04) * 0.5;
  const spotAngle2 = Math.cos(tick * 0.04) * 0.5;

  ctx.save();
  ctx.globalAlpha = 0.25;
  // Beam 1: Hot Pink
  const spotGrad1 = ctx.createRadialGradient(200, 40, 10, 200 + spotAngle1 * 300, floorY, 160);
  spotGrad1.addColorStop(0, '#f472b6');
  spotGrad1.addColorStop(1, 'transparent');
  ctx.fillStyle = spotGrad1;
  ctx.beginPath();
  ctx.moveTo(200, 40);
  ctx.lineTo(200 + spotAngle1 * 300 - 90, floorY);
  ctx.lineTo(200 + spotAngle1 * 300 + 90, floorY);
  ctx.closePath();
  ctx.fill();

  // Beam 2: Cyan
  const spotGrad2 = ctx.createRadialGradient(600, 40, 10, 600 - spotAngle2 * 300, floorY, 160);
  spotGrad2.addColorStop(0, '#38bdf8');
  spotGrad2.addColorStop(1, 'transparent');
  ctx.fillStyle = spotGrad2;
  ctx.beginPath();
  ctx.moveTo(600, 40);
  ctx.lineTo(600 - spotAngle2 * 300 - 90, floorY);
  ctx.lineTo(600 - spotAngle2 * 300 + 90, floorY);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Giant Eras Tour Stage LED Video Wall Backdrop
  const ledX = 180;
  const ledY = 70;
  const ledW = 440;
  const ledH = 150;

  // LED Screen Frame
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(ledX - 6, ledY - 6, ledW + 12, ledH + 12);
  // Screen content: Eras sunset pastel waves
  const ledGrad = ctx.createLinearGradient(ledX, ledY, ledX + ledW, ledY + ledH);
  ledGrad.addColorStop(0, '#ec4899'); // Lover pink
  ledGrad.addColorStop(0.3, '#fbbf24'); // Fearless gold
  ledGrad.addColorStop(0.6, '#8b5cf6'); // Speak Now violet
  ledGrad.addColorStop(1, '#06b6d4'); // 1989 sky blue
  ctx.fillStyle = ledGrad;
  ctx.fillRect(ledX, ledY, ledW, ledH);

  // Stage trusses and speaker towers on the flanks
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(ledX - 45, 60, 35, 170);
  ctx.fillRect(ledX + ledW + 10, 60, 35, 170);
  // Line array speakers
  ctx.fillStyle = '#000000';
  for (let sp = 80; sp < 210; sp += 20) {
    ctx.fillRect(ledX - 40, sp, 25, 14);
    ctx.fillRect(ledX + ledW + 15, sp, 25, 14);
  }

  // Concert Catwalk & Stage Platform
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(240, floorY - 40);
  ctx.lineTo(340, floorY - 80);
  ctx.lineTo(460, floorY - 80);
  ctx.lineTo(560, floorY - 40);
  ctx.lineTo(w - 60, floorY - 10);
  ctx.lineTo(60, floorY - 10);
  ctx.closePath();
  ctx.fill();

  // Diamond thrust stage center
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(400, floorY - 95);
  ctx.lineTo(440, floorY - 70);
  ctx.lineTo(400, floorY - 45);
  ctx.lineTo(360, floorY - 70);
  ctx.closePath();
  ctx.fill();

  // PIXEL ART TAYLOR SWIFT PERFORMING LIVE ON STAGE (Photo reference)
  const tsX = 400;
  const tsY = floorY - 72;

  // Blonde hair with iconic bangs
  ctx.fillStyle = '#fde047';
  ctx.fillRect(tsX - 7, tsY - 32, 14, 12);
  ctx.fillRect(tsX - 9, tsY - 26, 4, 12);
  ctx.fillRect(tsX + 5, tsY - 26, 4, 12);

  // Face & smile
  ctx.fillStyle = '#ffedd5';
  ctx.fillRect(tsX - 5, tsY - 24, 10, 8);
  // Red lips
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(tsX - 2, tsY - 18, 4, 2);

  // Sparkling rhinestone bodysuit (Shimmer with tick)
  const shimmer = (tick % 6 < 3) ? '#f472b6' : '#c084fc';
  ctx.fillStyle = shimmer;
  ctx.fillRect(tsX - 6, tsY - 16, 12, 14);

  // Legs & boots
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(tsX - 5, tsY - 2, 4, 12);
  ctx.fillRect(tsX + 1, tsY - 2, 4, 12);
  ctx.fillStyle = '#fbbf24'; // Glitter knee-high boots
  ctx.fillRect(tsX - 6, tsY + 6, 5, 8);
  ctx.fillRect(tsX + 1, tsY + 6, 5, 8);

  // Acoustic Guitar (Sunburst)
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.ellipse(tsX + 4, tsY - 8, 8, 6, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(tsX - 2, tsY - 12);
  ctx.lineTo(tsX - 12, tsY - 20);
  ctx.stroke();

  // Mic Stand
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(tsX + 10, tsY - 22);
  ctx.lineTo(tsX + 10, tsY + 12);
  ctx.stroke();

  // Floor Level: Packed Audience Tiers & Field
  ctx.fillStyle = '#0a0512';
  ctx.fillRect(0, floorY, w, h - floorY);

  // Sea of Crowd Silhouettes waving hands with Pulsing Glowing Wristbands (Photo prompt)
  const colors = ['#06b6d4', '#ec4899', '#fbbf24', '#a855f7', '#10b981'];
  for (let cx = 15; cx < w; cx += 22) {
    for (let cy = floorY + 10; cy < h; cy += 22) {
      // Crowd head
      ctx.fillStyle = '#05020a';
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();
      // Raised arm
      ctx.fillRect(cx - 3, cy - 8, 3, 7);

      // Synchronized glowing LED wristband (pulsing colors with tick)
      const colorIdx = Math.floor((cx * 7 + cy * 11 + tick * 2) / 30) % colors.length;
      ctx.fillStyle = colors[colorIdx];
      ctx.shadowColor = colors[colorIdx];
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(cx - 2, cy - 9, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}

// -------------------------------------------------------------
// 19. MARINA BAY STREET CIRCUIT (F1 Night Race Scene)
// Floodlights, Turn 1 grandstand, red/white kerbs, speeding F1 race cars, paddock & Ferris wheel.
// -------------------------------------------------------------
function drawF1Circuit(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Midnight Singapore sky with glowing ambient haze
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#050a14');
  skyGrad.addColorStop(0.7, '#0c1b33');
  skyGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Distant Singapore Flyer (Illuminated Observation Wheel)
  const flyerX = 660;
  const flyerY = 90;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(flyerX, flyerY, 50, 0, Math.PI * 2);
  ctx.stroke();
  // Spokes
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    ctx.beginPath();
    ctx.moveTo(flyerX, flyerY);
    ctx.lineTo(flyerX + Math.cos(a + tick * 0.01) * 50, flyerY + Math.sin(a + tick * 0.01) * 50);
    ctx.stroke();
  }

  // Marina Bay Paddock Building & Skyline in background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(320, 110, 260, 100);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(330, 120, 240, 20); // Top hospitality terrace
  // Glowing hospitality windows
  ctx.fillStyle = '#fef08a';
  for (let px = 340; px < 560; px += 25) {
    ctx.fillRect(px, 150, 16, 12);
    ctx.fillRect(px, 175, 16, 12);
  }

  // F1 Towering Floodlight Pylons (Singapore Night Race iconic lighting)
  for (let fx = 120; fx < w; fx += 260) {
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(fx, floorY);
    ctx.lineTo(fx, 40);
    ctx.stroke();

    // Floodlight lamp array head
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(fx - 24, 32, 48, 12);

    // Light beam down to track
    ctx.save();
    ctx.globalAlpha = 0.18;
    const beamGrad = ctx.createLinearGradient(fx, 44, fx, floorY);
    beamGrad.addColorStop(0, '#ffffff');
    beamGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(fx - 20, 44);
    ctx.lineTo(fx + 20, 44);
    ctx.lineTo(fx + 100, floorY);
    ctx.lineTo(fx - 100, floorY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Safety Catch Fence with black & yellow barrier blocks
  ctx.fillStyle = '#facc15';
  ctx.fillRect(0, floorY - 30, w, 30);
  // Black hazard stripes on barrier
  ctx.fillStyle = '#000000';
  for (let bx = 0; bx < w; bx += 30) {
    ctx.beginPath();
    ctx.moveTo(bx, floorY);
    ctx.lineTo(bx + 15, floorY);
    ctx.lineTo(bx + 30, floorY - 30);
    ctx.lineTo(bx + 15, floorY - 30);
    ctx.closePath();
    ctx.fill();
  }
  // Wire mesh catch fence
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  for (let fy = floorY - 60; fy < floorY - 30; fy += 8) {
    ctx.beginPath();
    ctx.moveTo(0, fy);
    ctx.lineTo(w, fy);
    ctx.stroke();
  }

  // Asphalt Track Tarmac
  const trackGrad = ctx.createLinearGradient(0, floorY, 0, h);
  trackGrad.addColorStop(0, '#1e293b');
  trackGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = trackGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Alternating Red & White Rumble Strip Kerbs (Turn 1)
  const kerbW = 28;
  for (let kx = 0; kx < w; kx += kerbW) {
    ctx.fillStyle = (Math.floor(kx / kerbW) % 2 === 0) ? '#dc2626' : '#f8fafc';
    ctx.fillRect(kx, floorY, kerbW, 14);
  }

  // White painted track boundary edge
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, floorY + 14, w, 3);
  ctx.fillRect(0, floorY + 70, w, 3);

  // SPEEDING PIXEL F1 RACE CARS (Speeding past with motion blur & tire rain lights)
  const carProgress = (tick * 12) % (w + 200);
  const carX = w - carProgress;
  const carY = floorY + 36;

  if (carX > -100 && carX < w + 80) {
    // Red Team F1 Car (Singapore GP Speeding)
    ctx.fillStyle = '#ef4444'; // Red chassis
    ctx.fillRect(carX, carY + 4, 70, 12);
    // Front wing
    ctx.fillStyle = '#000000';
    ctx.fillRect(carX - 12, carY + 8, 14, 6);
    // Rear wing
    ctx.fillStyle = '#000000';
    ctx.fillRect(carX + 66, carY - 4, 12, 16);
    // Cockpit & halo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(carX + 28, carY, 14, 6);
    // Wheels
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(carX + 4, carY + 12, 16, 8);
    ctx.fillRect(carX + 48, carY + 12, 16, 8);
    // Glowing red rear rain light (Blinking)
    ctx.fillStyle = (tick % 4 < 2) ? '#ff0000' : '#880000';
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 10;
    ctx.fillRect(carX + 76, carY + 2, 4, 4);
    ctx.shadowBlur = 0;

    // Speed motion streaks behind car
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(carX + 80, carY + 8);
    ctx.lineTo(carX + 150, carY + 8);
    ctx.stroke();
  }
}

// -------------------------------------------------------------
// 20. PHOTO 2 REFERENCE: Singapore Zoo & Rainforest
// Vertical dark timber louvres, white "Singapore" script & green "Zoo" signage,
// life-sized bright red rhinoceros sculpture, gantry turnstiles, rainforest canopy with swinging orangutans.
// -------------------------------------------------------------
function drawSingaporeZoo(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Lush tropical rainforest sky and canopy
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.35, '#059669');
  skyGrad.addColorStop(0.7, '#064e3b');
  skyGrad.addColorStop(1, '#022c22');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Distant Mandai Reservoir & Morning Mist Lake Horizon
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(60, 45, 260, 25);
  // Lake water ripples & reflections
  ctx.fillStyle = '#38bdf8';
  for (let rw = 70; rw < 310; rw += 25) {
    const rWave = Math.sin(tick * 0.08 + rw) * 3;
    ctx.fillRect(rw + rWave, 52, 14, 2);
  }
  // Soft rising mist over the reservoir
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  for (let m = 0; m < 3; m++) {
    const mistY = 48 + Math.sin(tick * 0.04 + m) * 4;
    ctx.beginPath();
    ctx.ellipse(120 + m * 60, mistY, 35, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Giant Mandai Rainforest Trees in background
  drawRainTrees(ctx, 30, 85);
  drawRainTrees(ctx, 220, 75);
  drawRainTrees(ctx, 580, 80);

  // Native Wildlife: Flying Great Pied Hornbill soaring across high canopy
  const birdProgress = (tick * 2.2) % (w + 240);
  const birdX = w + 120 - birdProgress;
  const birdY = 28 + Math.sin(tick * 0.08) * 8;
  const wingFlap = Math.sin(tick * 0.25) * 8;
  if (birdX > -60 && birdX < w + 60) {
    // Black & White Body
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(birdX, birdY, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Yellow & Orange Casque Beak
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(birdX - 12, birdY - 2);
    ctx.lineTo(birdX - 22, birdY + 1);
    ctx.lineTo(birdX - 12, birdY + 4);
    ctx.closePath();
    ctx.fill();
    // Wings flapping
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(birdX - 4, birdY);
    ctx.lineTo(birdX + 4, birdY - 14 + wingFlap);
    ctx.lineTo(birdX + 12, birdY);
    ctx.closePath();
    ctx.fill();
  }

  // Dangling liana vines and climbing ropes for orangutans (Photo 2)
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(80, 40);
  ctx.quadraticCurveTo(200, 130, 340, 60);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(320, 60);
  ctx.quadraticCurveTo(460, 140, 620, 50);
  ctx.stroke();

  // Timber Canopy Platform for Free-Ranging Orangutans
  ctx.fillStyle = '#543d2b';
  ctx.fillRect(230, 62, 70, 8);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(235, 70, 6, 25);
  ctx.fillRect(290, 70, 6, 25);

  // Playful Baby Orangutan sitting on platform eating banana
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.arc(248, 55, 6, 0, Math.PI * 2); // Body
  ctx.arc(248, 48, 4, 0, Math.PI * 2); // Head
  ctx.fill();
  // Yellow Banana
  ctx.fillStyle = '#facc15';
  ctx.fillRect(244, 52, 4, 2);

  // Mature Mother Orangutan swinging on vine with fluid pendulum arm
  const swingX = 290 + Math.sin(tick * 0.05) * 26;
  const swingY = 95 + Math.abs(Math.cos(tick * 0.05)) * 12;
  ctx.fillStyle = '#c2410c'; // Russet orange fur
  ctx.beginPath();
  ctx.arc(swingX, swingY, 13, 0, Math.PI * 2); // Body
  ctx.fill();
  ctx.arc(swingX - 8, swingY - 7, 8, 0, Math.PI * 2); // Head
  ctx.fill();
  // Swinging arms
  ctx.strokeStyle = '#c2410c';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(swingX - 4, swingY - 6);
  ctx.lineTo(swingX - 12, swingY - 28);
  ctx.moveTo(swingX + 4, swingY - 4);
  ctx.lineTo(swingX + 10, swingY + 12);
  ctx.stroke();

  // --- SINGAPORE ZOO ENTRANCE PAVILION ARCHITECTURE (Photo 2) ---
  const pavX = 35;
  const pavY = 90;
  const pavW = 730;

  // Dark timber roof canopy beam (Photo 2)
  ctx.fillStyle = '#29180c';
  ctx.fillRect(pavX, pavY, pavW, 20);

  // Vertical timber louvres/slats facade (Exact replication of Photo 2)
  for (let sx = pavX + 10; sx < pavX + pavW - 10; sx += 8) {
    ctx.fillStyle = (sx % 16 === 0) ? '#45220c' : '#5c3114';
    ctx.fillRect(sx, pavY + 20, 5, 80);
  }

  // Translucent covered walkway underneath timber slats (Photo 2)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.fillRect(pavX + 30, pavY + 100, pavW - 60, 8);

  // Entrance Gantry Turnstiles (Photo 2)
  ctx.fillStyle = '#64748b';
  for (let tx = pavX + 160; tx < pavX + 560; tx += 65) {
    ctx.fillRect(tx, pavY + 105, 18, 45);
    ctx.fillStyle = '#10b981'; // Green tick light
    ctx.fillRect(tx + 5, pavY + 115, 8, 4);
    ctx.fillStyle = '#64748b';
  }

  // --- ICONIC SIGNAGE (Photo 2): "Singapore" script & green "Zoo" ---
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(pavX + 180, pavY - 24, 360, 26);
  ctx.strokeStyle = '#45220c';
  ctx.lineWidth = 2;
  ctx.strokeRect(pavX + 180, pavY - 24, 360, 26);

  // White flowing script "Singapore" (Photo 2)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 16px serif';
  ctx.fillText('Singapore', pavX + 220, pavY - 6);

  // Stylized bright green bold "Zoo" (Photo 2)
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('Zoo', pavX + 360, pavY - 5);

  // --- THE FAMOUS BRIGHT RED RHINOCEROS STATUE (Exact Photo 2 Feature) ---
  const rhinoX = 110;
  const rhinoY = floorY - 50;

  // Stone plinth / landscaped planter box base with brass plaque
  ctx.fillStyle = '#475569';
  ctx.fillRect(rhinoX - 25, rhinoY + 30, 85, 20);
  // Brass plaque
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(rhinoX - 10, rhinoY + 36, 55, 8);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 4px monospace';
  ctx.fillText('MANDAI WILDLIFE', rhinoX - 6, rhinoY + 42);

  // Lush tropical ferns and blooming orchids around rhino plinth
  ctx.fillStyle = '#15803d';
  for (let fx = rhinoX - 35; fx <= rhinoX + 65; fx += 16) {
    ctx.beginPath();
    ctx.ellipse(fx, rhinoY + 32, 10, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  // Purple Singapore Orchids
  for (let ox = rhinoX - 28; ox <= rhinoX + 55; ox += 24) {
    ctx.fillStyle = '#d946ef';
    ctx.beginPath();
    ctx.arc(ox, rhinoY + 24, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sculpted Bright Red Rhinoceros (Photo 2)
  ctx.fillStyle = '#dc2626'; // Vivid red body
  ctx.beginPath();
  ctx.ellipse(rhinoX + 15, rhinoY + 12, 28, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  // Head & snout
  ctx.beginPath();
  ctx.moveTo(rhinoX - 10, rhinoY + 8);
  ctx.lineTo(rhinoX - 26, rhinoY + 2);
  ctx.lineTo(rhinoX - 22, rhinoY + 22);
  ctx.closePath();
  ctx.fill();
  // Sturdy legs
  ctx.fillRect(rhinoX - 4, rhinoY + 22, 9, 14);
  ctx.fillRect(rhinoX + 22, rhinoY + 22, 9, 14);
  // Iconic curved Rhino Horn (Photo 2)
  ctx.beginPath();
  ctx.moveTo(rhinoX - 25, rhinoY + 2);
  ctx.quadraticCurveTo(rhinoX - 32, rhinoY - 10, rhinoX - 20, rhinoY - 6);
  ctx.closePath();
  ctx.fill();

  // --- MANDAI SAFARI TRAM (Right Side) ---
  const tramX = 615;
  const tramY = floorY - 68;
  // Open-air safari tram body
  ctx.fillStyle = '#15803d';
  ctx.fillRect(tramX, tramY + 18, 115, 32);
  // Yellow striped canopy roof
  ctx.fillStyle = '#facc15';
  ctx.fillRect(tramX - 4, tramY, 122, 8);
  for (let ts = tramX; ts < tramX + 115; ts += 14) {
    ctx.fillStyle = '#b45309';
    ctx.fillRect(ts, tramY, 7, 8);
  }
  // Thin roof support poles
  ctx.fillStyle = '#475569';
  ctx.fillRect(tramX + 4, tramY + 8, 4, 12);
  ctx.fillRect(tramX + 55, tramY + 8, 4, 12);
  ctx.fillRect(tramX + 106, tramY + 8, 4, 12);
  // Headlights (glowing yellow)
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(tramX + 6, tramY + 34, 4, 0, Math.PI * 2);
  ctx.fill();
  // Wheels
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(tramX + 26, tramY + 50, 9, 0, Math.PI * 2);
  ctx.arc(tramX + 88, tramY + 50, 9, 0, Math.PI * 2);
  ctx.fill();

  // --- RUSTIC CARVED WOODEN SIGNPOST ---
  const postX = 230;
  const postY = floorY - 80;
  ctx.fillStyle = '#78350f';
  ctx.fillRect(postX, postY, 8, 80);
  // Arrow signs
  ctx.fillStyle = '#b45309';
  ctx.fillRect(postX - 52, postY + 8, 50, 12);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 4.5px monospace';
  ctx.fillText('◀ FRAGILE FOREST', postX - 50, postY + 16);

  ctx.fillStyle = '#d97706';
  ctx.fillRect(postX + 8, postY + 24, 52, 12);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('WILD AFRICA ▶', postX + 11, postY + 32);

  // --- ANIMATED NPC 1: MANDAI RANGER / ZOOKEEPER ---
  const rangerX = 320;
  const rangerY = floorY - 56;
  const rangerWave = Math.sin(tick * 0.12) * 5;
  // Khaki Safari Shorts & Shirt
  ctx.fillStyle = '#ca8a04';
  ctx.fillRect(rangerX - 8, rangerY + 12, 16, 24);
  // Khaki shorts & brown boots
  ctx.fillStyle = '#a16207';
  ctx.fillRect(rangerX - 7, rangerY + 34, 6, 12);
  ctx.fillRect(rangerX + 1, rangerY + 34, 6, 12);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(rangerX - 8, rangerY + 44, 7, 6);
  ctx.fillRect(rangerX + 1, rangerY + 44, 7, 6);
  // Head & Wide-brim Safari Hat
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(rangerX, rangerY + 2, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#854d0e';
  ctx.fillRect(rangerX - 13, rangerY - 6, 26, 4); // Hat brim
  ctx.fillRect(rangerX - 7, rangerY - 11, 14, 6); // Hat crown
  // Animated waving arm holding walkie-talkie
  ctx.strokeStyle = '#fed7aa';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rangerX + 8, rangerY + 16);
  ctx.lineTo(rangerX + 16, rangerY + 4 + rangerWave);
  ctx.stroke();
  // Food bucket in other hand
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(rangerX - 16, rangerY + 24, 7, 8);

  // --- ANIMATED NPC 2: EXCITED VISITING CHILD POINTING AT ORANGUTANS ---
  const childX = 420;
  const childJump = Math.abs(Math.sin(tick * 0.14)) * 6;
  const childY = floorY - 44 - childJump;
  // Colorful outfit
  ctx.fillStyle = '#ef4444'; // Red t-shirt
  ctx.fillRect(childX - 6, childY + 8, 12, 16);
  ctx.fillStyle = '#2563eb'; // Blue denim shorts
  ctx.fillRect(childX - 5, childY + 22, 10, 10);
  // Head & cap
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(childX, childY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(childX - 6, childY - 6, 12, 4);
  // Pointing arm raised high toward canopy
  ctx.strokeStyle = '#fed7aa';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(childX - 4, childY + 10);
  ctx.lineTo(childX - 14, childY - 8);
  ctx.stroke();

  // Natural Timber Boardwalk Flooring (Mandai park entrance)
  const woodFloor = ctx.createLinearGradient(0, floorY, 0, h);
  woodFloor.addColorStop(0, '#543d2b');
  woodFloor.addColorStop(1, '#3b2514');
  ctx.fillStyle = woodFloor;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Timber decking planks
  ctx.strokeStyle = '#2c190d';
  ctx.lineWidth = 1.5;
  for (let py = floorY + 12; py < h; py += 16) {
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(w, py);
    ctx.stroke();
  }
}

// -------------------------------------------------------------
// 21. S.E.A. AQUARIUM (Resorts World Sentosa)
// Deep blue ambient oceanarium, massive acrylic panel, manta rays, sharks, coral reefs.
// -------------------------------------------------------------
function drawSEAAquarium(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Deep oceanic blue ambient lighting
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  oceanGrad.addColorStop(0, '#020617');
  oceanGrad.addColorStop(0.25, '#082f49');
  oceanGrad.addColorStop(0.65, '#0369a1');
  oceanGrad.addColorStop(1, '#0284c7');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Shimmering underwater god-rays / caustics
  ctx.save();
  ctx.globalAlpha = 0.16;
  for (let r = 50; r < w; r += 95) {
    const rayWave = Math.sin(tick * 0.03 + r) * 28;
    ctx.fillStyle = '#bae6fd';
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(r + 35, 0);
    ctx.lineTo(r + rayWave + 90, floorY);
    ctx.lineTo(r + rayWave - 20, floorY);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Massive Acrylic Habitat Architrave (Open Ocean Viewing Panel)
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 14;
  ctx.strokeRect(25, 18, w - 50, floorY - 18);

  // Digital Oceanarium Telemetry Display on glass banner
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.fillRect(35, 24, w - 70, 16);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 5px monospace';
  ctx.fillText('S.E.A. AQUARIUM • HABITAT TELEMETRY: 24.8°C | SALINITY 34.5 PSU | DEPTH 12.0M', 45, 35);

  // Towering Living Coral Reef Formations on left and right flanks
  ctx.fillStyle = '#047857'; // Sea anemone green
  ctx.beginPath();
  ctx.ellipse(80, floorY - 30, 48, 68, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#be185d'; // Pink table coral
  ctx.beginPath();
  ctx.ellipse(w - 80, floorY - 35, 52, 72, 0, 0, Math.PI * 2);
  ctx.fill();
  // Purple fan corals
  ctx.fillStyle = '#7c3aed';
  ctx.beginPath();
  ctx.arc(115, floorY - 55, 18, 0, Math.PI * 2);
  ctx.arc(w - 115, floorY - 60, 20, 0, Math.PI * 2);
  ctx.fill();

  // Striped Orange Clownfish hovering near left coral
  const clownX = 95 + Math.sin(tick * 0.08) * 8;
  const clownY = floorY - 45 + Math.cos(tick * 0.08) * 4;
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.ellipse(clownX, clownY, 9, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(clownX - 2, clownY - 4, 3, 8); // White stripe

  // MAJESTIC GIANT OCEANIC MANTA RAY (Gliding overhead with animated wings)
  const mantaProgress = (tick * 1.8) % (w + 320);
  const mantaX = w + 120 - mantaProgress;
  const mantaY = 85 + Math.sin(tick * 0.04) * 16;
  const wingFlex = Math.sin(tick * 0.09) * 14;

  ctx.fillStyle = '#0f172a'; // Dark dorsal surface
  ctx.beginPath();
  ctx.moveTo(mantaX, mantaY); // Snout
  ctx.quadraticCurveTo(mantaX + 45, mantaY - 38 + wingFlex, mantaX + 75, mantaY - 10); // Left wing
  ctx.lineTo(mantaX + 115, mantaY + 8); // Tail base
  ctx.lineTo(mantaX + 75, mantaY + 28 - wingFlex); // Right wing
  ctx.closePath();
  ctx.fill();
  // Whip-like tail
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(mantaX + 115, mantaY + 8);
  ctx.lineTo(mantaX + 195, mantaY + 12);
  ctx.stroke();

  // GREEN SEA TURTLE (Paddling gracefully across the tank)
  const turtleProgress = (tick * 1.2) % (w + 220);
  const turtleX = -60 + turtleProgress;
  const turtleY = 135 + Math.sin(tick * 0.05) * 10;
  const flipperWave = Math.sin(tick * 0.15) * 8;
  if (turtleX > -50 && turtleX < w + 50) {
    // Olive Green Shell Carapace
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.ellipse(turtleX, turtleY, 20, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.ellipse(turtleX, turtleY, 15, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    // Head & Beak
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.arc(turtleX + 22, turtleY - 2, 6, 0, Math.PI * 2);
    ctx.fill();
    // Front paddling flippers
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(turtleX + 10, turtleY - 6);
    ctx.lineTo(turtleX + 18, turtleY - 18 + flipperWave);
    ctx.moveTo(turtleX + 10, turtleY + 6);
    ctx.lineTo(turtleX + 18, turtleY + 18 - flipperWave);
    ctx.stroke();
    // Rear flippers
    ctx.beginPath();
    ctx.moveTo(turtleX - 14, turtleY - 4);
    ctx.lineTo(turtleX - 22, turtleY - 10);
    ctx.moveTo(turtleX - 14, turtleY + 4);
    ctx.lineTo(turtleX - 22, turtleY + 10);
    ctx.stroke();
  }

  // Hammerhead Shark cruising across lower water
  const sharkX = (tick * 2.8) % (w + 200) - 100;
  const sharkY = 175;
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.ellipse(sharkX, sharkY, 32, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(sharkX + 26, sharkY - 8, 8, 16);
  ctx.beginPath();
  ctx.moveTo(sharkX - 6, sharkY - 10);
  ctx.lineTo(sharkX, sharkY - 24);
  ctx.lineTo(sharkX + 8, sharkY - 10);
  ctx.closePath();
  ctx.fill();

  // Synchronized School of Silvery Trevallies darting together
  ctx.fillStyle = '#e2e8f0';
  for (let f = 0; f < 16; f++) {
    const sX = (w - ((tick * 2.4 + f * 18) % (w + 120)));
    const sY = 60 + Math.sin(tick * 0.08 + f * 0.4) * 14 + (f % 4) * 8;
    ctx.fillRect(sX, sY, 8, 3);
  }

  // Bioluminescent Jellyfish Floating in side exhibits
  for (let jx = 180; jx <= 600; jx += 140) {
    const jy = 135 + Math.sin(tick * 0.06 + jx) * 20;
    ctx.fillStyle = 'rgba(236, 72, 153, 0.78)';
    ctx.beginPath();
    ctx.arc(jx, jy, 12, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = 'rgba(244, 114, 182, 0.55)';
    ctx.lineWidth = 1;
    for (let t = -8; t <= 8; t += 4) {
      ctx.beginPath();
      ctx.moveTo(jx + t, jy);
      ctx.lineTo(jx + t + Math.sin(tick * 0.1 + t) * 4, jy + 22);
      ctx.stroke();
    }
  }

  // ANIMATED NPC 1: SCUBA DIVER / MARINE RESEARCHER IN HABITAT
  const diverX = 260 + Math.sin(tick * 0.04) * 25;
  const diverY = 115 + Math.cos(tick * 0.04) * 12;
  const finKick = Math.sin(tick * 0.2) * 5;
  // Black wetsuit body
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(diverX - 10, diverY - 5, 20, 10);
  // Head & dive mask
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(diverX + 12, diverY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38bdf8'; // Mask glass
  ctx.fillRect(diverX + 13, diverY - 2, 4, 4);
  // Yellow Scuba Oxygen Tank on back
  ctx.fillStyle = '#eab308';
  ctx.fillRect(diverX - 8, diverY - 9, 14, 5);
  // Swim fins kicking
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(diverX - 16, diverY - 4 + finKick, 8, 4);
  ctx.fillRect(diverX - 16, diverY + 2 - finKick, 8, 4);
  // Rising stream of animated air bubbles from diver
  for (let b = 0; b < 5; b++) {
    const bubbleY = diverY - 8 - ((tick * 1.8 + b * 16) % 90);
    const bubbleX = diverX + 12 + Math.sin(tick * 0.1 + b) * 4;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.beginPath();
    ctx.arc(bubbleX, bubbleY, 2 + (b % 2), 0, Math.PI * 2);
    ctx.fill();
  }

  // ANIMATED NPC 2: OCEANARIUM VISITOR ADMIRING HABITAT
  const visitorX = 490;
  const visitorY = floorY - 48;
  // Standing silhouette looking up at aquarium
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(visitorX - 8, visitorY + 10, 16, 28);
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(visitorX, visitorY + 2, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#334155';
  ctx.fillRect(visitorX - 7, visitorY - 5, 14, 5);
  // Arms on the railing
  ctx.strokeStyle = '#fed7aa';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(visitorX - 6, visitorY + 14);
  ctx.lineTo(visitorX - 14, visitorY + 22);
  ctx.stroke();

  // Stainless Steel Safety Guardrail along the viewing glass
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(30, floorY - 26);
  ctx.lineTo(w - 30, floorY - 26);
  ctx.stroke();
  for (let rx = 50; rx < w - 30; rx += 70) {
    ctx.beginPath();
    ctx.moveTo(rx, floorY - 26);
    ctx.lineTo(rx, floorY);
    ctx.stroke();
  }

  // Dark Polished Oceanarium Viewing Floor with blue reflection
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#0a0f1d');
  floorGrad.addColorStop(1, '#020617');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Soft glowing blue floor LED strip along viewing glass
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(30, floorY);
  ctx.lineTo(w - 30, floorY);
  ctx.stroke();
}

// -------------------------------------------------------------
// 22. UNIVERSAL STUDIOS SINGAPORE (USS Sentosa)
// Rotating Universal globe, Hollywood storefronts, dueling Battlestar Galactica coasters.
// -------------------------------------------------------------
function drawUniversalStudios(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Sunny tropical Sentosa sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.65, '#38bdf8');
  skyGrad.addColorStop(1, '#fed7aa');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Distant Fairytale Castle (Far Far Away - Shrek's Kingdom) on Left Horizon
  const castleX = 35;
  const castleY = floorY - 170;
  // Sandstone castle towers
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(castleX, castleY + 30, 24, 70);
  ctx.fillRect(castleX + 36, castleY + 10, 32, 90);
  ctx.fillRect(castleX + 78, castleY + 40, 22, 60);
  // Conical fairytale roofs in teal/forest green
  ctx.fillStyle = '#0f766e';
  // Tower 1 roof
  ctx.beginPath();
  ctx.moveTo(castleX - 2, castleY + 30);
  ctx.lineTo(castleX + 12, castleY + 2);
  ctx.lineTo(castleX + 26, castleY + 30);
  ctx.closePath();
  ctx.fill();
  // Central high keep roof
  ctx.beginPath();
  ctx.moveTo(castleX + 32, castleY + 10);
  ctx.lineTo(castleX + 52, castleY - 26);
  ctx.lineTo(castleX + 72, castleY + 10);
  ctx.closePath();
  ctx.fill();
  // Tower 3 roof
  ctx.beginPath();
  ctx.moveTo(castleX + 76, castleY + 40);
  ctx.lineTo(castleX + 89, castleY + 16);
  ctx.lineTo(castleX + 102, castleY + 40);
  ctx.closePath();
  ctx.fill();
  // Gold pennant flags fluttering
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(castleX + 52, castleY - 30, 10, 5);

  // Distant Ancient Egypt Obelisk & Pharaoh Colossus silhouette on Right
  const egyptX = 705;
  ctx.fillStyle = '#64748b';
  // Obelisk spire
  ctx.beginPath();
  ctx.moveTo(egyptX, floorY - 30);
  ctx.lineTo(egyptX + 4, floorY - 120);
  ctx.lineTo(egyptX + 8, floorY - 130);
  ctx.lineTo(egyptX + 12, floorY - 120);
  ctx.lineTo(egyptX + 16, floorY - 30);
  ctx.closePath();
  ctx.fill();

  // BATTLESTAR GALACTICA DUELING ROLLER COASTER TRACKS (Sci-Fi City Sky)
  // Steel lattice support pylons
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  [380, 460, 550, 640].forEach(px => {
    ctx.beginPath();
    ctx.moveTo(px, floorY - 20);
    ctx.lineTo(px, 30);
    ctx.stroke();
  });

  // Red Track (Human - Seated Coaster)
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(320, floorY - 30);
  ctx.quadraticCurveTo(430, 15, 510, floorY - 70);
  ctx.quadraticCurveTo(570, floorY - 150, 680, 35);
  ctx.stroke();

  // Blue Track (Cylon - Inverted Coaster)
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(300, floorY - 40);
  ctx.quadraticCurveTo(410, 55, 490, floorY - 50);
  ctx.quadraticCurveTo(590, floorY - 120, 720, 55);
  ctx.stroke();

  // SPEEDING ROLLER COASTER TRAIN WITH THRILL-SEEKING PASSENGERS
  const coasterProgress = (tick * 4) % 360;
  const tNorm = coasterProgress / 360;
  // Train coordinate following the red coaster arc
  const cTrainX = 340 + tNorm * 330;
  const cTrainY = 80 + Math.sin(tNorm * Math.PI * 2.5) * 45;
  if (cTrainX > 330 && cTrainX < 670) {
    // 3 Linked Coaster Cars
    for (let car = 0; car < 3; car++) {
      const cx = cTrainX - car * 12;
      const cy = cTrainY + (car * 2);
      ctx.fillStyle = '#ef4444'; // Red car body
      ctx.fillRect(cx, cy, 10, 7);
      // Passenger head
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(cx + 5, cy - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      // Passenger arms up in the air screaming with joy!
      ctx.strokeStyle = '#fed7aa';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + 2, cy - 2);
      ctx.lineTo(cx, cy - 8);
      ctx.moveTo(cx + 8, cy - 2);
      ctx.lineTo(cx + 10, cy - 8);
      ctx.stroke();
    }
  }

  // Criss-Crossing Overhead Festive Theme Park Pennant Buntings
  const bannerColors = ['#f43f5e', '#38bdf8', '#fbbf24', '#10b981', '#a855f7'];
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 30);
  ctx.quadraticCurveTo(w / 2, 70, w, 25);
  ctx.stroke();
  for (let f = 30; f < w - 30; f += 26) {
    const fy = 30 + Math.sin((f / w) * Math.PI) * 40;
    ctx.fillStyle = bannerColors[(f / 26) % bannerColors.length];
    ctx.beginPath();
    ctx.moveTo(f, fy);
    ctx.lineTo(f + 14, fy);
    ctx.lineTo(f + 7, fy + 12);
    ctx.closePath();
    ctx.fill();
  }

  // Floating Confetti Sparkles in the air
  for (let c = 0; c < 20; c++) {
    const cx = (c * 42 + tick * 1.6) % w;
    const cy = (c * 24 + tick * 0.9) % (floorY - 50);
    ctx.fillStyle = bannerColors[c % bannerColors.length];
    ctx.fillRect(cx, cy, 3, 3);
  }

  // Hollywood / New York Themed Retro Art Deco Storefronts
  ctx.fillStyle = '#fed7aa'; // Pastel peach facade
  ctx.fillRect(360, 110, 160, 110);
  ctx.fillStyle = '#fbcfe8'; // Pink boutique facade
  ctx.fillRect(540, 95, 175, 125);

  // Striped Canvas Awnings
  for (let ax = 370; ax < 510; ax += 18) {
    ctx.fillStyle = (ax % 36 === 0) ? '#dc2626' : '#ffffff';
    ctx.fillRect(ax, 165, 18, 14);
  }
  for (let ax = 550; ax < 705; ax += 18) {
    ctx.fillStyle = (ax % 36 === 0) ? '#0284c7' : '#ffffff';
    ctx.fillRect(ax, 155, 18, 14);
  }

  // Mel's Drive-In Vintage Diner Chrome Canopy & Neon
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(365, 182, 145, 38);
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 8px "Press Start 2P", monospace';
  ctx.fillText("MEL'S DINER", 374, 204);

  // Classic 1950s Turquoise Convertible Coupe parked in front of Mel's
  const carX = 410;
  const carY = floorY - 32;
  // Turquoise Car Body
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(carX, carY + 6, 68, 14);
  ctx.fillRect(carX + 14, carY, 38, 7); // Cabin/Windshield
  // Windshield glass
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(carX + 16, carY + 1, 34, 5);
  // Chrome Bumpers
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(carX - 3, carY + 12, 5, 6);
  ctx.fillRect(carX + 66, carY + 12, 5, 6);
  // Whitewall wheels
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(carX + 14, carY + 20, 7, 0, Math.PI * 2);
  ctx.arc(carX + 54, carY + 20, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(carX + 14, carY + 20, 4, 0, Math.PI * 2);
  ctx.arc(carX + 54, carY + 20, 4, 0, Math.PI * 2);
  ctx.fill();

  // Tropical Palm Trees lining the promenade
  [330, 725].forEach(tx => {
    // Curved trunk
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(tx, floorY);
    ctx.quadraticCurveTo(tx - 12, floorY - 70, tx - 6, floorY - 130);
    ctx.stroke();
    // Lush green palm fronds
    ctx.fillStyle = '#15803d';
    for (let p = 0; p < 6; p++) {
      const pAngle = (p * Math.PI) / 3;
      const fx = tx - 6 + Math.cos(pAngle) * 24;
      const fy = floorY - 130 + Math.sin(pAngle) * 16;
      ctx.beginPath();
      ctx.ellipse(fx, fy, 14, 5, pAngle, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // --- ICONIC ROTATING UNIVERSAL STUDIOS GLOBE MONUMENT ---
  const globeX = 180;
  const globeY = floorY - 65;
  const globeR = 48;

  // Fountain spray & churning water pool base
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(globeX, globeY + globeR + 10, globeR + 26, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Vertical water fountain jets shooting up around basin
  for (let j = 0; j < 6; j++) {
    const jAngle = (j * Math.PI) / 3;
    const jx = globeX + Math.cos(jAngle) * (globeR + 16);
    const jy = globeY + globeR + 8 + Math.sin(jAngle) * 6;
    const jetHeight = 12 + Math.sin(tick * 0.15 + j) * 6;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(jx - 1, jy - jetHeight, 3, jetHeight);
  }

  // Metallic Blue Globe Sphere with 3D radial shading
  const globeGrad = ctx.createRadialGradient(
    globeX - 12, globeY - 12, 8,
    globeX, globeY, globeR
  );
  globeGrad.addColorStop(0, '#93c5fd');
  globeGrad.addColorStop(0.3, '#2563eb');
  globeGrad.addColorStop(0.8, '#1e3a8a');
  globeGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = globeGrad;
  ctx.beginPath();
  ctx.arc(globeX, globeY, globeR, 0, Math.PI * 2);
  ctx.fill();

  // Specular reflection highlight on globe
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.beginPath();
  ctx.ellipse(globeX - 16, globeY - 16, 14, 8, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();

  // Rotating Gold Continents
  const rotOffset = (tick * 0.8) % 96;
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.ellipse(globeX - 25 + rotOffset * 0.5, globeY - 8, 16, 22, 0, 0, Math.PI * 2);
  ctx.ellipse(globeX + 15 - rotOffset * 0.4, globeY + 12, 18, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Golden Equatorial Ring with "UNIVERSAL"
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(globeX, globeY, globeR + 16, 12, -Math.PI / 12, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px "Press Start 2P", monospace';
  ctx.fillText('UNIVERSAL', globeX - 35, globeY + 3);

  // Popcorn & Churros Cart with striped awning
  const cartX = 270;
  const cartY = floorY - 48;
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cartX, cartY + 14, 34, 22);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cartX + 4, cartY + 4, 26, 10);
  ctx.fillStyle = '#f59e0b'; // Popcorn inside
  ctx.fillRect(cartX + 6, cartY + 6, 22, 6);
  // Red & white striped umbrella canopy
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(cartX + 17, cartY + 4, 18, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#0f172a'; // Wheel
  ctx.beginPath();
  ctx.arc(cartX + 17, cartY + 36, 7, 0, Math.PI * 2);
  ctx.fill();

  // ANIMATED NPC 1: USS THEME PARK MASCOT WITH BOBBING BALLOONS
  const mascotX = 540;
  const mascotY = floorY - 52;
  const mascotWave = Math.sin(tick * 0.12) * 6;
  // Mascot costume body (Bright yellow character)
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(mascotX, mascotY + 16, 12, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  // Mascot big head & cute ears
  ctx.beginPath();
  ctx.arc(mascotX, mascotY - 2, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(mascotX - 8, mascotY - 11, 4, 0, Math.PI * 2);
  ctx.arc(mascotX + 8, mascotY - 11, 4, 0, Math.PI * 2);
  ctx.fill();
  // Mascot eyes & bow-tie
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(mascotX - 4, mascotY - 3, 2, 3);
  ctx.fillRect(mascotX + 2, mascotY - 3, 2, 3);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(mascotX - 4, mascotY + 6, 8, 4);
  // Animated waving arm holding balloon strings
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(mascotX - 8, mascotY + 12);
  ctx.lineTo(mascotX - 18, mascotY + mascotWave);
  ctx.stroke();

  // Bobbing Colorful Helium Balloons
  const balloonColors = ['#ef4444', '#3b82f6', '#10b981'];
  balloonColors.forEach((bColor, bi) => {
    const bSway = Math.sin(tick * 0.08 + bi) * 5;
    const bx = mascotX - 22 + bi * 8 + bSway;
    const by = mascotY - 28 + (bi % 2) * 6;
    // String
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mascotX - 18, mascotY + mascotWave);
    ctx.lineTo(bx, by + 8);
    ctx.stroke();
    // Balloon
    ctx.fillStyle = bColor;
    ctx.beginPath();
    ctx.ellipse(bx, by, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // ANIMATED NPC 2: VISITOR / TOURIST TAKING SELFIE WITH FLASH
  const touristX = 645;
  const touristY = floorY - 48;
  // Standing body
  ctx.fillStyle = '#7c3aed'; // Purple shirt
  ctx.fillRect(touristX - 6, touristY + 10, 12, 22);
  ctx.fillStyle = '#1e293b'; // Trousers
  ctx.fillRect(touristX - 5, touristY + 32, 10, 14);
  // Head
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(touristX, touristY + 2, 6, 0, Math.PI * 2);
  ctx.fill();
  // Arm holding up smartphone
  ctx.strokeStyle = '#fed7aa';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(touristX - 4, touristY + 12);
  ctx.lineTo(touristX - 12, touristY + 6);
  ctx.stroke();
  // Smartphone
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(touristX - 15, touristY + 2, 4, 8);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(touristX - 14, touristY + 3, 2, 6);

  // Periodic Camera Flash Flare! (Flashes bright white starburst every ~70 ticks)
  if (tick % 70 < 4) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(touristX - 14, touristY + 4, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(touristX - 24, touristY + 4);
    ctx.lineTo(touristX - 4, touristY + 4);
    ctx.moveTo(touristX - 14, touristY - 6);
    ctx.lineTo(touristX - 14, touristY + 14);
    ctx.stroke();
  }

  // Sentosa Theme Park Terracotta Pavers Floor
  const parkFloor = ctx.createLinearGradient(0, floorY, 0, h);
  parkFloor.addColorStop(0, '#ea580c');
  parkFloor.addColorStop(1, '#9a3412');
  ctx.fillStyle = parkFloor;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Hollywood Walk of Fame Inlaid Golden Stars on floor
  ctx.strokeStyle = '#7c2d12';
  ctx.lineWidth = 1;
  for (let px = 0; px < w; px += 24) {
    ctx.beginPath();
    ctx.moveTo(px, floorY);
    ctx.lineTo(px, h);
    ctx.stroke();
  }
  // Inlaid Brass / Golden Stars
  for (let sx = 40; sx < w; sx += 60) {
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    const starY = floorY + 18;
    ctx.arc(sx, starY, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawDefaultRoom(ctx: CanvasRenderingContext2D, w: number, h: number, floorY: number) {
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, w, floorY);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, floorY, w, h - floorY);
}

// -------------------------------------------------------------
// HELPER DRAWING FUNCTIONS
// -------------------------------------------------------------
function drawRainTrees(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#543d2b';
  ctx.fillRect(x + 20, y, 18, 90);
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.ellipse(x + 30, y - 20, 60, 45, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.ellipse(x + 45, y - 15, 45, 30, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawRainTreeBranch(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.ellipse(x + w / 2 + 10, y + h / 2 + 10, w / 2.5, h / 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
}

// -------------------------------------------------------------
// POLYTECHNIC CAMPUS (Singapore Polytechnic Campus - Image 4)
// -------------------------------------------------------------
function drawPolytechnic(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Vibrant tropical Singapore sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.6, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Distant Academic Block Facades (Multi-tier white & light grey)
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(40, 45, 720, 160);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(60, 55, 680, 145);

  // Corridor rows with prominent VIVID YELLOW SAFETY RAILINGS (Image 4)
  for (let lvl = 0; lvl < 3; lvl++) {
    const ly = 75 + lvl * 42;
    // Walkway recess
    ctx.fillStyle = '#334155';
    ctx.fillRect(70, ly, 660, 24);
    // Classroom windows & doors
    for (let wx = 80; wx < 720; wx += 38) {
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(wx, ly + 2, 22, 16);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(wx + 26, ly + 2, 8, 20);
    }
    // Signature bright yellow safety guardrail along edge (Image 4)
    ctx.fillStyle = '#eab308'; // Bright yellow
    ctx.fillRect(70, ly + 20, 660, 4);
    ctx.fillRect(70, ly + 14, 660, 2);
    for (let rx = 70; rx < 730; rx += 14) {
      ctx.fillRect(rx, ly + 14, 2, 10);
    }
  }

  // Modern Glass-and-Steel "AUDITORIUM" Wing on the left (Image 4)
  const auditX = 50;
  const auditY = 70;
  const auditW = 190;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(auditX, auditY, auditW, 130);
  // Glass curtain wall panels
  ctx.fillStyle = 'rgba(56, 189, 248, 0.65)';
  for (let gx = auditX + 8; gx < auditX + auditW - 8; gx += 22) {
    ctx.fillRect(gx, auditY + 30, 18, 90);
  }
  // Cantilevered angular roof
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.moveTo(auditX - 10, auditY);
  ctx.lineTo(auditX + auditW + 20, auditY - 15);
  ctx.lineTo(auditX + auditW + 15, auditY + 12);
  ctx.lineTo(auditX - 10, auditY + 12);
  ctx.closePath();
  ctx.fill();
  // "AUDITORIUM" signage
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px sans-serif';
  ctx.fillText('AUDITORIUM', auditX + 45, auditY + 22);

  // Pedestrian Skybridge connecting wings across campus (Image 4)
  const bridgeY = 115;
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(230, bridgeY, 320, 22);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.strokeRect(230, bridgeY, 320, 22);
  // Glass balustrade
  ctx.fillStyle = 'rgba(14, 165, 233, 0.4)';
  ctx.fillRect(230, bridgeY - 10, 320, 10);
  // Bridge support columns
  ctx.fillStyle = '#64748b';
  ctx.fillRect(320, bridgeY + 22, 12, floorY - (bridgeY + 22));
  ctx.fillRect(480, bridgeY + 22, 12, floorY - (bridgeY + 22));

  // --- SIGNATURE BOLD RED ENTRANCE BANNER (Image 4) ---
  // "SINGAPORE POLYTECHNIC - GRADUATION Our Graduates, Our Pride"
  const bannerX = 140;
  const bannerY = 16;
  const bannerW = 520;
  const bannerH = 34;

  ctx.fillStyle = '#dc2626'; // Vivid SP Red
  ctx.fillRect(bannerX, bannerY, bannerW, bannerH);
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 2;
  ctx.strokeRect(bannerX, bannerY, bannerW, bannerH);

  // Geometric constellation nodes on left and right of banner
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  [bannerX + 25, bannerX + bannerW - 35].forEach(cx => {
    ctx.beginPath();
    ctx.moveTo(cx, bannerY + 10);
    ctx.lineTo(cx + 12, bannerY + 22);
    ctx.lineTo(cx - 10, bannerY + 24);
    ctx.closePath();
    ctx.stroke();
    // Glowing dots
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(cx, bannerY + 10, 2.5, 0, Math.PI * 2);
    ctx.arc(cx + 12, bannerY + 22, 2.5, 0, Math.PI * 2);
    ctx.arc(cx - 10, bannerY + 24, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Banner text (Image 4)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SINGAPORE POLYTECHNIC', bannerX + bannerW / 2, bannerY + 16);
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('OUR GRADUATES, OUR PRIDE • INNOVATION & ENTERPRISE', bannerX + bannerW / 2, bannerY + 28);
  ctx.textAlign = 'left';

  // Landscaped plaza with tropical rain trees & patio umbrella (Image 4)
  drawRainTrees(ctx, 35, 175);
  drawRainTrees(ctx, 710, 175);

  // Outdoor cafe umbrella on plaza
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(630, floorY - 35, 28, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(628, floorY - 35, 4, 35);

  // Clean granite campus plaza ground
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#e2e8f0');
  floorGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.5;
  for (let px = 0; px < w; px += 60) {
    ctx.strokeRect(px, floorY, 60, h - floorY);
  }
}

// -------------------------------------------------------------
// ITE COLLEGE (ITE College Central & HQ at Ang Mo Kio - Image 5)
// -------------------------------------------------------------
function drawITECollege(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Clear daytime blue sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.7, '#60a5fa');
  skyGrad.addColorStop(1, '#dbeafe');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Landmark Curved Multi-Storey Architectural Glass Facade (Image 5)
  const facadeX = 50;
  const facadeY = 40;
  const facadeW = 700;
  const facadeH = 170;

  // Base building envelope
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(facadeX, facadeY, facadeW, facadeH);

  // Rooftop Solar Trellis Louvres (Image 5)
  ctx.fillStyle = '#334155';
  ctx.fillRect(facadeX - 10, facadeY - 14, facadeW + 20, 14);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  for (let lx = facadeX - 6; lx < facadeX + facadeW + 16; lx += 12) {
    ctx.beginPath();
    ctx.moveTo(lx, facadeY - 14);
    ctx.lineTo(lx + 6, facadeY);
    ctx.stroke();
  }

  // Curved glass curtain walls with blue and cyan architectural panels (Image 5)
  for (let row = 0; row < 4; row++) {
    const ry = facadeY + 12 + row * 38;
    ctx.fillStyle = '#cbd5e1'; // Floor slab band
    ctx.fillRect(facadeX, ry - 4, facadeW, 5);

    for (let col = 0; col < 18; col++) {
      const gx = facadeX + 12 + col * 37;
      const isTinted = (col + row) % 3 === 0;
      ctx.fillStyle = isTinted ? '#0284c7' : '#38bdf8';
      ctx.fillRect(gx, ry + 2, 33, 30);
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 1;
      ctx.strokeRect(gx, ry + 2, 33, 30);
    }
  }

  // Red ITE Logo Cube mounted on the glass facade (Image 5)
  const cubeX = facadeX + facadeW - 130;
  const cubeY = facadeY + 25;
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cubeX, cubeY, 46, 36);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px "Press Start 2P", monospace';
  ctx.fillText('ITE', cubeX + 6, cubeY + 24);

  // Tall Flagpoles with Singapore National Flag & ITE Institutional Flags (Image 5)
  [220, 250, 280].forEach((fx, idx) => {
    // Silver flagpole
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(fx, 30, 3, floorY - 30);
    // Gold finial sphere
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(fx + 1.5, 29, 3, 0, Math.PI * 2);
    ctx.fill();

    // Fluttering flags
    const wave = Math.sin(tick * 0.2 + idx) * 3;
    if (idx === 0) {
      // Singapore National Flag (Red top, white bottom)
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(fx + 3, 34 + wave, 24, 7);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(fx + 3, 41 + wave, 24, 7);
    } else {
      // ITE Institutional Flag (Red and white)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(fx + 3, 34 + wave, 24, 14);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(fx + 6, 38 + wave, 12, 6);
    }
  });

  // --- PROMINENT WHITE CAMPUS LANDMARK WALL IN FOREGROUND (Image 5) ---
  // "ITE Headquarters & ITE College Central / 2 Ang Mo Kio Drive Singapore 567720"
  const wallX = 80;
  const wallY = 175;
  const wallW = 640;
  const wallH = 48;

  // Crisp White Architectural Boundary Wall
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(wallX, wallY, wallW, wallH);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.strokeRect(wallX, wallY, wallW, wallH);

  // Bold Red ITE Lettering on Wall (Image 5)
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 16px "Press Start 2P", monospace';
  ctx.fillText('ITE', wallX + 22, wallY + 32);

  // Wall Text Inscription (Image 5)
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('ITE Headquarters & ITE College Central', wallX + 90, wallY + 22);
  ctx.fillStyle = '#475569';
  ctx.font = '8px sans-serif';
  ctx.fillText('2 Ang Mo Kio Drive, Singapore 567720 • Hands-on Minds-on Hearts-on', wallX + 90, wallY + 36);

  // Manicured garden berms with white spider lilies and orange-red ixoras in foreground (Image 5)
  ctx.fillStyle = '#15803d'; // Green lawn berm
  ctx.beginPath();
  ctx.ellipse(wallX + 100, floorY, 120, 16, 0, Math.PI, Math.PI * 2);
  ctx.ellipse(wallX + 480, floorY, 140, 18, 0, Math.PI, Math.PI * 2);
  ctx.fill();

  // Flowering shrubs
  for (let bx = wallX + 20; bx < wallX + wallW; bx += 24) {
    ctx.fillStyle = bx % 2 === 0 ? '#ef4444' : '#ffffff'; // Orange-red ixoras & white spider lilies
    ctx.beginPath();
    ctx.arc(bx, floorY - 8, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Paved campus concourse
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, floorY, w, h - floorY);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.5;
  for (let px = 0; px < w; px += 55) {
    ctx.strokeRect(px, floorY, 55, h - floorY);
  }
}

// -------------------------------------------------------------
// KKH HOSPITAL EMERGENCY & REVIVAL WARD
// -------------------------------------------------------------
function drawKKHHospitalWard(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  floorY: number,
  tick: number
) {
  // Soft clinical hospital wall (Teal & light medical green)
  const wallGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  wallGrad.addColorStop(0, '#f0fdfa');
  wallGrad.addColorStop(0.7, '#ccfbf1');
  wallGrad.addColorStop(1, '#99f6e4');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, floorY);

  // Upper hospital horizontal teal brand stripe
  ctx.fillStyle = '#0d9488';
  ctx.fillRect(0, 50, w, 14);
  ctx.fillStyle = '#14b8a6';
  ctx.fillRect(0, 64, w, 4);

  // KKH Hospital Emblem & Ward Header
  ctx.fillStyle = '#115e59';
  ctx.fillRect(w * 0.18, 12, w * 0.64, 28);
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 2;
  ctx.strokeRect(w * 0.18, 12, w * 0.64, 28);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KK WOMEN\'S AND CHILDREN\'S HOSPITAL (KKH)', w * 0.5, 26);
  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 7px "Press Start 2P", monospace';
  ctx.fillText('EMERGENCY RESUSCITATION & REHABILITATION WARD', w * 0.5, 36);
  ctx.textAlign = 'left';

  // Hospital bed (center)
  const bedX = 280;
  const bedY = 230;
  ctx.fillStyle = '#94a3b8'; // Metal bed frame
  ctx.fillRect(bedX, bedY + 40, 180, 20);
  ctx.fillRect(bedX + 10, bedY + 60, 10, floorY - bedY - 60);
  ctx.fillRect(bedX + 160, bedY + 60, 10, floorY - bedY - 60);
  // Bed mattress & clean white sheets
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(bedX + 8, bedY + 20, 164, 24);
  // Blue medical blanket
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(bedX + 45, bedY + 22, 125, 20);
  // Pillow
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.roundRect(bedX + 12, bedY + 12, 32, 16, 4);
  ctx.fill();

  // Stainless steel IV drip stand with saline bag
  const ivX = bedX - 35;
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ivX, floorY);
  ctx.lineTo(ivX, 130);
  ctx.moveTo(ivX - 14, 134);
  ctx.lineTo(ivX + 14, 134);
  ctx.stroke();
  // Transparent Saline Solution Bag
  ctx.fillStyle = 'rgba(224, 242, 254, 0.75)';
  ctx.fillRect(ivX - 10, 140, 12, 24);
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1;
  ctx.strokeRect(ivX - 10, 140, 12, 24);
  // Plastic drip tubing leading towards bed
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
  ctx.beginPath();
  ctx.moveTo(ivX - 4, 164);
  ctx.quadraticCurveTo(ivX + 20, 200, bedX + 50, bedY + 28);
  ctx.stroke();

  // Bedside Cardiac Vital Signs Monitor
  const monX = bedX + 195;
  const monY = 175;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(monX, monY, 70, 50);
  ctx.strokeStyle = '#0d9488';
  ctx.lineWidth = 2;
  ctx.strokeRect(monX, monY, 70, 50);
  // Monitor screen with pulsating ECG line
  ctx.fillStyle = '#022c22';
  ctx.fillRect(monX + 4, monY + 4, 62, 42);
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const ecgOffset = (tick * 2) % 40;
  ctx.moveTo(monX + 8, monY + 25);
  ctx.lineTo(monX + 20, monY + 25);
  ctx.lineTo(monX + 25, monY + 12);
  ctx.lineTo(monX + 30, monY + 36);
  ctx.lineTo(monX + 35, monY + 25);
  ctx.lineTo(monX + 60, monY + 25);
  ctx.stroke();

  // Non-slip hospital vinyl floor
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#f1f5f9');
  floorGrad.addColorStop(1, '#cbd5e1');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);
}

