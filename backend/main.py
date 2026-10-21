
import base64
import os

import cv2
import httpx
import numpy as np
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from ultralytics import YOLO
from auth_routes import router as auth_router


# ---------------------------------------------------------
# APP SETUP
# ---------------------------------------------------------

app = FastAPI(title="Digital Twin for Precision Farming")
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# WEED DETECTION MODEL SETUP
# ---------------------------------------------------------

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "models",
    "best.pt",
)

MAX_IMAGE_BYTES = 10 * 1024 * 1024  # 10 MB

weed_model = YOLO(MODEL_PATH)


# ---------------------------------------------------------
# SOIL INPUT MODEL
# ---------------------------------------------------------

class SoilInput(BaseModel):
    crop: str = Field(min_length=1, max_length=60)
    soil_ph: float = Field(ge=0, le=14)
    soil_moisture: float = Field(ge=0, le=100)
    nitrogen: float = Field(ge=0, le=1000)
    phosphorus: float = Field(ge=0, le=1000)
    potassium: float = Field(ge=0, le=1000)


# ---------------------------------------------------------
# HOME AND STATUS
# ---------------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Digital Twin for Precision Farming",
        "status": "Backend is running",
    }


@app.get("/api/status")
def api_status():
    return {
        "project": "Digital Twin for Precision Farming",
        "status": "online",
    }


# ---------------------------------------------------------
# WEATHER ANALYSIS
# ---------------------------------------------------------

@app.get("/api/weather")
async def get_weather():
    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "current": (
            "temperature_2m,"
            "relative_humidity_2m,"
            "precipitation,"
            "wind_speed_10m,"
            "weather_code"
        ),
        "timezone": "Asia/Kolkata",
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()

        current = data.get("current")

        if not current:
            raise HTTPException(
                status_code=502,
                detail="Weather data is unavailable.",
            )

        return {
            "location": "Bengaluru",
            "temperature_c": current["temperature_2m"],
            "humidity_percent": current["relative_humidity_2m"],
            "precipitation_mm": current["precipitation"],
            "wind_speed_kmh": current["wind_speed_10m"],
            "weather_code": current["weather_code"],
            "observed_at": current["time"],
            "source": "Open-Meteo",
        }

    except httpx.HTTPError:
        raise HTTPException(
            status_code=502,
            detail="Could not retrieve weather data. Please try again.",
        )


# ---------------------------------------------------------
# CROP ANALYSIS — EXISTING SOIL SCREENING
# Preserved so existing functionality is not silently removed.
# ---------------------------------------------------------

@app.post("/api/crop-analysis")
def crop_analysis(soil: SoilInput):
    crop_name = soil.crop.strip().lower()

    crop_profiles = {
        "tomato": {"ph_min": 5.5, "ph_max": 7.0, "name": "Tomato"},
        "rice": {"ph_min": 5.0, "ph_max": 6.5, "name": "Rice"},
        "wheat": {"ph_min": 6.0, "ph_max": 7.5, "name": "Wheat"},
        "maize": {"ph_min": 5.5, "ph_max": 7.0, "name": "Maize"},
        "potato": {"ph_min": 5.0, "ph_max": 6.5, "name": "Potato"},
        "sugarcane": {"ph_min": 6.0, "ph_max": 7.5, "name": "Sugarcane"},
        "cotton": {"ph_min": 5.5, "ph_max": 8.0, "name": "Cotton"},
    }

    profile = crop_profiles.get(crop_name)
    observations = []

    if profile:
        observations.append(f"Crop selected: {profile['name']}.")

        if soil.soil_ph < profile["ph_min"]:
            observations.append(
                f"Soil pH ({soil.soil_ph}) is below the approximate "
                f"screening range for {profile['name']} "
                f"({profile['ph_min']}-{profile['ph_max']})."
            )
        elif soil.soil_ph > profile["ph_max"]:
            observations.append(
                f"Soil pH ({soil.soil_ph}) is above the approximate "
                f"screening range for {profile['name']} "
                f"({profile['ph_min']}-{profile['ph_max']})."
            )
        else:
            observations.append(
                f"Soil pH ({soil.soil_ph}) is within the approximate "
                f"screening range for {profile['name']}."
            )
    else:
        observations.append(
            f"No crop-specific pH profile is available for "
            f"'{soil.crop.strip()}'. Use a verified crop-specific "
            "reference for further assessment."
        )

    if soil.soil_moisture < 25:
        observations.append(
            "The entered soil moisture reading is low. Check the crop's "
            "water requirements and verify the sensor."
        )
    elif soil.soil_moisture > 80:
        observations.append(
            "The entered soil moisture reading is high. Check drainage, "
            "soil type, and the crop's water needs."
        )
    else:
        observations.append(
            "The moisture reading is within this prototype's middle "
            "screening band. Actual suitability depends on crop, soil "
            "type, and sensor calibration."
        )

    return {
        "crop": soil.crop.strip(),
        "soil_ph": soil.soil_ph,
        "soil_moisture_percent": soil.soil_moisture,
        "nutrients": {
            "nitrogen": soil.nitrogen,
            "phosphorus": soil.phosphorus,
            "potassium": soil.potassium,
        },
        "observations": observations,
        "note": (
            "Preliminary screening only. Crop pH ranges are approximate. "
            "Nitrogen, phosphorus, and potassium cannot be classified "
            "reliably without units, a soil testing method, and suitable "
            "crop-specific references."
        ),
    }


# ---------------------------------------------------------
# CROP RECOMMENDATION MODULE
# ---------------------------------------------------------

class CropRecommendationInput(BaseModel):
    soil_type: str = Field(min_length=1, max_length=30)
    soil_ph: float = Field(ge=0, le=14)
    soil_moisture: float = Field(ge=0, le=100)
    nitrogen: float = Field(ge=0, le=1000)
    phosphorus: float = Field(ge=0, le=1000)
    potassium: float = Field(ge=0, le=1000)


CROP_PROFILES = [
    {
        "name": "Tomato",
        "ph": (5.5, 7.0),
        "soils": ["loamy", "sandy", "silty"],
        "moisture": (35, 70),
        "temperature": (18, 30),
        "rainfall": (0, 8),
        "reason": "A well-drained soil and a suitable pH can support tomato growth.",
    },
    {
        "name": "Rice",
        "ph": (5.0, 6.5),
        "soils": ["clay", "loamy", "silty"],
        "moisture": (60, 100),
        "temperature": (20, 35),
        "rainfall": (3, 20),
        "reason": "Rice can suit moisture-retentive soils and warm growing conditions.",
    },
    {
        "name": "Wheat",
        "ph": (6.0, 7.5),
        "soils": ["loamy", "clay", "silty"],
        "moisture": (25, 55),
        "temperature": (10, 25),
        "rainfall": (0, 5),
        "reason": "Wheat can grow in suitable loamy soils with moderate moisture.",
    },
    {
        "name": "Maize",
        "ph": (5.5, 7.0),
        "soils": ["loamy", "silty", "sandy"],
        "moisture": (30, 65),
        "temperature": (18, 32),
        "rainfall": (0, 8),
        "reason": "Maize generally benefits from well-drained soil and adequate moisture.",
    },
    {
        "name": "Ragi",
        "ph": (5.0, 7.0),
        "soils": ["sandy", "loamy", "silty"],
        "moisture": (20, 55),
        "temperature": (20, 32),
        "rainfall": (0, 8),
        "reason": "Ragi is an option to evaluate in warm conditions and suitable soils.",
    },
    {
        "name": "Groundnut",
        "ph": (5.5, 7.0),
        "soils": ["sandy", "loamy"],
        "moisture": (25, 60),
        "temperature": (20, 32),
        "rainfall": (0, 8),
        "reason": "Groundnut often benefits from loose, well-drained soil.",
    },
    {
        "name": "Cotton",
        "ph": (5.5, 8.0),
        "soils": ["loamy", "sandy", "clay"],
        "moisture": (20, 55),
        "temperature": (21, 35),
        "rainfall": (0, 8),
        "reason": "Cotton can suit warm conditions where soil drainage and water supply are appropriate.",
    },
    {
        "name": "Potato",
        "ph": (5.0, 6.5),
        "soils": ["sandy", "loamy", "silty"],
        "moisture": (35, 70),
        "temperature": (10, 25),
        "rainfall": (0, 6),
        "reason": "Potato generally benefits from loose soil and consistent moisture.",
    },
    {
        "name": "Chilli",
        "ph": (5.5, 7.0),
        "soils": ["loamy", "sandy", "silty"],
        "moisture": (30, 65),
        "temperature": (18, 32),
        "rainfall": (0, 8),
        "reason": "Chilli can suit well-drained soils and warm growing conditions.",
    },
    {
        "name": "Sugarcane",
        "ph": (6.0, 7.5),
        "soils": ["loamy", "clay", "silty"],
        "moisture": (45, 80),
        "temperature": (20, 35),
        "rainfall": (2, 15),
        "reason": "Sugarcane generally needs a long warm growing season and a reliable water supply.",
    },
]


def range_score(value, low, high):
    """Return a transparent heuristic score from 0 to 100."""
    if low <= value <= high:
        return 100

    distance = low - value if value < low else value - high
    return max(0, round(100 - distance * 8))


@app.post("/api/crop-recommendation")
async def recommend_crops(data: CropRecommendationInput):
    soil_type = data.soil_type.strip().lower()
    weather = None

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(
                "https://api.open-meteo.com/v1/forecast",
                params={
                    "latitude": 12.9716,
                    "longitude": 77.5946,
                    "current": (
                        "temperature_2m,"
                        "relative_humidity_2m,"
                        "precipitation"
                    ),
                    "timezone": "Asia/Kolkata",
                },
            )
            response.raise_for_status()
            current = response.json().get("current", {})

            if current:
                weather = {
                    "temperature_c": current.get("temperature_2m"),
                    "humidity_percent": current.get("relative_humidity_2m"),
                    "precipitation_mm": current.get("precipitation"),
                    "location": "Bengaluru",
                    "source": "Open-Meteo",
                }
    except (httpx.HTTPError, ValueError):
        weather = None

    recommendations = []

    for crop in CROP_PROFILES:
        reasons = []
        cautions = []

        ph_score = range_score(
            data.soil_ph, crop["ph"][0], crop["ph"][1]
        )
        moisture_score = range_score(
            data.soil_moisture,
            crop["moisture"][0],
            crop["moisture"][1],
        )
        soil_score = 100 if soil_type in crop["soils"] else 55

        if ph_score == 100:
            reasons.append("Soil pH is within the crop's screening range.")
        else:
            cautions.append("Soil pH is outside the preferred screening range.")

        if soil_score == 100:
            reasons.append("The selected soil type is a potential match.")
        else:
            cautions.append(
                "The selected soil type is not among this profile's preferred types."
            )

        if moisture_score == 100:
            reasons.append("The entered moisture value is within the screening range.")
        else:
            cautions.append("Check crop water needs and verify the moisture reading.")

        score_parts = [
            (ph_score, 0.35),
            (soil_score, 0.25),
            (moisture_score, 0.25),
        ]

        if weather and weather["temperature_c"] is not None:
            temperature_score = range_score(
                weather["temperature_c"],
                crop["temperature"][0],
                crop["temperature"][1],
            )
            score_parts.append((temperature_score, 0.15))

            if temperature_score == 100:
                reasons.append(
                    "Current temperature matches the broad screening range."
                )
            else:
                cautions.append(
                    "Current temperature is outside the broad screening range."
                )

        total_weight = sum(weight for _, weight in score_parts)
        score = round(
            sum(value * weight for value, weight in score_parts)
            / total_weight
        )

        recommendations.append({
            "crop": crop["name"],
            "suitability_score": score,
            "reasons": reasons,
            "cautions": cautions,
            "profile_note": crop["reason"],
        })

    recommendations.sort(
        key=lambda item: item["suitability_score"],
        reverse=True,
    )

    return {
        "recommendations": recommendations,
        "weather": weather,
        "inputs_used": {
            "soil_type": data.soil_type,
            "soil_ph": data.soil_ph,
            "soil_moisture": data.soil_moisture,
            "nitrogen": data.nitrogen,
            "phosphorus": data.phosphorus,
            "potassium": data.potassium,
        },
        "note": (
            "Prototype ranking only, not a validated agricultural prediction. "
            "Scores use illustrative crop profiles and current temperature, "
            "not a seasonal forecast. Rainfall, humidity, crop variety, season, "
            "location-specific soil data, and verified laboratory nutrient "
            "ranges are not fully incorporated. NPK values are reported but "
            "not scored because their units are unspecified. Consult local "
            "agricultural guidance before planting."
        ),
    }


# ---------------------------------------------------------
# HISTORICAL MARKET PRICES
# ---------------------------------------------------------

@app.get("/api/market-prices")
async def get_market_prices(
    year: int,
    month: int,
    state_id: int,
    commodity_id: int,
):
    if year < 2000 or year > 2100:
        raise HTTPException(
            status_code=400,
            detail="Enter a valid year between 2000 and 2100.",
        )

    if month < 1 or month > 12:
        raise HTTPException(
            status_code=400,
            detail="Month must be between 1 and 12.",
        )

    if state_id <= 0 or commodity_id <= 0:
        raise HTTPException(
            status_code=400,
            detail="State ID and commodity ID must be positive.",
        )

    url = (
        "https://api.agmarknet.gov.in/v1/"
        "prices-and-arrivals/date-wise/specific-commodity"
    )

    params = {
        "year": year,
        "month": month,
        "stateId": state_id,
        "commodityId": commodity_id,
        "includeExcel": "false",
    }

    headers = {
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://agmarknet.gov.in",
        "Referer": "https://agmarknet.gov.in/",
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 Chrome/135.0.0.0 Safari/537.36"
        ),
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                url,
                params=params,
                headers=headers,
            )
            response.raise_for_status()
            result = response.json()

        return {
            "source": "Agmarknet, Government of India",
            "year": year,
            "month": month,
            "state_id": state_id,
            "commodity_id": commodity_id,
            "data": result,
            "note": (
                "These are reported historical market records, not future "
                "price predictions. Verify the returned record dates and "
                "units before making decisions."
            ),
        }

    except httpx.HTTPStatusError as error:
        raise HTTPException(
            status_code=502,
            detail={
                "upstream_status": error.response.status_code,
                "upstream_message": error.response.text[:1000],
            },
        )

    except httpx.HTTPError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Could not connect to Agmarknet: {str(error)}",
        )

    except ValueError:
        raise HTTPException(
            status_code=502,
            detail="Agmarknet returned an unexpected response format.",
        )


# ---------------------------------------------------------
# LIVE MARKET PRICES
# ---------------------------------------------------------

@app.get("/api/market-prices-live")
async def get_live_market_prices(
    state: str = "Karnataka",
    commodity: str = "Tomato",
):
    url = "https://mandi-api.onrender.com/v1/prices"
    params = {
        "state": state,
        "commodity": commodity,
    }

    try:
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            result = response.json()

        if not result.get("success"):
            raise HTTPException(
                status_code=502,
                detail="The market-price API did not return success.",
            )

        return {
            "source": "Third-party mandi API",
            "state": state,
            "commodity": commodity,
            "records": result.get("data", []),
            "note": (
                "Reported market prices, not future predictions. "
                "Verify price units and record dates before use."
            ),
        }

    except httpx.HTTPStatusError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Market API returned HTTP {error.response.status_code}.",
        )

    except httpx.HTTPError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Could not connect to market API: {str(error)}",
        )

    except ValueError:
        raise HTTPException(
            status_code=502,
            detail="Market API returned invalid JSON.",
        )


# ---------------------------------------------------------
# WEED DETECTION FROM AN UPLOADED PHOTO
# ---------------------------------------------------------

@app.post("/api/weed-detection")
def detect_weeds(file: UploadFile = File(...)):
    """Detect weeds locally using the downloaded YOLO model."""

    if file.content_type not in {
        "image/jpeg",
        "image/png",
        "image/webp",
    }:
        raise HTTPException(
            status_code=400,
            detail="Upload a JPG, PNG, or WEBP image.",
        )

    image_bytes = file.file.read(MAX_IMAGE_BYTES + 1)

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded image is empty.",
        )

    if len(image_bytes) > MAX_IMAGE_BYTES:
        raise HTTPException(
            status_code=413,
            detail="Image is too large. Maximum size is 10 MB.",
        )

    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if image is None:
        raise HTTPException(
            status_code=400,
            detail="Could not read the image. Try another image.",
        )

    try:
        results = weed_model.predict(
            source=image,
            conf=0.25,
            verbose=False,
        )

        result = results[0]
        detections = []

        for box in result.boxes:
            class_id = int(box.cls[0].item())
            confidence = float(box.conf[0].item())

            x1, y1, x2, y2 = [
                round(float(value), 2)
                for value in box.xyxy[0].tolist()
            ]

            detections.append({
                "class_name": weed_model.names[class_id],
                "confidence": round(confidence * 100, 2),
                "box": {
                    "x1": x1,
                    "y1": y1,
                    "x2": x2,
                    "y2": y2,
                },
            })

        annotated_image = result.plot()
        success, encoded_image = cv2.imencode(
            ".jpg",
            annotated_image,
        )

        if not success:
            raise HTTPException(
                status_code=500,
                detail="Could not create the annotated image.",
            )

        image_base64 = base64.b64encode(
            encoded_image.tobytes()
        ).decode("utf-8")

        weed_count = sum(
            1
            for item in detections
            if item["class_name"].lower() == "weed"
        )

        return {
            "success": True,
            "filename": file.filename,
            "total_detections": len(detections),
            "weed_count": weed_count,
            "detections": detections,
            "annotated_image": (
                f"data:image/jpeg;base64,{image_base64}"
            ),
            "note": (
                "Model predictions are estimates. Verify detections "
                "visually before taking action."
            ),
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Weed detection failed. Check the backend terminal.",
        ) from error

    finally:
        file.file.close()
