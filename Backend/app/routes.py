from flask import Blueprint, jsonify, request
from .models import calcular_pert, calcular_indicadores
import pandas as pd

bp = Blueprint('main', __name__)

@bp.route('/api/v1.0/calculatePert', methods=['POST'])
def calculate_pert():
    data = request.json
    print(data)
    df = pd.DataFrame(data)
    df = calcular_pert(df)
    df = calcular_indicadores(df)
    return jsonify(df.to_dict(orient='records'))
