
"use client";

import { FileUpload } from "@/components/file-upload";
import { Background } from '@/components/background1';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Brain, FileText, Shield, Download, Clock, UserCog } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced AI technology analyzes your medical reports with high accuracy and provides detailed insights.",
  },
  {
    icon: FileText,
    title: "Comprehensive Reports",
    description: "Get detailed breakdowns of test results, health issues, specialist recommendations, and medication guidance.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your medical data is processed securely and never stored, ensuring complete privacy and confidentiality.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Download your analysis results in a well-formatted PDF report for easy sharing with healthcare providers.",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Receive detailed analysis within seconds, helping you understand your medical reports quickly.",
  },
  {
    icon: UserCog,
    title: "Specialist Guidance",
    description: "Get recommendations for medical specialists based on your report findings and health conditions.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mt-16 md:mt-20 text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 mb-4">
            <TypeAnimation
              sequence={[
                'Medical Report Analyzer',
                2000,
                'Understand Your Health',
                2000,
                'Instant AI Analysis',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Upload your medical report and get an instant AI-powered analysis that helps you understand your health status better.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <FileUpload />
        </motion.div>

        <section className="py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 mb-4">
                    Powerful Features
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Everything you need for better health understanding
                </p>
            </motion.div>

            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                    },
                    },
                }}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
                {features.map((feature, index) => (
                <motion.div
                    key={index}
                    variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: { y: 0, opacity: 1, },
                    }}
                    className="group relative bg-white/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-border"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                    <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg p-2.5 mb-4">
                        <feature.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                        {feature.description}
                    </p>
                    </div>
                    <div className="absolute inset-0 border border-blue-100 dark:border-blue-900/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                ))}
            </motion.div>
        </section>
      </div>
    </main>
  );
}
