/**
 * Live paddling conditions from Open-Meteo (free, no API key).
 * Combines the marine API (water temp + waves) with the forecast API (wind),
 * then derives a simple green/amber/red status. Thresholds are ‹CONFIRM›.
 */
export type ConditionStatus = "good" | "caution" | "danger";

export interface Conditions {
  location: string;
  waterTemp: number | null; // °C
  airTemp: number | null; // °C
  windSpeed: number | null; // km/h
  waveHeight: number | null; // m
  status: ConditionStatus;
  statusLabel: string;
  updatedAt: string;
  available: boolean;
}

const THRESHOLDS = {
  windCaution: 18, // km/h
  windDanger: 30,
  waveCaution: 0.5, // m
  waveDanger: 1.0,
};

function deriveStatus(wind: number | null, wave: number | null): ConditionStatus {
  const w = wind ?? 0;
  const h = wave ?? 0;
  if (w >= THRESHOLDS.windDanger || h >= THRESHOLDS.waveDanger) return "danger";
  if (w >= THRESHOLDS.windCaution || h >= THRESHOLDS.waveCaution) return "caution";
  return "good";
}

const STATUS_LABEL: Record<ConditionStatus, string> = {
  good: "Great conditions for paddling",
  caution: "Paddle with care — breezy",
  danger: "Not recommended right now",
};

async function safeJson(url: string): Promise<any | null> {
  try {
    // Cache for 15 minutes at the edge/data layer.
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getConditions(
  lat: number,
  lng: number,
  location: string,
): Promise<Conditions> {
  const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&current=sea_surface_temperature,wave_height`;
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m&wind_speed_unit=kmh`;

  const [marine, weather] = await Promise.all([safeJson(marineUrl), safeJson(weatherUrl)]);

  const waterTemp = marine?.current?.sea_surface_temperature ?? null;
  const waveHeight = marine?.current?.wave_height ?? null;
  const airTemp = weather?.current?.temperature_2m ?? null;
  const windSpeed = weather?.current?.wind_speed_10m ?? null;

  const available = weather !== null || marine !== null;
  const status = deriveStatus(windSpeed, waveHeight);

  return {
    location,
    waterTemp: waterTemp !== null ? Math.round(waterTemp * 10) / 10 : null,
    airTemp: airTemp !== null ? Math.round(airTemp) : null,
    windSpeed: windSpeed !== null ? Math.round(windSpeed) : null,
    waveHeight: waveHeight !== null ? Math.round(waveHeight * 100) / 100 : null,
    status,
    statusLabel: STATUS_LABEL[status],
    updatedAt: new Date().toISOString(),
    available,
  };
}
