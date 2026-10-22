import { useEffect, useState } from 'react';
import './App.css';
import FarmTwin3D from './FarmTwin3D';
import Notifications from './Notifications';
import Auth from './Auth';
import Profile from './Profile';


const translations = {
  English: {
    dashboard: "Dashboard",
    digitalTwin: "Digital Twin",
    cropAnalysis: "Crop Analysis",
    weatherAnalysis: "Weather Analysis",
    cropRecommendation: "Crop Recommendation",
    marketPrediction: "Market Prediction",
    notifications: "Notifications",
    voiceAssistant: "Voice Assistant",
    profileSettings: "Profile & Settings",
    home: "Back to Home",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    getStarted: "Get Started",
   welcome: "Welcome to your digital farm 🌱",
welcomeMessage: "Welcome to your digital farm",
dashboardDescription: "Monitor your farm with live weather and crop insights.",
farmLocation: "Farm Location",
loadingLocation: "Loading location...",
liveTemperature: "Live Temperature",
humidity: "Humidity",
precipitation: "Precipitation",
liveWeather: "Live weather reading",
lastWeedAnalysis: "Last Weed Analysis",
notAnalyzed: "Not analyzed",
latestImage: "Based on your latest uploaded image",
uploadImageHint: "Upload an image in Crop Analysis",
farmOverview: "Farm Overview",
weatherAvailable: "Live data available",
loadingWeather: "Loading live data...",
dataUnavailable: "Data unavailable",
cropAnalysisStatus: "Crop Analysis Status",
cropRecommendationStatus: "Crop Recommendations Status",
marketDataStatus: "Market Data Status",
weatherObservation: "Weather Observation Time",
weather: "Weather",
language: "Language",
weatherSource: "Source: Open-Meteo",
weeds: "weeds",
weedResultsAvailable: "Weed detection results available",
noWeedAnalysis: "No weed analysis completed yet",
recommendationsAvailable: "Recommendations available",
runCropRecommendation: "Run Crop Recommendation to view results",
pricesLoaded: "prices loaded",
selectCommodity: "Select a commodity in Market Prediction",
weatherTitle: "Weather Analysis",
weatherDescription: "Weather data from Open-Meteo for Bengaluru.",
temperature: "Temperature",
windSpeed: "Wind Speed",
locationLabel: "Location",
observationTime: "Observation time",
sourceLabel: "Source",
weedDetection: "Weed Detection",
weedDescription: "Upload a crop-field image to detect possible weeds using AI.",
uploadFieldImage: "Upload field image (JPG, PNG, WEBP)",
selectedImage: "Selected Image",
detectingWeeds: "Detecting weeds...",
detectWeeds: "Detect Weeds",
selectImageError: "Please select a field image first.",
invalidImageError: "Please select a JPG, PNG, or WEBP image.",
imageSizeError: "Image must be 10 MB or less.",
detectionFailed: "Weed detection failed.",
backendConnectionError: "Could not connect to the backend.",
detectionResults: "Detection Results",
totalDetections: "Total Detections",
weedsDetected: "Weeds Detected",
aiDetectionImage: "AI Detection Image",
individualDetections: "Individual Detections",
noObjectsDetected: "No objects were detected in this image.",
detectedClass: "Detected Class",
confidence: "Confidence",
cropRecommendationTitle: "Crop Recommendation",
cropRecommendationDescription: "Find suitable crops based on your soil and weather conditions.",
soilTypeLabel: "Soil Type",
selectSoilType: "Select soil type",
soilPhLabel: "Soil pH",
nitrogenLabel: "Nitrogen (N)",
phosphorusLabel: "Phosphorus (P)",
potassiumLabel: "Potassium (K)",
recommendCropButton: "Recommend Crops",
analyzingCrops: "Analyzing conditions...",
recommendationResults: "Recommended Crops",
suitabilityScore: "Suitability Score",
recommendationReason: "Why this crop?",
noRecommendations: "No recommendations available.",
recommendationError: "Could not generate crop recommendations.",
enterFarmConditions: "Enter your farm conditions to discover suitable crops.",
soilMoistureLabel: "Soil Moisture (%)",
findingSuitableCrops: "Finding suitable crops...",
rankedCropSuggestions: "Ranked Crop Suggestions",
topMatch: "Top match",
rankLabel: "Rank",
thingsToVerify: "Things to verify",
marketPricesTitle: "Market Prices",
marketPricesDescription: "Reported mandi prices for selected commodities in Karnataka.",
commodityLabel: "Commodity",
loadingPrices: "Loading prices...",
getMarketPrices: "Get Market Prices",
marketLoadError: "Unable to load market prices.",
noMarketRecords: "No market records were returned for this commodity.",
marketLabel: "Market",
districtLabel: "District",
dateLabel: "Date",
minPriceLabel: "Min Price",
modalPriceLabel: "Modal Price",
maxPriceLabel: "Max Price",
sourceLabel: "Source",
marketPriceWarning: "These are reported prices, not future predictions. Verify the price units and dates before relying on them.",

aiChatbot: "AI Chatbot",
aiChatTitle: "FarmTwin AI",
aiChatDescription: "Your intelligent farming companion",
aiChatHelp: "Ask questions about crops, soil, irrigation, pests, and farming practices.",
openChatbot: "Open Chatbot",
voiceAssistant: "Voice Assistant",
voiceAssistantDescription: "Speak naturally and get spoken answers to your farming questions.",
openVoiceAssistant: "Open Voice Assistant",
aiChatTitle: "FarmTwin AI",

  },

  Hindi: {
    dashboard: "डैशबोर्ड",
    digitalTwin: "डिजिटल ट्विन",
    cropAnalysis: "फसल विश्लेषण",
    weatherAnalysis: "मौसम विश्लेषण",
    cropRecommendation: "फसल सुझाव",
    marketPrediction: "बाज़ार पूर्वानुमान",
    notifications: "सूचनाएँ",
    voiceAssistant: "वॉइस असिस्टेंट",
    profileSettings: "प्रोफ़ाइल और सेटिंग्स",
    home: "होम पर वापस जाएँ",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    getStarted: "शुरू करें",
    welcome: "आपके डिजिटल फार्म में आपका स्वागत है 🌱",
    welcomeMessage: "आपके डिजिटल खेत में आपका स्वागत है",
    loadingLocation: "स्थान लोड हो रहा है...",
liveTemperature: "वर्तमान तापमान",
humidity: "आर्द्रता",
precipitation: "वर्षण",
liveWeather: "लाइव मौसम जानकारी",
lastWeedAnalysis: "पिछले खरपतवार का विश्लेषण",
notAnalyzed: "विश्लेषण नहीं किया गया",
latestImage: "आपकी हाल ही में अपलोड की गई छवि के आधार पर",
uploadImageHint: "क्रॉप विश्लेषण में एक छवि अपलोड करें",
    farmOverview: "फार्म का अवलोकन",
    weatherAvailable: "लाइव डेटा उपलब्ध है",
loadingWeather: "लाइव डेटा लोड हो रहा है...",
dataUnavailable: "डेटा उपलब्ध नहीं है",
cropAnalysisStatus: "फसल विश्लेषण की स्थिति",
cropRecommendationStatus: "फसल अनुशंसाओं की स्थिति",
marketDataStatus: "बाज़ार डेटा की स्थिति",
weatherObservation: "मौसम अवलोकन का समय",
language: "भाषा",
weatherSource: "स्रोत: Open-Meteo",
weeds: "खरपतवार",
weedResultsAvailable: "खरपतवार पहचान के परिणाम उपलब्ध हैं",
noWeedAnalysis: "अभी तक खरपतवार विश्लेषण पूरा नहीं हुआ है",
recommendationsAvailable: "फसल की सिफारिशें उपलब्ध हैं",
runCropRecommendation: "परिणाम देखने के लिए फसल की सिफारिश चलाएँ",
pricesLoaded: "कीमतें लोड हो गई हैं",
selectCommodity: "बाज़ार पूर्वानुमान में एक फसल चुनें",
weatherTitle: "मौसम विश्लेषण",
weatherDescription: "बेंगलुरु के लिए Open-Meteo से मौसम डेटा।",
temperature: "तापमान",
windSpeed: "हवा की गति",
locationLabel: "स्थान",
observationTime: "अवलोकन का समय",
sourceLabel: "स्रोत",
weedDetection: "खरपतवार की पहचान",
weedDescription: "AI की मदद से संभावित खरपतवारों की पहचान करने के लिए खेत की तस्वीर अपलोड करें।",
uploadFieldImage: "खेत की तस्वीर अपलोड करें (JPG, PNG, WEBP)",
selectedImage: "चुनी गई तस्वीर",
detectingWeeds: "खरपतवार की पहचान हो रही है...",
detectWeeds: "खरपतवार पहचानें",
selectImageError: "कृपया पहले खेत की तस्वीर चुनें।",
invalidImageError: "कृपया JPG, PNG या WEBP तस्वीर चुनें।",
imageSizeError: "तस्वीर का आकार 10 MB या उससे कम होना चाहिए।",
detectionFailed: "खरपतवार की पहचान विफल रही।",
backendConnectionError: "बैकएंड से कनेक्ट नहीं हो सका।",
detectionResults: "पहचान के परिणाम",
totalDetections: "कुल पहचान",
weedsDetected: "पहचाने गए खरपतवार",
aiDetectionImage: "AI पहचान की तस्वीर",
individualDetections: "अलग-अलग पहचान",
noObjectsDetected: "इस तस्वीर में कोई वस्तु नहीं मिली।",
detectedClass: "पहचानी गई श्रेणी",
confidence: "विश्वास स्तर",
cropRecommendationTitle: "फसल की सिफारिश",
cropRecommendationDescription: "मिट्टी और मौसम की स्थिति के आधार पर उपयुक्त फसलें खोजें।",
soilTypeLabel: "मिट्टी का प्रकार",
selectSoilType: "मिट्टी का प्रकार चुनें",
soilPhLabel: "मिट्टी का pH",
nitrogenLabel: "नाइट्रोजन (N)",
phosphorusLabel: "फॉस्फोरस (P)",
potassiumLabel: "पोटैशियम (K)",
recommendCropButton: "फसलों की सिफारिश करें",
analyzingCrops: "स्थितियों का विश्लेषण हो रहा है...",
recommendationResults: "अनुशंसित फसलें",
suitabilityScore: "उपयुक्तता स्कोर",
recommendationReason: "यह फसल क्यों?",
noRecommendations: "कोई सिफारिश उपलब्ध नहीं है।",
recommendationError: "फसल की सिफारिशें तैयार नहीं हो सकीं।",
enterFarmConditions: "उपयुक्त फसलें खोजने के लिए अपने खेत की स्थितियाँ दर्ज करें।",
soilMoistureLabel: "मिट्टी की नमी (%)",
findingSuitableCrops: "उपयुक्त फसलें खोजी जा रही हैं...",
rankedCropSuggestions: "प्राथमिकता के अनुसार फसलें",
topMatch: "सबसे उपयुक्त",
rankLabel: "रैंक",
thingsToVerify: "जाँचने योग्य बातें",
marketPricesTitle: "बाज़ार मूल्य",
marketPricesDescription: "कर्नाटक की चुनी हुई फसलों के लिए मंडी में दर्ज मूल्य।",
commodityLabel: "फसल",
loadingPrices: "मूल्य लोड हो रहे हैं...",
getMarketPrices: "बाज़ार मूल्य प्राप्त करें",
marketLoadError: "बाज़ार मूल्य लोड नहीं हो सके।",
noMarketRecords: "इस फसल के लिए कोई बाज़ार रिकॉर्ड नहीं मिला।",
marketLabel: "मंडी",
districtLabel: "ज़िला",
dateLabel: "तारीख",
minPriceLabel: "न्यूनतम मूल्य",
modalPriceLabel: "प्रचलित मूल्य",
maxPriceLabel: "अधिकतम मूल्य",
sourceLabel: "स्रोत",
marketPriceWarning: "ये दर्ज किए गए मूल्य हैं, भविष्य के अनुमान नहीं। इन पर भरोसा करने से पहले मूल्य की इकाई और तारीख जाँच लें।",
aiChatbot: "AI चैटबॉट",
aiChatTitle: "FarmTwin AI",
aiChatDescription: "आपका स्मार्ट खेती सहायक",
aiChatHelp: "फसलों, मिट्टी, सिंचाई, कीटों और खेती के तरीकों के बारे में सवाल पूछें।",
openChatbot: "चैटबॉट खोलें",
voiceAssistant: "वॉइस असिस्टेंट",
voiceAssistantDescription: "स्वाभाविक रूप से बोलें और खेती से जुड़े सवालों के जवाब आवाज़ में पाएं।",
openVoiceAssistant: "वॉइस असिस्टेंट खोलें",
aiChatTitle: "फार्मट्विन AI",
  },

  Kannada: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    digitalTwin: "ಡಿಜಿಟಲ್ ಟ್ವಿನ್",
    cropAnalysis: "ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ",
    weatherAnalysis: "ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ",
    cropRecommendation: "ಬೆಳೆ ಶಿಫಾರಸು",
    marketPrediction: "ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆ",
    notifications: "ಅಧಿಸೂಚನೆಗಳು",
    voiceAssistant: "ಧ್ವನಿ ಸಹಾಯಕ",
    profileSettings: "ಪ್ರೊಫೈಲ್ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    home: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    lightMode: "ಲೈಟ್ ಮೋಡ್",
    darkMode: "ಡಾರ್ಕ್ ಮೋಡ್",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    welcome: "ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಫಾರ್ಮ್‌ಗೆ ಸ್ವಾಗತ 🌱",
    welcomeMessage: "ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಕೃಷಿಭೂಮಿಗೆ ಸ್ವಾಗತ",
    loadingLocation: "ಸ್ಥಳ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
liveTemperature: "ಪ್ರಸ್ತುತ ತಾಪಮಾನ",
humidity: "ಆರ್ದ್ರತೆ",
precipitation: "ಮಳೆಪಾತ",
liveWeather: "ನೇರ ಹವಾಮಾನ ಮಾಹಿತಿ",
lastWeedAnalysis: "ಕೊನೆಯ ಕಳೆ ವಿಶ್ಲೇಷಣೆ",
notAnalyzed: "ವಿಶ್ಲೇಷಣೆ ಮಾಡಲಾಗಿಲ್ಲ",
latestImage: "ನೀವು ಇತ್ತೀಚೆಗೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರದ ಆಧಾರದ ಮೇಲೆ",
uploadImageHint: "ಬೆಳೆ ವಿಶ್ಲೇಷಣೆಯಲ್ಲಿ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    farmOverview: "ಫಾರ್ಮ್ ಅವಲೋಕನ",
    weatherAvailable: "ನೇರ ಡೇಟಾ ಲಭ್ಯವಿದೆ",
loadingWeather: "ನೇರ ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
dataUnavailable: "ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ",
cropAnalysisStatus: "ಬೆಳೆ ವಿಶ್ಲೇಷಣೆಯ ಸ್ಥಿತಿ",
cropRecommendationStatus: "ಬೆಳೆ ಶಿಫಾರಸುಗಳ ಸ್ಥಿತಿ",
marketDataStatus: "ಮಾರುಕಟ್ಟೆ ಡೇಟಾದ ಸ್ಥಿತಿ",
weatherObservation: "ಹವಾಮಾನ ವೀಕ್ಷಣೆಯ ಸಮಯ",
    language: "ಭಾಷೆ",
    weatherSource: "ಮೂಲ: Open-Meteo",
weeds: "ಕಳೆಗಳು",
weedResultsAvailable: "ಕಳೆ ಪತ್ತೆ ಫಲಿತಾಂಶಗಳು ಲಭ್ಯವಿವೆ",
noWeedAnalysis: "ಇನ್ನೂ ಕಳೆ ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿಲ್ಲ",
recommendationsAvailable: "ಬೆಳೆ ಶಿಫಾರಸುಗಳು ಲಭ್ಯವಿವೆ",
runCropRecommendation: "ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಲು ಬೆಳೆ ಶಿಫಾರಸನ್ನು ಚಲಾಯಿಸಿ",
pricesLoaded: "ಬೆಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗಿದೆ",
selectCommodity: "ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆಯಲ್ಲಿ ಒಂದು ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
weatherTitle: "ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ",
weatherDescription: "ಬೆಂಗಳೂರಿನ ಹವಾಮಾನ ಮಾಹಿತಿ Open-Meteo ನಿಂದ.",
temperature: "ತಾಪಮಾನ",
windSpeed: "ಗಾಳಿಯ ವೇಗ",
locationLabel: "ಸ್ಥಳ",
observationTime: "ವೀಕ್ಷಣೆಯ ಸಮಯ",
sourceLabel: "ಮೂಲ",
weedDetection: "ಕಳೆ ಪತ್ತೆ",
weedDescription: "AI ಬಳಸಿ ಕಳೆಗಳನ್ನು ಗುರುತಿಸಲು ಹೊಲದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
uploadFieldImage: "ಹೊಲದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (JPG, PNG, WEBP)",
selectedImage: "ಆಯ್ಕೆ ಮಾಡಿದ ಚಿತ್ರ",
detectingWeeds: "ಕಳೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
detectWeeds: "ಕಳೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ",
selectImageError: "ದಯವಿಟ್ಟು ಮೊದಲು ಹೊಲದ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
invalidImageError: "ದಯವಿಟ್ಟು JPG, PNG ಅಥವಾ WEBP ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
imageSizeError: "ಚಿತ್ರದ ಗಾತ್ರ 10 MB ಅಥವಾ ಅದಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು.",
detectionFailed: "ಕಳೆ ಪತ್ತೆ ವಿಫಲವಾಗಿದೆ.",
backendConnectionError: "ಬ್ಯಾಕೆಂಡ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
detectionResults: "ಪತ್ತೆ ಫಲಿತಾಂಶಗಳು",
totalDetections: "ಒಟ್ಟು ಪತ್ತೆಗಳು",
weedsDetected: "ಪತ್ತೆಯಾದ ಕಳೆಗಳು",
aiDetectionImage: "AI ಪತ್ತೆ ಚಿತ್ರ",
individualDetections: "ಪ್ರತ್ಯೇಕ ಪತ್ತೆಗಳು",
noObjectsDetected: "ಈ ಚಿತ್ರದಲ್ಲಿ ಯಾವುದೇ ವಸ್ತುಗಳು ಪತ್ತೆಯಾಗಿಲ್ಲ.",
detectedClass: "ಪತ್ತೆಯಾದ ವರ್ಗ",
confidence: "ವಿಶ್ವಾಸದ ಮಟ್ಟ",
cropRecommendationTitle: "ಬೆಳೆ ಶಿಫಾರಸು",
cropRecommendationDescription: "ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನದ ಆಧಾರದ ಮೇಲೆ ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ.",
soilTypeLabel: "ಮಣ್ಣಿನ ವಿಧ",
selectSoilType: "ಮಣ್ಣಿನ ವಿಧವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
soilPhLabel: "ಮಣ್ಣಿನ pH",
nitrogenLabel: "ಸಾರಜನಕ (N)",
phosphorusLabel: "ರಂಜಕ (P)",
potassiumLabel: "ಪೊಟ್ಯಾಸಿಯಮ್ (K)",
recommendCropButton: "ಬೆಳೆಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡಿ",
analyzingCrops: "ಪರಿಸ್ಥಿತಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
recommendationResults: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು",
suitabilityScore: "ಸೂಕ್ತತೆಯ ಅಂಕ",
recommendationReason: "ಈ ಬೆಳೆ ಏಕೆ?",
noRecommendations: "ಯಾವುದೇ ಶಿಫಾರಸುಗಳು ಲಭ್ಯವಿಲ್ಲ.",
recommendationError: "ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
enterFarmConditions: "ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಲು ನಿಮ್ಮ ಹೊಲದ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ನಮೂದಿಸಿ.",
soilMoistureLabel: "ಮಣ್ಣಿನ ತೇವಾಂಶ (%)",
findingSuitableCrops: "ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
rankedCropSuggestions: "ಶ್ರೇಣೀಕೃತ ಬೆಳೆ ಶಿಫಾರಸುಗಳು",
topMatch: "ಅತ್ಯುತ್ತಮ ಹೊಂದಾಣಿಕೆ",
rankLabel: "ಶ್ರೇಣಿ",
thingsToVerify: "ಪರಿಶೀಲಿಸಬೇಕಾದ ವಿಷಯಗಳು",
marketPricesTitle: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
marketPricesDescription: "ಕರ್ನಾಟಕದ ಆಯ್ದ ಬೆಳೆಗಳಿಗಾಗಿ ವರದಿಯಾದ ಮಂಡಿ ಬೆಲೆಗಳು.",
commodityLabel: "ಬೆಳೆ",
loadingPrices: "ಬೆಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
getMarketPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಿರಿ",
marketLoadError: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
noMarketRecords: "ಈ ಬೆಳೆಗೆ ಯಾವುದೇ ಮಾರುಕಟ್ಟೆ ದಾಖಲೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
marketLabel: "ಮಾರುಕಟ್ಟೆ",
districtLabel: "ಜಿಲ್ಲೆ",
dateLabel: "ದಿನಾಂಕ",
minPriceLabel: "ಕನಿಷ್ಠ ಬೆಲೆ",
modalPriceLabel: "ಮಾದರಿ ಬೆಲೆ",
maxPriceLabel: "ಗರಿಷ್ಠ ಬೆಲೆ",
sourceLabel: "ಮೂಲ",
marketPriceWarning: "ಇವು ವರದಿಯಾದ ಬೆಲೆಗಳು, ಭವಿಷ್ಯದ ಬೆಲೆ ಮುನ್ಸೂಚನೆಗಳಲ್ಲ. ಅವುಗಳನ್ನು ಬಳಸುವ ಮೊದಲು ಬೆಲೆಯ ಘಟಕ ಮತ್ತು ದಿನಾಂಕವನ್ನು ಪರಿಶೀಲಿಸಿ.",
aiChatbot: "AI ಚಾಟ್‌ಬಾಟ್",
aiChatTitle: "FarmTwin AI",
aiChatDescription: "ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ಕೃಷಿ ಸಹಾಯಕ",
aiChatHelp: "ಬೆಳೆಗಳು, ಮಣ್ಣು, ನೀರಾವರಿ, ಕೀಟಗಳು ಮತ್ತು ಕೃಷಿ ವಿಧಾನಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.",
openChatbot: "ಚಾಟ್‌ಬಾಟ್ ತೆರೆಯಿರಿ",
voiceAssistant: "ಧ್ವನಿ ಸಹಾಯಕ",
voiceAssistantDescription: "ಸಹಜವಾಗಿ ಮಾತನಾಡಿ, ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ಧ್ವನಿಯ ಮೂಲಕ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.",
openVoiceAssistant: "ಧ್ವನಿ ಸಹಾಯಕವನ್ನು ತೆರೆಯಿರಿ",
aiChatTitle: "ಫಾರ್ಮ್‌ಟ್ವಿನ್ AI",
  },

  Tamil: {
    dashboard: "டாஷ்போர்டு",
    digitalTwin: "டிஜிட்டல் ட்வின்",
    cropAnalysis: "பயிர் பகுப்பாய்வு",
    weatherAnalysis: "வானிலை பகுப்பாய்வு",
    cropRecommendation: "பயிர் பரிந்துரை",
    marketPrediction: "சந்தை முன்னறிவிப்பு",
    notifications: "அறிவிப்புகள்",
    voiceAssistant: "குரல் உதவியாளர்",
    profileSettings: "சுயவிவரம் மற்றும் அமைப்புகள்",
    home: "முகப்புக்குத் திரும்பு",
    lightMode: "லைட் மோடு",
    darkMode: "டார்க் மோடு",
    getStarted: "தொடங்குங்கள்",
    welcome: "உங்கள் டிஜிட்டல் பண்ணைக்கு வரவேற்கிறோம் 🌱",
    welcomeMessage: "உங்கள் டிஜிட்டல் பண்ணைக்கு வரவேற்கிறோம்",
    loadingLocation: "இடம் ஏற்றப்படுகிறது...",
liveTemperature: "தற்போதைய வெப்பநிலை",
humidity: "ஈரப்பதம்",
precipitation: "மழைப்பொழிவு",
liveWeather: "நேரடி வானிலைத் தகவல்",
lastWeedAnalysis: "கடைசி களை பகுப்பாய்வு",
notAnalyzed: "பகுப்பாய்வு செய்யப்படவில்லை",
latestImage: "நீங்கள் சமீபத்தில் பதிவேற்றிய படத்தின் அடிப்படையில்",
uploadImageHint: "பயிர் பகுப்பாய்வில் ஒரு படத்தைப் பதிவேற்றவும்",
    farmOverview: "பண்ணை மேலோட்டம்",
    weatherAvailable: "நேரடி தரவு கிடைக்கிறது",
loadingWeather: "நேரடி தரவு ஏற்றப்படுகிறது...",
dataUnavailable: "தரவு கிடைக்கவில்லை",
cropAnalysisStatus: "பயிர் பகுப்பாய்வு நிலை",
cropRecommendationStatus: "பயிர் பரிந்துரைகளின் நிலை",
marketDataStatus: "சந்தைத் தரவின் நிலை",
weatherObservation: "வானிலை பதிவான நேரம்",
    language: "மொழி",
    weatherSource: "மூலம்: Open-Meteo",
weeds: "களைகள்",
weedResultsAvailable: "களை கண்டறிதல் முடிவுகள் கிடைக்கின்றன",
noWeedAnalysis: "களை பகுப்பாய்வு இன்னும் முடிக்கப்படவில்லை",
recommendationsAvailable: "பயிர் பரிந்துரைகள் கிடைக்கின்றன",
runCropRecommendation: "முடிவுகளைக் காண பயிர் பரிந்துரையை இயக்கவும்",
pricesLoaded: "விலைகள் ஏற்றப்பட்டன",
selectCommodity: "சந்தை கணிப்பில் ஒரு பயிரைத் தேர்ந்தெடுக்கவும்",
weatherTitle: "வானிலை பகுப்பாய்வு",
weatherDescription: "பெங்களூருக்கான வானிலைத் தரவு Open-Meteo இலிருந்து.",
temperature: "வெப்பநிலை",
windSpeed: "காற்றின் வேகம்",
locationLabel: "இடம்",
observationTime: "பதிவான நேரம்",
sourceLabel: "மூலம்",
weedDetection: "களை கண்டறிதல்",
weedDescription: "AI மூலம் களைகளைக் கண்டறிய வயல்வெளிப் படத்தைப் பதிவேற்றவும்.",
uploadFieldImage: "வயல்வெளிப் படத்தைப் பதிவேற்றவும் (JPG, PNG, WEBP)",
selectedImage: "தேர்ந்தெடுக்கப்பட்ட படம்",
detectingWeeds: "களைகள் கண்டறியப்படுகின்றன...",
detectWeeds: "களைகளைக் கண்டறி",
selectImageError: "முதலில் வயல்வெளிப் படத்தைத் தேர்ந்தெடுக்கவும்.",
invalidImageError: "JPG, PNG அல்லது WEBP படத்தைத் தேர்ந்தெடுக்கவும்.",
imageSizeError: "படத்தின் அளவு 10 MB அல்லது அதற்குக் குறைவாக இருக்க வேண்டும்.",
detectionFailed: "களை கண்டறிதல் தோல்வியடைந்தது.",
backendConnectionError: "பின்தளத்துடன் இணைக்க முடியவில்லை.",
detectionResults: "கண்டறிதல் முடிவுகள்",
totalDetections: "மொத்த கண்டறிதல்கள்",
weedsDetected: "கண்டறியப்பட்ட களைகள்",
aiDetectionImage: "AI கண்டறிதல் படம்",
individualDetections: "தனிப்பட்ட கண்டறிதல்கள்",
noObjectsDetected: "இந்தப் படத்தில் எந்தப் பொருளும் கண்டறியப்படவில்லை.",
detectedClass: "கண்டறியப்பட்ட வகை",
confidence: "நம்பகத்தன்மை",
cropRecommendationTitle: "பயிர் பரிந்துரை",
cropRecommendationDescription: "மண் மற்றும் வானிலை நிலைகளின் அடிப்படையில் ஏற்ற பயிர்களைக் கண்டறியுங்கள்.",
soilTypeLabel: "மண் வகை",
selectSoilType: "மண் வகையைத் தேர்ந்தெடுக்கவும்",
soilPhLabel: "மண்ணின் pH",
nitrogenLabel: "நைட்ரஜன் (N)",
phosphorusLabel: "பாஸ்பரஸ் (P)",
potassiumLabel: "பொட்டாசியம் (K)",
recommendCropButton: "பயிர்களைப் பரிந்துரைக்கவும்",
analyzingCrops: "நிலைகள் பகுப்பாய்வு செய்யப்படுகின்றன...",
recommendationResults: "பரிந்துரைக்கப்பட்ட பயிர்கள்",
suitabilityScore: "பொருத்த மதிப்பெண்",
recommendationReason: "இந்தப் பயிர் ஏன்?",
noRecommendations: "பரிந்துரைகள் எதுவும் இல்லை.",
recommendationError: "பயிர் பரிந்துரைகளை உருவாக்க முடியவில்லை.",
enterFarmConditions: "ஏற்ற பயிர்களைக் கண்டறிய உங்கள் வயல் நிலைகளை உள்ளிடவும்.",
soilMoistureLabel: "மண்ணின் ஈரப்பதம் (%)",
findingSuitableCrops: "ஏற்ற பயிர்கள் தேடப்படுகின்றன...",
rankedCropSuggestions: "தரவரிசைப்படுத்தப்பட்ட பயிர் பரிந்துரைகள்",
topMatch: "சிறந்த பொருத்தம்",
rankLabel: "தரவரிசை",
thingsToVerify: "சரிபார்க்க வேண்டியவை",
marketPricesTitle: "சந்தை விலைகள்",
marketPricesDescription: "கர்நாடகத்தில் தேர்ந்தெடுக்கப்பட்ட பயிர்களுக்கான பதிவு செய்யப்பட்ட மண்டி விலைகள்.",
commodityLabel: "பயிர்",
loadingPrices: "விலைகள் ஏற்றப்படுகின்றன...",
getMarketPrices: "சந்தை விலைகளைப் பெறுக",
marketLoadError: "சந்தை விலைகளை ஏற்ற முடியவில்லை.",
noMarketRecords: "இந்தப் பயிருக்கு சந்தைப் பதிவுகள் எதுவும் கிடைக்கவில்லை.",
marketLabel: "சந்தை",
districtLabel: "மாவட்டம்",
dateLabel: "தேதி",
minPriceLabel: "குறைந்தபட்ச விலை",
modalPriceLabel: "சராசரி வர்த்தக விலை",
maxPriceLabel: "அதிகபட்ச விலை",
sourceLabel: "மூலம்",
marketPriceWarning: "இவை பதிவுசெய்யப்பட்ட விலைகள்; எதிர்கால விலை கணிப்புகள் அல்ல. பயன்படுத்துவதற்கு முன் விலை அலகையும் தேதியையும் சரிபார்க்கவும்.",
aiChatbot: "AI சாட்பாட்",
aiChatTitle: "FarmTwin AI",
aiChatDescription: "உங்கள் புத்திசாலித்தனமான விவசாய உதவியாளர்",
aiChatHelp: "பயிர்கள், மண், நீர்ப்பாசனம், பூச்சிகள் மற்றும் விவசாய முறைகள் பற்றி கேள்விகள் கேளுங்கள்.",
openChatbot: "சாட்பாட்டைத் திறக்கவும்",
voiceAssistant: "குரல் உதவியாளர்",
voiceAssistantDescription: "இயல்பாகப் பேசுங்கள்; விவசாயக் கேள்விகளுக்கான பதில்களை குரலில் பெறுங்கள்.",
openVoiceAssistant: "குரல் உதவியாளரைத் திறக்கவும்",
aiChatTitle: "ஃபார்ம்ட்வின் AI",
  },

  Telugu: {
    dashboard: "డాష్‌బోర్డ్",
    digitalTwin: "డిజిటల్ ట్విన్",
    cropAnalysis: "పంట విశ్లేషణ",
    weatherAnalysis: "వాతావరణ విశ్లేషణ",
    cropRecommendation: "పంట సిఫార్సు",
    marketPrediction: "మార్కెట్ అంచనా",
    notifications: "నోటిఫికేషన్లు",
    voiceAssistant: "వాయిస్ అసిస్టెంట్",
    profileSettings: "ప్రొఫైల్ మరియు సెట్టింగ్‌లు",
    home: "హోమ్‌కు తిరిగి వెళ్లండి",
    lightMode: "లైట్ మోడ్",
    darkMode: "డార్క్ మోడ్",
    getStarted: "ప్రారంభించండి",
    welcome: "మీ డిజిటల్ ఫార్మ్‌కు స్వాగతం 🌱",
    welcomeMessage: "మీ డిజిటల్ వ్యవసాయ క్షేత్రానికి స్వాగతం",
    loadingLocation: "స్థానం లోడ్ అవుతోంది...",
liveTemperature: "ప్రస్తుత ఉష్ణోగ్రత",
humidity: "తేమ",
precipitation: "వర్షపాతం",
liveWeather: "ప్రత్యక్ష వాతావరణ సమాచారం",
lastWeedAnalysis: "చివరి కలుపు మొక్కల విశ్లేషణ",
notAnalyzed: "విశ్లేషణ చేయలేదు",
latestImage: "మీరు ఇటీవల అప్‌లోడ్ చేసిన చిత్రాన్ని బట్టి",
uploadImageHint: "పంట విశ్లేషణలో ఒక చిత్రాన్ని అప్‌లోడ్ చేయండి",
    farmOverview: "ఫార్మ్ అవలోకనం",
    weatherAvailable: "ప్రత్యక్ష డేటా అందుబాటులో ఉంది",
loadingWeather: "ప్రత్యక్ష డేటా లోడ్ అవుతోంది...",
dataUnavailable: "డేటా అందుబాటులో లేదు",
cropAnalysisStatus: "పంట విశ్లేషణ స్థితి",
cropRecommendationStatus: "పంట సిఫార్సుల స్థితి",
marketDataStatus: "మార్కెట్ డేటా స్థితి",
weatherObservation: "వాతావరణ పరిశీలన సమయం",
    language: "భాష",
    weatherSource: "మూలం: Open-Meteo",
weeds: "కలుపు మొక్కలు",
weedResultsAvailable: "కలుపు గుర్తింపు ఫలితాలు అందుబాటులో ఉన్నాయి",
noWeedAnalysis: "ఇంకా కలుపు విశ్లేషణ పూర్తి కాలేదు",
recommendationsAvailable: "పంట సిఫార్సులు అందుబాటులో ఉన్నాయి",
runCropRecommendation: "ఫలితాలను చూడటానికి పంట సిఫార్సును అమలు చేయండి",
pricesLoaded: "ధరలు లోడ్ అయ్యాయి",
selectCommodity: "మార్కెట్ అంచనాలో ఒక పంటను ఎంచుకోండి",
weatherTitle: "వాతావరణ విశ్లేషణ",
weatherDescription: "బెంగళూరుకు సంబంధించిన వాతావరణ సమాచారం Open-Meteo నుండి.",
temperature: "ఉష్ణోగ్రత",
windSpeed: "గాలి వేగం",
locationLabel: "ప్రదేశం",
observationTime: "పరిశీలన సమయం",
sourceLabel: "మూలం",
weedDetection: "కలుపు మొక్కల గుర్తింపు",
weedDescription: "AI ద్వారా కలుపు మొక్కలను గుర్తించడానికి పొలం చిత్రాన్ని అప్‌లోడ్ చేయండి.",
uploadFieldImage: "పొలం చిత్రాన్ని అప్‌లోడ్ చేయండి (JPG, PNG, WEBP)",
selectedImage: "ఎంచుకున్న చిత్రం",
detectingWeeds: "కలుపు మొక్కలను గుర్తిస్తోంది...",
detectWeeds: "కలుపు మొక్కలను గుర్తించండి",
selectImageError: "దయచేసి ముందుగా పొలం చిత్రాన్ని ఎంచుకోండి.",
invalidImageError: "దయచేసి JPG, PNG లేదా WEBP చిత్రాన్ని ఎంచుకోండి.",
imageSizeError: "చిత్ర పరిమాణం 10 MB లేదా అంతకంటే తక్కువ ఉండాలి.",
detectionFailed: "కలుపు మొక్కల గుర్తింపు విఫలమైంది.",
backendConnectionError: "బ్యాకెండ్‌కు కనెక్ట్ కాలేకపోయింది.",
detectionResults: "గుర్తింపు ఫలితాలు",
totalDetections: "మొత్తం గుర్తింపులు",
weedsDetected: "గుర్తించిన కలుపు మొక్కలు",
aiDetectionImage: "AI గుర్తింపు చిత్రం",
individualDetections: "వ్యక్తిగత గుర్తింపులు",
noObjectsDetected: "ఈ చిత్రంలో ఏ వస్తువులూ గుర్తించబడలేదు.",
detectedClass: "గుర్తించిన వర్గం",
confidence: "నమ్మక స్థాయి",
cropRecommendationTitle: "పంట సిఫార్సు",
cropRecommendationDescription: "నేల మరియు వాతావరణ పరిస్థితుల ఆధారంగా అనువైన పంటలను కనుగొనండి.",
soilTypeLabel: "నేల రకం",
selectSoilType: "నేల రకాన్ని ఎంచుకోండి",
soilPhLabel: "నేల pH",
nitrogenLabel: "నత్రజని (N)",
phosphorusLabel: "భాస్వరం (P)",
potassiumLabel: "పొటాషియం (K)",
recommendCropButton: "పంటలను సిఫార్సు చేయండి",
analyzingCrops: "పరిస్థితులను విశ్లేషిస్తోంది...",
recommendationResults: "సిఫార్సు చేసిన పంటలు",
suitabilityScore: "అనుకూలత స్కోర్",
recommendationReason: "ఈ పంట ఎందుకు?",
noRecommendations: "సిఫార్సులు అందుబాటులో లేవు.",
recommendationError: "పంట సిఫార్సులను రూపొందించలేకపోయింది.",
enterFarmConditions: "అనువైన పంటలను కనుగొనడానికి మీ పొలం పరిస్థితులను నమోదు చేయండి.",
soilMoistureLabel: "నేల తేమ (%)",
findingSuitableCrops: "అనువైన పంటలను కనుగొంటోంది...",
rankedCropSuggestions: "ర్యాంక్ చేసిన పంట సిఫార్సులు",
topMatch: "అత్యుత్తమ సరిపోలిక",
rankLabel: "ర్యాంక్",
thingsToVerify: "తనిఖీ చేయాల్సిన అంశాలు",
marketPricesTitle: "మార్కెట్ ధరలు",
marketPricesDescription: "కర్ణాటకలో ఎంపిక చేసిన పంటలకు నివేదించిన మండీ ధరలు.",
commodityLabel: "పంట",
loadingPrices: "ధరలను లోడ్ చేస్తోంది...",
getMarketPrices: "మార్కెట్ ధరలను పొందండి",
marketLoadError: "మార్కెట్ ధరలను లోడ్ చేయలేకపోయింది.",
noMarketRecords: "ఈ పంటకు మార్కెట్ రికార్డులు ఏవీ లభించలేదు.",
marketLabel: "మార్కెట్",
districtLabel: "జిల్లా",
dateLabel: "తేదీ",
minPriceLabel: "కనిష్ఠ ధర",
modalPriceLabel: "మోడల్ ధర",
maxPriceLabel: "గరిష్ఠ ధర",
sourceLabel: "మూలం",
marketPriceWarning: "ఇవి నివేదించిన ధరలు మాత్రమే, భవిష్యత్ ధర అంచనాలు కావు. వీటిని ఉపయోగించే ముందు ధర యూనిట్ మరియు తేదీని తనిఖీ చేయండి.",
aiChatbot: "AI చాట్‌బాట్",
aiChatTitle: "FarmTwin AI",
aiChatDescription: "మీ తెలివైన వ్యవసాయ సహాయకుడు",
aiChatHelp: "పంటలు, నేల, నీటిపారుదల, తెగుళ్లు మరియు వ్యవసాయ పద్ధతుల గురించి ప్రశ్నలు అడగండి.",
openChatbot: "చాట్‌బాట్ తెరవండి",
voiceAssistant: "వాయిస్ అసిస్టెంట్",
voiceAssistantDescription: "సహజంగా మాట్లాడి, వ్యవసాయ ప్రశ్నలకు వాయిస్ ద్వారా సమాధానాలు పొందండి.",
openVoiceAssistant: "వాయిస్ అసిస్టెంట్‌ను తెరవండి",
aiChatTitle: "ఫార్మ్‌ట్విన్ AI",
  },

  Malayalam: {
    dashboard: "ഡാഷ്ബോർഡ്",
    digitalTwin: "ഡിജിറ്റൽ ട്വിൻ",
    cropAnalysis: "വിള വിശകലനം",
    weatherAnalysis: "കാലാവസ്ഥാ വിശകലനം",
    cropRecommendation: "വിള ശുപാർശ",
    marketPrediction: "വിപണി പ്രവചനം",
    notifications: "അറിയിപ്പുകൾ",
    voiceAssistant: "വോയ്സ് അസിസ്റ്റന്റ്",
    profileSettings: "പ്രൊഫൈലും ക്രമീകരണങ്ങളും",
    home: "ഹോമിലേക്ക് മടങ്ങുക",
    lightMode: "ലൈറ്റ് മോഡ്",
    darkMode: "ഡാർക്ക് മോഡ്",
    getStarted: "ആരംഭിക്കുക",
    welcome: "നിങ്ങളുടെ ഡിജിറ്റൽ ഫാമിലേക്ക് സ്വാഗതം 🌱",
    welcomeMessage: "നിങ്ങളുടെ ഡിജിറ്റൽ കൃഷിയിടത്തിലേക്ക് സ്വാഗതം",
    loadingLocation: "സ്ഥലം ലോഡ് ചെയ്യുന്നു...",
liveTemperature: "നിലവിലെ താപനില",
humidity: "ആർദ്രത",
precipitation: "മഴയുടെ അളവ്",
liveWeather: "തത്സമയ കാലാവസ്ഥാ വിവരങ്ങൾ",
lastWeedAnalysis: "അവസാന കള വിശകലനം",
notAnalyzed: "വിശകലനം ചെയ്തിട്ടില്ല",
latestImage: "നിങ്ങൾ അടുത്തിടെ അപ്‌ലോഡ് ചെയ്ത ചിത്രത്തെ അടിസ്ഥാനമാക്കി",
uploadImageHint: "വിള വിശകലനത്തിൽ ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    farmOverview: "ഫാം അവലോകനം",
    weatherAvailable: "തത്സമയ ഡാറ്റ ലഭ്യമാണ്",
loadingWeather: "തത്സമയ ഡാറ്റ ലോഡ് ചെയ്യുന്നു...",
dataUnavailable: "ഡാറ്റ ലഭ്യമല്ല",
cropAnalysisStatus: "വിള വിശകലന നില",
cropRecommendationStatus: "വിള ശുപാർശകളുടെ നില",
marketDataStatus: "വിപണി ഡാറ്റയുടെ നില",
weatherObservation: "കാലാവസ്ഥ നിരീക്ഷണ സമയം",
    language: "ഭാഷ",
    weatherSource: "ഉറവിടം: Open-Meteo",
weeds: "കളകൾ",
weedResultsAvailable: "കള കണ്ടെത്തൽ ഫലങ്ങൾ ലഭ്യമാണ്",
noWeedAnalysis: "കള വിശകലനം ഇതുവരെ പൂർത്തിയായിട്ടില്ല",
recommendationsAvailable: "വിള ശുപാർശകൾ ലഭ്യമാണ്",
runCropRecommendation: "ഫലങ്ങൾ കാണാൻ വിള ശുപാർശ പ്രവർത്തിപ്പിക്കുക",
pricesLoaded: "വിലകൾ ലോഡ് ചെയ്തു",
selectCommodity: "മാർക്കറ്റ് പ്രവചനത്തിൽ ഒരു വിള തിരഞ്ഞെടുക്കുക",
weatherTitle: "കാലാവസ്ഥാ വിശകലനം",
weatherDescription: "ബെംഗളൂരുവിലെ കാലാവസ്ഥാ വിവരങ്ങൾ Open-Meteo-യിൽ നിന്ന്.",
temperature: "താപനില",
windSpeed: "കാറ്റിന്റെ വേഗത",
locationLabel: "സ്ഥലം",
observationTime: "നിരീക്ഷണ സമയം",
sourceLabel: "ഉറവിടം",
weedDetection: "കള കണ്ടെത്തൽ",
weedDescription: "AI ഉപയോഗിച്ച് കളകൾ കണ്ടെത്താൻ കൃഷിയിടത്തിന്റെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",
uploadFieldImage: "കൃഷിയിടത്തിന്റെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക (JPG, PNG, WEBP)",
selectedImage: "തിരഞ്ഞെടുത്ത ചിത്രം",
detectingWeeds: "കളകൾ കണ്ടെത്തുന്നു...",
detectWeeds: "കളകൾ കണ്ടെത്തുക",
selectImageError: "ആദ്യം കൃഷിയിടത്തിന്റെ ചിത്രം തിരഞ്ഞെടുക്കുക.",
invalidImageError: "JPG, PNG അല്ലെങ്കിൽ WEBP ചിത്രം തിരഞ്ഞെടുക്കുക.",
imageSizeError: "ചിത്രത്തിന്റെ വലുപ്പം 10 MB അല്ലെങ്കിൽ അതിൽ കുറവായിരിക്കണം.",
detectionFailed: "കള കണ്ടെത്തൽ പരാജയപ്പെട്ടു.",
backendConnectionError: "ബാക്കെൻഡുമായി ബന്ധിപ്പിക്കാൻ കഴിഞ്ഞില്ല.",
detectionResults: "കണ്ടെത്തൽ ഫലങ്ങൾ",
totalDetections: "ആകെ കണ്ടെത്തലുകൾ",
weedsDetected: "കണ്ടെത്തിയ കളകൾ",
aiDetectionImage: "AI കണ്ടെത്തൽ ചിത്രം",
individualDetections: "വ്യക്തിഗത കണ്ടെത്തലുകൾ",
noObjectsDetected: "ഈ ചിത്രത്തിൽ വസ്തുക്കളൊന്നും കണ്ടെത്തിയില്ല.",
detectedClass: "കണ്ടെത്തിയ വിഭാഗം",
confidence: "വിശ്വാസനില",
cropRecommendationTitle: "വിള ശുപാർശ",
cropRecommendationDescription: "മണ്ണിന്റെയും കാലാവസ്ഥയുടെയും അടിസ്ഥാനത്തിൽ അനുയോജ്യമായ വിളകൾ കണ്ടെത്തുക.",
soilTypeLabel: "മണ്ണിന്റെ തരം",
selectSoilType: "മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക",
soilPhLabel: "മണ്ണിന്റെ pH",
nitrogenLabel: "നൈട്രജൻ (N)",
phosphorusLabel: "ഫോസ്ഫറസ് (P)",
potassiumLabel: "പൊട്ടാസ്യം (K)",
recommendCropButton: "വിളകൾ ശുപാർശ ചെയ്യുക",
analyzingCrops: "സാഹചര്യങ്ങൾ വിശകലനം ചെയ്യുന്നു...",
recommendationResults: "ശുപാർശ ചെയ്യുന്ന വിളകൾ",
suitabilityScore: "അനുയോജ്യതാ സ്കോർ",
recommendationReason: "ഈ വിള എന്തുകൊണ്ട്?",
noRecommendations: "ശുപാർശകളൊന്നും ലഭ്യമല്ല.",
recommendationError: "വിള ശുപാർശകൾ സൃഷ്ടിക്കാനായില്ല.",
enterFarmConditions: "അനുയോജ്യമായ വിളകൾ കണ്ടെത്താൻ കൃഷിയിടത്തിന്റെ വിവരങ്ങൾ നൽകുക.",
soilMoistureLabel: "മണ്ണിലെ ഈർപ്പം (%)",
findingSuitableCrops: "അനുയോജ്യമായ വിളകൾ കണ്ടെത്തുന്നു...",
rankedCropSuggestions: "മുൻഗണനാക്രമത്തിലുള്ള വിള ശുപാർശകൾ",
topMatch: "ഏറ്റവും അനുയോജ്യം",
rankLabel: "റാങ്ക്",
thingsToVerify: "പരിശോധിക്കേണ്ട കാര്യങ്ങൾ",
marketPricesTitle: "വിപണി വിലകൾ",
marketPricesDescription: "കർണാടകയിലെ തിരഞ്ഞെടുത്ത വിളകളുടെ റിപ്പോർട്ട് ചെയ്ത മണ്ഡി വിലകൾ.",
commodityLabel: "വിള",
loadingPrices: "വിലകൾ ലോഡ് ചെയ്യുന്നു...",
getMarketPrices: "വിപണി വിലകൾ നേടുക",
marketLoadError: "വിപണി വിലകൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല.",
noMarketRecords: "ഈ വിളയ്ക്ക് വിപണി രേഖകളൊന്നും ലഭിച്ചില്ല.",
marketLabel: "വിപണി",
districtLabel: "ജില്ല",
dateLabel: "തീയതി",
minPriceLabel: "കുറഞ്ഞ വില",
modalPriceLabel: "മോഡൽ വില",
maxPriceLabel: "പരമാവധി വില",
sourceLabel: "ഉറവിടം",
marketPriceWarning: "ഇവ റിപ്പോർട്ട് ചെയ്ത വിലകളാണ്, ഭാവിയിലെ വില പ്രവചനങ്ങളല്ല. ആശ്രയിക്കുന്നതിന് മുമ്പ് വിലയുടെ യൂണിറ്റും തീയതിയും പരിശോധിക്കുക.",
aiChatbot: "AI ചാറ്റ്ബോട്ട്",
aiChatTitle: "FarmTwin AI",
aiChatDescription: "നിങ്ങളുടെ ബുദ്ധിമാനായ കാർഷിക സഹായി",
aiChatHelp: "വിളകൾ, മണ്ണ്, ജലസേചനം, കീടങ്ങൾ, കൃഷിരീതികൾ എന്നിവയെക്കുറിച്ച് ചോദ്യങ്ങൾ ചോദിക്കൂ.",
openChatbot: "ചാറ്റ്ബോട്ട് തുറക്കുക",
voiceAssistant: "വോയ്സ് അസിസ്റ്റന്റ്",
voiceAssistantDescription: "സ്വാഭാവികമായി സംസാരിച്ച് കൃഷിയുമായി ബന്ധപ്പെട്ട ചോദ്യങ്ങൾക്ക് ശബ്ദത്തിലൂടെ മറുപടികൾ നേടൂ.",
openVoiceAssistant: "വോയ്സ് അസിസ്റ്റന്റ് തുറക്കുക",
aiChatTitle: "ഫാംട്വിൻ AI",
  }
};

const features = [
  
  'Dashboard',
  'Digital Twin',
  'Crop Analysis',
  'Weather Analysis',
  'Crop Recommendation',
  'Market Prediction',
  'Notifications',
  'AI Chatbot',
  'Voice Assistant',
  'Profile & Settings',

];



function App() {
  const [activePage, setActivePage] = useState('Home');

  const [authToken, setAuthToken] = useState(
  () => localStorage.getItem('farmtwin_token') || ''
);

const [authUser, setAuthUser] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('farmtwin_user') || 'null');
  } catch {
    return null;
  }
});

function handleLogin(token, user) {
  localStorage.setItem('farmtwin_token', token);
  localStorage.setItem('farmtwin_user', JSON.stringify(user));
  setAuthToken(token);
  setAuthUser(user);
  setActivePage('Dashboard');
}
  const [theme, setTheme] = useState(() => {
  return localStorage.getItem('farmtwin-theme') || 'light';
});
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('farmtwin-language') || 'English';
  });

  const t = translations[language] || translations.English;

  useEffect(() => {
    localStorage.setItem('farmtwin-language', language);
  }, [language]);

useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('farmtwin-theme', theme);
}, [theme]);

function toggleTheme() {
  setTheme((current) => current === 'light' ? 'dark' : 'light');
}
  const [backendStatus, setBackendStatus] = useState('Checking...');

  // Weather Analysis
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  // Weed Detection
  const [weedFile, setWeedFile] = useState(null);
  const [weedPreview, setWeedPreview] = useState('');
  const [weedResult, setWeedResult] = useState(null);
  const [weedLoading, setWeedLoading] = useState(false);
  const [weedError, setWeedError] = useState('');

  // Crop Recommendation
  const [recommendationInput, setRecommendationInput] = useState({
    soil_type: 'Loamy',
    soil_ph: '6.5',
    soil_moisture: '45',
    nitrogen: '50',
    phosphorus: '30',
    potassium: '40',
  });

  const [recommendations, setRecommendations] = useState(null);
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [recommendationError, setRecommendationError] = useState('');

  // Market Prediction
  const [marketData, setMarketData] = useState(null);
  const [marketLoading, setMarketLoading] = useState(false);
  const [marketError, setMarketError] = useState('');
  const [marketCommodity, setMarketCommodity] = useState('Tomato');

  // AI Chatbot state
const [chatInput, setChatInput] = useState('');
const [chatMessages, setChatMessages] = useState([]);
const [chatLoading, setChatLoading] = useState(false);
const [chatError, setChatError] = useState('');

const [voiceLanguage, setVoiceLanguage] = useState('en-IN');
const [voiceTranscript, setVoiceTranscript] = useState('');
const [voiceAnswer, setVoiceAnswer] = useState('');
const [voiceListening, setVoiceListening] = useState(false);
const [voiceLoading, setVoiceLoading] = useState(false);
const [voiceError, setVoiceError] = useState('');
const [voiceSpeaking, setVoiceSpeaking] = useState(false);

async function sendChatMessage(event) {
  event.preventDefault();

  const message = chatInput.trim();
  if (!message || chatLoading) return;

  setChatMessages((previous) => [
    ...previous,
    { role: 'user', content: message },
  ]);

  setChatInput('');
  setChatError('');
  setChatLoading(true);

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/farming-chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          module: 'AI Chatbot',
          context: {
            crop: 'Tomato',
            location: weather?.location || 'Bengaluru',
            temperature_c: weather?.temperature_c ?? null,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof data.detail === 'string'
          ? data.detail
          : 'The chatbot could not answer. Please try again.'
      );
    }

    setChatMessages((previous) => [
      ...previous,
      { role: 'assistant', content: data.answer },
    ]);
  } catch (error) {
    setChatError(
      error.message || 'Could not connect to the chatbot.'
    );
  } finally {
    setChatLoading(false);
  }
}

function startVoiceListening() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    setVoiceError(
      'Speech recognition is not supported in this browser. Please try Google Chrome.'
    );
    return;
  }

  window.speechSynthesis.cancel();
  setVoiceError('');
  setVoiceTranscript('');
  setVoiceAnswer('');

  const recognition = new SpeechRecognition();
  recognition.lang = voiceLanguage;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    setVoiceListening(true);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setVoiceTranscript(transcript);
    askVoiceAssistant(transcript);
  };

  recognition.onerror = (event) => {
    setVoiceListening(false);

    if (event.error === 'not-allowed') {
      setVoiceError(
        'Microphone access was denied. Allow microphone access in your browser settings.'
      );
    } else if (event.error !== 'no-speech') {
      setVoiceError(
        'Could not recognize your speech. Please try again.'
      );
    } else {
      setVoiceError('No speech detected. Please try again.');
    }
  };

  recognition.onend = () => {
    setVoiceListening(false);
  };

  try {
    recognition.start();
  } catch {
    setVoiceListening(false);
    setVoiceError('Could not start the microphone. Please try again.');
  }
}

async function askVoiceAssistant(message) {
  setVoiceLoading(true);
  setVoiceError('');
  setVoiceAnswer('');

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/farming-chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({
  message,
  module: 'Voice Assistant',
  response_language: voiceLanguage === 'en-IN'
    ? 'English'
    : voiceLanguage === 'hi-IN'
      ? 'Hindi'
      : voiceLanguage === 'kn-IN'
        ? 'Kannada'
        : voiceLanguage === 'ta-IN'
          ? 'Tamil'
          : voiceLanguage === 'te-IN'
            ? 'Telugu'
            : voiceLanguage === 'ml-IN'
              ? 'Malayalam'
              : 'English',
  context: {
    crop: 'Tomato',
    location: weather?.location || 'Bengaluru',
    temperature_c: weather?.temperature_c ?? null,
  },
}),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof data.detail === 'string'
          ? data.detail
          : 'The voice assistant could not answer.'
      );
    }

    setVoiceAnswer(data.answer);
    speakVoiceAnswer(data.answer);
  } catch (error) {
    setVoiceError(
      error.message || 'Could not connect to the farming assistant.'
    );
  } finally {
    setVoiceLoading(false);
  }
}

function speakVoiceAnswer(text) {
  if (!('speechSynthesis' in window)) {
    setVoiceError(
      'Spoken responses are not supported in this browser.'
    );
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voiceLanguage;

  utterance.onstart = () => setVoiceSpeaking(true);
  utterance.onend = () => setVoiceSpeaking(false);
  utterance.onerror = () => setVoiceSpeaking(false);

  window.speechSynthesis.speak(utterance);
}

function stopVoiceAnswer() {
  window.speechSynthesis.cancel();
  setVoiceSpeaking(false);
}



  async function sendChatMessage(event) {
    event.preventDefault();

    const message = chatInput.trim();
    if (!message || chatLoading) return;

    setChatMessages((previous) => [
      ...previous,
      { role: 'user', content: message },
    ]);
    setChatInput('');
    setChatError('');
    setChatLoading(true);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/farming-chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            module: activePage,
            context: {
              crop: 'Tomato',
              location: weather?.location || 'Bengaluru',
              temperature_c: weather?.temperature_c ?? null,
              humidity_percent: weather?.humidity_percent ?? null,
              soil_type: recommendationInput.soil_type,
              soil_ph: Number(recommendationInput.soil_ph),
              soil_moisture: Number(
                recommendationInput.soil_moisture
              ),
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === 'string'
            ? data.detail
            : 'The chatbot could not answer. Please try again.'
        );
      }

      setChatMessages((previous) => [
        ...previous,
        { role: 'assistant', content: data.answer },
      ]);
    } catch (error) {
      setChatError(
        error.message || 'Could not connect to the chatbot.'
      );
    } finally {
      setChatLoading(false);
    }
  }


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/status')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.json();
      })
      .then((data) => setBackendStatus(data.status))
      .catch(() => setBackendStatus('Offline'));
  }, []);

  useEffect(() => {
    if (
  activePage !== 'Weather Analysis' &&
  activePage !== 'Dashboard'
) {
  return;
}

    let cancelled = false;

    async function loadWeather() {
      setWeatherLoading(true);
      setWeatherError('');

      try {
        const response = await fetch(
          'http://127.0.0.1:8000/api/weather'
        );

        if (!response.ok) {
          throw new Error('Unable to retrieve weather data.');
        }

        const data = await response.json();

        if (!cancelled) {
          setWeather(data);
        }
      } catch {
        if (!cancelled) {
          setWeatherError(
            'Could not load weather. Check that your backend is running.'
          );
        }
      } finally {
        if (!cancelled) {
          setWeatherLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [activePage]);

  function handleWeedFileChange(event) {
  const file = event.target.files?.[0];

  setWeedError('');
  setWeedResult(null);

  if (!file) {
    setWeedFile(null);
    setWeedPreview('');
    return;
  }

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];

  if (!allowedTypes.includes(file.type)) {
    setWeedFile(null);
    setWeedPreview('');
    setWeedError('Please select a JPG, PNG, or WEBP image.');
    event.target.value = '';
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    setWeedFile(null);
    setWeedPreview('');
    setWeedError('Image must be 10 MB or less.');
    event.target.value = '';
    return;
  }

  setWeedFile(file);
  setWeedPreview(URL.createObjectURL(file));
}

async function detectWeeds(event) {
  event.preventDefault();

  if (!weedFile) {
    setWeedError('Please select a field image first.');
    return;
  }

  setWeedLoading(true);
  setWeedError('');
  setWeedResult(null);

  try {
    const formData = new FormData();
    formData.append('file', weedFile);

    const response = await fetch(
      'http://127.0.0.1:8000/api/weed-detection',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof data.detail === 'string'
          ? data.detail
          : 'Weed detection failed.'
      );
    }

    setWeedResult(data);
  } catch (error) {
    setWeedError(
      error.message || 'Could not connect to the backend.'
    );
  } finally {
    setWeedLoading(false);
  }
}
  
function updateRecommendationInput(event) {
  const { name, value } = event.target;

  setRecommendationInput((previous) => ({
    ...previous,
    [name]: value,
  }));
}

async function getRecommendations(event) {
  event.preventDefault();

  setRecommendationLoading(true);
  setRecommendationError('');
  setRecommendations(null);

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/crop-recommendation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...recommendationInput,
          soil_ph: Number(recommendationInput.soil_ph),
          soil_moisture: Number(recommendationInput.soil_moisture),
          nitrogen: Number(recommendationInput.nitrogen),
          phosphorus: Number(recommendationInput.phosphorus),
          potassium: Number(recommendationInput.potassium),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || 'Could not generate crop recommendations.'
      );
    }

    setRecommendations(data);
  } catch (error) {
    setRecommendationError(
      error.message || 'Could not connect to the backend.'
    );
  } finally {
    setRecommendationLoading(false);
  }
}

if (!authToken || !authUser) {
  return <Auth onLogin={handleLogin} />;
}
  if (activePage === 'Home') {
    return (
      <main className="page">
        <section className="welcome">
          <button
  type="button"
  className="theme-toggle"
  onClick={toggleTheme}
>
  {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
</button>
          <p className="eyebrow">SMART AGRICULTURE PLATFORM</p>

          <h1>Digital Twin for Precision Farming</h1>

          <p className="subtitle">
            Bringing data, technology, and agriculture together
            for smarter farming decisions.
          </p>

          <button
            className="start-button"
            onClick={() => setActivePage('Dashboard')}
          >
            {t.getStarted}
          </button>

          <p className="connection-status">
            Backend: {backendStatus}
          </p>
        </section>
      </main>
    );
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="brand">FarmTwin</h2>
        <p className="sidebar-label">MAIN MENU</p>

        <nav>
          
{features.map((feature) => (
  <button
    key={feature}
    className={`nav-item ${
      activePage === feature ? 'active' : ''
    }`}
    onClick={() => setActivePage(feature)}
  >
    {t[
      ({
        Dashboard: 'dashboard',
        'Digital Twin': 'digitalTwin',
        'Crop Analysis': 'cropAnalysis',
        'Weather Analysis': 'weatherAnalysis',
        'Crop Recommendation': 'cropRecommendation',
        'Market Prediction': 'marketPrediction',
        'AI Chatbot': 'aiChatbot',
        Notifications: 'notifications',
        'Voice Assistant': 'voiceAssistant',
        'Profile & Settings': 'profileSettings',
      })[feature] || feature
] || feature}
  </button>
))}

        </nav>

        <button
          className="nav-item home-link"
          onClick={() => setActivePage('Home')}
        >
          Back to Home
        </button>
      </aside>

      <main className="dashboard-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">PRECISION FARMING</p>
           <h1>
  {t[
    ({
      Dashboard: 'dashboard',
      'Digital Twin': 'digitalTwin',
      'Crop Analysis': 'cropAnalysis',
      'Weather Analysis': 'weatherAnalysis',
      'Crop Recommendation': 'cropRecommendation',
      'Market Prediction': 'marketPrediction',
      'AI Chatbot': 'aiChatbot',
      Notifications: 'notifications',
      'Voice Assistant': 'voiceAssistant',
      'Profile & Settings': 'profileSettings',
    })[activePage] || 'dashboard'
  ]}
</h1>
          </div>

          <div className="topbar-actions">
            <label className="language-selector">
  <span>{t.language}:</span>
  <select
    value={language}
    onChange={(event) => setLanguage(event.target.value)}
    aria-label="Choose language"
  >
    <option value="English">English</option>
    <option value="Hindi">हिन्दी</option>
    <option value="Kannada">ಕನ್ನಡ</option>
    <option value="Tamil">தமிழ்</option>
    <option value="Telugu">తెలుగు</option>
    <option value="Malayalam">മലയാളം</option>
  </select>
</label>

  <button
    type="button"
    className="theme-toggle"
    onClick={toggleTheme}
  >
    {theme === 'light'
  ? `🌙 ${t.darkMode}`
  : `☀️ ${t.lightMode}`}
  </button>

  <span className="status">
    Backend: {backendStatus}
  </span>
</div>
        </header>

        
{activePage === 'Dashboard' && (
  <>
    <section className="content-card">
      <h2>{t.welcomeMessage}</h2>
      <p>{t.dashboardDescription}</p>
      <p>
        <strong>{t.farmLocation}:</strong>{' '}
        {weather?.location || t.loadingLocation}
      </p>
    </section>

    <section className="stats-grid">
      <article className="stat-card">
        <span className="stat-icon">🌡️</span>
        <p className="stat-title">{t.liveTemperature}</p>
        <h2>
          {weather
            ? `${weather.temperature_c}°C`
            : weatherLoading
              ? t.loadingWeather
              : t.dataUnavailable}
        </h2>
        <p className="stat-detail">{t.weatherSource}</p>
      </article>

      <article className="stat-card">
        <span className="stat-icon">💧</span>
        <p className="stat-title">{t.humidity}</p>
        <h2>
          {weather
            ? `${weather.humidity_percent}%`
            : weatherLoading
              ? t.loadingWeather
              : t.dataUnavailable}
        </h2>
        <p className="stat-detail">{t.liveWeather}</p>
      </article>

      <article className="stat-card">
        <span className="stat-icon">🌧️</span>
        <p className="stat-title">{t.precipitation}</p>
        <h2>
          {weather
            ? `${weather.precipitation_mm} mm`
            : weatherLoading
              ? t.loadingWeather
              : t.dataUnavailable}
        </h2>
        <p className="stat-detail">{t.liveWeather}</p>
      </article>

      <article className="stat-card">
        <span className="stat-icon">🌿</span>
        <p className="stat-title">{t.lastWeedAnalysis}</p>
        <h2>
          {weedResult
            ? `${weedResult.weed_count} ${t.weeds}`
            : t.notAnalyzed}
        </h2>
        <p className="stat-detail">
          {weedResult
            ? t.latestImage
            : t.uploadImageHint}
        </p>
      </article>
    </section>

    <section className="content-card chatbot-shortcut">
  <div className="chatbot-shortcut-icon">🤖</div>

  <div className="chatbot-shortcut-content">
    <h2>{t.aiChatTitle}</h2>
    <p>{t.aiChatHelp}</p>
  </div>

  <button
    type="button"
    className="new-chat-btn"
    onClick={() => setActivePage('AI Chatbot')}
  >
    {t.openChatbot} →
  </button>
</section>

<section className="content-card chatbot-shortcut">
  <div className="chatbot-shortcut-icon">🎙️</div>

  <div className="chatbot-shortcut-content">
   <h2>{t.voiceAssistant}</h2>
<p>{t.voiceAssistantDescription}</p>
  </div>

  <button
    type="button"
    className="new-chat-btn"
    onClick={() => setActivePage('Voice Assistant')}
  >
    {t.openVoiceAssistant} →
  </button>
</section>
  </>
)}

        
        {activePage === 'Digital Twin' && (
          <section className="content-card">
            <FarmTwin3D />
          </section>
        )}


        {activePage === 'Weather Analysis' && (
  <section className="content-card weather-panel">
    <h2>{t.weatherTitle} 🌦️</h2>
    <p>{t.weatherDescription}</p>

    {weatherLoading && (
      <p>{t.loadingWeather}</p>
    )}

    {weatherError && (
      <p className="weather-error">{weatherError}</p>
    )}

    {weather && !weatherLoading && (
      <>
        <section className="stats-grid">
          <article className="stat-card">
            <span className="stat-icon">🌡️</span>
            <p className="stat-title">{t.temperature}</p>
            <h2>{weather.temperature_c}°C</h2>
          </article>

          <article className="stat-card">
            <span className="stat-icon">💧</span>
            <p className="stat-title">{t.humidity}</p>
            <h2>{weather.humidity_percent}%</h2>
          </article>

          <article className="stat-card">
            <span className="stat-icon">🌧️</span>
            <p className="stat-title">{t.precipitation}</p>
            <h2>{weather.precipitation_mm} mm</h2>
          </article>

          <article className="stat-card">
            <span className="stat-icon">💨</span>
            <p className="stat-title">{t.windSpeed}</p>
            <h2>{weather.wind_speed_kmh} km/h</h2>
          </article>
        </section>

        <p>
          <strong>{t.locationLabel}:</strong>{' '}
          {weather.location}
        </p>

        <p>
          <strong>{t.observationTime}:</strong>{' '}
          {weather.observed_at}
        </p>

        <p className="stat-detail">
          {t.sourceLabel}: {weather.source}
        </p>
      </>
    )}
  </section>
)}

        

{activePage === 'Crop Analysis' && (
  <section className="content-card">
    <h2>🌿 {t.weedDetection}</h2>
    <p>{t.weedDescription}</p>

    <form className="crop-form" onSubmit={detectWeeds}>
      <label>
        {t.uploadFieldImage}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleWeedFileChange}
          required
        />
      </label>

      {weedPreview && (
        <div>
          <h3>{t.selectedImage}</h3>
          <img
            src={weedPreview}
            alt={t.selectedImage}
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '400px',
              objectFit: 'contain',
              borderRadius: '12px',
              marginTop: '12px',
            }}
          />
        </div>
      )}

      <button
        className="start-button"
        type="submit"
        disabled={weedLoading || !weedFile}
      >
        {weedLoading ? t.detectingWeeds : t.detectWeeds}
      </button>
    </form>

    {weedError && (
      <p className="weather-error">{weedError}</p>
    )}

    {weedResult && (
      <section className="analysis-result">
        <h2>🌱 {t.detectionResults}</h2>

        <div className="stats-grid">
          <article className="stat-card">
            <p className="stat-title">{t.totalDetections}</p>
            <h2>{weedResult.total_detections}</h2>
          </article>

          <article className="stat-card">
            <p className="stat-title">{t.weedsDetected}</p>
            <h2>{weedResult.weed_count}</h2>
          </article>
        </div>

        {weedResult.annotated_image && (
          <div>
            <h3>{t.aiDetectionImage}</h3>
            <img
              src={weedResult.annotated_image}
              alt={t.aiDetectionImage}
              style={{
                display: 'block',
                width: '100%',
                maxWidth: '700px',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '12px',
                marginTop: '12px',
              }}
            />
          </div>
        )}

        <h3>{t.individualDetections}</h3>

        {!weedResult.detections ||
        weedResult.detections.length === 0 ? (
          <p>{t.noObjectsDetected}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t.detectedClass}</th>
                  <th>{t.confidence}</th>
                </tr>
              </thead>
              <tbody>
                {weedResult.detections.map((item, index) => (
                  <tr key={`${item.class_name}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.class_name}</td>
                    <td>{item.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {weedResult.note && (
          <p className="stat-detail">{weedResult.note}</p>
        )}
      </section>
    )}
  </section>
)}



        

{activePage === 'Crop Recommendation' && (
  <section className="content-card">
    <h2>🌱 {t.cropRecommendationTitle}</h2>
    <p>{t.enterFarmConditions}</p>

    <form className="crop-form" onSubmit={getRecommendations}>
      <label>
        {t.soilTypeLabel}
        <select
          name="soil_type"
          value={recommendationInput.soil_type}
          onChange={updateRecommendationInput}
        >
          <option value="Sandy">Sandy</option>
          <option value="Clay">Clay</option>
          <option value="Loamy">Loamy</option>
          <option value="Silty">Silty</option>
          <option value="Peaty">Peaty</option>
          <option value="Chalky">Chalky</option>
        </select>
      </label>

      <label>
        {t.soilPhLabel}
        <input
          type="number"
          name="soil_ph"
          min="0"
          max="14"
          step="0.1"
          value={recommendationInput.soil_ph}
          onChange={updateRecommendationInput}
          required
        />
      </label>

      <label>
        {t.soilMoistureLabel}
        <input
          type="number"
          name="soil_moisture"
          min="0"
          max="100"
          value={recommendationInput.soil_moisture}
          onChange={updateRecommendationInput}
          required
        />
      </label>

      <label>
        {t.nitrogenLabel}
        <input
          type="number"
          name="nitrogen"
          min="0"
          value={recommendationInput.nitrogen}
          onChange={updateRecommendationInput}
          required
        />
      </label>

      <label>
        {t.phosphorusLabel}
        <input
          type="number"
          name="phosphorus"
          min="0"
          value={recommendationInput.phosphorus}
          onChange={updateRecommendationInput}
          required
        />
      </label>

      <label>
        {t.potassiumLabel}
        <input
          type="number"
          name="potassium"
          min="0"
          value={recommendationInput.potassium}
          onChange={updateRecommendationInput}
          required
        />
      </label>

      <button
        className="start-button"
        type="submit"
        disabled={recommendationLoading}
      >
        {recommendationLoading
          ? t.findingSuitableCrops
          : t.recommendCropButton}
      </button>
    </form>

    {recommendationError && (
      <p className="weather-error">{recommendationError}</p>
    )}

    {recommendations && (
      <section>
        <h2>{t.rankedCropSuggestions}</h2>

        {recommendations.weather && (
          <p>
            {t.weather} {recommendations.weather.location}:{' '}
            {recommendations.weather.temperature_c}°C
          </p>
        )}

        {recommendations.recommendations.map((crop, index) => (
          <article className="stat-card" key={crop.crop}>
            <p>
              {index === 0
                ? `🥇 ${t.topMatch}`
                : `${t.rankLabel} #${index + 1}`}
            </p>

            <h2>{crop.crop}</h2>

            <p>
              <strong>{t.suitabilityScore}:</strong>{' '}
              {crop.suitability_score}/100
            </p>

            <p>{crop.profile_note}</p>

            <h3>{t.recommendationReason}</h3>
            <ul>
              {crop.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>

            {crop.cautions.length > 0 && (
              <>
                <h3>{t.thingsToVerify}</h3>
                <ul>
                  {crop.cautions.map((caution, i) => (
                    <li key={i}>{caution}</li>
                  ))}
                </ul>
              </>
            )}
          </article>
        ))}

        <p className="stat-detail">{recommendations.note}</p>
      </section>
    )}
  </section>
)}



{activePage === 'Market Prediction' && (
  <section className="content-card">
    <h2>📈 {t.marketPricesTitle}</h2>
    <p>{t.marketPricesDescription}</p>

    <form
      className="crop-form"
      onSubmit={async (event) => {
        event.preventDefault();
        setMarketLoading(true);
        setMarketError('');
        setMarketData(null);

        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/market-prices-live?state=Karnataka&commodity=${encodeURIComponent(marketCommodity)}`
          );

          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              typeof result.detail === 'string'
                ? result.detail
                : t.marketLoadError
            );
          }

          setMarketData(result);
        } catch (error) {
          setMarketError(
            error.message || t.backendConnectionError
          );
        } finally {
          setMarketLoading(false);
        }
      }}
    >
      <label>
        {t.commodityLabel}
        <select
          value={marketCommodity}
          onChange={(event) =>
            setMarketCommodity(event.target.value)
          }
        >
          <option value="Tomato">Tomato</option>
          <option value="Onion">Onion</option>
          <option value="Potato">Potato</option>
          <option value="Rice">Rice</option>
          <option value="Maize">Maize</option>
        </select>
      </label>

      <button
        className="start-button"
        type="submit"
        disabled={marketLoading}
      >
        {marketLoading
          ? t.loadingPrices
          : t.getMarketPrices}
      </button>
    </form>

    {marketError && (
      <p className="weather-error">{marketError}</p>
    )}

    {marketData && (
      <>
        <h3>
          {marketData.commodity} {t.marketPricesTitle} —{' '}
          {marketData.state}
        </h3>

        {!marketData.records ||
        marketData.records.length === 0 ? (
          <p>{t.noMarketRecords}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>{t.marketLabel}</th>
                  <th>{t.districtLabel}</th>
                  <th>{t.dateLabel}</th>
                  <th>{t.minPriceLabel}</th>
                  <th>{t.modalPriceLabel}</th>
                  <th>{t.maxPriceLabel}</th>
                </tr>
              </thead>

              <tbody>
                {marketData.records.map((record, index) => (
                  <tr key={record.id ?? index}>
                    <td>{record.market || '—'}</td>
                    <td>{record.district || '—'}</td>
                    <td>{record.arrival_date || '—'}</td>
                    <td>{record.min_price ?? '—'}</td>
                    <td>{record.modal_price ?? '—'}</td>
                    <td>{record.max_price ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="stat-detail">
          {t.sourceLabel}: {marketData.source}
        </p>

        <p className="stat-detail">{marketData.note}</p>

        <p className="stat-detail">
          {t.marketPriceWarning}
        </p>
      </>
    )}
  </section>
)}


{activePage === 'Notifications' && (
  <Notifications language={language} />
)}


{activePage === 'AI Chatbot' && (
  <section className="content-card ai-chat-page">
    <div className="ai-chat-header">
      <div className="ai-chat-brand">
        <div className="ai-chat-logo">✦</div>
        <div>
         <h2>{t.aiChatTitle}</h2>
<p>{t.aiChatDescription}</p>
        </div>
      </div>

      <button
        type="button"
        className="ai-new-chat"
        onClick={() => {
          setChatMessages([]);
          setChatInput('');
          setChatError('');
        }}
      >
        <span>＋</span> New Chat
      </button>
    </div>

    <div className="ai-chat-intro">
      <span className="ai-chat-eyebrow">YOUR FARMING ASSISTANT</span>
      <h3>How can I help your farm today?</h3>
      <p>
        Ask a question, explore an idea, or get help with your
        farming decisions.
      </p>
    </div>

    <div className="ai-chat-conversation">
      {chatMessages.length === 0 && (
        <div className="ai-welcome">
          <div className="ai-welcome-icon">🌱</div>
          <h3>Let's grow something great.</h3>
          <p>
            Start with one of these questions or type your own
            below.
          </p>

          <div className="ai-suggestions">
            <button
              type="button"
              onClick={() =>
                setChatInput(
                  'How can I improve tomato plant growth?'
                )
              }
            >
              <span>🌿</span>
              <span>
                <strong>Improve crop growth</strong>
                <small>Tips for healthier plants</small>
              </span>
              <span className="ai-suggestion-arrow">↗</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setChatInput(
                  'How often should I water my crops?'
                )
              }
            >
              <span>💧</span>
              <span>
                <strong>Watering guidance</strong>
                <small>Understand irrigation needs</small>
              </span>
              <span className="ai-suggestion-arrow">↗</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setChatInput(
                  'How can I identify and prevent crop pests?'
                )
              }
            >
              <span>🛡️</span>
              <span>
                <strong>Manage crop pests</strong>
                <small>Explore prevention methods</small>
              </span>
              <span className="ai-suggestion-arrow">↗</span>
            </button>
          </div>
        </div>
      )}

      {chatMessages.map((item, index) => (
        <div
          key={index}
          className={`ai-message-row ${
            item.role === 'user'
              ? 'ai-user-row'
              : 'ai-assistant-row'
          }`}
        >
          {item.role !== 'user' && (
            <div className="ai-message-avatar">✦</div>
          )}

          <div
            className={`ai-message-bubble ${
              item.role === 'user'
                ? 'ai-user-bubble'
                : 'ai-assistant-bubble'
            }`}
          >
            <div className="ai-message-label">
              {item.role === 'user' ? 'You' : 'FarmTwin AI'}
            </div>
            <div className="ai-message-text">
              {item.content}
            </div>
          </div>
        </div>
      ))}

      {chatLoading && (
        <div className="ai-message-row ai-assistant-row">
          <div className="ai-message-avatar">✦</div>
          <div className="ai-message-bubble ai-assistant-bubble">
            <div className="ai-message-label">FarmTwin AI</div>
            <div className="ai-thinking">
              <span></span>
              <span></span>
              <span></span>
              <span className="ai-thinking-text">
                Thinking...
              </span>
            </div>
          </div>
        </div>
      )}

      {chatError && (
        <div className="ai-chat-error" role="alert">
          {chatError}
        </div>
      )}
    </div>

    <form
      className="ai-chat-form"
      onSubmit={sendChatMessage}
    >
      <input
        type="text"
        value={chatInput}
        onChange={(event) =>
          setChatInput(event.target.value)
        }
        placeholder="Ask anything about your farm..."
        aria-label="Farming question"
        disabled={chatLoading}
        required
      />

      <button
        type="submit"
        disabled={chatLoading || !chatInput.trim()}
        aria-label="Send message"
      >
        {chatLoading ? '...' : '➤'}
      </button>
    </form>

    <p className="ai-chat-disclaimer">
      FarmTwin AI can make mistakes. Verify important farming
      decisions with reliable agricultural guidance.
    </p>
  </section>
)}

{activePage === 'Voice Assistant' && (
  <section className="content-card ai-chat-page voice-assistant-page">
    <div className="ai-chat-header">
      <div className="ai-chat-brand">
        <div className="ai-chat-logo">🎙️</div>
        <div>
          <h2>FarmTwin Voice Assistant</h2>
          <p>Talk naturally with your farming companion</p>
        </div>
      </div>

      <button
        type="button"
        className="ai-new-chat"
        onClick={() => {
          stopVoiceAnswer();
          setVoiceTranscript('');
          setVoiceAnswer('');
          setVoiceError('');
        }}
      >
        ＋ New Conversation
      </button>
    </div>

    <div className="voice-assistant-content">
      <label htmlFor="voice-language">Conversation language</label>

      <select
        id="voice-language"
        value={voiceLanguage}
        onChange={(event) => {
          stopVoiceAnswer();
          setVoiceLanguage(event.target.value);
        }}
      >
        <option value="en-IN">English</option>
        <option value="hi-IN">Hindi</option>
        <option value="kn-IN">Kannada</option>
        <option value="ta-IN">Tamil</option>
        <option value="te-IN">Telugu</option>
        <option value="ml-IN">Malayalam</option>
      </select>

      <div className="voice-microphone-area">
        <button
          type="button"
          className={`voice-microphone ${
            voiceListening ? 'voice-microphone-active' : ''
          }`}
          onClick={startVoiceListening}
          disabled={voiceListening || voiceLoading}
          aria-label="Start speaking"
        >
          {voiceListening ? '🔴' : '🎙️'}
        </button>

        <h3>
          {voiceListening
            ? 'Listening to you...'
            : voiceLoading
              ? 'Thinking about your question...'
              : voiceSpeaking
                ? 'Speaking the answer...'
                : 'Tap the microphone to speak'}
        </h3>

        <p>
          Ask about crops, soil, irrigation, pests, weather, or market prices.
        </p>

        {voiceSpeaking && (
          <button
            type="button"
            className="new-chat-btn"
            onClick={stopVoiceAnswer}
          >
            Stop speaking
          </button>
        )}
      </div>

      {voiceTranscript && (
        <div className="voice-result-card">
          <h3>🗣️ You said</h3>
          <p>{voiceTranscript}</p>
        </div>
      )}

      {voiceLoading && (
        <div className="voice-result-card">
          <p>🌱 Preparing your farming guidance...</p>
        </div>
      )}

      {voiceAnswer && (
        <div className="voice-result-card">
          <h3>✦ FarmTwin AI response</h3>
          <p>{voiceAnswer}</p>

          <button
            type="button"
            className="new-chat-btn"
            onClick={() => speakVoiceAnswer(voiceAnswer)}
          >
            🔊 Play answer again
          </button>
        </div>
      )}

      {voiceError && (
        <div className="ai-chat-error" role="alert">
          {voiceError}
        </div>
      )}
    </div>
  </section>
)}



{activePage === 'Profile & Settings' ? (
  <Profile
    user={authUser}
    language={language}
    setLanguage={setLanguage}
    theme={theme}
    toggleTheme={toggleTheme}
    onLogout={async () => {
      try {
        if (authToken) {
          await fetch('http://127.0.0.1:8000/api/auth/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
        }
      } catch (error) {
        console.error('Logout request failed:', error);
      } finally {
        localStorage.removeItem('farmtwin_token');
        localStorage.removeItem('farmtwin_user');
        setAuthToken('');
        setAuthUser(null);
        setActivePage('Home');
      }
    }}
  />
) : activePage !== 'Dashboard' &&
  activePage !== 'Digital Twin' &&
  activePage !== 'Weather Analysis' &&
  activePage !== 'Crop Analysis' &&
  activePage !== 'Crop Recommendation' &&
  activePage !== 'Market Prediction' &&
  activePage !== 'Notifications' &&
  activePage !== 'AI Chatbot' &&
  activePage !== 'Voice Assistant' ? (
    
  <section className="content-card">
    <h2>{activePage}</h2>
    <p>
      The {activePage.toLowerCase()} module will be
      developed in a future step.
    </p>
  </section>
) : null}

      </main>
    </div>
  );
}

export default App;