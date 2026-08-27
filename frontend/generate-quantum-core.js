import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, 'src', 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Antigravity Quantum Server Core SVG Asset (1:1 Octane / Hyper-Detailed Style)
const quantumCoreSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <!-- Dark Vacuum Chamber Background -->
    <radialGradient id="vacuumChamberBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#180e05"/>
      <stop offset="35%" stop-color="#0a0502"/>
      <stop offset="100%" stop-color="#020204"/>
    </radialGradient>

    <!-- Vertical Amber Laser Light Pillar -->
    <linearGradient id="amberLaserPillar" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.95"/>
      <stop offset="40%" stop-color="#fbbf24" stop-opacity="0.8"/>
      <stop offset="80%" stop-color="#fef08a" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1"/>
    </linearGradient>

    <!-- Quantum Core Glass Refraction Gradients -->
    <linearGradient id="quantumGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#b45309" stop-opacity="0.95"/>
    </linearGradient>

    <linearGradient id="quantumGlassLeft" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#27272a" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0.98"/>
    </linearGradient>

    <linearGradient id="quantumGlassRight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.95"/>
    </linearGradient>

    <!-- Amber & Gold Volumetric Glow Filters -->
    <filter id="amberVolumetric" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="18" result="blur1"/>
      <feGaussianBlur stdDeviation="35" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="laserGlowEffect" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Thin Vacuum Chamber Laser Grid -->
    <pattern id="vacuumGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245, 158, 11, 0.08)" stroke-width="1"/>
      <circle cx="40" cy="0" r="1.5" fill="rgba(251, 191, 36, 0.25)"/>
    </pattern>
  </defs>

  <!-- Dark Vacuum Chamber Base -->
  <rect width="800" height="800" rx="32" fill="url(#vacuumChamberBg)"/>
  <rect width="800" height="800" rx="32" fill="url(#vacuumGrid)"/>

  <!-- Minimalist Chamber Frame -->
  <rect x="24" y="24" width="752" height="752" rx="24" fill="none" stroke="rgba(245, 158, 11, 0.25)" stroke-width="1.5"/>
  <rect x="40" y="40" width="720" height="720" rx="16" fill="none" stroke="rgba(254, 240, 138, 0.15)" stroke-width="1" stroke-dasharray="16 8"/>

  <!-- VERTICAL LASER LIGHT PILLAR (CENTER BEAM) -->
  <g filter="url(#amberVolumetric)">
    <polygon points="360,650 440,650 460,0 340,0" fill="url(#amberLaserPillar)"/>
    <line x1="400" y1="650" x2="400" y2="0" stroke="#ffffff" stroke-width="8" opacity="0.95"/>
  </g>

  <!-- ISOMETRIC ANTIGRAVITY QUANTUM SERVER CORE STRUCTURE -->
  <g transform="translate(400, 480)">

    <!-- Under-Core Volumetric Amber Glow Field -->
    <ellipse cx="0" cy="140" rx="290" ry="95" fill="rgba(245, 158, 11, 0.35)" filter="url(#amberVolumetric)"/>
    <ellipse cx="0" cy="140" rx="190" ry="60" fill="rgba(254, 240, 138, 0.25)" filter="url(#laserGlowEffect)"/>

    <!-- Dark Titanium Bedrock Base -->
    <polygon points="-260,0 0,-110 260,0 0,110" fill="#18181b" stroke="#27272a" stroke-width="2"/>
    <polygon points="-260,0 0,110 0,170 -260,60" fill="#09090b" stroke="#18181b" stroke-width="2"/>
    <polygon points="0,110 260,0 260,60 0,170" fill="#18181b" stroke="#27272a" stroke-width="2"/>

    <!-- Concentric Laser Coordinate Rings on Base -->
    <ellipse cx="0" cy="0" rx="180" ry="75" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="12 6" filter="url(#laserGlowEffect)"/>
    <ellipse cx="0" cy="0" rx="110" ry="45" fill="none" stroke="#fbbf24" stroke-width="1.5" filter="url(#laserGlowEffect)"/>

    <!-- QUANTUM CORE MONOLITH (HOVERING VERTICALLY IN CENTER) -->
    <g transform="translate(0, -140)" filter="url(#amberVolumetric)">
      <!-- Quantum Glass Core Top -->
      <polygon points="0,-110 90,-155 180,-110 90,-65" fill="url(#quantumGlassTop)" stroke="#fef08a" stroke-width="2"/>
      <!-- Quantum Left Face -->
      <polygon points="0,-110 90,-65 90,45 0,0" fill="url(#quantumGlassLeft)" stroke="#3f3f46" stroke-width="2"/>
      <!-- Quantum Right Face -->
      <polygon points="90,-65 180,-110 180,0 90,45" fill="url(#quantumGlassRight)" stroke="#52525b" stroke-width="2"/>

      <!-- Inner Glowing Core Prism -->
      <polygon points="45,-75 90,-98 135,-75 90,-52" fill="#ffffff" opacity="0.95"/>
      <line x1="90" y1="-52" x2="90" y2="15" stroke="#f59e0b" stroke-width="4" filter="url(#laserGlowEffect)"/>
    </g>

    <!-- SHATTERED MATTE-BLACK GEOMETRIC BLOCKS (SYMMETRICALLY FLOATING) -->
    <!-- Left Floating Block 1 -->
    <g transform="translate(-170, -210)" filter="url(#laserGlowEffect)">
      <polygon points="0,-35 40,-55 80,-35 40,-15" fill="#27272a" stroke="#f59e0b" stroke-width="1.5"/>
      <polygon points="0,-35 40,-15 40,20 0,0" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <polygon points="40,-15 80,-35 80,0 40,20" fill="#09090b" stroke="#27272a" stroke-width="1.5"/>
    </g>

    <!-- Right Floating Block 2 -->
    <g transform="translate(100, -240)" filter="url(#laserGlowEffect)">
      <polygon points="0,-35 40,-55 80,-35 40,-15" fill="#3f3f46" stroke="#fbbf24" stroke-width="1.5"/>
      <polygon points="0,-35 40,-15 40,20 0,0" fill="#27272a" stroke="#52525b" stroke-width="1.5"/>
      <polygon points="40,-15 80,-35 80,0 40,20" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
    </g>

    <!-- Levitating Fragment Satellite Cubes -->
    <g transform="translate(-80, -310)" filter="url(#amberVolumetric)">
      <polygon points="0,-20 25,-32 50,-20 25,-08" fill="#fef08a"/>
      <polygon points="0,-20 25,-08 25,12 0,0" fill="#f59e0b"/>
      <polygon points="25,-08 50,-20 50,0 25,12" fill="#b45309"/>
    </g>

    <g transform="translate(140, -110)" filter="url(#amberVolumetric)">
      <polygon points="0,-18 20,-28 40,-18 20,-08" fill="#fbbf24"/>
      <polygon points="0,-18 20,-08 20,10 0,0" fill="#d97706"/>
      <polygon points="20,-08 40,-18 40,0 20,10" fill="#78350f"/>
    </g>

    <!-- Floating Volumetric Ember Particles -->
    <rect x="-190" y="-110" width="7" height="7" fill="#fef08a" filter="url(#laserGlowEffect)"/>
    <rect x="210" y="-170" width="8" height="8" fill="#f59e0b" filter="url(#amberVolumetric)"/>
    <rect x="-30" y="-270" width="6" height="6" fill="#ffffff" filter="url(#laserGlowEffect)"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'quantum_server_core.svg'), quantumCoreSvg);
console.log('Quantum Server Core SVG created successfully!');
