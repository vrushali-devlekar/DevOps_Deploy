import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, 'src', 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 4. Card 3: Sky Island Mesh (Antigravity Beacon Fortress) with Luminous Emerald Beacon Beam (1:1)
const heroCard3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <radialGradient id="cyberSkyBg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#092019"/>
      <stop offset="50%" stop-color="#030d0a"/>
      <stop offset="100%" stop-color="#010504"/>
    </radialGradient>

    <linearGradient id="grassTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bef264"/>
      <stop offset="50%" stop-color="#a3e635"/>
      <stop offset="100%" stop-color="#65a30d"/>
    </linearGradient>

    <linearGradient id="beaconBeamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#a3e635" stop-opacity="0.95"/>
      <stop offset="30%" stop-color="#4ade80" stop-opacity="0.75"/>
      <stop offset="70%" stop-color="#38bdf8" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#bef264" stop-opacity="0.1"/>
    </linearGradient>

    <filter id="emeraldBeaconGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="15" result="blur1"/>
      <feGaussianBlur stdDeviation="30" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <pattern id="edgeGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(163, 230, 53, 0.08)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Card Background -->
  <rect width="800" height="800" rx="32" fill="url(#cyberSkyBg)"/>
  <rect width="800" height="800" rx="32" fill="url(#edgeGrid)"/>

  <!-- Outer Cybernetic Frame -->
  <rect x="20" y="20" width="760" height="760" rx="24" fill="none" stroke="rgba(163, 230, 53, 0.3)" stroke-width="2"/>
  <rect x="36" y="36" width="728" height="728" rx="16" fill="none" stroke="rgba(56, 189, 248, 0.15)" stroke-width="1" stroke-dasharray="14 7"/>

  <!-- LUMINOUS EMERALD BEACON BEAM PROJECTING UPWARDS INTO SPACE -->
  <g filter="url(#emeraldBeaconGlow)">
    <polygon points="360,480 440,480 470,0 330,0" fill="url(#beaconBeamGrad)"/>
    <line x1="400" y1="480" x2="400" y2="0" stroke="#ffffff" stroke-width="6" opacity="0.9"/>
  </g>

  <!-- Atmospheric Haze & Stardust -->
  <g filter="url(#emeraldBeaconGlow)">
    <circle cx="200" cy="150" r="4" fill="#a3e635"/>
    <circle cx="620" cy="220" r="3" fill="#38bdf8"/>
    <circle cx="680" cy="580" r="5" fill="#bef264"/>
    <circle cx="140" cy="520" r="4" fill="#a3e635"/>
  </g>

  <!-- MAIN ISOMETRIC FLOATING SKY ISLAND (CYBER FORTRESS & BEACON) -->
  <g transform="translate(400, 480)">

    <!-- Under-Island Antigravity Glow Field -->
    <ellipse cx="0" cy="150" rx="260" ry="85" fill="rgba(163, 230, 53, 0.35)" filter="url(#emeraldBeaconGlow)"/>

    <!-- Severed Tree Roots & Drifting Mossy Dirt Fragments Underneath -->
    <g stroke="#3f6212" stroke-width="3" fill="none">
      <path d="M-120,80 L-150,150 L-130,190"/>
      <path d="M-40,110 L-60,180 L-30,230"/>
      <path d="M60,110 L80,190 L50,240"/>
      <path d="M140,80 L170,160 L150,210"/>
    </g>

    <!-- Drifting Mossy Stone Fragments Floating Underneath -->
    <g transform="translate(-100, 200)" filter="url(#emeraldBeaconGlow)">
      <polygon points="0,0 25,-12 50,0 25,12" fill="#65a30d"/>
      <polygon points="0,0 25,12 25,30 0,18" fill="#3f6212"/>
      <polygon points="25,12 50,0 50,18 25,30" fill="#27272a"/>
    </g>

    <g transform="translate(80, 220)" filter="url(#emeraldBeaconGlow)">
      <polygon points="0,0 20,-10 40,0 20,10" fill="#a3e635"/>
      <polygon points="0,0 20,10 20,25 0,15" fill="#65a30d"/>
      <polygon points="20,10 40,0 40,15 20,25" fill="#3f6212"/>
    </g>

    <!-- Island Dirt Body Base -->
    <polygon points="-240,0 0,100 0,160 -240,60" fill="#1c1917" stroke="#292524" stroke-width="2"/>
    <polygon points="0,100 240,0 240,60 0,160" fill="#292524" stroke="#44403c" stroke-width="2"/>
    
    <!-- Grass Top Layer (Isometric Floating Island Deck) -->
    <polygon points="-240,0 0,-100 240,0 0,100" fill="url(#grassTopGrad)" stroke="#a3e635" stroke-width="2"/>
    <polygon points="-240,0 0,100 0,120 -240,20" fill="url(#grassTopGrad)"/>
    <polygon points="0,100 240,0 240,20 0,120" fill="#3f6212"/>

    <!-- GLOWING BEACON CYBER CUBE & STRUCTURE ON TOP -->
    <g transform="translate(0, -80)">
      <!-- Cyber Cube Base -->
      <polygon points="-50,0 0,-25 50,0 0,25" fill="#a3e635" filter="url(#emeraldBeaconGlow)"/>
      <polygon points="-50,0 0,25 0,70 -50,45" fill="#65a30d"/>
      <polygon points="0,25 50,0 50,45 0,70" fill="#4d7c0f"/>

      <!-- Inner Luminous Crystal Core -->
      <polygon points="-25,-20 0,-35 25,-20 0,-5" fill="#ffffff" filter="url(#emeraldBeaconGlow)"/>
    </g>

    <!-- Glowing Neon Green Power Conduits Running Across Island Deck -->
    <path d="M-200,-15 L-100,30 L0,0 L100,40 L180,-10" fill="none" stroke="#a3e635" stroke-width="3" filter="url(#emeraldBeaconGlow)"/>
    <path d="M-150,-40 L-40,20 L60,-30 L150,10" fill="none" stroke="#38bdf8" stroke-width="2" filter="url(#emeraldBeaconGlow)"/>

  </g>
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'hero_card_3.svg'), heroCard3Svg);
console.log('Card 3 updated with Luminous Emerald Beacon Beam!');
