
# MediQuest: Your AI-Powered Health Companion

**MediQuest** is an intelligent healthcare platform designed to empower users with a deeper understanding of their health. By leveraging cutting-edge generative AI, MediQuest translates complex medical data into clear, actionable insights. From decoding symptoms and analyzing lab reports to providing detailed medicine information, our goal is to make healthcare more accessible, transparent, and personalized.

---

## Table of Contents
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Live Demo & Screenshots](#live-demo--screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Security & Privacy](#security--privacy)
- [Contributing](#contributing)
- [Meet the Team](#meet-the-team)
- [License](#license)

---

## Key Features

MediQuest is packed with powerful features designed to put you in control of your health information.

### 1. AI Medical Report Analyzer
Instantly transform complex medical reports into easy-to-understand analysis.
- **Multi-Format Upload:** Supports PDF documents and image files (JPG, PNG).
- **Comprehensive Analysis:** The AI provides a detailed breakdown covering:
  - **Overall Summary:** A simple overview of the report's main findings.
  - **Critical Findings:** Highlights results that require immediate attention.
  - **Key Test Results:** Explains each test, comparing values to normal ranges.
  - **Health Issues:** Identifies potential health problems, rated by severity.
  - **Specialist Recommendations:** Suggests relevant specialists and provides a list of **5 local doctors** based on your location.
  - **Medication Guidance:** Lists prescribed or recommended medications (both prescription and OTC).
- **Multi-Language Support:** Get your analysis in multiple languages, including English, Hindi, Bengali, and more.
- **Secure & Private:** Your reports are processed in-memory and are **never stored** on our servers.
- **PDF Export:** Download the complete analysis as a well-formatted PDF to share with your healthcare provider.

### 2. AI Symptom Checker & Disease Predictor
Enter your symptoms and get AI-driven insights into potential health conditions.
- **Symptom & Health Profile Input:** Enter your symptoms, location, and answer a few simple health questions for a more personalized analysis.
- **Ranked Disease Predictions:** Receive a list of the top 5 possible diseases, each with a probability score.
- **In-Depth Information:** For each potential disease, you get:
  - Detailed descriptions, common causes, and risk factors.
  - Recommended precautions and lifestyle adjustments.
- **Actionable Health Plans:**
  - **Medications:** Suggestions for both OTC and prescription treatments.
  - **Diet Plan:** A list of recommended foods to eat and to avoid.
  - **Exercise Routines:** Suggested physical activities to aid recovery.
- **Local Doctor Recommendations:** Finds 5 relevant doctors in your specified location.

### 3. Medicine Information Portal
A comprehensive database for all your medication-related questions.
- **Powerful Search:** Look up any medicine by name.
- **Detailed Information:** Access a wealth of information, including:
  - **Composition:** Full list of active and inactive ingredients.
  - **Mechanism of Action:** How the medicine works.
  - **Usage & Dosage:** Detailed instructions for adults, children, and the elderly.
  - **Side Effects:** A breakdown of common, uncommon, and serious side effects.
  - **Interactions:** Critical warnings about interactions with other drugs or food.
  - **Substitutes:** Find affordable and effective alternatives.
  - **Pricing:** Average retail price in your currency.
  - **Storage & Expiry:** Crucial safety information, including clear guidelines on what to do if a medicine is expired.
- **Find Nearby Pharmacies:** Get a list of 5 pharmacies in your area, complete with addresses, contact information, and directions via Google Maps.
- **Multi-Language Support:** All information is available in your selected language.

---

## How It Works

1. **Medical Report Analyzer:**
   - Navigate to the "Report Analyzer" page.
   - Select your preferred language and enter your location.
   - Upload your medical report (PDF/image).
   - The AI analyzes the document and presents a structured, easy-to-read report.

2. **Symptom Checker:**
   - Go to the "Disease Predictor" page.
   - Choose a language, enter your location, add your symptoms, and answer a few health questions.
   - The AI provides a detailed report with potential conditions, diet plans, and doctor recommendations.

3. **Medicine Info:**
   - Visit the "Medicine Details" page.
   - Select a language, enter a medicine name, and provide your location.
   - Instantly receive comprehensive details, including substitutes and nearby pharmacies.

---

## Live Demo & Screenshots

*(Placeholder for live demo link and screenshots of the application in action)*

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, ShadCN/UI
- **Animations:** Framer Motion, React Type Animation
- **AI/ML:** Google Gemini API via Genkit
- **State Management:** React Hooks (useState, useContext)
- **PDF Generation:** jsPDF, jspdf-autotable
- **UI Components:** Radix UI, Lucide Icons, Vaul
- **PWA Support:** `next-pwa` for an installable, app-like experience.

---

## Project Structure
```
mediquest/
├── src/
│   ├── app/                # Next.js App Router: Pages and API routes
│   │   ├── api/            # Backend API logic for AI features
│   │   ├── (pages)/        # Page directories (e.g., /report-analyzer)
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable React components (UI, features)
│   ├── hooks/              # Custom React hooks (e.g., use-medicine-info)
│   ├── lib/                # Utility functions, API helpers, PDF generator
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets (images, icons, manifest.json)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json
```
---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mediquest.git
   cd mediquest
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in the required API keys (see [Environment Variables](#environment-variables)).
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open [http://localhost:9002](http://localhost:9002) to view the app.**

---

## Environment Variables

You will need to create a `.env.local` file in the root of your project and add the following:

```
# Google Gemini API Key for all AI-powered features
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
NEXT_PUBLIC_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

---

## Security & Privacy

We take your privacy seriously.
- **No Data Storage:** All uploaded medical reports and personal health data are processed in-memory and **are never stored** on our servers.
- **Secure Processing:** API requests are handled securely.
- **Rate Limiting:** Backend endpoints are rate-limited to prevent abuse and ensure service stability.

---

## Contributing

Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please feel free to open an issue or submit a pull request.

---

## Meet the Team

- **Amitava Datta** – Backend Developer ([GitHub](https://github.com/AmitavaDatta2004))
- **Pranay De** – ML Engineer ([GitHub](https://github.com/PRANAY130))
- **Aitijhya Roy** – UI/UX Designer ([GitHub](https://github.com/AitijhyaCoded))
- **Rudranil Das** – Frontend Developer ([GitHub](https://github.com/Thorfinn05))
- **Srinjinee Mitra** – Database Manager ([GitHub](https://github.com/SuperCoder2005))

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ by the MediQuest Team.
