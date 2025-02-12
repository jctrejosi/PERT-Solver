from typing import List, Dict

class Activity:
    def __init__(self, name, precedents=None, cost=0, acceleration=None, acceleration_cost=None, optimist=None, probable=0, pessimist=None):
        self.name = name
        self.precedents = precedents if precedents is not None else []
        self.cost = cost
        self.acceleration = acceleration
        self.acceleration_cost = acceleration_cost
        self.optimist = optimist
        self.probable = probable
        self.pessimist = pessimist
        self.average_time = self.calculate_average_time()
        self.variance = self.calculate_variance()

    def calculate_average_time(self):
        if self.optimist is not None and self.pessimist is not None:
            return (self.optimist + 4 * self.probable + self.pessimist) / 6
        return self.probable

    def calculate_variance(self):
        if self.optimist is not None and self.pessimist is not None:
            return ((self.pessimist - self.optimist) / 6) ** 2
        return 0

class PERTCalculator:
    def __init__(self, activities: List[Dict], expected_time: float):
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
                self.earliest_finish[activity.name] = activity.average_time
            else:
                max_precedent_finish = max(self.earliest_finish[precedent] for precedent in activity.precedents)
                self.earliest_start[activity.name] = max_precedent_finish
                self.earliest_finish[activity.name] = self.earliest_start[activity.name] + activity.average_time

    def _backward_pass(self):
        max_finish_time = max(self.earliest_finish.values())
        for activity in reversed(self.activities):
            if not activity.precedents:
                self.latest_finish[activity.name] = max_finish_time
                self.latest_start[activity.name] = self.latest_finish[activity.name] - activity.average_time
            else:
                min_precedent_start = min(self.latest_start[precedent] for precedent in activity.precedents)
                self.latest_finish[activity.name] = min_precedent_start
                self.latest_start[activity.name] = self.latest_finish[activity.name] - activity.average_time

    def _determine_critical_path(self):
        for activity in self.activities:
            self.slack[activity.name] = self.latest_start[activity.name] - self.earliest_start[activity.name]
            if self.slack[activity.name] == 0:
                self.critical_path.append(activity.name)

    def get_critical_path(self):
        return self.critical_path

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

    def calculate_table(self):
        table = []
        for activity in self.activities:
            table.append({
                'name': activity.name,
                'precedents': activity.precedents,
                'average_time': activity.average_time,
                'variance': activity.variance
            })
        return table
