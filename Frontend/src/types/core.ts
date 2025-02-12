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

export type Route = {
  completion_time: number;
  critical: boolean;
  route: string[];
};

export type TableVariance = {
  average_time: number;
  name: string;
  precedents: [];
  variance: number;
};
