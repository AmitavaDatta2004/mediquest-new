
"use client";

import { useState } from "react";
import { Upload, MapPin, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReportAnalysis } from "@/components/report-analysis";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface AnalysisResponse {
  error?: string;
  code?: string;
  summary?: string;
  criticalFindings?: string[];
  keyFindingsSummary?: string;
  abnormalFindings?: string[];
  normalFindings?: string[];
  healthIssuesSummary?: string;
  commonHealthIssues?: string[];
  severeHealthIssues?: string[];
  specialistsSummary?: string;
  urgentSpecialists?: string[];
  soonSpecialists?: string[];
  routineSpecialists?: string[];
  medicationsSummary?: string;
  prescriptionMedications?: string[];
  OTCMedications?: string[];
  metadata?: {
    analyzedAt: string;
    fileType: string;
    fileName: string;
  };
}

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [language, setLanguage] = useState("english");
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileSelection(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length > 0) {
      handleFileSelection(selectedFiles);
    }
  };

  const handleFileSelection = (selectedFiles: File[]) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    const newFiles = [...files];
    const newPreviews = [...filePreviews];

    for (const file of selectedFiles) {
        if (!validTypes.includes(file.type)) {
          toast({
            title: "Invalid file type",
            description: `Skipping ${file.name}. Please upload a JPG, PNG, or PDF file.`,
            variant: "destructive",
          });
          continue;
        }

        if (file.size > maxSize) {
          toast({
            title: "File too large",
            description: `Skipping ${file.name}. Maximum file size is 10MB.`,
            variant: "destructive",
          });
          continue;
        }
        
        if (!files.some(f => f.name === file.name)) {
            newFiles.push(file);
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string);
                    setFilePreviews([...newPreviews]);
                };
                reader.readAsDataURL(file);
            } else {
                 newPreviews.push("pdf"); // Placeholder for PDF icon/preview
            }
        }
    }
    
    setFiles(newFiles);
    setFilePreviews(newPreviews);
    setAnalysis(null);
    setUploadProgress(0);
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setFilePreviews(filePreviews.filter((_, i) => i !== index));
  }

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
              toast({
                title: "Location Error",
                description: "Could not determine your location.",
                variant: "destructive",
              });
            }
          } catch (error) {
            toast({
              title: "Location Error",
              description: "Could not determine your location.",
              variant: "destructive",
            });
          }
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to retrieve your location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };


  const analyzeReport = async () => {
    if (files.length === 0 || !location) return;

    setLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append("files", file);
      })
      formData.append("language", language);
      formData.append("location", location);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze report');
      }

      const data: AnalysisResponse = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "Your medical report has been successfully analyzed.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze the report. Please try again.",
        variant: "destructive",
      });
      setAnalysis(null);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Language</label>
        <select
          className="w-full p-2 border rounded-md mt-2 bg-background"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={loading}
        >
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="bengali">Bengali</option>
          <option value="Urdu">Urdu</option>
          <option value="Tamil">Tamil</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
        </select>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">Enter Location</label>
        <div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
          <input
            type="text"
            className="w-full p-2 border rounded-md bg-background"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your city, country"
            disabled={loading}
          />
          <Button onClick={handleUseLocation} variant="outline" size="icon" className="h-10 w-10 flex-shrink-0" disabled={loading}>
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
        <div
          className={`mt-4 border-2 border-dashed rounded-lg p-8 md:p-12 text-center cursor-pointer transition-colors ${loading
            ? "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
            : "border-gray-300 dark:border-gray-600 hover:border-primary"
            }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => !loading && document.getElementById("file-input")?.click()}
        >
          <input
            type="file"
            id="file-input"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileSelect}
            disabled={loading}
            multiple
          />
          <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {loading
              ? "Analyzing your report..."
              : "Drag and drop your medical reports here, or click to select files"}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            Supports JPG, PNG, and PDF up to 10MB
          </p>
        </div>

        {loading && (
          <div className="mt-4 space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Analyzing your medical report...
            </p>
          </div>
        )}

        {filePreviews.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                    <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    {files[index].type.startsWith('image/') ? (
                        <Image
                            src={preview}
                            alt={`Report preview ${index + 1}`}
                            fill
                            className="object-contain"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <FileText className="w-12 h-12 text-gray-400"/>
                            <span className="text-xs text-center p-1 text-gray-500 truncate">{files[index].name}</span>
                        </div>
                    )}
                    </div>
                    <button 
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove file"
                        disabled={loading}
                    >
                        <X className="w-4 h-4"/>
                    </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && !loading && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={analyzeReport}
              disabled={loading || !location || files.length === 0}
              className="w-full sm:w-auto text-lg px-8 py-6"
            >
              {loading ? "Analyzing..." : `Analyze ${files.length} File(s)`}
            </Button>
          </div>
        )}
      </Card>

      {analysis && (
        <ReportAnalysis
          key={language}
          analysis={{
            ...analysis,
            summary: analysis.summary || "",
            criticalFindings: analysis.criticalFindings || [],
            keyFindingsSummary: analysis.keyFindingsSummary || "",
            abnormalFindings: analysis.abnormalFindings || [],
            normalFindings: analysis.normalFindings || [],
            healthIssuesSummary: analysis.healthIssuesSummary || "",
            commonHealthIssues: analysis.commonHealthIssues || [],
            severeHealthIssues: analysis.severeHealthIssues || [],
            specialistsSummary: analysis.specialistsSummary || "",
            urgentSpecialists: analysis.urgentSpecialists || [],
            soonSpecialists: analysis.soonSpecialists || [],
            routineSpecialists: analysis.routineSpecialists || [],
            medicationsSummary: analysis.medicationsSummary || "",
            prescriptionMedications: analysis.prescriptionMedications || [],
            OTCMedications: analysis.OTCMedications || [],
          }}
          location={location}
        />
      )}
    </div>
  );
}
