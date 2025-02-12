from pydantic import BaseModel
from typing import List, Optional

class Activity(BaseModel):
    name: str
    precedents: List[str]
    cost: float
    acceleration: Optional[float] = None
    acceleration_cost: Optional[float] = None
    optimist: Optional[float] = None
    probable: float
    pessimist: Optional[float] = None
    average_time: Optional[float] = None
    variance: Optional[float] = None

class PERTRequest(BaseModel):
    expected_time: float
    activities: List[Activity]