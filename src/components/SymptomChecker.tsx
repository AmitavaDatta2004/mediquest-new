
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { geminiAPI } from "@/lib/gemini";
import {
  AlertCircle,
  Plus,
  Loader2,
  Pill,
  Apple,
  Stethoscope,
  Shield,
  Brain,
  Dumbbell,
  HeartPulse,
  Waves,
  MapPin,
  X,
} from "lucide-react";

const commonSymptoms = [
  "Fever",
  "Headache",
  "Cough",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest Pain",
  "Shortness of Breath",
  "Body Aches",
  "Sore Throat",
];

const languages = ["English", "Spanish", "French", "German", "Chinese", "Hindi", "Bengali","Tamil","Urdu"];

interface Disease {
  name: string;
  probability: number;
  description: string;
  causes?: string[];
  precautions?: string[];
}

interface Medications {
  otc: string[];
  prescribed: string[];
}

interface DietPlan {
  recommended: string[];
  avoid: string[];
}

interface Doctor {
  name: string;
  speciality: string;
  location: string;
}

interface AnalysisResult {
  diseases: Disease[];
  medications: Medications;
  dietPlan: DietPlan;
  workouts: string[];
  doctors: Doctor[];
}

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState("");
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [healthQuestions, setHealthQuestions] = useState({
    chronicIllnesses: "",
    medicationsAllergies: "",
    surgeriesVaccinations: "",
    lifestyle: "",
    sleepPattern: "",
  });

  const handleAddSymptom = () => {
    if (newSymptom && !symptoms.includes(newSymptom)) {
      setSymptoms([...symptoms, newSymptom]);
      setNewSymptom("");
    }
  };

  const handleRemoveSymptom = (symptomToRemove: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptomToRemove));
  };

  const handleCommonSymptomClick = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    } else {
      handleRemoveSymptom(symptom);
    }
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village;
            const country = data.address.country;
            if (city && country) {
              setLocation(`${city}, ${country}`);
            } else {
              setError("Could not determine location.");
            }
          } catch (error) {
            setError("Could not determine location.");
          }
        },
        () => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) {
      setError("Please add at least one symptom.");
      return;
    }
  
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setError("Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.");
      return;
    }
  
    setLoading(true);
    setError(null);
    setResult(null);
  
    try {
      const analysis: AnalysisResult = await geminiAPI.analyzeSymptomsAndGetDiseases(symptoms, 3, language, location, healthQuestions);
      console.log("Analysis result:", analysis);
      setResult(analysis);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to analyze symptoms. Please try again.");
      } else {
        setError("Failed to analyze symptoms. Please try again.");
      }
      console.error("Error fetching analysis:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Symptom Input Section */}
      <div className="space-y-6">
        <Select onValueChange={setLanguage} value={language}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang} className="text-base">
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location (e.g., City, Country)"
            className="h-12 text-base md:text-lg flex-grow"
          />
          <Button onClick={handleUseLocation} variant="outline" size="icon" className="h-12 w-12 flex-shrink-0">
            <MapPin className="h-5 w-5" />
          </Button>
        </div>


        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={newSymptom}
            onChange={(e) => setNewSymptom(e.target.value)}
            placeholder="Type a symptom..."
            onKeyPress={(e) => e.key === "Enter" && handleAddSymptom()}
            className="h-12 text-base md:text-lg"
          />
          <Button 
            onClick={handleAddSymptom} 
            disabled={!newSymptom.trim()} 
            size="lg"
            className="w-full sm:w-auto h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add
          </Button>
        </div>

        {/* Common Symptoms */}
        <div className="space-y-3">
          <h3 className="text-base md:text-lg font-medium text-muted-foreground">Common Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Button
                key={symptom}
                variant={symptoms.includes(symptom) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCommonSymptomClick(symptom)}
                className={`transition-all duration-200 rounded-full ${
                  symptoms.includes(symptom) 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'bg-background/50 text-foreground'
                }`}
              >
                {symptom}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Symptoms */}
        {symptoms.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-medium text-muted-foreground">Selected Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <div
                  key={symptom}
                  className="flex items-center gap-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-full px-3 py-1 text-sm font-medium"
                >
                  <span>{symptom}</span>
                  <button
                    onClick={() => handleRemoveSymptom(symptom)}
                    className="text-blue-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Health Questions */}
        <div className="space-y-4">
          <h3 className="text-base md:text-lg font-medium text-muted-foreground">Health Questions</h3>
          <Input
            value={healthQuestions.chronicIllnesses}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, chronicIllnesses: e.target.value })}
            placeholder="Any chronic illnesses or family history?"
            className="h-12 text-base md:text-lg"
          />
          <Input
            value={healthQuestions.medicationsAllergies}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, medicationsAllergies: e.target.value })}
            placeholder="Current medications or known allergies?"
            className="h-12 text-base md:text-lg"
          />
          <Input
            value={healthQuestions.surgeriesVaccinations}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, surgeriesVaccinations: e.target.value })}
            placeholder="Recent surgeries or vaccinations?"
            className="h-12 text-base md:text-lg"
          />
          <Input
            value={healthQuestions.lifestyle}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, lifestyle: e.target.value })}
            placeholder="Lifestyle factors (stress, smoking, etc.)?"
            className="h-12 text-base md:text-lg"
          />
          <Input
            value={healthQuestions.sleepPattern}
            onChange={(e) => setHealthQuestions({ ...healthQuestions, sleepPattern: e.target.value })}
            placeholder="Describe your sleep pattern."
            className="h-12 text-base md:text-lg"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <Button
          onClick={analyzeSymptoms}
          disabled={loading || symptoms.length === 0}
          size="lg"
          className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Analyzing your symptoms...
            </>
          ) : (
            <>
              <Brain className="h-5 w-5 mr-2" />
              Analyze Symptoms
            </>
          )}
        </Button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
          <Tabs defaultValue="diseases" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-blue-100/50 dark:bg-card/60 p-1 rounded-lg h-auto">
                <TabsTrigger value="diseases" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary/20 data-[state=active]:text-blue-600 capitalize">
                  <HeartPulse className="h-4 w-4 mr-1 md:mr-2" />
                  Diseases
                </TabsTrigger>
                <TabsTrigger value="precautions" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary/20 data-[state=active]:text-blue-600 capitalize">
                  <Shield className="h-4 w-4 mr-1 md:mr-2" />
                  Precautions
                </TabsTrigger>
                <TabsTrigger value="medications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary/20 data-[state=active]:text-blue-600 capitalize">
                  <Pill className="h-4 w-4 mr-1 md:mr-2" />
                  Medications
                </TabsTrigger>
                <TabsTrigger value="diet" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary/20 data-[state=active]:text-blue-600 capitalize">
                  <Apple className="h-4 w-4 mr-1 md:mr-2" />
                  Diet
                </TabsTrigger>
                <TabsTrigger value="workouts" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary/20 data-[state=active]:text-blue-600 capitalize">
                  <Dumbbell className="h-4 w-4 mr-1 md:mr-2" />
                  Workouts
                </TabsTrigger>
                <TabsTrigger value="doctors" className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary/20 data-[state=active]:text-blue-600 capitalize">
                  <Stethoscope className="h-4 w-4 mr-1 md:mr-2" />
                  Doctors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="diseases" className="space-y-6 mt-4">
                {result.diseases?.map((disease: Disease, index: number) => (
                  <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-white/20 dark:border-border hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                        <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                          {disease.name}
                        </h3>
                        <div className="relative flex-shrink-0">
                          <div className="relative px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-card/70 backdrop-blur-sm">
                            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                              {Math.round(disease.probability * 100)}% Confidence
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                        {disease.description}
                      </p>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="precautions" className="space-y-6 mt-4">
                 {result.diseases?.map((disease: Disease, index: number) => (
                    <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-white/20 dark:border-border">
                        <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                          {disease.name} - Precautions
                        </h3>
                        <ul className="space-y-2">
                          {disease.precautions?.map((precaution: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <Shield className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                              <p className="text-muted-foreground text-base">{precaution}</p>
                            </li>
                          ))}
                        </ul>
                    </Card>
                ))}
              </TabsContent>

              <TabsContent value="medications" className="space-y-6 mt-4">
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-white/20 dark:border-border">
                    <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                        Over-the-Counter
                    </h3>
                    <ul className="space-y-2 mb-6">
                        {result.medications?.otc?.map((med: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <Pill className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground text-base">{med}</p>
                        </li>
                        ))}
                    </ul>

                    <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 pt-6 border-t border-blue-100 dark:border-blue-900/50">
                        Prescription
                    </h3>
                    <ul className="space-y-2">
                        {result.medications?.prescribed?.map((med: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <Pill className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground text-base">{med}</p>
                        </li>
                        ))}
                    </ul>
                </Card>
              </TabsContent>
              
               <TabsContent value="diet" className="space-y-6 mt-4">
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-white/20 dark:border-border">
                    <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
                        Recommended Foods
                    </h3>
                    <ul className="space-y-2 mb-6">
                        {result.dietPlan?.recommended?.map((food: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <Apple className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground text-base">{food}</p>
                        </li>
                        ))}
                    </ul>

                    <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600 mb-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        Foods to Avoid
                    </h3>
                    <ul className="space-y-2">
                        {result.dietPlan?.avoid?.map((food: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground text-base">{food}</p>
                        </li>
                        ))}
                    </ul>
                </Card>
              </TabsContent>

              <TabsContent value="workouts" className="space-y-6 mt-4">
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-white/20 dark:border-border">
                    <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                        Recommended Exercises
                    </h3>
                    <ul className="space-y-2">
                        {result.workouts?.map((workout: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <Dumbbell className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground text-base">{workout}</p>
                        </li>
                        ))}
                    </ul>
                </Card>
              </TabsContent>

              <TabsContent value="doctors" className="space-y-6 mt-4">
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-white/20 dark:border-border">
                    <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                        Recommended Doctors
                    </h3>
                    <ul className="space-y-2">
                        {result.doctors?.map((doctor: Doctor, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <Stethoscope className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground text-base">{doctor.name} - {doctor.speciality}</p>
                        </li>
                        ))}
                    </ul>
                </Card>
              </TabsContent>
            </Tabs>
        </div>
      )}
    </div>
  );
}

    