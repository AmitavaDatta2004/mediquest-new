
# MediQuest

MediQuest is an AI-powered healthcare platform that helps users decode symptoms, analyze medical reports, discover the right cures, and stay informed about their health. The platform leverages advanced machine learning and generative AI to provide instant, actionable health insights in a user-friendly way.

---

## Table of Contents
- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Security & Privacy](#security--privacy)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)
- [Team](#team)

---

## Features

- **AI-Powered Report Analysis:** Upload your medical reports and receive a detailed, easy-to-understand breakdown with critical findings, health issues, and specialist recommendations.
- **Symptom Checker & Disease Prediction:** Enter your symptoms to get a ranked list of possible diseases, risk factors, and recommended precautions.
- **Medicine Information Portal:** Search for medicines and access comprehensive details including composition, usage, side effects, dosage, storage, price, substitutes, and user reviews.
- **Personalized Health Plans:** Get custom healthcare recommendations, diet plans, and exercise suggestions based on your profile and reports.
- **Real-Time Health Alerts:** Receive timely notifications for medications and appointments.
- **Doctor Recommendations:** Find top doctors and specialists in your area for your specific health needs.
- **PDF Export:** Download your analysis and medicine details as well-formatted PDF reports.
- **Secure & Private:** All data is processed securely and never stored, ensuring complete privacy and confidentiality.

---

## How It Works

1. **Medical Report & Prescription Analyzer:**
   - Upload your medical report (PDF/image), handwritten prescription, or medical image (X-ray, scan, etc).
   - The AI analyzes the document and provides a summary, highlights critical findings, decodes handwritten prescriptions, and suggests next steps.
2. **Symptom Checker:**
   - Enter your symptoms and answer a few health questions.
   - Get a list of probable diseases, risk factors, and recommended actions.
3. **Medicine Info:**
   - Search for any medicine to get detailed information, including alternatives and safety alerts.

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Next.js API routes
- **AI/ML:** Google Gemini API, custom ML models
- **Authentication:** Clerk
- **PDF Generation:** jsPDF, @react-pdf/renderer
- **UI Components:** Radix UI, Lucide Icons
- **Styling:** Tailwind CSS

---

## Project Structure

```
mediquest/
├── app/                # Next.js app directory (pages, API routes)
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and helpers
├── public/             # Static assets (images, icons)
├── types/              # TypeScript types
├── .clerk/             # Clerk authentication config
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── ...
```

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation Steps
1. **Clone the repository:**
   ```powershell
   git clone https://github.com/AmitavaDatta2004/mediquest.git
   cd mediquest
   ```
2. **Install dependencies:**
   ```powershell
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in the required values (see [Environment Variables](#environment-variables)).
4. **Run the development server:**
   ```powershell
   npm run dev
   # or
   yarn dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) to view the app.**

---

## Environment Variables

You will need to set the following environment variables in your `.env.local` file:
- `CLERK_PUBLISHABLE_KEY` – Clerk authentication key
- `CLERK_SECRET_KEY` – Clerk secret key
- `GEMINI_API_KEY` – Google Gemini API key for AI features

---

## Usage

- **Medical Report Analyzer:** Go to the "Report Analyzer" section, upload your report, and get instant analysis.
- **Symptom Checker:** Use the "Disease Predictor" to enter symptoms and receive AI-powered predictions.
- **Medicine Info:** Search for medicines in the "Medicine Details" section for comprehensive information.
- **Download Reports:** Export your results as PDF for sharing with healthcare providers.

---

## Security & Privacy

- All user data is processed in-memory and never stored on the server.
- No personal health information is retained after analysis.
- All API requests are rate-limited to prevent abuse.
- Authentication is handled securely via Clerk.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

---

## FAQ

**Q: Is my health data safe?**
A: Yes. All data is processed securely and never stored.

**Q: Can I use MediQuest for emergency diagnosis?**
A: No. MediQuest is for informational purposes only and does not replace professional medical advice.

**Q: What types of medical reports are supported?**
A: Most standard PDF and image-based reports are supported.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Team


- **Amitava Datta** – Backend Developer ([GitHub](https://github.com/AmitavaDatta2004))
- **Pranay De** – ML Engineer ([GitHub](https://github.com/PRANAY130))
- **Aitijhya Roy** – UI/UX Designer ([GitHub](https://github.com/AitijhyaCoded))
- **Rudranil Das** – Frontend Developer ([GitHub](https://github.com/Thorfinn05))
- **Srinjinee Mitra** – Database Manager ([GitHub](https://github.com/SuperCoder2005))

---

Made with ❤️ by the MediQuest Team.

