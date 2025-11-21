
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import * as THREE from "three";
import Link from "next/link";
import { FileSearch, Brain, Pill, Download } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [deviceType, setDeviceType] = useState<'android' | 'other'>('other');

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const isAndroid = /android/i.test(userAgent);

    if (isAndroid) {
      setDeviceType('android');
    } else {
      setDeviceType('other');
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current; // Store the reference
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const dnaGeometry = new THREE.TorusKnotGeometry(10, 3, 200, 32);
    const dnaMaterial = new THREE.MeshPhongMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.5,
    });
    const dna = new THREE.Mesh(dnaGeometry, dnaMaterial);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0x4f46e5, 2);
    pointLight.position.set(10, 10, 10);

    scene.add(dna);
    scene.add(ambientLight);
    scene.add(pointLight);
    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      dna.rotation.x += 0.005;
      dna.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeChild(renderer.domElement); // Use stored reference
      }
    };
  }, []);

  const renderDownloadCard = () => {
    const isAndroid = deviceType === 'android';
    let buttonText, description, buttonAction;

    if (isAndroid) {
      buttonText = "Download APK";
      description = "Get the full MediQuest experience on your Android device for faster access and more features.";
      buttonAction = () => {
        window.location.href = "/MediQuest.apk";
      };
    } else {
      buttonText = "Install App";
      description = "Install our Progressive Web App on your device for an app-like experience, or download the APK for Android.";
      buttonAction = () => {
        // For non-Android, you can show instructions or try to trigger PWA install if available.
        alert("To install, please use the 'Add to Home Screen' feature in your browser's menu.");
      };
    }

    // On desktop, we will also offer the APK download.
    const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      buttonText = "Download APK";
      description = "Download the APK for your Android device.";
      buttonAction = () => {
        window.location.href = "/MediQuest.apk";
      };
    }


    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hero-card p-8 md:col-span-1"
      >
        <Download className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
        <h3 className="text-2xl font-semibold mb-4">Get the App</h3>
        <p className="text-muted-foreground mb-6">
          {description}
        </p>
        <Button onClick={buttonAction} className="w-full rounded-full bg-primary/90 hover:bg-primary animate-glow">
          {buttonText}
        </Button>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 -z-10" />

      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />

      <div className="mt-36 mb-10 container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6 gradient-text"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Health, Our Priority
            <span className="text-xl md:text-3xl mb-12 text-purple-950 dark:text-sky-300">
              <Typewriter
                options={{
                  strings: [
                    "Analyze Medical Reports with AI",
                    "Predict Diseases from Symptoms",
                    "Get Detailed Medicine Information",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 80,
                }}
              />
            </span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            {renderDownloadCard()}

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-card p-8"
            >
              <FileSearch className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
              <h3 className="text-2xl font-semibold mb-4">Report Analyzer</h3>
              <p className="text-muted-foreground mb-6">
                Upload your medical reports and get instant AI-powered analysis
                in simple terms.
              </p>
              <Link href="/report-analyzer">
                <Button className="w-full rounded-full bg-primary/90 hover:bg-primary animate-glow">
                  Try Now
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hero-card p-8"
            >
              <Brain className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
              <h3 className="text-2xl font-semibold mb-4">Disease Predictor</h3>
              <p className="text-muted-foreground mb-6">
                Input your symptoms and get AI-based predictions for potential
                health conditions.
              </p>
              <Link href="/disease-predictor">
                <Button className="w-full rounded-full bg-primary/90 hover:bg-primary animate-glow">
                  Check Now
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="hero-card p-8"
            >
              <Pill className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
              <h3 className="text-2xl font-semibold mb-4">Medicine Details</h3>
              <p className="text-muted-foreground mb-6">
                Get comprehensive information about medications, side effects,
                and alternatives.
              </p>
              <Link href="/medicine-details">
                <Button className="w-full rounded-full bg-primary/90 hover:bg-primary animate-glow">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button className="rounded-full text-lg px-12 py-6 bg-primary/90 hover:bg-primary animate-glow" size="lg">
              Get Started
            </Button>
            <Link href="#features">
              <Button
                variant="outline"
                className="rounded-full text-lg px-12 py-6 border-2 hover:bg-primary/10 transition-colors duration-300"
                size="lg"
              >
                Explore Features
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
