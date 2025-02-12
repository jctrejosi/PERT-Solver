export type Activity = {
  name: string;
  precedents?: string[];
  cost: number;
  acceleration?: number;
  accelerationCost?: number;
  optimist?: number;
  probable: number;
  pessimist?: number;
};
