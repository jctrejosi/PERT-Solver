export type Activity = {
  name: string;
  precedents?: string[];
  cost: number;
  acceleration?: number;
  acceleration_cost?: number;
  optimist?: number;
  probable: number;
  pessimist?: number;
};
