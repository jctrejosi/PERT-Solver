from typing import List, Dict, Union, Optional

class Activity():
    def __init__(self, name: str, precedents: Optional[List[str]] = None, cost: float = 0.0, acceleration: Optional[int] = None, acceleration_cost: Optional[float] = None, optimist: Optional[float] = None, probable: float = 0.0, pessimist: Optional[float] = None):
        self.name = name
        self.precedents = precedents if precedents is not None else []
        self.cost = cost
        self.acceleration = acceleration
        self.acceleration_cost = acceleration_cost
        self.optimist = optimist
        self.probable = probable
        self.pessimist = pessimist

    def calculate_effective_duration(self) -> float:
        duration = self.calculate_average_time()
        if self.acceleration is not None:
            duration = max(duration - self.acceleration, 0)
        return duration

    def calculate_average_time(self) -> float:
        if self.optimist is not None and self.pessimist is not None:
            return (self.optimist + 4 * self.probable + self.pessimist) / 6
        return self.probable

    def calculate_variance(self) -> float:
        if self.optimist is not None and self.pessimist is not None:
            return ((self.pessimist - self.optimist) / 6) ** 2
        return 0.0

    def to_dict_table(self) -> Dict[str, Union[str, List[str], float]]:
        return {
            'name': self.name,
            'precedents': self.precedents,
            'average_time': round(self.calculate_average_time(), 2),
            'variance': round(self.calculate_variance(), 2)
        }

    def __repr__(self):
        return f"Activity(name={self.name}, avg_time={self.calculate_average_time()}, variance={self.calculate_variance()})"

    @staticmethod
    def calculate_table(activities: List['Activity']) -> List[Dict[str, Union[str, List[str], float]]]:
        return [activity.to_dict_table() for activity in activities]

class PERTCalculator:
    def __init__(self, activities: List[Activity], expected_time: float):
        self.activities = activities
        self.activity_dict = {activity.name: activity for activity in self.activities}
        self.critical_path = []
        self.earliest_start = {}
        self.earliest_finish = {}
        self.latest_start = {}
        self.latest_finish = {}
        self.slack = {}
        self.expected_time = expected_time

    def calculate_pert(self):
        self._forward_pass()
        self._backward_pass()
        self._determine_critical_path()

    def _forward_pass(self):
        for activity in self.activities:
            if not activity.precedents:
                self.earliest_start[activity.name] = 0
            else:
                # Asegurar que los precedentes existen antes de acceder a ellos
                if any(p not in self.earliest_finish for p in activity.precedents):
                    raise KeyError(f"Precedent missing for activity {activity.name}")

                max_precedent_finish = max(self.earliest_finish[p] for p in activity.precedents)
                self.earliest_start[activity.name] = max_precedent_finish

            self.earliest_finish[activity.name] = self.earliest_start[activity.name] + activity.calculate_effective_duration()

    def _backward_pass(self):
        max_finish_time = max(self.earliest_finish.values(), default=0)

        # Determinar sucesores
        successors = {activity.name: [] for activity in self.activities}
        for activity in self.activities:
            for precedent in activity.precedents:
                successors[precedent].append(activity.name)

        for activity in reversed(self.activities):
            if not successors[activity.name]:  # Si no tiene sucesores
                self.latest_finish[activity.name] = max_finish_time
            else:
                # Asegurar que los sucesores existen antes de acceder a ellos
                if any(s not in self.latest_start for s in successors[activity.name]):
                    raise KeyError(f"Successor missing for activity {activity.name}")

                min_successor_start = min(self.latest_start[s] for s in successors[activity.name])
                self.latest_finish[activity.name] = min_successor_start

            self.latest_start[activity.name] = self.latest_finish[activity.name] - activity.calculate_effective_duration()

    def _determine_critical_path(self):
        for activity in self.activities:
            self.slack[activity.name] = self.latest_start[activity.name] - self.earliest_start[activity.name]
            if self.slack[activity.name] == 0:
                self.critical_path.append(activity.name)

    def get_activity_times(self):
        return {
            activity.name: {
                'earliest_start': self.earliest_start[activity.name],
                'earliest_finish': self.earliest_finish[activity.name],
                'latest_start': self.latest_start[activity.name],
                'latest_finish': self.latest_finish[activity.name],
                'slack': self.slack[activity.name]
            } for activity in self.activities
        }

    def _find_all_routes(self, current_route, current_activity, routes_with_times, end_activities):
        current_route.append(current_activity)
        if current_activity in end_activities:
            route_time = sum(self.activity_dict[activity].probable for activity in current_route)
            routes_with_times.append((list(current_route), route_time))
        else:
            for activity in self.activities:
                if current_activity in activity.precedents:
                    self._find_all_routes(current_route, activity.name, routes_with_times, end_activities)
        current_route.pop()

    def calculate_routes(self):
        routes_with_times = []
        start_activities = [activity.name for activity in self.activities if not activity.precedents]
        end_activities = [activity.name for activity in self.activities if all(activity.name not in a.precedents for a in self.activities)]

        for start in start_activities:
            self._find_all_routes([], start, routes_with_times, end_activities)

        return [{'route': route, 'completion_time': time, 'critical': time > self.expected_time} for route, time in routes_with_times]
