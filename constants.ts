import { PipeCapacityRow } from './types';

// The columns in the user's table correspond to these sizes in inches
export const PIPE_SIZES = ["1/2", "3/4", "1", "1 1/4", "1 1/2", "2", "2 1/2", "3", "4"];

export const DENSITY_FACTORS = [
  { d: 0.5, f: 1.15 },
  { d: 0.55, f: 1.08 },
  { d: 0.6, f: 1.04 },
  { d: 0.65, f: 1.0 },
  { d: 0.7, f: 0.96 },
  { d: 0.75, f: 0.93 },
  { d: 0.8, f: 0.9 },
  { d: 0.85, f: 0.87 },
  { d: 0.9, f: 0.85 },
  { d: 1.0, f: 0.8 },
];

// Data transcribed from the prompt. 
// Structure: length (last column in prompt) -> capacities (columns 1-9 in prompt)
// The capacities are now reversed to match PIPE_SIZES (1/2" to 4")
export const PIPE_DATA: PipeCapacityRow[] = [
  { length: 2, capacities: [5.9, 12.3, 23.3, 47.9, 72, 138.3, 220, 380.7, 801.9] },
  { length: 4, capacities: [4, 8.5, 16, 32.9, 49.4, 95.1, 151.2, 268.5, 551.1] },
  { length: 6, capacities: [3.2, 6.8, 12.9, 26.4, 39.7, 76.4, 121.5, 215.7, 442.8] },
  { length: 8, capacities: [2.8, 5.8, 11, 22.6, 34, 65.4, 104, 184.7, 379.1] },
  { length: 10, capacities: [2.4, 5, 9.6, 19.7, 29.6, 56.9, 90.4, 160.6, 329.7] },
  { length: 12, capacities: [2.2, 4.7, 8.8, 18.1, 27.3, 52.5, 83.4, 148.2, 304.3] },
  { length: 14, capacities: [2, 4.3, 8.1, 16.7, 25, 48.2, 76.6, 136.1, 279.4] },
  { length: 16, capacities: [1.9, 4, 7.5, 15.5, 23.3, 44.8, 71.3, 126.7, 260] },
  { length: 18, capacities: [1.8, 3.7, 7.1, 14.6, 21.9, 42.2, 67.1, 119.3, 244.8] },
  { length: 20, capacities: [1.7, 3.5, 6.7, 13.8, 20.7, 39.8, 63.3, 112.5, 231] },
  { length: 22, capacities: [1.6, 3.3, 6.3, 13.1, 19.6, 37.8, 60.1, 106.8, 219.2] },
  { length: 24, capacities: [1.5, 3.2, 6.1, 12.5, 18.7, 36.1, 57.4, 101.9, 209.2] },
  { length: 26, capacities: [1.4, 3.1, 5.8, 12, 18, 34.6, 55.1, 97.9, 200.9] },
  { length: 28, capacities: [1.4, 2.9, 5.5, 11.4, 17.2, 33.1, 52.6, 93.6, 191] },
  { length: 30, capacities: [1.3, 2.8, 5.3, 11, 16.6, 31.9, 50.8, 90.2, 185.1] },
  { length: 35, capacities: [1.2, 2.6, 4.9, 10.2, 15.3, 29.4, 46.8, 80.1, 170.6] },
  { length: 40, capacities: [1.1, 2.4, 4.6, 9.4, 14.1, 27.1, 43.3, 76.9, 157.9] },
  { length: 45, capacities: [1.1, 2.2, 4.3, 8.8, 13.3, 25.5, 40.6, 72.2, 148.1] },
  { length: 50, capacities: [1, 2.1, 4.1, 8.4, 12.6, 24.3, 38.6, 68.7, 141] },
  { length: 55, capacities: [0.99, 2, 3.9, 8, 12, 23.1, 36.7, 65.2, 133.9] },
  { length: 60, capacities: [0.94, 1.9, 3.7, 7.6, 11.5, 22.1, 35.1, 62.4, 128.1] },
  { length: 70, capacities: [0.85, 1.8, 3.3, 6.9, 10.4, 20, 31.8, 56.5, 116.1] },
  { length: 80, capacities: [0.8, 1.6, 3.1, 6.5, 9.7, 18.8, 29.8, 53.1, 108.9] },
  { length: 90, capacities: [0.75, 1.5, 2.9, 6.1, 9.1, 17.6, 28, 49.7, 102] },
  { length: 100, capacities: [0.71, 1.4, 2.8, 5.7, 8.6, 16.6, 26.4, 47, 96.5] },
  { length: 120, capacities: [0.64, 1.3, 2.5, 5.2, 7.8, 15, 23.9, 42.5, 87.3] },
  { length: 150, capacities: [0.57, 1.2, 2.2, 4.6, 6.9, 13.3, 21.2, 37.7, 77.5] },
  { length: 200, capacities: [0.49, 1, 1.9, 3.9, 5.9, 11.4, 18.1, 32.2, 66.2] },
  { length: 250, capacities: [0.43, 0.91, 1.7, 3.5, 5.2, 10.1, 16.1, 28.6, 58.8] },
  { length: 300, capacities: [0.39, 0.82, 1.5, 3.1, 4.7, 9.2, 14.6, 25.9, 53.2] },
];
