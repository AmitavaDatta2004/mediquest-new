
"use client";

import { Suspense } from 'react';
import SymptomChecker from '@/components/SymptomChecker';
import { Activity, Heart, Shield } from 'lucide-react';
import { Background } from '@/components/background1';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

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
                'AI-Powered Disease Prediction',
                2000,
                'Check Your Symptoms',
                2000,
                'Get Health Insights',
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
            Get instant insights about your health based on your symptoms using advanced AI analysis.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
            <Card className="p-4 md:p-6 backdrop-blur-lg bg-white/80 dark:bg-card/60 shadow-xl hover:shadow-2xl transition-all duration-300 border-t border-l border-white/20 dark:border-border">
                <Suspense fallback={<div>Loading symptom checker...</div>}>
                    <SymptomChecker />
                </Suspense>
            </Card>
        </motion.div>
        
        <Features />
      </div>
    </main>
  );
}

const features = [
    {
      icon: <Activity className="h-8 w-8" />,
      title: 'Smart Symptom Analysis',
      description: 'Advanced AI-powered analysis of your symptoms for accurate disease prediction.',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Comprehensive Health Insights',
      description: 'Get detailed information about potential conditions, treatments, and preventive measures.',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Personalized Recommendations',
      description: 'Receive tailored diet plans, exercise routines, and lifestyle suggestions.',
    },
];
  
function Features() {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };
  
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };
  
    return (
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 mb-4">
            Key Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make informed decisions about your health
          </p>
        </motion.div>
  
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-border"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 text-white">
                  {feature.icon}
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
    );
}
