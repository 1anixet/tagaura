# NFC Home

A premium interactive frontend showcase for a privacy-first NFC home and personal automation platform.

NFC Home turns physical places and objects into simple digital controls:

```text
Physical world -> NFC tag -> Android phone -> Permission -> Action
```

The phone acts as the intelligence layer, family events are designed for encrypted synchronization, and optional hardware can extend the system into a low-cost smart home.

## Demo Features

- Animated Three.js 3D futuristic home scene
- NFC tag to phone to action storytelling
- Interactive NFC Focus routine simulation
- Family Home IN / OUT presence without continuous GPS tracking
- Family Board demo with local notes
- Sleep, Focus, and Leave Home routine scenes
- Office Phone A -> encrypted server -> Home Phone B security flow
- Password Vault concept with NFC and biometric steps
- Smart-home expansion concept with phone, ESP32, and devices
- Universal NFC concepts for Wi-Fi, URLs, and digital business cards
- Responsive desktop and mobile layouts
- Reduced-motion support and off-screen 3D animation pausing

## Important Disclaimer

This is a frontend-only visual demonstration. It does not implement:

- Real NFC communication
- Backend services or databases
- Authentication
- Production encryption
- Password storage
- Real smart-home hardware control
- External APIs or server synchronization

The privacy, encryption, family, vault, and hardware flows represent the intended product architecture visually.

## Tech Stack

- React
- Vite
- JavaScript / JSX
- Three.js
- Lucide React
- CSS animations and responsive CSS

## Run Locally

Requirements:

- Node.js 20 or newer
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at the local URL shown by Vite, usually `http://127.0.0.1:5173/`.

## Production Build

Create the optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated deployable files are placed in `dist/`.

## Netlify Deployment

### GitHub-connected deployment

Use these settings in Netlify:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`

Netlify will install dependencies and build the site automatically on each push.

### Manual deployment

Run `npm run build`, then drag the generated `dist/` folder into Netlify's manual deploy area.

## Project Structure

```text
src/
  main.jsx           Main React application and sections
  styles.css         Visual system and responsive styles
  ThreeHeroScene.jsx Main animated 3D home scene
  Mini3DScene.jsx   Reusable animated room and feature scenes

index.html           Vite HTML entry point
package.json         Scripts and dependencies
```

## Product Concept

NFC Home combines:

- Physical-first NFC automation
- Family permissions and coordination
- GPS-free Home IN / OUT presence
- Shared family notes
- Local personal routines
- Secure vault access concepts
- End-to-end encrypted synchronization architecture
- Optional low-cost ESP32 smart-home expansion

The core experience is intentionally simple:

> Tap the physical world. Control your digital home.
