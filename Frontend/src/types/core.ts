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

export type AcitvityTimes = {
  earliest_finish: number;
  earliest_start: number;
  latest_finish: number;
  latest_start: number;
  slack: number;
  name: string;
};

export type ActivityInform = {
  name: string;
  cost_spent: number;
  progress: number;
};
