
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Search, MapPin } from "lucide-react";
import { MedicineDetails } from "@/components/medicine-details";
import { useMedicineInfo } from "@/hooks/use-medicine-info";
import { motion } from "framer-motion";

interface MedicineSearchProps {
  selectedLanguage: string; // Accepting language as a prop
}

export function MedicineSearch({ selectedLanguage }: MedicineSearchProps) {
  const [medicineName, setMedicineName] = useState("");
  const [location, setLocation] = useState(""); // Location state
  const { fetchMedicineInfo, medicineData, isLoading, error } = useMedicineInfo();

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
              // Handle case where location details are not found
            }
          } catch (error) {
            // Handle fetch error
          }
        },
        () => {
          // Handle geolocation error
        }
      );
    } else {
      // Handle no geolocation support
    }
  };


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim() || !location.trim()) return; // Ensure both fields are filled
    await fetchMedicineInfo(medicineName, selectedLanguage, location); // Pass location
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-4 md:p-6 backdrop-blur-lg bg-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 border-t border-l border-white/20">
          <form onSubmit={handleSearch} className="space-y-4 mb-8">
            <Input
              placeholder={`Enter medicine name (${selectedLanguage})...`}
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="h-12 text-base md:text-lg bg-white/50 backdrop-blur-sm border-white/20 focus:border-blue-400 transition-all duration-300"
            />
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Input
                placeholder="Enter your location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 text-base md:text-lg flex-grow bg-white/50 backdrop-blur-sm border-white/20 focus:border-blue-400 transition-all duration-300"
              />
               <Button onClick={handleUseLocation} variant="outline" size="icon" className="h-12 w-12 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </Button>
            </div>


            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {medicineData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MedicineDetails data={medicineData} />
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
