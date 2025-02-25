from typing import List, Dict, Union, Optional
import math
from scipy.stats import norm

class Activity:
    def __init__(self, name: str, precedents: Optional[List[str]] = None, cost: float = 0.0, acceleration: Optional[int] = None, acceleration_cost: Optional[float] = None, optimist: Optional[float] = None, probable: float = 0.0, pessimist: Optional[float] = None):
        self.name = name
        self.precedents = precedents if precedents is not None else []
        self.cost = cost
        self.acceleration = acceleration
        self.acceleration_cost = acceleration_cost
        self.optimist = optimist
        self.probable = probable
        self.pessimist = pessimist
        self.average_time = self.calculate_average_time()

    def calculate_average_time(self) -> float:
        if self.optimist is not None and self.pessimist is not None:
            return round((self.optimist + 4 * self.probable + self.pessimist) / 6, 2)
        return self.probable

    def calculate_variance(self) -> float:
        if self.optimist is not None and self.pessimist is not None and self.optimist != self.pessimist:
            return round(((self.pessimist - self.optimist) / 6) ** 2, 2)
        return 0.027

    def to_dict_table(self) -> Dict[str, Union[str, List[str], float]]:
        return {
            'name': self.name,
            'precedents': self.precedents,
            'average_time': self.average_time,
            'variance': self.calculate_variance()
        }

    def __repr__(self):
        return f"Activity(name={self.name}, avg_time={self.average_time}, variance={self.calculate_variance()})"

    @staticmethod
    def calculate_table(activities: List['Activity']) -> List[Dict[str, Union[str, List[str], float]]]:
        return [activity.to_dict_table() for activity in activities]

class PERTCalculator:
    def __init__(self, activities: List[Activity], expected_time: float):
        self.activities = activities
        self.activity_dict = {activity.name: activity for activity in self.activities}
        self.expected_time = expected_time
        self.critical_path = []
        self.earliest_start = {}
        self.earliest_finish = {}
        self.latest_start = {}
        self.latest_finish = {}
        self.slack = {}
        self.routes_with_times = []
        self.probability = 0

    def calculate_pert(self):
        self._forward_pass()
        self._backward_pass()
        self._calculate_slack()
        self._determine_critical_path()
        self._calculate_routes()

    def _forward_pass(self):
        for activity in self.activities:
            if not activity.precedents:
                self.earliest_start[activity.name] = 0
            else:
                max_precedent_finish = max(self.earliest_finish[p] for p in activity.precedents)
                self.earliest_start[activity.name] = max_precedent_finish
            self.earliest_finish[activity.name] = round(self.earliest_start[activity.name] + activity.average_time, 2)

    def _backward_pass(self):
        max_finish_time = max(self.earliest_finish.values(), default=0)
        successors = {activity.name: [] for activity in self.activities}
        for activity in self.activities:
            for precedent in activity.precedents:
                successors[precedent].append(activity.name)

        for activity in reversed(self.activities):
            if not successors[activity.name]:
                self.latest_finish[activity.name] = max_finish_time
            else:
                min_successor_start = min(self.latest_start[s] for s in successors[activity.name])
                self.latest_finish[activity.name] = min_successor_start
            self.latest_start[activity.name] = round(self.latest_finish[activity.name] - activity.average_time, 2)

    def _calculate_slack(self):
        for activity in self.activities:
            self.slack[activity.name] = self.latest_start[activity.name] - self.earliest_start[activity.name]

    def _determine_critical_path(self):
        for activity in self.activities:
            self.slack[activity.name] = self.latest_start[activity.name] - self.earliest_start[activity.name]
            if self.slack[activity.name] == 0:
                self.critical_path.append(activity.name)

    def _find_all_routes(self, current_route, current_activity, routes_with_times, end_activities):
        current_route.append(current_activity)
        if current_activity in end_activities:
            route_time = round(sum(self.activity_dict[activity].average_time for activity in current_route), 2)
            routes_with_times.append((list(current_route), route_time))
        else:
            for activity in self.activities:
                if current_activity in activity.precedents:
                    self._find_all_routes(current_route, activity.name, routes_with_times, end_activities)
        current_route.pop()

    def _calculate_routes(self):
        start_activities = [activity.name for activity in self.activities if not activity.precedents]
        end_activities = [activity.name for activity in self.activities if all(activity.name not in a.precedents for a in self.activities)]

        routes_with_times = []
        for start in start_activities:
            self._find_all_routes([], start, routes_with_times, end_activities)

        self.routes_with_times = [{'route': route, 'completion_time': time, 'critical': time > self.expected_time} for route, time in routes_with_times]

    def get_project_duration(self):
        return max(route['completion_time'] for route in self.routes_with_times)

    def calculate_completion_probability(self):
        min_completion_time = self.get_project_duration()
        variance_total = sum(self.activity_dict[act].calculate_variance() for act in self.critical_path)
        std_dev_total = math.sqrt(variance_total)
        Z = (self.expected_time - min_completion_time) / std_dev_total
        probability = norm.cdf(Z)
        self.probability = probability
        return {"Z_score": round(Z, 2), "completion_probability": round(probability * 100, 2)}

    def get_activity_times(self):
        return {
            activity.name: {
                'earliest_start': self.earliest_start[activity.name],
                'earliest_finish': self.earliest_finish[activity.name],
                'latest_start': self.latest_start[activity.name],
                'latest_finish': self.latest_finish[activity.name],
                'slack': round(self.slack[activity.name], 2)
            } for activity in self.activities
        }

    def optimize_critical_path(self):
        # Filtrar rutas críticas
        critical_routes = [route for route in self.routes_with_times if route["critical"]]

        if not critical_routes:
            return {"optimized_activities": [], "total_acceleration_cost": 0}

        # Identificar actividades únicas en rutas críticas
        critical_activities = set()
        for route in critical_routes:
            critical_activities.update(route["route"])

        # Filtrar actividades críticas con aceleración disponible
        activities_to_accelerate = [
            self.activity_dict[name] for name in critical_activities
            if self.activity_dict[name].acceleration and self.activity_dict[name].acceleration_cost
        ]

        # Ordenar actividades por menor costo de aceleración por unidad de tiempo
        activities_to_accelerate.sort(key=lambda act: act.acceleration_cost)

        total_reduction_needed = self.get_project_duration() - self.expected_time
        total_acceleration_cost = 0
        optimized_activities = []

        for activity in activities_to_accelerate:
            if total_reduction_needed <= 0:
                break  # Ya se alcanzó la meta de reducción de tiempo

            # Determinar cuánto tiempo se puede reducir en esta actividad
            max_reducible = min(activity.acceleration, total_reduction_needed)
            reduction_cost = max_reducible * activity.acceleration_cost

            # Registrar optimización aplicada
            optimized_activities.append({
                "activity": activity.name,
                "time_reduced": max_reducible,
                "acceleration_cost_per_unit": activity.acceleration_cost,
                "total_acceleration_cost": reduction_cost
            })

            # Actualizar valores
            total_reduction_needed -= max_reducible
            total_acceleration_cost += reduction_cost

        return {
            "optimized_activities": optimized_activities,
            "total_acceleration_cost": total_acceleration_cost
        }

