import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Medical Report Analyzer',
  description: 'Upload your medical reports (PDF or images) to get an instant, AI-powered analysis. Understand your health status with detailed insights and recommendations.',
  keywords: ['medical report analysis', 'AI health check', 'lab report analyzer', 'health report AI', 'PDF report analysis'],
  openGraph: {
    title: 'AI Medical Report Analyzer | MediQuest',
    description: 'Instantly analyze your medical reports with our advanced AI for clear, understandable health insights.',
    url: 'https://medi-quest.online/report-analyzer',
  }
};

export default function ReportAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
