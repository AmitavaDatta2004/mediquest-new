import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Symptom Checker & Disease Predictor',
  description: 'Enter your symptoms to get instant AI-powered predictions for potential diseases. Receive personalized health insights, recommendations, and next steps.',
  keywords: ['symptom checker', 'disease predictor', 'AI diagnosis', 'health check', 'medical AI'],
  openGraph: {
    title: 'AI Symptom Checker & Disease Predictor | MediQuest',
    description: 'Get instant insights about your health based on your symptoms using advanced AI analysis.',
    url: 'https://medi-quest.online/disease-predictor',
  }
};

export default function DiseasePredictorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
