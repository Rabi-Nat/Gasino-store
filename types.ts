export interface PipeCapacityRow {
  length: number;
  capacities: number[]; // Corresponds to PIPE_SIZES order
}

export type PipeSize = "4" | "3" | "2 1/2" | "2" | "1 1/2" | "1 1/4" | "1" | "3/4" | "1/2";

export interface CalculationResult {
  size: string;
  actualCapacity: number;
  lengthUsed: number;
  modifiedFlow?: number;
  densityFactor?: number;
}