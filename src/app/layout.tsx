import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://medi-quest.online"),
  title: {
    default: "MediQuest - AI-Powered Healthcare Solutions",
    template: "%s | MediQuest",
  },
  description:
    "Decode Your Symptoms, Discover the Right Cure, and Stay Informed! Your go-to source for medicine info, accurate diagnoses, and expert health insights.",
  keywords: [
    "AI healthcare",
    "symptom checker",
    "medical report analyzer",
    "medicine information",
    "disease predictor",
    "health insights",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "MediQuest - AI-Powered Healthcare Solutions",
    description: "AI-powered platform for instant health insights.",
    url: "https://medi-quest.online",
    siteName: "MediQuest",
    locale: "en_US",
    type: "website",
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/logo-mediquest-192.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
