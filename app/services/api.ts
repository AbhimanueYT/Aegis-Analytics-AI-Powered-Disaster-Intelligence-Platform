const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface AlertData {
  id: number;
  title: string;
  location: string;
  severity: string;
  time: string;
  latitude: number | null;
  longitude: number | null;
  details: string;
}

export interface ShelterData {
  id: number;
  name: string;
  location: string;
  capacity: number;
  available: number;
  contact: string;
  status: string;
  latitude: number | null;
  longitude: number | null;
}

export interface WeatherData {
  location: string;
  temp: number;
  humidity: number;
  wind_speed: number;
  condition: string;
}

export interface RoadData {
  name: string;
  status: string;
  condition: string;
  traffic_level: string;
}

export interface RiskTrendData {
  month: string;
  risk: number;
  response: number;
}

export interface IncidentData {
  id: number;
  title: string;
  description: string;
  location: string;
  severity: string;
  category: string;
  reporter_name: string;
  contact: string;
  status: string;
}

export interface IncidentCreateData {
  title: string;
  description: string;
  location: string;
  reporter_name?: string;
  contact?: string;
}

export async function fetchAlerts(): Promise<AlertData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts`);
    if (!res.ok) throw new Error("Failed to fetch alerts");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchShelters(): Promise<ShelterData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/shelters`);
    if (!res.ok) throw new Error("Failed to fetch shelters");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchWeather(): Promise<WeatherData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/weather`);
    if (!res.ok) throw new Error("Failed to fetch weather");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchRoads(): Promise<RoadData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/roads`);
    if (!res.ok) throw new Error("Failed to fetch roads");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchRiskTrend(): Promise<RiskTrendData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/risk`);
    if (!res.ok) throw new Error("Failed to fetch risk trend");
    const data = await res.json();
    return data.map((item: any) => ({
      month: item.month,
      risk: item.risk_score,
      response: item.response_score,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchIncidents(): Promise<IncidentData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/incidents`);
    if (!res.ok) throw new Error("Failed to fetch incidents");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function submitIncident(data: IncidentCreateData): Promise<IncidentData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/incident`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit incident");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export interface PredictionFeatures {
  MonsoonIntensity: number;
  TopographyDrainage: number;
  RiverManagement: number;
  Deforestation: number;
  Urbanization: number;
  ClimateChange: number;
  DamsQuality: number;
  Siltation: number;
  AgriculturalPractices: number;
  Encroachments: number;
  IneffectiveDisasterPreparedness: number;
  DrainageSystems: number;
  CoastalVulnerability: number;
  Landslides: number;
  Watersheds: number;
  DeterioratingInfrastructure: number;
  PopulationScore: number;
  WetlandLoss: number;
  InadequatePlanning: number;
  PoliticalFactors: number;
}

export interface PredictionResponse {
  prediction: {
    flood_probability: number;
    risk_level: string;
    confidence: number;
    top_factors: Array<{ factor: string; importance: number }>;
  };
  priority: string;
  recommended_actions: string[];
}

export interface ChatResponse {
  answer: string;
  used_gemini: boolean;
  sources: Array<{ text: string; source: string; page: number }>;
}

export async function submitPrediction(features: PredictionFeatures): Promise<PredictionResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(features),
    });
    if (!res.ok) throw new Error("Failed to run prediction");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export interface ChatMessage {
  role: string;
  message: string;
}

export async function submitChat(question: string, history: ChatMessage[] = []): Promise<ChatResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, history }),
    });
    if (!res.ok) throw new Error("Failed to send chat message");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

