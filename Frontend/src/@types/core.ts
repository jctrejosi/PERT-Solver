export type Activity = {
  name: string;
  dependencies?: string[];
  cost: number;
  acceleration?: number;
  accelerationCost?: number;
  optimist?: number;
  probable: number;
  pessimist?: number;
};
