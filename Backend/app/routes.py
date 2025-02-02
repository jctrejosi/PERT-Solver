from flask import Blueprint, jsonify, request
from .models import calcular_pert, calcular_indicadores
import pandas as pd

bp = Blueprint('main', __name__)

@bp.route('/api/data', methods=['GET'])
def get_data():
    # Ejemplo de datos
    data = {
        'Actividad': ['A', 'B', 'C'],
        'Optimista': [2, 3, 4],
        'Pesimista': [6, 7, 8],
        'Mas_Probable': [4, 5, 6],
        'Porcentaje_Completado': [0.5, 0.3, 0.7],
        'Costo_Real': [1000, 1500, 2000],
        'Costo_Planeado': [800, 1200, 1600]
    }
    df = pd.DataFrame(data)
    df = calcular_pert(df)
    df = calcular_indicadores(df)
    return jsonify(df.to_dict(orient='records'))
