# NagarNetr (नगरनेत्र) 👁️🚩

NagarNetr is a citizen-first mobile-responsive web application designed to bridge the gap between residents of Pune and their local representatives (Nagarsevaks). It empowers citizens to report civic issues like potholes, garbage, and broken streetlights directly to the concerned authorities via WhatsApp and Email.

## 🚀 Key Features

### 1. Smart Issue Reporting
- **Photo Proof**: Capture or upload clear photo evidence of civic issues.
- **Dynamic Formal Templates**: Automatically generates formal, respectful messages tailored to the specific issue (Pothole, Garbage, Streetlight, etc.).
- **Nagarsevak Integration**: Automatically identifies and mentions the elected representative (Nagarsevak) for the specific ward in every report.

### 2. Precise Location Intelligence
- **Real-Time Geolocation**: Uses the browser's Geolocation API to detect your current ward.
- **PMC Boundary Check**: Intelligently detects if a user is outside Pune Municipal Corporation (PMC) limits and prompts for manual ward selection.
- **Manual Ward Selection**: Allows users to manually select any of the 42 wards if auto-detection is unavailable or if reporting for a different area.

### 3. Multi-Channel Communication
- **WhatsApp Integration**: One-click reporting to a centralized WhatsApp helpline (`+91-9689900002`).
- **Direct Email via Gmail**: 
  - Automatically opens the Gmail web interface with pre-filled details.
  - **Dynamic Routing**: Pothole reports are sent directly to `road@punecorporation.org` (Road Dept), while other issues go to `egov@pcmcindia.gov.in`.
  - **Accountability**: All emails are automatically CC'd to `feedback@punecorporation.org`.

### 4. Zone & Ward Management
- **Automatic Zone Detection**: Wards are automatically mapped to the new 10-zone administrative structure (Rajgad, Sinhagad, Vijaydurg, etc.).
- **Updated Directory**: Complete database of 2026 elected corporators across all 42 wards with their political affiliations.

### 5. Complaint Tracking
- **Personal Tracker**: View all reported issues with unique ticket reference numbers.
- **Status Management**: Citizens can mark issues as **"Resolved"** once they are fixed.
- **Local Persistence**: All complaints are stored locally on the user's device for privacy and quick access.

### 6. Privacy First
- **Contact Masking**: All sensitive contact numbers are obfuscated/encoded in the source code.
- **Local Data**: Personal reports are kept on the device, not on a central server.

## 🛠️ Technical Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS for a modern, mobile-first UI
- **Icons**: Lucide React
- **Navigation**: React Router
- **Deployment**: GitHub Pages with CI/CD via GitHub Actions

## 🏁 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Build for production: `npm run build`

---
*Built for the citizens of Pune to ensure a better, cleaner, and more responsive city.* 🏙️🇮🇳
