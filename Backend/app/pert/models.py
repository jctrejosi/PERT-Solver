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
        self.expected_time = self.calculate_expected_time()

    def calculate_expected_time(self):
        if self.optimist is not None and self.pessimist is not None:
            return (self.optimist + 4 * self.probable + self.pessimist) / 6
        return self.probable

class PERTCalculator:
    def __init__(self, activities: List[Dict]):
        self.activities = [Activity(**activity) for activity in activities]
        self.activity_dict = {activity.name: activity for activity in self.activities}
        self.critical_path = []
        self.earliest_start = {}
        self.earliest_finish = {}
        self.latest_start = {}
        self.latest_finish = {}
        self.slack = {}

    def calculate_pert(self):
        self._forward_pass()
        self._backward_pass()
        self._determine_critical_path()

    def _forward_pass(self):
        for activity in self.activities:
            if not activity.precedents:
                self.earliest_start[activity.name] = 0
                self.earliest_finish[activity.name] = activity.expected_time
            else:
                max_precedent_finish = max(self.earliest_finish[precedent] for precedent in activity.precedents)
                self.earliest_start[activity.name] = max_precedent_finish
                self.earliest_finish[activity.name] = self.earliest_start[activity.name] + activity.expected_time

    def _backward_pass(self):
        max_finish_time = max(self.earliest_finish.values())
        for activity in reversed(self.activities):
            if not activity.precedents:
                self.latest_finish[activity.name] = max_finish_time
                self.latest_start[activity.name] = self.latest_finish[activity.name] - activity.expected_time
            else:
                min_precedent_start = min(self.latest_start[precedent] for precedent in activity.precedents)
                self.latest_finish[activity.name] = min_precedent_start
                self.latest_start[activity.name] = self.latest_finish[activity.name] - activity.expected_time

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