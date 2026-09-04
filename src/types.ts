export interface ForecastPoint {
  month: string;
  bunker_price: number;
  freight_rate: number;
  vessel: string;
  total_cost: number;
}

export interface PredictResponse {
  forecast: ForecastPoint[];
}

export interface PredictRequest {
  origin: string;
  destination: string;
  cargo: string;
  quantity: number;
  month: number;
  year: number;
}

export const ORIGINS = [
  'Australia',
  'South Africa',
  'Indonesia',
];

export const DESTINATION_PORTS = [
  'Paradip',
  'Visakhapatnam',
  'Chennai',
];

export const CARGO_TYPES = [
  'Coal',
  'Iron Ore',
];

export const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

export const API_URL =
  'https://freight-forecasting-backend.onrender.com/predict'; 